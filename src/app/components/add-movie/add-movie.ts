import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../../services/movie'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GithubService } from '../../services/github.Service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-add-movie',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-movie.html',
  styleUrls: ['./add-movie.scss']
})
export class AddMovie implements OnInit, OnDestroy {

  /** Access to movie service to get/add movies */
  private readonly movieService = inject(Movie);

  /** Router for navigation */
  private readonly router = inject(Router);

  /** Subject to clean up subscriptions */
  private readonly destroy$ = new Subject<void>();

  /** Movie model bound to the form */
  public movie: MovieType = {
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

  constructor(private readonly githubService: GithubService) {
    // Subscribe to subjects safely with takeUntil
    this.githubService.mySecondSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => console.log('mySecondSubject:', data));

    this.githubService.userbehaviourSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => console.log('userbehaviourSubject:', data));
  }

  /**
   * Lifecycle hook called on component initialization.
   * Fetches demo GitHub data.
   */
  public ngOnInit(): void {
    this.githubService.fetchData('prathyusha')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: res => console.log('Hello from AddMovie:', res),
        error: err => console.error('Error fetching GitHub data:', err)
      });
  }

  /**
   * Adds a movie using the Movie service and navigates back to /movies.
   * Handles string-to-array conversion for genre and cast fields.
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

  /**
   * Emits a demo array through the mySecondSubject for testing.
   */
  public random(): void {
    this.githubService.mySecondSubject.next([1, 2, 3, 4]);
  }

  /**
   * Lifecycle hook called when the component is destroyed.
   * Completes the destroy$ subject to unsubscribe all observables.
   */
  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
