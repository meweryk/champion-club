import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router'

import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'
import { AuthGuard } from './shared/classes/auth.guard'

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      { path: '', redirectTo: '/start', pathMatch: 'full' },
      { path: 'start', loadChildren: () => import('./start-page/start.module').then(m => m.StartModule) },
      { path: 'home', loadChildren: () => import('./home-page/home.module').then(m => m.HomeModule) },
      { path: 'order', loadChildren: () => import('./order-page/order.module').then(m => m.OrderModule) },
      { path: 'gallery', loadChildren: () => import('./gallery-page/gallery.module').then(m => m.GalleryModule) },
      { path: 'login', loadChildren: () => import('./login-page/login.module').then(m => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./register-page/register.module').then(m => m.RegisterModule) },
      { path: 'categories', canActivate: [AuthGuard], loadChildren: () => import('./categories-page/categories.module').then(m => m.CategoriesModule) },
      { path: 'history', canActivate: [AuthGuard], loadChildren: () => import('./history-page/history.module').then(m => m.HistoryModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
