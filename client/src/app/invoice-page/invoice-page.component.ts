import { Component, OnInit, Input, ViewChild, ElementRef, HostListener, OnChanges, OnDestroy } from '@angular/core';
import { Order, OrderPosition, Delivery } from '../shared/interfaces';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';

import { DeliveriesServise } from '../shared/services/deliveries.service';
import { InvoiceServise } from './invoice.service';

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
  shop: string
  nicname: string
  list: OrderPosition[] = []
  allInvoice: any
  formSave: boolean = true

  form: FormGroup = this._formBuilder.group({
    order: '',
    shopSend: ['', Validators.required],
    shopHost: ['', Validators.required],
    train: [null, Validators.required],
    waybill: [null, Validators.required],
    imageSrc: null
  })

  constructor(private _formBuilder: FormBuilder,
    private auth: AuthService,
    private invoice: InvoiceServise,
    private deliveriesService: DeliveriesServise) { }

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
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  private onAddDelivery() {
    this.deliveryId = null
    this.list = this.deliveryOrder.list.filter(order => order.shopSeller === this.shop)
    this.form.reset({
      order: this.deliveryOrder.order,
      shopSend: this.shop,
      shopHost: this.deliveryOrder.shopBuyer,
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

  onSubmit() {
    //this.form.setValue
    //this.form.disable()
    this.modal.close()
  }

  submit() {
    const delivery: Delivery = {
      shopHost: this.form.value.shopHost,
      shopSend: this.form.value.shopSend,
      train: this.form.value.train,
      waybill: this.form.value.waybill,
      list: this.invoice.list.map(pos => {
        delete pos._id
        return pos
      })
    }

    this.deliveriesService.create(delivery).subscribe(
      newDelivery => {
        MaterialService.toast(`Поставка по накладной №${newDelivery.waybill} была добавлена`)
        this.invoice.clear()
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
      }
    )
  }

}
