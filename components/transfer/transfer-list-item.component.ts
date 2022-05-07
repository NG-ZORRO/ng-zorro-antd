/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, EMPTY, fromEvent, Observable } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzDestroyService } from 'ng-zorro-antd/core/services';

import type { TransferItem } from './interface';

@Component({
  selector: '[nz-transfer-list-item]',
  exportAs: 'nzTransferListItem',
  preserveWhitespaces: false,
  template: `
    <ng-template #renderContainer>
      <div class="ant-transfer-list-content-item-text">
        <ng-template [ngTemplateOutlet]="render" [ngTemplateOutletContext]="{ $implicit: item }"> </ng-template>
      </div>
    </ng-template>
    <ng-template #renderDefault>
      <label nz-checkbox [nzChecked]="checked" (nzCheckedChange)="handleItemSelect()" [nzDisabled]="disabled">
        <ng-container *ngIf="!render; else renderContainer">
          <div class="ant-transfer-list-content-item-text">{{ item.title }}</div>
        </ng-container>
      </label>
    </ng-template>
    <ng-container *ngIf="showRemove; else renderDefault">
      <div class="ant-transfer-list-content-item-text">{{ item.title }}</div>
      <div
        class="ant-transfer-list-content-item-remove"
        [style.pointer-events]="disabled ? 'none' : null"
        (click)="remove.emit()"
      >
        <i nz-icon nzType="delete"></i>
      </div>
    </ng-container>
  `,
  providers: [NzDestroyService],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-transfer-list-content-item',
    '[class.ant-transfer-list-content-item-disabled]': 'disabled',
    '[class.ant-transfer-list-content-item-checked]': 'checked',
    '(click)': 'handleItemSelect()'
  }
})
export class NzTransferListItemComponent implements OnInit {
  @Input() item!: TransferItem;
  @Input() checked?: boolean = false;
  @Input() disabled?: boolean = false;
  @Input() render: TemplateRef<void> | null = null;
  @Input() showRemove: boolean = false;
  @Output() readonly itemSelect = new EventEmitter<void>();
  @Output() readonly remove = new EventEmitter<void>();

  private label$ = new BehaviorSubject<null | ElementRef<HTMLElement>>(null);
  @ViewChild(NzCheckboxComponent, { read: ElementRef, static: false })
  set label(label: ElementRef<HTMLElement> | undefined) {
    // The label will equal `undefined` on the first change detection cycle if there's no element
    // in the DOM.
    if (label) {
      this.label$.next(label);
    }
  }

  constructor(private ngZone: NgZone, private destroy$: NzDestroyService) {}

  ngOnInit(): void {
    this.label$
      .pipe(
        switchMap(label => {
          if (label) {
            return new Observable<MouseEvent>(subscriber =>
              this.ngZone.runOutsideAngular(() =>
                fromEvent<MouseEvent>(label.nativeElement, 'click').subscribe(subscriber)
              )
            );
          } else {
            // Do not emit anything and just remove the event listener if label has been removed
            // from the DOM.
            return EMPTY;
          }
        }),
        takeUntil(this.destroy$)
      )
      .subscribe(event => event.stopPropagation());
  }

  handleItemSelect(): void {
    if (this.showRemove) {
      return;
    }
    this.itemSelect.emit();
  }
}
