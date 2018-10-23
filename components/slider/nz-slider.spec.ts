import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, OnInit, ViewEncapsulation } from '@angular/core';
import { fakeAsync, flush, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { dispatchMouseEvent } from '../core/testing';
import { NzSliderComponent } from './nz-slider.component';
import { NzSliderModule } from './nz-slider.module';

describe('NzSlider', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ NzSliderModule, FormsModule, ReactiveFormsModule, NoopAnimationsModule ],
      declarations: [
        StandardSliderComponent,
        DisableSliderComponent,
        SliderWithMinAndMaxComponent,
        SliderWithValueComponent,
        SliderWithStepComponent,
        SliderWithValueSmallerThanMinComponent,
        SliderWithValueGreaterThanMaxComponent,
        VerticalSliderComponent,
        MixedSliderComponent,
        SliderWithFormControlComponent
      ]
    });

    TestBed.compileComponents();
  }));

  describe('standard slider', () => {
    let fixture: ComponentFixture<StandardSliderComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(StandardSliderComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.componentInstance;
      sliderNativeElement = sliderInstance.sliderDOM;

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

    it('should pass un-covered code testing', () => {
      expect(sliderInstance.getValueToOffset()).toBe(sliderInstance.value);
    });
  });

  describe('disabled slider', () => {
    let fixture: ComponentFixture<DisableSliderComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let trackFillElement: HTMLElement;
    let testComponent: DisableSliderComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(DisableSliderComponent);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.componentInstance;
      sliderNativeElement = sliderInstance.sliderDOM;
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    it('should/shouldn\'t be disabled', () => {
      expect(sliderInstance.nzDisabled).toBeTruthy();

      testComponent.disable = false;
      fixture.detectChanges();

      expect(sliderInstance.nzDisabled).toBeFalsy();
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

  describe('slider with set min and max', () => {
    let fixture: ComponentFixture<SliderWithMinAndMaxComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let testComponent: SliderWithMinAndMaxComponent;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SliderWithMinAndMaxComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      testComponent = fixture.debugElement.componentInstance;
      sliderInstance = sliderDebugElement.componentInstance;
      sliderNativeElement = sliderInstance.sliderDOM;
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
      const value = Math.round(((6 - 4) * 0.09) + 4);
      expect(sliderInstance.value).toBe(value);
    });

    it('should set the correct value on slide', () => {
      dispatchSlideEventSequence(sliderNativeElement, 0, 0.62);
      fixture.detectChanges();

      // Computed by multiplying the difference between the min and the max by the percentage from
      // the click and adding that to the minimum.
      const value = Math.round(((6 - 4) * 0.62) + 4);
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

  describe('slider with set value', () => {
    let fixture: ComponentFixture<SliderWithValueComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NzSliderComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(SliderWithValueComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.injector.get<NzSliderComponent>(NzSliderComponent);
      sliderNativeElement = sliderInstance.sliderDOM;
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

  describe('slider with set step', () => {
    let fixture: ComponentFixture<SliderWithStepComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SliderWithStepComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.injector.get<NzSliderComponent>(NzSliderComponent);
      sliderNativeElement = sliderInstance.sliderDOM;
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
      const testStep = (step: number, expected: string) => {
        fixture.componentInstance.step = step;
        fixture.detectChanges();
        dispatchSlideEventSequence(sliderNativeElement, 0, 0.333333);

        expect(sliderInstance.value.toString()).toBe(expected);
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

  describe('slider with set min and max and a value smaller than min', () => {
    let fixture: ComponentFixture<SliderWithValueSmallerThanMinComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SliderWithValueSmallerThanMinComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.componentInstance;
      sliderNativeElement = sliderInstance.sliderDOM;
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

  describe('slider with set min and max and a value greater than max', () => {
    let fixture: ComponentFixture<SliderWithValueGreaterThanMaxComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let trackFillElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(SliderWithValueGreaterThanMaxComponent);
      fixture.detectChanges();

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.componentInstance;
      sliderNativeElement = sliderInstance.sliderDOM;
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

  describe('vertical slider', () => {
    let fixture: ComponentFixture<VerticalSliderComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let trackFillElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let testComponent: VerticalSliderComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(VerticalSliderComponent);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.injector.get<NzSliderComponent>(NzSliderComponent);
      sliderNativeElement = sliderInstance.sliderDOM;
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

      expect(parseInt(trackFillElement.style.height, 10)).toBeCloseTo(62, -1);
    });

    it('should have ant-slider-vertical class', () => {
      expect(sliderNativeElement.classList).toContain('ant-slider-vertical');
    });
  });

  describe('mixed slider usage', () => {
    let fixture: ComponentFixture<MixedSliderComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let trackFillElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let testComponent: MixedSliderComponent;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(MixedSliderComponent);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;
      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.componentInstance;
      sliderNativeElement = sliderInstance.sliderDOM;
      trackFillElement = sliderNativeElement.querySelector('.ant-slider-track') as HTMLElement;
    });

    beforeEach(inject([ OverlayContainer ], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }));

    it('update the correct range value and show correct marks format', () => {
      expect(sliderNativeElement.textContent).toContain('(22%)');
      expect(sliderNativeElement.textContent).toContain('(36%)');

      testComponent.range = true;
      fixture.detectChanges();

      dispatchClickEventSequence(sliderNativeElement, 0.1);
      dispatchClickEventSequence(sliderNativeElement, 0.6);
      fixture.detectChanges();

      expect(sliderInstance.value).toEqual([ 10, 60 ]);
    });

    it('should/shouldn\'t be included', () => {
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

    it('should stop at new marks when step=null or dots=true', () => {
      testComponent.marks = { 15: { style: { 'color': 'red' }, label: '15' }, 33: '33' } as any; // tslint:disable-line:no-any
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
      const handlerHost = sliderNativeElement.querySelector('nz-slider-handle');

      dispatchClickEventSequence(sliderNativeElement, 0.13);
      fixture.detectChanges();

      dispatchMouseEvent(handlerHost, 'mouseenter');
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('VALUE-13');

      dispatchMouseEvent(handlerHost, 'mouseleave');
      tick(400); // Wait for tooltip's antimations
      expect(overlayContainerElement.textContent).not.toContain('VALUE-13');
    }));
  });

  describe('slider as a custom form control', () => {
    let fixture: ComponentFixture<SliderWithFormControlComponent>;
    let sliderDebugElement: DebugElement;
    let sliderNativeElement: HTMLElement;
    let sliderInstance: NzSliderComponent;
    let testComponent: SliderWithFormControlComponent;
    let sliderControl: AbstractControl;

    beforeEach(() => {
      fixture = TestBed.createComponent(SliderWithFormControlComponent);
      fixture.detectChanges();

      testComponent = fixture.debugElement.componentInstance;

      sliderDebugElement = fixture.debugElement.query(By.directive(NzSliderComponent));
      sliderInstance = sliderDebugElement.componentInstance;
      sliderNativeElement = sliderInstance.sliderDOM;
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
  template: `<nz-slider></nz-slider>`,
  styles: [ styles ]
})
class StandardSliderComponent { }

@Component({
  template: `<nz-slider [nzDisabled]="disable"></nz-slider>`,
  styles: [ styles ]
})
class DisableSliderComponent {
  disable = true;
}

@Component({
  template: `<nz-slider [nzMin]="min" [nzMax]="max"></nz-slider>`,
  styles: [ styles ]
})
class SliderWithMinAndMaxComponent {
  min = 4;
  max = 6;
}

@Component({
  template: `<nz-slider [ngModel]="26"></nz-slider>`,
  styles: [ styles ]
})
class SliderWithValueComponent { }

@Component({
  template: `<nz-slider [nzStep]="step"></nz-slider>`,
  styles: [ styles ]
})
class SliderWithStepComponent {
  step = 25;
}

@Component({
  template: `<nz-slider [ngModel]="3" [nzMin]="4" [nzMax]="6"></nz-slider>`,
  styles: [ styles ]
})
class SliderWithValueSmallerThanMinComponent { }

@Component({
  template: `<nz-slider [ngModel]="7" [nzMin]="4" [nzMax]="6"></nz-slider>`,
  styles: [ styles ]
})
class SliderWithValueGreaterThanMaxComponent { }

@Component({
  template: `<nz-slider nzVertical></nz-slider>`,
  styles: [ styles ]
})
class VerticalSliderComponent { }

@Component({
  template: `<nz-slider [nzRange]="range" [nzStep]="step" [nzMarks]="marks" [nzDots]="dots" [nzIncluded]="included" [nzTipFormatter]="tipFormatter"></nz-slider>`,
  styles: [ styles ]
})
class MixedSliderComponent {
  range = false;
  step = 1;
  marks = { 22: '(22%)', 36: '(36%)' };
  dots = false;
  included = true;

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
  styles: [ styles ]
})
class SliderWithFormControlComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      slider: [ 42 ]
    });
  }
}

/**
 * Dispatches a click event sequence (consisting of moueseenter, click) from an element.
 * Note: The mouse event truncates the position for the click.
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param percentage The percentage of the slider where the click should occur. Used to find the
 * physical location of the click.
 */
function dispatchClickEventSequence(sliderElement: HTMLElement, percentage: number): void {
  const trackElement = sliderElement.querySelector('.ant-slider-rail');
  const dimensions = trackElement.getBoundingClientRect();
  const x = dimensions.left + (dimensions.width * percentage);
  const y = dimensions.top + (dimensions.height * percentage);

  dispatchMouseenterEvent(sliderElement);
  dispatchMouseEvent(sliderElement, 'mousedown', x, y);
  dispatchMouseEvent(document, 'mouseup', x, y);
}

/**
 * Dispatches a slide event sequence (consisting of slidestart, slide, slideend) from an element.
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param startPercent The percentage of the slider where the slide will begin.
 * @param endPercent The percentage of the slider where the slide will end.
 * @param stick Whether stick on and not mouseup when move at the end
 */
function dispatchSlideEventSequence(sliderElement: HTMLElement, startPercent: number,
                                    endPercent: number, stick: boolean = false): void {
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
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will happen.
 */
function dispatchSlideEvent(sliderElement: HTMLElement, percent: number): void {
  const trackElement = sliderElement.querySelector('.ant-slider-rail');
  const dimensions = trackElement.getBoundingClientRect();
  const x = dimensions.left + (dimensions.width * percent);
  const y = dimensions.top + (dimensions.height * percent);

  dispatchMouseEvent(document, 'mousemove', x, y);
}

/**
 * Dispatches a slidestart event from an element.
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will begin.
 */
function dispatchSlideStartEvent(sliderElement: HTMLElement, percent: number): void {
  const trackElement = sliderElement.querySelector('.ant-slider-rail');
  const dimensions = trackElement.getBoundingClientRect();
  const x = dimensions.left + (dimensions.width * percent);
  const y = dimensions.top + (dimensions.height * percent);

  dispatchMouseenterEvent(sliderElement);

  dispatchMouseEvent(sliderElement, 'mousedown', x, y);
}

/**
 * Dispatches a slideend event from an element.
 * @param sliderElement The sliderDOM element from which the event will be dispatched.
 * @param percent The percentage of the slider where the slide will end.
 */
function dispatchSlideEndEvent(sliderElement: HTMLElement, percent: number): void {
  const trackElement = sliderElement.querySelector('.ant-slider-rail');
  const dimensions = trackElement.getBoundingClientRect();
  const x = dimensions.left + (dimensions.width * percent);
  const y = dimensions.top + (dimensions.height * percent);

  dispatchMouseEvent(document, 'mouseup', x, y);
}

/**
 * Dispatches a mouseenter event from an element.
 * Note: The mouse event truncates the position for the click.
 * @param element The element from which the event will be dispatched.
 */
function dispatchMouseenterEvent(element: HTMLElement): void {
  const dimensions = element.getBoundingClientRect();
  const y = dimensions.top;
  const x = dimensions.left;

  dispatchMouseEvent(element, 'mouseenter', x, y);
}
