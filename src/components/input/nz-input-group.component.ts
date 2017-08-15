import {
  Component,
  OnInit,
  ViewEncapsulation,
  Input,
  ElementRef,
  Renderer2,
  HostBinding
} from '@angular/core';

@Component({
  selector     : 'nz-input-group',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzInputGroupComponent implements OnInit {
  _el: HTMLElement;
  _prefixCls = 'ant-input';

  @HostBinding(`class.ant-input-group-lg`)
  get _isLarge(): boolean {
    return this.nzSize === 'lg';
  };

  @HostBinding(`class.ant-input-group-sm`)
  get _isSmall(): boolean {
    return this.nzSize === 'sm';
  };

  @Input() nzSize: string;
  @Input()
  @HostBinding(`class.ant-input-group-compact`)
  nzCompact = false;

  constructor(private _elementRef: ElementRef, private _render: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this._render.addClass(this._el, `${this._prefixCls}-group`);
  }

  ngOnInit() {
  }
}
