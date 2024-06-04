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
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  booleanAttribute
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';

import { NzTreeNodeComponent } from './node';

@Component({
  selector: 'nz-tree-node-option',
  template: ` <span class="ant-tree-title"><ng-content></ng-content></span> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-tree-node-content-wrapper',
    '[class.ant-tree-node-content-wrapper-open]': 'isExpanded',
    '[class.ant-tree-node-selected]': 'nzSelected'
  },
  providers: [NzDestroyService],
  standalone: true
})
export class NzTreeNodeOptionComponent<T> implements OnChanges, OnInit {
  @Input({ transform: booleanAttribute }) nzSelected = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();

  constructor(
    private ngZone: NgZone,
    private host: ElementRef<HTMLElement>,
    private destroy$: NzDestroyService,
    private treeNode: NzTreeNodeComponent<T>
  ) {}

  get isExpanded(): boolean {
    return this.treeNode.isExpanded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzDisabled, nzSelected } = changes;
    if (nzDisabled) {
      if (nzDisabled.currentValue) {
        this.treeNode.disable();
      } else {
        this.treeNode.enable();
      }
    }

    if (nzSelected) {
      if (nzSelected.currentValue) {
        this.treeNode.select();
      } else {
        this.treeNode.deselect();
      }
    }
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.host.nativeElement, 'click')
        .pipe(
          filter(() => !this.nzDisabled && this.nzClick.observers.length > 0),
          takeUntil(this.destroy$)
        )
        .subscribe(event => {
          this.ngZone.run(() => this.nzClick.emit(event));
        })
    );
  }
}
