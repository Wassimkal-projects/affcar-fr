import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedDataService} from '../../shared/data/shared-data.service';
import {AccountService} from '../../shared/services/account.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private sharedData: SharedDataService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {
  }

  get email() {
    return this.loginForm.get('email');
  }

  get firstname() {
    return this.loginForm.get('firstname');
  }

  get lastname() {
    return this.loginForm.get('lastname');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get passwordConfirm() {
    return this.loginForm.get('passwordConfirm');
  }

  register() {
    this.spinner.show();
    this.accountService.register(this.email.value, this.password.value).subscribe(() => {
      this.toast.success('User created, please check email for activation');
      this.spinner.hide();
    }, error1 => {
      this.toast.error('Sign up failed');
      this.spinner.hide();
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    });
  }
}
