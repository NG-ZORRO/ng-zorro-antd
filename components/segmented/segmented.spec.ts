/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { NzSegmentedComponent } from './segmented.component';
import { NzSegmentedModule } from './segmented.module';
import { NzSegmentedOptions } from './types';

describe('nz-segmented', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<NzSegmentedTestComponent>;
    let component: NzSegmentedTestComponent;
    let segmentedComponent: DebugElement;

    function getSegmentedOptionByIndex(index: number): HTMLElement {
      return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNoopAnimations()]
      });
      fixture = TestBed.createComponent(NzSegmentedTestComponent);
      component = fixture.componentInstance;
      segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));
      fixture.detectChanges();
    });

    it('should support block mode', () => {
      expect((segmentedComponent.nativeElement as HTMLElement).classList.contains('ant-segmented-block')).toBeFalse();
      component.block = true;
      fixture.detectChanges();
      expect((segmentedComponent.nativeElement as HTMLElement).classList.contains('ant-segmented-block')).toBeTrue();
    });

    it('should be auto selected the first option', async () => {
      const theFirstElement = getSegmentedOptionByIndex(0);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(component.value).toBe(1);
      expect(theFirstElement.classList.contains('ant-segmented-item-selected')).toBeTrue();
    });

    it('should emit when value changes', fakeAsync(() => {
      spyOn(component, 'handleValueChange');

      const theFirstElement = getSegmentedOptionByIndex(0);
      const theThirdElement = getSegmentedOptionByIndex(2);
      dispatchMouseEvent(theThirdElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(component.value).toBe(3);
      expect(theFirstElement.classList.contains('ant-segmented-item-selected')).toBeFalse();
      expect(theThirdElement.classList.contains('ant-segmented-item-selected')).toBeTrue();
      expect(component.handleValueChange).toHaveBeenCalledWith(3);
      expect(component.handleValueChange).toHaveBeenCalledTimes(1);

      component.value = 2;
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      const theSecondElement = getSegmentedOptionByIndex(1);
      expect(segmentedComponent.componentInstance.value).toBe(2);
      expect(component.handleValueChange).toHaveBeenCalledTimes(2);
      expect(theSecondElement.classList.contains('ant-segmented-item-selected')).toBeTrue();
    }));

    it('should support disabled mode', fakeAsync(() => {
      component.disabled = true;
      fixture.detectChanges();

      const theThirdElement = getSegmentedOptionByIndex(2);
      dispatchMouseEvent(theThirdElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(component.value).toBe(1);

      component.disabled = false;
      fixture.detectChanges();
      dispatchMouseEvent(theThirdElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(component.value).toBe(3);

      component.options = [
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
      expect(component.value).toBe('Daily');
    }));
  });
});

@Component({
  imports: [FormsModule, NzSegmentedModule],
  template: `
    <nz-segmented
      [nzSize]="size"
      [nzOptions]="options"
      [(ngModel)]="value"
      [nzDisabled]="disabled"
      [nzBlock]="block"
      (nzValueChange)="handleValueChange($event)"
    ></nz-segmented>
  `
})
export class NzSegmentedTestComponent {
  size: NzSizeLDSType = 'default';
  options: NzSegmentedOptions = [1, 2, 3];
  value?: number | string;
  block = false;
  disabled = false;

  handleValueChange(_e: string | number): void {
    // empty
  }
}
