import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'

import { ComponentsModule } from '../shared/components/components.module'
import { HistoryPageComponent } from './history-page.component'
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryListComponent } from './history-list/history-list.component';
import { HistoryFilterComponent } from './history-filter/history-filter.component'
import { InvoiceModule } from '../invoice-page/invoice.module'


@NgModule({
  declarations: [
    HistoryPageComponent,
    HistoryListComponent,
    HistoryFilterComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    ComponentsModule,
    InvoiceModule
  ]
})

export class HistoryModule { }
