import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NgClassType } from '../core/types/ng-class';
import { NzSizeDSType } from '../core/types/size';
import { toBoolean } from '../core/util/convert';

import { NzStepComponent } from './nz-step.component';

export type NzDirectionType = 'horizontal' | 'vertical';
export type NzStatusType = 'wait' | 'process' | 'finish' | 'error';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector           : 'nz-steps',
  templateUrl        : './nz-steps.component.html'
})
export class NzStepsComponent implements OnChanges, OnInit, OnDestroy, AfterContentInit {
  @ContentChildren(NzStepComponent) steps: QueryList<NzStepComponent>;

  @Input() nzCurrent = 0;
  @Input() nzDirection: NzDirectionType = 'horizontal';
  @Input() nzLabelPlacement: 'horizontal' | 'vertical' = 'horizontal';
  @Input() nzSize: NzSizeDSType = 'default';
  @Input() nzStartIndex = 0;
  @Input() nzStatus: NzStatusType = 'process';

  @Input()
  set nzProgressDot(value: boolean | TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>) {
    if (value instanceof TemplateRef) {
      this.showProcessDot = true;
      this.customProcessDotTemplate = value;
    } else {
      this.showProcessDot = toBoolean(value);
    }
    this.updateChildrenSteps();
  }
  showProcessDot = false;
  customProcessDotTemplate: TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>;

  classMap: NgClassType;

  private destroy$ = new Subject<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzStartIndex || changes.nzDirection || changes.nzStatus || changes.nzCurrent) {
      this.updateChildrenSteps();
    }
    if (changes.nzDirection || changes.nzProgressDot || changes.nzLabelPlacement || changes.nzSize) {
      this.setClassMap();
    }
  }

  ngOnInit(): void {
    this.setClassMap();
    this.updateChildrenSteps();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterContentInit(): void {
    this.updateChildrenSteps();
    if (this.steps) {
      this.steps.changes.pipe(takeUntil(this.destroy$)).subscribe(this.updateChildrenSteps);
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
          step.direction = this.nzDirection;
          step.index = index + this.nzStartIndex;
          step.currentIndex = this.nzCurrent;
          step.last = length === index + 1;
          step.markForCheck();
        });
      });
    }
  }

  private setClassMap(): void {
    this.classMap = {
      [ `ant-steps-${this.nzDirection}` ]: true,
      [ `ant-steps-label-horizontal` ]   : this.nzDirection === 'horizontal',
      [ `ant-steps-label-vertical` ]     : (this.showProcessDot || this.nzLabelPlacement === 'vertical') && this.nzDirection === 'horizontal',
      [ `ant-steps-dot` ]                : this.showProcessDot,
      [ 'ant-steps-small' ]              : this.nzSize === 'small'
    };
  }
}
