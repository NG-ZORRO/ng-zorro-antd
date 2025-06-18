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
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzTreeNodeComponent } from './node';

@Component({
  selector: 'nz-tree-node-option',
  template: `<span class="ant-tree-title"><ng-content></ng-content></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-tree-node-content-wrapper',
    '[class.ant-tree-node-content-wrapper-open]': 'isExpanded',
    '[class.ant-tree-node-selected]': 'nzSelected'
  }
})
export class NzTreeNodeOptionComponent<T> implements OnChanges, OnInit {
  private ngZone = inject(NgZone);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private destroyRef = inject(DestroyRef);
  private treeNode = inject(NzTreeNodeComponent<T>);

  @Input({ transform: booleanAttribute }) nzSelected = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();

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
    fromEventOutsideAngular<MouseEvent>(this.el, 'click')
      .pipe(
        filter(() => !this.nzDisabled && this.nzClick.observers.length > 0),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        this.ngZone.run(() => this.nzClick.emit(event));
      });
  }
}
