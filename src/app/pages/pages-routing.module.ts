import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LobbyComponent} from "./lobby/lobby.component";
import {AngularHomeComponent} from "./angular-home/angular-home.component";

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
export class PagesRoutingModule { }
