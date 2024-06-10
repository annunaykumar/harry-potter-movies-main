import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  movies: Movie[] = [];
  titleFilter: string = '';
  yearFilter: string = '';

  constructor(private movieService: MovieService, private router: Router) { }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe((data: Movie[]) => {
      this.movies = data;
    });
  }

  formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  formatCurrency(amount: number): string {
    return `$${amount.toLocaleString()}`;
  }

  filteredMovies(): Movie[] {
    return this.movies.filter(movie => {
      return (!this.titleFilter || movie.title.toLowerCase().includes(this.titleFilter.toLowerCase())) &&
             (!this.yearFilter || new Date(movie.release_date).getFullYear().toString() === this.yearFilter);
    });
  }

  viewDetails(movieId: number): void {
    this.router.navigate(['/movies', movieId]);
  }
}
