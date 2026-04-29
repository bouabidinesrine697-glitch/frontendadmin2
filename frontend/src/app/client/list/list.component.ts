import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Router } from '@angular/router';
import { Client } from '../client';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  clients: Client[] = [];
  filteredClients: Client[] = [];
  isLoading = false;
  searchQuery = '';
  deleteConfirmId: number | null = null;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.isLoading = true;
    this.clientService.getAll().subscribe({
      next: (data: any) => {
        console.log("client",data)
        this.clients = data;
        this.filteredClients = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    const q = query.toLowerCase();
    this.filteredClients = this.clients.filter(c =>
      c.nom.toLowerCase().includes(q) ||
      c.prenom.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.ville.toLowerCase().includes(q) ||
      c.telephone.toLowerCase().includes(q) ||
      c.adresse.toLowerCase().includes(q)
    );
  }

  getInitials(client: Client): string {
    return ((client.nom?.[0] || '') + (client.prenom?.[0] || '')).toUpperCase() || '?';
  }

  onEdit(id: number): void {
    this.router.navigate(['/client/update/', id]);
  }

  onAdd(): void {
    this.router.navigate(['/client/add']);
  }

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  onDelete(id: number): void {
    this.clientService.delete(id).subscribe({
      next: () => {
        this.clients = this.clients.filter(c => c.id !== id);
        this.filteredClients = this.filteredClients.filter(c => c.id !== id);
        this.deleteConfirmId = null;
      }
    });
  }
}


