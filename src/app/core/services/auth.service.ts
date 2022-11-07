import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = `${environment.baseUrl}/auth`;
  constructor(private http: HttpClient, public router: Router) { }

  login(user: User) {
    user.isRememberMe = false;
    console.log(user);
    return this.http.post<any>(this.url + '/signin', user).pipe(
      tap(x => {
        sessionStorage.setItem('token', x.data.token);
      })
    );
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  get isLoggedIn(): boolean {
    const authToken = sessionStorage.getItem('token');
    return authToken !== null;
  }

  logout() {
    sessionStorage.removeItem('token');
    if (sessionStorage.getItem('token') == null) {
      this.router.navigate(['auth']);
    }
  }
}
