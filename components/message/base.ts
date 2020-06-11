/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, EventEmitter, Injector, OnDestroy, OnInit } from '@angular/core';
import { MessageConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSingletonService } from 'ng-zorro-antd/core/services';
import { Subject } from 'rxjs';

import { NzMessageData, NzMessageDataOptions } from './typings';

let globalCounter = 0;

export abstract class NzMNService {
  protected abstract componentPrefix: string;
  protected container?: NzMNContainerComponent;

  constructor(protected nzSingletonService: NzSingletonService, protected overlay: Overlay, private injector: Injector) {}

  remove(id?: string): void {
    if (this.container) {
      if (id) {
        this.container.remove(id);
      } else {
        this.container.removeAll();
      }
    }
  }

  protected getInstanceId(): string {
    return `${this.componentPrefix}-${globalCounter++}`;
  }

  protected withContainer<T extends NzMNContainerComponent>(ctor: ComponentType<T>): T {
    let containerInstance = this.nzSingletonService.getSingletonWithKey(this.componentPrefix);
    if (containerInstance) {
      return containerInstance as T;
    }

    const overlayRef = this.overlay.create({
      hasBackdrop: false,
      scrollStrategy: this.overlay.scrollStrategies.noop(),
      positionStrategy: this.overlay.position().global()
    });
    const componentPortal = new ComponentPortal(ctor, null, this.injector);
    const componentRef = overlayRef.attach(componentPortal);
    const overlayPane = overlayRef.overlayElement;
    overlayPane.style.zIndex = '1010';

    if (!containerInstance) {
      this.container = containerInstance = componentRef.instance;
      this.nzSingletonService.registerSingletonWithKey(this.componentPrefix, containerInstance);
    }

    return containerInstance as T;
  }
}

export abstract class NzMNContainerComponent implements OnInit, OnDestroy {
  config?: Required<MessageConfig>;
  instances: Array<Required<NzMessageData>> = [];

  protected readonly destroy$ = new Subject<void>();

  constructor(protected cdr: ChangeDetectorRef, protected nzConfigService: NzConfigService) {
    this.updateConfig();
  }

  ngOnInit(): void {
    this.subscribeConfigChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  create(data: NzMessageData): Required<NzMessageData> {
    const instance = this.onCreate(data);

    if (this.instances.length >= this.config!.nzMaxStack) {
      this.instances = this.instances.slice(1);
    }

    this.instances = [...this.instances, instance];

    this.readyInstances();

    return instance;
  }

  remove(id: string, userAction: boolean = false): void {
    this.instances.some((instance, index) => {
      if (instance.messageId === id) {
        this.instances.splice(index, 1);
        this.instances = [...this.instances];
        this.onRemove(instance, userAction);
        this.readyInstances();
        return true;
      }
      return false;
    });
  }

  removeAll(): void {
    this.instances.forEach(i => this.onRemove(i, false));
    this.instances = [];

    this.readyInstances();
  }

  protected onCreate(instance: NzMessageData): Required<NzMessageData> {
    instance.options = this.mergeOptions(instance.options);
    instance.onClose = new Subject<boolean>();
    return instance as Required<NzMessageData>;
  }

  protected onRemove(instance: Required<NzMessageData>, userAction: boolean): void {
    instance.onClose.next(userAction);
    instance.onClose.complete();
  }

  protected readyInstances(): void {
    this.cdr.detectChanges();
  }

  protected abstract updateConfig(): void;

  protected abstract subscribeConfigChange(): void;

  protected mergeOptions(options?: NzMessageDataOptions): NzMessageDataOptions {
    const { nzDuration, nzAnimate, nzPauseOnHover } = this.config!;
    return { nzDuration, nzAnimate, nzPauseOnHover, ...options };
  }
}

export abstract class NzMNComponent implements OnInit, OnDestroy {
  instance!: Required<NzMessageData>;
  index?: number;

  readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();

  protected options!: Required<NzMessageDataOptions>;
  protected autoClose?: boolean;
  protected eraseTimer: number | null = null;
  protected eraseTimingStart?: number;
  protected eraseTTL!: number;

  constructor(protected cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.options = this.instance.options as Required<NzMessageDataOptions>;

    if (this.options.nzAnimate) {
      this.instance.state = 'enter';
    }

    this.autoClose = this.options.nzDuration > 0;

    if (this.autoClose) {
      this.initErase();
      this.startEraseTimeout();
    }
  }

  ngOnDestroy(): void {
    if (this.autoClose) {
      this.clearEraseTimeout();
    }
  }

  onEnter(): void {
    if (this.autoClose && this.options.nzPauseOnHover) {
      this.clearEraseTimeout();
      this.updateTTL();
    }
  }

  onLeave(): void {
    if (this.autoClose && this.options.nzPauseOnHover) {
      this.startEraseTimeout();
    }
  }

  protected destroy(userAction: boolean = false): void {
    if (this.options.nzAnimate) {
      this.instance.state = 'leave';
      this.cdr.detectChanges();
      setTimeout(() => {
        this.destroyed.next({ id: this.instance.messageId, userAction: userAction });
      }, 200);
    } else {
      this.destroyed.next({ id: this.instance.messageId, userAction: userAction });
    }
  }

  private initErase(): void {
    this.eraseTTL = this.options.nzDuration;
    this.eraseTimingStart = Date.now();
  }

  private updateTTL(): void {
    if (this.autoClose) {
      this.eraseTTL -= Date.now() - this.eraseTimingStart!;
    }
  }

  private startEraseTimeout(): void {
    if (this.eraseTTL > 0) {
      this.clearEraseTimeout();
      this.eraseTimer = setTimeout(() => this.destroy(), this.eraseTTL);
      this.eraseTimingStart = Date.now();
    } else {
      this.destroy();
    }
  }

  private clearEraseTimeout(): void {
    if (this.eraseTimer !== null) {
      clearTimeout(this.eraseTimer);
      this.eraseTimer = null;
    }
  }
}
