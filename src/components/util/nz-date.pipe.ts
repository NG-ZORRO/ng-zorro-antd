import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({ name: 'nzDate' })
export class NzDatePipe implements PipeTransform {
  transform(value: Date, formatString: string): string {
    if (value) {
      return moment(+value).format(formatString);
    } else {
      return '';
    }
  }
}
