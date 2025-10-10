/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ElementRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { NzSizeLDSType, NzVariant } from 'ng-zorro-antd/core/types';

import { NzInputModule } from './input.module';

describe('input-wrapper', () => {
  let component: InputWithAffixesAndAddonsTestComponent;
  let fixture: ComponentFixture<InputWithAffixesAndAddonsTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputWithAffixesAndAddonsTestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should be apply affix classes', () => {
    expect(component.withPropAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper');
    expect(component.withContentAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper');
  });

  it('should be apply addon classes', () => {
    expect(component.withPropAddons().nativeElement.classList).toContain('ant-input-group-wrapper');
    expect(component.withContentAddons().nativeElement.classList).toContain('ant-input-group-wrapper');
  });

  it('should be apply mix classes', () => {
    expect(component.withPropMix().nativeElement.classList).toContain('ant-input-group-wrapper');
    expect(component.withPropMix().nativeElement.classList).toContain('ant-input-group-wrapper');
    expect(component.withContentMix().nativeElement.classList).toContain('ant-input-group-wrapper');
    expect(component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper')).toBeTruthy();
  });

  it('should be not apply affix or addon classes when only input is present', () => {
    expect(component.onlyInput().nativeElement.classList).not.toContain('ant-input-group-wrapper');
    expect(component.onlyInput().nativeElement.classList).not.toContain('ant-input-affix-wrapper');
  });

  it('should be apply size class', () => {
    component.size = 'large';
    fixture.detectChanges();
    expect(component.withPropAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper-lg');
    expect(component.withPropAddons().nativeElement.classList).toContain('ant-input-group-wrapper-lg');
    component.size = 'small';
    fixture.detectChanges();
    expect(component.withPropAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper-sm');
    expect(component.withPropAddons().nativeElement.classList).toContain('ant-input-group-wrapper-sm');
  });

  it('should be apply disabled class', () => {
    component.disabled = true;
    fixture.detectChanges();
    expect(component.withContentAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper-disabled');
  });

  it('should be apply readonly class', () => {
    component.readonly = true;
    fixture.detectChanges();
    expect(component.withContentAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper-readonly');
  });

  describe('should be apply variant class', () => {
    it('filled', () => {
      fixture.detectChanges();
      expect(component.withContentAffixes().nativeElement.classList).not.toContain('ant-input-affix-wrapper-filled');
      expect(component.withContentAddons().nativeElement.classList).not.toContain('ant-input-group-wrapper-filled');
      expect(component.withContentMix().nativeElement.classList).not.toContain('ant-input-group-wrapper-filled');
      expect(component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper-filled')).toBeFalsy();
      component.variant = 'filled';
      fixture.detectChanges();
      expect(component.withContentAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper-filled');
      expect(component.withContentAddons().nativeElement.classList).toContain('ant-input-group-wrapper-filled');
      expect(component.withContentMix().nativeElement.classList).toContain('ant-input-group-wrapper-filled');
      expect(component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper-filled')).toBeTruthy();
    });

    it('borderless', () => {
      fixture.detectChanges();
      expect(component.withContentAffixes().nativeElement.classList).not.toContain(
        'ant-input-affix-wrapper-borderless'
      );
      expect(component.withContentAddons().nativeElement.classList).not.toContain('ant-input-group-wrapper-borderless');
      expect(component.withContentMix().nativeElement.classList).not.toContain('ant-input-group-wrapper-borderless');
      expect(component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper-borderless')).toBeFalsy();
      component.variant = 'borderless';
      fixture.detectChanges();
      expect(component.withContentAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper-borderless');
      expect(component.withContentAddons().nativeElement.classList).toContain('ant-input-group-wrapper-borderless');
      expect(component.withContentMix().nativeElement.classList).toContain('ant-input-group-wrapper-borderless');
      expect(
        component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper-borderless')
      ).toBeTruthy();
    });

    it('underlined', () => {
      fixture.detectChanges();
      expect(component.withContentAffixes().nativeElement.classList).not.toContain(
        'ant-input-affix-wrapper-underlined'
      );
      expect(component.withContentAddons().nativeElement.classList).not.toContain('ant-input-group-wrapper-underlined');
      expect(component.withContentMix().nativeElement.classList).not.toContain('ant-input-group-wrapper-underlined');
      expect(component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper-underlined')).toBeFalsy();
      component.variant = 'underlined';
      fixture.detectChanges();
      expect(component.withContentAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper-underlined');
      expect(component.withContentAddons().nativeElement.classList).toContain('ant-input-group-wrapper-underlined');
      expect(component.withContentMix().nativeElement.classList).toContain('ant-input-group-wrapper-underlined');
      expect(
        component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper-underlined')
      ).toBeTruthy();
    });
  });

  it('should be handle focus / blur', () => {
    let inputElement = component.withContentAffixes().nativeElement.querySelector('input')!;
    inputElement.focus();
    expect(component.withContentAffixes().nativeElement.classList).toContain('ant-input-affix-wrapper-focused');
    inputElement.blur();
    expect(component.withContentAffixes().nativeElement.classList).not.toContain('ant-input-affix-wrapper-focused');

    inputElement = component.withContentMix().nativeElement.querySelector('input')!;
    inputElement.focus();
    expect(component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper-focused')).toBeTruthy();
    inputElement.blur();
    expect(component.withContentMix().nativeElement.querySelector('.ant-input-affix-wrapper-focused')).toBeFalsy();
  });
});

describe('input-wrapper allow clear', () => {
  let component: InputAllowClearTestComponent;
  let fixture: ComponentFixture<InputAllowClearTestComponent>;
  let clearIconElement: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAllowClearTestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
    clearIconElement = fixture.nativeElement.querySelector('.ant-input-clear-icon');
  });

  it('should be show clear icon when input has value', async () => {
    expect(clearIconElement.classList).toContain('ant-input-clear-icon-hidden');
    component.value = 'test';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(clearIconElement.classList).not.toContain('ant-input-clear-icon-hidden');
    component.value = '';
    fixture.detectChanges();
    await fixture.whenStable();
    expect(clearIconElement.classList).toContain('ant-input-clear-icon-hidden');
  });

  it('should be clear input value when click clear icon', () => {
    component.value = 'test';
    fixture.detectChanges();
    clearIconElement.click();
    fixture.detectChanges();
    expect(component.value).toBe('');
    expect(clearIconElement.classList).toContain('ant-input-clear-icon-hidden');
  });

  it('should be not show clear icon when input is disabled or readonly', () => {
    component.value = 'test';
    component.disabled = true;
    component.readonly = false;
    fixture.detectChanges();
    expect(clearIconElement.classList).toContain('ant-input-clear-icon-hidden');
    component.disabled = false;
    component.readonly = true;
    fixture.detectChanges();
    expect(clearIconElement.classList).toContain('ant-input-clear-icon-hidden');
  });

  it('should be not show clear icon when nzAllowClear is false', () => {
    component.value = 'test';
    component.allowClear = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ant-input-clear-icon')).toBeFalsy();
  });

  it('should be emit nzClear event when click clear icon', () => {
    spyOn(component, 'onClear');
    component.value = 'test';
    fixture.detectChanges();
    expect(component.onClear).not.toHaveBeenCalled();
    clearIconElement.click();
    fixture.detectChanges();
    expect(component.onClear).toHaveBeenCalled();
  });
});

@Component({
  imports: [NzInputModule, FormsModule],
  template: `
    <nz-input-wrapper [nzAllowClear]="allowClear" (nzClear)="onClear()">
      <input nz-input [(ngModel)]="value" [disabled]="disabled" [readonly]="readonly" />
    </nz-input-wrapper>
  `
})
class InputAllowClearTestComponent {
  allowClear = true;
  disabled = false;
  readonly = false;
  value = '';

  onClear(): void {}
}

@Component({
  imports: [NzInputModule],
  template: `
    <nz-input-wrapper #withPropAffixes nzPrefix="Prefix" nzSuffix="Suffix">
      <input nz-input [nzSize]="size" [nzVariant]="variant" [disabled]="disabled" [readonly]="readonly" />
    </nz-input-wrapper>

    <nz-input-wrapper #withContentAffixes>
      <span nzInputPrefix>Prefix</span>
      <input nz-input [nzSize]="size" [nzVariant]="variant" [disabled]="disabled" [readonly]="readonly" />
      <span nzInputSuffix>Suffix</span>
    </nz-input-wrapper>

    <nz-input-wrapper #withPropAddons nzAddonBefore="Before" nzAddonAfter="After">
      <input nz-input [nzSize]="size" [nzVariant]="variant" [disabled]="disabled" [readonly]="readonly" />
    </nz-input-wrapper>

    <nz-input-wrapper #withContentAddons>
      <span nzInputAddonBefore>Before</span>
      <input nz-input [nzSize]="size" [nzVariant]="variant" [disabled]="disabled" [readonly]="readonly" />
      <span nzInputAddonAfter>After</span>
    </nz-input-wrapper>

    <nz-input-wrapper #withPropMix nzAddonBefore="Before" nzAddonAfter="After" nzPrefix="Prefix" nzSuffix="Suffix">
      <input nz-input [nzSize]="size" [nzVariant]="variant" [disabled]="disabled" [readonly]="readonly" />
    </nz-input-wrapper>

    <nz-input-wrapper #withContentMix>
      <span nzInputAddonBefore>Before</span>
      <span nzInputPrefix>Prefix</span>
      <input nz-input [nzSize]="size" [nzVariant]="variant" [disabled]="disabled" [readonly]="readonly" />
      <span nzInputSuffix>Suffix</span>
      <span nzInputAddonAfter>After</span>
    </nz-input-wrapper>

    <nz-input-wrapper #onlyInput>
      <input nz-input [nzSize]="size" [nzVariant]="variant" [disabled]="disabled" [readonly]="readonly" />
    </nz-input-wrapper>
  `
})
class InputWithAffixesAndAddonsTestComponent {
  size: NzSizeLDSType = 'default';
  disabled = false;
  readonly = false;
  variant: NzVariant = 'outlined';

  readonly withPropAffixes = viewChild.required('withPropAffixes', { read: ElementRef });
  readonly withContentAffixes = viewChild.required('withContentAffixes', { read: ElementRef });
  readonly withPropAddons = viewChild.required('withPropAddons', { read: ElementRef });
  readonly withContentAddons = viewChild.required('withContentAddons', { read: ElementRef });
  readonly withPropMix = viewChild.required('withPropMix', { read: ElementRef });
  readonly withContentMix = viewChild.required('withContentMix', { read: ElementRef });
  readonly onlyInput = viewChild.required('onlyInput', { read: ElementRef });
}
