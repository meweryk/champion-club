import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { MaterialInstance, MaterialService } from '../../classes/material.service'
import { Router } from '@angular/router'
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
  changeAuth: boolean

  links = [
    { url: '/home', name: 'Главная' },
    { url: '/gallery', name: 'Галерея' },
    { url: '/order', name: 'Спортивное питание' },
    { url: '/categories', name: 'Ассортимент' },
    { url: '/history', name: 'История' }
  ]

  constructor(private router: Router,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.width = window.innerWidth
    this.aSub = this.auth.$chT.subscribe((changeAuth: boolean) => {
      this.changeAuth = changeAuth

      this.thisAuthenticated()

    })
  }

  private thisAuthenticated() {
    this.nicname = this.auth.getNicname()
    this.shop = this.auth.getShop()
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
  }

  closeSidenav() {
    this.sidenav.close()
  }

  ngOnDestroy() {
    this.sidenav.destroy()
    this.aSub.unsubscribe()
  }

}

