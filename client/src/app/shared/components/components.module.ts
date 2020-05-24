import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { HistoryListPipe } from './pipes/history-list.pipe';
import { SearchShopPipe } from './pipes/searchshop.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    SearchPipe,
    HistoryListPipe,
    SearchShopPipe
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    SearchPipe,
    HistoryListPipe,
    SearchShopPipe
  ]
})

export class ComponentsModule { }

