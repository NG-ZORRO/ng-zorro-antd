/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from 'ng-zorro-antd/core/util';
import { merge, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { BooleanInput, NgClassType, NzSizeDSType } from 'ng-zorro-antd/core/types';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzStepComponent } from './step.component';

export type NzDirectionType = 'horizontal' | 'vertical';
export type NzStatusType = 'wait' | 'process' | 'finish' | 'error';
export type nzProgressDotTemplate = TemplateRef<{ $implicit: TemplateRef<void>; status: string; index: number }>;
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector: 'nz-steps',
  exportAs: 'nzSteps',
  template: `
    <div class="ant-steps" [ngClass]="classMap">
      <ng-content></ng-content>
    </div>
  `
})
export class NzStepsComponent implements OnChanges, OnInit, OnDestroy, AfterContentInit {
  static ngAcceptInputType_nzProgressDot: BooleanInput | nzProgressDotTemplate | undefined | null;

  @ContentChildren(NzStepComponent) steps!: QueryList<NzStepComponent>;

  @Input() nzCurrent = 0;
  @Input() nzDirection: NzDirectionType = 'horizontal';
  @Input() nzLabelPlacement: 'horizontal' | 'vertical' = 'horizontal';
  @Input() nzType: 'default' | 'navigation' = 'default';
  @Input() nzSize: NzSizeDSType = 'default';
  @Input() nzStartIndex = 0;
  @Input() nzStatus: NzStatusType = 'process';

  @Input()
  set nzProgressDot(value: boolean | nzProgressDotTemplate) {
    if (value instanceof TemplateRef) {
      this.showProcessDot = true;
      this.customProcessDotTemplate = value;
    } else {
      this.showProcessDot = toBoolean(value);
    }
    this.updateChildrenSteps();
  }

  @Output() readonly nzIndexChange = new EventEmitter<number>();

  private destroy$ = new Subject<void>();
  private indexChangeSubscription?: Subscription;

  showProcessDot = false;
  customProcessDotTemplate?: TemplateRef<{ $implicit: TemplateRef<void>; status: string; index: number }>;
  classMap: NgClassType = {};
  dir: Direction = 'ltr';

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzStartIndex || changes.nzDirection || changes.nzStatus || changes.nzCurrent) {
      this.updateChildrenSteps();
    }
    if (changes.nzDirection || changes.nzProgressDot || changes.nzLabelPlacement || changes.nzSize) {
      this.setClassMap();
    }
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.setClassMap();
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
    this.setClassMap();
    this.updateChildrenSteps();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    if (this.indexChangeSubscription) {
      this.indexChangeSubscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {
    if (this.steps) {
      this.steps.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
        this.updateHostProgressClass();
        this.updateChildrenSteps();
      });
    }
  }

  private updateHostProgressClass(): void {
    if (this.steps && !this.showProcessDot) {
      const hasPercent = !!this.steps.toArray().find(step => step.nzPercentage !== null);
      const className = 'ant-steps-with-progress';
      const hasClass = this.elementRef.nativeElement.classList.contains(className);
      if (hasPercent && !hasClass) {
        this.renderer.addClass(this.elementRef.nativeElement, className);
      } else if (!hasPercent && hasClass) {
        this.renderer.removeClass(this.elementRef.nativeElement, className);
      }
    }
  }

  private updateChildrenSteps(): void {
    if (this.steps) {
      const length = this.steps.length;
      this.steps.toArray().forEach((step, index) => {
        Promise.resolve().then(() => {
          step.outStatus = this.nzStatus;
          step.showProcessDot = this.showProcessDot;
          if (this.customProcessDotTemplate) {
            step.customProcessTemplate = this.customProcessDotTemplate;
          }
          step.clickable = this.nzIndexChange.observers.length > 0;
          step.direction = this.nzDirection;
          step.index = index + this.nzStartIndex;
          step.currentIndex = this.nzCurrent;
          step.last = length === index + 1;
          step.markForCheck();
        });
      });
      if (this.indexChangeSubscription) {
        this.indexChangeSubscription.unsubscribe();
      }
      this.indexChangeSubscription = merge(...this.steps.map(step => step.click$)).subscribe(index =>
        this.nzIndexChange.emit(index)
      );
    }
  }

  private setClassMap(): void {
    this.classMap = {
      [`ant-steps-${this.nzDirection}`]: true,
      [`ant-steps-label-horizontal`]: this.nzDirection === 'horizontal',
      [`ant-steps-label-vertical`]:
        (this.showProcessDot || this.nzLabelPlacement === 'vertical') && this.nzDirection === 'horizontal',
      [`ant-steps-dot`]: this.showProcessDot,
      ['ant-steps-small']: this.nzSize === 'small',
      ['ant-steps-navigation']: this.nzType === 'navigation',
      ['ant-steps-rtl']: this.dir === 'rtl'
    };
  }
}
