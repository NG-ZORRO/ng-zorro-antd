/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  signal,
  untracked,
  ViewEncapsulation
} from '@angular/core';

import { NZ_TOUR_MASK_GAP_DEFAULT } from 'ng-zorro-antd/tour/types';

type HoleRect = { x: number; y: number; width: number; height: number } | null;

const getRandomId = (): string => Math.random().toString(36).slice(2);

@Component({
  selector: 'nz-tour-mask',
  template: `
    <div
      class="ant-tour-mask"
      [style.zIndex]="zIndex()"
      [style.pointerEvents]="holeRect() && !disabledInteraction() ? 'none' : 'auto'"
    >
      <svg [style.width]="'100%'" [style.height]="'100%'">
        <defs>
          <mask [attr.id]="maskId">
            <rect x="0" y="0" [attr.width]="maskRectSize.width" [attr.height]="maskRectSize.height" fill="white" />
            @if (holeRect(); as r) {
              <rect
                [attr.x]="r.x"
                [attr.y]="r.y"
                [attr.width]="r.width"
                [attr.height]="r.height"
                fill="black"
                [attr.rx]="radius()"
                [attr.ry]="radius()"
                [class.ant-tour-placeholder-animated]="animated()"
              />
            }
          </mask>
        </defs>

        <!-- dim background with hole -->
        <rect x="0" y="0" width="100%" height="100%" [attr.fill]="fill()" [attr.mask]="maskUrl" />

        <!-- Block click region: capture clicks outside the hole when interaction is enabled for the hole -->
        @if (holeRect(); as r) {
          <!-- Top -->
          <rect fill="transparent" [attr.pointer-events]="'auto'" x="0" y="0" width="100%" [attr.height]="max0(r.y)" />
          <!-- Left -->
          <rect fill="transparent" [attr.pointer-events]="'auto'" x="0" y="0" [attr.width]="max0(r.x)" height="100%" />
          <!-- Bottom -->
          <rect
            fill="transparent"
            [attr.pointer-events]="'auto'"
            x="0"
            [attr.y]="r.y + r.height"
            width="100%"
            [attr.height]="calc100Minus(r.y + r.height)"
          />
          <!-- Right -->
          <rect
            fill="transparent"
            [attr.pointer-events]="'auto'"
            [attr.x]="r.x + r.width"
            y="0"
            [attr.width]="calc100Minus(r.x + r.width)"
            height="100%"
          />
        }
      </svg>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '(window:resize)': 'computeHoleRect()',
    '(window:scroll)': 'computeHoleRect()'
  }
})
export class NzTourMaskComponent {
  // Inputs (signals)
  zIndex = input.required<number>();
  target = input<HTMLElement | null>(null);
  padding = input<number | [number, number]>(NZ_TOUR_MASK_GAP_DEFAULT.offset);
  radius = input(NZ_TOUR_MASK_GAP_DEFAULT.radius);
  fill = input('rgba(0,0,0,0.5)');
  disabledInteraction = input(false, { transform: booleanAttribute });
  animated = input(false, { transform: booleanAttribute });

  // Derived state
  private readonly id = getRandomId();
  readonly maskId = `ant-tour-mask-${this.id}`;
  readonly maskUrl = `url(#${this.maskId})`;

  private readonly isSafari =
    typeof navigator !== 'undefined' && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  readonly maskRectSize = this.isSafari ? { width: '100%', height: '100%' } : { width: '100vw', height: '100vh' };

  // Hole rectangle (x, y in viewport, width/height)
  protected readonly holeRect = signal<HoleRect>(null);

  protected readonly max0 = (v: number): number => Math.max(0, v);
  // Utility bindings for SVG calc strings
  protected readonly calc100Minus = (v: number): string => `calc(100% - ${Math.max(0, v)}px)`;

  constructor() {
    // Recompute when inputs change (Angular will call this via change detection; we just read the latest values)
    effect(() => {
      void this.target();
      void this.padding();
      untracked(() => this.computeHoleRect());
    });
  }

  protected computeHoleRect(): void {
    const el = this.target();
    if (!el || !(el instanceof Element)) {
      this.holeRect.set(null);
      return;
    }
    const rect = el.getBoundingClientRect();
    const padding = this.padding();
    const [px, py] = Array.isArray(padding) ? padding : [padding, padding];
    this.holeRect.set({
      x: Math.max(0, rect.left - px),
      y: Math.max(0, rect.top - py),
      width: Math.max(0, rect.width + py * 2),
      height: Math.max(0, rect.height + py * 2)
    });
  }
}
