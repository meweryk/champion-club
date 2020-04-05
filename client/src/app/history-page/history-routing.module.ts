import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HistoryPageComponent } from './history-page.component'

const historyRoutes: Routes = [
  { path: '', component: HistoryPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(historyRoutes)],
  exports: [RouterModule]
})

export class HistoryRoutingModule { }
