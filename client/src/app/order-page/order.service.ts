import { Injectable } from '@angular/core';
import { Position, OrderPosition } from '../shared/interfaces';

@Injectable()
export class OrderService {

  public list: OrderPosition[] = []
  public price = 0
  public weight = 0
  public allRank = ''

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      cost: +(position.cost).toFixed(2),
      quantity: +(position.quantity).toFixed(3),
      rank: position.rank,
      exposition: position.exposition,
      imageSrc: position.imageSrc,
      _id: position._id,
      shopSeller: position.shop,
      userSeller: position.user,
      emailSeller: position.email,
      phoneSeller: position.phone
    })

    const candidate = this.list.find(p => p._id === orderPosition._id)

    if (candidate) {
      //Изменяем количество
      candidate.quantity += orderPosition.quantity
    } else {
      this.list.push(orderPosition)
    }

    this.computePrice()
    this.computeWeight()
    this.allRank = position.rank

  }

  remove(orderPosition: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id)
    this.list.splice(idx, 1)
    this.computePrice()
    this.computeWeight()
  }

  clear() {
    this.list = []
    this.price = 0
    this.weight = 0
  }

  private computePrice() {
    this.price = +this.list.reduce((total, item) => {
      return total += item.quantity * item.cost
    }, 0).toFixed(2)
  }

  private computeWeight() {
    this.weight = +this.list.reduce((total, item) => {
      return total += item.quantity
    }, 0).toFixed(3)
  }
}
