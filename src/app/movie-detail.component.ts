import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    console.log(movieId);
    this.movieService.getMovieById(movieId!).subscribe((data: Movie) => {
      console.log(data);
      this.movie = data;
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

  goBack(): void {
    this.router.navigate(['/']);
  }
}
