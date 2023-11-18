import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import {
  NzAlign,
  NzCustomGap,
  NzDirection,
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
  let element: HTMLElement;
  let testBed: ComponentBed<TestFlexComponent>;
  beforeEach(() => {
    testBed = createComponentBed(TestFlexComponent, { imports: [NzFlexModule] });
    element = testBed.debugElement.query(By.directive(NzFlexDirective)).nativeElement;
  });
  it('should apply className', () => {
    expect(element.className).toContain('ant-flex');
  });
  it('should have correct direction', () => {
    const listOfDirections: NzDirection[] = ['row', 'row-reverse', 'column', 'column-reverse'];
    listOfDirections.forEach(direction => {
      testBed.component.direction = direction;
      testBed.fixture.detectChanges();
      expect(element.className).toContain(direction);
    });
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
      testBed.component.justify = justification;
      testBed.fixture.detectChanges();
      expect(element.className).toContain(justification);
    });
  });
  it('should have correct alignment value', () => {
    const listOfAlignments: NzAlign[] = ['flex-start', 'center', 'flex-end', 'start', 'end', 'stretch', 'normal'];
    listOfAlignments.forEach(alignment => {
      testBed.component.align = alignment;
      testBed.fixture.detectChanges();
      expect(element.className).toContain(alignment);
    });
  });
  it('should have correct gap value', () => {
    const listOfGaps: NzGap[] = ['small', 'middle', 'large', 10, 20, 30, 40];
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
    const listOfWraps: NzWrap[] = ['wrap', 'nowrap', 'wrap-reverse'];
    listOfWraps.forEach(wrap => {
      testBed.component.wrap = wrap;
      testBed.fixture.detectChanges();
      expect(element.className).toContain(`flex-wrap-${wrap}`);
    });
  });
  it('should have correct flex value', () => {
    const listOfFlexes: NzFlex[] = ['0 0 auto', '1 1 100%', '0 1 50px', '1 0 50rem', '1 1 100%'];
    listOfFlexes.forEach(flex => {
      testBed.component.flex = flex;
      testBed.fixture.detectChanges();
      expect(getComputedStyle(element).getPropertyValue('--flex')).toEqual(flex);
    });
  });
  it('should have initial value for direction', () => {
    expect(element.className).toContain('row');
  });
  it('should have initial value for justification', () => {
    expect(element.className).toContain('normal');
  });
  it('should have initial value for alignment', () => {
    expect(element.className).toContain('normal');
  });
  it('should have initial value for gap', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex-gap')).toEqual('0px');
  });
  it('should have initial value for wrap', () => {
    expect(element.className).toContain('nowrap');
  });
  it('should have initial value for flex', () => {
    expect(getComputedStyle(element).getPropertyValue('--flex')).toEqual('');
  });
  it('should not have center class if not specified to be centered', () => {
    testBed.component.center = false;
    testBed.fixture.detectChanges();
    expect(element.className).not.toContain('center');
  });
  it('should have center class if not specified to be centered', () => {
    testBed.component.center = true;
    testBed.fixture.detectChanges();
    expect(element.className).toContain('center');
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
      [nzCenter]="center"
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
  align: 'flex-start' | 'center' | 'flex-end' | 'start' | 'end' | 'stretch' | 'normal' = 'normal';
  gap: 'small' | 'middle' | 'large' | NzCustomGap = 0;
  wrap: 'wrap' | 'nowrap' | 'wrap-reverse' = 'nowrap';
  flex: `${NzFlexShrink} ${NzFlexGrow} ${NzFlexBasis}` | 'unset' = 'unset';
  center = false;
}
