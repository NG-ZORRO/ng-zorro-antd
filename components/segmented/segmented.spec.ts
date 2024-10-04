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

    it('should emit when index changes', fakeAsync(() => {
      spyOn(component, 'handleIndexChange');

      const theFirstElement = getSegmentedOptionByIndex(0);
      expect(theFirstElement.classList.contains('ant-segmented-item-selected')).toBeTrue();

      const theThirdElement = getSegmentedOptionByIndex(2);
      dispatchMouseEvent(theThirdElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(component.index).toBe(2);
      expect(theFirstElement.classList.contains('ant-segmented-item-selected')).toBeFalse();
      expect(theThirdElement.classList.contains('ant-segmented-item-selected')).toBeTrue();
      expect(component.handleIndexChange).toHaveBeenCalledWith(2);
      expect(component.handleIndexChange).toHaveBeenCalledTimes(2);

      component.index = 1;
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      const theSecondElement = getSegmentedOptionByIndex(1);
      expect(segmentedComponent.componentInstance.selectedIndex).toBe(1);
      expect(component.handleIndexChange).toHaveBeenCalledTimes(2);
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
      expect(component.index).toBe(0);

      component.disabled = false;
      fixture.detectChanges();
      dispatchMouseEvent(theThirdElement.querySelector('.ant-segmented-item-label')!, 'click');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(component.index).toBe(2);

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
      expect(component.index).toBe(2);
    }));
  });
});

@Component({
  standalone: true,
  imports: [FormsModule, NzSegmentedModule],
  template: `
    <nz-segmented
      [nzSize]="size"
      [nzOptions]="options"
      [(ngModel)]="index"
      [nzDisabled]="disabled"
      [nzBlock]="block"
      (ngModelChange)="handleIndexChange($event)"
      (nzValueChange)="handleIndexChange($event)"
    ></nz-segmented>
  `
})
export class NzSegmentedTestComponent {
  size: NzSizeLDSType = 'default';
  options: NzSegmentedOptions = [1, 2, 3];
  index = 0;
  block = false;
  disabled = false;

  handleIndexChange(_e: number): void {
    // empty
  }
}
