import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Toast, ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_form: any;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    if (this.login_form.invalid) {
      this.toastr.error("Please fill all required fields");
      return;
    }
    this.authService.login(this.login_form.value).subscribe((data: any) => {
      if (data.success) {
        this.toastr.success(data.message);
        sessionStorage.setItem('token', data.data);
        window.location.reload();
      } else {
        this.toastr.error(data.message);
      }
    },(error)=>{
      this.toastr.error(error.error.message);
    })
  }

  private createForm() {
    this.login_form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }
}
