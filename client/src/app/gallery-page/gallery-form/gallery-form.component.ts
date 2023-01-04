import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { ActivatedRoute, Router, Params } from '@angular/router'

import { Album } from 'src/app/shared/interfaces'
import { Title, Meta } from '@angular/platform-browser'
import { AlbumService } from 'src/app/shared/services/album.service'
import { PictureService } from 'src/app/shared/services/picture.service'
import { UntypedFormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css']
})
export class GalleryFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('input') innputRef: ElementRef
  @ViewChild('modal') modalRef: ElementRef
  @ViewChild('show') showRef: ElementRef
  modal: MaterialInstance
  show: MaterialInstance

  trainer: boolean
  myEmail: string
  height: number
  width: number
  name: string
  description: string

  form: UntypedFormGroup

  loading = false
  albumId: string
  data = {}
  image: File
  imagePreview = ''

  album: Album
  pictures: Array<any> = []
  imageToShow: any = null

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private albumService: AlbumService,
    private pictureService: PictureService,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.height = window.innerHeight
    this.width = window.innerWidth
    this.myEmail = this.auth.getEmail()
    this.trainer = ((this.myEmail === "test@ukr.net") || (this.myEmail === "chmaraksergei@gmail.com")) ? true : false

    this.albumId = this.route.snapshot.params['id']
    this.name = this.route.snapshot.queryParams['name']
    this.description = this.route.snapshot.queryParams['description']
    this.title.setTitle(`${this.name}`)
    this.meta.addTags([
      { name: 'keywords', content: `Запорожье,Чемпион,фотографии,${this.name}` },
      { name: 'description', content: `${this.description} из альбома ${this.name}` }
    ])

    this.loading = true

    this.route.queryParams.subscribe((params: Params) => {
      this.name = params['name']
      this.description = params['description']
    })

    this.fetch()

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = event.target.innerHeight
    this.width = event.target.innerWidth
  }

  private fetch() {
    this.pictureService.getPhotoId(this.albumId).subscribe(pictures => {
      pictures.forEach((picture: { filename: string; contentType: any; _id: any; }) => {
        this.pictureService.getPhoto(picture.filename, picture.contentType).subscribe(data => {
          let reader = new FileReader();
          reader.addEventListener('load', () => {
            // Сохраните URL-адрес изображения и содержание изображения для нашего просмотра
            // Если пользователь нажимает на изображение, мы будем использовать URL, чтобы открыть изображение в полноэкранном режиме
            this.pictures.push({
              id: picture._id,
              url: `/api/pictures/${picture.filename}`,
              picture: reader.result
            })
          }, false)
          if (data) {
            let blob = new Blob([data], { type: picture.contentType })
            reader.readAsDataURL(blob);
          }
        })
      })
      this.loading = false
    })
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    this.show = MaterialService.initModal(this.showRef)
  }

  onCancel() {
    this.modal.close()
    this.show.close()
  }

  ngOnDestroy() {
    this.modal.destroy()
    this.show.destroy()
  }

  deletePicture(event: Event, id: string) {
    event.stopPropagation()
    const decision = window.confirm("Удалить фото из базы?")
    if (decision) {
      this.pictureService.deletePhoto(id).subscribe(
        response => {
          const idx = this.pictures.findIndex(p => p.id === id)
          this.pictures.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  deleteAlbum() {
    const desision = window.confirm(`Вы уверены, что хотите удалить альбом "${this.name}? Будут удалены все фото."`)
    if (desision) {
      this.albumService.delete(this.albumId)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => this.router.navigate(['/gallery'])
        )
    }
  }

  onAddPhoto() {
    this.modal.open()
    this.imagePreview = null
  }

  onSubmit() {
    //this.form.value.imageSrc

    const completed = () => {
      this.modal.close()
      this.image = null
      this.pictures = []
      this.loading = true
      this.fetch()
    }

    this.pictureService.uploadPhotos(this.albumId, this.image).subscribe(
      response => MaterialService.toast(response.message),
      error => MaterialService.toast(error.error.message),
      completed,
    )
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result as string
    }

    reader.readAsDataURL(file)
  }

  triggerClick() {
    this.innputRef.nativeElement.click()
  }


  showPicture(picture) {
    this.imageToShow = picture.picture
    this.show.open()
  }

}
