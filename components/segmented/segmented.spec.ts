import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';

import { NzSegmentedComponent } from './segmented.component';
import { NzSegmentedModule } from './segmented.module';
import { NzSegmentedOptions } from './types';

describe('nz-segmented', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzSegmentedTestComponent>;
    let fixture: ComponentFixture<NzSegmentedTestComponent>;
    let testComponent: NzSegmentedTestComponent;
    let segmentedComponent: DebugElement;

    function getSegmentedOptionByIndex(index: number): HTMLElement {
      return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
    }

    // function getSegmentedLabelByIndex(index: number): HTMLElement {
    //   return segmentedComponent.nativeElement
    //     .querySelectorAll('.ant-segmented-item')
    //     [index].querySelector('.ant-segmented-item-label');
    // }

    beforeEach(() => {
      testBed = createComponentBed(NzSegmentedTestComponent, {
        imports: [NzSegmentedModule, FormsModule]
      });

      fixture = testBed.fixture;
      testComponent = testBed.component;
      segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));

      fixture.detectChanges();
    });

    it('should support block mode', () => {
      expect((segmentedComponent.nativeElement as HTMLElement).classList.contains('ant-segmented-block')).toBeFalse();
      testComponent.block = true;
      fixture.detectChanges();
      expect((segmentedComponent.nativeElement as HTMLElement).classList.contains('ant-segmented-block')).toBeTrue();
    });

    it('should emit when index changes', fakeAsync(() => {
      spyOn(testComponent, 'handleIndexChange');

      const theFirstElement = getSegmentedOptionByIndex(0);
      expect(theFirstElement.classList.contains('ant-segmented-item-selected')).toBeTrue();

      const theThirdElement = getSegmentedOptionByIndex(2);
      dispatchMouseEvent(theThirdElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(testComponent.index).toBe(2);
      expect(theFirstElement.classList.contains('ant-segmented-item-selected')).toBeFalse();
      expect(theThirdElement.classList.contains('ant-segmented-item-selected')).toBeTrue();
      expect(testComponent.handleIndexChange).toHaveBeenCalledWith(2);
      expect(testComponent.handleIndexChange).toHaveBeenCalledTimes(2);

      testComponent.index = 1;
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      const theSecondElement = getSegmentedOptionByIndex(1);
      expect(segmentedComponent.componentInstance.selectedIndex).toBe(1);
      expect(testComponent.handleIndexChange).toHaveBeenCalledTimes(2);
      expect(theSecondElement.classList.contains('ant-segmented-item-selected')).toBeTrue();
    }));

    it('should support disabled mode', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();

      const theThirdElement = getSegmentedOptionByIndex(2);
      dispatchMouseEvent(theThirdElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(testComponent.index).toBe(0);

      testComponent.disabled = false;
      fixture.detectChanges();
      dispatchMouseEvent(theThirdElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(testComponent.index).toBe(2);

      testComponent.options = [
        'Daily',
        { label: 'Weekly', value: 'Weekly', disabled: true },
        'Monthly',
        { label: 'Quarterly', value: 'Quarterly', disabled: true },
        'Yearly'
      ];
      fixture.detectChanges();

      const theSecondElement = getSegmentedOptionByIndex(1);
      dispatchMouseEvent(theSecondElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(testComponent.index).toBe(2);
    }));
  });
});

@Component({
  template: `<nz-segmented
    [nzSize]="size"
    [nzOptions]="options"
    [(ngModel)]="index"
    [nzDisabled]="disabled"
    [nzBlock]="block"
    (ngModelChange)="handleIndexChange($event)"
    (nzValueChange)="handleIndexChange($event)"
  ></nz-segmented>`
})
export class NzSegmentedTestComponent {
  size = 'default';
  options: NzSegmentedOptions = [1, 2, 3];
  index = 0;
  block = false;
  disabled = false;

  handleIndexChange(_e: number): void {
    // empty
  }
}
