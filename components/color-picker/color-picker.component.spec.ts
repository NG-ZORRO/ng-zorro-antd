import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, tick, discardPeriodicTasks } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzColorPickerComponent, NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzColor, NzColorPickerFormatType, NzColorPickerTriggerType } from 'ng-zorro-antd/color-picker/typings';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';

describe('nz-color-picker', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestColorPickerComponent>;
    let fixture: ComponentFixture<NzTestColorPickerComponent>;
    let testComponent: NzTestColorPickerComponent;
    let resultEl: DebugElement;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;

    function waitingForTooltipToggling(): void {
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
    }

    beforeEach(fakeAsync(() => {
      testBed = createComponentBed(NzTestColorPickerComponent, {
        imports: [NzColorPickerModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzColorPickerComponent));
    }));

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    }));

    afterEach(() => {
      overlayContainer.ngOnDestroy();
    });

    it('color-picker basic', () => {
      fixture.detectChanges();
      const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
      expect(colorDom.style.backgroundColor).toBe('rgb(22, 119, 255)');
    });

    it('color-picker nzValue', () => {
      testComponent.nzValue = '#ff6600';
      fixture.detectChanges();
      const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
      expect(colorDom.style.backgroundColor).toBe('rgb(255, 102, 0)');
    });

    it('color-picker nzDefaultValue', () => {
      testComponent.nzDefaultValue = '#ff6600';
      fixture.detectChanges();
      const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
      expect(colorDom.style.backgroundColor).toBe('rgb(255, 102, 0)');
    });

    it('color-picker nzSize', () => {
      testComponent.nzSize = 'small';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-color-picker-trigger').classList).toContain(
        'ant-color-picker-sm'
      );
      testComponent.nzSize = 'large';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-color-picker-trigger').classList).toContain(
        'ant-color-picker-lg'
      );
    });

    it('color-picker nzDisabled', () => {
      testComponent.nzDisabled = true;
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-color-picker-disabled');
    });

    it('color-picker nzShowText', () => {
      testComponent.nzShowText = true;
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-color-picker-trigger-text').innerText).toBe('#1677ff');
    });

    it('color-picker nzTrigger click', fakeAsync(() => {
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
    }));

    it('color-picker nzTrigger hover', fakeAsync(() => {
      testComponent.nzTrigger = 'hover';
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'mouseenter');
      waitingForTooltipToggling();
      expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
    }));

    it('color-picker nzOpen', () => {
      testComponent.nzOpen = true;
      fixture.detectChanges();
      expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
    });

    it('color-picker nzAllowClear', fakeAsync(() => {
      testComponent.nzAllowClear = true;
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!!overlayContainerElement.querySelector('.ant-color-picker-clear')).toBeTrue();
    }));

    it('color-picker nzTitle', fakeAsync(() => {
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(
        overlayContainerElement.querySelector('.ant-color-picker-title-content')?.querySelector('span')?.innerText
      ).toBe('Color Picker');
    }));

    it('color-picker nzFlipFlop', () => {
      testComponent.isFlipFlop = true;
      fixture.detectChanges();
      expect(!!resultEl.nativeElement.querySelector('button')).toBeTrue();
    });

    it('color-picker nzFormat', fakeAsync(() => {
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(!!overlayContainerElement.querySelector('.ant-color-picker-hex-input')).toBeTrue();
      testComponent.nzFormat = 'hsb';
      fixture.detectChanges();
      waitingForTooltipToggling();
      expect(!!overlayContainerElement.querySelector('.ant-color-picker-hsb-input')).toBeTrue();
      testComponent.nzFormat = 'rgb';
      fixture.detectChanges();
      waitingForTooltipToggling();
      expect(!!overlayContainerElement.querySelector('.ant-color-picker-rgb-input')).toBeTrue();
    }));

    it('color-picker nzOnOpenChange', fakeAsync(() => {
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      expect(testComponent.openChange).toBeTrue();
    }));

    it('color-picker nzOnClear', fakeAsync(() => {
      testComponent.nzAllowClear = true;
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      const clear = overlayContainerElement.querySelector('.ant-color-picker-clear');
      if (!!clear) {
        dispatchMouseEvent(clear, 'click');
        fixture.detectChanges();
        waitingForTooltipToggling();
        const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
        expect(colorDom.style.backgroundColor).toBe('rgba(22, 119, 255, 0)');
        discardPeriodicTasks();
      }
    }));

    it('color-picker nzOnChange', fakeAsync(() => {
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      const select = overlayContainerElement.querySelector('nz-select') as Element;
      dispatchMouseEvent(select, 'click');
      waitingForTooltipToggling();
      const item = overlayContainerElement.querySelectorAll('nz-option-item')[1];
      dispatchMouseEvent(item, 'click');
      waitingForTooltipToggling();
      expect(testComponent.colorChange?.format).toBe('hsb');
      expect(testComponent.colorChange?.color.toHsbString()).toBe('hsb(215, 91%, 100%)');
      discardPeriodicTasks();
    }));

    it('color-picker disableAlpha', fakeAsync(() => {
      testComponent.nzAlphaDisabled = true;
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      const alphaSlider = overlayContainerElement.querySelector('.ant-color-picker-slider-alpha') as Element;
      expect(alphaSlider).toBeFalsy();
      discardPeriodicTasks();
    }));

    it('nz-color-format disableAlpha', fakeAsync(() => {
      testComponent.nzAlphaDisabled = true;
      fixture.detectChanges();
      const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
      dispatchMouseEvent(dom, 'click');
      waitingForTooltipToggling();
      const select = overlayContainerElement.querySelector('nz-select') as Element;
      dispatchMouseEvent(select, 'click');
      waitingForTooltipToggling();
      const items = overlayContainerElement.querySelectorAll('nz-option-item');
      items.forEach(item => {
        dispatchMouseEvent(item, 'click');
        waitingForTooltipToggling();
        let alphaInputElement = overlayContainerElement.querySelector('.ant-color-picker-alpha-input') as Element;
        expect(alphaInputElement).toBeFalsy();
      });
      discardPeriodicTasks();
    }));
  });
});

