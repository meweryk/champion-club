import { NgModule } from '@angular/core';
import { RegisterPageComponent } from './register-page.component';
import { Routes, RouterModule } from '@angular/router';

const registerRoutes: Routes = [
  { path: '', component: RegisterPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(registerRoutes)],
  exports: [RouterModule]
})

export class RegisterRoutingModule { }
