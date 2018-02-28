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
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { first } from 'rxjs/operators/first';

import { isEmpty, isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-spin',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  template           : `
    <ng-template #defaultIndicatorTemplate>
      <span
        class="ant-spin-dot"
        [class.ant-spin-dot-spin]="resultSpinning$|async">
        <i></i><i></i><i></i><i></i>
      </span>
    </ng-template>
    <div [class.ant-spin-nested-loading]="isNested">
      <div>
        <div
          class="ant-spin"
          [class.ant-spin-spinning]="resultSpinning$|async"
          [class.ant-spin-lg]="nzSize=='large'"
          [class.ant-spin-sm]="nzSize=='small'"
          [class.ant-spin-show-text]="nzTip">
          <ng-template [ngTemplateOutlet]="nzIndicator||defaultIndicatorTemplate"></ng-template>
          <div class="ant-spin-text" *ngIf="nzTip">{{ nzTip }}</div>
        </div>
      </div>
      <div
        #containerElement
        class="ant-spin-container"
        [class.ant-spin-blur]="resultSpinning$|async"
        [hidden]="!isNested"
        (cdkObserveContent)="checkNested()">
        <ng-content></ng-content>
      </div>
    </div>

  `
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
    this.zone.onStable.pipe(first()).subscribe(() => {
      this.checkNested();
    });
  }
}
