import {Component, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider, SocialUser} from 'angularx-social-login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../shared/services/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']

})
export class LoginComponent implements OnInit {
  private user: SocialUser;
  loginForm: FormGroup;
  private loggedIn: boolean;
  private jwt: string;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private pagesRouter: Router,
    private toast: ToastrService
  ) {

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      this.accountService.loginWithFacebook(user.authToken).subscribe(token => {
        console.log('id_token = ' + token.id_token);
        this.jwt = token.id_token;
        this.pagesRouter.navigate(['/dashboard']);
      }, error1 => {
        console.log('error: ' + error1);
      });
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      // Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
      // Validators.minLength(5), Validators.maxLength(254)]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.accountService.login(this.email.value, this.password.value, false).subscribe(token => {
      console.log('id_token = ' + token.id_token);
      this.jwt = token.id_token;
      this.toast.success('Login success');
      this.pagesRouter.navigate(['/dashboard']);
    }, error1 => {
      console.log(error1);
      this.toast.error('Login failed');
    });
  }

}
