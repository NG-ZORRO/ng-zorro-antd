/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewChildren,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonType } from 'ng-zorro-antd/button';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgStyleInterface, NzSafeAny, NzTSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipBaseDirective, NzToolTipComponent, NzTooltipTrigger, PropertyMapping } from 'ng-zorro-antd/tooltip';

export type NzAutoFocusType = null | 'ok' | 'cancel';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'popconfirm';

@Directive({
  selector: '[nz-popconfirm]',
  exportAs: 'nzPopconfirm',
  host: {
    '[class.ant-popover-open]': 'visible'
  }
})
export class NzPopconfirmDirective extends NzTooltipBaseDirective {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzCondition: BooleanInput;
  static ngAcceptInputType_nzPopconfirmShowArrow: BooleanInput;
  static ngAcceptInputType_nzPopconfirmArrowPointAtCenter: BooleanInput;

  @Input('nzPopconfirmArrowPointAtCenter') @InputBoolean() arrowPointAtCenter?: boolean;
  @Input('nzPopconfirmTitle') title?: NzTSType;
  @Input('nz-popconfirm') directiveTitle?: NzTSType | null;
  @Input('nzPopconfirmTrigger') trigger?: NzTooltipTrigger = 'click';
  @Input('nzPopconfirmPlacement') placement?: string | string[] = 'top';
  @Input('nzPopconfirmOrigin') origin?: ElementRef<HTMLElement>;
  @Input('nzPopconfirmMouseEnterDelay') mouseEnterDelay?: number;
  @Input('nzPopconfirmMouseLeaveDelay') mouseLeaveDelay?: number;
  @Input('nzPopconfirmOverlayClassName') overlayClassName?: string;
  @Input('nzPopconfirmOverlayStyle') overlayStyle?: NgStyleInterface;
  @Input('nzPopconfirmVisible') visible?: boolean;
  @Input() nzOkText?: string;
  @Input() nzOkType?: string;
  @Input() nzOkDanger?: boolean;
  @Input() nzCancelText?: string;
  @Input() nzIcon?: string | TemplateRef<void>;
  @Input() @InputBoolean() nzCondition: boolean = false;
  @Input() @InputBoolean() nzPopconfirmShowArrow: boolean = true;
  @Input() @WithConfig() nzPopconfirmBackdrop?: boolean = false;
  @Input() @WithConfig() nzAutofocus: NzAutoFocusType = null;

  // eslint-disable-next-line @angular-eslint/no-output-rename
  @Output('nzPopconfirmVisibleChange') readonly visibleChange = new EventEmitter<boolean>();
  @Output() readonly nzOnCancel = new EventEmitter<void>();
  @Output() readonly nzOnConfirm = new EventEmitter<void>();

  protected readonly componentFactory: ComponentFactory<NzPopconfirmComponent> =
    this.resolver.resolveComponentFactory(NzPopconfirmComponent);

