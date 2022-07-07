import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, Validator, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {map, Observable, startWith} from "rxjs";
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {FilmsService} from "../services/films.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.css']
})
export class CreateFilmComponent implements OnInit {
  film_form: any;
  image_url: any;
  keyCodes: number[] = [ENTER, COMMA];
  genres: string[] = [];
  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement> | undefined;
  filteredGenres: any[] = [];
  allGenres: string[] = ["Romance", "Acton", "Drama", "Suspense"];
  private file: any;

  constructor(private formBuilder: FormBuilder, private filmsService: FilmsService, private toaster: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.createForm();
    this.filteredGenres = this.film_form.controls['genre'].valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allGenres.slice())),
    );

  }

  private createForm() {
    this.film_form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      release_date: [new Date(), Validators.required],
      ticket_price: [0, Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      country: ['', Validators.required],
      image_url: [null],
      genre: ['', Validators.required],
    })
  }

  onFileChange(input: any) {
    this.film_form.value.image_url = input.files[0];
  }

  remove(fruit: string): void {
    const index = this.genres.indexOf(fruit);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.genres.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    // this.film_form.controls['genre'].setValue(null);
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.genres.push(event.option.viewValue);
    // @ts-ignore
    this.fruitInput.nativeElement.value = '';
    this.film_form.genres.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allGenres.filter((genre: any) => {
      return genre.toLowerCase().includes(filterValue);
    });
  }

  submitGenreForm() {
    if (this.film_form.invalid) {
      this.toaster.error("Please fill required fields");
      return;
    }
    if (!this.film_form.value.image_url) {
      this.toaster.error("File is required");
      return;
    }
    this.film_form.value.genre = this.genres;
    this.filmsService.createFilm(this.film_form.value, this.genres).subscribe((data: any) => {

      if (data.success) {
        this.toaster.success(data.message);
        this.router.navigate(['/']);
      } else {
        this.toaster.error(data.message)
      }
    });
  }
}
