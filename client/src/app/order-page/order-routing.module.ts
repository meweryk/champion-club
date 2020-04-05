import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { OrderPageComponent } from './order-page.component'

const orderRoutes: Routes = [
  { path: '', component: OrderPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})

export class OrderRoutingModule { }
