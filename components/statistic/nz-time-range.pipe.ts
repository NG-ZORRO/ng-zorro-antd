import { Pipe, PipeTransform } from '@angular/core';
import { padStart, timeUnits } from '../core/util';

@Pipe({
  name: 'nzTimeRange',
  pure: true
})
export class NzTimeRangePipe implements PipeTransform {
  transform(value: string | number, format: string = 'HH:mm:ss'): string {
    let duration = Number(value || 0);

    return timeUnits.reduce((current, [ name, unit ]) => {
      if (current.indexOf(name) !== -1) {
        const v = Math.floor(duration / unit);
        duration -= v * unit;
        return current.replace(
          new RegExp(`${name}+`, 'g'),
          (match: string) => {
            return padStart(v.toString(), match.length, '0');
          }
        );
      }
      return current;
    }, format);
  }
}
