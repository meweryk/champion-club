import { Component, OnInit, OnDestroy } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MaterialService } from '../shared/classes/material.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  form: UntypedFormGroup
  aSub: Subscription
  loader = false

  constructor(private auth: AuthService,
    private router: Router,
    private title: Title,
    private meta: Meta) {
    title.setTitle('Регистрация')
    meta.addTags([
      { name: 'keywords', content: 'Регистрация' },
      { name: 'description', content: 'Страница для регистрации в системе' }
    ])
  }

  ngOnInit(): void {
    this.form = new UntypedFormGroup({
      email: new UntypedFormControl(null, [Validators.required, Validators.email]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)]),
      nicname: new UntypedFormControl(null, [Validators.required]),
      shop: new UntypedFormControl(null, [Validators.required]),
      phone: new UntypedFormControl(null, [Validators.pattern('^[0-9]+(?!.)')])
    })

    this.loader = false
  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()

    this.loader = true

    this.aSub = this.auth.register(this.form.value).subscribe(
      () => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true
          }
        })
      },
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
        this.loader = false
      }
    )
  }

}
