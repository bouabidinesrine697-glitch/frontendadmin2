import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private apiUrl = 'http://localhost:8000/notifications/';

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getNotification(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}${id}/`);
  }

  addNotification(notification: any): Observable<any> {
    return this.http.post(this.apiUrl, notification);
  }

  updateNotification(id: number, notification: any): Observable<any> {
    return this.http.put(`${this.apiUrl}${id}/`, notification);
  }

  deleteNotification(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}/`);
  }
}