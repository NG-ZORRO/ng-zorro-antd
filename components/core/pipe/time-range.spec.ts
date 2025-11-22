/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzPipesModule } from 'ng-zorro-antd/core/pipe';

@Component({
  imports: [NzPipesModule],
  template: ` {{ diff | nzTimeRange: format }} `
})
export class NzTestTimeRangeComponent {
  diff = 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  format = 'HH:mm:ss';
}

describe('nzTimeRange', () => {
  let fixture: ComponentFixture<NzTestTimeRangeComponent>;
  let testComponent: NzTestTimeRangeComponent;
  let element: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestTimeRangeComponent);
    testComponent = fixture.debugElement.componentInstance;
    element = fixture.debugElement.nativeElement;
  });

  it('should render time correctly with different formats', async () => {
    await fixture.whenStable();
    expect(element.innerText).toBe('48:00:30');

    testComponent.format = 'HH:mm';
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(element.innerText).toBe('48:00');

    testComponent.format = 'D 天 H 时 m 分 s 秒';
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(element.innerText).toBe('2 天 0 时 0 分 30 秒');
  });

  it('should render time correctly with different values', async () => {
    testComponent.diff = 0;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(element.innerText).toBe('00:00:00');

    testComponent.diff = -1000 * 60 * 60 * 24 * 2 + 1000 * 30;
    fixture.changeDetectorRef.markForCheck();
    await fixture.whenStable();
    expect(element.innerText).toBe('-48:00:30');
  });
});
