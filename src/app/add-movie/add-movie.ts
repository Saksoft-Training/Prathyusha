import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../movie'; 
// import { Movie } from '../movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-movie',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-movie.html',
  styleUrl: './add-movie.scss'
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

  addMovie() {
    if (typeof this.movie.genre === 'string') {
      this.movie.genre = (this.movie.genre as unknown as string)
        .split(',')
        .map(g => g.trim());
    }
    if (typeof this.movie.cast === 'string') {
      this.movie.cast = (this.movie.cast as unknown as string)
        .split(',')
        .map(c => c.trim());
    }
    this.movieService.add(this.movie); // add's movie to service
    this.router.navigate(['/movies']); // goes back to list 
  }
}