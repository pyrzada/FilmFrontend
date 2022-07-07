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

  createFilm(genre: any, file: any) {
    let formData = new FormData();
    formData.append("name", genre.name);
    formData.append("description", genre.description);
    formData.append("release_date", genre.release_date);
    formData.append("rating", genre.rating);
    formData.append("ticket_price", genre.ticket_price);
    formData.append("country", genre.country);
    formData.append("image_url", genre.image_url.value);

    return this.http.post(environment.api_url + 'films/', formData);

  }
}
