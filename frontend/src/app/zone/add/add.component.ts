import { Component } from '@angular/core';
import { ZoneService } from '../zone.service';
import { Router } from '@angular/router';
import { Zone } from '../zone';
import * as L from 'leaflet';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {

  zone: Zone = {
    nom: '',
    latitude: 48.8566, // Default to Paris
    longitude: 2.3522
  };

  isSubmitting = false;

  // Leaflet map options
  options = {
    layers: [
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })
    ],
    zoom: 13,
    center: L.latLng(48.8566, 2.3522)
  };

  layers: L.Layer[] = [];

  constructor(
    private zoneService: ZoneService,
    private router: Router
  ) {}

  onMapReady(map: any): void {
    // Add a marker at the default location
    const marker = L.marker([this.zone.latitude!, this.zone.longitude!], { draggable: true });
    marker.addTo(map);
    this.layers.push(marker);

    // Update zone coordinates when marker is dragged
    marker.on('dragend', (event) => {
      const marker = event.target;
      const position = marker.getLatLng();
      this.zone.latitude = position.lat;
      this.zone.longitude = position.lng;
    });

    // Add click event to place marker
    map.on('click', (event: L.LeafletMouseEvent) => {
      const lat = event.latlng.lat;
      const lng = event.latlng.lng;
      this.zone.latitude = lat;
      this.zone.longitude = lng;
      marker.setLatLng([lat, lng]);
    });
  }

  onSubmit(): void {
    if (this.zone.nom.trim()) {
      this.isSubmitting = true;
        this.zone.trottinettes= []; 
  this.zone.nombre_trottinettes=0
  this.zone.nombre_disponibles=0
      this.zoneService.addZone(this.zone).subscribe({
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
