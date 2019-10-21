import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // we use forRoot to register our routes
  exports: [RouterModule]
})
export class AppRoutingModule { }
