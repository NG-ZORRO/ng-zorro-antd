/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform, normalizePassiveListenerOptions } from '@angular/cdk/platform';
import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  inject,
  numberAttribute
} from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { fadeMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzDestroyService, NzScrollService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'backTop';

const passiveEventListenerOptions = normalizePassiveListenerOptions({ passive: true });

@Component({
  selector: 'nz-back-top',
  exportAs: 'nzBackTop',
  animations: [fadeMotion],
  imports: [NgTemplateOutlet, NzIconModule],
  template: `
    @if (visible) {
      <div #backTop class="ant-back-top" [class.ant-back-top-rtl]="dir === 'rtl'" @fadeMotion>
        <ng-template #defaultContent>
          <div class="ant-back-top-content">
            <div class="ant-back-top-icon">
              <nz-icon nzType="vertical-align-top" />
            </div>
          </div>
        </ng-template>
        <ng-template [ngTemplateOutlet]="nzTemplate || defaultContent"></ng-template>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [NzDestroyService]
})
export class NzBackTopComponent implements OnInit, OnDestroy, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  private scrollListenerDestroy$ = new Subject<boolean>();
  private target: HTMLElement | null = null;

  visible: boolean = false;
  dir: Direction = 'ltr';

  @Input() nzTemplate?: TemplateRef<void>;
  @Input({ transform: numberAttribute }) @WithConfig() nzVisibilityHeight: number = 400;
  @Input() nzTarget?: string | HTMLElement;
  @Input({ transform: numberAttribute }) nzDuration: number = 450;
  @Output() readonly nzClick = new EventEmitter<boolean>();

  @ViewChild('backTop', { static: false })
  set backTop(backTop: ElementRef<HTMLElement> | undefined) {
    if (backTop) {
      this.backTopClickSubscription.unsubscribe();

      this.backTopClickSubscription = fromEventOutsideAngular(backTop.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.scrollSrv.scrollTo(this.getTarget(), 0, { duration: this.nzDuration });
          if (this.nzClick.observers.length) {
            this.zone.run(() => this.nzClick.emit(true));
          }
        });
    }
  }

  private backTopClickSubscription = Subscription.EMPTY;
  private doc: Document = inject(DOCUMENT);

  constructor(
    public nzConfigService: NzConfigService,
    private scrollSrv: NzScrollService,
    private platform: Platform,
    private zone: NgZone,
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
    this.scrollListenerDestroy$.next(true);
    this.handleScroll();
    fromEventOutsideAngular(this.getTarget(), 'scroll', passiveEventListenerOptions as AddEventListenerOptions)
      .pipe(debounceTime(50), takeUntil(this.scrollListenerDestroy$))
      .subscribe(() => this.handleScroll());
  }

  ngOnDestroy(): void {
    this.scrollListenerDestroy$.next(true);
    this.scrollListenerDestroy$.complete();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTarget } = changes;
    if (nzTarget) {
      this.target = typeof this.nzTarget === 'string' ? this.doc.querySelector(this.nzTarget) : this.nzTarget!;
      this.registerScrollEvent();
    }
  }
}
