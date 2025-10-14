import { Component,  inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieType } from '../../services/movie';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.Service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home implements OnInit{
  movies: MovieType[] = []; // empty array to store the movie details coming from service 
  private movieService = inject(Movie);
  private router = inject(Router); // takes to details page
  constructor(private githubService: GithubService) {
    this.githubService.myThridSubject.subscribe({
        next:(data)=>{ console.log(data)},
      })
  }
  /** 
   * Lifecycle hook that runs once the component initializes.
   * @returns void
   */
  ngOnInit(): void {
    this.movies = this.movieService.getAll().slice(0, 4); // to show only 4 movies 
  }
  /**
   * Navigates to the movie details page based on ID.
   * @param id - Movie ID to navigate to.
   * @returns void
   */
  goToDetails(id: number):void {
    this.router.navigate(['/movies', id]); 
  }

}