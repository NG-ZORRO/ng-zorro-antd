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
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy,
  QueryList,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean, NzDirectionVHType } from 'ng-zorro-antd/core';
import { Subscription } from 'rxjs';
import { NzListItemMetaComponent } from './nz-list-item-meta.component';
import { NzListComponent } from './nz-list.component';

@Component({
  selector: 'nz-list-item, [nz-list-item]',
  exportAs: 'nzListItem',
  templateUrl: './nz-list-item.component.html',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzListItemComponent implements OnDestroy, AfterViewInit {
  @ContentChildren(NzListItemMetaComponent) metas!: QueryList<NzListItemMetaComponent>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzContent: string | TemplateRef<void>;
  @Input() nzExtra: TemplateRef<void>;
  @Input() @InputBoolean() @HostBinding('class.ant-list-item-no-flex') nzNoFlex: boolean = false;

  private itemLayout: NzDirectionVHType;
  private itemLayout$: Subscription;

  get isVerticalAndExtra(): boolean {
    return this.itemLayout === 'vertical' && !!this.nzExtra;
  }

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    private parentComp: NzListComponent,
    private cdr: ChangeDetectorRef
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-list-item');
  }

  ngAfterViewInit(): void {
    this.itemLayout$ = this.parentComp.itemLayoutNotify$.subscribe(val => {
      this.itemLayout = val;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    if (this.itemLayout$) {
      this.itemLayout$.unsubscribe();
    }
  }
}
