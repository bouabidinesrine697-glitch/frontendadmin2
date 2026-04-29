import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReservationRoutingModule } from './reservation-routing.module';
import { AddComponent } from './add/add.component';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReservationRoutingModule
  ]
})
export class ReservationModule { }
