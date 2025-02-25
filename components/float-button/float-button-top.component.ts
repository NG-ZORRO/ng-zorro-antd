/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  numberAttribute,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzDestroyService, NzScrollService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzFloatButtonComponent } from './float-button.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'backTop';

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'nz-float-button-top',
  exportAs: 'nzFloatButtonTop',
  imports: [NzFloatButtonComponent, NzIconModule],
  animations: [fadeMotion],
  template: `
    <div #backTop @fadeMotion>
      <nz-float-button
        [nzIcon]="nzIcon || top"
        [nzDescription]="nzDescription"
        [nzHref]="nzHref"
        [nzType]="nzType"
        [nzShape]="nzShape"
      ></nz-float-button>
      <ng-template #top>
        <nz-icon nzType="vertical-align-top" nzTheme="outline" />
      </ng-template>
    </div>
  `,
  host: {
    class: 'ant-float-btn ant-float-btn-top',
    '[class.ant-float-btn-circle]': `nzShape === 'circle'`,
    '[class.ant-float-btn-hidden]': `!visible`,
    '[class.ant-float-btn-square]': `nzShape === 'square'`,
    '[class.ant-float-btn-rtl]': `dir === 'rtl'`
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [NzDestroyService]
})
export class NzFloatButtonTopComponent implements OnInit, OnDestroy, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  private scrollListenerDestroy$ = new Subject<void>();
  private target?: HTMLElement | null = null;

  visible: boolean = false;
  dir: Direction = 'ltr';

  @Input() nzHref: string | null = null;
  @Input() nzType: 'default' | 'primary' = 'default';
  @Input() nzShape: 'circle' | 'square' = 'circle';
  @Input() nzIcon: TemplateRef<void> | null = null;
  @Input() nzDescription: TemplateRef<void> | null = null;

  @Input() nzTemplate?: TemplateRef<void>;
  @Input({ transform: numberAttribute }) @WithConfig() nzVisibilityHeight: number = 400;
  @Input() nzTarget?: string | HTMLElement;
  @Input({ transform: numberAttribute }) nzDuration: number = 450;
  @Output() readonly nzOnClick = new EventEmitter<boolean>();

  @ViewChild('backTop', { static: false })
  set backTop(backTop: ElementRef<HTMLElement> | undefined) {
    if (backTop) {
      this.backTopClickSubscription.unsubscribe();

      this.backTopClickSubscription = fromEventOutsideAngular(backTop.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.scrollSrv.scrollTo(this.getTarget(), 0, { duration: this.nzDuration });
          if (this.nzOnClick.observers.length) {
            this.ngZone.run(() => this.nzOnClick.emit(true));
          }
        });
    }
  }

  private doc = inject(DOCUMENT);
  private backTopClickSubscription = Subscription.EMPTY;

  constructor(
    public nzConfigService: NzConfigService,
    private scrollSrv: NzScrollService,
    private platform: Platform,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private destroy$: NzDestroyService,
    private directionality: Directionality
  ) {
    this.dir = this.directionality.value;
  }

  ngOnInit(): void {
    this.registerScrollEvent();

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  private getTarget(): HTMLElement | Window {
    return this.target || window;
  }

  private handleScroll(): void {
    if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight) {
      return;
    }
    this.visible = !this.visible;
    this.cdr.detectChanges();
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

  ngOnDestroy(): void {
    this.scrollListenerDestroy$.next();
    this.scrollListenerDestroy$.complete();
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTarget } = changes;
    if (nzTarget) {
      this.target = typeof this.nzTarget === 'string' ? this.doc.querySelector(this.nzTarget) : this.nzTarget;
      this.registerScrollEvent();
    }
  }
}
