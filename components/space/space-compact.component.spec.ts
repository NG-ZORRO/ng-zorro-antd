/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCascaderModule } from 'ng-zorro-antd/cascader';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { NzSpaceModule } from './space.module';
import { NzSpaceDirection } from './types';

describe('space compact', () => {
  let component: SpaceCompactTestComponent;
  let fixture: ComponentFixture<SpaceCompactTestComponent>;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideZoneChangeDetection()]
    });
    fixture = TestBed.createComponent(SpaceCompactTestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should render all child components', () => {
    const spaceCompactElement: HTMLElement = fixture.nativeElement;
    const nzInput = spaceCompactElement.querySelector('input[nz-input]');
    const nzInputWrapper = spaceCompactElement.querySelector('nz-input-wrapper');
    const nzInputGroup = spaceCompactElement.querySelector('nz-input-group');
    const nzInputNumber = spaceCompactElement.querySelector('nz-input-number');
    const nzDatePicker = spaceCompactElement.querySelector('nz-date-picker');
    const nzRangePicker = spaceCompactElement.querySelector('nz-range-picker');
    const nzTimePicker = spaceCompactElement.querySelector('nz-time-picker');
    const nzCascader = spaceCompactElement.querySelector('nz-cascader');
    const nzSelect = spaceCompactElement.querySelector('nz-select');
    const nzTreeSelect = spaceCompactElement.querySelector('nz-tree-select');
    const nzButton = spaceCompactElement.querySelector('button[nz-button]');

    expect(nzInput).toBeTruthy();
    expect(nzInputNumber).toBeTruthy();
    expect(nzInputWrapper).toBeTruthy();
    expect(nzInputGroup).toBeTruthy();
    expect(nzDatePicker).toBeTruthy();
    expect(nzRangePicker).toBeTruthy();
    expect(nzTimePicker).toBeTruthy();
    expect(nzCascader).toBeTruthy();
    expect(nzSelect).toBeTruthy();
    expect(nzTreeSelect).toBeTruthy();
    expect(nzButton).toBeTruthy();

    expect(nzInput!.classList).toContain('ant-input-compact-item');
    expect(nzInputWrapper!.classList).toContain('ant-input-compact-item');
    expect(nzInputWrapper!.querySelector('input.ant-input-compact-item')).toBeFalsy();
    expect(nzInputGroup!.classList).toContain('ant-input-compact-item');

    expect(nzInputNumber!.classList).toContain('ant-input-number-compact-item');

    expect(nzDatePicker!.classList).toContain('ant-picker-compact-item');
    expect(nzRangePicker!.classList).toContain('ant-picker-compact-item');
    expect(nzTimePicker!.classList).toContain('ant-picker-compact-item');

    expect(nzCascader!.classList).toContain('ant-select-compact-item');
    expect(nzSelect!.classList).toContain('ant-select-compact-item');
    expect(nzTreeSelect!.classList).toContain('ant-select-compact-item');

    expect(nzButton!.classList).toContain('ant-btn-compact-item');
  });

  it('should be possible to switch compact first / last classes', async () => {
    const spaceCompactElement: HTMLElement = fixture.nativeElement;
    const nzInput = spaceCompactElement.querySelector('input[nz-input]');
    const nzInputWrapper = spaceCompactElement.querySelector('nz-input-wrapper');
    const nzTreeSelect = spaceCompactElement.querySelector('nz-tree-select');
    const nzButton = spaceCompactElement.querySelector('button[nz-button]');

    await Promise.resolve();

    expect(nzInput!.classList).toContain('ant-input-compact-first-item');
    expect(nzButton!.classList).toContain('ant-btn-compact-last-item');
    expect(nzInputWrapper!.classList).not.toContain('ant-input-compact-first-item');
    expect(nzTreeSelect!.classList).not.toContain('ant-select-compact-last-item');

    component.showFirst = false;
    component.showLast = false;
    fixture.detectChanges();

    await Promise.resolve();

    expect(nzInputWrapper!.classList).toContain('ant-input-compact-first-item');
    expect(nzTreeSelect!.classList).toContain('ant-select-compact-last-item');
  });

  it('should be apply size class', () => {
    const spaceCompactElement: HTMLElement = fixture.nativeElement;
    const nzInput = spaceCompactElement.querySelector('input[nz-input]');
    const nzInputWrapper = spaceCompactElement.querySelector('nz-input-wrapper');
    const nzInputNumber = spaceCompactElement.querySelector('nz-input-number');
    const nzDatePicker = spaceCompactElement.querySelector('nz-date-picker');
    const nzRangePicker = spaceCompactElement.querySelector('nz-range-picker');
    const nzTimePicker = spaceCompactElement.querySelector('nz-time-picker');
    const nzCascader = spaceCompactElement.querySelector('nz-cascader');
    const nzSelect = spaceCompactElement.querySelector('nz-select');
    const nzTreeSelect = spaceCompactElement.querySelector('nz-tree-select');
    const nzButton = spaceCompactElement.querySelector('button[nz-button]');

    component.size = 'small';
    fixture.detectChanges();

    expect(nzInput!.classList).toContain('ant-input-sm');
    expect(nzInputWrapper!.classList).toContain('ant-input-group-wrapper-sm');
    expect(nzInputWrapper!.querySelector('.ant-input-affix-wrapper-sm')).toBeTruthy();
    expect(nzInputWrapper!.querySelector('input.ant-input-sm')).toBeTruthy();
    expect(nzInputNumber!.classList).toContain('ant-input-number-sm');
    expect(nzDatePicker!.classList).toContain('ant-picker-small');
    expect(nzRangePicker!.classList).toContain('ant-picker-small');
    expect(nzTimePicker!.classList).toContain('ant-picker-small');
    expect(nzCascader!.classList).toContain('ant-select-sm');
    expect(nzSelect!.classList).toContain('ant-select-sm');
    expect(nzTreeSelect!.classList).toContain('ant-select-sm');
    expect(nzButton!.classList).toContain('ant-btn-sm');

    component.size = 'large';
    fixture.detectChanges();

    expect(nzInput!.classList).toContain('ant-input-lg');
    expect(nzInputWrapper!.classList).toContain('ant-input-group-wrapper-lg');
    expect(nzInputWrapper!.querySelector('.ant-input-affix-wrapper-lg')).toBeTruthy();
    expect(nzInputWrapper!.querySelector('input.ant-input-lg')).toBeTruthy();
    expect(nzInputNumber!.classList).toContain('ant-input-number-lg');
    expect(nzDatePicker!.classList).toContain('ant-picker-large');
    expect(nzRangePicker!.classList).toContain('ant-picker-large');
    expect(nzTimePicker!.classList).toContain('ant-picker-large');
    expect(nzCascader!.classList).toContain('ant-select-lg');
    expect(nzSelect!.classList).toContain('ant-select-lg');
    expect(nzTreeSelect!.classList).toContain('ant-select-lg');
    expect(nzButton!.classList).toContain('ant-btn-lg');
  });

  it('should apply block class when nzBlock is true', () => {
    const spaceCompactElement = fixture.nativeElement;
    expect(spaceCompactElement.querySelector('.ant-space-compact').classList).not.toContain('ant-space-compact-block');

    component.block = true;
    fixture.detectChanges();

    expect(spaceCompactElement.querySelector('.ant-space-compact').classList).toContain('ant-space-compact-block');
  });
});

