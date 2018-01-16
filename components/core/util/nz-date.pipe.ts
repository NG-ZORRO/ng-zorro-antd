import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({ name: 'nzDate' })
export class NzDatePipe implements PipeTransform {
  transform(value: Date | number | string, formatString: string): string {
    if (moment(value).isValid()) {
      return moment(value).format(formatString);
    } else {
      return '';
    }
  }
}
