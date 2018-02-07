import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';

import { toBoolean } from '../core/util/convert';

@Component({
    selector: 'nz-divider',
    template: `
    <span *ngIf="isText" class="ant-divider-inner-text">
      <ng-container *ngIf="_text; else _textTpl">{{ _text }}</ng-container>
    </span>
    `,
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDividerComponent implements OnChanges, OnInit {

  // region fields

  isText = false;
  _text = '';
  _textTpl: TemplateRef<void>;
  @Input()
  set nzText(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this._textTpl = value;
    } else {
      this._text = value;
    }
    this.isText = !!value;
  }

  @Input() nzType: 'horizontal' | 'vertical' = 'horizontal';

  private _dashed = false;
  @Input()
  set nzDashed(value: boolean) {
    this._dashed = toBoolean(value);
  }

  get nzDashed(): boolean {
    return this._dashed;
  }

  // endregion
  _classMap: string[] = [];
  private setClass(): void {
    this._classMap.forEach(cls => this.renderer.removeClass(this.el.nativeElement, cls));

    this._classMap = [ 'ant-divider', `ant-divider-${this.nzType}` ];

    if (this.isText) {
      this._classMap.push(`ant-divider-with-text`);
    }

    if (this._dashed) {
      this._classMap.push(`ant-divider-dashed`);
    }

    this._classMap.forEach(cls => this.renderer.addClass(this.el.nativeElement, cls));
    this.cd.detectChanges();
  }

  constructor(private el: ElementRef, private renderer: Renderer2, private cd: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setClass();
  }

  ngOnInit(): void {
    this.setClass();
  }

}
