import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserFormRoutingModule} from './user-form-routing.module';
import {UserFormComponent} from './user-form.component';
import {ArchwizardModule} from 'angular-archwizard';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [UserFormComponent],
  imports: [
    CommonModule,
    ArchwizardModule,
    ReactiveFormsModule,
    UserFormRoutingModule,
  ],
  exports: [UserFormComponent]
})
export class UserFormModule { }
