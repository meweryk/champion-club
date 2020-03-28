import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomePageComponent } from './home-page.component'
import { HomeRoutingModule } from './home-routing.module'

@NgModule({
  declarations: [HomePageComponent],
  providers: [],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})

export class HomeModule { }
