import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { OrderPosition } from 'src/app/shared/interfaces';
import { Observable, of } from 'rxjs';
import { InvoiceServise } from '../invoice.service';
import { map } from 'rxjs/operators';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-invoice-positions',
  templateUrl: './invoice-positions.component.html',
  styleUrls: ['./invoice-positions.component.css']
})
export class InvoicePositionsComponent implements OnInit {

  @Output() updateSave = new EventEmitter<any>()
  @Input() list: OrderPosition[]

  positions$: Observable<OrderPosition[]>
  flag: boolean = false
  rankOpt = ['', 'тонн', 'штук']
  orderListLength: number //количество позиций в заказе
  allInvoice: any

  constructor(private invoice: InvoiceServise) { }

  ngOnInit(): void {
    this.positions$ = of(this.list).pipe(
      map(pos => {
        return pos.map(p => {
          p.flag = false
          return p
        })
      }))
    this.orderListLength = this.list.length
    this.allInvoice = this.invoice
  }

  addToInvoice(position: OrderPosition) {
    this.invoice.add(position)
    position.flag = true
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
    MaterialService.toast(`Добавлено x${position.quantity}${position.rank}`)
  }

  changeInvoice(position: OrderPosition) {
    this.invoice.remove(position)
    position.flag = false
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
    MaterialService.toast(`Позиция ${position.name} готова к изменению`)
  }

  private activSave(deliveryPosList: number, orderListLength: number) {
    let formSave: boolean = (deliveryPosList != orderListLength) || (deliveryPosList === 0)
    this.updateSave.emit(formSave)
  }

  deleteInvoice(position: OrderPosition) {
    position.flag ? this.invoice.remove(position) : position.flag = false

    this.positions$ = of(this.list).pipe(
      map(pos => {
        const idx = pos.findIndex(p => p._id === position._id && p.name === position.name)
        pos.splice(idx, 1)
        return pos
      }))
    this.orderListLength--
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)

    MaterialService.toast(`Позиция ${position.name} удалена`)
  }

  addPosition() {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: '',
      quantity: null,
      rank: '',
      cost: 1,
      _id: '',
      flag: false
    })
    this.positions$ = of(this.list)
      .pipe(
        map(pos => {
          pos.push(orderPosition)
          return pos
        })
      )
    this.orderListLength++
    this.activSave(this.invoice.deliveryPosList, this.orderListLength)
  }

}
