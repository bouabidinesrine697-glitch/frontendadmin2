import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FactureService } from '../facture.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {
  factures: any[] = [];
  isLoading = false;

  constructor(
    private factureService: FactureService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadFactures();
  }

  loadFactures(): void {
    this.isLoading = true;
    this.factureService.getAll().subscribe({
      next: (data: any) => {
        this.factures = data;
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  goToAdd(): void {
    this.router.navigate(['/facture/add']);
  }
}