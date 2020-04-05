import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { CategoriesPageComponent } from './categories-page.component'
import { CategoriesFormComponent } from './categories-form/categories-form.component'

const categoriesRoutes: Routes = [
  { path: '', component: CategoriesPageComponent },
  { path: 'new', component: CategoriesFormComponent },
  { path: ':id', component: CategoriesFormComponent }
]

@NgModule({
  imports: [RouterModule.forChild(categoriesRoutes)],
  exports: [RouterModule]
})

export class CategoriesRoutingModule { }
