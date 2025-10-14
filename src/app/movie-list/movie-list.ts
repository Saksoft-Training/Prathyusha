import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Movie , MovieType } from '../movie';
// import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
// import { LoggerService } from '../../service/logger';
@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.scss'
})
export class MovieList {
movies: MovieType[] = [];
  private movieService = inject(Movie);
  private router = inject(Router);

  ngOnInit(): void {
    this.movies = this.movieService.getAll(); 
  }

  goToDetails(id: number) {
    this.router.navigate(['/movies', id]);
  }
removeMovie(id: number, event: Event) {
  event.stopPropagation();  // prevent navigating to details
  this.movieService.remove(id); // remove from service
  this.movies = this.movieService.getAll(); // refresh the list
}

}