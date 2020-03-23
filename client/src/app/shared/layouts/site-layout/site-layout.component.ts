import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../classes/material.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sidenav') sidenavRef: ElementRef

  sidenav: MaterialInstance

  links = [
    { url: '/login', name: 'Вход' },
    { url: '/', name: 'Новости' },
    { url: '/', name: 'Галерея' },
    { url: '/', name: 'Контакты' },
    { url: '/', name: 'Спортивное питание' }
  ]

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.sidenav = MaterialService.initSidenav(this.sidenavRef)
  }

  ngOnDestroy() {
    this.sidenav.destroy()
  }

}

