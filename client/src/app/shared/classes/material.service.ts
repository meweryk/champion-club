import { ElementRef } from '@angular/core';

declare var M

export interface MaterialInstance {
  open?(): void
  close?(): void
  destroy?(): void

}

export interface MaterialDatepicker extends MaterialInstance {
  date?: Date
}

export interface MaterialAutocomplete extends MaterialInstance {
  el?: any
  updateData?(data: any): any
}

export class MaterialService {
  static toast(message: string) {
    M.toast({ html: message })
  }

  static initializeFloatingButton(ref: ElementRef) {
    M.FloatingActionButton.init(ref.nativeElement)
  }

  static updateTextInputs() {
    M.updateTextFields()
  }

  static initModal(ref: ElementRef): MaterialInstance {
    return M.Modal.init(ref.nativeElement)
  }

  static initFormSelect(ref: ElementRef): MaterialInstance {
    return M.FormSelect.init(ref.nativeElement)
  }

  static initTooltip(ref: ElementRef): MaterialInstance {
    return M.Tooltip.init(ref.nativeElement)
  }

  static initDatepicker(ref: ElementRef, onClose: () => void): MaterialDatepicker {
    return M.Datepicker.init(ref.nativeElement, {
      format: 'dd.mm.yyyy',
      showClearBtn: true,
      onClose,
      autoClose: true
    })
  }

  static initTapTarget(ref: ElementRef): MaterialInstance {
    return M.TapTarget.init(ref.nativeElement)
  }

  static initSidenav(ref: ElementRef): MaterialInstance {
    return M.Sidenav.init(ref.nativeElement)
  }

  static initCollapsible(ref: ElementRef): MaterialInstance {
    return M.Collapsible.init(ref.nativeElement)
  }

  static initAutocomplete(ref: ElementRef, onAutocomplete: () => void, minLength: number): MaterialAutocomplete {
    return M.Autocomplete.init(ref.nativeElement, {
      data: {},
      minLength,
      onAutocomplete
    })
  }

  static initDropdown(ref: ElementRef): MaterialInstance {
    return M.Dropdown.init(ref.nativeElement, {
      coverTrigger: false
    })
  }

  static initParallax(ref: ElementRef): MaterialInstance {
    return M.Parallax.init(ref.nativeElement)
  }

  static initCarousel(ref: ElementRef): MaterialInstance {
    return M.Carousel.init(ref.nativeElement)
  }
}
