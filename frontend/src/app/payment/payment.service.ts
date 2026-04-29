import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'http://localhost:8000/paiements/';

  constructor(private http: HttpClient) { }

  getPayments(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getPayment(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  addPayment(payment: any): Observable<any> {
    return this.http.post(this.apiUrl, payment);
  }

  updatePayment(id: number, payment: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, payment);
  }

  deletePayment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}