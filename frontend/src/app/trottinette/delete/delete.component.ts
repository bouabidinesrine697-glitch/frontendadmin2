import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrottinetteService } from '../trottinette.service';
import { Trottinette } from '../trottinette';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
export class DeleteComponent implements OnInit {

  trottinette: Trottinette | null = null;
  isLoading = false;
  isDeleting = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private trottinetteService: TrottinetteService
  ) {}

  ngOnInit(): void {
    const id = +this.route.snapshot.params['id'];
    this.loadTrottinette(id);
  }

  loadTrottinette(id: number): void {
    this.isLoading = true;
    this.trottinetteService.getTrottinetteDetail(id).subscribe({
      next: (data: Trottinette) => {
        this.trottinette = data;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
        this.router.navigate(['/trottinette/list']);
      }
    });
  }

  onDelete(): void {
    if (this.trottinette?.id) {
      this.isDeleting = true;
      this.trottinetteService.deleteTrottinette(this.trottinette.id).subscribe({
        next: () => {
          this.router.navigate(['/trottinette/list']);
        },
        error: () => {
          this.isDeleting = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/trottinette/list']);
  }
}
