import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriesService } from '../shared/services/categories.service';
import { Category } from '../shared/interfaces';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})
export class CategoriesPageComponent implements OnInit {

  categories$: Observable<Category[]>
  height: any

  constructor(private categoriesService: CategoriesService,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.categories$ = this.categoriesService.fetch()
    this.title.setTitle('Категории товара.')
    this.meta.addTags([
      { name: 'keywords', content: 'Запорожье,Спортпит,ассортимент,категории,товар' },
      { name: 'description', content: 'Страница создания, изменения, удаления категорий товаров для интернет магазина' }
    ])
  }

}
