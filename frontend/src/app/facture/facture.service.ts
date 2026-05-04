import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FactureService {
  private apiUrl = 'http://localhost:8000/facture/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl + 'factures/');
  }

  create(facture: any): Observable<any> {
    return this.http.post(this.apiUrl + 'factures/add/', facture);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}factures/${id}/`);
  }
}