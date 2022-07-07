import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {AuthService} from "../services/auth.service";
import {RegisterComponent} from "../register/register.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logged_in: Boolean = false;

  constructor(private dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.checkLogin();
  }

  openLoginModal() {
    const dialog = this.dialog.open(LoginComponent);
  }

  private checkLogin() {
    this.logged_in = this.authService.isLogin();
  }

  logout() {
    this.authService.logout();
    window.location.reload();
  }

  openRegisterModal() {
    const dialog = this.dialog.open(RegisterComponent);
  }
}
