import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularHomeRoutingModule} from "./angular-home-routing.module";
import {AngularHomeComponent} from "./angular-home.component";



@NgModule({
  declarations: [AngularHomeComponent],
  imports: [
    CommonModule,
    AngularHomeRoutingModule
  ],
  exports:[AngularHomeComponent]
})
export class AngularHomeModule { }
