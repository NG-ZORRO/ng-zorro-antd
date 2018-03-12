import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

@Directive({
  selector : '[nz-form]',
  providers: [ NzUpdateHostClassService ]
})
export class NzFormDirective implements OnInit {
  el: HTMLElement;
  prefixCls = 'ant-form';
  type = 'horizontal';

  @Input()
  set nzLayout(value: string) {
    this.type = value;
    this.setClassMap();
  }

  setClassMap(): void {
    const classMap = {
      [ `${this.prefixCls}` ]             : true,
      [ `${this.prefixCls}-${this.type}` ]: this.type
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private nzUpdateHostClassService: NzUpdateHostClassService) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.setClassMap();
  }
}