@Component({
  template: `
    <nz-color-picker
      [nzValue]="nzValue"
      [nzSize]="nzSize"
      [nzDefaultValue]="nzDefaultValue"
      [nzShowText]="nzShowText"
      [nzDisabled]="nzDisabled"
      [nzTrigger]="nzTrigger"
      [nzFormat]="nzFormat"
      [nzAllowClear]="nzAllowClear"
      [nzOpen]="nzOpen"
      [nzDisabledAlpha]="nzAlphaDisabled"
      (nzOnChange)="nzOnChange($event)"
      (nzOnFormatChange)="nzOnFormatChange($event)"
      (nzOnClear)="nzOnClear($event)"
      (nzOnOpenChange)="nzOnOpenChange($event)"
      nzTitle="Color Picker"
      [nzFlipFlop]="isFlipFlop ? flipFlop : null"
    ></nz-color-picker>
    <ng-template #flipFlop>
      <button nz-button nzType="primary">Color</button>
    </ng-template>
  `
})
export class NzTestColorPickerComponent {
  nzFormat: NzColorPickerFormatType | null = null;
  nzValue = '';
  nzSize: NzSizeLDSType = 'default';
  nzDefaultValue = '';
  nzTrigger: NzColorPickerTriggerType = 'click';
  nzShowText: boolean = false;
  nzAllowClear: boolean = false;
  nzDisabled: boolean = false;
  nzAlphaDisabled: boolean = false;
  nzOpen: boolean = false;

  isFlipFlop = false;

  isClear = false;
  openChange = false;
  colorChange: { color: NzColor; format: string } | null = null;
  formatChange: NzColorPickerFormatType | null = null;
  nzOnChange(value: { color: NzColor; format: string }): void {
    this.colorChange = value;
  }
  nzOnFormatChange(value: NzColorPickerFormatType): void {
    this.formatChange = value;
  }
  nzOnClear(value: boolean): void {
    this.isClear = value;
  }
  nzOnOpenChange(value: boolean): void {
    this.openChange = value;
  }
}

describe('nz-color-picker form', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestColorPickerFormComponent>;
    let fixture: ComponentFixture<NzTestColorPickerFormComponent>;
    let testComponent: NzTestColorPickerFormComponent;
    let resultEl: DebugElement;

    beforeEach(fakeAsync(() => {
      testBed = createComponentBed(NzTestColorPickerFormComponent, {
        imports: [NzColorPickerModule, NzFormModule, ReactiveFormsModule, FormsModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzColorPickerComponent));
    }));

    it('color-picker form base', fakeAsync(() => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
        'rgb(255, 102, 0)'
      );
    }));

    it('color-picker form disable', fakeAsync(() => {
      testComponent.disable();
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-color-picker-disabled');
      testComponent.enable();
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).not.toContain('ant-color-picker-disabled');
    }));
  });
});

@Component({
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-form-item>
        <nz-form-label [nzSpan]="4">color</nz-form-label>
        <nz-form-control [nzSpan]="16">
          <nz-color-picker formControlName="colorPicker" nzShowText></nz-color-picker>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestColorPickerFormComponent {
  validateForm = new FormGroup({
    colorPicker: new FormControl('#ff6600')
  });

  disable(): void {
    this.validateForm.disable();
  }

  enable(): void {
    this.validateForm.enable();
  }
}
