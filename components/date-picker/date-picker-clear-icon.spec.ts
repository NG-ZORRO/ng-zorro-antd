/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzDatePickerComponent } from './date-picker.component';
import { NzDatePickerModule } from './date-picker.module';
import { NzDateMode } from './standard-types';

describe.each(['date', 'range'] as const)('DatePicker custom clear icon (%s)', kind => {
  let fixture: ComponentFixture<CustomClearIconTestComponent>;
  let component: CustomClearIconTestComponent;
  let picker: HTMLElement;

  beforeEach(async () => {
    TestBed.configureTestingModule({ providers: [provideNzNoAnimation()] });
    fixture = TestBed.createComponent(CustomClearIconTestComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
    picker = fixture.nativeElement.querySelector(`.custom-${kind}`);
  });

  it('should keep the default close-circle icon when no custom content is provided', () => {
    const defaultPicker: HTMLElement = fixture.nativeElement.querySelector(`.default-${kind}`);
    expect(defaultPicker.querySelector('.ant-picker-clear .anticon-close-circle')).not.toBeNull();
    expect(defaultPicker.querySelector('.ant-picker-clear svg')?.getAttribute('data-icon')).toBe('close-circle');
  });

  it('should replace only the clear icon and retain the suffix icon', () => {
    expect(picker.querySelector('.ant-picker-clear [nzDatePickerClearIcon]')).not.toBeNull();
    expect(picker.querySelector('.ant-picker-clear .anticon-close-circle')).toBeNull();
    expect(picker.querySelector('.ant-picker-suffix .anticon-calendar')).not.toBeNull();
  });

  it('should clear the form control once without opening the popup when custom content is clicked', async () => {
    const control = kind === 'date' ? component.date : component.range;
    const onChange = vi.fn();
    const subscription =
      kind === 'date'
        ? component.date.valueChanges.subscribe(onChange)
        : component.range.valueChanges.subscribe(onChange);
    const pickerComponent = fixture.debugElement.query(By.css(`.custom-${kind}`))
      .componentInstance as NzDatePickerComponent;
    const onOpenChange = vi.spyOn(pickerComponent.nzOnOpenChange, 'emit');

    picker.querySelector('[nzDatePickerClearIcon] svg')!.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await fixture.whenStable();

    expect(control.value).toEqual(kind === 'date' ? null : []);
    expect(onChange).toHaveBeenCalledExactlyOnceWith(kind === 'date' ? null : []);
    expect(picker.querySelector('.ant-picker-clear')).toBeNull();
    expect(Array.from(picker.querySelectorAll('input')).every(input => input.value === '')).toBe(true);
    expect(onOpenChange).not.toHaveBeenCalled();
    expect(pickerComponent.realOpenState).toBe(false);
    subscription.unsubscribe();

    if (kind === 'date') {
      component.date.setValue(new Date(2026, 0, 2));
    } else {
      component.range.setValue([new Date(2026, 0, 2), new Date(2026, 0, 8)]);
    }
    await fixture.whenStable();
    expect(picker.querySelector('.ant-picker-clear [nzDatePickerClearIcon]')).not.toBeNull();
  });

  it('should hide the custom clear icon for an empty value', async () => {
    (kind === 'date' ? component.date : component.range).reset();
    await fixture.whenStable();
    expect(picker.querySelector('.ant-picker-clear')).toBeNull();
  });

  it('should respect nzAllowClear and the form control disabled state', async () => {
    component.allowClear.set(false);
    await fixture.whenStable();
    expect(picker.querySelector('.ant-picker-clear')).toBeNull();

    component.allowClear.set(true);
    const control = kind === 'date' ? component.date : component.range;
    control.disable();
    await fixture.whenStable();
    expect(picker.querySelector('.ant-picker-clear')).toBeNull();

    control.enable();
    await fixture.whenStable();
    expect(picker.querySelector('.ant-picker-clear [nzDatePickerClearIcon]')).not.toBeNull();
  });

  it.each<NzDateMode>(['week', 'month', 'quarter', 'year'])('should support %s mode', async mode => {
    component.mode.set(mode);
    await fixture.whenStable();
    expect(picker.querySelector('.ant-picker-clear [nzDatePickerClearIcon]')).not.toBeNull();
  });
});

@Component({
  imports: [ReactiveFormsModule, NzDatePickerModule, NzIconModule],
  template: `
    <nz-date-picker class="default-date" [formControl]="date" />
    <nz-range-picker class="default-range" [formControl]="range" />
    <nz-date-picker class="custom-date" [formControl]="date" [nzAllowClear]="allowClear()" [nzMode]="mode()">
      <nz-icon nzDatePickerClearIcon nzType="close" />
    </nz-date-picker>
    <nz-range-picker class="custom-range" [formControl]="range" [nzAllowClear]="allowClear()" [nzMode]="mode()">
      <span nzDatePickerClearIcon>
        <svg viewBox="0 0 16 16" width="1em" height="1em" aria-hidden="true">
          <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" />
        </svg>
      </span>
    </nz-range-picker>
  `
})
class CustomClearIconTestComponent {
  readonly date = new FormControl(new Date(2026, 0, 1));
  readonly range = new FormControl([new Date(2026, 0, 1), new Date(2026, 0, 7)]);
  readonly allowClear = signal(true);
  readonly mode = signal<NzDateMode>('date');
}
