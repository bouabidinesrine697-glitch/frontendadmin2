import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trottinette } from './trottinette';

@Injectable({
  providedIn: 'root'
})
export class TrottinetteService {

  private apiUrl = 'http://localhost:8000/trottinettes/';

  constructor(private http: HttpClient) { }

  // Trottinette CRUD
  getTrottinetteList(): Observable<Trottinette[]> {
    return this.http.get<Trottinette[]>(this.apiUrl + 'TrottinetteList/');
  }

  getTrottinetteDetail(id: number): Observable<Trottinette> {
    return this.http.get<Trottinette>(this.apiUrl + `TrottinetteDetail/${id}/`);
  }

  addTrottinette(trottinette: Trottinette, imageFile?: File): Observable<Trottinette> {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(trottinette).forEach(key => {
        if (trottinette[key as keyof Trottinette] !== undefined && trottinette[key as keyof Trottinette] !== null) {
          formData.append(key, trottinette[key as keyof Trottinette]!.toString());
        }
      });
      formData.append('image', imageFile);
      return this.http.post<Trottinette>(this.apiUrl + 'TrottinetteAdd/', formData);
    } else {
      return this.http.post<Trottinette>(this.apiUrl + 'TrottinetteAdd/', trottinette);
    }
  }

  updateTrottinette(id: number, trottinette: Trottinette, imageFile?: File): Observable<Trottinette> {
    if (imageFile) {
      const formData = new FormData();
      Object.keys(trottinette).forEach(key => {
        if (trottinette[key as keyof Trottinette] !== undefined && trottinette[key as keyof Trottinette] !== null) {
          formData.append(key, trottinette[key as keyof Trottinette]!.toString());
        }
      });
      formData.append('image', imageFile);
      return this.http.put<Trottinette>(this.apiUrl + `TrottinetteUpdate/${id}/`, formData);
    } else {
      return this.http.put<Trottinette>(this.apiUrl + `TrottinetteUpdate/${id}/`, trottinette);
    }
  }

  deleteTrottinette(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/delete/`);
  }

  getAvailableTrottinettes(): Observable<Trottinette[]> {
    return this.http.get<Trottinette[]>(this.apiUrl + 'TrottinetteAvailable/');
  }

  getNearbyTrottinettes(): Observable<Trottinette[]> {
    return this.http.get<Trottinette[]>(this.apiUrl + 'TrottinetteNearby/');
  }

  // Maintenance
  addMaintenance(maintenance: any): Observable<any> {
    return this.http.post(this.apiUrl + 'MaintenanceAdd/', maintenance);
  }

  getMaintenanceList(): Observable<any> {
    return this.http.get(this.apiUrl + 'MaintenanceList/');
  }

  getMaintenanceByTrottinette(trottinetteId: number): Observable<any> {
    return this.http.get(this.apiUrl + `MaintenanceByTrottinette/${trottinetteId}/`);
  }

  // Booking
  addTrottinetteBooking(booking: any): Observable<any> {
    return this.http.post(this.apiUrl + 'TrottinetteBookingAdd/', booking);
  }

  // ✅ CORRIGÉES ICI
  confirmBooking(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}bookings/${id}/confirm/`, {});
  }

  refuserBooking(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}bookings/${id}/refuser/`, {});
  }
}