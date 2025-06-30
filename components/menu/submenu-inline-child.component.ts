/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { nzInjectDirectionality } from 'ng-zorro-antd/cdk/bidi';
import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzMenuModeType } from './menu.types';

@Component({
  selector: '[nz-submenu-inline-child]',
  animations: [collapseMotion],
  exportAs: 'nzSubmenuInlineChild',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ng-template [ngTemplateOutlet]="templateOutlet"></ng-template>`,
  host: {
    class: 'ant-menu ant-menu-inline ant-menu-sub',
    '[class.ant-menu-rtl]': `dir.isRtl()`,
    '[@collapseMotion]': 'expandState'
  },
  imports: [NgTemplateOutlet]
})
export class NzSubmenuInlineChildComponent implements OnInit, OnChanges {
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);

  @Input() templateOutlet: TemplateRef<NzSafeAny> | null = null;
  @Input() menuClass: string = '';
  @Input() mode: NzMenuModeType = 'vertical';
  @Input() nzOpen = false;
  listOfCacheClassName: string[] = [];
  expandState = 'collapsed';
  readonly dir = nzInjectDirectionality();

  calcMotionState(): void {
    this.expandState = this.nzOpen ? 'expanded' : 'collapsed';
  }

  ngOnInit(): void {
    this.calcMotionState();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { mode, nzOpen, menuClass } = changes;
    if (mode || nzOpen) {
      this.calcMotionState();
    }
    if (menuClass) {
      if (this.listOfCacheClassName.length) {
        this.listOfCacheClassName.forEach(className => {
          if (className) {
            this.renderer.removeClass(this.elementRef.nativeElement, className);
          }
        });
      }
      if (this.menuClass) {
        this.listOfCacheClassName = this.menuClass.split(' ');
        this.listOfCacheClassName.forEach(className => {
          if (className) {
            this.renderer.addClass(this.elementRef.nativeElement, className);
          }
        });
      }
    }
  }
}
