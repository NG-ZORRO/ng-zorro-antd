/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {
  NzAlign,
  NzCustomGap,
  NzFlex,
  NzFlexBasis,
  NzFlexGrow,
  NzFlexShrink,
  NzGap,
  NzJustify,
  NzWrap
} from 'ng-zorro-antd/flex';
import { NzFlexModule } from 'ng-zorro-antd/flex/flex.module';
import { NzFlexDirective } from 'ng-zorro-antd/flex/nz-flex.directive';

describe('flex', () => {
  let fixture: ComponentFixture<TestFlexComponent>;
  let component: TestFlexComponent;
  let element: HTMLElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestFlexComponent);
    element = fixture.debugElement.query(By.directive(NzFlexDirective)).nativeElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should apply className', () => {
    expect(element.className).toContain('ant-flex');
  });

  it('should have correct direction', () => {
    component.isVertical = false;
    fixture.detectChanges();
    expect(element.className).not.toContain('vertical');
    component.isVertical = true;
    fixture.detectChanges();
    expect(element.className).toContain('vertical');
  });

  it('should have correct justification value', () => {
    const listOfJustifications: NzJustify[] = [
      'flex-start',
      'center',
      'flex-end',
      'space-between',
      'space-around',
      'space-evenly',
      'start',
      'end',
      'right',
      'left',
      'stretch',
      'normal'
    ];
    listOfJustifications.forEach(justification => {
      component.justify = justification;
      fixture.detectChanges();
      expect(element.className).toContain(justification);
    });
  });

  it('should have correct alignment value', () => {
    const listOfAlignments: NzAlign[] = ['flex-start', 'center', 'flex-end', 'start', 'end', 'stretch', 'normal'];
    listOfAlignments.forEach(alignment => {
      component.align = alignment;
      fixture.detectChanges();
      expect(element.className).toContain(alignment);
    });
  });

  it('should have correct gap value', () => {
    const listOfGaps: NzGap[] = ['small', 'middle', 'large', 10, 20, 30, 40];
    listOfGaps.forEach(gap => {
      component.gap = gap;
      fixture.detectChanges();
      let gapValue: string;
      switch (gap) {
        case 'small':
          gapValue = '8px';
          break;
        case 'middle':
          gapValue = '16px';
          break;
        case 'large':
          gapValue = '24px';
          break;
        default:
          gapValue = `${gap}px`;
      }

      expect(getComputedStyle(element).getPropertyValue('gap')).toEqual(gapValue);
    });

    component.gap = '10rem';
    fixture.detectChanges();
    expect(getComputedStyle(element).getPropertyValue('gap')).toEqual(`${10 * 16}px`);
  });

  it('should have correct wrap value', () => {
    const listOfWraps: NzWrap[] = ['wrap', 'nowrap', 'wrap-reverse'];
    listOfWraps.forEach(wrap => {
      component.wrap = wrap;
      fixture.detectChanges();
      expect(element.className).toContain(`flex-wrap-${wrap}`);
    });
  });

  it('should have correct flex value', () => {
    const listOfFlexes: NzFlex[] = ['0 0 auto', '1 1 100%', '0 1 50px'];
    listOfFlexes.forEach(flex => {
      component.flex = flex;
      fixture.detectChanges();
      expect(getComputedStyle(element).getPropertyValue('flex')).toEqual(flex);
    });

    component.flex = '1 0 50rem';
    fixture.detectChanges();
    expect(getComputedStyle(element).getPropertyValue('flex')).toEqual('1 0 800px');
  });

  it('should have initial value for nzVertical', () => {
    expect(element.className).not.toContain('vertical');
  });

  it('should have initial value for justification', () => {
    expect(element.className).toContain('normal');
  });

  it('should have initial value for alignment', () => {
    expect(element.className).toContain('normal');
  });

  it('should have initial value for gap', () => {
    expect(getComputedStyle(element).getPropertyValue('gap')).toEqual('0px');
  });

  it('should have initial value for wrap', () => {
    expect(element.className).toContain('nowrap');
  });

  it('should have initial value for flex', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex')).toEqual('');
  });
});

@Component({
  imports: [NzFlexModule],
  template: `
    <div
      nz-flex
      [nzVertical]="isVertical"
      [nzJustify]="justify"
      [nzAlign]="align"
      [nzGap]="gap"
      [nzWrap]="wrap"
      [nzFlex]="flex"
    >
      <div></div>
      <div></div>
      <div></div>
    </div>
  `
})
export class TestFlexComponent {
  isVertical = false;
  justify: NzJustify = 'normal';
  align: NzAlign = 'normal';
  gap: 'small' | 'middle' | 'large' | NzCustomGap = 0;
  wrap: 'wrap' | 'nowrap' | 'wrap-reverse' = 'nowrap';
  flex: `${NzFlexShrink} ${NzFlexGrow} ${NzFlexBasis}` | 'unset' = 'unset';
}
