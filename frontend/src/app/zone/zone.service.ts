import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Zone } from './zone';

@Injectable({
  providedIn: 'root'
})
export class ZoneService {

  private apiUrl = 'http://localhost:8000/zone/';

  constructor(private http: HttpClient) { }

  getZones(): Observable<Zone[]> {
    return this.http.get<Zone[]>(this.apiUrl+"zones/");
  }

  getZone(id: number): Observable<Zone> {
    return this.http.get<Zone>(`${this.apiUrl}${id}/`);
  }

  addZone(zone: Zone): Observable<Zone> {
    return this.http.post<Zone>(this.apiUrl+"zones-create/", zone);
  }

  updateZone(id: number, zone: Zone): Observable<Zone> {
    return this.http.put<Zone>(`${this.apiUrl}${id}/`, zone);
  }

  deleteZone(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}
