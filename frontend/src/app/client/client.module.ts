import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { UpdateComponent } from './update/update.component';
import { DeleteComponent } from './delete/delete.component';
import { ListComponent } from './list/list.component';
import { ClientComponent } from './client/client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';

@NgModule({
  declarations: [
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    ListComponent,
    ClientComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,FormsModule

  ]
})
export class ClientModule { }
