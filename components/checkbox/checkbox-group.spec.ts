/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { updateNonSignalsInput } from 'ng-zorro-antd/core/testing';

import { NzCheckboxOption } from './checkbox-group.component';
import { NzCheckboxModule } from './checkbox.module';

describe('checkbox group', () => {
  let component: CheckboxGroupTestComponent;
  let fixture: ComponentFixture<CheckboxGroupTestComponent>;
  let hostElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGroupTestComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement.querySelector('nz-checkbox-group');
    fixture.autoDetectChanges();
  });

  it('should be render option elements', () => {
    let elements = getOptionElements();
    for (let index = 0; index < elements.length; index++) {
      expect(elements[index].textContent?.trim()).toBe((component.options()[index] as NzCheckboxOption).label);
    }
    component.options.set([1, 2, 3]);
    fixture.detectChanges();
    elements = getOptionElements();
    for (let index = 0; index < elements.length; index++) {
      expect(elements[index].textContent?.trim()).toBe(component.options()[index].toString());
    }
    component.options.set(['a', 'b', 'c']);
    fixture.detectChanges();
    elements = getOptionElements();
    for (let index = 0; index < elements.length; index++) {
      expect(elements[index].textContent?.trim()).toBe(component.options()[index].toString());
    }
  });

  it('should be name work', () => {
    component.name.set('zorro');
    fixture.detectChanges();
    const elements = getOptionElements();
    for (const element of elements) {
      expect(element.querySelector<HTMLInputElement>('input[type=checkbox]')!.name).toBe('zorro');
    }
  });

  it('should be apply disabled class', () => {
    component.disabled.set(true);
    fixture.detectChanges();
    for (const element of getOptionElements()) {
      expect(element.classList).toContain('ant-checkbox-wrapper-disabled');
    }
  });

  it('should be set disabled by ng control', async () => {
    component.controlDisabled.set(true);
    await fixture.whenStable();
    for (const element of getOptionElements()) {
      expect(element.classList).toContain('ant-checkbox-wrapper-disabled');
    }
  });

  it('should be change value', async () => {
    component.value.set(['A']);
    await fixture.whenStable();
    let checkedOptionElements = getOptionElements().filter(ele =>
      ele.classList.contains('ant-checkbox-wrapper-checked')
    );
    expect(checkedOptionElements.length).toBe(1);
    expect(checkedOptionElements[0].textContent?.trim()).toBe('A');

    component.value.set(['A', 'B']);
    await fixture.whenStable();
    checkedOptionElements = getOptionElements().filter(ele => ele.classList.contains('ant-checkbox-wrapper-checked'));
    expect(checkedOptionElements.length).toBe(2);
    expect(checkedOptionElements[0].textContent?.trim()).toBe('A');
    expect(checkedOptionElements[1].textContent?.trim()).toBe('B');

    component.value.set([]);
    await fixture.whenStable();
    checkedOptionElements = getOptionElements().filter(ele => ele.classList.contains('ant-checkbox-wrapper-checked'));
    expect(checkedOptionElements.length).toBe(0);
  });

  function getOptionElements(): HTMLElement[] {
    return Array.from(hostElement.querySelectorAll('.ant-checkbox-group-item'));
  }
});

describe('checkbox group with custom layout', () => {
  let component: CheckboxGroupWithCustomLayoutTestComponent;
  let fixture: ComponentFixture<CheckboxGroupWithCustomLayoutTestComponent>;
  let hostElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGroupWithCustomLayoutTestComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement.querySelector('nz-checkbox-group');
    fixture.autoDetectChanges();
  });

  it('should be apply disabled class', () => {
    component.disabled.set(true);
    fixture.detectChanges();
    for (const element of getOptionElements()) {
      expect(element.classList).toContain('ant-checkbox-wrapper-disabled');
    }
  });

  it('should be change value', async () => {
    component.value.set(['A']);
    fixture.detectChanges();
    await updateNonSignalsInput(fixture);
    fixture.detectChanges();
    let checkedOptionElements = getOptionElements().filter(ele =>
      ele.classList.contains('ant-checkbox-wrapper-checked')
    );
    expect(checkedOptionElements.length).toBe(1);
    expect(checkedOptionElements[0].textContent?.trim()).toBe('A');

    component.value.set(['A', 'B']);
    fixture.detectChanges();
    await updateNonSignalsInput(fixture);
    fixture.detectChanges();
    checkedOptionElements = getOptionElements().filter(ele => ele.classList.contains('ant-checkbox-wrapper-checked'));
    expect(checkedOptionElements.length).toBe(2);
    expect(checkedOptionElements[0].textContent?.trim()).toBe('A');
    expect(checkedOptionElements[1].textContent?.trim()).toBe('B');

    component.value.set([]);
    fixture.detectChanges();
    await updateNonSignalsInput(fixture);
    fixture.detectChanges();
    checkedOptionElements = getOptionElements().filter(ele => ele.classList.contains('ant-checkbox-wrapper-checked'));
    expect(checkedOptionElements.length).toBe(0);
  });

  it('should be change value by outer checkboxes', () => {
    const checkboxElements = getOptionElements();
    checkboxElements[0].click();
    fixture.detectChanges();
    expect(component.value()).toEqual(['A']);

    checkboxElements[1].click();
    fixture.detectChanges();
    expect(component.value()).toEqual(['A', 'B']);

    checkboxElements[0].click();
    fixture.detectChanges();
    expect(component.value()).toEqual(['B']);
  });

  function getOptionElements(): HTMLElement[] {
    return Array.from(hostElement.querySelectorAll('.ant-checkbox-group-item'));
  }
});

@Component({
  imports: [NzCheckboxModule, FormsModule],
  template: `
    <nz-checkbox-group
      [nzOptions]="options()"
      [nzName]="name()"
      [nzDisabled]="disabled()"
      [(ngModel)]="value"
      [disabled]="controlDisabled()"
    />
  `
})
class CheckboxGroupTestComponent {
  readonly options = signal<string[] | number[] | NzCheckboxOption[]>([
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' }
  ]);
  readonly value = signal<string[]>([]);
  readonly disabled = signal(false);
  readonly controlDisabled = signal(false);
  readonly name = signal<string | null>(null);
}

@Component({
  imports: [NzCheckboxModule, FormsModule],
  template: `
    <nz-checkbox-group [nzDisabled]="disabled()" [ngModel]="value()" (ngModelChange)="value.set($event)">
      <label nz-checkbox nzValue="A">A</label>
      <label nz-checkbox nzValue="B">B</label>
      <label nz-checkbox nzValue="C">C</label>
    </nz-checkbox-group>
  `
})
class CheckboxGroupWithCustomLayoutTestComponent {
  readonly value = signal<string[]>([]);
  readonly disabled = signal(false);
}
