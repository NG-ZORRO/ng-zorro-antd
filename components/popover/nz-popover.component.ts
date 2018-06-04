import {
  Component,
  ContentChild,
  Input,
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
  _title: string | TemplateRef<void>;
  @ContentChild('nzTemplate') _content: string | TemplateRef<void>;
}
