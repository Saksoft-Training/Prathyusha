import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { MovieList } from './movie-list/movie-list';
import { MovieDetails } from './movie-details/movie-details';
import { AddMovie } from './add-movie/add-movie';
import { About } from './about/about';
// import { FormsModule } from '@angular/forms';

export const routes: Routes = [
    { path: '', 
        component: Home 
    },
    { path: 'movies', 
        component: MovieList 
    },
    { path: 'movies/:id', 
        component: MovieDetails 
    },
    { path: 'add-movie', 
        component: AddMovie 
    },
    { path: 'about',
        component: About
    },
    { path: '**', 
        redirectTo: '' 
    }
];