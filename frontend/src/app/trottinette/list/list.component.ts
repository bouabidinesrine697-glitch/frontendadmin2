import { Component, OnInit } from '@angular/core';
import { TrottinetteService } from '../trottinette.service';
import { Router } from '@angular/router';
import { Trottinette } from '../trottinette';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {

  trottinettes: Trottinette[] = [];
  filteredTrottinettes: Trottinette[] = [];
  isLoading = false;
  searchQuery = '';
  deleteConfirmId: number | null = null;

  constructor(
    private trottinetteService: TrottinetteService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadTrottinettes();
  }

  loadTrottinettes(): void {
    this.isLoading = true;
    this.trottinetteService.getTrottinetteList().subscribe({
      next: (data: Trottinette[]) => {
        console.log('Trottinettes loaded:', data);
        this.trottinettes = data;
        this.filteredTrottinettes = data;
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
    this.filteredTrottinettes = this.trottinettes.filter(t =>
      t.QR_code.toLowerCase().includes(q) ||
      t.model.toLowerCase().includes(q) ||
      t.status.toLowerCase().includes(q)
    );
  }

  getInitials(trottinette: Trottinette): string {
    return trottinette.model?.[0]?.toUpperCase() || '?';
  }

  onEdit(id: number): void {
    this.router.navigate(['/trottinette/update/', id]);
  }

  onAdd(): void {
    this.router.navigate(['/trottinette/add']);
  }

  confirmDelete(id: number): void {
    this.deleteConfirmId = id;
  }

  cancelDelete(): void {
    this.deleteConfirmId = null;
  }

  onDelete(id: number): void {
    this.trottinetteService.deleteTrottinette(id).subscribe({
      next: () => {
        this.trottinettes = this.trottinettes.filter(t => t.id !== id);
        this.filteredTrottinettes = this.filteredTrottinettes.filter(t => t.id !== id);
        this.deleteConfirmId = null;
      }
    });
  }
  async onRefuser(id:any): Promise<void> {
    let trottinette = await this.trottinettes.find(t => t.id === id);
    if (trottinette) {  

    this.trottinetteService.updateTrottinette(id, { ...trottinette, status: 'maintenance' }).subscribe({
      next: () => {
        this.loadTrottinettes();
      }
    });


}
  }
   async onConfirm(id:any): Promise<void> {
    let trottinette = await this.trottinettes.find(t => t.id === id);
    if (trottinette) {  

    this.trottinetteService.updateTrottinette(id, { ...trottinette, status: 'réserve' }).subscribe({
      next: () => {
        this.loadTrottinettes();
      }
    });


}
  }

}

