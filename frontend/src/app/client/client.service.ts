import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  getById(id: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/client/';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.apiUrl + 'clients/');
  }

  getClient(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}clients/${id}/`);
  }

  create(client: any): Observable<any> {
    return this.http.post(this.apiUrl + 'clients/add/', client);
  }

  register(client: any): Observable<any> {
    return this.http.post(this.apiUrl + 'clients/register/', client);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + 'clients/login/', credentials);
  }

  update(id: number, client: any): Observable<any> {
    return this.http.put(`${this.apiUrl}clients/${id}/`, client);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}clients/${id}/`);
  }
}