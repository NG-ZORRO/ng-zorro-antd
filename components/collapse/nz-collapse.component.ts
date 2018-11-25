import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  ViewEncapsulation
} from '@angular/core';

import { merge, Subject, Subscription } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { InputBoolean } from '../core/util/convert';
import { NzCollapsePanelComponent } from './nz-collapse-panel.component';

@Component({
  selector       : 'nz-collapse',
  templateUrl    : './nz-collapse.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  styles         : [
      `nz-collapse {
      display: block;
    }`
  ]
})
export class NzCollapseComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(NzCollapsePanelComponent) listOfNzCollapsePanelComponent: QueryList<NzCollapsePanelComponent>;
  @Input() @InputBoolean() nzAccordion = false;
  @Input() @InputBoolean() nzBordered = true;
  private destroy$ = new Subject();
  private clickSubscription: Subscription;

  click(collapse: NzCollapsePanelComponent): void {
    if (this.nzAccordion && !collapse.nzActive) {
      this.listOfNzCollapsePanelComponent.filter(item => item !== collapse).forEach(item => {
        if (item.nzActive) {
          item.nzActive = false;
          item.nzActiveChange.emit(item.nzActive);
          item.markForCheck();
        }
      });
    }
    collapse.nzActive = !collapse.nzActive;
    collapse.nzActiveChange.emit(collapse.nzActive);
  }

  ngAfterContentInit(): void {
    this.listOfNzCollapsePanelComponent.changes.pipe(
      startWith(null),
      takeUntil(this.destroy$)
    ).subscribe(() => {
      if (this.clickSubscription) {
        this.clickSubscription.unsubscribe();
      }
      this.clickSubscription = merge(...this.listOfNzCollapsePanelComponent.map(item => item.click$)).pipe(
        takeUntil(this.destroy$)
      ).subscribe((data) => {
        this.click(data);
      });
    });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
