import {
  Component,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Renderer2,
  SimpleChange
} from '@angular/core';
import { isNotNil } from '../core/util/check';
import { NzRowComponent } from './nz-row.component';
import { NzRowDirective } from './nz-row.directive';

export interface EmbeddedProperty {
  span: number;
  pull: number;
  push: number;
  offset: number;
  order: number;
}

@Component({
  selector           : 'nz-col',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
  `
})
export class NzColComponent implements OnInit, OnChanges {
  _classList: string[] = [];
  _el: HTMLElement;
  _prefixCls = 'ant-col';

  @HostBinding('style.padding-left.px')
  get paddingLeft(): number {
    return this.nzRow && this.nzRow.actualGutter / 2;
  }

  @HostBinding('style.padding-right.px')
  get paddingRight(): number {
    return this.nzRow && this.nzRow.actualGutter / 2;
  }

  @Input() nzSpan: number;
  @Input() nzOrder: number;
  @Input() nzOffset: number;
  @Input() nzPush: number;
  @Input() nzPull: number;
  @Input() nzXs: number | EmbeddedProperty;
  @Input() nzSm: number | EmbeddedProperty;
  @Input() nzMd: number | EmbeddedProperty;
  @Input() nzLg: number | EmbeddedProperty;
  @Input() nzXl: number | EmbeddedProperty;
  @Input() nzXXl: number | EmbeddedProperty;

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    });
    this._classList = [
      isNotNil(this.nzSpan) && `${this._prefixCls}-${this.nzSpan}`,
      isNotNil(this.nzOrder) && `${this._prefixCls}-order-${this.nzOrder}`,
      isNotNil(this.nzOffset) && `${this._prefixCls}-offset-${this.nzOffset}`,
      isNotNil(this.nzPull) && `${this._prefixCls}-pull-${this.nzPull}`,
      isNotNil(this.nzPush) && `${this._prefixCls}-push-${this.nzPush}`,
      ...this.generateClass()
    ];
    this._classList = this._classList.filter((item) => {
      return !!item;
    });
    this._classList.forEach(_className => {
      this._renderer.addClass(this._el, _className);
    });
  }

  generateClass(): string[] {
    const listOfSizeInputName = [ 'nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl' ];
    const listOfClassName: string[] = [];
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('nz', '').toLowerCase();
      if (isNotNil(this[ name ])) {
        if ((typeof(this[ name ]) === 'number') || (typeof (this[ name ]) === 'string')) {
          listOfClassName.push(`${this._prefixCls}-${sizeName}-${this[ name ]}`);
        } else {
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].span) && `${this._prefixCls}-${sizeName}-${this[ name ].span}`);
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].pull) && `${this._prefixCls}-${sizeName}-pull-${this[ name ].pull}`);
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].push) && `${this._prefixCls}-${sizeName}-push-${this[ name ].push}`);
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].offset) && `${this._prefixCls}-${sizeName}-offset-${this[ name ].offset}`);
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].order) && `${this._prefixCls}-${sizeName}-order-${this[ name ].order}`);
        }
      }

    });
    return listOfClassName;
  }

  get nzRow(): NzRowComponent {
    return this.nzRowComponent || this.nzRowDirective;
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }): void {
    this.setClassMap();
  }

  constructor(private _elementRef: ElementRef, @Optional() @Host() public nzRowComponent: NzRowComponent, @Optional() @Host() public nzRowDirective: NzRowDirective, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.setClassMap();
    this.nzRow.updateGutter();
  }
}
