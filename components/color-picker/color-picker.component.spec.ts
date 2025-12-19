/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzColorPickerComponent, NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import {
  NzColor,
  NzColorPickerFormatType,
  NzColorPickerTriggerType,
  NzPresetColor
} from 'ng-zorro-antd/color-picker/typings';
import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';

describe('color-picker', () => {
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

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideZoneChangeDetection()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestColorPickerComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzColorPickerComponent));
  });

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
    expect(overlayContainerElement.querySelector('.ant-color-picker-title-content')?.textContent?.trim()).toBe(
      'Color Picker'
    );
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
    if (clear) {
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
      const alphaInputElement = overlayContainerElement.querySelector('.ant-color-picker-alpha-input') as Element;
      expect(alphaInputElement).toBeFalsy();
    });
    discardPeriodicTasks();
  }));
});

@Component({
  imports: [NzButtonModule, NzColorPickerModule],
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
  let fixture: ComponentFixture<NzTestColorPickerFormComponent>;
  let component: NzTestColorPickerFormComponent;
  let resultEl: DebugElement;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(NzTestColorPickerFormComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzColorPickerComponent));
  }));

  it('color-picker form base', fakeAsync(() => {
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 102, 0)'
    );
  }));

  it('color-picker form disable', fakeAsync(() => {
    component.disable();
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-color-picker-disabled');
    component.enable();
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).not.toContain('ant-color-picker-disabled');
  }));
});

describe('nz-color-picker with presets', () => {
  let fixture: ComponentFixture<NzTestColorPickerPresetsComponent>;
  let testComponent: NzTestColorPickerPresetsComponent;
  let resultEl: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideZoneChangeDetection()]
    });
    fixture = TestBed.createComponent(NzTestColorPickerPresetsComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzColorPickerComponent));
  }));

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should render presets when provided', fakeAsync(() => {
    const trigger = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(trigger, 'click');
    waitingForTooltipToggling();

    const presetWrapper = overlayContainerElement.querySelector('.ant-color-picker-presets-wrapper');
    expect(presetWrapper).toBeTruthy();

    const collapseItems = overlayContainerElement.querySelectorAll('.ant-collapse-item');
    expect(collapseItems.length).toBe(2);
  }));

  it('should not render presets when null', fakeAsync(() => {
    testComponent.presets = null;
    fixture.detectChanges();

    const trigger = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(trigger, 'click');
    waitingForTooltipToggling();

    const presetWrapper = overlayContainerElement.querySelector('.ant-color-picker-presets-wrapper');
    expect(presetWrapper).toBeFalsy();
  }));

  it('should handle preset color selection', fakeAsync(() => {
    spyOn(testComponent, 'onColorChange');

    const trigger = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(trigger, 'click');
    waitingForTooltipToggling();

    const firstPresetColor = overlayContainerElement.querySelector(
      '.ant-color-picker-presets-items .ant-color-picker-color-block'
    );
    expect(firstPresetColor).toBeTruthy();

    dispatchMouseEvent(firstPresetColor as Element, 'click');
    fixture.detectChanges();
    tick(0);
    fixture.detectChanges();

    expect(testComponent.onColorChange).toHaveBeenCalled();
  }));

  it('should toggle preset groups', fakeAsync(() => {
    const trigger = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(trigger, 'click');
    waitingForTooltipToggling();

    const collapseItems = overlayContainerElement.querySelectorAll('.ant-collapse-item');
    const secondPanel = collapseItems[1] as HTMLElement;

    // Initially, second group should be collapsed (no active class)
    expect(secondPanel.classList.contains('ant-collapse-item-active')).toBeFalse();

    // Find and click the collapse header to toggle
    const collapseHeader = secondPanel.querySelector('.ant-collapse-header');
    if (collapseHeader) {
      dispatchMouseEvent(collapseHeader, 'click');
      fixture.detectChanges();
      tick(300); // Wait for collapse animation
      fixture.detectChanges();
    }
  }));
});

@Component({
  imports: [NzColorPickerModule, NzFormModule, ReactiveFormsModule],
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

@Component({
  imports: [NzColorPickerModule],
  template: `
    <nz-color-picker [nzPresets]="presets" [nzValue]="'#1677ff'" (nzOnChange)="onColorChange($event)">
    </nz-color-picker>
  `
})
export class NzTestColorPickerPresetsComponent {
  presets: NzPresetColor[] | null = [
    {
      label: 'Basic Colors',
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      defaultOpen: true,
      key: 'basic'
    },
    {
      label: 'Advanced Colors',
      colors: ['#ffff00', '#ff00ff', '#00ffff'],
      defaultOpen: false,
      key: 'advanced'
    }
  ];

  onColorChange(event: { color: NzColor; format: string }): void {
    console.log('Color changed:', event);
  }
}
