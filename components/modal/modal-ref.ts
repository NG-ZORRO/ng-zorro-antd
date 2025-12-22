/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE, hasModifierKey } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { ComponentRef, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { isPromise } from 'ng-zorro-antd/core/util';

import { BaseModalContainerComponent } from './modal-container.directive';
import { NzModalLegacyAPI } from './modal-legacy-api';
import { ModalOptions } from './modal-types';

export const NzModalState = {
  OPEN: 0,
  CLOSING: 1,
  CLOSED: 2
} as const;

export type NzModalState = (typeof NzModalState)[keyof typeof NzModalState];

export const NzTriggerAction = {
  CANCEL: 'cancel',
  OK: 'ok'
} as const;

export type NzTriggerAction = (typeof NzTriggerAction)[keyof typeof NzTriggerAction];

export class NzModalRef<T = NzSafeAny, R = NzSafeAny> implements NzModalLegacyAPI<T, R> {
  componentInstance: T | null = null;
  componentRef: ComponentRef<T> | null = null;
  result?: R;
  state: NzModalState = NzModalState.OPEN;
  afterClose = new Subject<R | undefined>();
  afterOpen = new Subject<void>();

  private closeTimeout?: ReturnType<typeof setTimeout>;

  private destroy$ = new Subject<void>();

  constructor(
    private overlayRef: OverlayRef,
    private config: ModalOptions,
    public containerInstance: BaseModalContainerComponent
  ) {
    containerInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'enter'),
        take(1)
      )
      .subscribe(() => {
        this.afterOpen.next();
        this.afterOpen.complete();
        if (config.nzAfterOpen instanceof EventEmitter) {
          config.nzAfterOpen.emit();
        }
      });

    containerInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'done' && event.toState === 'exit'),
        take(1)
      )
      .subscribe(() => {
        clearTimeout(this.closeTimeout);
        this._finishDialogClose();
      });

    containerInstance.containerClick.pipe(takeUntil(this.destroy$)).subscribe(() => {
      const cancelable = !this.config.nzCancelLoading && !this.config.nzOkLoading;
      if (cancelable) {
        this.trigger(NzTriggerAction.CANCEL);
      }
    });

    overlayRef
      .keydownEvents()
      .pipe(
        filter(
          event =>
            (this.config.nzKeyboard as boolean) &&
            !this.config.nzCancelLoading &&
            !this.config.nzOkLoading &&
            event.keyCode === ESCAPE &&
            !hasModifierKey(event)
        )
      )
      .subscribe(event => {
        event.preventDefault();
        this.trigger(NzTriggerAction.CANCEL);
      });

    containerInstance.cancelTriggered
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.trigger(NzTriggerAction.CANCEL));

    containerInstance.okTriggered.pipe(takeUntil(this.destroy$)).subscribe(() => this.trigger(NzTriggerAction.OK));

    overlayRef.detachments().subscribe(() => {
      this.afterClose.next(this.result);
      this.afterClose.complete();
      if (config.nzAfterClose instanceof EventEmitter) {
        config.nzAfterClose.emit(this.result);
      }
      this.componentInstance = null;
      this.componentRef = null;
      this.overlayRef.dispose();
    });
  }

  getContentComponent(): T {
    return this.componentInstance as T;
  }

  getContentComponentRef(): Readonly<ComponentRef<T> | null> {
    return this.componentRef as Readonly<ComponentRef<T> | null>;
  }

  getElement(): HTMLElement {
    return this.containerInstance.getNativeElement();
  }

  destroy(result?: R): void {
    this.close(result);
  }

  triggerOk(): Promise<void> {
    return this.trigger(NzTriggerAction.OK);
  }

  triggerCancel(): Promise<void> {
    return this.trigger(NzTriggerAction.CANCEL);
  }

  close(result?: R): void {
    if (this.state !== NzModalState.OPEN) {
      return;
    }
    this.result = result;
    this.containerInstance.animationStateChanged
      .pipe(
        filter(event => event.phaseName === 'start'),
        take(1)
      )
      .subscribe(event => {
        this.overlayRef.detachBackdrop();
        this.closeTimeout = setTimeout(() => {
          this._finishDialogClose();
        }, event.totalTime + 100);
      });

    this.containerInstance.startExitAnimation();
    this.state = NzModalState.CLOSING;
  }

  updateConfig(config: ModalOptions): void {
    Object.assign(this.config, config);
    this.containerInstance.bindBackdropStyle();
    this.containerInstance.cdr.markForCheck();
  }

  getState(): NzModalState {
    return this.state;
  }

  getConfig(): ModalOptions {
    return this.config;
  }

  getBackdropElement(): HTMLElement | null {
    return this.overlayRef.backdropElement;
  }

  private async trigger(action: NzTriggerAction): Promise<void> {
    if (this.state === NzModalState.CLOSING) {
      return;
    }
    const actionMap = {
      [NzTriggerAction.OK]: { trigger: this.config.nzOnOk, loadingKey: 'nzOkLoading' },
      [NzTriggerAction.CANCEL]: { trigger: this.config.nzOnCancel, loadingKey: 'nzCancelLoading' }
    } as const;
    const { trigger, loadingKey } = actionMap[action];
    if (this.config[loadingKey]) {
      return;
    }
    if (trigger instanceof EventEmitter) {
      trigger.emit(this.getContentComponent());
    } else if (typeof trigger === 'function') {
      const result = trigger(this.getContentComponent());
      if (isPromise(result)) {
        this.config[loadingKey] = true;
        this.updateConfig(this.config);
        let doClose: boolean | void | {} = false;
        try {
          doClose = (await result) as typeof result;
        } finally {
          this.config[loadingKey] = false;
          this.updateConfig(this.config);
          this.closeWhitResult(doClose);
        }
      } else {
        this.closeWhitResult(result);
      }
    }
  }

  private closeWhitResult(result: NzSafeAny): void {
    if (result !== false) {
      this.close(result);
    }
  }

  _finishDialogClose(): void {
    this.state = NzModalState.CLOSED;
    this.overlayRef.dispose();
    this.destroy$.next();
  }
}
