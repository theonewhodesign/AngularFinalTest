import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MyserviceService {
  private usersURL = 'http://localhost:3000/users/';
  private moviesURL = 'http://localhost:3000/movies/';
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(this.usersURL);
  }

  getMovies() {
    return this.http.get(this.moviesURL);
  }

  registerUser(user) {
    this.http.post<any>(this.usersURL, user).subscribe((response) => {
      console.log(response);
    });
  }
}
