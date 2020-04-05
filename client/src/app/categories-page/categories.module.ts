import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CategoriesPageComponent } from './categories-page.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { PositionsFormComponent } from './categories-form/positions-form/positions-form.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { ComponentsModule } from '../shared/components/components.module';


@NgModule({
  declarations: [
    CategoriesPageComponent,
    CategoriesFormComponent,
    PositionsFormComponent,
  ],
  providers: [],
  imports: [
    CommonModule,
    SharedModule,
    CategoriesRoutingModule,
    ComponentsModule
  ]
})

export class CategoriesModule { }
