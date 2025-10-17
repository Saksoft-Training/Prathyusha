//#region Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoggerService } from './logger';
import { BehaviorSubject, Observable } from 'rxjs';
//#endregion

//#region MovieType Interface
export interface MovieType {
  cast: string[];
  description: string;
  duration: string;
  genre: string[];
  id: number;
  posterUrl: string;
  rating: number;
  title: string;
  year: number;
}
//#endregion

//#region Injectable Metadata
@Injectable({
  providedIn: 'root'
})
//#endregion

//#region Movie Service
export class Movie {
  //#region Properties
  private moviesSubject = new BehaviorSubject<MovieType[]>([]);
  public movies$: Observable<MovieType[]> = this.moviesSubject.asObservable();
  private moviesJsonPath = 'assets/movies.json';
  //#endregion

  //#region Constructor
  constructor(private logger: LoggerService, private http: HttpClient) {
    this.loadMovies();
  }
  //#endregion

  //#region Private Methods
  /**
   * Loads movies from the JSON file located in assets folder.
   * Populates the BehaviorSubject for subscribers.
   */
  private loadMovies(): void {
    this.http.get<MovieType[]>(this.moviesJsonPath).subscribe({
      next: (data) => {
        this.moviesSubject.next(data);
        this.logger.log('Movies loaded from JSON');
      },
      error: (err) => {
        this.logger.log('Failed to load movies JSON: ' + err);
      }
    });
  }
  //#endregion

  //#region Public Methods
  /**
   * Returns a copy of all movies currently loaded.
   * @returns MovieType[] - Array of movies
   */
  public getAll(): MovieType[] {
    this.logger.log('Fetched all movies');
    return [...this.moviesSubject.getValue()];
  }

  /**
   * Returns a movie by its ID.
   * @param id - ID of the movie
   * @returns MovieType | undefined - The movie object or undefined if not found
   */
  public getById(id: number): MovieType | undefined {
    this.logger.log('Clicked on movie card');
    return this.moviesSubject.getValue().find(m => m.id === id);
  }

  /**
   * Adds a new movie to the movie list.
   * Generates a new ID if needed.
   * Updates the BehaviorSubject so subscribers get the updated list.
   * @param movie - MovieType object to add
   */
  public add(movie: MovieType): void {
    const currentMovies = [...this.moviesSubject.getValue()];
    let newId = 1;
    if (currentMovies.length > 0) {
      newId = currentMovies[currentMovies.length - 1].id + 1;
    }
    movie.id = newId;
    currentMovies.push(movie);
    this.moviesSubject.next(currentMovies);
    this.logger.log('Added new movie');
  }

  /**
   * Removes a movie by its ID.
   * Updates the BehaviorSubject so subscribers get the updated list.
   * @param id - ID of the movie to remove
   */
  public remove(id: number): void {
    const currentMovies = [...this.moviesSubject.getValue()];
    const index = currentMovies.findIndex(m => m.id === id);
    if (index !== -1) {
      currentMovies.splice(index, 1);
      this.moviesSubject.next(currentMovies);
      this.logger.log(`Removed movie with id: ${id}`);
    }
  }
  //#endregion
}
//#endregion
