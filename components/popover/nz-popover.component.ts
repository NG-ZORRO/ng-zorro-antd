import {
  ChangeDetectorRef,
  Component,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';

@Component({
  selector           : 'nz-popover',
  animations         : [ fadeAnimation ],
  templateUrl        : './nz-popover.component.html',
  preserveWhitespaces: false,
  styles             : [ `
    .ant-popover {
      position: relative;
    }
  ` ]
})
export class NzPopoverComponent extends NzToolTipComponent {
  _prefix = 'ant-popover-placement';
  @ContentChild('neverUsedTemplate') _title: string | TemplateRef<void>; // used to remove NzToolTipComponent @ContentChild('nzTemplate')
  @ContentChild('nzTemplate') _content: string | TemplateRef<void>;
  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
