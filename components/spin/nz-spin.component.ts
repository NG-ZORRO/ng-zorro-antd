import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  Input,
  NgZone,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { first } from 'rxjs/operators/first';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-spin',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  template           : `
    <div [class.ant-spin-nested-loading]="_nested">
      <div>
        <div class="ant-spin" [ngClass]="{'ant-spin-spinning':spinning$|async,'ant-spin-lg':nzSize=='lg','ant-spin-sm':nzSize=='sm','ant-spin-show-text':nzTip}">
          <span class="ant-spin-dot" *ngIf="!indicator"><i></i><i></i><i></i><i></i></span>
          <ng-template [ngTemplateOutlet]="indicator" [ngIf]="indicator"></ng-template>
          <div class="ant-spin-text" *ngIf="nzTip">{{ nzTip }}</div>
        </div>
      </div>
      <div class="ant-spin-container" [class.ant-spin-blur]="spinning$|async" #ref [hidden]="!_nested" (cdkObserveContent)="checkNested()">
        <ng-content></ng-content>
      </div>
    </div>

  `
})
export class NzSpinComponent implements AfterViewInit {
  _spinning$ = new BehaviorSubject(true);
  spinning$ = this._spinning$.asObservable().pipe(debounceTime(this.nzDelay));
  _tip: string;
  _el: HTMLElement;
  _size: string;
  _nested = false;
  _delay = 0;
  @ViewChild('ref') _ref: ElementRef;
  @ContentChild('indicator') indicator: TemplateRef<void>;


  @Input() set nzDelay(value: number) {
    this._delay = value;
    this.spinning$ = this._spinning$.asObservable().pipe(debounceTime(this.nzDelay));
  }

  get nzDelay(): number {
    return this._delay;
  }

  @Input()
  set nzTip(value: string) {
    this._tip = value || 'Loading...';
  }

  get nzTip(): string {
    return this._tip;
  }

  @Input()
  set nzSpinning(value: boolean) {
    this._spinning$.next(toBoolean(value));
  }

  // TODO: cannot be literal type since the getter & setter have different value, why that?
  @Input()
  set nzSize(value: string) {
    this._size = { large: 'lg', small: 'sm' }[ value ];
  }

  get nzSize(): string {
    return this._size;
  }

  isEmpty(element: HTMLElement): boolean {
    const nodes = element.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes.item(i);
      if (node.nodeType !== 8 && nodes.item(i).textContent.trim().length !== 0) {
        return false;
      }
    }
    return true;
  }

  checkNested(): void {
    /** no way to detect empty https://github.com/angular/angular/issues/12530 **/
    if (!this.isEmpty(this._ref.nativeElement)) {
      this._nested = true;
      this._renderer.setStyle(this._el, 'display', 'block');
    } else {
      this._nested = false;
      this._renderer.removeStyle(this._el, 'display');
    }
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2, private zone: NgZone) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterViewInit(): void {
    this.zone.onStable.pipe(first()).subscribe(() => {
      this.checkNested();
    });
  }
}
