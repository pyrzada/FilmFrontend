import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {ToastrService} from "ngx-toastr";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  register_form: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService, private matDialogRef: MatDialogRef<RegisterComponent>) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  register() {
    if (this.register_form.invalid) {
      this.toastr.error("Please fill all required fields");
      return;
    }
    this.authService.register(this.register_form.value).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success(data.message);
        this.matDialogRef.close();
        window.location.reload();
      } else {
        this.toastr.error(data.message);
      }
    }, (error) => {
      this.toastr.error(error.error.message);
    })
  }

  private createForm() {
    this.register_form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

}
