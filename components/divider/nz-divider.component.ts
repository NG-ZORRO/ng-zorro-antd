import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { InputBoolean } from '../core/util';

@Component({
  selector           : 'nz-divider',
  templateUrl        : './nz-divider.component.html',
  preserveWhitespaces: false,
  providers          : [ NzUpdateHostClassService ],
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzDividerComponent implements OnChanges, OnInit {
  @Input() nzText: string | TemplateRef<void>;
  @Input() nzType: 'horizontal' | 'vertical' = 'horizontal';
  @Input() nzOrientation: 'left' | 'right' | '' = '';
  @Input() @InputBoolean() nzDashed = false;

  private setClass(): void {
    const orientationPrefix = (this.nzOrientation.length > 0) ? '-' + this.nzOrientation : this.nzOrientation;
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [ 'ant-divider' ]                              : true,
      [ `ant-divider-${this.nzType}` ]               : true,
      [ `ant-divider-with-text${orientationPrefix}` ]: this.nzText,
      [ `ant-divider-dashed` ]                       : this.nzDashed
    });
  }

  constructor(private elementRef: ElementRef, private nzUpdateHostClassService: NzUpdateHostClassService) {
  }

  ngOnChanges(): void {
    this.setClass();
  }

  ngOnInit(): void {
    this.setClass();
  }
}
