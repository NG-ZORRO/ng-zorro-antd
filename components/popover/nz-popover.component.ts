import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, Input, TemplateRef, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { isNotNil } from '../core/util';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';

@Component({
  selector           : 'nz-popover',
  animations         : [ fadeAnimation ],
  templateUrl        : './nz-popover.component.html',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  styles             : [ `
    .ant-popover {
      position: relative;
    }
  ` ]
})
export class NzPopoverComponent extends NzToolTipComponent {
  _prefix = 'ant-popover-placement';

  @Input() @ContentChild('neverUsedTemplate') nzTitle: string | TemplateRef<void>; // used to remove NzToolTipComponent @ContentChild('nzTemplate')
  @Input() @ContentChild('nzTemplate') nzContent: string | TemplateRef<void>;

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  protected isContentEmpty(): boolean {
    const isTitleEmpty = this.nzTitle instanceof TemplateRef ? false : (this.nzTitle === '' || !isNotNil(this.nzTitle));
    const isContentEmpty = this.nzContent instanceof TemplateRef ? false : (this.nzContent === '' || !isNotNil(this.nzContent));
    return isTitleEmpty && isContentEmpty;
  }
}
