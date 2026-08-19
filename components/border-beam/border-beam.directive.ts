/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isPlatformBrowser } from '@angular/common';
import {
  afterRenderEffect,
  booleanAttribute,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  numberAttribute,
  PLATFORM_ID
} from '@angular/core';

export interface NzBorderBeamGradientStop {
  color: string;
  percent: number;
}

export type NzBorderBeamColor = string | NzBorderBeamGradientStop[];

const DEFAULT_DURATION = 6;
const MAX_COLOR_STOP_PERCENT = 70;

function toCssUnit(value: number | string): string {
  return typeof value === 'number' ? `${value}px` : value;
}

function getInset(value: number | string): string {
  return typeof value === 'number' ? `-${value}px` : `calc(-1 * ${value})`;
}

function getBorderInset(host: HTMLElement): string {
  const { borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth } = getComputedStyle(host);
  return [borderTopWidth, borderRightWidth, borderBottomWidth, borderLeftWidth]
    .map(borderWidth => {
      const width = Number.parseFloat(borderWidth);
      return getInset(Number.isFinite(width) ? width : 0);
    })
    .join(' ');
}

function getGradient(color: NzBorderBeamColor | undefined): string | undefined {
  if (typeof color === 'string') {
    return `linear-gradient(to left, ${color} 0%, ${color} ${MAX_COLOR_STOP_PERCENT}%, transparent)`;
  }

  if (!color?.length) {
    return undefined;
  }

  const stops = [...color];
  const lastStop = stops.at(-1);
  if (lastStop && lastStop.percent !== 100) {
    stops.push({ ...lastStop, percent: 100 });
  }

  return `linear-gradient(to left, ${stops
    .map(stop => {
      const percent = Math.min(Math.max(stop.percent, 0), 100);
      return `${stop.color} ${Number(((percent / 100) * MAX_COLOR_STOP_PERCENT).toFixed(2))}%`;
    })
    .join(', ')}, transparent)`;
}

/**
 * Adds a decorative animated beam around the host element's border.
 */
@Directive({
  selector: '[nzBorderBeam]',
  exportAs: 'nzBorderBeam',
  host: {
    class: 'ant-border-beam-host'
  }
})
export class NzBorderBeamDirective {
  private readonly host = inject(ElementRef<HTMLElement>).nativeElement;
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly destroyRef = inject(DestroyRef);
  private readonly beamElements: HTMLSpanElement[] = [];

  readonly nzBorderBeam = input(true, { transform: booleanAttribute });
  readonly nzBorderBeamColor = input<NzBorderBeamColor>();
  readonly nzBorderBeamCount = input(1, { transform: numberAttribute });
  readonly nzBorderBeamDuration = input(DEFAULT_DURATION, { transform: numberAttribute });
  readonly nzBorderBeamLineWidth = input<number | string>(1);
  readonly nzBorderBeamOutset = input<number | string>();
  readonly nzBorderBeamSize = input<number | string>(100);

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    afterRenderEffect({
      mixedReadWrite: () => this.render()
    });

    this.destroyRef.onDestroy(() => this.removeBeams());
  }

  private render(): void {
    if (!this.nzBorderBeam()) {
      this.removeBeams();
      return;
    }

    const count = this.getCount();
    this.syncBeamCount(count);

    const duration = this.nzBorderBeamDuration();
    const mergedDuration = Number.isFinite(duration) && duration > 0 ? duration : DEFAULT_DURATION;
    const outset = this.nzBorderBeamOutset();
    const inset = outset === undefined ? getBorderInset(this.host) : getInset(outset);
    const gradient = getGradient(this.nzBorderBeamColor());

    this.beamElements.forEach((beam, index) => {
      beam.style.setProperty('--nz-border-beam-inset-offset', inset);
      beam.style.setProperty('--nz-border-beam-duration', `${mergedDuration}s`);
      beam.style.setProperty('--nz-border-beam-line-width', toCssUnit(this.nzBorderBeamLineWidth()));
      beam.style.setProperty('--nz-border-beam-size', toCssUnit(this.nzBorderBeamSize()));
      beam.style.setProperty('--nz-border-beam-delay', `${(-mergedDuration * index) / count}s`);

      if (gradient) {
        beam.style.setProperty('--nz-border-beam-gradient', gradient);
      } else {
        beam.style.removeProperty('--nz-border-beam-gradient');
      }
    });
  }

  private getCount(): number {
    const count = this.nzBorderBeamCount();
    return Number.isFinite(count) && count >= 1 ? Math.floor(count) : 1;
  }

  private syncBeamCount(count: number): void {
    while (this.beamElements.length > count) {
      this.beamElements.pop()?.remove();
    }

    while (this.beamElements.length < count) {
      const beam = document.createElement('span');
      beam.className = 'ant-border-beam';
      beam.setAttribute('aria-hidden', 'true');
      this.host.append(beam);
      this.beamElements.push(beam);
    }
  }

  private removeBeams(): void {
    this.beamElements.splice(0).forEach(beam => beam.remove());
  }
}
