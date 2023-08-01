import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LobbyComponent} from "./lobby.component";



@NgModule({
  declarations: [LobbyComponent ],
  imports: [
    CommonModule
  ],
  exports:[LobbyComponent ]
})
export class LobbyModule { }
