//#region Imports
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../../services/movie';
import { CommonModule } from '@angular/common';
//#endregion

//#region Component Metadata
@Component({
  selector: 'app-movie-list',
  imports: [CommonModule],
  templateUrl: './movie-list.html',
  styleUrls: ['./movie-list.scss']
})
//#endregion

//#region MovieList Component
export class MovieList implements OnInit {

  //#region Properties
  public movies: MovieType[] = [];
  private movieService = inject(Movie);
  private router = inject(Router);
  //#endregion

  //#region Lifecycle Hooks
  /**
   * Runs when the component initializes.
   * Subscribes to the movies$ observable from the service to get the movie list.
   */
  public ngOnInit(): void {
    this.movieService.movies$.subscribe({
      next: (data) => {
        this.movies = data;
      },
      error: (err) => console.error('Failed to load movies:', err)
    });
  }
  //#endregion

  //#region Component Methods
  /**
   * Navigates to the details page for a selected movie.
   * @param id - Movie ID to navigate to.
   */
  public goToDetails(id: number): void {
    this.router.navigate(['/movies', id]);
  }

  /**
   * Removes a movie from the service and refreshes the movie list.
   * Prevents the click from propagating to the movie card.
   * @param id - Movie ID to remove.
   * @param event - Mouse event to stop propagation.
   */
  public removeMovie(id: number, event: Event): void {
    event.stopPropagation();        // Prevent navigating to details
    this.movieService.remove(id);   // Remove from service
    // No need to call getAll() because movies$ emits updated value automatically
  }
  //#endregion

}
//#endregion
