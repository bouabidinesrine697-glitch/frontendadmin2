import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ZoneService } from '../zone.service';
import { Zone } from '../zone';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {

  zone: Zone | null = null;
  isLoading = false;
  isDeleting = false;

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

  onDelete(): void {
    if (this.zone?.id) {
      this.isDeleting = true;
      this.zoneService.deleteZone(this.zone.id).subscribe({
        next: () => {
          this.router.navigate(['/zone/list']);
        },
        error: () => {
          this.isDeleting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/zone/list']);
  }
}