describe('space compact direction', () => {
  let component: SpaceCompactDirectionTestComponent;
  let fixture: ComponentFixture<SpaceCompactDirectionTestComponent>;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideZoneChangeDetection()]
    });
    fixture = TestBed.createComponent(SpaceCompactDirectionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be apply direction classes', () => {
    const spaceCompactElement = fixture.nativeElement;
    expect(spaceCompactElement.querySelector('.ant-space-compact').classList).not.toContain(
      'ant-space-compact-vertical'
    );

    component.direction = 'vertical';
    fixture.detectChanges();

    expect(spaceCompactElement.querySelector('.ant-space-compact').classList).toContain('ant-space-compact-vertical');
  });

  it('should be apply direction classes for child components', () => {
    // Running change detection (first time)
    TestBed.inject(ApplicationRef).tick();
    // detect signal changes
    fixture.detectChanges();

    const spaceCompactElement: HTMLElement = fixture.nativeElement;
    const nzButtons = spaceCompactElement.querySelectorAll('button[nz-button]');
    const [firstBtn, lastBtn] = Array.from(nzButtons);

    expect(firstBtn.classList).toContain('ant-btn-compact-item');
    expect(firstBtn.classList).toContain('ant-btn-compact-first-item');
    expect(lastBtn.classList).toContain('ant-btn-compact-item');
    expect(lastBtn.classList).toContain('ant-btn-compact-last-item');

    expect(firstBtn.classList).not.toContain('ant-btn-compact-vertical-item');
    expect(firstBtn.classList).not.toContain('ant-btn-compact-vertical-first-item');
    expect(lastBtn.classList).not.toContain('ant-btn-compact-vertical-item');
    expect(lastBtn.classList).not.toContain('ant-btn-compact-vertical-last-item');

    component.direction = 'vertical';
    fixture.detectChanges();

    expect(firstBtn.classList).not.toContain('ant-btn-compact-item');
    expect(firstBtn.classList).not.toContain('ant-btn-compact-first-item');
    expect(lastBtn.classList).not.toContain('ant-btn-compact-item');
    expect(lastBtn.classList).not.toContain('ant-btn-compact-last-item');

    expect(firstBtn.classList).toContain('ant-btn-compact-vertical-item');
    expect(firstBtn.classList).toContain('ant-btn-compact-vertical-first-item');
    expect(lastBtn.classList).toContain('ant-btn-compact-vertical-item');
    expect(lastBtn.classList).toContain('ant-btn-compact-vertical-last-item');
  });
});

@Component({
  imports: [
    NzSpaceModule,
    NzButtonModule,
    NzInputModule,
    NzInputNumberModule,
    NzSelectModule,
    NzCascaderModule,
    NzTreeSelectModule,
    NzDatePickerModule,
    NzTimePickerModule
  ],
  template: `
    <nz-space-compact [nzSize]="size" [nzBlock]="block">
      @if (showFirst) {
        <input nz-input />
      }
      <nz-input-wrapper>
        <span nzInputAddonBefore>Before</span>
        <span nzInputPrefix>Prefix</span>
        <input nz-input />
      </nz-input-wrapper>
      <nz-input-group><input nz-input /></nz-input-group>
      <nz-input-number />
      <nz-date-picker />
      <nz-range-picker />
      <nz-time-picker />
      <nz-cascader [nzOptions]="[]" />
      <nz-select />
      <nz-tree-select [nzNodes]="[]" />
      @if (showLast) {
        <button nz-button nzType="primary">btn</button>
      }
    </nz-space-compact>
  `
})
class SpaceCompactTestComponent {
  block: boolean = false;
  size: NzSizeLDSType = 'default';
  showFirst = true;
  showLast = true;
}

@Component({
  imports: [NzSpaceModule, NzButtonModule],
  template: `
    <nz-space-compact [nzDirection]="direction">
      <button nz-button nzType="primary">btn</button>
      <button nz-button nzType="primary">btn</button>
    </nz-space-compact>
  `
})
class SpaceCompactDirectionTestComponent {
  direction: NzSpaceDirection = 'horizontal';
}
