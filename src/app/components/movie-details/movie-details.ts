import { Component , inject, OnInit} from '@angular/core';
import { Movie } from '../../services/movie';
import { MovieType } from '../../services/movie';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrls: ['./movie-details.scss']
})
export class MovieDetails implements OnInit {
  public movie?: MovieType;
  /** ActivatedRoute to access route parameters */
  private route = inject(ActivatedRoute);
  /** Movie service to get movie data */
  private movieService = inject(Movie);

  /**
   * Lifecycle hook that runs when the component initializes.
   * Fetches the movie ID from the route and retrieves the movie details.
   * @returns void
   */
  public ngOnInit(): void {
  const idString = this.route.snapshot.paramMap.get('id'); // gets id from in the url

  if (idString) {
    const id = parseInt(idString);       // convert string to number
    this.movie = this.movieService.getById(id);  // fetch movie by id
  }
}
}
