import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  Component,
  ElementRef,
  EventEmitter,
  Host,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzCollapseComponent } from './nz-collapse.component';

@Component({
  selector  : 'nz-collapse-panel',
  template  : `
    <div
      role="tab"
      [attr.aria-expanded]="nzActive"
      class="ant-collapse-header"
      (click)="clickHeader()">
      <i class="arrow" *ngIf="nzShowArrow"></i>
      <ng-container *ngIf="isHeaderString; else headerTemplate">{{ nzHeader }}</ng-container>
      <ng-template #headerTemplate>
        <ng-template [ngTemplateOutlet]="nzHeader"></ng-template>
      </ng-template>
    </div>
    <div
      class="ant-collapse-content"
      [class.ant-collapse-content-active]="nzActive"
      [@collapseState]="nzActive?'active':'inactive'">
      <div class="ant-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations: [
    trigger('collapseState', [
      state('inactive', style({
        opacity: '0',
        height : 0
      })),
      state('active', style({
        opacity: '1',
        height : '*'
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ],
  styles    : [
      `
      :host {
        display: block
      }`
  ],
  host      : {
    '[class.ant-collapse-item]': 'true',
    '[attr.role]'              : '"tablist"'
  }
})

export class NzCollapsePanelComponent implements OnDestroy, OnInit {
  private _disabled = false;
  private _showArrow = true;
  private _active = false;
  private _header: string | TemplateRef<void>;
  isHeaderString: boolean;
  private el: HTMLElement;
  @Output() nzActiveChange = new EventEmitter<boolean>();

  @Input() set nzShowArrow(value: boolean) {
    this._showArrow = toBoolean(value);
  }

  get nzShowArrow(): boolean {
    return this._showArrow;
  }

  @HostBinding('class.ant-collapse-no-arrow')
  get isNoArrow(): boolean {
    return !this.nzShowArrow;
  }

  @Input()
  set nzHeader(value: string | TemplateRef<void>) {
    this.isHeaderString = !(value instanceof TemplateRef);
    this._header = value;
  }

  get nzHeader(): string | TemplateRef<void> {
    return this._header;
  }

  @Input()
  @HostBinding('class.ant-collapse-item-disabled')
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  @HostBinding('class.ant-collapse-item-active')
  set nzActive(value: boolean) {
    this._active = toBoolean(value);
  }

  get nzActive(): boolean {
    return this._active;
  }

  clickHeader(): void {
    if (!this.nzDisabled) {
      this.nzCollapseComponent.click(this);
    }
  }

  constructor(@Host() private nzCollapseComponent: NzCollapseComponent, private elementRef: ElementRef) {
    this.el = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addCollapse(this);
  }

  ngOnDestroy(): void {
    this.nzCollapseComponent.removeCollapse(this);
  }
}
