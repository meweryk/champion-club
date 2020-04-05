import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ComponentsModule } from '../shared/components/components.module';
import { OrderPageComponent } from './order-page.component';
import { OrderRoutingModule } from './order-routing.module';


@NgModule({
  declarations: [
    OrderPageComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    SharedModule,
    OrderRoutingModule,
    ComponentsModule
  ]
})

export class OrderModule { }
