import {
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Input,
  TemplateRef
} from '@angular/core';
import { toBoolean } from '../core/util/convert';
import { trimWhiteSpace } from '../core/util/trim-whitespace';

@Component({
  selector           : 'nz-input-group',
  preserveWhitespaces: false,
  template           : `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn">
      <span class="ant-input-group-addon" *ngIf="_addOnContentBefore">
        <ng-template [ngTemplateOutlet]="_addOnContentBefore"></ng-template>
      </span>
      <ng-template *ngTemplateOutlet="contentTemplate"></ng-template>
      <span class="ant-input-group-addon" *ngIf="_addOnContentAfter">
        <ng-template [ngTemplateOutlet]="_addOnContentAfter"></ng-template>
      </span>
    </span>
    <ng-template [ngIf]="isAffix">
      <span class="ant-input-prefix" *ngIf="_prefixContent">
        <ng-template [ngTemplateOutlet]="_prefixContent"></ng-template>
      </span>
      <ng-template *ngTemplateOutlet="contentTemplate"></ng-template>
      <span class="ant-input-suffix" *ngIf="_suffixContent">
        <ng-template [ngTemplateOutlet]="_suffixContent"></ng-template>
      </span>
    </ng-template>
    <ng-template [ngIf]="isGroup" *ngTemplateOutlet="contentTemplate"></ng-template>

    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `
})

export class NzInputGroupComponent implements AfterViewInit {
  private _compact = false;
  private _search = false;
  @Input() nzSize: string;

  @Input()
  @HostBinding(`class.ant-input-group-compact`)
  set nzCompact(value: boolean) {
    this._compact = toBoolean(value);
  }

  get nzCompact(): boolean {
    return this._compact;
  }

  @Input()
  @HostBinding(`class.ant-input-search-enter-button`)
  @HostBinding(`class.ant-input-search`)
  set nzSearch(value: boolean) {
    this._search = toBoolean(value);
  }

  get nzSearch(): boolean {
    return this._search;
  }

  get isLarge(): boolean {
    return this.nzSize === 'large';
  }

  get isSmall(): boolean {
    return this.nzSize === 'small';
  }

  @ContentChild('addOnBefore') _addOnContentBefore: TemplateRef<void>;
  @ContentChild('addOnAfter') _addOnContentAfter: TemplateRef<void>;
  @ContentChild('prefix') _prefixContent: TemplateRef<void>;
  @ContentChild('suffix') _suffixContent: TemplateRef<void>;

  @HostBinding('class.ant-input-affix-wrapper')
  get isAffix(): boolean {
    return !!(this._suffixContent || this._prefixContent);
  }

  @HostBinding('class.ant-input-group-wrapper')
  get isAddOn(): boolean {
    return !!(this._addOnContentBefore || this._addOnContentAfter);
  }

  @HostBinding('class.ant-input-group')
  get isGroup(): boolean {
    return (!this.isAffix) && (!this.isAddOn);
  }

  @HostBinding(`class.ant-input-group-lg`)
  get isLargeGroup(): boolean {
    return this.isGroup && this.isLarge;
  }

  @HostBinding(`class.ant-input-group-wrapper-lg`)
  get isLargeGroupWrapper(): boolean {
    return this.isGroup && this.isLarge;
  }

  @HostBinding(`class.ant-input-affix-lg`)
  get isLargeAffix(): boolean {
    return this.isAffix && this.isLarge;
  }

  @HostBinding(`class.ant-input-search-lg`)
  get isLargeSearch(): boolean {
    return this.nzSearch && this.isLarge;
  }

  @HostBinding(`class.ant-input-group-sm`)
  get isSmallGroup(): boolean {
    return this.isGroup && this.isSmall;
  }

  @HostBinding(`class.ant-input-affix-sm`)
  get isSmallAffix(): boolean {
    return this.isAffix && this.isSmall;
  }

  @HostBinding(`class.ant-input-group-wrapper-sm`)
  get isSmallGroupWrapper(): boolean {
    return this.isGroup && this.isSmall;
  }

  @HostBinding(`class.ant-input-search-sm`)
  get isSmallSearch(): boolean {
    return this.nzSearch && this.isSmall;
  }

  constructor(private el: ElementRef) {

  }

  ngAfterViewInit(): void {
    /** trim text node between button */
    trimWhiteSpace(this.el.nativeElement);
  }
}
