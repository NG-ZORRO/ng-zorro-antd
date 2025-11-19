/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';
import { MenuService, NzIsMenuInsideDropdownToken } from 'ng-zorro-antd/menu';

export type NzPlacementType = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

@Component({
  selector: `nz-dropdown-menu`,
  exportAs: `nzDropdownMenu`,
  animations: [slideMotion],
  providers: [
    MenuService,
    /** menu is inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropdownToken,
      useValue: true
    }
  ],
  template: `
    <ng-template>
      <div
        class="ant-dropdown"
        [class.ant-dropdown-rtl]="dir === 'rtl'"
        [class.ant-dropdown-show-arrow]="nzArrow"
        [class.ant-dropdown-placement-bottomLeft]="placement === 'bottomLeft'"
        [class.ant-dropdown-placement-bottomRight]="placement === 'bottomRight'"
        [class.ant-dropdown-placement-bottom]="placement === 'bottom'"
        [class.ant-dropdown-placement-topLeft]="placement === 'topLeft'"
        [class.ant-dropdown-placement-topRight]="placement === 'topRight'"
        [class.ant-dropdown-placement-top]="placement === 'top'"
        [class]="nzOverlayClassName"
        [style]="nzOverlayStyle"
        @slideMotion
        (@slideMotion.done)="onAnimationEvent($event)"
        [@.disabled]="!!noAnimation?.nzNoAnimation"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        (mouseenter)="setMouseState(true)"
        (mouseleave)="setMouseState(false)"
      >
        @if (nzArrow) {
          <div class="ant-dropdown-arrow"></div>
        }
        <ng-content></ng-content>
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzNoAnimationDirective]
})
export class NzDropdownMenuComponent implements AfterContentInit, OnInit {
  private cdr = inject(ChangeDetectorRef);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  public viewContainerRef = inject(ViewContainerRef);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);
  noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });
  public nzMenuService = inject(MenuService);

  isChildSubMenuOpen$ = this.nzMenuService.isChildSubMenuOpen$;
  descendantMenuItemClick$ = this.nzMenuService.descendantMenuItemClick$;
  mouseState$ = new BehaviorSubject<boolean>(false);
  animationStateChange$ = new EventEmitter<AnimationEvent>();
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<NzSafeAny>;

  nzOverlayClassName: string = '';
  nzOverlayStyle: IndexableObject = {};
  nzArrow: boolean = false;
  placement: NzPlacementType | 'bottom' | 'top' = 'bottomLeft';
  dir: Direction = 'ltr';

  onAnimationEvent(event: AnimationEvent): void {
    this.animationStateChange$.emit(event);
  }

  setMouseState(visible: boolean): void {
    this.mouseState$.next(visible);
  }

  setValue<T extends keyof NzDropdownMenuComponent>(key: T, value: this[T]): void {
    this[key] = value;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterContentInit(): void {
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
  }
}
