import {
  Component,
  ViewEncapsulation,
  Input,
  ElementRef,
  AfterContentInit,
  HostBinding,
  ViewChild,
  Renderer2
} from '@angular/core';

@Component({
  selector     : 'nz-spin',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div>
      <div class="ant-spin" [ngClass]="{'ant-spin-spinning':nzSpinning,'ant-spin-lg':_size=='lg','ant-spin-sm':_size=='sm','ant-spin-show-text':_tip}">
        <span class="ant-spin-dot"><i></i><i></i><i></i><i></i></span>
        <div class="ant-spin-text">{{_tip}}</div>
      </div>
    </div>
    <div class="ant-spin-container" [class.ant-spin-blur]="nzSpinning" #ref [hidden]="ref.children.length == 0"><ng-content></ng-content></div>

  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzSpinComponent implements AfterContentInit {
  @Input() nzSpinning = true;
  _tip: string;

  @Input()
  get nzTip() {
    return this._tip;
  }

  set nzTip(value) {
    this._tip = value || '加载中...';
  }

  @ViewChild('ref')
  _ref;

  @HostBinding('class.ant-spin-nested-loading')
  private get isNested() {
    return this.nzSpinning && (this._ref.nativeElement.childNodes.length !== 0);
  }

  _el: HTMLElement;
  _size: string;

  @Input()
  get nzSize() {
    return this._size;
  }

  set nzSize(value) {
    this._size = { large: 'lg', small: 'sm' }[ value ];
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngAfterContentInit() {
    if (this._ref.nativeElement.children.length !== 0) {
      this._renderer.setStyle(this._el, 'display', 'block');
    }
  }
}
