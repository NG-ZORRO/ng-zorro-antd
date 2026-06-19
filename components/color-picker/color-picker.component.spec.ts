/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzColorPickerComponent, NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import {
  NzColor,
  NzColorPickerFormatType,
  NzColorPickerTriggerType,
  NzPresetColor
} from 'ng-zorro-antd/color-picker/typings';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NZ_FORM_SIZE } from 'ng-zorro-antd/core/form';
import { dispatchFakeEvent, dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
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
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
  }

  async function openFormatSelect(): Promise<NodeListOf<Element>> {
    const select = overlayContainerElement.querySelector('.ant-color-picker-format-select nz-select')!;
    dispatchFakeEvent(select, 'click');
    waitingForTooltipToggling();
    await fixture.whenStable();
    fixture.detectChanges();
    return document.querySelectorAll('nz-option-item');
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });

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

  beforeEach(() => vi.useFakeTimers());

  afterEach(() => vi.useRealTimers());

  it('color-picker basic', () => {
    fixture.detectChanges();
    const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
    expect(colorDom.style.backgroundColor).toBe('rgb(22, 119, 255)');
  });

  it('color-picker nzValue', () => {
    testComponent.nzValue.set('#ff6600');
    fixture.detectChanges();
    const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
    expect(colorDom.style.backgroundColor).toBe('rgb(255, 102, 0)');
  });

  it('color-picker nzDefaultValue', () => {
    testComponent.nzDefaultValue.set('#ff6600');
    fixture.detectChanges();
    const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
    expect(colorDom.style.backgroundColor).toBe('rgb(255, 102, 0)');
  });

  it('color-picker nzSize', () => {
    testComponent.nzSize.set('small');
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-trigger').classList).toContain(
      'ant-color-picker-sm'
    );
    testComponent.nzSize.set('large');
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-trigger').classList).toContain(
      'ant-color-picker-lg'
    );
  });

  it('color-picker nzDisabled', () => {
    testComponent.nzDisabled.set(true);
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-color-picker-disabled');
  });

  it('color-picker nzShowText', () => {
    testComponent.nzShowText.set(true);
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-trigger-text').innerText).toBe('#1677ff');
  });

  it('color-picker nzTrigger click', () => {
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'click');
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
  });

  it('color-picker nzTrigger hover', () => {
    testComponent.nzTrigger.set('hover');
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'mouseenter');
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
  });

  it('color-picker nzOpen', () => {
    testComponent.nzOpen.set(true);
    fixture.detectChanges();
    expect(!!overlayContainerElement.querySelector('.ant-popover-inner-content')).toBeTrue();
  });

  it('color-picker should default to bottomLeft placement with corner fallbacks (#9711)', () => {
    testComponent.nzOpen.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();

    const popover = overlayContainerElement.querySelector('.ant-popover');
    expect(popover).toBeTruthy();
    expect(popover!.classList).toContain('ant-popover-placement-bottomLeft');

    const colorPicker = resultEl.componentInstance as NzColorPickerComponent & { popoverPlacements: string[] };
    expect(colorPicker.popoverPlacements).toEqual(['bottomLeft', 'bottomRight', 'topLeft', 'topRight']);
  });

  it('color-picker should remain fully visible when triggered near the bottom-right edge (#9711)', () => {
    const trigger = resultEl.nativeElement.querySelector('.ant-color-picker-trigger') as HTMLElement;
    trigger.style.position = 'fixed';
    trigger.style.right = '0px';
    trigger.style.bottom = '0px';
    fixture.detectChanges();

    testComponent.nzOpen.set(true);
    fixture.detectChanges();
    waitingForTooltipToggling();

    const popover = overlayContainerElement.querySelector('.ant-popover') as HTMLElement;
    expect(popover).toBeTruthy();

    const rect = popover.getBoundingClientRect();
    expect(rect.right).toBeLessThanOrEqual(window.innerWidth);
    expect(rect.bottom).toBeLessThanOrEqual(window.innerHeight);
    expect(rect.left).toBeGreaterThanOrEqual(0);
    expect(rect.top).toBeGreaterThanOrEqual(0);
  });

  it('color-picker nzAllowClear', () => {
    testComponent.nzAllowClear.set(true);
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'click');
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-color-picker-clear')).toBeTrue();
  });

  it('color-picker nzTitle', () => {
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'click');
    waitingForTooltipToggling();
    expect(overlayContainerElement.querySelector('.ant-color-picker-title-content')?.textContent?.trim()).toBe(
      'Color Picker'
    );
  });

  it('color-picker nzFlipFlop', () => {
    testComponent.isFlipFlop.set(true);
    fixture.detectChanges();
    expect(!!resultEl.nativeElement.querySelector('button')).toBeTrue();
  });

  it('color-picker nzFormat', () => {
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'click');
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-color-picker-hex-input')).toBeTrue();
    testComponent.nzFormat.set('hsb');
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-color-picker-hsb-input')).toBeTrue();
    testComponent.nzFormat.set('rgb');
    fixture.detectChanges();
    waitingForTooltipToggling();
    expect(!!overlayContainerElement.querySelector('.ant-color-picker-rgb-input')).toBeTrue();
  });

  it('color-picker nzOnOpenChange', () => {
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'click');
    waitingForTooltipToggling();
    expect(testComponent.openChange).toBeTrue();
  });

  it('color-picker nzOnClear', async () => {
    testComponent.nzAllowClear.set(true);
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'click');
    waitingForTooltipToggling();
    const clear = overlayContainerElement.querySelector('.ant-color-picker-clear');
    if (clear) {
      dispatchMouseEvent(clear, 'click');
      fixture.detectChanges();
      waitingForTooltipToggling();
      await fixture.whenStable();
      fixture.detectChanges();
      const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
      expect(colorDom.style.backgroundColor).toBe('rgba(22, 119, 255, 0)');
    }
  });

  it('color-picker nzOnChange', () => {
    const colorPicker = resultEl.componentInstance as NzColorPickerComponent;

    colorPicker.formatChange({ color: 'hsb(180, 91%, 100%)', format: 'hsb' });

    expect(testComponent.colorChange?.format).toBe('hsb');
    expect(testComponent.colorChange?.color.toHsbString()).toBe('hsb(180, 91%, 100%)');
  });

  it('color-picker disableAlpha', () => {
    testComponent.nzAlphaDisabled.set(true);
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'click');
    waitingForTooltipToggling();
    const alphaSlider = overlayContainerElement.querySelector('.ant-color-picker-slider-alpha') as Element;
    expect(alphaSlider).toBeFalsy();
  });

  it('nz-color-format disableAlpha', async () => {
    testComponent.nzAlphaDisabled.set(true);
    fixture.detectChanges();
    const dom = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(dom, 'click');
    waitingForTooltipToggling();
    const items = await openFormatSelect();
    expect(items.length).toBeGreaterThan(0);
    items.forEach(item => {
      dispatchMouseEvent(item, 'click');
      waitingForTooltipToggling();
      const alphaInputElement = overlayContainerElement.querySelector('.ant-color-picker-alpha-input') as Element;
      expect(alphaInputElement).toBeFalsy();
    });
  });
});

