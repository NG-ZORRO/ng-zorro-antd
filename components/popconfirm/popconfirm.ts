/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, NgStyleInterface, NzTSType } from 'ng-zorro-antd/core/types';

import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzTooltipBaseDirective, NzToolTipComponent, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[nz-popconfirm]',
  exportAs: 'nzPopconfirm',
  host: {
    '[class.ant-popover-open]': 'visible'
  }
})
export class NzPopconfirmDirective extends NzTooltipBaseDirective {
  static ngAcceptInputType_nzCondition: BooleanInput;
  static ngAcceptInputType_nzPopconfirmShowArrow: BooleanInput;

  @Input('nzPopconfirmTitle') specificTitle?: NzTSType;
  @Input('nz-popconfirm') directiveNameTitle?: NzTSType | null;
  @Input('nzPopconfirmTrigger') specificTrigger?: NzTooltipTrigger = 'click';
  @Input('nzPopconfirmPlacement') specificPlacement?: string = 'top';
  @Input('nzPopconfirmOrigin') specificOrigin?: ElementRef<HTMLElement>;
  @Input('nzPopconfirmMouseEnterDelay') specificMouseEnterDelay?: number;
  @Input('nzPopconfirmMouseLeaveDelay') specificMouseLeaveDelay?: number;
  @Input('nzPopconfirmOverlayClassName') specificOverlayClassName?: string;
  @Input('nzPopconfirmOverlayStyle') specificOverlayStyle?: NgStyleInterface;
  @Input() nzOkText?: string;
  @Input() nzOkType?: string;
  @Input() nzCancelText?: string;
  @Input() nzIcon?: string | TemplateRef<void>;
  @Input() @InputBoolean() nzCondition: boolean = false;
  @Input() @InputBoolean() nzPopconfirmShowArrow: boolean = true;

  /**
   * @deprecated 10.0.0. This is deprecated and going to be removed in 10.0.0.
   * Please use a more specific API. Like `nzTooltipTrigger`.
   */
  @Input() nzTrigger: NzTooltipTrigger = 'click';

  @Input('nzPopconfirmVisible') specificVisible?: boolean;

  // tslint:disable-next-line:no-output-rename
  @Output('nzPopconfirmVisibleChange') readonly specificVisibleChange = new EventEmitter<boolean>();
  @Output() readonly nzOnCancel = new EventEmitter<void>();
  @Output() readonly nzOnConfirm = new EventEmitter<void>();

  protected readonly componentFactory: ComponentFactory<NzPopconfirmComponent> = this.resolver.resolveComponentFactory(
    NzPopconfirmComponent
  );

  protected readonly needProxyProperties = [
    'nzOverlayClassName',
    'nzOverlayStyle',
    'nzMouseEnterDelay',
    'nzMouseLeaveDelay',
    'nzVisible',
    'nzOkText',
    'nzOkType',
    'nzCancelText',
    'nzCondition',
    'nzIcon',
    'nzPopconfirmShowArrow'
  ];

  constructor(
    elementRef: ElementRef,
    hostView: ViewContainerRef,
    resolver: ComponentFactoryResolver,
    renderer: Renderer2,
    @Host() @Optional() noAnimation?: NzNoAnimationDirective
  ) {
    super(elementRef, hostView, resolver, renderer, noAnimation);
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
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="_visible"
      [cdkConnectedOverlayPush]="true"
    >
      <div
        class="ant-popover"
        [ngClass]="_classMap"
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

  _prefix = 'ant-popover-placement';
  _hasBackdrop = true;

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
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
