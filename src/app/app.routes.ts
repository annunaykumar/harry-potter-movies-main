import { Routes } from '@angular/router';
import { MovieListComponent } from './movie-list.component';
import { MovieDetailComponent } from './movie-detail.component';

export const appRoutes: Routes = [
  { path:'',redirectTo:'/movies',pathMatch:'full'},
  { path: 'movies', component: MovieListComponent },
  { path: 'movies/:id', component: MovieDetailComponent },
];
