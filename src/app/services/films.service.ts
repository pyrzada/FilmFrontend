import {Injectable} from '@angular/core';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FilmsService {

  constructor(private http: HttpClient) {
  }

  getAllFilms(): Observable<any> {
    return this.http.get(environment.api_url + 'films/');
  }

  createFilm(genre: any, genres: string[]) {
    let formData = new FormData();
    formData.append("name", genre.name);
    formData.append("description", genre.description);
    formData.append("release_date", genre.release_date);
    formData.append("rating", genre.rating);
    formData.append("genre", genres.toString());
    formData.append("ticket_price", genre.ticket_price);
    formData.append("country", genre.country);
    formData.append("image_url", genre.image_url);

    return this.http.post(environment.api_url + 'films/', formData);
  }

  getSingleFilm(film_name: String) {
    return this.http.get(environment.api_url + 'films/' + film_name);
  }

  getComments(film_id: string) {
    return this.http.post(environment.api_url + 'comments/get', {film_id: film_id});
  }

  createComment(comment_data: any) {
    return this.http.post(environment.api_url + 'comments', comment_data);

  }
}
