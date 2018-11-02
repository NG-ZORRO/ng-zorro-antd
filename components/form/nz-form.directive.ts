import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

@Directive({
  selector : '[nz-form]',
  providers: [ NzUpdateHostClassService ]
})
export class NzFormDirective implements OnInit {
  el: HTMLElement = this.elementRef.nativeElement;
  prefixCls = 'ant-form';
  private _layout = 'horizontal';

  @Input()
  set nzLayout(value: string) {
    this._layout = value;
    this.setClassMap();
  }

  get nzLayout(): string {
    return this._layout;
  }

  setClassMap(): void {
    const classMap = {
      [ `${this.prefixCls}` ]                 : true,
      [ `${this.prefixCls}-${this.nzLayout}` ]: this.nzLayout
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private nzUpdateHostClassService: NzUpdateHostClassService) {
  }

  ngOnInit(): void {
    this.setClassMap();
  }
}
