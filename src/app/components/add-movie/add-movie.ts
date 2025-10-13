import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../../services/movie';
// import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movie.html',
  styleUrls: ['./add-movie.scss']
})
export class AddMovie {
  private movieService = inject(Movie); // give's access to get , add
  private router = inject(Router); // lets' us to navigate to all movies

  movie: MovieType = { // movie object
    id: 0,
    title: '',
    year: new Date().getFullYear(),
    posterUrl: '',
    duration: '',
    genre: [],
    description: '',
    cast: [],
    rating: 0
  };
  /**
   * Adds a new movie to the movie list and navigates back to the movies page.
   * Handles string-to-array conversion for genre and cast.
   * @returns void
   */
  public addMovie(): void {
    if (typeof this.movie.genre === 'string') {
      this.movie.genre = (this.movie.genre as string)
        .split(',')
        .map(g => g.trim());
    }
    if (typeof this.movie.cast === 'string') {
      this.movie.cast = (this.movie.cast as string)
        .split(',')
        .map(c => c.trim());
    }
    this.movieService.add(this.movie); // add's movie to service
    this.router.navigate(['/movies']); // goes back to list 
  }
}