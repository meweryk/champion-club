import { NgModule } from '@angular/core';

import { HomePageComponent } from './home-page.component';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomePageComponent],
  providers: [],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})

export class HomeModule { }
