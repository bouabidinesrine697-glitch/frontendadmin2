import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrottinetteService } from '../trottinette.service';
import { ZoneService } from '../../zone/zone.service';
import { Trottinette } from '../trottinette';
import { Zone } from '../../zone/zone';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrl: './update.component.css'
})
export class UpdateComponent implements OnInit {

  trottinette: Trottinette = {
    QR_code: '',
    model: '',
    status: 'disponible',
    battery: 100
  };

  zones: Zone[] = [];
  selectedImage: File | null = null;
  imagePreview?: string | null = null;
  isLoading = false;
  isSubmitting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trottinetteService: TrottinetteService,
    private zoneService: ZoneService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.loadTrottinette(id);
    this.loadZones();
  }

  loadTrottinette(id: number): void {
    this.isLoading = true;
    this.trottinetteService.getTrottinetteDetail(id).subscribe({
      next: (data: Trottinette) => {
        this.trottinette = data;
        if (data.image) {
          this.imagePreview = data.image_url;
        }
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/trottinette/list']);
      }
    });
  }

  loadZones(): void {
    this.zoneService.getZones().subscribe({
      next: (data: Zone[]) => {
        this.zones = data;
      }
    });
  }

  onImageSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(): void {
    this.selectedImage = null;
    if (this.trottinette.image) {
      this.imagePreview = this.trottinette.image;
    } else {
      this.imagePreview = null;
    }
  }

  onSubmit(): void {
    if (this.trottinette.QR_code.trim() && this.trottinette.model.trim() && this.trottinette.id) {
      this.isSubmitting = true;
      this.trottinetteService.updateTrottinette(this.trottinette.id, this.trottinette, this.selectedImage || undefined).subscribe({
        next: () => {
          this.router.navigate(['/trottinette/list']);
        },
        error: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/trottinette/list']);
  }
}
