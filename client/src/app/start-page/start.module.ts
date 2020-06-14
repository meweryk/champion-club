import { NgModule } from '@angular/core';
import { StartPageComponent } from './start-page.component';
import { CommonModule } from '@angular/common';
import { StartRoutingModule } from './start-routing.module';
import { Title } from '@angular/platform-browser';

@NgModule({
  declarations: [StartPageComponent],
  providers: [
    Title
  ],
  imports: [
    CommonModule,
    StartRoutingModule
  ]
})

export class StartModule { }
