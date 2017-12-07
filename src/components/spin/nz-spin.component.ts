import {
  AfterContentInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-spin',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div>
      <div class="ant-spin" [ngClass]="{'ant-spin-spinning':nzSpinning,'ant-spin-lg':_size=='lg','ant-spin-sm':_size=='sm','ant-spin-show-text':_tip}">
        <span class="ant-spin-dot"><i></i><i></i><i></i><i></i></span>
        <div class="ant-spin-text">{{ _tip }}</div>
      </div>
    </div>
    <div class="ant-spin-container" [class.ant-spin-blur]="nzSpinning" #ref [hidden]="ref.children.length == 0"><ng-content></ng-content></div>

  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzSpinComponent implements AfterContentInit {
  private _spinning = true;
  _tip: string;

  @Input()
  set nzTip(value: string) {
    this._tip = value || '加载中...';
  }

  get nzTip(): string {
    return this._tip;
  }

  @Input()
  set nzSpinning(value: boolean) {
    this._spinning = toBoolean(value);
  }

  get nzSpinning(): boolean {
    return this._spinning;
  }

  @ViewChild('ref')
  _ref: ElementRef;

  @HostBinding('class.ant-spin-nested-loading')
  get isNested(): boolean {
    return this.nzSpinning && (this._ref.nativeElement.childNodes.length !== 0);
  }

  _el: HTMLElement;
  _size: string;

  // TODO: cannot be literal type since the getter & setter have different value, why that?
  @Input()
  set nzSize(value: string) {
    this._size = { large: 'lg', small: 'sm' }[ value ];
  }

  get nzSize(): string {
    return this._size;
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    if (this._ref.nativeElement.children.length !== 0) {
      this._renderer.setStyle(this._el, 'display', 'block');
    }
  }
}
