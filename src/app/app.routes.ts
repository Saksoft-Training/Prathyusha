import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { MovieList } from './components/movie-list/movie-list';
import { MovieDetails } from './components/movie-details/movie-details';
import { AddMovie } from './components/add-movie/add-movie';
import { About } from './components/about/about';
import { GithubUserComponent } from './components/github-user/github-user';

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
    { path: 'github', 
        component: GithubUserComponent 
    }, 
    { path: '**', 
        redirectTo: '' 
    }
    
];