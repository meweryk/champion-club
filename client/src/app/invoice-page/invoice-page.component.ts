import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, OnChanges, OnDestroy } from '@angular/core';
import { Order, OrderPosition, Delivery } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

import { DeliveriesServise } from '../shared/services/deliveries.service';
import { InvoiceServise } from './invoice.service';
import { OrdersServise } from '../shared/services/orders.service';

@Component({
  selector: 'app-invoice-page',
  templateUrl: './invoice-page.component.html',
  styleUrls: ['./invoice-page.component.css'],
  providers: [InvoiceServise]
})
export class InvoicePageComponent implements OnInit, OnChanges, OnDestroy {
  @Input() deliveryOrder: Order
  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance
  width: number
  deliveryId = null
  orderId = null
  shop: string
  nicname: string
  list: OrderPosition[] = []
  allInvoice: any
  formSave: boolean = true

  form: FormGroup = this._formBuilder.group({
    order: '',
    shop: ['', Validators.required],
    shopBuyer: ['', Validators.required],
    train: [null, Validators.required],
    waybill: [null, Validators.required],
    imageSrc: null
  })

  constructor(private _formBuilder: FormBuilder,
    private auth: AuthService,
    private invoice: InvoiceServise,
    private deliveriesService: DeliveriesServise,
    private ordersService: OrdersServise) { }

  ngOnInit(): void {
    this.width = window.innerWidth * 0.9
    this.shop = this.auth.getShop()
    this.nicname = this.auth.getNicname()
    this.allInvoice = this.invoice
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const w = event.target.innerWidth
    this.width = 0.95 * w //ширина модального окна
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnChanges() {
    if (this.deliveryOrder) {
      this.onAddDelivery()
    }
  }

  onCancel() {
    this.modal.close()
    this.allInvoice.clear()
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  private onAddDelivery() {
    this.deliveryId = null
    this.orderId = this.deliveryOrder._id
    this.list = this.deliveryOrder.list.filter(order => order.shopSeller === this.shop)
    this.form.reset({
      order: this.deliveryOrder.order,
      shop: this.shop,
      shopBuyer: this.deliveryOrder.shopBuyer,
      train: null,
      waybill: null,
      imageSrc: null
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  updateButton(formSave: boolean) {
    this.formSave = formSave //активация сохранения всей формы при валидности позиций
  }

  submit() {
    this.form.setValue
    this.form.disable()

    const delivery: Delivery = {
      orderId: this.orderId,
      order: this.form.value.order,
      shopBuyer: this.form.value.shopBuyer,
      shop: this.form.value.shop,
      train: this.form.value.train,
      waybill: this.form.value.waybill,
      list: this.invoice.list.map(pos => {
        delete pos._id
        return pos
      })
    }

    this.deliveriesService.create(delivery).subscribe(
      newDelivery => {
        MaterialService.toast(`Поставка по накладной №${newDelivery.waybill} создана`)
        this.allInvoice.clear()
        if (this.orderId) {
          this.update(newDelivery._id)
        }
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
      },
      () => {
        this.modal.close()
        this.form.enable()
      }
    )
  }

  private update(deliveryId: string) {
    const objectFlag = Object.assign({}, {
      _id: this.orderId,
      deliveryId: deliveryId,
      view: this.deliveryOrder.view,
      send: 'f',
      got: this.deliveryOrder.got
    })
    this.ordersService.update(objectFlag).subscribe((order: Order) => {
      //const idx = this.gsorders.findIndex(p => p._id === objectFlag._id)
      //this.gsorders[idx].view = order.send
      MaterialService.toast(`Заказ ${this.deliveryOrder.order} отправлен поставщиком ${this.shop}`)
    },
      error => MaterialService.toast(error.error.message),
    )
  }

}
