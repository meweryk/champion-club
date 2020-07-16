import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Meta, Title } from '@angular/platform-browser';
import { map } from 'rxjs/operators';
import { PictureService } from 'src/app/shared/services/picture.service';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>
  foto: any = {}

  constructor(private categoriesService: CategoriesService,
    private pictureService: PictureService,
    private title: Title,
    private meta: Meta) {
    title.setTitle('Спортпит.zp')
    meta.addTags([
      { name: 'keywords', content: 'Запорожье,спортпит.zp,купить,спортивное питание,гейнер,аминокислоты,антиоксиданты,протеин,витамины,для суставов,жирные кислоты,бустер,тестостерон,азот,жиросжигатели,креатин,батончики,аксессуары,для здоровья,предтренировочники,купить' },
      { name: 'description', content: 'Страница категорий товаров магазина спортивного питания' }
    ])
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
      .pipe(
        map((categories: Category[]) => {
          return categories.map(category => {
            category = this.fetch(category)
            return category
          })
        })
      )
  }

  private fetch(category: Category) {
    this.pictureService.getPhotoId(category._id).subscribe(pictures => {
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
            category.imageSrc = this.foto.picture
          }, false)
          if (data) {
            let blob = new Blob([data], { type: picture.contentType })
            reader.readAsDataURL(blob);
          }
        })
      })
    })
    return category
  }

}
