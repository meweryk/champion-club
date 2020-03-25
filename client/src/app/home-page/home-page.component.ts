import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('parallax1') parallax1Ref: ElementRef
  @ViewChild('parallax2') parallax2Ref: ElementRef
  @ViewChild('parallax3') parallax3Ref: ElementRef
  @ViewChild('parallax4') parallax4Ref: ElementRef

  parallax1: MaterialInstance
  parallax2: MaterialInstance
  parallax3: MaterialInstance
  parallax4: MaterialInstance

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.parallax1 = MaterialService.initParallax(this.parallax1Ref)
    this.parallax2 = MaterialService.initParallax(this.parallax2Ref)
    this.parallax3 = MaterialService.initParallax(this.parallax3Ref)
    this.parallax4 = MaterialService.initParallax(this.parallax4Ref)
  }

  ngOnDestroy() {
    this.parallax1.destroy()
    this.parallax2.destroy()
    this.parallax3.destroy()
    this.parallax4.destroy()
  }

}
