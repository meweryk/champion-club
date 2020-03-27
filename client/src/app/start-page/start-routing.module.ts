import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page.component';

const startRoutes: Routes = [
  { path: '', component: StartPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(startRoutes)],
  exports: [RouterModule]
})

export class StartRoutingModule { }
