/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { defer, merge, Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nz-list-item-extra, [nz-list-item-extra]',
  exportAs: 'nzListItemExtra',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-list-item-extra'
  }
})
export class NzListItemExtraComponent {
  constructor() {}
}

@Component({
  selector: 'nz-list-item-action',
  exportAs: 'nzListItemAction',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-template><ng-content></ng-content></ng-template> `
})
export class NzListItemActionComponent {
  @ViewChild(TemplateRef) templateRef?: TemplateRef<void>;
  constructor() {}
}

@Component({
  selector: 'ul[nz-list-item-actions]',
  exportAs: 'nzListItemActions',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <li *ngFor="let i of actions; let last = last">
      <ng-template [ngTemplateOutlet]="i"></ng-template>
      <em *ngIf="!last" class="ant-list-item-action-split"></em>
    </li>
  `,
  host: {
    class: 'ant-list-item-action'
  }
})
export class NzListItemActionsComponent implements OnChanges, OnDestroy {
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @ContentChildren(NzListItemActionComponent) nzListItemActions!: QueryList<NzListItemActionComponent>;

  actions: Array<TemplateRef<void>> = [];
  private destroy$ = new Subject();
  private inputActionChanges$ = new Subject<null>();
  private contentChildrenChanges$: Observable<null> = defer(() => {
    if (this.nzListItemActions) {
      return of(null);
    }
    return this.ngZone.onStable.asObservable().pipe(
      take(1),
      switchMap(() => this.contentChildrenChanges$)
    );
  });

  constructor(private ngZone: NgZone, private cdr: ChangeDetectorRef) {
    merge(this.contentChildrenChanges$, this.inputActionChanges$)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.nzActions.length) {
          this.actions = this.nzActions;
        } else {
          this.actions = this.nzListItemActions.map(action => action.templateRef!);
        }
        this.cdr.markForCheck();
      });
  }

  ngOnChanges(): void {
    this.inputActionChanges$.next(null);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
