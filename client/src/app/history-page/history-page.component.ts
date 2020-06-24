import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Order, Filter } from '../shared/interfaces';
import { OrdersServise } from '../shared/services/orders.service';
import { MaterialService, MaterialInstance } from '../shared/classes/material.service';
import { Title, Meta } from '@angular/platform-browser';

const STEP = 6

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.css']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('tooltip') tooltipRef: ElementRef
  tooltip: MaterialInstance
  oSub: Subscription
  isFilterVisible = false
  orders: Order[] = []
  filter: Filter = {}

  deliveryOrder: Order
  shop: string

  offset = 0
  limit = STEP
  odx: number

  loading = false
  reloading = false
  noMoreOrders = false

  constructor(private ordersService: OrdersServise,
    private title: Title,
    private meta: Meta) {
    title.setTitle('История заказов')
    meta.addTags([
      { name: 'keywords', content: 'Запорожье,спортпит.zp,история,заказов,купить,спортивное,питание,заказ' },
      { name: 'description', content: 'Страница просмотра истории заказов товаров товаров магазина спортивного питания' }
    ])
  }

  ngOnInit(): void {
    this.reloading = true
    this.fetch()
  }

  private fetch() {
    const params = Object.assign({}, this.filter, {
      offset: this.offset,
      limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params).subscribe(orders => {
      this.orders = this.orders.concat(orders)
      this.noMoreOrders = orders.length < STEP
      this.loading = false
      this.reloading = false
    })
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    this.oSub.unsubscribe()
  }

  applyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.reloading = true
    this.fetch()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }

  updateHistoryList() {
    this.orders = []
    this.offset = 0
    this.reloading = true
    this.fetch()
  }

  updateDeliveryForm(order: Order) {
    this.deliveryOrder = order
  }

}
