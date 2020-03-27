import { NgModule } from '@angular/core';
import { StartPageComponent } from './start-page.component';
import { CommonModule } from '@angular/common';
import { StartRoutingModule } from './start-routing.module';

@NgModule({
  declarations: [StartPageComponent],
  providers: [],
  imports: [
    CommonModule,
    StartRoutingModule
  ]
})

export class StartModule { }
