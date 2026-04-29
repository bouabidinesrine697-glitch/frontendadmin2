import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from '../zone.service';
import { Zone } from '../zone';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  zone: Zone = {
    nom: '',
    latitude: 48.8566, // Default to Paris
    longitude: 2.3522
  };

  isLoading = false;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private zoneService: ZoneService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.loadZone(id);
  }

  loadZone(id: number): void {
    this.isLoading = true;
    this.zoneService.getZone(id).subscribe({
      next: (data: Zone) => {
        this.zone = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/zone/list']);
      }
    });
  }

  onSubmit(): void {
    if (this.zone.nom.trim() && this.zone.id) {
      this.isSubmitting = true;
      this.zoneService.updateZone(this.zone.id, this.zone).subscribe({
        next: () => {
          this.router.navigate(['/zone/list']);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/zone/list']);
  }
}
