import { Injectable } from '@angular/core';
import { OrderPosition, DeliveryPosition } from '../shared/interfaces';

@Injectable()

export class InvoiceServise {
  public list: DeliveryPosition[] = []
  public price: number = 0
  public weight: number = 0
  public deliveryPosList: number = 0

  add(position: OrderPosition) {

    const deliveryPosition: DeliveryPosition = Object.assign({}, {
      name: position.name,
      quantity: position.quantity,
      rank: position.rank,
      cost: position.cost,
      _id: position._id
    })

    this.list.push(deliveryPosition)
    this.deliveryPosList = this.list.length
    this.computerPrice()
    this.computerWeight()
  }

  remove(position: OrderPosition) {
    const idx = this.list.findIndex(p => (p._id === position._id && p.name === position.name))
    this.list.splice(idx, 1)
    this.deliveryPosList = this.list.length
    this.computerPrice()
    this.computerWeight()
  }

  clear() {
    this.list.length = 0
    this.price = 0
    this.weight = 0
    this.deliveryPosList = 0
  }

  private computerPrice() {
    this.price = this.list.reduce((total, item) => {
      total += +(item.quantity * item.cost).toFixed(2)
      return total
    }, 0)
  }

  private computerWeight() {
    this.weight = this.list.reduce((total, item) => {
      return total += +(item.quantity).toFixed(3)
    }, 0)
  }
}
