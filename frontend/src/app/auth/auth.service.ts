import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/accounts/';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post(this.apiUrl + 'login/', credentials);
  }

  logout(): Observable<any> {
    return this.http.post(this.apiUrl + 'logout/', {});
  }

  register(user: any): Observable<any> {
    return this.http.post(this.apiUrl + 'register/', user);
  }

  getProfile(): Observable<any> {
    return this.http.get(this.apiUrl + 'profil/');
  }

  updateProfile(profile: any): Observable<any> {
    return this.http.put(this.apiUrl + 'profil/modifier/', profile);
  }

  changePassword(passwordData: any): Observable<any> {
    return this.http.post(this.apiUrl + 'changer-mot-de-passe/', passwordData);
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post(this.apiUrl + 'reset-mot-de-passe/', { email });
  }

  confirmResetPassword(uidb64: string, token: string, passwordData: any): Observable<any> {
    return this.http.post(this.apiUrl + `reset/${uidb64}/${token}/`, passwordData);
  }
}
