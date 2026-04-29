import { Component, OnInit } from '@angular/core';
import { TrottinetteService } from '../trottinette.service';
import { ZoneService } from '../../zone/zone.service';
import { Router } from '@angular/router';
import { Trottinette } from '../trottinette';
import { Zone } from '../../zone/zone';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {

  trottinette: Trottinette = {
    QR_code: '',
    model: '',
    status: 'disponible',
    battery: 100
  };

  zones: Zone[] = [];
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  isSubmitting = false;

  constructor(
    private trottinetteService: TrottinetteService,
    private zoneService: ZoneService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadZones();
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
    this.imagePreview = null;
  }

  onSubmit(): void {
    if (this.trottinette.QR_code.trim() && this.trottinette.model.trim()) {
      this.isSubmitting = true;
      this.trottinetteService.addTrottinette(this.trottinette, this.selectedImage || undefined).subscribe({
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
