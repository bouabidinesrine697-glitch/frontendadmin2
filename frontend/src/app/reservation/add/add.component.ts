import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { TrottinetteService } from '../../trottinette/trottinette.service';
import { Router } from '@angular/router';
import { Reservation } from '../reservation';
import { Trottinette } from '../../trottinette/trottinette';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  reservation: Reservation = {
    trottinette: 0,
    user: 1, // Default user ID, should be from auth service
    start_time: new Date().toISOString(),
    total_cost: 0
  };

  trottinettes: Trottinette[] = [];
  isSubmitting = false;

  constructor(
    private reservationService: ReservationService,
    private trottinetteService: TrottinetteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrottinettes();
  }

  loadTrottinettes(): void {
    this.trottinetteService.getTrottinetteList().subscribe({
      next: (data: Trottinette[]) => {
        // Only show available trottinettes
        this.trottinettes = data.filter(t => t.status === 'disponible');
      }
    });
  }

  onSubmit(): void {
    if (this.reservation.trottinette && this.reservation.user) {
      this.isSubmitting = true;
      this.reservationService.addReservation(this.reservation).subscribe({
        next: () => {
          this.router.navigate(['/reservation/list']);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/reservation/list']);
  }
}
