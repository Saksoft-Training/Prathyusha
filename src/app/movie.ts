import { Injectable } from '@angular/core';
import { LoggerService } from './logger';

export interface MovieType {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  duration: string;
  genre: string[];
  description: string;
  cast: string[];
  rating: number;
}

@Injectable({
  providedIn: 'root'
})
export class Movie {
  private movies: MovieType[] = [
    {
      id: 1,
      title: 'They Call Him OG',
      year: 2025,
      posterUrl: 'https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-image,i-discovery-catalog@@icons@@star-icon-202203010609.png,lx-24,ly-615,w-29,l-end:l-text,ie-OS8xMCAgMTYwLjFLIFZvdGVz,fs-29,co-FFFFFF,ly-612,lx-70,pa-8_0_0_0,l-end/et00369074-asrgqvfrbx-portrait.jpg',
      duration: '2h 34m',
      genre: ['Action, Crime, Drama, Thriller'],
      description: 'After vanishing from Mumbai`s underworld for a decade, mob boss Ojas Gambheera resurfaces-feared, unstoppable, and with a single goal: to reclaim his empire and exact vengeance on the current tyrant, Omi Bhau. As loyalties fracture and alliances shift, OG reignites a brutal criminal war, confronting both external threats and haunting buried betrayals.',
      cast: ['Pawan Kalyan', 'Priyanka Mohan'],
      rating: 9.3
    },
    {
      id: 2,
      title: 'Kantara 2',
      year: 2025,
      posterUrl: 'https://assets-in.bmscdn.com/iedb/movies/images/mobile/thumbnail/xlarge/kantara-a-legend-chapter-1-et00377351-1701090949.jpg',
      duration: '2h 48m',
      genre: ['Adventure', 'Drama', 'Thriller'],
      description: 'The moment has arrived. The divine forest whispers. A Legend was born!',
      cast: ['Rishab Shetty', 'Rukmini Vasnth'],
      rating: 9.0
    },
    {
      id: 3,
      title: 'Madharaasi',
      year: 2025,
      posterUrl: 'https://th.bing.com/th/id/OIP.Es5uh1T27YPw6m716XfW1QHaEK?w=301&h=180&c=7&r=0&o=7&pid=1.7&rm=3',
      duration: '2h 15m',
      genre: ['Action', 'Thriller'],
      description: 'A psychological action thriller where a patient with Fregoli delusion becomes involved in stopping a gun syndicate in Tamil Nadu.',
      cast: ['Sivakarthikeyan', 'Rukmini Vasanth', 'Vidyut Jammwal'],
      rating: 7.8
    },
    {
      id: 4,
      title: 'Odum Kuthira Chadum Kuthira',
      year: 2025,
      posterUrl: 'https://m.media-amazon.com/images/M/MV5BZTkyMDQ2NzUtYTg0NS00ZWIwLTkwNmYtNTMzOGI2ZjkzMDBlXkEyXkFqcGc@._V1_.jpg',
      duration: '2h 18m',
      genre: ['Supernatural', 'Mystery'],
      description: 'A haunted curve in Kerala draws people into supernatural encounters, unraveling a chilling tale of loss and the unknown.',
      cast: ['Fahadh Faasil', 'Kalyani Priyadarshan'],
      rating: 8.0
    }
  ];

  constructor(private logger: LoggerService) {}

  getAll(): MovieType[] {
    this.logger.log('Fetched all movies');
    return [...this.movies];
  }

  getById(id: number): MovieType | undefined {
    this.logger.log('Clicked on movie card');
    return this.movies.find(m => m.id === id);
  }

  add(movie: MovieType): void {
  let newId = 1;
  // if movies exist, take the id of the last movie and add 1
  if (this.movies.length > 0) {
    const lastMovie = this.movies[this.movies.length - 1];
    newId = lastMovie.id + 1;
  }
  movie.id = newId;          //  the new ID
  this.movies.push(movie);   // add's movie to the list
  this.logger.log('Added new movie');
}

remove(id: number): void {
  const index = this.movies.findIndex(m => m.id === id);
  if (index !== -1) {
    this.movies.splice(index, 1);   // remove movie from array
    this.logger.log(`Removed movie with id: ${id}`);
  }
}

}
