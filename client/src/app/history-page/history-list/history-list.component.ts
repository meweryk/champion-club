import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';
import { Order } from 'src/app/shared/interfaces';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { OrdersServise } from 'src/app/shared/services/orders.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() gsorders: Order[];
  @Output('onAddDelivery') orderEmitter = new EventEmitter<Order>()
  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('select') selectRef: ElementRef

  shop: string
  phone: string
  email: string
  id: string

  selectedOrder: Order
  modal: MaterialInstance
  select: MaterialInstance

  searchOrd = ''
  workOrder: boolean = false

  castomer = ''
  executor = ''

  today = new Date()
  isView: boolean

  _id = ''
  view = null
  send = null
  got = null

  constructor(private auth: AuthService,
    private ordersService: OrdersServise,
    private title: Title,
    private meta: Meta) {
    title.setTitle('История заказов')
    meta.addTags([
      { name: 'keywords', content: 'Запорожье,спортпит.zp,история,заказ,купить,спортивное,питание' },
      { name: 'description', content: 'Просмотр заказа' }
    ])
  }

  ngOnInit(): void {
    this.shop = this.auth.getShop()
    this.id = this.auth.getId()
  }

  ngOnDestroy() {
    this.modal.destroy()
    this.select.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    this.select = MaterialService.initFormSelect(this.selectRef)
  }

  computePrice(order: Order): number {
    return +order.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0).toFixed(2)
  }

  computeWeight(order: Order) {
    return +order.list.reduce((total, item) => {
      return total += item.quantity
    }, 0).toFixed(3)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order

    //если на странце покупателя берём номер поставщика
    if (this.selectedOrder.userfirstSeller === this.id) {
      this.auth.getById(this.selectedOrder.userfirstSeller).subscribe(user => {
        this.phone = user.phone
        this.email = user.email
      })
    } else {
      //если на странице поставщика берём номер покупателя
      this.auth.getById(this.selectedOrder.userBuyer).subscribe(user => {
        this.phone = user.phone
        this.email = user.email
      })
    }

    this.workOrder = (this.selectedOrder.shopBuyer === this.shop) //true если магазин покупает: кнопка "обработать" отключена
    this.modal.open()
    if (!this.selectedOrder.view && this.workOrder == false) {
      this.update()
    }
    //сброс формы обработки поставки
    this.orderEmitter.emit(
      null
    );
  }

  private update() {
    const objectFlag = Object.assign({}, {
      _id: this.selectedOrder._id,
      view: "f",
      send: this.send,
      got: this.got
    })
    this.ordersService.update(objectFlag).subscribe((order: Order) => {
      const idx = this.gsorders.findIndex(p => p._id === objectFlag._id)
      this.gsorders[idx].view = order.view
      MaterialService.toast(`Заказ просмотрен поставщиком ${this.shop}`)
    },
      error => MaterialService.toast(error.error.message),
    )
  }

  addDelivery() {
    this.orderEmitter.emit(
      this.selectedOrder
    );
    this.modal.close()
  }

  closeModal() {
    this.modal.close()
    this.title.setTitle('История заказов')
  }

}
