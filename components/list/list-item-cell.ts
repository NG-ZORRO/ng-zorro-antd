/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { defer, merge, Observable, of, Subject } from 'rxjs';
import { mergeMap, startWith, takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'nz-list-item-extra, [nz-list-item-extra]',
  exportAs: 'nzListItemExtra',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-list-item-extra'
  },
  standalone: true
})
export class NzListItemExtraComponent {}

@Component({
  selector: 'nz-list-item-action',
  exportAs: 'nzListItemAction',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-template><ng-content></ng-content></ng-template> `,
  standalone: true
})
export class NzListItemActionComponent {
  @ViewChild(TemplateRef) templateRef?: TemplateRef<void>;
}

@Component({
  selector: 'ul[nz-list-item-actions]',
  exportAs: 'nzListItemActions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @for (i of actions; track i) {
      <li>
        <ng-template [ngTemplateOutlet]="i" />
        @if (!$last) {
          <em class="ant-list-item-action-split"></em>
        }
      </li>
    }
  `,
  host: {
    class: 'ant-list-item-action'
  },
  providers: [NzDestroyService],
  imports: [NgTemplateOutlet],
  standalone: true
})
export class NzListItemActionsComponent implements OnChanges, AfterContentInit {
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @ContentChildren(NzListItemActionComponent) nzListItemActions!: QueryList<NzListItemActionComponent>;

  actions: Array<TemplateRef<void>> = [];
  private inputActionChanges$ = new Subject<null>();
  private contentChildrenChanges$: Observable<NzSafeAny> = defer(() => {
    if (this.nzListItemActions) {
      return of(null);
    }
    return this.initialized.pipe(
      mergeMap(() => this.nzListItemActions.changes.pipe(startWith(this.nzListItemActions)))
    );
  });

  private initialized = new Subject<void>();

  constructor(cdr: ChangeDetectorRef, destroy$: NzDestroyService) {
    merge(this.contentChildrenChanges$, this.inputActionChanges$)
      .pipe(takeUntil(destroy$))
      .subscribe(() => {
        if (this.nzActions.length) {
          this.actions = this.nzActions;
        } else {
          this.actions = this.nzListItemActions.map(action => action.templateRef!);
        }
        cdr.detectChanges();
      });
  }

  ngOnChanges(): void {
    this.inputActionChanges$.next(null);
  }

  ngAfterContentInit(): void {
    this.initialized.next();
    this.initialized.complete();
  }
}
