import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {AngularHomeComponent} from "./angular-home.component";

const routes: Routes = [
  {
    path: '',
    component: AngularHomeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngularHomeRoutingModule { }
