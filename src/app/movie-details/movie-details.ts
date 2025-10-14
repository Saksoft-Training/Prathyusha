import { Component , inject, OnInit} from '@angular/core';
import { Movie , MovieType } from '../movie';
// import { Movie } from '../movie';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.scss'
})
export class MovieDetails implements OnInit {
movie?: MovieType;
  private route = inject(ActivatedRoute);
  private movieService = inject(Movie);

  ngOnInit(): void {
  const idString = this.route.snapshot.paramMap.get('id'); // gets id from in the url

  if (idString) {
    const id = parseInt(idString);       // convert string to number
    this.movie = this.movieService.getById(id);  // fetch movie by id
  }
}
}
