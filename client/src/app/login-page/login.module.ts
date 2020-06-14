import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LoginPageComponent } from './login-page.component'
import { LoginRoutingModule } from './login-routing.module'
import { ComponentsModule } from '../shared/components/components.module'
import { SharedModule } from '../shared/shared.module'
import { Title } from '@angular/platform-browser'

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  providers: [Title]
})

export class LoginModule { }
