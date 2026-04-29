import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { Client } from '../client';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  isEditMode = false;
  clientId?: number;
  isLoading = false;
  isSaving = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      prenom: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', [Validators.required, Validators.maxLength(20)]],
      ville: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      adresse: ['', [Validators.required, Validators.maxLength(255)]],
      date_naissance: [''],
      latitude: [null],
      longitude: [null]
    });
  }

  get f() {
    return this.form.controls;
  }

  getInitials(): string {
    const nom = this.form.get('nom')?.value || '';
    const prenom = this.form.get('prenom')?.value || '';
    return ((nom[0] || '') + (prenom[0] || '')).toUpperCase() || '?';
  }
  

  onSubmit(): void {
    // if (this.form.invalid) {
    //   this.form.markAllAsTouched();
    //   return;
    // }

    this.isSaving = true;  // Add this to show loading state
    console.log("Form data:", this.form.value); // Debug log to check form values
    this.clientService.create(this.form.value).subscribe({
      next: () => {
        console.log("gg")
        this.isSaving = false;
        this.router.navigate(['/client/clients']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.email?.[0] ?? 'Une erreur est survenue.';
        this.isSaving = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/']); // Or window.history.back() to go back
  }
}