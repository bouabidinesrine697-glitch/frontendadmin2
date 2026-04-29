import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrl: './user-add.component.css'
})
export class UserAddComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  userId?: number;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router

  ) {}

  ngOnInit(): void {
    this.buildForm();

    // this.userId = this.route.snapshot.params['id'];
    // if (this.userId) {
    //   this.isEditMode = true;
    //   this.loadUser(this.userId);
    // }
  }

  private buildForm(): void {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.minLength(2)]],
      last_name:  ['', [Validators.required, Validators.minLength(2)]],
      username:   ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^\S+$/)]],
      email:      ['', [Validators.required, Validators.email]],
      age:        [null, [Validators.min(0), Validators.max(120)]],
      phone:      ['', [Validators.pattern(/^[+\d\s\-()]{0,15}$/)]],
      password:['',Validators.required]
    });
  }

  private loadUser(id: number): void {
    this.isLoading = true;

  }

  get f() { return this.form.controls; }

  getInitials(): string {
    const fn = this.form.value.first_name || '';
    const ln = this.form.value.last_name  || '';
    return ((fn[0] || '') + (ln[0] || '')).toUpperCase() || '?';
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.isSaving = true;
    const payload: User = this.form.value;

    const request$ =  this.userService.create(payload);

    request$.subscribe({
      next: () => this.router.navigate(['/user/users']),
      error: (err) => {
        this.errorMessage = err?.error?.email?.[0] ?? 'Une erreur est survenue.';
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/user/users']);
  }
}
