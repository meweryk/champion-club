import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { ServiceWorkerModule } from '@angular/service-worker'
import { environment } from '../environments/environment'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

import { SiteLayoutComponent } from './shared/layouts/site-layout/site-layout.component'
import { ComponentsModule } from './shared/components/components.module'
import { SharedModule } from './shared/shared.module'
import { HttpClientModule } from '@angular/common/http'

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
