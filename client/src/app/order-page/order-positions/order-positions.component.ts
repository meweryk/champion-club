import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Position } from 'src/app/shared/interfaces';
import { OrderService } from '../order.service';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { Meta, Title } from '@angular/platform-browser';
import { PictureService } from 'src/app/shared/services/picture.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})

export class OrderPositionsComponent implements OnInit {
  positions$: Observable<Position[]>
  thisShop: string
  height: number
  nameCategory: string
  allShops: string[]
  searchShop = ''
  searchVid = ''
  foto: any = {}

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private positionsService: PositionsService,
    private pictureService: PictureService,
    private order: OrderService,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.thisShop = this.authService.getShop()
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
              position = this.fetch(position)
              return position
            })
          }
        )
      )
  }

  private fetch(position: Position) {
    let imageScreen: string
    this.pictureService.getPhotoId(position._id).subscribe(pictures => {
      pictures.forEach((picture: { filename: string; contentType: any; _id: any; }) => {
        this.pictureService.getPhoto(picture.filename, picture.contentType).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener('load', () => {
            // Сохраните URL-адрес изображения и содержание изображения для нашего просмотра
            // Если пользователь нажимает на изображение, мы будем использовать URL, чтобы открыть изображение в полноэкранном режиме
            this.foto = {
              id: picture._id,
              url: `/api/pictures/${picture.filename}`,
              picture: reader.result
            }
            position.imageSrc = this.foto.picture
          }, false)
          if (data) {
            let blob = new Blob([data], { type: picture.contentType })
            reader.readAsDataURL(blob);
          }
        })
      })
    })
    return position
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = 0.75 * event.target.innerHeight
  }

  addToOrder(position: Position) {
    if (position.shop === this.thisShop) {
      MaterialService.toast('Вы не можете покупать сами у себя.')
    } else {
      MaterialService.toast(`Добавлено х${position.quantity}`)
      this.order.add(position)
    }

  }
}
