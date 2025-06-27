/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectorRef, Directive, EventEmitter, Injector, OnInit, inject, DestroyRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';

import { MessageConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSingletonService } from 'ng-zorro-antd/core/services';

import { NzMessageData, NzMessageDataOptions } from './typings';

let globalCounter = 0;

export abstract class NzMNService<T extends NzMNContainerComponent> {
  protected abstract componentPrefix: string;
  protected container?: T;
  protected nzSingletonService = inject(NzSingletonService);
  protected overlay = inject(Overlay);
  protected injector = inject(Injector);

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

  protected withContainer(ctor: ComponentType<T>): T {
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
    const overlayWrapper = overlayRef.hostElement;
    overlayWrapper.style.zIndex = '1010';

    if (!containerInstance) {
      this.container = containerInstance = componentRef.instance;
      this.nzSingletonService.registerSingletonWithKey(this.componentPrefix, containerInstance);
      this.container.afterAllInstancesRemoved.subscribe(() => {
        this.container = undefined;
        this.nzSingletonService.unregisterSingletonWithKey(this.componentPrefix);
        overlayRef.dispose();
      });
    }

    return containerInstance as T;
  }
}

@Directive()
export abstract class NzMNContainerComponent<
  C extends MessageConfig = MessageConfig,
  D extends NzMessageData = NzMessageData
> {
  config?: Required<C>;
  instances: Array<Required<D>> = [];

  private readonly _afterAllInstancesRemoved = new Subject<void>();

  readonly afterAllInstancesRemoved = this._afterAllInstancesRemoved.asObservable();

  protected cdr = inject(ChangeDetectorRef);
  protected nzConfigService = inject(NzConfigService);

  constructor() {
    this.subscribeConfigChange();
  }

  create(data: D): Required<D> {
    const instance = this.onCreate(data);

    if (this.instances.length >= this.config!.nzMaxStack!) {
      this.instances = this.instances.slice(1);
    }

    this.instances = [...this.instances, instance];

    this.readyInstances();

    return instance;
  }

  remove(id: string, userAction: boolean = false): void {
    this.instances
      .map((instance, index) => ({ index, instance }))
      .filter(({ instance }) => instance.messageId === id)
      .forEach(({ index, instance }) => {
        this.instances.splice(index, 1);
        this.instances = [...this.instances];
        this.onRemove(instance, userAction);
        this.readyInstances();
      });

    if (!this.instances.length) {
      this.onAllInstancesRemoved();
    }
  }

  removeAll(): void {
    this.instances.forEach(i => this.onRemove(i, false));
    this.instances = [];

    this.readyInstances();
    this.onAllInstancesRemoved();
  }

  protected onCreate(instance: D): Required<D> {
    instance.options = this.mergeOptions(instance.options);
    instance.onClose = new Subject<boolean>();
    return instance as Required<D>;
  }

  protected onRemove(instance: Required<D>, userAction: boolean): void {
    instance.onClose!.next(userAction);
    instance.onClose!.complete();
  }

  private onAllInstancesRemoved(): void {
    this._afterAllInstancesRemoved.next();
    this._afterAllInstancesRemoved.complete();
  }

  protected readyInstances(): void {
    this.cdr.detectChanges();
  }

  protected abstract subscribeConfigChange(): void;

  protected mergeOptions(options?: D['options']): D['options'] {
    const { nzDuration, nzAnimate, nzPauseOnHover } = this.config!;
    return { nzDuration, nzAnimate, nzPauseOnHover, ...options };
  }
}

@Directive()
export abstract class NzMNComponent implements OnInit {
  abstract instance: Required<NzMessageData>;
  abstract index?: number;
  abstract destroyed: EventEmitter<{ id: string; userAction: boolean }>;

  protected cdr = inject(ChangeDetectorRef);
  protected destroyRef = inject(DestroyRef);
  readonly animationStateChanged: Subject<AnimationEvent> = new Subject<AnimationEvent>();

  protected options!: Required<NzMessageDataOptions>;
  protected autoClose?: boolean;
  protected closeTimer?: ReturnType<typeof setTimeout>;
  protected userAction: boolean = false;
  protected eraseTimer?: ReturnType<typeof setTimeout>;
  protected eraseTimingStart?: number;
  protected eraseTTL!: number;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.autoClose) {
        this.clearEraseTimeout();
      }
      this.animationStateChanged.complete();
    });
  }

  ngOnInit(): void {
    this.options = this.instance.options as Required<NzMessageDataOptions>;

    if (this.options.nzAnimate) {
      this.instance.state = 'enter';
      this.animationStateChanged
        .pipe(
          filter(event => event.phaseName === 'done' && event.toState === 'leave'),
          take(1)
        )
        .subscribe(() => {
          clearTimeout(this.closeTimer);
          this.destroyed.next({ id: this.instance.messageId, userAction: this.userAction });
        });
    }

    this.autoClose = this.options.nzDuration > 0;

    if (this.autoClose) {
      this.initErase();
      this.startEraseTimeout();
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
    this.userAction = userAction;
    if (this.options.nzAnimate) {
      this.instance.state = 'leave';
      this.cdr.detectChanges();
      this.closeTimer = setTimeout(() => {
        this.closeTimer = undefined;
        this.destroyed.next({ id: this.instance.messageId, userAction });
      }, 200);
    } else {
      this.destroyed.next({ id: this.instance.messageId, userAction });
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
      this.eraseTimer = undefined;
    }
  }
}
