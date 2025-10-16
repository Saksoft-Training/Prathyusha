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
  movies: MovieType[] = []; 
  private movieService = inject(Movie);
  private router = inject(Router);

  private notificationSub: Subscription; 
  //#endregion

  //#region Constructor
  constructor(private githubService: GithubService) {
    this.notificationSub = this.githubService.notificationSubject.subscribe({
      next: (data) => console.log('myThridSubject:', data)
    });
  }
  //#endregion

  //#region Lifecycle Hooks
  public ngOnInit(): void {
    this.movies = this.movieService.getAll().slice(0, 4);
  }

  /** Clean up subscriptions to prevent memory leaks */
  public ngOnDestroy(): void {
    this.notificationSub.unsubscribe();
  }
  //#endregion

  //#region Component Methods
  /** Navigate to the movie details page based on ID */
  public goToDetails(id: number): void {
    this.router.navigate(['/movies', id]);
  }
  //#endregion

}
//#endregion
