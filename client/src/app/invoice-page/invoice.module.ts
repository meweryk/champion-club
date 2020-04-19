import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoicePageComponent } from './invoice-page.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../shared/components/components.module';
import { InvoiceRoutingModule } from './invoice-routing.module'
import { InvoicePositionsComponent } from './invoice-positions/invoice-positions.component'
import { InvoiceServise } from './invoice.service';

@NgModule({
  declarations: [
    InvoicePageComponent,
    InvoicePositionsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ComponentsModule,
    InvoiceRoutingModule
  ],
  providers: [],
  exports: [InvoicePageComponent]
})

export class InvoiceModule { }
