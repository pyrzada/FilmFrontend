import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-film',
  templateUrl: './create-film.component.html',
  styleUrls: ['./create-film.component.css']
})
export class CreateFilmComponent implements OnInit {
  film_form: any;
  image_url: any;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.createForm();

  }

  private createForm() {
    this.film_form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      release_date: [new Date(), Validators.required],
      ticket_price: [0, Validators.required],
      rating: [1, [Validators.required, Validators.min(1), Validators.max(5)]],
      country: ['', Validators.required],
      image_url: ['', Validators.required],
    })
  }

  onFileChange($event: Event) {
    
  }
}
