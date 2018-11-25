import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { isEmpty, isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-spin',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-spin.component.html'
})
export class NzSpinComponent implements AfterViewInit {
  spinning$ = new BehaviorSubject(true);
  debounceSpinning$: Observable<boolean> = this.spinning$.asObservable().pipe(debounceTime(0));
  @ViewChild('containerElement') containerElement: ElementRef;
  @ViewChild('nestedElement') nestedElement: ElementRef;
  @Input() nzIndicator: TemplateRef<void>;
  @Input() nzSize = 'default';
  @Input() nzTip: string;

  @Input()
  set nzDelay(value: number) {
    if (isNotNil(value)) {
      this.debounceSpinning$ = this.spinning$.asObservable().pipe(debounceTime(value));
    }
  }

  @Input()
  set nzSpinning(value: boolean) {
    this.spinning$.next(toBoolean(value));
  }

  checkNested(): void {
    const el: HTMLElement = this.elementRef.nativeElement;
    const containerElement = this.containerElement.nativeElement;
    const nestedElement = this.nestedElement.nativeElement;
    /** no way to detect empty https://github.com/angular/angular/issues/12530 **/
    /** https://github.com/angular/material2/issues/11280 **/
    if (!isEmpty(containerElement)) {
      this.renderer.removeStyle(containerElement, 'display');
      this.renderer.setStyle(el, 'display', 'block');
      this.renderer.addClass(nestedElement, 'ant-spin-nested-loading');
    } else {
      this.renderer.setStyle(containerElement, 'display', 'none');
      this.renderer.removeStyle(el, 'display');
      this.renderer.removeClass(nestedElement, 'ant-spin-nested-loading');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.checkNested();
  }
}
