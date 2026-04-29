import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserSupprimerComponent } from './user-supprimer/user-supprimer.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserAddComponent,
    UserUpdateComponent,
    UserSupprimerComponent,
    UserListComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,ReactiveFormsModule,FormsModule
  ]
})
export class UserModule { }
