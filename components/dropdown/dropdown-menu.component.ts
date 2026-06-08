/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  inject,
  type AnimationCallbackEvent
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NzNoAnimationDirective, slideAnimationEnter, slideAnimationLeave } from 'ng-zorro-antd/core/animation';
import { IndexableObject, NzSafeAny } from 'ng-zorro-antd/core/types';
import { MenuService, NzIsMenuInsideDropdownToken } from 'ng-zorro-antd/menu';

export type NzPlacementType = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

@Component({
  selector: `nz-dropdown-menu`,
  exportAs: `nzDropdownMenu`,
  providers: [
    MenuService,
    /** menu is inside dropdown-menu component **/
    {
      provide: NzIsMenuInsideDropdownToken,
      useValue: true
    }
  ],
  imports: [NzNoAnimationDirective],
  template: `
    <ng-template>
      <div
        class="ant-dropdown"
        [class.ant-dropdown-rtl]="dir() === 'rtl'"
        [class.ant-dropdown-show-arrow]="nzArrow"
        [class.ant-dropdown-placement-bottomLeft]="placement === 'bottomLeft'"
        [class.ant-dropdown-placement-bottomRight]="placement === 'bottomRight'"
        [class.ant-dropdown-placement-bottom]="placement === 'bottom'"
        [class.ant-dropdown-placement-topLeft]="placement === 'topLeft'"
        [class.ant-dropdown-placement-topRight]="placement === 'topRight'"
        [class.ant-dropdown-placement-top]="placement === 'top'"
        [class]="nzOverlayClassName"
        [style]="nzOverlayStyle"
        [animate.enter]="dropdownAnimationEnter()"
        [animate.leave]="dropdownAnimationLeave()"
        (animate.leave)="onAnimationEvent($event)"
        [nzNoAnimation]="!!noAnimation?.nzNoAnimation?.()"
        (mouseenter)="setMouseState(true)"
        (mouseleave)="setMouseState(false)"
      >
        @if (nzArrow) {
          <div class="ant-dropdown-arrow"></div>
        }
        <ng-content />
      </div>
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None
})
export class NzDropdownMenuComponent implements AfterContentInit {
  public readonly viewContainerRef = inject(ViewContainerRef);
  public readonly nzMenuService = inject(MenuService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef);
  private readonly renderer = inject(Renderer2);
  protected readonly dir = inject(Directionality).valueSignal;
  protected readonly noAnimation = inject(NzNoAnimationDirective, { host: true, optional: true });

  isChildSubMenuOpen$ = this.nzMenuService.isChildSubMenuOpen$;
  descendantMenuItemClick$ = this.nzMenuService.descendantMenuItemClick$;
  mouseState$ = new BehaviorSubject<boolean>(false);
  animationStateChange$ = new EventEmitter<AnimationCallbackEvent>();
  @ViewChild(TemplateRef, { static: true }) templateRef!: TemplateRef<NzSafeAny>;

  nzOverlayClassName: string = '';
  nzOverlayStyle: IndexableObject = {};
  nzArrow: boolean = false;
  placement: NzPlacementType | 'bottom' | 'top' = 'bottomLeft';

  protected readonly dropdownAnimationEnter = slideAnimationEnter();
  protected readonly dropdownAnimationLeave = slideAnimationLeave();

  onAnimationEvent(event: AnimationCallbackEvent): void {
    const element = event.target as HTMLElement;
    const onAnimationEnd = (): void => {
      element.removeEventListener('animationend', onAnimationEnd);
      this.animationStateChange$.emit(event);
    };
    element.addEventListener('animationend', onAnimationEnd);
  }

  setMouseState(visible: boolean): void {
    this.mouseState$.next(visible);
  }

  setValue<T extends keyof NzDropdownMenuComponent>(key: T, value: this[T]): void {
    this[key] = value;
    this.cdr.markForCheck();
  }

  ngAfterContentInit(): void {
    this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
  }
}
