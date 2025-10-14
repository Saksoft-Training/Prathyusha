//#region Imports
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../../services/movie';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.Service';
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
export class Home implements OnInit {

  //#region Properties
  movies: MovieType[] = []; // Store movie details coming from service
  private movieService = inject(Movie);
  private router = inject(Router);
  //#endregion

  //#region Constructor
  constructor(private githubService: GithubService) {
    this.githubService.myThridSubject.subscribe({
      next: (data) => console.log('myThridSubject:', data)
    });
  }
  //#endregion

  //#region Lifecycle Hooks
  /** 
   * Runs once the component initializes.
   * Loads the first 4 movies from the service.
   */
  ngOnInit(): void {
    this.movies = this.movieService.getAll().slice(0, 4);
  }
  //#endregion

  //#region Component Methods
  /**
   * Navigates to the movie details page based on ID.
   * @param id - Movie ID to navigate to.
   */
  goToDetails(id: number): void {
    this.router.navigate(['/movies', id]);
  }
  //#endregion

}
//#endregion