@Component({
  imports: [NzButtonModule, NzColorPickerModule],
  template: `
    <nz-color-picker
      [nzValue]="nzValue()"
      [nzSize]="nzSize()"
      [nzDefaultValue]="nzDefaultValue()"
      [nzShowText]="nzShowText()"
      [nzDisabled]="nzDisabled()"
      [nzTrigger]="nzTrigger()"
      [nzFormat]="nzFormat()"
      [nzAllowClear]="nzAllowClear()"
      [nzOpen]="nzOpen()"
      [nzDisabledAlpha]="nzAlphaDisabled()"
      (nzOnChange)="nzOnChange($event)"
      (nzOnFormatChange)="nzOnFormatChange($event)"
      (nzOnClear)="nzOnClear($event)"
      (nzOnOpenChange)="nzOnOpenChange($event)"
      nzTitle="Color Picker"
      [nzFlipFlop]="isFlipFlop() ? flipFlop : null"
    />
    <ng-template #flipFlop>
      <button nz-button nzType="primary">Color</button>
    </ng-template>
  `
})
export class NzTestColorPickerComponent {
  readonly nzFormat = signal<NzColorPickerFormatType | null>(null);
  readonly nzValue = signal('');
  readonly nzSize = signal<NzSizeLDSType>('default');
  readonly nzDefaultValue = signal('');
  readonly nzTrigger = signal<NzColorPickerTriggerType>('click');
  readonly nzShowText = signal<boolean>(false);
  readonly nzAllowClear = signal<boolean>(false);
  readonly nzDisabled = signal<boolean>(false);
  readonly nzAlphaDisabled = signal<boolean>(false);
  readonly nzOpen = signal<boolean>(false);

