//#region Imports
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../../services/movie';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubService } from '../../services/github.Service';
import { Subject, takeUntil } from 'rxjs';
//#endregion

//#region Component Metadata
@Component({
  selector: 'app-add-movie',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movie.html',
  styleUrls: ['./add-movie.scss']
})
//#endregion

//#region AddMovie Component
export class AddMovie implements OnInit, OnDestroy {

  //#region Injected Services
  private readonly movieService = inject(Movie);        // Movie service
  private readonly router = inject(Router);            // Router service
  private readonly destroy$ = new Subject<void>();     // Cleanup for subscriptions
  //#endregion

  //#region Component Properties
  public movie: MovieType = {                          // Movie model bound to form
    cast: [],
    description: '',
    duration: '',
    genre: [],
    id: 0,
    posterUrl: '',
    rating: 0,
    title: '',
    year: new Date().getFullYear(),
  };
  //#endregion

  //#region Constructor
  constructor(private readonly githubService: GithubService) {
    this.githubService.messageSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => console.log('mySecondSubject:', data));

    this.githubService.userListBehaviour
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => console.log('userbehaviourSubject:', data));
    //#endregion
  }
  //#endregion

  //#region Lifecycle Hooks
  /** Fetches GitHub data on component initialization */
  public ngOnInit(): void {
    this.githubService.fetchData('prathyusha')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => console.log('Hello from AddMovie:', res),
        error: err => console.error('Error fetching GitHub data:', err)
      });
  }

  /** Cleans up all subscriptions when component is destroyed */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  //#endregion

  //#region Component Methods

  //#region addMovie
  /**
   * Adds a movie using the Movie service and navigates to /movies
   * Converts genre and cast from string to array if needed
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

    this.movieService.add(this.movie);
    this.router.navigate(['/movies']);
  }
  //#endregion

  //#region random
  /**
   * Emits a demo array through mySecondSubject for testing purposes
   */
  public random(): void {
    this.githubService.messageSubject.next('Hello, from add-movie component');
  }
  //#endregion

  //#endregion

}
//#endregion

