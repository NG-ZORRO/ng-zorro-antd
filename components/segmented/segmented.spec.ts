/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule } from '@angular/cdk/bidi';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { Component, DebugElement, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchEvent, dispatchKeyboardEvent, dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { NzSegmentedComponent } from './segmented.component';
import { NzSegmentedModule } from './segmented.module';
import { NzSegmentedOptions } from './types';

describe('segmented', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), provideZoneChangeDetection()]
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

    it('should support round shape and trigger animation state on interaction', fakeAsync(() => {
      const segmentedElement: HTMLElement = segmentedComponent.nativeElement;
      expect(segmentedElement.classList).not.toContain('ant-segmented-shape-round');
      component.shape = 'round';
      fixture.detectChanges();
      expect(segmentedElement.classList).toContain('ant-segmented-shape-round');
      const theSecondElement = getSegmentedOptionByIndex(1);
      tick(0);
      fixture.detectChanges();
      dispatchMouseEvent(theSecondElement, 'click');
      tick(100);
      fixture.detectChanges();
      expect(segmentedElement.classList).toContain('ant-segmented-shape-round');
    }));

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
      expect(theSecondElement.classList).toContain('ant-segmented-item-disabled');
      expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
    });

    describe('keyboard interaction', () => {
      let theFirstElement: HTMLElement;
      let theSecondElement: HTMLElement;
      let theThirdElement: HTMLElement;

      beforeEach(() => {
        fixture.detectChanges();
        theFirstElement = getSegmentedOptionByIndex(0);
        theSecondElement = getSegmentedOptionByIndex(1);
        theThirdElement = getSegmentedOptionByIndex(2);
      });

      it('should right arrow works', fakeAsync(() => {
        dispatchKeyboardEvent(theFirstElement, 'keydown', RIGHT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theSecondElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theSecondElement, 'keydown', RIGHT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theThirdElement.classList).toContain('ant-segmented-item-selected');

        // when the last item is selected, the first item should be selected
        dispatchKeyboardEvent(theThirdElement, 'keydown', RIGHT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theThirdElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      }));

      it('should left arrow works', fakeAsync(() => {
        // when the first item is selected, the last item should be selected
        dispatchKeyboardEvent(theFirstElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theThirdElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theThirdElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theThirdElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theSecondElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theSecondElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      }));

      it('should not work if the segmented component is disabled', fakeAsync(() => {
        component.disabled = true;
        fixture.detectChanges();

        const offsetSpy = spyOn(segmentedComponent.componentInstance, 'onOffset');

        dispatchKeyboardEvent(theFirstElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(offsetSpy).not.toHaveBeenCalled();
      }));

      it('should not work if the segmented item is disabled', fakeAsync(() => {
        component.options = [
          {
            value: 1,
            label: '1',
            disabled: true
          },
          {
            value: 2,
            label: '2'
          },
          {
            value: 3,
            label: '3'
          }
        ];
        fixture.detectChanges();

        const offsetSpy = spyOn(segmentedComponent.componentInstance, 'onOffset');

        dispatchKeyboardEvent(theFirstElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(offsetSpy).not.toHaveBeenCalled();
      }));

      it('should skip the disabled item', fakeAsync(() => {
        component.options = [
          {
            value: 1,
            label: '1'
          },
          {
            value: 2,
            label: '2',
            disabled: true
          },
          {
            value: 3,
            label: '3'
          }
        ];
        fixture.detectChanges();

        dispatchKeyboardEvent(theFirstElement, 'keydown', RIGHT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theThirdElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theFirstElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theThirdElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      }));
    });
  });

  describe('rtl', () => {
    let fixture: ComponentFixture<NzSegmentedRtlTestComponent>;
    let segmentedComponent: DebugElement;

    function getSegmentedOptionByIndex(index: number): HTMLElement {
      return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(NzSegmentedRtlTestComponent);
      segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));
      fixture.detectChanges();
    });

    describe('keyboard interaction', () => {
      let theFirstElement: HTMLElement;
      let theSecondElement: HTMLElement;
      let theThirdElement: HTMLElement;

      beforeEach(() => {
        fixture.detectChanges();
        theFirstElement = getSegmentedOptionByIndex(0);
        theSecondElement = getSegmentedOptionByIndex(1);
        theThirdElement = getSegmentedOptionByIndex(2);
      });

      it('should left arrow works in rtl mode', fakeAsync(() => {
        dispatchKeyboardEvent(theFirstElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theSecondElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theSecondElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theThirdElement.classList).toContain('ant-segmented-item-selected');

        // when the last item is selected, the first item should be selected
        dispatchKeyboardEvent(theThirdElement, 'keydown', LEFT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theThirdElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      }));

      it('should right arrow works in rtl mode', fakeAsync(() => {
        // when the first item is selected, the last item should be selected
        dispatchKeyboardEvent(theFirstElement, 'keydown', RIGHT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theThirdElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theThirdElement, 'keydown', RIGHT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theThirdElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theSecondElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theSecondElement, 'keydown', RIGHT_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      }));
    });
  });

  describe('DOM structure', () => {
    let fixture: ComponentFixture<NzSegmentedDomStructureTestComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzSegmentedDomStructureTestComponent);
      fixture.detectChanges();
    });

    it('should render an icon element and a text node with a wrapper element if the item is label-with-icon', () => {
      const [withIcon] = fixture.debugElement.queryAll(By.css('.ant-segmented-item-label'));
      expect(withIcon.children.length).toBe(2);
      expect(withIcon.children[0].nativeElement.classList).toContain('ant-segmented-item-icon');
      expect(withIcon.children[1].nativeElement.tagName).toBe('SPAN');
      expect(withIcon.children[1].nativeElement.textContent.trim()).toBe('WithIcon');
    });

    it('should render a text node without wrapping elements if the item is label-only', () => {
      const [, labelOnly] = fixture.debugElement.queryAll(By.css('.ant-segmented-item-label'));
      expect(labelOnly.children.length).toBe(0);
      expect(labelOnly.nativeElement.textContent.trim()).toBe('LabelOnly');
    });

    it('should render only one icon element if the item is icon-only', () => {
      const [, , iconOnly] = fixture.debugElement.queryAll(By.css('.ant-segmented-item-label'));
      expect(iconOnly.children.length).toBe(1);
      expect(iconOnly.children[0].nativeElement.classList).toContain('ant-segmented-item-icon');
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
      expect(component.handleValueChange).toHaveBeenCalledWith(2);
    });

    describe('keyboard interaction', () => {
      let theFirstElement: HTMLElement;
      let theSecondElement: HTMLElement;
      let theThirdElement: HTMLElement;

      beforeEach(() => {
        fixture.detectChanges();
        theFirstElement = getSegmentedOptionByIndex(0);
        theSecondElement = getSegmentedOptionByIndex(1);
        theThirdElement = getSegmentedOptionByIndex(2);
      });

      it('should down arrow works', fakeAsync(() => {
        dispatchKeyboardEvent(theFirstElement, 'keydown', DOWN_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theSecondElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theSecondElement, 'keydown', DOWN_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theThirdElement.classList).toContain('ant-segmented-item-selected');

        // when the last item is selected, the first item should be selected
        dispatchKeyboardEvent(theThirdElement, 'keydown', DOWN_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theThirdElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      }));

      it('should up arrow works', fakeAsync(() => {
        // when the first item is selected, the last item should be selected
        dispatchKeyboardEvent(theFirstElement, 'keydown', UP_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theFirstElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theThirdElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theThirdElement, 'keydown', UP_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theThirdElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theSecondElement.classList).toContain('ant-segmented-item-selected');

        dispatchKeyboardEvent(theSecondElement, 'keydown', UP_ARROW);
        tick(100);
        fixture.detectChanges();
        expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');
        expect(theFirstElement.classList).toContain('ant-segmented-item-selected');
      }));
    });
  });

  describe('a11y', () => {
    let fixture: ComponentFixture<NzSegmentedTestComponent>;
    let component: NzSegmentedTestComponent;
    let segmentedComponent: DebugElement;

    function getSegmentedOptionByIndex(index: number): HTMLElement {
      return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(NzSegmentedTestComponent);
      component = fixture.componentInstance;
      segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));
      fixture.detectChanges();
    });

    it('should have default radio group name', () => {
      const theFirstElement = getSegmentedOptionByIndex(0);
      expect(theFirstElement.querySelector('input')?.getAttribute('name')?.startsWith('segmented_')).toBe(true);
    });

    it('should support custom radio group name', () => {
      component.name = 'custom_name';
      fixture.detectChanges();
      const theFirstElement = getSegmentedOptionByIndex(0);
      expect(theFirstElement.querySelector('input')?.getAttribute('name')).toBe('custom_name');
    });
  });
});

