import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LoginPageComponent } from './login-page.component'
import { LoginRoutingModule } from './login-routing.module'
import { ComponentsModule } from '../shared/components/components.module'
import { SharedModule } from '../shared/shared.module'

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
  providers: []
})

export class LoginModule { }
