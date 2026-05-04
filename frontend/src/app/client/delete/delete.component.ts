import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
})
export class DeleteComponent implements OnInit {
  client: any = null;
  isLoading = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadClient(+id);
    }
  }

  loadClient(id: number): void {
    this.isLoading = true;
    this.clientService.getClient(id).subscribe({
      next: (data: any) => {
        this.client = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erreur chargement client', err);
        this.isLoading = false;
        this.router.navigate(['/client']);
      },
    });
  }

  onDelete(): void {
    if (!this.client) return;
    this.isDeleting = true;
    this.clientService.delete(this.client.id).subscribe({
      next: () => {
        this.isDeleting = false;
        this.router.navigate(['/client']);
      },
      error: (err: any) => {
        console.error('Erreur suppression', err);
        this.isDeleting = false;
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/client']);
  }
}