import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialService } from '../shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, AfterViewInit, OnDestroy {

  form: FormGroup
  aSub: Subscription
  loader = false

  constructor(private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loader = false
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        MaterialService.toast('Теперь вы можете войти в систему используя свои данные')
      } else if (params['accessDenied']) {
        MaterialService.toast('Для начала авторизуйтесь в системе')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Пожалуйста войдите в систему заново')
      }
    })
  }

  ngAfterViewInit() {

  }

  ngOnDestroy() {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }

  onSubmit() {
    this.form.disable()
    this.loader = true

    this.aSub = this.auth.login(this.form.value).subscribe(
      () => this.router.navigate(['/start']),
      error => {
        MaterialService.toast(error.error.message)
        this.form.enable()
        this.loader = false
      }
    )
  }

}
