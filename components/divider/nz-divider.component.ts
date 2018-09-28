import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-divider',
  templateUrl        : './nz-divider.component.html',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush
})
export class NzDividerComponent implements OnChanges, OnInit {
  // region fields

  isText = false;
  textStr = '';
  textTpl: TemplateRef<void>;

  @Input()
  set nzText(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this.textStr = null;
      this.textTpl = value;
    } else {
      this.textStr = value;
    }
    this.isText = !!value;
  }

  @Input() nzType: 'horizontal' | 'vertical' = 'horizontal';

  @Input() nzOrientation: 'left' | 'right' | '' = '';

  private _dashed = false;

  @Input()
  set nzDashed(value: boolean) {
    this._dashed = toBoolean(value);
  }

  get nzDashed(): boolean {
    return this._dashed;
  }

  // endregion
  private setClass(): void {
    const orientationPrefix = (this.nzOrientation.length > 0) ? '-' + this.nzOrientation : this.nzOrientation;
    const classMap = {
      [ 'ant-divider' ]                              : true,
      [ `ant-divider-${this.nzType}` ]               : true,
      [ `ant-divider-with-text${orientationPrefix}` ]: this.isText,
      [ `ant-divider-dashed` ]                       : this.nzDashed
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
    this.cd.detectChanges();
  }

  constructor(private el: ElementRef, private cd: ChangeDetectorRef, private updateHostClassService: NzUpdateHostClassService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setClass();
  }

  ngOnInit(): void {
    this.setClass();
  }
}
