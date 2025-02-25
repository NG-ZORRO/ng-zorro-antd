/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { finalize, first, takeUntil } from 'rxjs/operators';

import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { wrapIntoObservable } from 'ng-zorro-antd/core/util';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipComponent, NzTooltipBaseDirective, NzTooltipTrigger, PropertyMapping } from 'ng-zorro-antd/tooltip';

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

  /* eslint-disable @angular-eslint/no-input-rename, @angular-eslint/no-output-rename */
  @Input({ alias: 'nzPopconfirmArrowPointAtCenter', transform: booleanAttribute })
  override arrowPointAtCenter?: boolean;
  @Input('nzPopconfirmTitle') override title?: NzTSType;
  @Input('nzPopconfirmTitleContext') titleContext?: object | null = null;
  @Input('nz-popconfirm') override directiveTitle?: NzTSType | null;
  @Input('nzPopconfirmTrigger') override trigger?: NzTooltipTrigger = 'click';
  @Input('nzPopconfirmPlacement') override placement?: string | string[] = 'top';
  @Input('nzPopconfirmOrigin') override origin?: ElementRef<HTMLElement>;
  @Input('nzPopconfirmMouseEnterDelay') override mouseEnterDelay?: number;
  @Input('nzPopconfirmMouseLeaveDelay') override mouseLeaveDelay?: number;
  @Input('nzPopconfirmOverlayClassName') override overlayClassName?: string;
  @Input('nzPopconfirmOverlayStyle') override overlayStyle?: NgStyleInterface;
  @Input('nzPopconfirmVisible') override visible?: boolean;
  @Input() nzOkText?: string;
  @Input() nzOkType?: string;
  @Input({ transform: booleanAttribute }) nzOkDisabled?: boolean;
  @Input({ transform: booleanAttribute }) nzOkDanger?: boolean;
  @Input() nzCancelText?: string;
  @Input() nzBeforeConfirm?: () => Observable<boolean> | Promise<boolean> | boolean;
  @Input() nzIcon?: string | TemplateRef<void>;
  @Input({ transform: booleanAttribute }) nzCondition: boolean = false;
  @Input({ transform: booleanAttribute }) nzPopconfirmShowArrow: boolean = true;
  @Input() @WithConfig() nzPopconfirmBackdrop?: boolean = false;
  @Input() @WithConfig() nzAutofocus: NzAutoFocusType = null;

  override directiveContent?: NzTSType | null = null;
  override content?: NzTSType | null = null;
  override overlayClickable?: boolean;

  @Output('nzPopconfirmVisibleChange') override readonly visibleChange = new EventEmitter<boolean>();
  @Output() readonly nzOnCancel = new EventEmitter<void>();
  @Output() readonly nzOnConfirm = new EventEmitter<void>();

  protected override getProxyPropertyMap(): PropertyMapping {
    return {
      nzOkText: ['nzOkText', () => this.nzOkText],
      nzOkType: ['nzOkType', () => this.nzOkType],
      nzOkDanger: ['nzOkDanger', () => this.nzOkDanger],
      nzOkDisabled: ['nzOkDisabled', () => this.nzOkDisabled],
      nzCancelText: ['nzCancelText', () => this.nzCancelText],
      nzBeforeConfirm: ['nzBeforeConfirm', () => this.nzBeforeConfirm],
      nzCondition: ['nzCondition', () => this.nzCondition],
      nzIcon: ['nzIcon', () => this.nzIcon],
      nzPopconfirmShowArrow: ['nzPopconfirmShowArrow', () => this.nzPopconfirmShowArrow],
      nzPopconfirmBackdrop: ['nzBackdrop', () => this.nzPopconfirmBackdrop],
      nzPopconfirmContext: ['nzTitleContext', () => this.titleContext],
      nzAutoFocus: ['nzAutoFocus', () => this.nzAutofocus],
      ...super.getProxyPropertyMap()
    };
  }

  constructor() {
    super(NzPopconfirmComponent);
  }

  /**
   * @override
   */
  protected override createComponent(): void {
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
      [cdkConnectedOverlayPush]="cdkConnectedOverlayPush"
      [nzArrowPointAtCenter]="nzArrowPointAtCenter"
    >
      <div
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="nzAutoFocus !== null"
        class="ant-popover"
        [class]="_classMap"
        [class.ant-popover-rtl]="dir === 'rtl'"
        [style]="nzOverlayStyle"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        [@zoomBigMotion]="'active'"
      >
        <div class="ant-popover-content">
          @if (nzPopconfirmShowArrow) {
            <div class="ant-popover-arrow">
              <span class="ant-popover-arrow-content"></span>
            </div>
          }
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message">
                  <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">
                    <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                      <span class="ant-popover-message-icon">
                        <nz-icon [nzType]="icon || 'exclamation-circle'" nzTheme="fill" />
                      </span>
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
                    @if (nzCancelText) {
                      {{ nzCancelText }}
                    } @else {
                      {{ 'Modal.cancelText' | nzI18n }}
                    }
                  </button>
                  <button
                    nz-button
                    #okBtn
                    [nzSize]="'small'"
                    [nzType]="nzOkType !== 'danger' ? nzOkType : 'primary'"
                    [nzDanger]="nzOkDanger || nzOkType === 'danger'"
                    [nzLoading]="confirmLoading"
                    [disabled]="nzOkDisabled"
                    (click)="onConfirm()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'ok' || null"
                  >
                    @if (nzOkText) {
                      {{ nzOkText }}
                    } @else {
                      {{ 'Modal.okText' | nzI18n }}
                    }
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>
  `,
  imports: [
    OverlayModule,
    NzOverlayModule,
    A11yModule,
    NzNoAnimationDirective,
    NzOutletModule,
    NzIconModule,
    NzButtonModule,
    NzI18nModule
  ]
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
  nzOkDisabled: boolean = false;
  nzAutoFocus: NzAutoFocusType = null;
  nzBeforeConfirm: (() => Observable<boolean> | Promise<boolean> | boolean) | null = null;

  readonly nzOnCancel = new Subject<void>();
  readonly nzOnConfirm = new Subject<void>();

  protected override _trigger: NzTooltipTrigger = 'click';
  private elementFocusedBeforeModalWasOpened: HTMLElement | null = null;
  private document: Document = inject(DOCUMENT);

  override _prefix = 'ant-popover';

  confirmLoading = false;

  constructor(private elementRef: ElementRef) {
    super();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.nzOnCancel.complete();
    this.nzOnConfirm.complete();
  }

  /**
   * @override
   */
  override show(): void {
    if (!this.nzCondition) {
      this.capturePreviouslyFocusedElement();
      super.show();
    } else {
      this.onConfirm();
    }
  }

  override hide(): void {
    super.hide();
    this.restoreFocus();
  }

  handleConfirm(): void {
    this.nzOnConfirm.next();
    super.hide();
  }

  onCancel(): void {
    this.nzOnCancel.next();
    super.hide();
  }

  onConfirm(): void {
    if (this.nzBeforeConfirm) {
      const observable = wrapIntoObservable(this.nzBeforeConfirm()).pipe(first());
      this.confirmLoading = true;
      observable
        .pipe(
          finalize(() => {
            this.confirmLoading = false;
            this.cdr.markForCheck();
          }),
          takeUntil(this.nzVisibleChange),
          takeUntil(this.destroy$)
        )
        .subscribe(value => {
          if (value) {
            this.handleConfirm();
          }
        });
    } else {
      this.handleConfirm();
    }
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
