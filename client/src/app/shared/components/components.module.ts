import { LoaderComponent } from './loader/loader.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    LoaderComponent,
    SearchPipe
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    SearchPipe
  ]
})

export class ComponentsModule { }
