/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Optional,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { NzNoAnimationDirective, slideMotion } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { MenuService, NzIsMenuInsideDropDownToken } from 'ng-zorro-antd/menu';
import { Subject } from 'rxjs';

export type NzPlacementType = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

@Component({
  selector: `nz-dropdown-menu`,
  exportAs: `nzDropdownMenu`,
  animations: [slideMotion],
  providers: [
    MenuService,
    /** menu is inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropDownToken,
      useValue: true
    }
  ],
  template: `
    <ng-template>
      <div
        *ngIf="open"
        class="{{ 'ant-dropdown nz-dropdown ant-dropdown-placement-' + nzPlacement }}"
        [ngClass]="nzOverlayClassName"
        [ngStyle]="nzOverlayStyle"
        [@slideMotion]="dropDownPosition"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        (mouseenter)="setVisibleStateWhen(true, 'hover')"
        (mouseleave)="setVisibleStateWhen(false, 'hover')"
      >
        <div [class.ant-table-filter-dropdown]="nzTableFilter">
          <ng-content></ng-content>
        </div>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDropdownMenuComponent implements AfterContentInit {
  open = false;
  triggerWidth = 0;
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  visible$ = new Subject<boolean>();
  nzTrigger: 'click' | 'hover' = 'hover';
  nzPlacement: NzPlacementType = 'bottomLeft';
  nzOverlayClassName = '';
  nzOverlayStyle: { [key: string]: string } = {};
  nzTableFilter = false;
  @ViewChild(TemplateRef, { static: true }) templateRef: TemplateRef<NzSafeAny>;

  setVisibleStateWhen(visible: boolean, trigger: 'click' | 'hover' | 'all' = 'all'): void {
    if (this.nzTrigger === trigger || trigger === 'all') {
      this.visible$.next(visible);
    }
  }

  setValue<T extends keyof NzDropdownMenuComponent>(key: T, value: this[T]): void {
    this[key] = value;
    this.cdr.markForCheck();
  }

  constructor(
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    public viewContainerRef: ViewContainerRef,
    public nzMenuService: MenuService,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngAfterContentInit(): void {
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
  }
}