  readonly isFlipFlop = signal(false);

  isClear = false;
  openChange = false;
  colorChange: { color: NzColor; format: string } | null = null;
  formatChange: NzColorPickerFormatType | null = null;
  nzOnChange(value: { color: NzColor; format: string }): void {
    this.colorChange = value;
    this.nzValue.set(value.color.toRgbString());
  }
  nzOnFormatChange(value: NzColorPickerFormatType): void {
    this.formatChange = value;
  }
  nzOnClear(value: boolean): void {
    this.isClear = value;
    if (value) {
      this.nzValue.set('rgba(22, 119, 255, 0)');
    }
  }
  nzOnOpenChange(value: boolean): void {
    this.openChange = value;
    this.nzOpen.set(value);
  }
}

describe('nz-color-picker form', () => {
  let fixture: ComponentFixture<NzTestColorPickerFormComponent>;
  let component: NzTestColorPickerFormComponent;
  let resultEl: DebugElement;

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
    fixture = TestBed.createComponent(NzTestColorPickerFormComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzColorPickerComponent));
  });

  it('color-picker form base', () => {
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 102, 0)'
    );
  });

  it('color-picker form disable', () => {
    component.disable();
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-color-picker-disabled');
    component.enable();
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).not.toContain('ant-color-picker-disabled');
  });
});

describe('nz-color-picker with presets', () => {
  let fixture: ComponentFixture<NzTestColorPickerPresetsComponent>;
  let testComponent: NzTestColorPickerPresetsComponent;
  let resultEl: DebugElement;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    vi.advanceTimersByTime(500);
    fixture.detectChanges();
  }

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
    fixture = TestBed.createComponent(NzTestColorPickerPresetsComponent);
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

  it('should render presets when provided', () => {
    const trigger = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(trigger, 'click');
    waitingForTooltipToggling();

    const presetWrapper = overlayContainerElement.querySelector('.ant-color-picker-presets-wrapper');
    expect(presetWrapper).toBeTruthy();

    const collapseItems = overlayContainerElement.querySelectorAll('.ant-collapse-item');
    expect(collapseItems.length).toBe(2);
  });

  it('should not render presets when null', () => {
    testComponent.presets.set(null);
    fixture.detectChanges();

    const trigger = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(trigger, 'click');
    waitingForTooltipToggling();

    const presetWrapper = overlayContainerElement.querySelector('.ant-color-picker-presets-wrapper');
    expect(presetWrapper).toBeFalsy();
  });

  it('should handle preset color selection', async () => {
    vi.spyOn(testComponent, 'onColorChange');

    const trigger = resultEl.nativeElement.querySelector('.ant-color-picker-trigger');
    dispatchMouseEvent(trigger, 'click');
    waitingForTooltipToggling();

    const firstPresetColor = overlayContainerElement.querySelector(
      '.ant-color-picker-presets-items .ant-color-picker-color-block'
    );
    expect(firstPresetColor).toBeTruthy();

    dispatchMouseEvent(firstPresetColor as Element, 'click');
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(testComponent.onColorChange).toHaveBeenCalled();
  });

  it('should toggle preset groups', () => {
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
      vi.advanceTimersByTime(300); // Wait for collapse animation
      fixture.detectChanges();
    }
  });
});

@Component({
  imports: [NzColorPickerModule, NzFormModule, ReactiveFormsModule],
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-form-item>
        <nz-form-label [nzSpan]="4">color</nz-form-label>
        <nz-form-control [nzSpan]="16">
          <nz-color-picker formControlName="colorPicker" nzShowText />
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
  template: ` <nz-color-picker [nzPresets]="presets()" nzValue="#1677ff" (nzOnChange)="onColorChange($event)" /> `
})
export class NzTestColorPickerPresetsComponent {
  readonly presets = signal<NzPresetColor[] | null>([
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
  ]);

  onColorChange(event: { color: NzColor; format: string }): void {
    console.log('Color changed:', event);
  }
}

