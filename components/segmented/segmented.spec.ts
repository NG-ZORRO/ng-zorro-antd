/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { NzSegmentedComponent } from './segmented.component';
import { NzSegmentedModule } from './segmented.module';
import { NzSegmentedOptions } from './types';

describe('nz-segmented', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzSegmentedTestComponent>;
    let component: NzSegmentedTestComponent;
    let segmentedComponent: DebugElement;

    function getSegmentedOptionByIndex(index: number): HTMLElement {
      return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(NzSegmentedTestComponent);
      component = fixture.componentInstance;
      spyOn(component, 'handleValueChange');
      segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));
      fixture.detectChanges();
    });

    it('should support block mode', () => {
      const segmentedElement: HTMLElement = segmentedComponent.nativeElement;
      expect(segmentedElement.classList).not.toContain('ant-segmented-block');
      component.block = true;
      fixture.detectChanges();
      expect(segmentedElement.classList).toContain('ant-segmented-block');
    });

    it('should support size', () => {
      const segmentedElement: HTMLElement = segmentedComponent.nativeElement;
      component.size = 'large';
      fixture.detectChanges();
      expect(segmentedElement.classList).toContain('ant-segmented-lg');
      component.size = 'small';
      fixture.detectChanges();
      expect(segmentedElement.classList).toContain('ant-segmented-sm');
    });

    it('should support vertical mode', () => {
      const segmentedElement: HTMLElement = segmentedComponent.nativeElement;
      expect(segmentedElement.classList).not.toContain('ant-segmented-vertical');
      component.vertical = true;
      fixture.detectChanges();
      expect(segmentedElement.classList).toContain('ant-segmented-vertical');
    });

    it('should be auto selected the first option when if no value is set', async () => {
      const theFirstElement = getSegmentedOptionByIndex(0);
      await fixture.whenStable();
      fixture.detectChanges();
      expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
    });

    it('should be change the value and emit an event by clicking', async () => {
      const theFirstElement = getSegmentedOptionByIndex(0);
      const theSecondElement = getSegmentedOptionByIndex(1);

      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      expect(component.handleValueChange).toHaveBeenCalledTimes(0);

      dispatchMouseEvent(theSecondElement, 'click');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
      expect(theSecondElement.classList).toContain('ant-segmented-item-selected');
      expect(component.handleValueChange).toHaveBeenCalledTimes(1);
      expect(component.handleValueChange).toHaveBeenCalledWith(2);
    });

    it('should support object options', async () => {
      component.options = [
        'Daily',
        { label: 'Weekly', value: 'Weekly', disabled: true },
        'Monthly',
        { label: 'Quarterly', value: 'Quarterly', disabled: true },
        'Yearly'
      ];
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      const theFirstElement = getSegmentedOptionByIndex(0);
      const theSecondElement = getSegmentedOptionByIndex(1);
      const theThirdElement = getSegmentedOptionByIndex(2);

      expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');

      dispatchMouseEvent(theSecondElement, 'click');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');

      dispatchMouseEvent(theThirdElement, 'click');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
      expect(theThirdElement.classList).toContain('ant-segmented-item-selected');
    });

    it('should support disabled mode', async () => {
      const theFirstElement = getSegmentedOptionByIndex(0);
      const theSecondElement = getSegmentedOptionByIndex(1);

      component.disabled = true;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      dispatchMouseEvent(theSecondElement, 'click');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
    });

    it('should animate thumb correctly in vertical mode', fakeAsync(() => {
      component.vertical = true;
      fixture.detectChanges();

      const segmentedComponentInstance = fixture.debugElement.query(
        By.directive(NzSegmentedComponent)
      ).componentInstance;

      expect(segmentedComponentInstance.nzVertical).toBe(true);

      const theSecondElement = getSegmentedOptionByIndex(1);

      tick(100);
      fixture.detectChanges();

      dispatchMouseEvent(theSecondElement, 'click');
      tick(100);
      fixture.detectChanges();

      expect(theSecondElement.classList).toContain('ant-segmented-item-selected');
      expect(segmentedComponentInstance.animationState).toBeDefined();

      if (segmentedComponentInstance.animationState) {
        expect(['fromVertical', 'toVertical']).toContain(segmentedComponentInstance.animationState.value);
      }
    }));
  });

  describe('icon-only', () => {
    let fixture: ComponentFixture<NzSegmentedIconOnlyTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzSegmentedIconOnlyTestComponent);
    });

    it('should render only one element in .ant-segmented-item-label if the item is icon-only', () => {
      const items = fixture.debugElement.queryAll(By.css('.ant-segmented-item-label'));
      expect(items.length).toBe(2);
      expect(items[0].children.length).toBe(2);
      expect(items[0].children[0].nativeElement.classList).toContain('ant-segmented-item-icon');
      expect(items[0].children[1].nativeElement.tagName).toBe('SPAN');
      expect(items[1].children.length).toBe(1);
      expect(items[1].children[0].nativeElement.classList).toContain('ant-segmented-item-icon');
    });
  });

  describe('ng model', () => {
    let fixture: ComponentFixture<NzSegmentedNgModelTestComponent>;
    let component: NzSegmentedNgModelTestComponent;
    let segmentedComponent: DebugElement;

    function getSegmentedOptionByIndex(index: number): HTMLElement {
      return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(NzSegmentedNgModelTestComponent);
      component = fixture.componentInstance;
      spyOn(component, 'handleValueChange');
      segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));
      fixture.detectChanges();
    });

    it('should be support two-way binding', async () => {
      const theFirstElement = getSegmentedOptionByIndex(0);
      const theSecondElement = getSegmentedOptionByIndex(1);

      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      expect(component.handleValueChange).toHaveBeenCalledTimes(0);

      component.value = 2;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
      expect(theSecondElement.classList).toContain('ant-segmented-item-selected');
      expect(component.handleValueChange).toHaveBeenCalledTimes(0);

      dispatchMouseEvent(theFirstElement, 'click');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
      expect(component.value).toBe(1);
      expect(component.handleValueChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('reactive form', () => {
    let fixture: ComponentFixture<NzSegmentedInReactiveFormTestComponent>;
    let component: NzSegmentedInReactiveFormTestComponent;
    let segmentedComponent: DebugElement;

    function getSegmentedOptionByIndex(index: number): HTMLElement {
      return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(NzSegmentedInReactiveFormTestComponent);
      component = fixture.componentInstance;
      segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));
      fixture.detectChanges();
    });

    it('first change form control value should work', async () => {
      const theSecondElement = getSegmentedOptionByIndex(1);
      const theThirdElement = getSegmentedOptionByIndex(2);

      expect(component.formControl.value).toBe('Weekly');

      dispatchMouseEvent(theThirdElement, 'click');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
      expect(theThirdElement.classList).toContain('ant-segmented-item-selected');
    });
  });

  describe('vertical segmented', () => {
    let fixture: ComponentFixture<NzSegmentedVerticalTestComponent>;
    let component: NzSegmentedVerticalTestComponent;
    let segmentedComponent: DebugElement;

    function getSegmentedOptionByIndex(index: number): HTMLElement {
      return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(NzSegmentedVerticalTestComponent);
      component = fixture.componentInstance;
      spyOn(component, 'handleValueChange');
      segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));
      fixture.detectChanges();
    });

    it('should render in vertical mode', () => {
      const segmentedElement: HTMLElement = segmentedComponent.nativeElement;
      expect(segmentedElement.classList).toContain('ant-segmented-vertical');
      const groupElement = segmentedElement.querySelector('.ant-segmented-group') as HTMLElement;
      expect(groupElement).toBeTruthy();
    });

    it('should change selection in vertical mode', async () => {
      const theFirstElement = getSegmentedOptionByIndex(0);
      const theSecondElement = getSegmentedOptionByIndex(1);

      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      expect(component.handleValueChange).toHaveBeenCalledTimes(0);

      dispatchMouseEvent(theSecondElement, 'click');
      await fixture.whenStable();
      fixture.detectChanges();

      expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
      expect(theSecondElement.classList).toContain('ant-segmented-item-selected');
      expect(component.handleValueChange).toHaveBeenCalledTimes(1);
      expect(component.handleValueChange).toHaveBeenCalledWith('Weekly');
    });
  });
});

