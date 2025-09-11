/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  DOCUMENT,
  effect,
  ElementRef,
  inject,
  input,
  linkedSignal,
  NgZone,
  numberAttribute,
  OnInit,
  output,
  signal,
  TemplateRef,
  untracked,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigService, withConfigFactory } from 'ng-zorro-antd/core/config';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NzShapeSCType } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular, generateClassName } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzFloatButtonComponent } from './float-button.component';
import { NzFloatButtonType } from './typings';

const withConfig = withConfigFactory('backTop');
const CLASS_NAME = 'ant-float-btn';

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'nz-float-button-top',
  exportAs: 'nzFloatButtonTop',
  imports: [NzFloatButtonComponent, NzIconModule],
  animations: [fadeMotion],
  template: `
    <div #backTop @fadeMotion>
      <nz-float-button
        [nzIcon]="nzIcon() || top"
        [nzDescription]="nzDescription()"
        [nzHref]="nzHref()"
        [nzType]="nzType()"
        [nzShape]="shape()"
      ></nz-float-button>
      <ng-template #top>
        <nz-icon nzType="vertical-align-top" nzTheme="outline" />
      </ng-template>
    </div>
  `,
  host: {
    '[class]': 'class()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzFloatButtonTopComponent implements OnInit {
  public nzConfigService = inject(NzConfigService);
  private scrollSrv = inject(NzScrollService);
  private platform = inject(Platform);
  private ngZone = inject(NgZone);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);
  private document = inject(DOCUMENT);

  readonly backTop = viewChild('backTop', { read: ElementRef });

  readonly nzVisibilityHeight = input<number>();
  readonly nzHref = input<string | null>(null);
  readonly nzType = input<NzFloatButtonType>('default');
  readonly nzShape = input<NzShapeSCType>('circle');
  readonly nzIcon = input<string | TemplateRef<void> | null>(null);
  readonly nzDescription = input<TemplateRef<void> | null>(null);
  readonly nzTemplate = input<TemplateRef<void> | null>(null);
  readonly nzTarget = input<string | HTMLElement | null>(null);
  readonly nzDuration = input(450, { transform: numberAttribute });
  readonly nzOnClick = output<boolean>();

  // compact global config
  private readonly visibilityHeight = withConfig('nzVisibilityHeight', this.nzVisibilityHeight, 400);
  readonly shape = linkedSignal(() => this.nzShape());
  protected readonly dir = this.directionality.valueSignal;
  protected readonly class = computed<string[]>(() => {
    const dir = this.dir();
    const classes = [CLASS_NAME, `${CLASS_NAME}-top`, this.generateClass(this.shape())];
    if (dir === 'rtl') {
      classes.push(this.generateClass(dir));
    }
    if (!this.visible()) {
      classes.push(this.generateClass('hidden'));
    }
    return classes;
  });

  private target?: HTMLElement | null = null;
  private readonly visible = signal<boolean>(false);
  private backTopClickSubscription = Subscription.EMPTY;
  private scrollListenerDestroy$ = new Subject<void>();

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.scrollListenerDestroy$.next();
      this.scrollListenerDestroy$.complete();
    });

    effect(() => {
      const target = this.nzTarget();
      if (target) {
        this.target = typeof target === 'string' ? this.document.querySelector(target) : target;
        this.registerScrollEvent();
      }
    });

    effect(onCleanup => {
      const backTop = this.backTop();
      if (backTop) {
        this.backTopClickSubscription.unsubscribe();
        this.backTopClickSubscription = fromEventOutsideAngular(backTop.nativeElement, 'click')
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe(() => {
            this.scrollSrv.scrollTo(this.getTarget(), 0, { duration: this.nzDuration() });
            this.ngZone.run(() => this.nzOnClick.emit(true));
          });
      }
      return onCleanup(() => {
        this.backTopClickSubscription.unsubscribe();
      });
    });

    effect(() => {
      this.visibilityHeight();
      untracked(() => this.handleScroll());
    });
  }

  ngOnInit(): void {
    this.registerScrollEvent();
  }

  private getTarget(): HTMLElement | Window {
    return this.target || window;
  }

  private handleScroll(): void {
    if (
      !this.platform.isBrowser ||
      this.visible() === this.scrollSrv.getScroll(this.getTarget()) > this.visibilityHeight()
    ) {
      return;
    }
    this.visible.update(v => !v);
  }

  private registerScrollEvent(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.scrollListenerDestroy$.next();
    this.handleScroll();
    fromEventOutsideAngular(this.getTarget(), 'scroll', passiveEventListenerOptions as AddEventListenerOptions)
      .pipe(debounceTime(50), takeUntil(this.scrollListenerDestroy$))
      .subscribe(() => this.handleScroll());
  }

  private generateClass(suffix: string): string {
    return generateClassName(CLASS_NAME, suffix);
  }
}
