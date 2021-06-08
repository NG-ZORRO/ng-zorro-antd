/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
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
  Input,
  OnDestroy,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { NzButtonType } from 'ng-zorro-antd/button';
import { zoomBigMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipBaseDirective, NzToolTipComponent, NzTooltipTrigger, PropertyMapping } from 'ng-zorro-antd/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  @Input() nzCancelText?: string;
  @Input() nzIcon?: string | TemplateRef<void>;
  @Input() @InputBoolean() nzCondition: boolean = false;
  @Input() @InputBoolean() nzPopconfirmShowArrow: boolean = true;
  @Input() @WithConfig() nzPopconfirmBackdrop?: boolean = false;

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
      nzCancelText: ['nzCancelText', () => this.nzCancelText],
      nzCondition: ['nzCondition', () => this.nzCondition],
      nzIcon: ['nzIcon', () => this.nzIcon],
      nzPopconfirmShowArrow: ['nzPopconfirmShowArrow', () => this.nzPopconfirmShowArrow],
      nzPopconfirmBackdrop: ['nzBackdrop', () => this.nzPopconfirmBackdrop],
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
    >
      <div
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
                  <button nz-button [nzSize]="'small'" (click)="onCancel()">
                    <ng-container *ngIf="nzCancelText">{{ nzCancelText }}</ng-container>
                    <ng-container *ngIf="!nzCancelText">{{ 'Modal.cancelText' | nzI18n }}</ng-container>
                  </button>
                  <button nz-button [nzSize]="'small'" [nzType]="nzOkType" (click)="onConfirm()">
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
  nzCancelText?: string;
  nzCondition = false;
  nzPopconfirmShowArrow = true;
  nzIcon?: string | TemplateRef<void>;
  nzOkText?: string;
  nzOkType: NzButtonType = 'primary';

  readonly nzOnCancel = new Subject<void>();
  readonly nzOnConfirm = new Subject<void>();

  protected _trigger: NzTooltipTrigger = 'click';

  _prefix = 'ant-popover';

  constructor(
    cdr: ChangeDetectorRef,
    @Optional() directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(cdr, directionality, noAnimation);
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
      super.show();
    } else {
      this.onConfirm();
    }
  }

  onCancel(): void {
    this.nzOnCancel.next();
    super.hide();
  }

  onConfirm(): void {
    this.nzOnConfirm.next();
    super.hide();
  }
}
