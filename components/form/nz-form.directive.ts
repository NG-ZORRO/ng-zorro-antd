import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2 } from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

@Directive({
  selector : '[nz-form]',
  providers: [ NzUpdateHostClassService ],
  host     : {
    '[class.ant-form]': 'true'
  }
})
export class NzFormDirective implements OnInit, OnChanges {
  @Input() nzLayout = 'horizontal';

  setClassMap(): void {
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [ `ant-form-${this.nzLayout}` ]: this.nzLayout
    });
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private nzUpdateHostClassService: NzUpdateHostClassService) {
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(): void {
    this.setClassMap();
  }
}
