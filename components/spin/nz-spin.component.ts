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
  el: HTMLElement;
  isNested = false;
  baseSpinning$ = new BehaviorSubject(true);
  resultSpinning$: Observable<boolean> = this.baseSpinning$.asObservable().pipe(debounceTime(this.nzDelay));
  @ViewChild('containerElement') containerElement: ElementRef;
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
    /** no way to detect empty https://github.com/angular/angular/issues/12530 **/
    if (!isEmpty(this.containerElement.nativeElement)) {
      this.isNested = true;
      this.renderer.setStyle(this.el, 'display', 'block');
    } else {
      this.isNested = false;
      this.renderer.removeStyle(this.el, 'display');
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private zone: NgZone) {
    this.el = this.elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.checkNested();
  }
}