describe('nz-color-picker form size', () => {
  let fixture: ComponentFixture<NzTestColorPickerFormSizeComponent>;
  let colorPickerElement: HTMLElement;
  let formSizeSignal: WritableSignal<NzSizeLDSType | undefined>;

  beforeEach(() => {
    formSizeSignal = signal<NzSizeLDSType | undefined>(undefined);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should apply size from NZ_FORM_SIZE signal', () => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), { provide: NZ_FORM_SIZE, useValue: formSizeSignal }]
    });
    fixture = TestBed.createComponent(NzTestColorPickerFormSizeComponent);
    colorPickerElement = fixture.debugElement.query(By.directive(NzColorPickerComponent)).nativeElement;
    fixture.detectChanges();

    formSizeSignal.set('large');
    fixture.detectChanges();

    const trigger = colorPickerElement.querySelector('.ant-color-picker-trigger');
    expect(trigger?.classList).toContain('ant-color-picker-lg');
  });

  it('should apply small size from NZ_FORM_SIZE signal', () => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), { provide: NZ_FORM_SIZE, useValue: formSizeSignal }]
    });
    fixture = TestBed.createComponent(NzTestColorPickerFormSizeComponent);
    colorPickerElement = fixture.debugElement.query(By.directive(NzColorPickerComponent)).nativeElement;
    fixture.detectChanges();

    formSizeSignal.set('small');
    fixture.detectChanges();

    const trigger = colorPickerElement.querySelector('.ant-color-picker-trigger');
    expect(trigger?.classList).toContain('ant-color-picker-sm');
  });

  it('should prioritize NZ_FORM_SIZE over nzSize input', () => {
    formSizeSignal.set('large');
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), { provide: NZ_FORM_SIZE, useValue: formSizeSignal }]
    });
    fixture = TestBed.createComponent(NzTestColorPickerFormSizeComponent);
    colorPickerElement = fixture.debugElement.query(By.directive(NzColorPickerComponent)).nativeElement;
    fixture.componentInstance.size.set('small');
    fixture.detectChanges();

    const trigger = colorPickerElement.querySelector('.ant-color-picker-trigger');
    expect(trigger?.classList).toContain('ant-color-picker-lg');
    expect(trigger?.classList).not.toContain('ant-color-picker-sm');
  });

  it('should use nzSize input when NZ_FORM_SIZE is not provided', () => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
    fixture = TestBed.createComponent(NzTestColorPickerFormSizeComponent);
    colorPickerElement = fixture.debugElement.query(By.directive(NzColorPickerComponent)).nativeElement;
    fixture.componentInstance.size.set('large');
    fixture.detectChanges();

    const trigger = colorPickerElement.querySelector('.ant-color-picker-trigger');
    expect(trigger?.classList).toContain('ant-color-picker-lg');
  });

  it('should update size when NZ_FORM_SIZE signal changes', () => {
    formSizeSignal.set('small');
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), { provide: NZ_FORM_SIZE, useValue: formSizeSignal }]
    });
    fixture = TestBed.createComponent(NzTestColorPickerFormSizeComponent);
    colorPickerElement = fixture.debugElement.query(By.directive(NzColorPickerComponent)).nativeElement;
    fixture.detectChanges();

    let trigger = colorPickerElement.querySelector('.ant-color-picker-trigger');
    expect(trigger?.classList).toContain('ant-color-picker-sm');

    formSizeSignal.set('large');
    fixture.detectChanges();

    trigger = colorPickerElement.querySelector('.ant-color-picker-trigger');
    expect(trigger?.classList).toContain('ant-color-picker-lg');
    expect(trigger?.classList).not.toContain('ant-color-picker-sm');
  });

  it('should apply default size when NZ_FORM_SIZE is undefined', () => {
    formSizeSignal.set(undefined);
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation(), { provide: NZ_FORM_SIZE, useValue: formSizeSignal }]
    });
    fixture = TestBed.createComponent(NzTestColorPickerFormSizeComponent);
    colorPickerElement = fixture.debugElement.query(By.directive(NzColorPickerComponent)).nativeElement;
    fixture.detectChanges();

    const trigger = colorPickerElement.querySelector('.ant-color-picker-trigger');
    expect(trigger?.classList).not.toContain('ant-color-picker-lg');
    expect(trigger?.classList).not.toContain('ant-color-picker-sm');
  });
});

@Component({
  imports: [NzColorPickerModule],
  template: `<nz-color-picker [nzSize]="size()" />`
})
export class NzTestColorPickerFormSizeComponent {
  readonly size = signal<NzSizeLDSType>('default');
}
