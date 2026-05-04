import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { TrottinetteService } from '../../trottinette/trottinette.service';
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
    private trottinetteService: TrottinetteService,
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
      error: () => this.isLoading = false
    });
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    const q = query.toLowerCase();
    this.filteredReservations = this.reservations.filter(r =>
      r.trottinette_details?.model?.toLowerCase().includes(q) ||
      r.trottinette_details?.QR_code?.toLowerCase().includes(q) ||
      r.user_details?.username?.toLowerCase().includes(q)
    );
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleString('fr-FR');
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
      next: () => this.loadReservations()
    });
  }

onConfirm(id: number): void {
  this.reservationService.confirmReservation(id).subscribe({
    next: () => {
      const r = this.reservations.find(r => r.id === id);
      if (r) r.status = 'confirmée';
    },
    error: (err: any) => console.error(err) 
  });
}

onRefuser(id: number): void {
  this.trottinetteService.refuserBooking(id).subscribe({
    next: () => {
      const r = this.reservations.find(r => r.id === id);
      if (r) r.status = 'refusée';
    },
    error: (err: any) => console.error(err)  
  });
}
}