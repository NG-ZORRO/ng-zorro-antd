/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentChecked,
  ChangeDetectorRef,
  DestroyRef,
  Directive,
  input,
  NgZone,
  PLATFORM_ID,
  PendingTasks,
  booleanAttribute,
  inject,
  numberAttribute,
  effect,
  computed,
  ElementRef,
  Renderer2
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { animationFrameScheduler, asapScheduler, debounceTime, finalize } from 'rxjs';

import { IconBase, RenderMeta, ThemeType } from '@ant-design/icons-angular';

import { warn } from 'ng-zorro-antd/core/logger';
import { wrapIntoObservable } from 'ng-zorro-antd/core/util';

import { NzIconPatchService, NzIconService } from './icon.service';

@Directive({
  selector: 'nz-icon,[nz-icon]',
  exportAs: 'nzIcon',
  host: {
    role: 'img',
    '[class]': `hostClass()`,
    '[attr.aria-label]': 'nzType()'
  }
})
export class NzIconDirective extends IconBase implements AfterContentChecked {
  private readonly ngZone = inject(NgZone);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly pendingTasks = inject(PendingTasks);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  protected readonly el = inject(ElementRef).nativeElement as HTMLElement;
  protected readonly renderer = inject(Renderer2);
  protected readonly iconService = inject(NzIconService);

  readonly nzType = input<string>();
  readonly nzTheme = input<ThemeType>();
  readonly nzTwotoneColor = input<string>();
  readonly nzSpin = input(false, { transform: booleanAttribute });
  readonly nzRotate = input(0, { transform: numberAttribute });
  readonly nzIconfont = input<string>();

  protected readonly hostClass = computed(() => {
    const type = this.nzType();
    const spin = this.nzSpin();
    const cls = ['anticon'];
    if (type) {
      cls.push(`anticon-${type}`);
    }
    if (spin || type === 'loading') {
      cls.push('anticon-spin');
    }
    return cls;
  });

  protected get selfRenderMeta(): RenderMeta {
    return {
      type: this.nzType() as string,
      theme: this.nzTheme(),
      twoToneColor: this.nzTwotoneColor()
    };
  }

  constructor() {
    super();
    inject(NzIconPatchService, { optional: true })?.doPatch();

    let renderedIcon = false;
    effect(() => {
      void this.nzType();
      void this.nzTwotoneColor();
      void this.nzTheme();
      // This is used to reduce the number of change detections
      // while the icon is being loaded asynchronously.
      if (this.nzType()) {
        renderedIcon = true;
        this.ngZone.runOutsideAngular(() => this.changeIcon2());
      } else if (renderedIcon) {
        renderedIcon = false;
        this._clearSVGElement();
      }
    });

    effect(() => {
      void this.nzRotate();
      this.handleRotate(this.el.firstChild as SVGElement | null);
    });

    effect(() => {
      const iconfont = this.nzIconfont();
      if (iconfont) {
        this._setSVGElement(this.iconService.createIconfontIcon(`#${iconfont}`));
      }
    });
  }

  /**
   * If custom content is provided, try to normalize SVG elements.
   */
  ngAfterContentChecked(): void {
    if (!this.nzType()) {
      const children = this.el.children;
      for (let index = children.length - 1; index >= 0; index--) {
        const child = children[index];
        if (child.tagName.toLowerCase() === 'svg') {
          this.iconService.normalizeSvgElement(child as SVGElement);
        }
      }
    }
  }

  /**
   * Replacement of `changeIcon` for more modifications.
   */
  private changeIcon2(): void {
    // It is used to hydrate the icon component properly when
    // zoneless change detection is used in conjunction with server-side rendering.
    const removeTask = this.pendingTasks.add();

    const svgOrRemove$ = wrapIntoObservable(this._changeIcon()).pipe(
      // We need to individually debounce the icon rendering on each animation
      // frame to prevent frame drops when many icons are being rendered on the
      // page, such as in a `@for` loop.
      debounceTime(0, this.isBrowser ? animationFrameScheduler : asapScheduler),
      takeUntilDestroyed(this.destroyRef),
      finalize(removeTask)
    );

    svgOrRemove$.subscribe({
      next: svg => {
        // Get back into the Angular zone after completing all the tasks.
        // Since we manually run change detection locally, we have to re-enter
        // the zone because the change detection might also be run on other local
        // components, leading them to handle template functions outside of the Angular zone.
        this.ngZone.run(() => {
          // The _changeIcon method would call Renderer to remove the element of the old icon,
          // which would call `markElementAsRemoved` eventually,
          // so we should call `detectChanges` to tell Angular remove the DOM node.
          // #7186
          this.changeDetectorRef.detectChanges();

          if (svg) {
            this.setSVGData(svg);
            this.handleRotate(svg);
          }
        });
      },
      error: warn
    });
  }

  private handleRotate(svg: SVGElement | null): void {
    if (!svg) {
      return;
    }

    const rotate = this.nzRotate();
    if (rotate) {
      this.renderer.setAttribute(svg, 'style', `transform: rotate(${rotate}deg)`);
    } else {
      this.renderer.removeAttribute(svg, 'style');
    }
  }

  private setSVGData(svg: SVGElement): void {
    this.renderer.setAttribute(svg, 'data-icon', this.nzType() as string);
    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
  }
}
