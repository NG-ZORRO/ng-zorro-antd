import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';

import { NzFormItemComponent } from './nz-form-item.component';

@Component({
  selector: 'nz-form-label',
  exportAs: 'nzFormLabel',
  providers: [NzUpdateHostClassService],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-form-label.component.html'
})
export class NzFormLabelComponent extends NzColDirective implements OnDestroy, AfterViewInit {
  @Input() nzFor: string;
  @Input() @InputBoolean() nzRequired = false;
  @Input() @InputBoolean() nzColon = true;

  constructor(
    nzUpdateHostClassService: NzUpdateHostClassService,
    elementRef: ElementRef,
    @Optional() @Host() nzFormItemComponent: NzFormItemComponent,
    @Optional() @Host() nzRowDirective: NzRowDirective,
    renderer: Renderer2
  ) {
    super(nzUpdateHostClassService, elementRef, nzFormItemComponent || nzRowDirective, renderer);
    renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
