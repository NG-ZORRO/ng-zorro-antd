/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzTreeNodeComponent } from './node';

/**
 * Flush the two-step animation-frame work used by tree expansion and CDK
 * virtual scroll: the first frame runs the scheduler callback, the second lets
 * Angular/CDK apply the resulting DOM and rendered-range updates.
 */
export async function waitForNextAnimationFrame(): Promise<void> {
  await new Promise(resolve => requestAnimationFrame(() => resolve(undefined)));
  await new Promise(resolve => requestAnimationFrame(() => resolve(undefined)));
}

/**
 * Finish initializing the virtual scroll component at the beginning of a test.
 * @param fixture Test Component include NzTreeVirtualScrollViewComponent
 */
export async function finishInit(fixture: ComponentFixture<NzSafeAny>): Promise<void> {
  // set the height of the viewport to 180px, the height of node to 30px.
  fixture.debugElement.nativeElement
    .querySelector('.cdk-virtual-scroll-viewport')!
    .setAttribute('style', 'height: 180px; width: 200px;');
  fixture.debugElement.queryAll(By.directive(NzTreeNodeComponent))!.map(node => {
    node.nativeElement.setAttribute('style', 'width: 100%; height: 30px;');
  });
  // render the viewport.
  await fixture.whenStable();

  // CDK emits an initial fake scroll event after the viewport receives size.
  await waitForNextAnimationFrame();
  await fixture.whenStable();
}

/**
 * Trigger a scroll event on the viewport (optionally setting a new scroll offset).
 * @param viewport virtual scroll viewport
 * @param offset scroll distance
 */
export async function triggerScroll(viewport: CdkVirtualScrollViewport, offset?: number): Promise<void> {
  const viewportElement = viewport.scrollable!.getElementRef().nativeElement;
  if (offset !== undefined) {
    viewport.scrollToOffset(offset);
    viewportElement.scrollTop = offset;
  }
  dispatchFakeEvent(viewportElement, 'scroll');
  await waitForNextAnimationFrame();
  // Rechecking the viewport size schedules another rendered-range pass.
  viewport.checkViewportSize();
  await waitForNextAnimationFrame();
}
