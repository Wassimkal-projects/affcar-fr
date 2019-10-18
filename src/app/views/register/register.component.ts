import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SharedDataService} from '../../shared/data/shared-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private sharedData: SharedDataService
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
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      // Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'),
      // Validators.minLength(5), Validators.maxLength(254)]],
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]],
    });
    this.fillForm();
  }

  private fillForm() {
    if (this.sharedData.user) {
      this.firstname.setValue(this.sharedData.user.firstName);
      this.lastname.setValue(this.sharedData.user.lastName);
      this.email.setValue(this.sharedData.user.email);
    }
  }
}
