import {Component, OnInit} from '@angular/core';
import {FilmsService} from "../services/films.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../services/auth.service";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.css']
})
export class FilmDetailComponent implements OnInit {
  films_data: any;
  env = environment.api_url;
  film_name: any;
  logged_in: Boolean = false;
  comments_form: any;
  comments: any;

  constructor(private filmService: FilmsService, private formBuilder: FormBuilder, private route: ActivatedRoute, private toastr: ToastrService, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.film_name = params.get('name');
      if (this.film_name) {
        this.getSingleFilm();
      }
    })
    this.isLoggedIn();

  }

  getParsed(single_rating: any) {
    return parseInt(single_rating)
  }

  private getSingleFilm() {
    this.filmService.getSingleFilm(this.film_name).subscribe((data: any) => {
      if (data.success) {
        this.films_data = data.data[0];
        this.toastr.success(data.message);
        if (this.logged_in) {
          this.getComments();
          this.createCommentForm();
        }
      } else {
        this.toastr.error(data.message);
        this.router.navigate(['/films']);
      }
    }, (error) => {
      this.router.navigate(['/']);
      this.toastr.error(error.error.message)
    })
  }

  private isLoggedIn() {
    this.logged_in = this.authService.isLogin()
  }

  private getComments() {
    this.filmService.getComments(this.films_data._id).subscribe((data: any) => {
      if (data.success) {
        this.comments = data.data;
      } else {
        this.toastr.error(data.message)
      }
    }, (error) => {
      this.toastr.error(error.error.message);
    })
  }

  private createCommentForm() {
    this.comments_form = this.formBuilder.group({
      name: ['', Validators.required],
      comment: ['', Validators.required],
      film_id: [this.films_data._id, Validators.required]
    })
  }

  addComment() {
    this.filmService.createComment(this.comments_form.value).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success(data.message);
        this.getComments();
      } else {
        this.toastr.error(data.message);
      }
    }, (error) => {
      this.toastr.error(error.error.message)
    });
  }
}
