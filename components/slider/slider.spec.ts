import { BidiModule, Dir } from '@angular/cdk/bidi';
import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick } from '@angular/core/testing';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzSliderComponent } from './slider.component';
import { NzSliderModule } from './slider.module';
import { NzSliderShowTooltip } from './typings';

describe('nz-slider', () => {
  let sliderDebugElement: DebugElement;
  let sliderNativeElement: HTMLElement;
  let sliderInstance: NzSliderComponent;
  let overlayContainerElement: HTMLElement;

  function getReferenceFromFixture(fixture: ComponentFixture<NzSafeAny>): void {
    sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
    sliderInstance = sliderDebugElement.componentInstance;
    sliderNativeElement = sliderInstance.slider.nativeElement;
  }

  describe('basic', () => {
    let testBed: ComponentBed<NzTestSliderComponent>;
    let fixture: ComponentFixture<NzTestSliderComponent>;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestSliderComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    it('should set the default values', () => {
      expect(sliderInstance.value).toBe(0);
      expect(sliderInstance.nzMin).toBe(0);
      expect(sliderInstance.nzMax).toBe(100);
    });

    it('should update the value on a click', () => {
      expect(sliderInstance.value).toBe(0);

      dispatchClickEventSequence(sliderNativeElement, 0.19);

      expect(sliderInstance.value).toBe(19);
    });

    it('should update the value on a slide', () => {
      expect(sliderInstance.value).toBe(0);

      dispatchSlideEventSequence(sliderNativeElement, 0, 0.89);

      expect(sliderInstance.value).toBe(89);
    });

    it('should set the value as min when sliding before the track', () => {
      expect(sliderInstance.value).toBe(0);

      dispatchSlideEventSequence(sliderNativeElement, 0, -1.33);

      expect(sliderInstance.value).toBe(0);
    });

    it('should set the value as max when sliding past the track', () => {
      expect(sliderInstance.value).toBe(0);

      dispatchSlideEventSequence(sliderNativeElement, 0, 1.75);

      expect(sliderInstance.value).toBe(100);
    });

    it('should update the track fill on click', () => {
      expect(trackFillElement.style.width).toBe('0%');

      dispatchClickEventSequence(sliderNativeElement, 0.39);
      fixture.detectChanges();

      expect(trackFillElement.style.width).toBe('39%');
    });

    it('should update the track fill on slide', () => {
      expect(trackFillElement.style.width).toBe('0%');

      dispatchSlideEventSequence(sliderNativeElement, 0, 0.86);
      fixture.detectChanges();

      expect(trackFillElement.style.width).toBe('86%');
    });

    it('should not change value without emitting a change event', () => {
      const onChangeSpy = jasmine.createSpy('slider onChange');

      sliderInstance.nzOnAfterChange.subscribe(onChangeSpy);
      sliderInstance.value = 50;
      fixture.detectChanges();

      dispatchSlideStartEvent(sliderNativeElement, 0);
      fixture.detectChanges();

      dispatchSlideEvent(sliderNativeElement, 10);
      fixture.detectChanges();

      dispatchSlideEndEvent(sliderNativeElement, 10);
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('disabled', () => {
    let testBed: ComponentBed<NzTestSliderComponent>;
    let fixture: ComponentFixture<NzTestSliderComponent>;

    beforeEach(() => {
      testBed = createComponentBed(NzTestSliderComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.componentInstance.disabled = true;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
    });

    it('should not change the value on click when disabled', () => {
      expect(sliderInstance.value).toBe(0);

      dispatchClickEventSequence(sliderNativeElement, 0.63);

      expect(sliderInstance.value).toBe(0);
    });

    it('should not change the value on slide when disabled', () => {
      expect(sliderInstance.value).toBe(0);

      dispatchSlideEventSequence(sliderNativeElement, 0, 0.5);

      expect(sliderInstance.value).toBe(0);
    });

    it('should not emit change when disabled', () => {
      const onChangeSpy = jasmine.createSpy('slider onChange');
      sliderInstance.nzOnAfterChange.subscribe(onChangeSpy);

      dispatchSlideEventSequence(sliderNativeElement, 0, 0.5);

      expect(onChangeSpy).toHaveBeenCalledTimes(0);
    });

    it('should add the ant-slider-disabled class when disabled', () => {
      expect(sliderNativeElement.classList).toContain('ant-slider-disabled');
    });
  });

  describe('show tooltip', () => {
    let testBed: ComponentBed<SliderShowTooltipComponent>;
    let fixture: ComponentFixture<SliderShowTooltipComponent>;
    let testComponent: SliderShowTooltipComponent;

    beforeEach(() => {
      testBed = createComponentBed(SliderShowTooltipComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.injector.get<NzSliderComponent>(NzSliderComponent);
      sliderNativeElement = sliderInstance.slider.nativeElement;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainerElement = oc.getContainerElement();
    }));

    it('should always display tooltips if set to `always`', fakeAsync(() => {
      testComponent.show = 'always';
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('0');

      dispatchClickEventSequence(sliderNativeElement, 0.13);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('13');

      // Always show tooltip even when handle is not hovered.
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('13');

      tick(400);
    }));

    it('should never display tooltips if set to `never`', fakeAsync(() => {
      const handlerHost = sliderNativeElement.querySelector('nz-slider-handle')!;

      testComponent.show = 'never';
      tick(400);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toContain('0');

      dispatchClickEventSequence(sliderNativeElement, 0.13);
      fixture.detectChanges();

      // Do not show tooltip even when handle is hovered.
      dispatchMouseEvent(handlerHost, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toContain('13');
    }));
  });

  describe('setting value', () => {
    let testBed: ComponentBed<SliderWithValueComponent>;
    let fixture: ComponentFixture<SliderWithValueComponent>;

    beforeEach(() => {
      testBed = createComponentBed(SliderWithValueComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.injector.get<NzSliderComponent>(NzSliderComponent);
      sliderNativeElement = sliderInstance.slider.nativeElement;
    });

    it('should set the default value from the attribute', () => {
      fixture.whenStable().then(() => expect(sliderInstance.value).toBe(26));
    });

    it('should set the correct value on click', () => {
      dispatchClickEventSequence(sliderNativeElement, 0.92);
      fixture.detectChanges();

      // On a slider with default max and min the value should be approximately equal to the
      // percentage clicked. This should be the case regardless of what the original set value was.
      expect(sliderInstance.value).toBe(92);
    });

    it('should set the correct value on slide', () => {
      dispatchSlideEventSequence(sliderNativeElement, 0, 0.32);
      fixture.detectChanges();

      expect(sliderInstance.value).toBe(32);
    });
  });

  describe('marks', () => {
    let testBed: ComponentBed<SliderWithMarksComponent>;
    let fixture: ComponentFixture<SliderWithMarksComponent>;
    let markListElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(SliderWithMarksComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
      markListElement = sliderNativeElement.querySelector('.ant-slider-mark') as HTMLElement;
    });

    it('should have start mark at the start', () => {
      const value0Mark = markListElement.children[0] as HTMLElement;

      expect(value0Mark.style.left).toEqual('0%');
    });

    it('should have end mark at the end', () => {
      const value100Mark = markListElement.children[1] as HTMLElement;

      expect(value100Mark.style.left).toEqual('100%');
    });
  });

  describe('step', () => {
    let testBed: ComponentBed<SliderWithStepComponent>;
    let fixture: ComponentFixture<SliderWithStepComponent>;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(SliderWithStepComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.injector.get<NzSliderComponent>(NzSliderComponent);
      sliderNativeElement = sliderInstance.slider.nativeElement;
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    it('should set the correct step value on click', () => {
      expect(sliderInstance.value).toBe(0);

      dispatchClickEventSequence(sliderNativeElement, 0.13);
      fixture.detectChanges();

      expect(sliderInstance.value).toBe(25);
    });

    it('should snap the fill to a step on click', () => {
      dispatchClickEventSequence(sliderNativeElement, 0.66);
      fixture.detectChanges();

      // The closest step is at 75% of the slider.
      expect(trackFillElement.style.width).toBe('75%');
    });

    it('should set the correct step value on slide', () => {
      dispatchSlideEventSequence(sliderNativeElement, 0, 0.07);
      fixture.detectChanges();

      expect(sliderInstance.value).toBe(0);
    });

    it('should snap the thumb and fill to a step on slide', () => {
      dispatchSlideEventSequence(sliderNativeElement, 0, 0.88);
      fixture.detectChanges();

      // The closest snap is at the end of the slider.
      expect(trackFillElement.style.width).toBe('100%');
    });

    // TODO: Pass this testing by increase precision
    xit('should round the value inside the label based on the provided step', () => {
      const testStep = (step: number, expected: string): void => {
        fixture.componentInstance.step = step;
        fixture.detectChanges();
        dispatchSlideEventSequence(sliderNativeElement, 0, 0.333333);

        expect(sliderInstance.value!.toString()).toBe(expected);
      };

      testStep(1, '33');
      testStep(0.1, '33.3'); // TODO: not passing currently
      testStep(0.01, '33.33'); // TODO: not passing currently
      testStep(0.001, '33.333'); // TODO: not passing currently
    });

    it('should not add decimals to the value if it is a whole number', () => {
      fixture.componentInstance.step = 0.1;
      fixture.detectChanges();

      dispatchSlideEventSequence(sliderNativeElement, 0, 1);

      expect(sliderInstance.value).toBe(100);
    });
  });

  describe('min and max', () => {
    let testBed: ComponentBed<SliderWithMinAndMaxComponent>;
    let fixture: ComponentFixture<SliderWithMinAndMaxComponent>;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(SliderWithMinAndMaxComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    it('should set the default values from the attributes', () => {
      expect(sliderInstance.value).toBe(4);
      expect(sliderInstance.nzMin).toBe(4);
      expect(sliderInstance.nzMax).toBe(6);
    });

    it('should set the correct value on click', () => {
      dispatchClickEventSequence(sliderNativeElement, 0.09);
      fixture.detectChanges();

      // Computed by multiplying the difference between the min and the max by the percentage from
      // the click and adding that to the minimum.
      const value = Math.round((6 - 4) * 0.09 + 4);
      expect(sliderInstance.value).toBe(value);
    });

    it('should set the correct value on slide', () => {
      dispatchSlideEventSequence(sliderNativeElement, 0, 0.62);
      fixture.detectChanges();

      // Computed by multiplying the difference between the min and the max by the percentage from
      // the click and adding that to the minimum.
      const value = Math.round((6 - 4) * 0.62 + 4);
      expect(sliderInstance.value).toBe(value);
    });

    it('should snap the fill to the nearest value on click', () => {
      dispatchClickEventSequence(sliderNativeElement, 0.68);
      fixture.detectChanges();

      // The closest snap is halfway on the slider.
      expect(trackFillElement.style.width).toBe('50%');
    });

    it('should snap the fill to the nearest value on slide', () => {
      dispatchSlideEventSequence(sliderNativeElement, 0, 0.74);
      fixture.detectChanges();

      // The closest snap is at the halfway point on the slider.
      expect(trackFillElement.style.width).toBe('50%');
    });
  });

  describe('min and max and a value smaller than min', () => {
    let testBed: ComponentBed<SliderWithValueSmallerThanMinComponent>;
    let fixture: ComponentFixture<SliderWithValueSmallerThanMinComponent>;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(SliderWithValueSmallerThanMinComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    it('should set the value equal to the min value', () => {
      expect(sliderInstance.value).toBe(4);
      expect(sliderInstance.nzMin).toBe(4);
      expect(sliderInstance.nzMax).toBe(6);
    });

    it('should set the fill to the min value', () => {
      expect(trackFillElement.style.width).toBe('0%');
    });
  });

  describe('min and max and a value greater than max', () => {
    let testBed: ComponentBed<SliderWithValueGreaterThanMaxComponent>;
    let fixture: ComponentFixture<SliderWithValueGreaterThanMaxComponent>;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(SliderWithValueGreaterThanMaxComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    it('should set the value equal to the max value', () => {
      fixture.whenStable().then(() => {
        expect(sliderInstance.value).toBe(6);
        expect(sliderInstance.nzMin).toBe(4);
        expect(sliderInstance.nzMax).toBe(6);
      });
    });

    it('should set the fill to the max value', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(trackFillElement.style.width).toBe('100%');
      });
    });
  });

  describe('min and max and value is zero', () => {
    let testBed: ComponentBed<SliderWithValueZeroComponent>;
    let fixture: ComponentFixture<SliderWithValueZeroComponent>;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(SliderWithValueZeroComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    it('should set the value equal to the middle value', () => {
      fixture.whenStable().then(() => {
        expect(sliderInstance.value).toBe(0);
        expect(sliderInstance.nzMin).toBe(-5);
        expect(sliderInstance.nzMax).toBe(5);
      });
    });

    it('should set the fill to the middle value', () => {
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        expect(trackFillElement.style.width).toBe('50%');
      });
    });
  });

  describe('vertical', () => {
    let testBed: ComponentBed<VerticalSliderComponent>;
    let fixture: ComponentFixture<VerticalSliderComponent>;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(VerticalSliderComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.injector.get<NzSliderComponent>(NzSliderComponent);
      sliderNativeElement = sliderInstance.slider.nativeElement;
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    it('updates value on click', () => {
      dispatchClickEventSequence(sliderNativeElement, 0.3);
      fixture.detectChanges();

      // It behaves differently in CI and local environment (windows 10, chrome).
      expect(sliderInstance.value).toBeCloseTo(71, -1);
    });

    it('should update the track fill on click', () => {
      expect(trackFillElement.style.height).toBe('0%');

      dispatchClickEventSequence(sliderNativeElement, 0.39);
      fixture.detectChanges();

      expect(parseInt(trackFillElement.style.height!, 10)).toBeCloseTo(62, -1);
    });

    it('should have ant-slider-vertical class', () => {
      expect(sliderNativeElement.classList).toContain('ant-slider-vertical');
    });
  });

  describe('reverse', () => {
    let testBed: ComponentBed<ReverseSliderComponent>;
    let fixture: ComponentFixture<ReverseSliderComponent>;
    let sliderDebugElements: DebugElement[];

    beforeEach(() => {
      testBed = createComponentBed(ReverseSliderComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      sliderDebugElements = fixture.debugElement.queryAll(By.directive(NzSliderComponent));
    });

    it('should reverse work', () => {
      const trackElement = (sliderDebugElements[0].nativeElement as HTMLElement).querySelector(
        '.ant-slider-track'
      ) as HTMLElement;
      expect(trackElement.style.right).toBe('0%');

      const rangeTrackElement = (sliderDebugElements[1].nativeElement as HTMLElement).querySelector(
        '.ant-slider-track'
      ) as HTMLElement;
      expect(trackElement.style.right).toBe('0%');
      expect(rangeTrackElement.style.width).toBe('100%');

      const verticalTrackElement = (sliderDebugElements[2].nativeElement as HTMLElement).querySelector(
        '.ant-slider-track'
      ) as HTMLElement;
      expect(verticalTrackElement.style.top).toBe('0%');
    });

    it('should respond to keyboard event reversely', () => {
      getReferenceFromFixture(fixture);

      dispatchKeyboardEvent(sliderNativeElement, 'keydown', LEFT_ARROW);
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', DOWN_ARROW);
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', UP_ARROW);
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', LEFT_ARROW);

      fixture.detectChanges();

      const trackElement = (sliderDebugElements[0].nativeElement as HTMLElement).querySelector(
        '.ant-slider-track'
      ) as HTMLElement;
      expect(trackElement.style.width).toBe('1%');
    });

    it('should reverse marks', () => {
      const markList = (sliderDebugElements[0].nativeElement as HTMLElement).querySelector(
        '.ant-slider-mark'
      ) as HTMLElement;
      const value0Mark = markList.children[0] as HTMLElement;
      const value100Mark = markList.children[1] as HTMLElement;

      expect(value0Mark.style.left).toEqual('100%');
      expect(value100Mark.style.left).toEqual('0%');
    });

    it('should reverse steps', () => {
      const stepList = (sliderDebugElements[0].nativeElement as HTMLElement).querySelector(
        '.ant-slider-step'
      ) as HTMLElement;
      const value0Step = stepList.children[0] as HTMLElement;
      const value100Step = stepList.children[1] as HTMLElement;

      expect(value0Step.style.left).toEqual('100%');
      expect(value100Step.style.left).toEqual('0%');
    });
  });

  describe('reverse and min and max', () => {
    let testBed: ComponentBed<ReverseSliderWithMinAndMaxComponent>;
    let fixture: ComponentFixture<ReverseSliderWithMinAndMaxComponent>;

    beforeEach(() => {
      testBed = createComponentBed(ReverseSliderWithMinAndMaxComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
    });

    it('should set the correct maximum value', () => {
      dispatchClickEventSequence(sliderNativeElement, 0);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual(6);
    });

    it('should set the correct minimum value', () => {
      dispatchClickEventSequence(sliderNativeElement, 1);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual(4);
    });
  });

  describe('mixed usage', () => {
    let testBed: ComponentBed<MixedSliderComponent>;
    let fixture: ComponentFixture<MixedSliderComponent>;
    let trackFillElement: HTMLElement;
    let testComponent: MixedSliderComponent;

    beforeEach(() => {
      testBed = createComponentBed(MixedSliderComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      getReferenceFromFixture(fixture);
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainerElement = oc.getContainerElement();
    }));

    it('update the correct range value and show correct steps format', () => {
      expect(sliderNativeElement.textContent).toContain('(22%)');
      expect(sliderNativeElement.textContent).toContain('(36%)');

      testComponent.range = true;
      fixture.detectChanges();

      dispatchClickEventSequence(sliderNativeElement, 0.1);

      // Potentially a bug of jasmine or karma. Event handler makes calling stack destroyed.
      // dispatchClickEventSequence(sliderNativeElement, 0.8);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual([10, 100]);
    });

    it("should/shouldn't be included", () => {
      dispatchClickEventSequence(sliderNativeElement, 0.33);
      fixture.detectChanges();
      expect(trackFillElement.style.left).toBe('0%');
      expect(trackFillElement.style.width).toBe('33%');
      expect(trackFillElement.style.visibility).toBe('visible');

      testComponent.included = false;
      fixture.detectChanges();
      expect(trackFillElement.style.visibility).toBe('hidden');
    });

    it('should stop at one mark other than step, and show correct tooltip', () => {
      testComponent.step = 10;
      fixture.detectChanges();

      dispatchSlideEventSequence(sliderNativeElement, 0.15, 0.34, true);
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(36);
      expect(overlayContainerElement.textContent).toContain('VALUE-36');
    });

    it('should stop at new steps when step=null or dots=true', () => {
      testComponent.marks = { 15: { style: { color: 'red' }, label: '15' }, 33: '33' } as any; // eslint-disable-line @typescript-eslint/no-explicit-any
      testComponent.step = null;
      fixture.detectChanges();

      dispatchSlideEventSequence(sliderNativeElement, 0, 0.09);
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(15);

      testComponent.step = 1;
      testComponent.dots = true;
      fixture.detectChanges();

      dispatchSlideEventSequence(sliderNativeElement, 0, 0.66);
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(33);
    });

    it('should show/hide tooltip when enter/leave a handler', fakeAsync(() => {
      const handlerHost = sliderNativeElement.querySelector('nz-slider-handle')!;

      dispatchClickEventSequence(sliderNativeElement, 0.13);
      fixture.detectChanges();

      dispatchMouseEvent(handlerHost, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('VALUE-13');

      dispatchMouseEvent(handlerHost, 'mouseleave');
      tick(400); // wait for tooltip's animations
      expect(overlayContainerElement.textContent).not.toContain('VALUE-13');
    }));

    // fix #5699, Slider should work with decimals as well
    it('should work with decimals', fakeAsync(() => {
      testComponent.marks = {
        0.5: '0.5',
        0.8: '0.8',
        1: '1',
        1.2: '1.2',
        1.5: '1.5',
        2: '2'
      };
      testComponent.min = 0.5;
      testComponent.max = 2;
      testComponent.step = null;
      fixture.detectChanges();

      dispatchClickEventSequence(sliderNativeElement, 0.13);
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(0.8);

      dispatchClickEventSequence(sliderNativeElement, 0.6);
      fixture.detectChanges();
      expect(sliderInstance.value).toBe(1.5);
    }));
  });

  describe('slider as a custom form control', () => {
    let testBed: ComponentBed<SliderWithFormControlComponent>;
    let fixture: ComponentFixture<SliderWithFormControlComponent>;
    let testComponent: SliderWithFormControlComponent;
    let sliderControl: AbstractControl;

    beforeEach(() => {
      testBed = createComponentBed(SliderWithFormControlComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      getReferenceFromFixture(fixture);
      sliderControl = testComponent.form.controls.slider;
    });

    it('should have correct initial value', () => {
      expect(sliderInstance.value).toBe(42);
    });

    it('should not update the control when the value is updated', () => {
      expect(sliderControl.value).toBe(42);

      sliderInstance.value = 11;
      fixture.detectChanges();

      expect(sliderControl.value).toBe(42);
    });

    it('should update the control on click', () => {
      expect(sliderControl.value).toBe(42);

      dispatchClickEventSequence(sliderNativeElement, 0.76);
      fixture.detectChanges();

      expect(sliderControl.value).toBe(76);
    });

    it('should update the control on slide', () => {
      expect(sliderControl.value).toBe(42);

      dispatchSlideEventSequence(sliderNativeElement, 0.42, 0.19);
      fixture.detectChanges();

      expect(sliderControl.value).toBe(19);
    });

    it('should update the value when the control is set', () => {
      expect(sliderInstance.value).toBe(42);

      sliderControl.setValue(7);
      fixture.detectChanges();

      expect(sliderInstance.value).toBe(7);
    });

    it('should update the disabled state when control is disabled', () => {
      expect(sliderInstance.nzDisabled).toBe(false);

      sliderControl.disable();
      fixture.detectChanges();

      expect(sliderInstance.nzDisabled).toBe(true);
    });

    it('should update the disabled state when the control is enabled', () => {
      sliderInstance.nzDisabled = true;

      sliderControl.enable();
      fixture.detectChanges();

      expect(sliderInstance.nzDisabled).toBe(false);
    });

    it('should have the correct control state initially and after interaction', () => {
      // The control should start off valid, pristine, and untouched.
      expect(sliderControl.valid).toBe(true);
      expect(sliderControl.pristine).toBe(true);
      expect(sliderControl.touched).toBe(false);

      // After changing the value, the control should become dirty (not pristine),
      // but remain untouched.
      dispatchClickEventSequence(sliderNativeElement, 0.5);
      fixture.detectChanges();

      expect(sliderControl.valid).toBe(true);
      expect(sliderControl.pristine).toBe(false);
      expect(sliderControl.touched).toBe(false);

      // If the control has been visited due to interaction, the control should remain
      // dirty and now also be touched.
      sliderInstance.onTouched();
      fixture.detectChanges();

      expect(sliderControl.valid).toBe(true);
      expect(sliderControl.pristine).toBe(false);
      expect(sliderControl.touched).toBe(true);
    });
  });

  describe('support keyboard event', () => {
    let testBed: ComponentBed<NzTestSliderKeyboardComponent>;
    let fixture: ComponentFixture<NzTestSliderKeyboardComponent>;
    let testComponent: NzTestSliderKeyboardComponent;

    beforeEach(() => {
      testBed = createComponentBed(NzTestSliderKeyboardComponent, {
        imports: [NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
    });

    it('should work for non-range slider', () => {
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', LEFT_ARROW);

      expect(sliderInstance.value).toBe(1);
    });

    it('should work for range slider', () => {
      testComponent.range = true;
      sliderInstance.activeValueIndex = 0;
      fixture.detectChanges();

      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual([2, 100]);

      sliderInstance.activeValueIndex = 1;
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual([2, 99]);
    });

    it('should trigger nzOnAfterChange', () => {
      const onChangeSpy = jasmine.createSpy('slider onChange');

      sliderInstance.nzOnAfterChange.subscribe(onChangeSpy);
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledTimes(1);
    });

    it('should work for range slider when activeValueIndex is undefined', () => {
      testComponent.range = true;
      fixture.detectChanges();

      const handleElements = sliderNativeElement.querySelectorAll('nz-slider-handle');
      expect(handleElements.length).toBe(2);

      dispatchFakeEvent(handleElements[0]!, 'focusin');
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual([1, 100]);

      dispatchFakeEvent(handleElements[1]!, 'focusin');
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual([1, 99]);
    });

    it('should not respond to keyboard event when disabled', () => {
      expect(sliderInstance.value).toBe(0);

      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      expect(sliderInstance.value).toBe(1);

      testComponent.disabled = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      expect(sliderInstance.value).toBe(1);

      testComponent.disabled = false;
      fixture.detectChanges();
      dispatchKeyboardEvent(sliderNativeElement, 'keydown', RIGHT_ARROW);
      expect(sliderInstance.value).toBe(2);
    });
  });

  describe('RTL', () => {
    let testBed: ComponentBed<NzTestSliderRtlComponent>;
    let fixture: ComponentFixture<NzTestSliderRtlComponent>;
    let trackFillElement: HTMLElement;
    let trackHandleElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestSliderRtlComponent, {
        imports: [NzSliderModule, BidiModule, NoopAnimationsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();

      getReferenceFromFixture(fixture);
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
      trackHandleElement = sliderNativeElement.querySelector('.ant-slider-handle') as HTMLElement;
    });

    it('should className correct on dir change', fakeAsync(() => {
      expect(sliderNativeElement.classList).toContain('ant-slider-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(sliderNativeElement.classList).not.toContain('ant-slider-rtl');
    }));

    it('should update the track fill on click', fakeAsync(() => {
      expect(trackFillElement.style.width).toBe('0%');

      dispatchClickEventSequence(sliderNativeElement, 0.39, true);
      fixture.detectChanges();

      expect(trackFillElement.style.width).toBe('39%');
    }));

    it('should update track fill style on direction change', () => {
      expect(trackFillElement.style.left).toBe('auto');
      expect(trackFillElement.style.right).toBe('0%');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();

      expect(trackFillElement.style.left).toBe('0%');
      expect(trackFillElement.style.right).toBe('auto');
    });

    it('should update track handle style on direction change', () => {
      dispatchClickEventSequence(sliderNativeElement, 0.39, true);
      fixture.detectChanges();

      expect(trackHandleElement.style.left).toBe('auto');
      expect(trackHandleElement.style.right).toBe('39%');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();

      expect(trackHandleElement.style.right).toBe('auto');
      expect(trackHandleElement.style.left).toBe('39%');
    });
  });
});

const styles = `
  ::ng-deep .ant-slider { position: relative; width: 100px; height: 12px; }
  ::ng-deep .ant-slider .ant-slider-rail { position: absolute; width: 100%; height: 4px; }
  ::ng-deep .ant-slider .ant-slider-track { position: absolute; height: 4px; }
  ::ng-deep .ant-slider .ant-slider-handle { position: absolute; margin-left: -7px; margin-top: -5px; width: 14px; height: 14px; }

  ::ng-deep .ant-slider-vertical { height: 100px; width: 12px; }
  ::ng-deep .ant-slider-vertical .ant-slider-rail { height: 100%; width: 4px; }
  ::ng-deep .ant-slider-vertical .ant-slider-track { width: 4px; }
`;

@Component({
  template: ` <nz-slider [nzDisabled]="disabled"></nz-slider> `,
  styles: [styles]
})
class NzTestSliderComponent {
  disabled = false;
}
@Component({
  template: ` <nz-slider [nzMin]="min" [nzMax]="max"></nz-slider> `,
  styles: [styles]
})
class SliderWithMinAndMaxComponent {
  min = 4;
  max = 6;
}

@Component({
  template: ` <nz-slider [ngModel]="26"></nz-slider> `,
  styles: [styles]
})
class SliderWithValueComponent {}

@Component({
  template: ` <nz-slider [nzMarks]="marks"></nz-slider> `
})
class SliderWithMarksComponent {
  marks: { [mark: number]: string } = { 100: '(100%)', 0: '(0%)' };
}

@Component({
  template: ` <nz-slider [nzStep]="step"></nz-slider> `,
  styles: [styles]
})
class SliderWithStepComponent {
  step = 25;
}

@Component({
  template: ` <nz-slider [ngModel]="3" [nzMin]="4" [nzMax]="6"></nz-slider> `,
  styles: [styles]
})
class SliderWithValueSmallerThanMinComponent {}

@Component({
  template: ` <nz-slider [ngModel]="0" [nzMin]="-5" [nzMax]="5"></nz-slider> `,
  styles: [styles]
})
class SliderWithValueZeroComponent {}

@Component({
  template: ` <nz-slider [ngModel]="7" [nzMin]="4" [nzMax]="6"></nz-slider> `,
  styles: [styles]
})
class SliderWithValueGreaterThanMaxComponent {}

@Component({
  template: ` <nz-slider nzVertical></nz-slider> `,
  styles: [styles]
})
class VerticalSliderComponent {}

@Component({
  template: `
    <nz-slider nzReverse [nzMarks]="marks"></nz-slider>
    <nz-slider nzReverse nzRange></nz-slider>
    <nz-slider nzVertical nzReverse></nz-slider>
  `
})
class ReverseSliderComponent {
  marks: { [mark: number]: string } = { 100: '(100%)', 0: '(0%)' };
}

@Component({
  template: ` <nz-slider [nzMin]="4" [nzMax]="6" nzReverse></nz-slider> `,
  styles: [styles]
})
class ReverseSliderWithMinAndMaxComponent {}

@Component({
  template: `
    <nz-slider
      [nzRange]="range"
      [nzStep]="step"
      [nzMarks]="marks"
      [nzDots]="dots"
      [nzIncluded]="included"
      [nzTipFormatter]="tipFormatter"
      [nzMin]="min"
      [nzMax]="max"
    ></nz-slider>
  `,
  styles: [styles]
})
class MixedSliderComponent {
  dots = false;
  included = true;
  marks: { [mark: number]: string } = { 22: '(22%)', 36: '(36%)' };
  max = 100;
  min = 0;
  range = false;
  step: number | null = 1;

  tipFormatter(value: number): string {
    return `VALUE-${value}`;
  }
}

@Component({
  template: `
    <form [formGroup]="form">
      <nz-slider formControlName="slider"></nz-slider>
    </form>
  `,
  styles: [styles]
})
class SliderWithFormControlComponent implements OnInit {
  form!: UntypedFormGroup;

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      slider: [42]
    });
  }
}

@Component({
  template: ` <nz-slider [nzTooltipVisible]="show" [ngModel]="value"></nz-slider> `
})
class SliderShowTooltipComponent {
  show: NzSliderShowTooltip = 'default';
  value = 0;
}

@Component({
  template: ` <nz-slider [nzRange]="range" [nzDisabled]="disabled"></nz-slider> `
})
class NzTestSliderKeyboardComponent {
  range = false;
  disabled = false;
}

/**
 * Dispatches a click event sequence (consisting of moueseenter, click) from an element.
 * Note: The mouse event truncates the position for the click.
 *
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param percentage The percentage of the slider where the click should occur. Used to find the
 * physical location of the click.
 */
function dispatchClickEventSequence(sliderElement: HTMLElement, percentage: number, isRtl: boolean = false): void {
  const trackElement = sliderElement.querySelector('.ant-slider-rail')!;
  const dimensions = trackElement.getBoundingClientRect();
  const x = dimensions.left + dimensions.width * (isRtl ? 1 - percentage : percentage);
  const y = dimensions.top + dimensions.height * (isRtl ? 1 - percentage : percentage);

  dispatchMouseenterEvent(sliderElement);
  dispatchMouseEvent(sliderElement, 'mousedown', x, y);
  dispatchMouseEvent(document, 'mouseup', x, y);
}

/**
 * Dispatches a slide event sequence (consisting of slidestart, slide, slideend) from an element.
 *
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param startPercent The percentage of the slider where the slide will begin.
 * @param endPercent The percentage of the slider where the slide will end.
 * @param stick Whether stick on and not mouseup when move at the end
 */
function dispatchSlideEventSequence(
  sliderElement: HTMLElement,
  startPercent: number,
  endPercent: number,
  stick: boolean = false
): void {
  dispatchMouseenterEvent(sliderElement);
  dispatchSlideStartEvent(sliderElement, startPercent);
  dispatchSlideEvent(sliderElement, startPercent);
  dispatchSlideEvent(sliderElement, endPercent);
  if (!stick) {
    dispatchSlideEndEvent(sliderElement, endPercent);
  }
}

/**
 * Dispatches a slide event from an element.
 *
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will happen.
 */
function dispatchSlideEvent(sliderElement: HTMLElement, percent: number): void {
  const trackElement = sliderElement.querySelector('.ant-slider-rail')!;
  const dimensions = trackElement.getBoundingClientRect();
  const x = dimensions.left + dimensions.width * percent;
  const y = dimensions.top + dimensions.height * percent;

  dispatchMouseEvent(document, 'mousemove', x, y);
}

/**
 * Dispatches a slidestart event from an element.
 *
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will begin.
 */
function dispatchSlideStartEvent(sliderElement: HTMLElement, percent: number): void {
  const trackElement = sliderElement.querySelector('.ant-slider-rail')!;
  const dimensions = trackElement.getBoundingClientRect();
  const x = dimensions.left + dimensions.width * percent;
  const y = dimensions.top + dimensions.height * percent;

  dispatchMouseenterEvent(sliderElement);

  dispatchMouseEvent(sliderElement, 'mousedown', x, y);
}

/**
 * Dispatches a slideend event from an element.
 *
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will end.
 */
function dispatchSlideEndEvent(sliderElement: HTMLElement, percent: number): void {
  const trackElement = sliderElement.querySelector('.ant-slider-rail')!;
  const dimensions = trackElement.getBoundingClientRect();
  const x = dimensions.left + dimensions.width * percent;
  const y = dimensions.top + dimensions.height * percent;

  dispatchMouseEvent(document, 'mouseup', x, y);
}

/**
 * Dispatches a mouseenter event from an element.
 * Note: The mouse event truncates the position for the click.
 *
 * @param element The element from which the event will be dispatched.
 */
function dispatchMouseenterEvent(element: HTMLElement): void {
  const dimensions = element.getBoundingClientRect();
  const y = dimensions.top;
  const x = dimensions.left;

  dispatchMouseEvent(element, 'mouseenter', x, y);
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-slider></nz-slider>
    </div>
  `
})
export class NzTestSliderRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
