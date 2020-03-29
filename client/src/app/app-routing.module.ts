import { NgModule } from '@angular/core'
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      { path: '', redirectTo: '/start', pathMatch: 'full' },
      { path: 'start', loadChildren: () => import('./start-page/start.module').then(m => m.StartModule) },
      { path: 'home', loadChildren: () => import('./home-page/home.module').then(m => m.HomeModule) },
      { path: 'login', loadChildren: () => import('./login-page/login.module').then(m => m.LoginModule) },
      { path: 'register', loadChildren: () => import('./register-page/register.module').then(m => m.RegisterModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
