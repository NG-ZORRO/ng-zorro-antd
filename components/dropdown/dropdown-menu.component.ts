/**
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
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';
import { MenuService, NzIsMenuInsideDropDownToken } from 'ng-zorro-antd/menu';
import { BehaviorSubject } from 'rxjs';

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
        class="ant-dropdown"
        [ngClass]="nzOverlayClassName"
        [ngStyle]="nzOverlayStyle"
        [@slideMotion]="'enter'"
        [@.disabled]="noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        (mouseenter)="setMouseState(true)"
        (mouseleave)="setMouseState(false)"
      >
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzDropdownMenuComponent implements AfterContentInit {
  mouseState$ = new BehaviorSubject<boolean>(false);
  isChildSubMenuOpen$ = this.nzMenuService.isChildSubMenuOpen$;
  descendantMenuItemClick$ = this.nzMenuService.descendantMenuItemClick$;
  nzOverlayClassName: string = '';
  nzOverlayStyle: IndexableObject = {};
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<NzSafeAny>;

  setMouseState(visible: boolean): void {
    this.mouseState$.next(visible);
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
