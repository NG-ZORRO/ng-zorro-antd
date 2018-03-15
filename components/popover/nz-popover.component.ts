import {
  Component,
  Input
} from '@angular/core';

import { fadeAnimation } from '../core/animation/fade-animations';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';

@Component({
  selector: 'nz-popover',
  preserveWhitespaces: false,
  animations: [ fadeAnimation ],
  templateUrl: './nz-popover.component.html',
  styles: [ `
    .ant-popover { position: relative; }
  ` ]
})
export class NzPopoverComponent extends NzToolTipComponent {
  _prefix = 'ant-popover-placement';
}
