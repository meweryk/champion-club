import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { AlbumService } from '../shared/services/album.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Album } from '../shared/interfaces';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery-page',
  templateUrl: './gallery-page.component.html',
  styleUrls: ['./gallery-page.component.css']
})
export class GalleryPageComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('floating') floatingRef: ElementRef
  modal: MaterialInstance
  loading = false

  albums$: Observable<Album[]>
  albums: Album[];
  height: any

  trainer: boolean
  myEmail: string

  form: FormGroup

  constructor(private albumService: AlbumService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.myEmail = this.auth.getEmail()
    this.trainer = ((this.myEmail === "test@ukr.net") || (this.myEmail === "chmaraksergei@gmail.com")) ? true : false
    this.title.setTitle('Фотогалерея')
    this.meta.addTags([
      { name: 'keywords', content: 'Запорожье,Чемпион,фотографии,спорт,зал,клуб,' },
      { name: 'description', content: 'Фотогалерея клуба Чемпион' }
    ])

    this.form = new FormGroup({
      albumName: new FormControl(null, [Validators.required, Validators.maxLength(20)]),
      albumDescription: new FormControl(null, Validators.maxLength(4000))
    })

    this.albums$ = this.albumService.getAlbums()
      .pipe(
        map((albums: Album[]) => {
          return albums.map(album => album)
        })
      )
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    MaterialService.initializeFloatingButton(this.floatingRef)
  }

  onCancel() {
    this.modal.close()
  }

  addAlbum() {
    this.form.reset({
      albumName: null,
      albumDescription: '',
    })
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onSubmit() {
    this.form.setValue
    this.form.disable()
    let album$

    const album: Album = {
      name: this.form.value.albumName,
      description: this.form.value.albumDescription
    }

    const completed = () => {
      this.modal.close()
      this.form.enable()
    }

    album$ = this.albumService.addAlbum(album)

    album$.subscribe(
      (album: Album) => {
        this.albums$.pipe(
          map((albums: Album[]) => {
            return albums.push(album)
          })
        )
        MaterialService.toast('Альбом создан')
        this.modal.close()
        this.form.enable()
        this.router.navigate(
          ['/gallery', album._id],
          {
            queryParams: {
              name: album.name,
              description: album.description
            }
          }
        )
      },
      (error: {
        error: {
          message: string
        }
      }) => {
        MaterialService.toast(error.error.message)
        completed
      }
    )
  }

  ngOnDestroy() {
    this.modal.destroy
  }

}