@Component({
  imports: [FormsModule, NzSegmentedModule],
  template: `
    <nz-segmented
      [nzSize]="size"
      [nzOptions]="options"
      [nzDisabled]="disabled"
      [nzBlock]="block"
      [nzVertical]="vertical"
      (nzValueChange)="handleValueChange($event)"
    />
  `
})
export class NzSegmentedTestComponent {
  size: NzSizeLDSType = 'default';
  options: NzSegmentedOptions = [1, 2, 3];
  block = false;
  disabled = false;
  vertical = false;

  handleValueChange(_e: string | number): void {
    // empty
  }
}

@Component({
  imports: [FormsModule, NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" />`
})
export class NzSegmentedIconOnlyTestComponent {
  options: NzSegmentedOptions = [
    { value: 'List', label: 'List', icon: 'bars' },
    { value: 'Kanban', icon: 'appstore' }
  ];
}

@Component({
  imports: [FormsModule, NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" [(ngModel)]="value" (ngModelChange)="handleValueChange($event)" />`
})
export class NzSegmentedNgModelTestComponent {
  options: NzSegmentedOptions = [1, 2, 3];
  value: number | string = 1;

  handleValueChange(_e: string | number): void {
    // empty
  }
}

@Component({
  imports: [ReactiveFormsModule, NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" [formControl]="formControl"></nz-segmented>`
})
export class NzSegmentedInReactiveFormTestComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  formControl = new FormControl('Weekly');
}

@Component({
  imports: [FormsModule, NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" [nzVertical]="true" (nzValueChange)="handleValueChange($event)" /> `
})
export class NzSegmentedVerticalTestComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];

  handleValueChange(_e: string | number): void {
    // empty
  }
}
