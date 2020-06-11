import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener, OnChanges } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../classes/material.service'
import { Router, NavigationEnd } from '@angular/router'
import { AuthService } from '../../services/auth.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sidenav') sidenavRef: ElementRef

  aSub: Subscription
  sidenav: MaterialInstance
  width: any
  nicname: string
  shop: string
  email: string
  changeAuth: boolean
  e1: string = 'test@ukr.net'
  e2: string = 'pr.zp26@gmail.com'
  logo: string

  links = [
    { url: '/home', name: 'Главная' },
    { url: '/gallery', name: 'Галерея' },
    { url: '/order', name: 'Спортивное питание' },
    { url: '/history', name: 'История' },
    { url: '/categories', name: 'Ассортимент' }
  ]

  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.logo = "Champion"
    this.width = window.innerWidth
    this.aSub = this.auth.$chT.subscribe((changeAuth: boolean) => {
      this.changeAuth = changeAuth
      this.thisAuthenticated()
    })
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && /\/order/.test(this.router.url)) {
        this.logo = "Спортпит.zp"
      } else {
        this.logo = "Champion"
      }
    })
  }

  private thisAuthenticated() {
    this.nicname = this.auth.getNicname()
    this.shop = this.auth.getShop()
    this.email = this.auth.getEmail()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.width = event.target.innerWidth
  }

  ngAfterViewInit() {
    this.sidenav = MaterialService.initSidenav(this.sidenavRef)
  }

  logout(event: Event) {
    event.preventDefault() //убрали перезагрузку страницы
    this.auth.logout()
    this.router.navigate(['/home'])
    this.sidenav.close()
  }

  closeSidenav() {
    this.sidenav.close()
  }

  ngOnDestroy() {
    this.sidenav.destroy()
    this.aSub.unsubscribe()
  }

  nikcnameShow() {
    MaterialService.toast(`${this.nicname}`)
  }

}

