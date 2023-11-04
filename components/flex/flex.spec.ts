import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import {
  nzAlign,
  nzCustomGap,
  nzDirection,
  nzFlex,
  nzFlexBasis,
  nzFlexGrow,
  nzFlexShrink,
  nzGap,
  nzJustify,
  nzWrap
} from 'ng-zorro-antd/flex';
import { NzFlexModule } from 'ng-zorro-antd/flex/flex.module';
import { NzFlexDirective } from 'ng-zorro-antd/flex/nz-flex.directive';

describe('flex', () => {
  let element: HTMLElement;
  let testBed: ComponentBed<TestFlexComponent>;
  beforeEach(() => {
    testBed = createComponentBed(TestFlexComponent, { imports: [NzFlexModule] });
    element = testBed.debugElement.query(By.directive(NzFlexDirective)).nativeElement;
  });
  it('should apply className', () => {
    expect(element.className).toBe('ant-flex');
  });
  it('should have correct direction', () => {
    const listOfDirections: nzDirection[] = ['row', 'row-reverse', 'column', 'column-reverse'];
    listOfDirections.forEach(direction => {
      testBed.component.direction = direction;
      testBed.fixture.detectChanges();
      expect(getComputedStyle(element).getPropertyValue('--flex-direction')).toEqual(direction);
    });
  });
  it('should have correct justification value', () => {
    const listOfJustifications: nzJustify[] = [
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
      testBed.component.justify = justification;
      testBed.fixture.detectChanges();
      expect(getComputedStyle(element).getPropertyValue('--flex-justify')).toEqual(justification);
    });
  });
  it('should have correct alignment value', () => {
    const listOfAlignments: nzAlign[] = [
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
    listOfAlignments.forEach(alignment => {
      testBed.component.align = alignment;
      testBed.fixture.detectChanges();
      expect(getComputedStyle(element).getPropertyValue('--flex-align')).toEqual(alignment);
    });
  });
  it('should have correct gap value', () => {
    const listOfGaps: nzGap[] = ['small', 'middle', 'large', 10, 20, 30, 40];
    listOfGaps.forEach(gap => {
      testBed.component.gap = gap;
      testBed.fixture.detectChanges();
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

      expect(getComputedStyle(element).getPropertyValue('--flex-gap')).toEqual(gapValue);
    });
  });
  it('should have correct wrap value', () => {
    const listOfWraps: nzWrap[] = ['wrap', 'nowrap', 'wrap-reverse'];
    listOfWraps.forEach(wrap => {
      testBed.component.wrap = wrap;
      testBed.fixture.detectChanges();
      expect(getComputedStyle(element).getPropertyValue('--flex-wrap')).toEqual(wrap);
    });
  });
  it('should have correct flex value', () => {
    const listOfFlexes: nzFlex[] = ['0 0 auto', '1 1 100%', '0 1 50px', '1 0 50rem', '1 1 100%'];
    listOfFlexes.forEach(flex => {
      testBed.component.flex = flex;
      testBed.fixture.detectChanges();
      expect(getComputedStyle(element).getPropertyValue('--flex')).toEqual(flex);
    });
  });
  it('should have initial value for direction', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex-direction')).toEqual('row');
  });
  it('should have initial value for justification', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex-justify')).toEqual('normal');
  });
  it('should have initial value for alignment', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex-align')).toEqual('normal');
  });
  it('should have initial value for gap', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex-gap')).toEqual('0px');
  });
  it('should have initial value for wrap', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex-wrap')).toEqual('nowrap');
  });
  it('should have initial value for flex', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex')).toEqual('');
  });
});

@Component({
  template: `
    <div
      nz-flex
      [nzDirection]="direction"
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
  direction: 'row' | 'row-reverse' | 'column' | 'column-reverse' = 'row';
  justify:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'right'
    | 'left'
    | 'stretch'
    | 'normal' = 'normal';
  align:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'start'
    | 'end'
    | 'right'
    | 'left'
    | 'stretch'
    | 'normal' = 'normal';
  gap: 'small' | 'middle' | 'large' | nzCustomGap = 0;
  wrap: 'wrap' | 'nowrap' | 'wrap-reverse' = 'nowrap';
  flex: `${nzFlexShrink} ${nzFlexGrow} ${nzFlexBasis}` | 'unset' = 'unset';
}
