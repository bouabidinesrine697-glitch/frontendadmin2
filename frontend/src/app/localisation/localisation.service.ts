import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalisationService {

  private apiUrl = 'http://localhost:8000/stations/';

  constructor(private http: HttpClient) { }

  getStations(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getStation(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  addStation(station: any): Observable<any> {
    return this.http.post(this.apiUrl, station);
  }

  updateStation(id: number, station: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, station);
  }

  deleteStation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}