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
  private classList: string[] = [];
  private el: HTMLElement;
  private prefixCls = 'ant-col';

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
    this.classList.forEach(_className => {
      this.renderer.removeClass(this.el, _className);
    });
    this.classList = [
      isNotNil(this.nzSpan) && `${this.prefixCls}-${this.nzSpan}`,
      isNotNil(this.nzOrder) && `${this.prefixCls}-order-${this.nzOrder}`,
      isNotNil(this.nzOffset) && `${this.prefixCls}-offset-${this.nzOffset}`,
      isNotNil(this.nzPull) && `${this.prefixCls}-pull-${this.nzPull}`,
      isNotNil(this.nzPush) && `${this.prefixCls}-push-${this.nzPush}`,
      ...this.generateClass()
    ];
    this.classList = this.classList.filter((item) => {
      return !!item;
    });
    this.classList.forEach(_className => {
      this.renderer.addClass(this.el, _className);
    });
  }

  generateClass(): string[] {
    const listOfSizeInputName = [ 'nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl' ];
    const listOfClassName: string[] = [];
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('nz', '').toLowerCase();
      if (isNotNil(this[ name ])) {
        if ((typeof(this[ name ]) === 'number') || (typeof (this[ name ]) === 'string')) {
          listOfClassName.push(`${this.prefixCls}-${sizeName}-${this[ name ]}`);
        } else {
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].span) && `${this.prefixCls}-${sizeName}-${this[ name ].span}`);
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].pull) && `${this.prefixCls}-${sizeName}-pull-${this[ name ].pull}`);
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].push) && `${this.prefixCls}-${sizeName}-push-${this[ name ].push}`);
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].offset) && `${this.prefixCls}-${sizeName}-offset-${this[ name ].offset}`);
          listOfClassName.push(this[ name ] && isNotNil(this[ name ].order) && `${this.prefixCls}-${sizeName}-order-${this[ name ].order}`);
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

  constructor(private elementRef: ElementRef, @Optional() @Host() public nzRowComponent: NzRowComponent, @Optional() @Host() public nzRowDirective: NzRowDirective, private renderer: Renderer2) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.setClassMap();
    this.nzRow.updateGutter();
  }
}
