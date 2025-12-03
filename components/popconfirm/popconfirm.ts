/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  Directive,
  DOCUMENT,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Input,
  Output,
  QueryList,
  signal,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, Observable, Subject } from 'rxjs';
import { finalize, first } from 'rxjs/operators';

import { NzButtonModule, NzButtonType } from 'ng-zorro-antd/button';
import { zoomBigMotion, NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, WithConfig } from 'ng-zorro-antd/core/config';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzOverlayModule } from 'ng-zorro-antd/core/overlay';
import { NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';
import { wrapIntoObservable } from 'ng-zorro-antd/core/util';
import { NzI18nModule } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipBaseDirective, NzTooltipComponent, NzTooltipTrigger, PropertyMapping } from 'ng-zorro-antd/tooltip';

import { NzPopConfirmButtonProps } from './popconfirm-option';

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
  @Input() nzBeforeConfirm?: () => Observable<boolean> | Promise<boolean> | boolean;
  @Input() nzIcon?: string | TemplateRef<void> | null;
  @Input({ transform: booleanAttribute }) nzCondition: boolean = false;
  @Input({ transform: booleanAttribute }) nzPopconfirmShowArrow: boolean = true;
  @Input() @WithConfig() nzPopconfirmBackdrop?: boolean = false;
  @Input() @WithConfig() nzAutofocus: NzAutoFocusType = null;

  nzOkText = input<string | null>(null);
  nzOkType = input<string>('primary');
  nzCancelText = input<string | null>(null);
  nzOkButtonProps = input<null | NzPopConfirmButtonProps>(null);
  nzCancelButtonProps = input<null | NzPopConfirmButtonProps>(null);
  /**
   * @deprecated v21
   * please use the nzOkButton object input to describe option of the ok button
   */
  nzOkDisabled = input(false, { transform: booleanAttribute });
  /**
   * @deprecated v21
   * please use the nzOkButton object input to describe option of the ok button
   */
  nzOkDanger = input(false, { transform: booleanAttribute });

  private okButtonProps = computed(() => ({
    ...this.nzOkButtonProps(),
    nzType: this.nzOkButtonProps()?.nzType || this.nzOkType() === 'danger' ? 'primary' : this.nzOkType(),
    nzDanger: this.nzOkDanger() || this.nzOkButtonProps()?.nzDanger || this.nzOkType() === 'danger',
    nzDisabled: this.nzOkDisabled() || this.nzOkButtonProps()?.nzDisabled
  }));
  private cancelButtonProps = computed(() => ({
    ...this.nzCancelButtonProps()
  }));

  override directiveContent?: NzTSType | null = null;
  override content?: NzTSType | null = null;
  override overlayClickable?: boolean;

  @Output('nzPopconfirmVisibleChange') override readonly visibleChange = new EventEmitter<boolean>();
  @Output() readonly nzOnCancel = new EventEmitter<void>();
  @Output() readonly nzOnConfirm = new EventEmitter<void>();

  protected override getProxyPropertyMap(): PropertyMapping {
    return {
      nzOkText: ['nzOkText', () => this.nzOkText],
      nzCancelText: ['nzCancelText', () => this.nzCancelText],
      nzOkButtonProps: ['nzOkButtonProps', () => this.okButtonProps],
      nzCancelButtonProps: ['nzCancelButtonProps', () => this.cancelButtonProps],
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

    (this.component as NzPopconfirmComponent).nzOnCancel.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.nzOnCancel.emit();
    });
    (this.component as NzPopconfirmComponent).nzOnConfirm.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.nzOnConfirm.emit();
    });
  }
}

@Component({
  selector: 'nz-popconfirm',
  exportAs: 'nzPopconfirmComponent',
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
        [@.disabled]="!!noAnimation?.nzNoAnimation?.()"
        [nzNoAnimation]="noAnimation?.nzNoAnimation?.()"
        [@zoomBigMotion]="'active'"
      >
        @if (nzPopconfirmShowArrow) {
          <div class="ant-popover-arrow"></div>
        }
        <div class="ant-popover-content">
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message">
                  @if (nzIcon !== null) {
                    <span class="ant-popover-message-icon">
                      <ng-container *nzStringTemplateOutlet="nzIcon; let icon">
                        <nz-icon [nzType]="icon || 'exclamation-circle'" nzTheme="fill" />
                      </ng-container>
                    </span>
                  }
                  <div class="ant-popover-message-title">
                    <ng-container *nzStringTemplateOutlet="nzTitle; context: nzTitleContext">
                      {{ nzTitle }}
                    </ng-container>
                  </div>
                </div>
                <div class="ant-popover-buttons">
                  <button
                    nz-button
                    #cancelBtn
                    [nzSize]="'small'"
                    [nzDanger]="nzCancelButtonProps()?.nzDanger"
                    (click)="onCancel()"
                    [disabled]="nzCancelButtonProps()?.nzDisabled"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'cancel' || null"
                  >
                    @let cancelText = nzCancelText() || ('Modal.cancelText' | nzI18n);
                    {{ cancelText }}
                  </button>
                  <button
                    nz-button
                    #okBtn
                    [nzSize]="'small'"
                    [nzType]="nzOkButtonProps().nzType"
                    [nzDanger]="nzOkButtonProps().nzDanger"
                    [nzLoading]="confirmLoading"
                    [disabled]="nzOkButtonProps().nzDisabled"
                    (click)="onConfirm()"
                    [attr.cdkFocusInitial]="nzAutoFocus === 'ok' || null"
                  >
                    @let okText = nzOkText() || ('Modal.okText' | nzI18n);
                    {{ okText }}
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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzPopconfirmComponent extends NzTooltipComponent {
  @ViewChildren('okBtn', { read: ElementRef }) okBtn!: QueryList<ElementRef>;
  @ViewChildren('cancelBtn', { read: ElementRef }) cancelBtn!: QueryList<ElementRef>;

  nzCondition = false;
  nzPopconfirmShowArrow = true;
  nzIcon?: string | TemplateRef<void> | null;
  nzAutoFocus: NzAutoFocusType = null;
  nzBeforeConfirm: (() => Observable<boolean> | Promise<boolean> | boolean) | null = null;

  nzOkText = signal<string | null>(null);
  nzCancelText = signal<string | null>(null);
  nzOkButtonProps = signal<NzPopConfirmButtonProps & { nzType: NzButtonType }>({ nzType: 'primary' });
  nzCancelButtonProps = signal<NzPopConfirmButtonProps | null>(null);

  readonly nzOnCancel = new Subject<void>();
  readonly nzOnConfirm = new Subject<void>();

  protected override _trigger: NzTooltipTrigger = 'click';
  private elementFocusedBeforeModalWasOpened: HTMLElement | null = null;
  private document = inject(DOCUMENT);

  override _prefix = 'ant-popover';

  confirmLoading = false;

  constructor() {
    super();
    this.destroyRef.onDestroy(() => {
      this.nzVisibleChange.complete();
    });
  }

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
      this.confirmLoading = true;
      this.cdr.markForCheck();

      wrapIntoObservable(this.nzBeforeConfirm())
        .pipe(
          first(),
          filter(Boolean),
          finalize(() => {
            this.confirmLoading = false;
            this.cdr.markForCheck();
          })
        )
        .subscribe(() => this.handleConfirm());
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
    this.elementFocusedBeforeModalWasOpened?.focus();
  }
}
