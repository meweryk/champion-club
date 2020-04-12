import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchV'
})

export class SearchPipe implements PipeTransform {
  transform(positions, value) {
    return positions.filter(position => {
      return (position.name.toLocaleUpperCase().includes(value[0].toLocaleUpperCase()) && position.shop.toLocaleUpperCase().includes(value[1].toLocaleUpperCase()))
    })
  }
}
