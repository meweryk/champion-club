import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InvoicePageComponent } from './invoice-page.component';

const invoiceRoutes: Routes = [
  { path: '', component: InvoicePageComponent },
]

@NgModule({
  imports: [RouterModule.forChild(invoiceRoutes)],
  exports: [RouterModule]
})

export class InvoiceRoutingModule { }
