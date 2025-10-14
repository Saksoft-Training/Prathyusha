import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Movie , MovieType } from '../../services/movie';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.scss']
})
export class MovieList {
public movies: MovieType[] = [];
  private movieService = inject(Movie);
  private router = inject(Router);
  /**
   * Lifecycle hook that runs when the component initializes.
   * Fetches all movies from the service.
   * @returns void
   */
  public ngOnInit(): void {
    this.movies = this.movieService.getAll(); 
  }

  /**
   * Navigates to the details page for a selected movie.
   * @param id - Movie ID to navigate to.
   * @returns void
   */
  public goToDetails(id: number): void {
    this.router.navigate(['/movies', id]);
  }
  /**
   * Removes a movie from the service and refreshes the movie list.
   * Prevents the click from propagating to the movie card.
   * @param id - Movie ID to remove.
   * @param event - Mouse event to stop propagation.
   * @returns void
   */
  public removeMovie(id: number, event: Event): void{
  event.stopPropagation();  // prevent navigating to details
  this.movieService.remove(id); // remove from service
  this.movies = this.movieService.getAll(); // refresh the list
}

}