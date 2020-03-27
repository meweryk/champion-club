import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private swUpdate: SwUpdate) { }

  ngOnInit() {

    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm("Доступна новая версия. Загрузить новую версию?")) {
          window.location.reload()
        }
      })
    }

  }

}
