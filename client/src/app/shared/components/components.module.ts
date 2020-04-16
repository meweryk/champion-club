import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { HistoryListPipe } from './pipes/history-list.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    SearchPipe,
    HistoryListPipe
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    SearchPipe,
    HistoryListPipe
  ]
})

export class ComponentsModule { }

