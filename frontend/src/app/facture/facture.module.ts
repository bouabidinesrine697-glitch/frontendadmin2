import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FactureRoutingModule } from './facture-routing.module';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    AddComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    FactureRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class FactureModule {}