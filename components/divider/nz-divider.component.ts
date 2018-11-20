import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
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
    const classMap = {
      [ 'ant-divider' ]                              : true,
      [ `ant-divider-${this.nzType}` ]               : true,
      [ `ant-divider-with-text${orientationPrefix}` ]: this.nzText,
      [ `ant-divider-dashed` ]                       : this.nzDashed
    };
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, classMap);
  }

  constructor(private elementRef: ElementRef, private nzUpdateHostClassService: NzUpdateHostClassService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setClass();
  }

  ngOnInit(): void {
    this.setClass();
  }
}
