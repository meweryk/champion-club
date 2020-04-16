import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { OrderService } from './order.service';
import { Router, NavigationEnd } from '@angular/router';
import { OrdersServise } from '../shared/services/orders.service';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Subscription } from 'rxjs';
import { OrderPosition, Order } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit {

  @ViewChild('modal') modalRef: ElementRef
  aSub: Subscription
  changeAuth: boolean

  isRoot: boolean
  modal: MaterialInstance
  oSub: Subscription
  pending = false
  allPosition: any
  comment: string = ''
  phoneBuyer: string = ''
  nameBuyer: string = ''
  emailBuyer: string = ''
  shopBuyer: string = ''
  idBuyer: string = ''

  constructor(private router: Router,
    private order: OrderService,
    private ordersService: OrdersServise,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.aSub = this.auth.$chT.subscribe((changeAuth: boolean) => {
      this.changeAuth = changeAuth
      this.thisAuthenticated()
    })
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
    this.allPosition = this.order
  }

  private thisAuthenticated() {
    this.nameBuyer = this.auth.getNicname()
    this.phoneBuyer = this.auth.getPhone()
    this.emailBuyer = this.auth.getEmail()
    this.shopBuyer = this.auth.getShop()
    this.idBuyer = this.auth.getId()
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  open() {
    if (this.changeAuth) {
      if (!this.phoneBuyer || !this.emailBuyer) {
        MaterialService.toast('Укажите способ связи в коментариях.')
      }
    } else {
      MaterialService.toast('Укажите способ связи в коментариях или авторизуйтесь.')
    }
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
      }),
      comment: this.comment,
      nicname: this.nameBuyer,
      shopBuyer: this.shopBuyer,
      idBuyer: this.idBuyer
    }


    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
        this.comment = ''
        this.phoneBuyer = null
        this.nameBuyer = ''
        this.emailBuyer = ''
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }

}
