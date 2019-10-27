import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountService} from '../../shared/services/account.service';
import {SharedDataService} from '../../shared/data/shared-data.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private sharedData: SharedDataService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) {
  }

  get firstname() {
    return this.loginForm.get('firstname');
  }

  get lastname() {
    return this.loginForm.get('lastname');
  }

  get phone() {
    return this.loginForm.get('phone');
  }

  get age() {
    return this.loginForm.get('age');
  }

  get workAddress() {
    return this.loginForm.get('workAddress');
  }

  get livingAddress() {
    return this.loginForm.get('livingAddress');
  }

  get isMarried() {
    return this.loginForm.get('isMarried');
  }

  get numberOfChildren() {
    return this.loginForm.get('numberOfChildren');
  }

  get professionalSituation() {
    return this.loginForm.get('professionalSituation');
  }

  get interests() {
    return this.loginForm.get('interests');
  }

  get vehicules() {
    return this.loginForm.get('vehicules');
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      age: ['', [Validators.required]],
      workAddress: ['', [Validators.required]],
      livingAddress: ['', [Validators.required]],
      isMarried: ['', [Validators.required]],
      numberOfChildren: ['', [Validators.required]],
      professionalSituation: ['', [Validators.required]],
      interests: ['', [Validators.required]],
      vehicules: ['', [Validators.required]],
    });
    // this.fillForm();
  }

  /*  private fillForm() {
      if (this.sharedData.user) {
        this.firstname.setValue(this.sharedData.user.firstName);
        this.lastname.setValue(this.sharedData.user.lastName);
        this.email.setValue(this.sharedData.user.email);
      }
    }*/
}
