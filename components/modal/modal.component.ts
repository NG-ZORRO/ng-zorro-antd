/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzButtonType } from 'ng-zorro-antd/button';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzModalContentDirective } from './modal-content.directive';
import { NzModalFooterDirective } from './modal-footer.directive';
import { NzModalLegacyAPI } from './modal-legacy-api';
import { NzModalRef } from './modal-ref';
import { NzModalTitleDirective } from './modal-title.directive';
import { ModalButtonOptions, ModalOptions, ModalTypes, OnClickCallback, StyleObjectLike } from './modal-types';
import { NzModalService } from './modal.service';
import { getConfigFromComponent } from './utils';

@Component({
  selector: 'nz-modal',
  exportAs: 'nzModal',
  template: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzModalComponent<T extends ModalOptions = NzSafeAny, R = NzSafeAny>
  implements OnChanges, NzModalLegacyAPI<T, R>, OnDestroy
{
  static ngAcceptInputType_nzMask: BooleanInput;
  static ngAcceptInputType_nzMaskClosable: BooleanInput;
  static ngAcceptInputType_nzCloseOnNavigation: BooleanInput;
  static ngAcceptInputType_nzVisible: BooleanInput;
  static ngAcceptInputType_nzClosable: BooleanInput;
  static ngAcceptInputType_nzOkLoading: BooleanInput;
  static ngAcceptInputType_nzOkDisabled: BooleanInput;
  static ngAcceptInputType_nzCancelDisabled: BooleanInput;
  static ngAcceptInputType_nzCancelLoading: BooleanInput;
  static ngAcceptInputType_nzKeyboard: BooleanInput;
  static ngAcceptInputType_nzNoAnimation: BooleanInput;
  static ngAcceptInputType_nzOkDanger: BooleanInput;
  static ngAcceptInputType_nzCentered: BooleanInput;

  @Input() @InputBoolean() nzMask?: boolean;
  @Input() @InputBoolean() nzMaskClosable?: boolean;
  @Input() @InputBoolean() nzCloseOnNavigation?: boolean;
  @Input() @InputBoolean() nzVisible: boolean = false;
  @Input() @InputBoolean() nzClosable: boolean = true;
  @Input() @InputBoolean() nzOkLoading: boolean = false;
  @Input() @InputBoolean() nzOkDisabled: boolean = false;
  @Input() @InputBoolean() nzCancelDisabled: boolean = false;
  @Input() @InputBoolean() nzCancelLoading: boolean = false;
  @Input() @InputBoolean() nzKeyboard: boolean = true;
  @Input() @InputBoolean() nzNoAnimation = false;
  @Input() @InputBoolean() nzCentered = false;
  @Input() nzContent?: string | TemplateRef<{}> | Type<T>;
  @Input() nzComponentParams?: T;
  @Input() nzFooter?: string | TemplateRef<{}> | Array<ModalButtonOptions<T>> | null;
  @Input() nzZIndex: number = 1000;
  @Input() nzWidth: number | string = 520;
  @Input() nzWrapClassName?: string;
  @Input() nzClassName?: string;
  @Input() nzStyle?: object;
  @Input() nzTitle?: string | TemplateRef<{}>;
  @Input() nzCloseIcon: string | TemplateRef<void> = 'close';
  @Input() nzMaskStyle?: StyleObjectLike;
  @Input() nzBodyStyle?: StyleObjectLike;
  @Input() nzOkText?: string | null;
  @Input() nzCancelText?: string | null;
  @Input() nzOkType: NzButtonType = 'primary';
  @Input() @InputBoolean() nzOkDanger: boolean = false;
  @Input() nzIconType: string = 'question-circle'; // Confirm Modal ONLY
  @Input() nzModalType: ModalTypes = 'default';
  @Input() nzAutofocus: 'ok' | 'cancel' | 'auto' | null = 'auto';

  // TODO(@hsuanxyz) Input will not be supported
  @Input()
  @Output()
  readonly nzOnOk: EventEmitter<T> | OnClickCallback<T> | NzSafeAny = new EventEmitter<T>();

  // TODO(@hsuanxyz) Input will not be supported
  @Input()
  @Output()
  readonly nzOnCancel: EventEmitter<T> | OnClickCallback<T> | NzSafeAny = new EventEmitter<T>();

  @Output() readonly nzAfterOpen = new EventEmitter<void>();
  @Output() readonly nzAfterClose = new EventEmitter<R>();
  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  @ContentChild(NzModalTitleDirective, { static: true, read: TemplateRef })
  set modalTitle(value: TemplateRef<NzSafeAny>) {
    if (value) {
      this.setTitleWithTemplate(value);
    }
  }

  @ContentChild(NzModalContentDirective, { static: true, read: TemplateRef })
  contentFromContentChild!: TemplateRef<NzSafeAny>;

  @ContentChild(NzModalFooterDirective, { static: true, read: TemplateRef })
  set modalFooter(value: TemplateRef<NzSafeAny>) {
    if (value) {
      this.setFooterWithTemplate(value);
    }
  }

  private modalRef: NzModalRef | null = null;
  private destroy$ = new Subject<void>();

  get afterOpen(): Observable<void> {
    // Observable alias for nzAfterOpen
    return this.nzAfterOpen.asObservable();
  }

  get afterClose(): Observable<R> {
    // Observable alias for nzAfterClose
    return this.nzAfterClose.asObservable();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private modal: NzModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  open(): void {
    if (!this.nzVisible) {
      this.nzVisible = true;
      this.nzVisibleChange.emit(true);
    }

    if (!this.modalRef) {
      const config = this.getConfig();
      this.modalRef = this.modal.create(config);

      // When the modal is implicitly closed (e.g. closeAll) the nzVisible needs to be set to the correct value and emit.
      this.modalRef.afterClose
        .asObservable()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.close();
        });
    }
  }

  close(result?: R): void {
    if (this.nzVisible) {
      this.nzVisible = false;
      this.nzVisibleChange.emit(false);
    }

    if (this.modalRef) {
      this.modalRef.close(result);
      this.modalRef = null;
    }
  }

  destroy(result?: R): void {
    this.close(result);
  }

  triggerOk(): void {
    this.modalRef?.triggerOk();
  }

  triggerCancel(): void {
    this.modalRef?.triggerCancel();
  }

  getContentComponent(): T | void {
    return this.modalRef?.getContentComponent();
  }

  getElement(): HTMLElement | void {
    return this.modalRef?.getElement();
  }

  getModalRef(): NzModalRef | null {
    return this.modalRef;
  }

  private setTitleWithTemplate(templateRef: TemplateRef<{}>): void {
    this.nzTitle = templateRef;
    if (this.modalRef) {
      // If modalRef already created, set the title in next tick
      Promise.resolve().then(() => {
        this.modalRef!.updateConfig({
          nzTitle: this.nzTitle
        });
      });
    }
  }

  private setFooterWithTemplate(templateRef: TemplateRef<{}>): void {
    this.nzFooter = templateRef;
    if (this.modalRef) {
      // If modalRef already created, set the footer in next tick
      Promise.resolve().then(() => {
        this.modalRef!.updateConfig({
          nzFooter: this.nzFooter
        });
      });
    }

    this.cdr.markForCheck();
  }

  private getConfig(): ModalOptions {
    const componentConfig = getConfigFromComponent(this);
    componentConfig.nzViewContainerRef = this.viewContainerRef;
    componentConfig.nzContent = this.nzContent || this.contentFromContentChild;
    return componentConfig;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzVisible, ...otherChanges } = changes;

    if (Object.keys(otherChanges).length && this.modalRef) {
      this.modalRef.updateConfig(getConfigFromComponent(this));
    }

    if (nzVisible) {
      if (this.nzVisible) {
        this.open();
      } else {
        this.close();
      }
    }
  }

  ngOnDestroy(): void {
    this.modalRef?._finishDialogClose();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
