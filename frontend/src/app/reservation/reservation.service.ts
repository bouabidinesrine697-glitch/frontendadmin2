import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reservation } from './reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private apiUrl = 'http://localhost:8000/trottinettes/';

  constructor(private http: HttpClient) { }

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl + 'TrottinetteBookingList/');
  }

  getReservation(id: number): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}TrottinetteBooking/${id}/`);
  }

  addReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl + 'TrottinetteBookingAdd/', reservation);
  }

  updateReservation(id: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}trottinettebookingupdate/${id}/`, reservation);
  }

  endReservation(bookingId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}TrottinetteBooking/${bookingId}/`, {});
  }

  getUserReservations(userId: number): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}UserBooking/${userId}/`);
  }

  getTrottinetteStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}TrottinetteStats/`);
  }
  confirmReservation(id: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}bookingconfirm/${id}/`, {});
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }

}
