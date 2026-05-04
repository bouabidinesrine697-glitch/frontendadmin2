import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FactureService } from '../facture.service';
import { ClientService } from '../../client/client.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
  form!: FormGroup;
  clients: any[] = [];
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private factureService: FactureService,
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      client: [null, Validators.required],
      montant_total: [null, [Validators.required, Validators.min(0)]],
      statut: ['en_attente', Validators.required],
      description: [''],
    });

    this.clientService.getAll().subscribe({
      next: (data: any) => (this.clients = data),
      error: (err: any) => console.error(err),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    this.isSubmitting = true;
    this.factureService.create(this.form.value).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.router.navigate(['/facture']);
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = 'Erreur lors de la création.';
        this.isSubmitting = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/facture']);
  }
}