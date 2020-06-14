import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { HomePageComponent } from './home-page.component'
import { HomeRoutingModule } from './home-routing.module'
import { Title } from '@angular/platform-browser'

@NgModule({
  declarations: [HomePageComponent],
  providers: [Title],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})

export class HomeModule { }
