import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  {
    path: '', component: SiteLayoutComponent, children: [
      { path: '', redirectTo: '/start', pathMatch: 'full' },
      { path: 'start', loadChildren: () => import('./start-page/start.module').then(m => m.StartModule) },
      { path: 'home', loadChildren: () => import('./home-page/home.module').then(m => m.HomeModule) },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
