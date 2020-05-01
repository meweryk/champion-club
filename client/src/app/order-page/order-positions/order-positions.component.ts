import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'src/app/shared/interfaces';
import { OrderService } from '../order.service';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})

export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>

  height: number
  nameCategory: string
  allShops: string[]
  searchShop = ''
  searchVid = ''

  constructor(private route: ActivatedRoute,
    private positionsService: PositionsService,
    private order: OrderService,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.nameCategory = this.route.snapshot.params['nameCategory']
    this.title.setTitle(`${this.nameCategory}`)
    this.meta.addTags([
      { name: 'keywords', content: `Запорожье,спортпит,спортивное питание,${this.nameCategory},купить` },
      { name: 'description', content: `Страница позиций товара из категории ${this.nameCategory}` }
    ])
    this.height = 0.75 * window.innerHeight
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map(
          (positions: Position[]) => {
            return positions.map(position => {
              position.quantity = 1
              return position
            })
          }
        )
      )
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = 0.75 * event.target.innerHeight
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено х${position.quantity}`)
    this.order.add(position)
  }
}
