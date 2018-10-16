import { ChangeDetectionStrategy, Component, ContentChild, HostBinding, Input, TemplateRef } from '@angular/core';
import { InputBoolean } from '../core/util/convert';
import { NzCardTabComponent } from './nz-card-tab.component';

@Component({
  selector           : 'nz-card',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-card.component.html',
  styles             : [ `
    :host {
      display: block;
    }
  ` ],
  host               : {
    '[class.ant-card]'        : 'true',
    '[class.ant-card-loading]': 'nzLoading'
  }
})
export class NzCardComponent {
  @Input() @InputBoolean() @HostBinding('class.ant-card-bordered') nzBordered = true;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() @HostBinding('class.ant-card-hoverable') nzHoverable = false;
  @Input() nzBodyStyle: { [ key: string ]: string };
  @Input() nzCover: TemplateRef<void>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzType: string;
  @ContentChild(NzCardTabComponent) tab: NzCardTabComponent;
  isTitleString: boolean;
  isExtraString: boolean;

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

  private _title: string | TemplateRef<void>;
  private _extra: string | TemplateRef<void>;
}
