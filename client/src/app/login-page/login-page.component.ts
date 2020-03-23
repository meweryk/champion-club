import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('modal') modalRef: ElementRef
  modal: MaterialInstance

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    this.modal.open()
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

}
