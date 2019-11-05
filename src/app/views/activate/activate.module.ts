import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivateComponent} from './activate.component';
import {ActivateRoutingModule} from './activate-routing.module';



@NgModule({
  declarations: [ActivateComponent],
  imports: [
    CommonModule,
    ActivateRoutingModule
  ],
  exports: [ActivateComponent]

})
export class ActivateModule { }
