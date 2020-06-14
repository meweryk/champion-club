import { Component, OnInit, ElementRef, ViewChild, OnDestroy, AfterViewInit } from '@angular/core';
import { OrderService } from './order.service';
import { Router, NavigationEnd } from '@angular/router';
import { OrdersServise } from '../shared/services/orders.service';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { Subscription } from 'rxjs';
import { OrderPosition, Order } from '../shared/interfaces';
import { AuthService } from '../shared/services/auth.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  aSub: Subscription
  changeAuth: boolean

  isRoot: boolean
  modal: MaterialInstance
  oSub: Subscription
  pending = false
  allPosition: any
  comment: string = ''
  phone: string = ''
  nicname: string = ''
  email: string = ''
  shop: string = ''
  id: string = ''

  constructor(private router: Router,
    private order: OrderService,
    private ordersService: OrdersServise,
    private auth: AuthService,
    private title: Title,
    private meta: Meta) {
    title.setTitle('Спортпит.zp')
    meta.addTags([
      { name: 'keywords', content: 'Запорожье,спортпит,спортивное питание,гейнер,аминокислоты,антиоксиданты,протеин,витамины,для суставов,жирные кислоты,бустер,тестостерон,азот,жиросжигатели,креатин,батончики,аксессуары,для здоровья,предтренировочники,купить' },
      { name: 'description', content: 'Страница категорий товаров магазина спортивного питания' }
    ])
  }

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
    this.nicname = this.auth.getNicname()
    this.phone = this.auth.getPhone() ? this.auth.getPhone() : ''
    this.email = this.auth.getEmail()
    this.shop = this.auth.getShop() ? this.auth.getShop() : ''
    this.id = this.auth.getId()
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
      if (this.phone === 'null' || this.phone === 'undefined') {
        MaterialService.toast('Укажите телефон в коментариях.')
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
      nicname: this.nicname, //имя покупателя
      shopBuyer: this.shop, //магазин покупателя
      userBuyer: this.id, //id покупателя
      phoneBuyer: this.phone,
      emailBuyer: this.email
    }


    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
        this.comment = ''
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }

}
