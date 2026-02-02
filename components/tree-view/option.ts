/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  booleanAttribute,
  inject,
  DestroyRef,
  input,
  output,
  effect
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

import { NzTreeNodeComponent } from './node';

@Component({
  selector: 'nz-tree-node-option',
  template: `<span class="ant-tree-title"><ng-content /></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-tree-node-content-wrapper',
    '[class.ant-tree-node-content-wrapper-open]': 'isExpanded',
    '[class.ant-tree-node-selected]': 'nzSelected()'
  }
})
export class NzTreeNodeOptionComponent<T> implements OnInit {
  readonly nzSelected = input(false, { transform: booleanAttribute });
  readonly nzDisabled = input(false, { transform: booleanAttribute });
  readonly nzClick = output<MouseEvent>();

  private readonly ngZone = inject(NgZone);
  private readonly element: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly destroyRef = inject(DestroyRef);
  private readonly treeNode = inject(NzTreeNodeComponent<T>);

  get isExpanded(): boolean {
    return this.treeNode.isExpanded;
  }

  constructor() {
    effect(() => {
      if (this.nzSelected()) {
        this.treeNode.select();
      } else {
        this.treeNode.deselect();
      }
    });

    effect(() => {
      if (this.nzDisabled()) {
        this.treeNode.disable();
      } else {
        this.treeNode.enable();
      }
    });
  }

  ngOnInit(): void {
    fromEventOutsideAngular<MouseEvent>(this.element, 'click')
      .pipe(
        filter(() => !this.nzDisabled()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        this.ngZone.run(() => this.nzClick.emit(event));
      });
  }
}
