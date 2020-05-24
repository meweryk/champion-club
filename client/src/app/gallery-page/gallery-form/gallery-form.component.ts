import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { ActivatedRoute, Router, Params } from '@angular/router'

import { Album } from 'src/app/shared/interfaces'
import { Title, Meta } from '@angular/platform-browser'
import { AlbumService } from 'src/app/shared/services/album.service'
import { PhotoService } from 'src/app/shared/services/picture.service'
import { FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-gallery-form',
  templateUrl: './gallery-form.component.html',
  styleUrls: ['./gallery-form.component.css']
})
export class GalleryFormComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('input') innputRef: ElementRef
  @ViewChild('modal') modalRef: ElementRef
  //@ViewChild('carousel') carouselRef: ElementRef
  modal: MaterialInstance
  carousel: MaterialInstance

  trainer: boolean
  name: string
  description: string

  form: FormGroup

  loading = false
  albumId: string
  data = {}
  image: File
  imagePreview = ''

  album: Album
  pictures: any[]
  imageToShow: any;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private albumService: AlbumService,
    private photoService: PhotoService,
    private title: Title,
    private meta: Meta) { }

  ngOnInit(): void {
    this.trainer = ((this.auth.getEmail).toString() === "test@ukr.net") ? true : false
    this.albumId = this.route.snapshot.params['id']
    this.name = this.route.snapshot.queryParams['name']
    this.description = this.route.snapshot.queryParams['description']
    this.title.setTitle(`${this.name}`)
    this.meta.addTags([
      { name: 'keywords', content: `Запорожье,Чемпион,фотографии,${this.name}` },
      { name: 'description', content: `${this.description} из альбома ${this.name}` }
    ])

    this.route.queryParams.subscribe((params: Params) => {
      this.name = params['name']
      this.description = params['description']
    })

    /*this.route.params.subscribe((params: Params) => {
      this.albumService.getAlbum(params['id'])
        .subscribe((res) => {
          if (!res.error) {
            this.album = res.album;
            if (this.album.pictures) {
              //Запросить каждую фотографию в альбоме
              for (let i = 0; i < this.album.pictures.length; i++) {
                this.photoService.getPhoto(this.album.pictures[i])
                  .subscribe((picture) => {
                    // Возьмите изображение base64 и прочитайте его как файл
                    const reader = new FileReader();
                    reader.addEventListener('load', () => {
                      // Сохраните URL-адрес изображения и содержание изображения для нашего просмотра
                      // Если пользователь нажимает на изображение, мы будем использовать URL, чтобы открыть изображение в полноэкранном режиме
                      this.pictures.push({
                        id: this.album.pictures[i],
                        url: '/api/pictures/' + this.album.pictures[i],
                        picture: reader.result
                      })
                    }, false)

                    if (picture) {
                      reader.readAsDataURL(picture);
                    }
                  })
              }
            }
          }
        })
    })

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
    }

    //Добавьте идентификатор альбома, чтобы опубликовать параметры запроса для каждой фотографииo
    this.uploader.onBuildItemForm = (fileItem: any, form: any) => {
      form.append('album', this.album._id);
      return { fileItem, form }
    }

    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      const res = JSON.parse(response)
      if (res.success) {
        this.uploader.removeFromQueue(item)
        if (this.uploader.queue.length === 0) {
          // Reload page when all images have been uploaded
          location.reload()
        }
      }
    }*/
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
    //this.carousel = MaterialService.initCarousel(this.carouselRef)
  }

  onCancel() {
    this.modal.close()
  }

  ngOnDestroy() {
    this.modal.destroy()
    //this.carousel.destroy()
  }

  /*deletePicture(id) {
    this.photoService.deletePhoto(id)
      .subscribe((data) => {
        this.pictures.splice(this.findPictureIndex(id), 1);
      })
  }

  findPictureIndex(id): number {
    for (let i = 0; i < this.pictures.length; i++) {
      if (this.pictures[i].id === id) {
        return i
      }
    }
    return -1
  }*/

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
    }

    this.photoService.uploadPhotos(this.albumId, this.image).subscribe(
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

}
