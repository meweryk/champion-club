import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { SharedModule } from '../shared/shared.module'

import { ComponentsModule } from '../shared/components/components.module'
import { HistoryPageComponent } from './history-page.component'
import { HistoryRoutingModule } from './history-routing.module'


@NgModule({
  declarations: [
    HistoryPageComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    SharedModule,
    HistoryRoutingModule,
    ComponentsModule
  ]
})

export class HistoryModule { }
