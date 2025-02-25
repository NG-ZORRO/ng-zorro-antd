/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentChecked,
  ChangeDetectorRef,
  Directive,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges,
  booleanAttribute,
  inject,
  numberAttribute
} from '@angular/core';
import { Subject, from } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { IconDirective, ThemeType } from '@ant-design/icons-angular';

import { warn } from 'ng-zorro-antd/core/logger';

import { NzIconPatchService, NzIconService } from './icon.service';

@Directive({
  selector: 'nz-icon,[nz-icon]',
  exportAs: 'nzIcon',
  host: {
    class: 'anticon'
  }
})
export class NzIconDirective extends IconDirective implements OnChanges, AfterContentChecked, OnDestroy {
  cacheClassName: string | null = null;
  @Input({ transform: booleanAttribute })
  set nzSpin(value: boolean) {
    this.spin = value;
  }

  @Input({ transform: numberAttribute }) nzRotate: number = 0;

  @Input()
  set nzType(value: string) {
    this.type = value;
  }

  @Input()
  set nzTheme(value: ThemeType) {
    this.theme = value;
  }

  @Input()
  set nzTwotoneColor(value: string) {
    this.twoToneColor = value;
  }

  @Input()
  set nzIconfont(value: string) {
    this.iconfont = value;
  }

  hostClass?: string;

  private readonly el: HTMLElement;
  private iconfont?: string;
  private spin: boolean = false;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly ngZone: NgZone,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public readonly iconService: NzIconService,
    public readonly renderer: Renderer2
  ) {
    super(iconService);

    const iconPatch = inject(NzIconPatchService, { optional: true });
    if (iconPatch) {
      iconPatch.doPatch();
    }

    this.el = this._elementRef.nativeElement;
  }

  override ngOnChanges(changes: SimpleChanges): void {
    const { nzType, nzTwotoneColor, nzSpin, nzTheme, nzRotate } = changes;

    if (nzType || nzTwotoneColor || nzSpin || nzTheme) {
      this.changeIcon2();
    } else if (nzRotate) {
      this.handleRotate(this.el.firstChild as SVGElement);
    } else {
      this._setSVGElement(this.iconService.createIconfontIcon(`#${this.iconfont}`));
    }
  }

  /**
   * If custom content is provided, try to normalize SVG elements.
   */
  ngAfterContentChecked(): void {
    if (!this.type) {
      const children = this.el.children;
      let length = children.length;
      if (!this.type && children.length) {
        while (length--) {
          const child = children[length];
          if (child.tagName.toLowerCase() === 'svg') {
            this.iconService.normalizeSvgElement(child as SVGElement);
          }
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  /**
   * Replacement of `changeIcon` for more modifications.
   */
  private changeIcon2(): void {
    this.setClassName();

    // The Angular zone is left deliberately before the SVG is set
    // since `_changeIcon` spawns asynchronous tasks as promise and
    // HTTP calls. This is used to reduce the number of change detections
    // while the icon is being loaded dynamically.
    this.ngZone.runOutsideAngular(() => {
      from(this._changeIcon())
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: svgOrRemove => {
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

              if (svgOrRemove) {
                this.setSVGData(svgOrRemove);
                this.handleSpin(svgOrRemove);
                this.handleRotate(svgOrRemove);
              }
            });
          },
          error: warn
        });
    });
  }

  private handleSpin(svg: SVGElement): void {
    if (this.spin || this.type === 'loading') {
      this.renderer.addClass(svg, 'anticon-spin');
    } else {
      this.renderer.removeClass(svg, 'anticon-spin');
    }
  }

  private handleRotate(svg: SVGElement): void {
    if (this.nzRotate) {
      this.renderer.setAttribute(svg, 'style', `transform: rotate(${this.nzRotate}deg)`);
    } else {
      this.renderer.removeAttribute(svg, 'style');
    }
  }

  private setClassName(): void {
    if (this.cacheClassName) {
      this.renderer.removeClass(this.el, this.cacheClassName);
    }
    this.cacheClassName = `anticon-${this.type}`;
    this.renderer.addClass(this.el, this.cacheClassName);
  }

  private setSVGData(svg: SVGElement): void {
    this.renderer.setAttribute(svg, 'data-icon', this.type as string);
    this.renderer.setAttribute(svg, 'aria-hidden', 'true');
  }
}
