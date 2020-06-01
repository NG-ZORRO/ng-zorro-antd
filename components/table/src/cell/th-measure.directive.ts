/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */
import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: 'th'
})
export class NzThMeasureDirective implements OnChanges {
  changes$ = new Subject();
  @Input() nzWidth: string | null = null;
  @Input() colspan: string | number | null = null;
  ngOnChanges(changes: SimpleChanges): void {
    const { nzWidth, colspan } = changes;
    if (nzWidth || colspan) {
      this.changes$.next();
    }
  }
}