  protected getProxyPropertyMap(): PropertyMapping {
    return {
      nzOkText: ['nzOkText', () => this.nzOkText],
      nzOkType: ['nzOkType', () => this.nzOkType],
      nzOkDanger: ['nzOkDanger', () => this.nzOkDanger],
      nzCancelText: ['nzCancelText', () => this.nzCancelText],
      nzCondition: ['nzCondition', () => this.nzCondition],
      nzIcon: ['nzIcon', () => this.nzIcon],
      nzPopconfirmShowArrow: ['nzPopconfirmShowArrow', () => this.nzPopconfirmShowArrow],
      nzPopconfirmBackdrop: ['nzBackdrop', () => this.nzPopconfirmBackdrop],
      nzAutoFocus: ['nzAutoFocus', () => this.nzAutofocus],
      ...super.getProxyPropertyMap()
    };
  }

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() noAnimation?: NzNoAnimationDirective,
    nzConfigService?: NzConfigService
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation, nzConfigService);
  }

  /**
   * @override
   */
  protected createComponent(): void {
    super.createComponent();

    (this.component as NzPopconfirmComponent).nzOnCancel.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.nzOnCancel.emit();
    });
    (this.component as NzPopconfirmComponent).nzOnConfirm.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.nzOnConfirm.emit();
    });
  }
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-popconfirm',
  exportAs: 'nzPopconfirmComponent',
  preserveWhitespaces: false,
  animations: [zoomBigMotion],
  template: `
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      nzConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="nzBackdrop"
      [cdkConnectedOverlayOrigin]="origin"
      (overlayOutsideClick)="onClickOutside($event)"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
    >
      <div
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="nzAutoFocus !== null"
        class="ant-popover"
        [ngClass]="_classMap"
        [class.ant-popover-rtl]="dir === 'rtl'"
        [ngStyle]="nzOverlayStyle"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          <div class="ant-popover-arrow" *ngIf="nzPopconfirmShowArrow"></div>
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message">
                  <ng-container *nzStringTemplateOutlet="nzTitle">
                    <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                      <i nz-icon [nzType]="icon || 'exclamation-circle'" nzTheme="fill"></i>
                    </ng-container>
                    <div class="ant-popover-message-title">{{ nzTitle }}</div>
                  </ng-container>
                </div>
                <div class="ant-popover-buttons">
                  <button
                    nz-button
                    #cancelBtn
                    [nzSize]="'small'"
                    (click)="onCancel()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'cancel' || null"
                  >
                    <ng-container *ngIf="nzCancelText">{{ nzCancelText }}</ng-container>
                    <ng-container *ngIf="!nzCancelText">{{ 'Modal.cancelText' | nzI18n }}</ng-container>
                  </button>
                  <button
                    nz-button
                    #okBtn
                    [nzSize]="'small'"
                    [nzType]="nzOkType !== 'danger' ? nzOkType : 'primary'"
                    [nzDanger]="nzOkDanger || nzOkType === 'danger'"
                    (click)="onConfirm()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'ok' || null"
                  >
                    <ng-container *ngIf="nzOkText">{{ nzOkText }}</ng-container>
                    <ng-container *ngIf="!nzOkText">{{ 'Modal.okText' | nzI18n }}</ng-container>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `
})
export class NzPopconfirmComponent extends NzToolTipComponent implements OnDestroy {
  @ViewChildren('okBtn', { read: ElementRef }) okBtn!: QueryList<ElementRef>;
  @ViewChildren('cancelBtn', { read: ElementRef }) cancelBtn!: QueryList<ElementRef>;

  nzCancelText?: string;
  nzCondition = false;
  nzPopconfirmShowArrow = true;
  nzIcon?: string | TemplateRef<void>;
  nzOkText?: string;
  nzOkType: NzButtonType | 'danger' = 'primary';
  nzOkDanger: boolean = false;
  nzAutoFocus: NzAutoFocusType = null;

  readonly nzOnCancel = new Subject<void>();
  readonly nzOnConfirm = new Subject<void>();

  protected _trigger: NzTooltipTrigger = 'click';
  private elementFocusedBeforeModalWasOpened: HTMLElement | null = null;
  private document: Document;

  _prefix = 'ant-popover';

  constructor(
    cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() directionality: Directionality,
    @Optional() @Inject(DOCUMENT) document: NzSafeAny,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
    this.document = document;
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.nzOnCancel.complete();
    this.nzOnConfirm.complete();
  }

  /**
   * @override
   */
  show(): void {
    if (!this.nzCondition) {
      this.capturePreviouslyFocusedElement();
      super.show();
    } else {
      this.onConfirm();
    }
  }

  hide(): void {
    super.hide();
    this.restoreFocus();
  }

  onCancel(): void {
    this.nzOnCancel.next();
    super.hide();
  }

  onConfirm(): void {
    this.nzOnConfirm.next();
    super.hide();
  }

  private capturePreviouslyFocusedElement(): void {
    if (this.document) {
      this.elementFocusedBeforeModalWasOpened = this.document.activeElement as HTMLElement;
    }
  }

  private restoreFocus(): void {
    const toFocus = this.elementFocusedBeforeModalWasOpened as HTMLElement;

    // We need the extra check, because IE can set the `activeElement` to null in some cases.
    if (toFocus && typeof toFocus.focus === 'function') {
      const activeElement = this.document.activeElement as Element;
      const element = this.elementRef.nativeElement;

      if (
        !activeElement ||
        activeElement === this.document.body ||
        activeElement === element ||
        element.contains(activeElement)
      ) {
        toFocus.focus();
      }
    }
  }
}
