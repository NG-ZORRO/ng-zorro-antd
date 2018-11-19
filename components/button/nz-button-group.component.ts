import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { NzSizeLDSType } from '../core/types/size';

@Component({
  selector           : 'nz-button-group',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers          : [ NzUpdateHostClassService ],
  templateUrl        : './nz-button-group.component.html'
})
export class NzButtonGroupComponent implements OnInit {

  @Input()
  get nzSize(): NzSizeLDSType {
    return this._size;
  }

  set nzSize(value: NzSizeLDSType) {
    this._size = value;
    this.setClassMap();
  }

  constructor(private nzUpdateHostClassService: NzUpdateHostClassService, private elementRef: ElementRef) {
  }

  private _size: NzSizeLDSType;
  private prefixCls = 'ant-btn-group';

  setClassMap(): void {
    const classMap = {
      [ this.prefixCls ]        : true,
      [ `${this.prefixCls}-lg` ]: this.nzSize === 'large',
      [ `${this.prefixCls}-sm` ]: this.nzSize === 'small'
    };
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, classMap);
  }

  ngOnInit(): void {
    this.setClassMap();
  }
}
