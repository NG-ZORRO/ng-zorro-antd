/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  afterNextRender,
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  numberAttribute,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';

@Component({
  selector: 'nz-alert-marquee',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="ant-alert-marquee" [class.ant-alert-marquee-pause-on-hover]="nzPauseOnHover()">
      <div #track1 class="ant-alert-marquee-track" [style.animation-duration.s]="animationDuration()">
        <ng-content />
      </div>
      <div
        #track2
        class="ant-alert-marquee-track"
        aria-hidden="true"
        [style.animation-duration.s]="animationDuration()"
      ></div>
    </div>
  `
})
export class NzAlertMarqueeComponent {
  private readonly destroyRef = inject(DestroyRef);
  readonly nzPauseOnHover = input(false, { transform: booleanAttribute });
  readonly nzSpeed = input(50, { transform: numberAttribute });

  private readonly track1Ref = viewChild.required<ElementRef<HTMLElement>>('track1');
  private readonly track2Ref = viewChild.required<ElementRef<HTMLElement>>('track2');

  private readonly trackWidth = signal(0);

  protected readonly animationDuration = computed(() => {
    const width = this.trackWidth();
    const speed = this.nzSpeed();
    return width > 0 && speed > 0 ? width / speed : 20;
  });

  constructor() {
    afterNextRender(() => {
      const track1 = this.track1Ref().nativeElement;
      const track2 = this.track2Ref().nativeElement;
      const updateWidth = (): void => {
        this.trackWidth.set(track1.offsetWidth);
      };

      Array.from(track1.childNodes).forEach(node => {
        track2.appendChild(node.cloneNode(true));
      });

      updateWidth();

      if (typeof ResizeObserver !== 'undefined') {
        const resizeObserver = new ResizeObserver(updateWidth);
        resizeObserver.observe(track1);
        this.destroyRef.onDestroy(() => resizeObserver.disconnect());
      }
    });
  }
}
