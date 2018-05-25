import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  TemplateRef
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzCardTabComponent } from './nz-card-tab.component';

@Component({
  selector           : 'nz-card',
  preserveWhitespaces: false,
  templateUrl        : './nz-card.component.html',
  styles             : [ `
    :host {
      display: block;
      position: relative;
    }
  ` ],
  host               : {
    '[class.ant-card]'        : 'true',
    '[class.ant-card-loading]': 'nzLoading'
  }
})
export class NzCardComponent {
  private _bordered = true;
  private _loading = false;
  private _hoverable = false;
  private _title: string | TemplateRef<void>;
  private _extra: string | TemplateRef<void>;
  isTitleString: boolean;
  isExtraString: boolean;
  @ContentChild(NzCardTabComponent) tab: NzCardTabComponent;
  @Input() nzBodyStyle: { [ key: string ]: string };
  @Input() nzCover: TemplateRef<void>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzType: string;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  @Input()
  set nzExtra(value: string | TemplateRef<void>) {
    this.isExtraString = !(value instanceof TemplateRef);
    this._extra = value;
  }

  get nzExtra(): string | TemplateRef<void> {
    return this._extra;
  }

  @HostBinding('class.ant-card-type-inner')
  get isInner(): boolean {
    return this.nzType === 'inner';
  }

  @HostBinding('class.ant-card-contain-tabs')
  get isTabs(): boolean {
    return !!this.tab;
  }

  @Input()
  @HostBinding('class.ant-card-bordered')
  set nzBordered(value: boolean) {
    this._bordered = toBoolean(value);
  }

  get nzBordered(): boolean {
    return this._bordered;
  }

  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
  }

  get nzLoading(): boolean {
    return this._loading;
  }

  @Input()
  @HostBinding('class.ant-card-hoverable')
  set nzHoverable(value: boolean) {
    this._hoverable = toBoolean(value);
  }

  get nzHoverable(): boolean {
    return this._hoverable;
  }
}
