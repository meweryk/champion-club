import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy, HostListener } from '@angular/core';
import { PositionsService } from 'src/app/shared/services/positions.service';
import { Position } from 'src/app/shared/interfaces';
import { MaterialService, MaterialInstance } from 'src/app/shared/classes/material.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service'

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.css']
})
export class PositionsFormComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('input') innputRef: ElementRef
  @Input('categoryId') categoryId: string
  shop: string

  filter = {}

  @ViewChild('modal') modalRef: ElementRef

  positions: Position[] = []

  loading = false
  positionId = null
  modal: MaterialInstance

  data = {}
  image: File
  imagePreview = ''

  form: FormGroup
  height: number
  constructor(private positionsService: PositionsService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.height = 0.5 * window.innerHeight
    this.shop = this.auth.getShop()

    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      cost: new FormControl(null, [Validators.required, Validators.min(1)]),
      stock: new FormControl(null, [Validators.required, Validators.min(0)]),
      rank: new FormControl(null, Validators.required),
      exposition: new FormControl(null, Validators.maxLength(4000)),
      imageSrc: new FormControl(null)
    })
    this.loading = true
    this.positionsService.fetch(this.categoryId).subscribe(positions => {
      this.positions = positions.filter(position => position.shop === this.shop).sort((a, b) => Intl.Collator().compare(a.name, b.name))
      this.loading = false
    })

  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.height = 0.5 * event.target.innerHeight
  }

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost,
      stock: position.stock,
      rank: position.rank,
      exposition: position.exposition
    })
    this.imagePreview = position.imageSrc
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onAddPosition() {
    this.positionId = null
    this.form.reset({
      name: null,
      cost: +1,
      stock: +0,
      rank: 'шт',
      exposition: ''
    })
    this.imagePreview = null
    this.modal.open()
    MaterialService.updateTextInputs()
  }

  onDeletePosition(event: Event, position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${position.name}"?`)

    if (decision) {
      this.positionsService.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast(response.message)
        },
        error => MaterialService.toast(error.error.message)
      )
    }
  }

  onCancel() {
    this.modal.close()
  }

  onSubmit() {
    this.form.setValue
    this.form.disable()

    const newPosition: Position = {
      name: this.form.value.name,
      cost: (this.form.value.cost).toFixed(2),
      stock: (this.form.value.stock).toFixed(3),
      rank: this.form.value.rank,
      exposition: this.form.value.exposition,
      imageSrc: this.form.value.imageSrc,
      category: this.categoryId
    }

    const completed = () => {
      this.modal.close()
      this.form.enable()
      this.image = null
    }

    if (this.positionId) {
      newPosition._id = this.positionId
      this.positionsService.update(newPosition, this.image).subscribe(
        position => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Изменения сохранены')
        },
        error => MaterialService.toast(error.error.message),
        completed
      )
    } else {
      let mdx = this.positions.findIndex(p => p.name === newPosition.name)
      if (mdx < 0) {
        this.positionsService.create(newPosition, this.image).subscribe(
          position => {
            MaterialService.toast('Позиция создана')
            this.positions.push(position)
            this.positions.sort((a, b) => Intl.Collator().compare(a.name, b.name))
          },
          error => MaterialService.toast(error.error.message),
          completed
        )
      } else {
        MaterialService.toast(`Позиция "${newPosition.name}" уже существует`)
        this.modal.close()
        this.form.enable()
        this.image = null
      }
    }
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
