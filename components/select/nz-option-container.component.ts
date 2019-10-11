/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, map, pairwise, takeUntil } from 'rxjs/operators';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionLiComponent } from './nz-option-li.component';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectService } from './nz-select.service';

@Component({
  selector: '[nz-option-container]',
  exportAs: 'nzOptionContainer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl: './nz-option-container.component.html'
})
export class NzOptionContainerComponent implements OnDestroy, OnInit, AfterViewInit {
  private destroy$ = new Subject();
  private lastScrollTop = 0;
  @ViewChildren(NzOptionLiComponent) listOfNzOptionLiComponent: QueryList<NzOptionLiComponent>;
  @ViewChild('dropdownUl', { static: true }) dropdownUl: ElementRef<HTMLUListElement>;
  @Input() nzNotFoundContent: string;
  @Input() nzMenuItemSelectedIcon: TemplateRef<void>;
  @Output() readonly nzScrollToBottom = new EventEmitter<void>();

  scrollIntoViewIfNeeded(option: NzOptionComponent): void {
    // delay after open
    setTimeout(() => {
      if (this.listOfNzOptionLiComponent && this.listOfNzOptionLiComponent.length && option) {
        const targetOption = this.listOfNzOptionLiComponent.find(o =>
          this.nzSelectService.compareWith(o.nzOption.nzValue, option.nzValue)
        );
        // tslint:disable:no-any
        if (targetOption && targetOption.el && (targetOption.el as any).scrollIntoViewIfNeeded) {
          (targetOption.el as any).scrollIntoViewIfNeeded(false);
        }
      }
    });
  }

  trackLabel(_index: number, option: NzOptionGroupComponent): string | TemplateRef<void> {
    return option.nzLabel;
  }

  // tslint:disable-next-line:no-any
  trackValue(_index: number, option: NzOptionComponent): any {
    return option.nzValue;
  }

  constructor(public nzSelectService: NzSelectService, private cdr: ChangeDetectorRef, private ngZone: NgZone) {}

  ngOnInit(): void {
    this.nzSelectService.activatedOption$.pipe(takeUntil(this.destroy$)).subscribe(option => {
      this.scrollIntoViewIfNeeded(option!);
    });
    this.nzSelectService.check$.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.cdr.markForCheck();
    });
    this.ngZone.runOutsideAngular(() => {
      const ul = this.dropdownUl.nativeElement;
      fromEvent<MouseEvent>(ul, 'scroll')
        .pipe(takeUntil(this.destroy$))
        .subscribe(e => {
          e.preventDefault();
          e.stopPropagation();
          if (ul && ul.scrollTop > this.lastScrollTop && ul.scrollHeight < ul.clientHeight + ul.scrollTop + 10) {
            this.lastScrollTop = ul.scrollTop;
            this.ngZone.run(() => {
              this.nzScrollToBottom.emit();
            });
          }
        });
    });
  }

  ngAfterViewInit(): void {
    this.listOfNzOptionLiComponent.changes
      .pipe(
        map(list => list.length),
        pairwise(),
        filter(([before, after]) => after < before),
        takeUntil(this.destroy$)
      )
      .subscribe(() => (this.lastScrollTop = 0));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
