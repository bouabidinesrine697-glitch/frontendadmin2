import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import path from 'path';

const routes: Routes = [
  {path:"auth",loadChildren:()=>import("./auth/auth.module").then(m=>m.AuthModule)},
  {path:"user",loadChildren:()=>import("./user/user.module").then(m=>m.UserModule)},
  {path:"client",loadChildren:()=>import("./client/client.module").then(m=>m.ClientModule)},
  {path:"zone",loadChildren:()=>import("./zone/zone.module").then(m=>m.ZoneModule)},
  {path:"trottinette",loadChildren:()=>import("./trottinette/trottinette.module").then(m=>m.TrottinetteModule)},
  {path:"reservation",loadChildren:()=>import("./reservation/reservation.module").then(m=>m.ReservationModule)},
  {path:"dashboard",loadChildren:()=>import("./dashboard/dashboard.module").then(m=>m.DashboardModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}