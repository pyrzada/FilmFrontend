import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(loginForm: any): Observable<any> {
    return this.http.post(environment.api_url + 'auth/login', loginForm);
  }
  register(registerForm: any): Observable<any> {
    return this.http.post(environment.api_url + 'auth/register', registerForm);
  }

  isLogin(): Boolean {
    if (sessionStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem('token');
  }
}
