import { Directive } from '@angular/core';

@Directive({
  selector: '[nzDateCell]',
  exportAs: 'nzDateCell'
})
export class NzDateCellDirective {}

@Directive({
  selector: '[nzMonthCell]',
  exportAs: 'nzMonthCell'
})
export class NzMonthCellDirective {}

@Directive({
  selector: '[nzDateFullCell]',
  exportAs: 'nzDateFullCell'
})
export class NzDateFullCellDirective {}

@Directive({
  selector: '[nzMonthFullCell]',
  exportAs: 'nzMonthFullCell'
})
export class NzMonthFullCellDirective {}
