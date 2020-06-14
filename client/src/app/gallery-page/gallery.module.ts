import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { ComponentsModule } from '../shared/components/components.module';
import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryPageComponent } from './gallery-page.component';
import { GalleryFormComponent } from './gallery-form/gallery-form.component';
import { Title } from '@angular/platform-browser';


@NgModule({
  declarations: [
    GalleryPageComponent,
    GalleryFormComponent
  ],
  providers: [Title],
  imports: [
    CommonModule,
    SharedModule,
    GalleryRoutingModule,
    ComponentsModule,

  ]
})

export class GalleryModule { }
