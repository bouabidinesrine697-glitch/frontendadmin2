import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { Router } from '@angular/router';
import { Reservation } from '../reservation';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  reservations: Reservation[] = [];
  filteredReservations: Reservation[] = [];
  isLoading = false;
  searchQuery = '';
  deleteConfirmId: number | null = null;

  constructor(
    private reservationService: ReservationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.isLoading = true;
    this.reservationService.getReservations().subscribe({
      next: (data: Reservation[]) => {
        this.reservations = data;
        this.filteredReservations = data;
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
    this.filteredReservations = this.reservations.filter(r =>
      r.trottinette_details?.QR_code?.toLowerCase().includes(q) ||
      r.user_details?.username?.toLowerCase().includes(q)
    );
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('fr-FR');
  }

  getStatus(reservation: Reservation): string {
    if (reservation.end_time) {
      return 'Terminée';
    }
    return 'En cours';
  }

  getStatusColor(reservation: Reservation): string {
    return reservation.end_time ? 'text-green-600' : 'text-blue-600';
  }

  onEdit(id: number): void {
    this.router.navigate(['/reservation/update/', id]);
  }

  onAdd(): void {
    this.router.navigate(['/reservation/add']);
  }

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  onDelete(id: number): void {
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter(r => r.id !== id);
        this.filteredReservations = this.filteredReservations.filter(r => r.id !== id);
        this.deleteConfirmId = null;
      }
    });
  }

  onEndReservation(bookingId: number): void {
    this.reservationService.endReservation(bookingId).subscribe({
      next: () => {
        this.loadReservations(); // Reload to get updated data
      }
    });
  }
}
