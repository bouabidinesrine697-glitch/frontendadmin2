import { Component, OnInit } from '@angular/core';
import { ZoneService } from '../zone.service';
import { TrottinetteService } from '../../trottinette/trottinette.service';
import { Router } from '@angular/router';
import { Zone } from '../zone';
import { Trottinette } from '../../trottinette/trottinette';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  zones: Zone[] = [];
  filteredZones: Zone[] = [];
  trottinettes: Trottinette[] = [];
  isLoading = false;
  searchQuery = '';
  deleteConfirmId: number | null = null;

  constructor(
    private zoneService: ZoneService,
    private trottinetteService: TrottinetteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadZones();
    this.loadTrottinettes();
  }

  loadZones(): void {
    this.isLoading = true;
    this.zoneService.getZones().subscribe({
      next: (data: Zone[]) => {
        this.zones = data;
        this.filteredZones = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }

  loadTrottinettes(): void {
    this.trottinetteService.getTrottinetteList().subscribe({
      next: (data: Trottinette[]) => {
        this.trottinettes = data;
      }
    });
  }

  getTrottinetteCount(zoneId: number): number {
    return this.trottinettes.filter(t => t.zone === zoneId).length;
  }

  onSearch(query: string): void {
    this.searchQuery = query;
    const q = query.toLowerCase();
    this.filteredZones = this.zones.filter(z =>
      z.nom.toLowerCase().includes(q) 
    );
  }

  getInitials(zone: Zone): string {
    return zone.nom?.[0]?.toUpperCase() || '?';
  }

  onEdit(id: number): void {
    this.router.navigate(['/zone/update/', id]);
  }

  onAdd(): void {
    this.router.navigate(['/zone/add']);
  }

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  onDelete(id: number): void {
    this.zoneService.deleteZone(id).subscribe({
      next: () => {
        this.zones = this.zones.filter(z => z.id !== id);
        this.filteredZones = this.filteredZones.filter(z => z.id !== id);
        this.deleteConfirmId = null;
      }
    });
  }
}
