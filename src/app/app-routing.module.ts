import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmsComponent} from "./films/films.component";
import {CreateFilmComponent} from "./create-film/create-film.component";
import {FilmDetailComponent} from "./film-detail/film-detail.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'films', pathMatch: 'full'
  },
  {
    path: 'films', component: FilmsComponent
  },

  {
    path: 'films/create', component: CreateFilmComponent
  },
  {
    path: 'films/:name', component: FilmDetailComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
