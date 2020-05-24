import { Pipe, PipeTransform } from '@angular/core'
import { Order } from '../../interfaces'

@Pipe({
  name: 'searchShop'
})

export class SearchShopPipe implements PipeTransform {
  transform(orders: Order[], value) {
    return orders.filter(order => {
      return (order.shopBuyer.toLocaleUpperCase().includes(value[0].toLocaleUpperCase()) && order.list.some(item => {
        return (item.shopSeller.toLocaleUpperCase().includes(value[1].toLocaleUpperCase()))
      }))
    })
  }
}
