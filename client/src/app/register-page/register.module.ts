import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { RegisterRoutingModule } from './register-routing.module'
import { RegisterPageComponent } from './register-page.component'
import { ComponentsModule } from '../shared/components/components.module'
import { SharedModule } from '../shared/shared.module'
import { Title } from '@angular/platform-browser'

@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ComponentsModule,
    SharedModule
  ],
  providers: [Title]
})

export class RegisterModule { }
