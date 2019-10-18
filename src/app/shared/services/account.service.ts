import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JWTToken} from '../models/jwtToken';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  fbAuthUrl = environment.url + 'social/fb-auth';
  googleAuthUrl = environment.url + 'social/google-auth';
  loginURL = environment.url + 'users/authenticate';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  loginWithFacebook(token: string): Observable<JWTToken> {
    const body = JSON.stringify({access_token: token});
    return this.http.post<JWTToken>(this.fbAuthUrl, body, this.httpOptions);
  }

  loginWithGoogle(token: string): Observable<JWTToken> {
    const body = JSON.stringify({access_token: token});
    return this.http.post<JWTToken>(this.googleAuthUrl, body, this.httpOptions);
  }

  login(email: string, password: string, rememberMe: boolean): Observable<JWTToken> {
    const body = JSON.stringify({email: email, password: password, rememberMe: rememberMe});
    return this.http.post<JWTToken>(this.loginURL, body, this.httpOptions);
  }
}
