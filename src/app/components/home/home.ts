//#region Imports
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../../services/movie';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.Service';
import { Subscription } from 'rxjs';
//#endregion

//#region Component Metadata
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
//#endregion

//#region Home Component
export class Home implements OnInit, OnDestroy {

  //#region Properties
  /** Holds the list of movies to display on the home page */
  public movies: MovieType[] = []; 

  /** Injected Movie service to access movie data */
  private movieService = inject(Movie);

  /** Injected Router service for navigation */
  private router = inject(Router);

  /** Subscription for GitHub notifications */
  private notificationSub: Subscription; 

  /** Subscription for movies observable */
  private movieSub?: Subscription;
  //#endregion

  //#region Constructor
  constructor(private githubService: GithubService) {
    this.notificationSub = this.githubService.notificationSubject.subscribe({
      next: (data) => console.log('myThridSubject:', data)
    });
  }
  //#endregion

  //#region Lifecycle Hooks
  /**
   * Initializes the component.
   * Subscribes to movies$ from Movie service and loads the first 4 movies.
   */
  public ngOnInit(): void {
    this.movieSub = this.movieService.movies$.subscribe({
      next: (data) => {
        this.movies = data.slice(0, 4); // Display first 4 movies
      },
      error: (err) => console.error('Error loading movies:', err)
    });
  }

  /**
   * Cleans up active subscriptions to prevent memory leaks.
   */
  public ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
    this.movieSub?.unsubscribe();
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
  //#endregion

}
//#endregion