describe('segmented animation', () => {
  let fixture: ComponentFixture<NzSegmentedTestComponent>;
  let component: NzSegmentedTestComponent;
  let segmentedComponent: DebugElement;

  function getSegmentedOptionByIndex(index: number): HTMLElement {
    return segmentedComponent.nativeElement.querySelectorAll('.ant-segmented-item')[index];
  }

  function getThumbElement(): HTMLElement {
    return segmentedComponent.nativeElement.querySelector('.ant-segmented-thumb');
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(NzSegmentedTestComponent);
    component = fixture.componentInstance;
    spyOn(component, 'handleValueChange');
    segmentedComponent = fixture.debugElement.query(By.directive(NzSegmentedComponent));
  });

  it('should not render thumb element if not in animation', async () => {
    await fixture.whenStable();
    const segmentedComponentInstance = fixture.debugElement.query(By.directive(NzSegmentedComponent)).componentInstance;

    expect(segmentedComponentInstance.showThumb()).toBeFalse();
    expect(getThumbElement()).toBeFalsy();
  });

  it('should animate thumb correctly', async () => {
    await fixture.whenStable();
    const segmentedComponentInstance = fixture.debugElement.query(By.directive(NzSegmentedComponent)).componentInstance;
    const theSecondElement = getSegmentedOptionByIndex(1);

    dispatchMouseEvent(theSecondElement, 'click');
    await fixture.whenStable();
    expect(segmentedComponentInstance.showThumb()).toBeTrue();

    const thumbElement = getThumbElement();
    expect(thumbElement.style.transform).toContain('translateX');
    expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');

    dispatchEvent(thumbElement, new TransitionEvent('transitionend', { propertyName: 'transform' }));
    await fixture.whenStable();
    expect(segmentedComponentInstance.showThumb()).toBeFalse();
    expect(theSecondElement.classList).toContain('ant-segmented-item-selected');
  });

  it('should animate thumb correctly in vertical mode', async () => {
    component.vertical = true;
    await fixture.whenStable();

    const segmentedComponentInstance = fixture.debugElement.query(By.directive(NzSegmentedComponent)).componentInstance;
    const theSecondElement = getSegmentedOptionByIndex(1);

    dispatchMouseEvent(theSecondElement, 'click');
    await fixture.whenStable();
    expect(segmentedComponentInstance.showThumb()).toBeTrue();

    const thumbElement = getThumbElement();
    expect(thumbElement.style.transform).toContain('translateY');
    expect(theSecondElement.classList).not.toContain('ant-segmented-item-selected');

    dispatchEvent(thumbElement, new TransitionEvent('transitionend', { propertyName: 'transform' }));
    await fixture.whenStable();
    expect(segmentedComponentInstance.showThumb()).toBeFalse();
    expect(theSecondElement.classList).toContain('ant-segmented-item-selected');
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
      [nzShape]="shape"
      [nzName]="name"
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
  shape: 'default' | 'round' = 'default';
  name?: string;

  handleValueChange(_e: string | number): void {
    // empty
  }
}

@Component({
  imports: [NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" />`
})
export class NzSegmentedDomStructureTestComponent {
  options: NzSegmentedOptions = [
    { value: 'WithIcon', label: 'WithIcon', icon: 'bars' },
    { value: 'LabelOnly', label: 'LabelOnly' },
    { value: 'IconOnly', icon: 'bars' }
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
  template: `<nz-segmented [nzOptions]="options" [formControl]="formControl" />`
})
export class NzSegmentedInReactiveFormTestComponent {
  options = ['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly'];
  formControl = new FormControl('Weekly');
}

@Component({
  imports: [FormsModule, NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" nzVertical (nzValueChange)="handleValueChange($event)" />`
})
export class NzSegmentedVerticalTestComponent {
  options: NzSegmentedOptions = [1, 2, 3];

  handleValueChange(_e: string | number): void {
    // empty
  }
}

@Component({
  imports: [BidiModule, NzSegmentedModule],
  template: `<nz-segmented [nzOptions]="options" dir="rtl" />`
})
export class NzSegmentedRtlTestComponent {
  options: NzSegmentedOptions = [1, 2, 3];
}
