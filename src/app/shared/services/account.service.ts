import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {JWTToken} from '../models/jwtToken';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ParsedToken} from '../models/parsed-token';

@Injectable()
export class AccountService {
  fbAuthUrl = environment.url + 'social/fb-auth';
  googleAuthUrl = environment.url + 'social/google-auth';
  loginURL = environment.url + 'users/authenticate';
  registerURL = environment.url + 'users/registerUser';
  activateURL = environment.url + 'users/activateUser?key='

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
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

  register(email: string, password: string): Observable<any> {
    const body = JSON.stringify({email: email, password: password});
    return this.http.post<any>(this.registerURL, body, this.httpOptions);
  }

  activateAccount(key: string): Observable<any> {
    return this.http.post<any>(this.activateURL + key, null);
  }

  isAuthenticated() {
    const token = sessionStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getParsedToken(): ParsedToken {
    const token = sessionStorage.getItem('token');
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
  }
}
