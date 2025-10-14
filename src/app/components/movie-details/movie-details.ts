//#region Imports
import { Component, inject, OnInit } from '@angular/core';
import { Movie, MovieType } from '../../services/movie';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
//#endregion

//#region Component Metadata
@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.scss']
})
//#endregion

//#region MovieDetails Component
export class MovieDetails implements OnInit {

  //#region Properties
  public movie?: MovieType;

  /** ActivatedRoute to access route parameters */
  private route = inject(ActivatedRoute);

  /** Movie service to get movie data */
  private movieService = inject(Movie);
  //#endregion

  //#region Lifecycle Hooks
  /**
   * Runs when the component initializes.
   * Fetches the movie ID from the route and retrieves the movie details.
   */
  public ngOnInit(): void {
    const idString = this.route.snapshot.paramMap.get('id'); // Get id from URL

    if (idString) {
      const id = parseInt(idString, 10); // Convert string to number
      this.movie = this.movieService.getById(id); // Fetch movie by id
    }
  }
  //#endregion

}
//#endregion
