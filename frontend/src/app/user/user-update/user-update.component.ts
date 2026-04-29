import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-update',
  standalone: false,
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.scss'
})
export class UserUpdateComponent implements OnInit {

  form!: FormGroup;
  isEditMode = false;
  userId?: number;
  isLoading = false;
  isSaving = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.userId = this.route.snapshot.params['id'];
    console.log("id",this.userId)
    if (this.userId) {
      this.isEditMode = true;
      this.loadUser(this.userId);
    }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name:  ['', [Validators.required, Validators.minLength(2)]],
      username:   ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^\S+$/)]],
      email:      ['', [Validators.required, Validators.email]],
      age:        [null, [Validators.min(0), Validators.max(120)]],
      phone:      ['', [Validators.pattern(/^[+\d\s\-()]{0,15}$/)]],
    });
  }

  private loadUser(id: number): void {
    this.isLoading = true;
    this.userService.getById(id).subscribe({
      next: (user: { 
        first_name: any; last_name: any; username: any; email: any; age: any; phone: any; }) => {
        this.form.patchValue({
          first_name: user.first_name,
          last_name:  user.last_name,
          username:   user.username,
          email:      user.email,
          age:        user.age,
          phone:      user.phone,
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger l\'utilisateur.';
        this.isLoading = false;
      }
    });
  }

  get f() { return this.form.controls; }

  getInitials(): string {
    const fn = this.form.value.first_name || '';
    const ln = this.form.value.last_name  || '';
    return ((fn[0] || '') + (ln[0] || '')).toUpperCase() || '?';
  }

  onSubmit(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSaving = true;
    const payload: User = this.form.value;

    const request$ = this.isEditMode
      ? this.userService.update(this.userId!, payload)
      : this.userService.create(payload);

    request$.subscribe({
      next: () => {
        this.successMessage = this.isEditMode
          ? 'Utilisateur mis à jour avec succès.'
          : 'Utilisateur créé avec succès.';
        this.isSaving = false;
        setTimeout(() => this.router.navigate(['/user/users']), 1200);
      },
      error: (err: { error: { email: any[]; username: any[]; detail: any; }; }) => {
        this.errorMessage =
          err?.error?.email?.[0]    ??
          err?.error?.username?.[0] ??
          err?.error?.detail        ??
          'Une erreur est survenue.';
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/user/users']);
  }
}