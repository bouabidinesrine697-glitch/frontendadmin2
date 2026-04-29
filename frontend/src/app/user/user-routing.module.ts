import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserSupprimerComponent } from './user-supprimer/user-supprimer.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'add', component: UserAddComponent },
  { path: 'update/:id', component: UserUpdateComponent },
  { path: 'delete/:id', component: UserSupprimerComponent },
  { path: '', component: UserListComponent },
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
