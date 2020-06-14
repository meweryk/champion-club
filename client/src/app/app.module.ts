import { BrowserModule, Title } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { TokenInterceptor } from './shared/classes/token.interceptor'
import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'
import { ComponentsModule } from './shared/components/components.module'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
