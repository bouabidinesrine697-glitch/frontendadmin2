import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TrottinetteRoutingModule } from './trottinette-routing.module';
import { AddComponent } from './add/add.component';
import { DeleteComponent } from './delete/delete.component';
import { UpdateComponent } from './update/update.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    AddComponent,
    DeleteComponent,
    UpdateComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TrottinetteRoutingModule
  ]
})
export class TrottinetteModule { }
