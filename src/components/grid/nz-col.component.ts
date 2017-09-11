import {
  Component,
  Input,
  OnInit,
  ElementRef,
  HostBinding,
  OnChanges,
  Renderer2,
  SimpleChange,
  Host,
  Optional
} from '@angular/core';
import { NzRowComponent } from './nz-row.component';

export abstract class EmbeddedProperty {
  span: number;
  pull: number;
  push: number;
  offset: number;
  order: number
}

@Component({
  selector: 'nz-col',
  template: `
    <ng-content></ng-content>
  `,
  styles  : []
})

export class NzColComponent implements OnInit, OnChanges {
  _classList: Array<string> = [];
  _el: HTMLElement;
  _prefixCls = 'ant-col';

  @HostBinding('style.padding-left.px')
  get paddingLeft() {
    return this._nzRow && this._nzRow._gutter / 2;
  }

  @HostBinding('style.padding-right.px')
  get paddingRight() {
    return this._nzRow && this._nzRow._gutter / 2;
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

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    this._classList.forEach(_className => {
      this._renderer.removeClass(this._el, _className);
    });
    this._classList = [
      this.nzSpan && `${this._prefixCls}-${this.nzSpan}`,
      this.nzOrder && `${this._prefixCls}-order-${this.nzOrder}`,
      this.nzOffset && `${this._prefixCls}-offset-${this.nzOffset}`,
      this.nzPull && `${this._prefixCls}-pull-${this.nzPull}`,
      this.nzPush && `${this._prefixCls}-push-${this.nzPush}`,
      ...this.generateClass()
    ];
    this._classList = this._classList.filter((item) => {
      return !!item;
    });
    this._classList.forEach(_className => {
      this._renderer.addClass(this._el, _className);
    })
  }

  generateClass() {
    const listOfSizeInputName = [ 'nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl' ];
    const listOfClassName = [];
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('nz', '').toLowerCase();
      if ((typeof(this[ name ]) === 'number') || (typeof (this[ name ]) === 'string')) {
        listOfClassName.push(this[ name ] && `${this._prefixCls}-${sizeName}-${this[ name ]}`);
      } else {
        listOfClassName.push(this[ name ] && this[ name ][ 'span' ] && `${this._prefixCls}-${sizeName}-${this[ name ][ 'span' ]}`);
        listOfClassName.push(this[ name ] && this[ name ][ 'pull' ] && `${this._prefixCls}-${sizeName}-pull-${this[ name ][ 'pull' ]}`);
        listOfClassName.push(this[ name ] && this[ name ][ 'push' ] && `${this._prefixCls}-${sizeName}-push-${this[ name ][ 'push' ]}`);
        listOfClassName.push(this[ name ] && this[ name ][ 'offset' ] && `${this._prefixCls}-${sizeName}-offset-${this[ name ][ 'offset' ]}`);
        listOfClassName.push(this[ name ] && this[ name ][ 'order' ] && `${this._prefixCls}-${sizeName}-order-${this[ name ][ 'order' ]}`);
      }
    });
    return listOfClassName;
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    this.setClassMap();
  }

  constructor(private _elementRef: ElementRef, @Optional() @Host() public _nzRow: NzRowComponent, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
  }

  ngOnInit(): any {
    this.setClassMap();
  }
}
