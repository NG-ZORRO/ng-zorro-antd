import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { isEmpty, isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-spin',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-spin.component.html'
})
export class NzSpinComponent implements AfterViewInit {
  private _tip: string;
  private _delay = 0;
  el: HTMLElement = this.elementRef.nativeElement;

  baseSpinning$ = new BehaviorSubject(true);
  resultSpinning$: Observable<boolean> = this.baseSpinning$.asObservable().pipe(debounceTime(this.nzDelay));
  @ViewChild('containerElement') containerElement: ElementRef;
  @ViewChild('nestedElement') nestedElement: ElementRef;
  @Input() nzIndicator: TemplateRef<void>;
  @Input() nzSize = 'default';

  @Input()
  set nzDelay(value: number) {
    if (isNotNil(value)) {
      this._delay = value;
      this.resultSpinning$ = this.baseSpinning$.asObservable().pipe(debounceTime(this.nzDelay));
    }
  }

  get nzDelay(): number {
    return this._delay;
  }

  @Input()
  set nzTip(value: string) {
    this._tip = value;
  }

  get nzTip(): string {
    return this._tip;
  }

  @Input()
  set nzSpinning(value: boolean) {
    this.baseSpinning$.next(toBoolean(value));
  }

  checkNested(): void {
    const containerElement = this.containerElement.nativeElement;
    const nestedElement = this.nestedElement.nativeElement;
    /** no way to detect empty https://github.com/angular/angular/issues/12530 **/
    /** https://github.com/angular/material2/issues/11280 **/
    if (!isEmpty(containerElement)) {
      this.renderer.removeStyle(containerElement, 'display');
      this.renderer.setStyle(this.el, 'display', 'block');
      this.renderer.addClass(nestedElement, 'ant-spin-nested-loading');
    } else {
      this.renderer.setStyle(containerElement, 'display', 'none');
      this.renderer.removeStyle(this.el, 'display');
      this.renderer.removeClass(nestedElement, 'ant-spin-nested-loading');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private zone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.checkNested();
  }
}
