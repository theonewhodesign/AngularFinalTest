import { Component, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  @ViewChild('closebutton') closebutton;

  movies = [];
  movieName;
  time;
  price;

  constructor(
    private myservice: MyserviceService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.myservice.getMovies().subscribe((data) => {
      this.movies = Array.from(Object.keys(data), (k) => data[k]);
    });
  }

  onChange(event) {
    this.time = event.target.value;
  }

  showMovieData(movie) {
    this.movieName = movie.name;
    this.price = movie.price;
  }

  showToastr() {
    this.toastr.success('Success', 'Ticket confirmed', {
      timeOut: 1500,
      positionClass: 'toast-top-center',
    });
    this.closebutton.nativeElement.click();
  }
}
