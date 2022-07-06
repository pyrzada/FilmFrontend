import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FilmsComponent} from "./films/films.component";
import {CreateFilmComponent} from "./create-film/create-film.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'films', pathMatch: 'full'
  },
  {
    path: 'films', component: FilmsComponent
  },
  {
    path: 'films/create', component: CreateFilmComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
