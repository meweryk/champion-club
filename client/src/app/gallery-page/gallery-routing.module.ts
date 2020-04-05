import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GalleryPageComponent } from './gallery-page.component'

const galleryRoutes: Routes = [
  { path: '', component: GalleryPageComponent }
]

@NgModule({
  imports: [RouterModule.forChild(galleryRoutes)],
  exports: [RouterModule]
})

export class GalleryRoutingModule { }
