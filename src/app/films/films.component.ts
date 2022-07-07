import {Component, OnInit} from '@angular/core';
import {FilmsService} from "../services/films.service";
import {BaseResponseModel} from "../Utils/BaseResponseModel";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films_data: any;
  env = environment.api_url;
  current_index: number = 0;
  success = true;

  constructor(private filmsService: FilmsService) {
  }

  ngOnInit(): void {
    this.getFilms();
  }

  private getFilms() {
    this.filmsService.getAllFilms().subscribe((data: any) => {
      this.success = data.success;
      this.films_data = data.data;
    })
  }

  moveNext() {
    this.current_index = this.current_index + 1;
  }

  movePrevious() {
    this.current_index = this.current_index - 1;
  }

  getParsed(single_rating: any) {
    return parseInt(single_rating)
  }
}
