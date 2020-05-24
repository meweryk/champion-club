import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { GalleryPageComponent } from './gallery-page.component'
import { GalleryFormComponent } from './gallery-form/gallery-form.component'

const galleryRoutes: Routes = [
  { path: '', component: GalleryPageComponent },
  { path: ':id', component: GalleryFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(galleryRoutes)],
  exports: [RouterModule]
})

export class GalleryRoutingModule { }
