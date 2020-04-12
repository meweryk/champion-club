import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { Router, NavigationEnd } from '@angular/router';
import { OrdersServise } from '../shared/services/order.service';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Subscription } from 'rxjs';
import { OrderPosition, Order } from '../shared/interfaces';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  isRoot: boolean
  modal: MaterialInstance
  oSub: Subscription
  pending = false
  allPosition: any

  constructor(private router: Router,
    private order: OrderService,
    private ordersService: OrdersServise) { }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
    this.allPosition = this.order
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  open() {
    this.modal.open()
  }

  cencel() {
    this.modal.close()
  }

  submit() {
    this.pending = true

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }

}
