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
  QueryList,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { defer, merge, MonoTypeOperatorFunction, Observable, of, Subject } from 'rxjs';
import { switchMap, take, takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';

@Component({
  selector: 'nz-list-item-extra, [nz-list-item-extra]',
  exportAs: 'nzListItemExtra',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-content></ng-content> `,
  host: {
    class: 'ant-list-item-extra'
  }
})
export class NzListItemExtraComponent {}

@Component({
  selector: 'nz-list-item-action',
  exportAs: 'nzListItemAction',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: ` <ng-template><ng-content></ng-content></ng-template> `
})
export class NzListItemActionComponent {
  @ViewChild(TemplateRef) templateRef?: TemplateRef<void>;
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
  },
  providers: [NzDestroyService]
})
export class NzListItemActionsComponent implements OnChanges {
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @ContentChildren(NzListItemActionComponent) nzListItemActions!: QueryList<NzListItemActionComponent>;

  actions: Array<TemplateRef<void>> = [];
  private inputActionChanges$ = new Subject<null>();
  private contentChildrenChanges$: Observable<null> = defer(() => {
    if (this.nzListItemActions) {
      return of(null);
    }
    return this.ngZone.onStable.pipe(
      take(1),
      this.enterZone(),
      switchMap(() => this.contentChildrenChanges$)
    );
  });

  constructor(private ngZone: NgZone, cdr: ChangeDetectorRef, destroy$: NzDestroyService) {
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

  private enterZone<T>(): MonoTypeOperatorFunction<T> {
    return (source: Observable<T>) =>
      new Observable<T>(observer =>
        source.subscribe({
          next: value => this.ngZone.run(() => observer.next(value))
        })
      );
  }
}
