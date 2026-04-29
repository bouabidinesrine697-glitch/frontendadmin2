import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor( private http:HttpClient) { }
  create(user:User):Observable<any>{
      const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};
    return this.http.post('http://127.0.0.1:8000/accounts/UserAdd/',user ,httpOptions) as Observable<any>
  }
    getAll():Observable<any>{
      const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};
    return this.http.get('http://127.0.0.1:8000/accounts/userList/') as Observable<any>
  }
      delete(id:number):Observable<any>{
      const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};
    return this.http.delete('http://127.0.0.1:8000/accounts/UserDelete/'+JSON.stringify(id)+"/") as Observable<any>
  }
        update(id:number , user:User):Observable<any>{
      const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};
    return this.http.patch('http://127.0.0.1:8000/accounts/UserUpdate/'+String(id)+"/",user) as Observable<any>
  }
  getById(id:number):Observable<any>{
      const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};
    return this.http.get('http://127.0.0.1:8000/accounts/UserDetail/'+String(id)+"/") as Observable<any>
  }
}
