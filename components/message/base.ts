/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ComponentType,
  createGlobalPositionStrategy,
  createNoopScrollStrategy,
  createOverlayRef
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  OnInit,
  Signal
} from '@angular/core';
import { Subject } from 'rxjs';

import { MessageConfig, NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSingletonService } from 'ng-zorro-antd/core/services';

import { NzMessageData, NzMessageDataOptions } from './typings';

let globalCounter = 0;

export abstract class NzMNService<T extends NzMNContainerComponent> {
  protected abstract componentPrefix: string;
  protected container?: T;
  protected nzSingletonService = inject(NzSingletonService);
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

    const overlayRef = createOverlayRef(this.injector, {
      hasBackdrop: false,
      scrollStrategy: createNoopScrollStrategy(),
      positionStrategy: createGlobalPositionStrategy(this.injector)
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

  protected destroyRef = inject(DestroyRef);
  protected elementRef = inject(ElementRef);

  /**
   * To get the element which triggers the animation.
   */
  protected abstract animationElement: Signal<ElementRef<HTMLElement>>;

  /**
   * When the animation is enabled, it is used to judge whether the leave animation is done or not.
   * @note Keyframe of notification may have different keyframe names with individual placements, so use array here.
   */
  protected abstract _animationKeyframeMap: Record<'enter' | 'leave', string | string[]>;

  /**
   * The animation class map for enter and leave.
   */
  protected abstract _animationClassMap: Record<'enter' | 'leave', string>;

  protected options!: Required<NzMessageDataOptions>;
  protected autoClose?: boolean;
  protected userAction: boolean = false;
  protected eraseTimer?: ReturnType<typeof setTimeout>;
  protected eraseTimingStart?: number;
  protected eraseTTL!: number;

  constructor() {
    this.destroyRef.onDestroy(() => {
      if (this.autoClose) {
        this.clearEraseTimeout();
      }
    });
  }

  ngOnInit(): void {
    this.options = this.instance.options as Required<NzMessageDataOptions>;

    if (this.options.nzAnimate) {
      // todo: remove this line in v22.0.0
      this.instance.state = 'enter';
      this._startEnterAnimation();
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
      // todo: remove this line in v22.0.0
      this.instance.state = 'leave';
      this._startLeaveAnimation(() => this.destroyed.next({ id: this.instance.messageId, userAction }));
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

  private _startEnterAnimation(): void {
    const element = this.animationElement().nativeElement;
    element.classList.add(this._animationClassMap.enter);

    const onAnimationEnd = (event: AnimationEvent): void => {
      if (this.matchAnimationKeyframe(event, this._animationKeyframeMap.enter)) {
        element.removeEventListener('animationend', onAnimationEnd);
        // should remove animation enter class once animation is done
        element.classList.remove(this._animationClassMap.enter);
      }
    };

    element.addEventListener('animationend', onAnimationEnd);
  }

  private _startLeaveAnimation(callback: () => void): void {
    const element = this.animationElement().nativeElement;
    element.classList.remove(this._animationClassMap.enter);
    element.classList.add(this._animationClassMap.leave);

    const onAnimationEnd = (event: AnimationEvent): void => {
      if (this.matchAnimationKeyframe(event, this._animationKeyframeMap.leave)) {
        element.removeEventListener('animationend', onAnimationEnd);
        callback();
      }
    };

    element.addEventListener('animationend', onAnimationEnd);
  }

  private matchAnimationKeyframe(event: AnimationEvent, animationName: string | string[]): boolean {
    return typeof animationName === 'string'
      ? event.animationName === animationName
      : animationName.includes(event.animationName);
  }
}
