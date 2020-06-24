import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interfaces';
import { CategoriesService } from 'src/app/shared/services/categories.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService,
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

  }

}
