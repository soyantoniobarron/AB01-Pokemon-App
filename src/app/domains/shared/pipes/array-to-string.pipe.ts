import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString',
  standalone: true
})
export class ArrayToStringPipe implements PipeTransform {

  transform(value: any[], separator: string = ', '): string {
    if (!Array.isArray(value)) {
      return '';
    }
    return value.join(separator);
  }

}
