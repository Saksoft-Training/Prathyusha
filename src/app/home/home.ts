import { Component,  inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../movie';
// import { Movie } from '../movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit{
  movies: MovieType[] = []; // empty array to store the movie details coming from service 
  private movieService = inject(Movie);
  private router = inject(Router); // takes to details page

  ngOnInit(): void {
    this.movies = this.movieService.getAll().slice(0, 4); // to show only 4 movies 
  }

  goToDetails(id: number) {
    this.router.navigate(['/movies', id]); // it ytakes to details page
  }

}