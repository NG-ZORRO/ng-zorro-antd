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

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
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
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  templateUrl        : './nz-col.component.html'
})
export class NzColComponent implements OnInit, OnChanges {
  private el: HTMLElement = this.elementRef.nativeElement;
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
    const classMap = {
      [ `${this.prefixCls}-${this.nzSpan}` ]         : isNotNil(this.nzSpan),
      [ `${this.prefixCls}-order-${this.nzOrder}` ]  : isNotNil(this.nzOrder),
      [ `${this.prefixCls}-offset-${this.nzOffset}` ]: isNotNil(this.nzOffset),
      [ `${this.prefixCls}-pull-${this.nzPull}` ]    : isNotNil(this.nzPull),
      [ `${this.prefixCls}-push-${this.nzPush}` ]    : isNotNil(this.nzPush),
      ...this.generateClass()
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  generateClass(): object {
    const listOfSizeInputName = [ 'nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl' ];
    const listClassMap = {};
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('nz', '').toLowerCase();
      if (isNotNil(this[ name ])) {
        if ((typeof(this[ name ]) === 'number') || (typeof (this[ name ]) === 'string')) {
          listClassMap[ `${this.prefixCls}-${sizeName}-${this[ name ]}` ] = true;
        } else {
          listClassMap[ `${this.prefixCls}-${sizeName}-${this[ name ].span}` ] = this[ name ] && isNotNil(this[ name ].span);
          listClassMap[ `${this.prefixCls}-${sizeName}-pull-${this[ name ].pull}` ] = this[ name ] && isNotNil(this[ name ].pull);
          listClassMap[ `${this.prefixCls}-${sizeName}-push-${this[ name ].push}` ] = this[ name ] && isNotNil(this[ name ].push);
          listClassMap[ `${this.prefixCls}-${sizeName}-offset-${this[ name ].offset}` ] = this[ name ] && isNotNil(this[ name ].offset);
          listClassMap[ `${this.prefixCls}-${sizeName}-order-${this[ name ].order}` ] = this[ name ] && isNotNil(this[ name ].order);
        }
      }

    });
    return listClassMap;
  }

  get nzRow(): NzRowComponent {
    return this.nzRowComponent || this.nzRowDirective;
  }

  ngOnChanges(changes: { [ propertyName: string ]: SimpleChange }): void {
    this.setClassMap();
  }

  constructor(private nzUpdateHostClassService: NzUpdateHostClassService, private elementRef: ElementRef, @Optional() @Host() public nzRowComponent: NzRowComponent, @Optional() @Host() public nzRowDirective: NzRowDirective, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.setClassMap();
  }
}
