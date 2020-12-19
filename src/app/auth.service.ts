import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  private usersURL = "http://localhost:3000/users/";
  constructor(private http: HttpClient) { }

  getData(email,password) {
    return this.http.get(`${this.usersURL}?email=${email}&password=${password}`);
  }

  public logout(){
    localStorage.removeItem('Movie');
    this.isLoggedIn$.next(false);
  }
}
