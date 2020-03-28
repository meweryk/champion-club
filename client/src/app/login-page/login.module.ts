import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { LoginPageComponent } from './login-page.component'
import { LoginRoutingModule } from './login-routing.module'

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginRoutingModule
  ],
  providers: []
})

export class LoginModule { }
