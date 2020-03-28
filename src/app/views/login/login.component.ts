import {Component, OnInit} from '@angular/core';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../shared/services/account.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {NgxSpinnerService} from 'ngx-spinner';
import {SharedDataService} from '../../shared/data/shared-data.service';

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
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private sharedData: SharedDataService
  ) {

  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  signInWithGoogle(): void {
    this.spinner.show();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      this.accountService.loginWithGoogle(user.idToken).subscribe(token => {
        this.spinner.hide();
        console.log('id_token = ' + token.id_token);
        this.jwt = token.id_token;
        if (this.jwt != null) {
          sessionStorage.setItem('token', this.jwt);
          this.pagesRouter.navigate(['home']);
        } else {
          this.sharedData.user = user;
          this.pagesRouter.navigate(['/register']);
        }
      }, error1 => {
        this.spinner.hide();
        this.toast.error('Login with google failed');
        console.log(error1);
      });
    }, error2 => {
      console.log(error2);
      this.toast.error('Login with google failed');
      this.spinner.hide();
    });
  }

  signInWithFB(): void {
    this.spinner.show();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      console.log(user);
      this.accountService.loginWithFacebook(user.authToken).subscribe(token => {
        this.spinner.hide();
        console.log('id_token = ' + token.id_token);
        this.jwt = token.id_token;
        sessionStorage.setItem('token', this.jwt);
        this.pagesRouter.navigate(['home']);
      }, error1 => {
        this.spinner.hide();
        this.toast.error('Error loggin in');
        console.log(error1);
      });
    }, error2 => {
      console.log(error2);
      this.spinner.hide();
      this.toast.error('Error loggin in');
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required],
      Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
      Validators.minLength(5), Validators.maxLength(254)],
      password: ['', [Validators.required]]
    });
  }

  login() {
    this.spinner.show();
    this.accountService.login(this.email.value, this.password.value, false).subscribe(token => {
      this.spinner.hide();
      console.log('id_token = ' + token.id_token);
      this.jwt = token.id_token;
      sessionStorage.setItem('token', this.jwt);
      this.pagesRouter.navigate(['/home/dashboard']);
    }, error1 => {
      this.spinner.hide();
      console.log(error1);
      this.toast.error('Login failed');
    });
  }

}
