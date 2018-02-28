import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCssUnit'
})

export class CssUnitPipe implements PipeTransform {
  transform(value: number | string, defaultUnit: string = 'px'): string {
    const formatted = +value; // force convert
    return isNaN(formatted) ? `${value}` : `${formatted}${defaultUnit}`;
  }
}
