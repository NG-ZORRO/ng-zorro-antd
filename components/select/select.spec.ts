/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ApplicationRef, Component, signal, SimpleChange, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { NzOverflowContainerComponent } from 'ng-zorro-antd/cdk/overflow';
import { NzResizeObserverFactory } from 'ng-zorro-antd/cdk/resize-observer';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NZ_FORM_SIZE, NZ_FORM_VARIANT } from 'ng-zorro-antd/core/form';
import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  updateNonSignalsInput
} from 'ng-zorro-antd/core/testing';
import { NzSafeAny, NzSizeLDSType, NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { NzFormControlStatusType, NzFormModule } from 'ng-zorro-antd/form';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NZ_SPACE_COMPACT_SIZE } from 'ng-zorro-antd/space';

import { NzOptionContainerComponent } from './option-container.component';
import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import { NzSelectComponent, NzSelectSizeType } from './select.component';
import { NzSelectModule } from './select.module';
import {
  maxTagCountAttribute,
  NzFilterOptionType,
  NzSelectItemInterface,
  NzSelectMaxTagCount,
  NzSelectModeType,
  NzSelectOptionInterface,
  NzSelectPlacementType
} from './select.types';

describe('select', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNzNoAnimation()]
    });
  });

  describe('default template mode', () => {
    let component: TestSelectTemplateDefaultComponent;
    let fixture: ComponentFixture<TestSelectTemplateDefaultComponent>;
    let selectElement!: HTMLElement;
    let overlayContainerElement: HTMLElement;

    async function flushChanges(): Promise<void> {
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectTemplateDefaultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainerElement = oc.getContainerElement();
    }));

    it('should classname correct', () => {
      expect(selectElement.classList).toContain('ant-select');
      expect(selectElement.classList).toContain('ant-select-single');
    });

    it('should nzSize work', () => {
      component.nzSize.set('large');
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-lg');
      component.nzSize.set('small');
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-sm');
    });

    it('should nzPlaceHolder work', () => {
      expect(selectElement.querySelector('.ant-select-selection-placeholder')!.textContent!.trim()).toBe('');
      component.nzPlaceHolder.set('placeholder');
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-selection-placeholder')!.textContent?.trim()).toContain(
        'placeholder'
      );
    });

    it('should nzDropdownRender work', () => {
      component.nzOpen.set(true);
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-render').length).toBe(0);
      component.nzDropdownRender.set(component.dropdownTemplate);
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-render')[0]!.textContent?.trim()).toBe('dropdownRender');
    });

    it('should ngModel match nzLabel', async () => {
      component.listOfOption.set([{ nzValue: 'test_value', nzLabel: 'test_label' }]);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value.set('test_value');
      await flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
      component.listOfOption.set([]);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
      expect(component.valueChange).not.toHaveBeenCalled();
    });

    it('should scroll to the initially selected option when opened', async () => {
      component.listOfOption.set(
        Array.from({ length: 30 }, (_, index) => ({ nzValue: index + 1, nzLabel: `Option ${index + 1}` }))
      );
      component.value.set(15);
      await flushChanges();

      component.nzOpen.set(true);
      await flushChanges();

      const viewport = overlayContainerElement.querySelector<HTMLElement>('.cdk-virtual-scroll-viewport');
      expect(viewport!.scrollTop).toBeGreaterThan(0);
      expect(overlayContainerElement.querySelector('.ant-select-item-option-active')!.textContent?.trim()).toBe(
        'Option 15'
      );
    });

    it('should ngModelChange trigger when click option', async () => {
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ]);
      component.value.set('test_01');
      component.nzOpen.set(true);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith('test_02');
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
    });

    it('should ngModelChange trigger when click clear icon', async () => {
      component.listOfOption.set([{ nzValue: 'test_value', nzLabel: 'test_label' }]);
      component.value.set('test_value');
      await flushChanges();
      expect(selectElement.querySelector('nz-select-clear')).toBeFalsy();
      component.nzAllowClear.set(true);
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('nz-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith(null);
    });

    it('should nzOpenChange trigger correct times', () => {
      component.nzOpen.set(true);
      fixture.detectChanges();
      expect(component.openChange).not.toHaveBeenCalled();
      const topSelectElement = selectElement.querySelector('.ant-select-selector')!;
      dispatchFakeEvent(topSelectElement, 'click');
      fixture.detectChanges();
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
      dispatchFakeEvent(topSelectElement, 'click');
      fixture.detectChanges();
      expect(component.openChange).toHaveBeenCalledTimes(2);
      expect(component.openChange).toHaveBeenCalledWith(true);
    });

    it('should click input not close in searching mode', () => {
      component.nzShowSearch.set(true);
      fixture.detectChanges();
      const topSelectElement = selectElement.querySelector('.ant-select-selector')!;
      dispatchFakeEvent(topSelectElement, 'click');
      fixture.detectChanges();
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(true);
      dispatchFakeEvent(topSelectElement, 'click');
      fixture.detectChanges();
      expect(component.openChange).toHaveBeenCalledTimes(1);
    });

    it('should nzCustomTemplate works', async () => {
      component.listOfOption.set([{ nzValue: 'value', nzLabel: 'label' }]);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value.set('value');
      component.nzCustomTemplate.set(component.customTemplate);
      await flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('selected: label');
    });

    it('should nzShowArrow works', () => {
      expect(selectElement.querySelector('nz-select-arrow')).toBeTruthy();
      component.nzShowArrow.set(false);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-arrow')).toBeFalsy();
    });

    it('should nzPrefix works', () => {
      component.nzPrefix.set('prefix');
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('prefix');

      component.nzPrefix.set(component.affixTemplate);
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('icon');
    });

    it('should nzSuffixIcon works', () => {
      expect(selectElement.querySelector('.anticon-down')).toBeTruthy();
      component.nzSuffixIcon.set(component.affixTemplate);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-arrow')!.textContent?.trim()).toBe('icon');
    });

    it('should nzClearIcon works', async () => {
      component.nzAllowClear.set(true);
      component.listOfOption.set([{ nzValue: 'value', nzLabel: 'label' }]);
      component.value.set('value');
      await flushChanges();
      expect(selectElement.querySelector('.anticon-close-circle')).toBeTruthy();
      component.nzClearIcon.set(component.affixTemplate);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-clear')!.textContent?.trim()).toBe('icon');
    });

    it('should nzShowSearch works', async () => {
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ]);
      component.nzShowSearch.set(true);
      component.nzOpen.set(true);
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('test');
      expect(document.querySelectorAll('nz-option-item').length).toBe(2);
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(1);
    });

    it('should nzFilterOption works', async () => {
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' },
        { nzValue: 'test_03', nzLabel: 'test_03' }
      ]);
      component.nzShowSearch.set(true);
      component.nzFilterOption.set(() => true);
      component.nzOpen.set(true);
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    });

    it('should compareWith works', async () => {
      component.listOfOption.set([{ nzValue: { value: 'test_value' }, nzLabel: 'test_label' }]);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value.set({ value: 'test_value' });
      component.compareWith.set((o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2));
      await flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
    });

    describe('should variant works', () => {
      it('outlined', () => {
        component.nzVariant.set('outlined');
        fixture.detectChanges();
        expect(selectElement.classList).toContain('ant-select-outlined');
      });

      it('filled', () => {
        fixture.detectChanges();
        expect(selectElement.classList).not.toContain('ant-select-filled');
        component.nzVariant.set('filled');
        fixture.detectChanges();
        expect(selectElement.classList).toContain('ant-select-filled');
      });

      it('borderless', () => {
        fixture.detectChanges();
        expect(selectElement.classList).not.toContain('ant-select-borderless');
        component.nzVariant.set('borderless');
        fixture.detectChanges();
        expect(selectElement.classList).toContain('ant-select-borderless');
      });

      it('underlined', () => {
        fixture.detectChanges();
        expect(selectElement.classList).not.toContain('ant-select-underlined');
        component.nzVariant.set('underlined');
        fixture.detectChanges();
        expect(selectElement.classList).toContain('ant-select-underlined');
      });
    });

    it('should nzAutoFocus works', () => {
      component.nzAutoFocus.set(true);
      fixture.detectChanges();
      expect(selectElement.querySelector('input')!.attributes.getNamedItem('autofocus')!.name).toBe('autofocus');
      component.nzAutoFocus.set(false);
      fixture.detectChanges();
      expect(selectElement.querySelector('input')!.attributes.getNamedItem('autofocus')).toBeFalsy();
    });

    it('should nzServerSearch works', async () => {
      component.listOfOption.set([
        { nzValue: '1', nzLabel: '1' },
        { nzValue: '2', nzLabel: '2' },
        { nzValue: '3', nzLabel: '3' }
      ]);
      component.nzServerSearch.set(true);
      component.nzShowSearch.set(true);
      component.nzOpen.set(true);
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    });

    it('should nzDisabled works', async () => {
      component.nzDisabled.set(true);
      await flushChanges();
      expect(selectElement.classList).toContain('ant-select-disabled');
      expect(selectElement.querySelector('input')!.getAttribute('disabled')).toBe('');
    });

    it('should nzTitle works', async () => {
      component.listOfOption.set([
        { nzValue: '1', nzLabel: '1' },
        { nzValue: '2', nzLabel: '2', nzTitle: '-' },
        { nzValue: '3', nzLabel: '3', nzTitle: null }
      ]);
      component.nzOpen.set(true);
      await flushChanges();
      expect((document.querySelectorAll('nz-option-item')[0] as HTMLElement)?.title).toBe('1');
      expect((document.querySelectorAll('nz-option-item')[1] as HTMLElement)?.title).toBe('-');
      expect((document.querySelectorAll('nz-option-item')[2] as HTMLElement)?.title).toBeFalsy();
    });

    it('should select option by enter', async () => {
      component.listOfOption.set([
        { nzValue: 'value', nzLabel: 'label' },
        { nzValue: 'disabledValue', nzLabel: 'disabledLabel', nzDisabled: true }
      ]);
      component.nzShowSearch.set(true);
      component.nzOpen.set(true);

      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label';

      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('label');

      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      await flushChanges();
      expect(component.value()).toBe('value');
    });

    it('should nzDisabled option works', async () => {
      component.listOfOption.set([
        { nzValue: 'value', nzLabel: 'label' },
        { nzValue: 'disabledValue', nzLabel: 'disabledLabel', nzDisabled: true }
      ]);
      component.nzShowSearch.set(true);
      component.nzOpen.set(true);

      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'disabled';

      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('disabled');

      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      await flushChanges();
      expect(component.value()).not.toBe('disabledValue');
    });

    it('should nzBackdrop works', async () => {
      component.nzOpen.set(true);
      component.nzBackdrop.set(true);
      await flushChanges();
      const boundingBox = overlayContainerElement.children[0];
      expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
    });

    it('should close dropdown when ESC keydown', async () => {
      component.nzOpen.set(true);
      await flushChanges();
      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);
      await flushChanges();
      expect(component.nzOpen()).toBe(false);
    });

    it('should keydown up arrow and down arrow', async () => {
      component.listOfOption.set([
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02', nzDisabled: true },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ]);
      component.value.set('value_01');
      component.nzOpen.set(true);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', UP_ARROW, inputElement);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item')[2]!.classList).toContain('ant-select-item-option-active');
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item')[0]!.classList).toContain('ant-select-item-option-active');
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      await flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledWith('value_03');
      await flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      await flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      await flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(true);
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      await flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(3);
    });

    it('should not throw error with keydown up arrow and down arrow event when listOfOption is empty', async () => {
      component.listOfOption.set([]);
      component.nzOpen.set(true);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', UP_ARROW, inputElement);
      await flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(0);
    });

    it('should mouseenter activated option work', async () => {
      component.listOfOption.set([
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02', nzDisabled: true },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ]);
      component.nzOpen.set(true);
      await flushChanges();
      const targetItem = document.querySelectorAll('nz-option-item')[2]!;
      expect(targetItem.classList).not.toContain('ant-select-item-option-active');
      dispatchFakeEvent(targetItem, 'mouseenter');
      await flushChanges();
      expect(targetItem.classList).toContain('ant-select-item-option-active');
    });

    it('should group item change work', async () => {
      component.listOfGroup.set([{ nzLabel: 'group-1', children: [{ nzValue: 'value_01', nzLabel: 'label_01' }] }]);
      component.nzOpen.set(true);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(1);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(1);
      component.listOfGroup.set([
        {
          nzLabel: 'group-1',
          children: [
            { nzValue: 'value_01', nzLabel: 'label_01' },
            { nzValue: 'value_02', nzLabel: 'label_02' }
          ]
        },
        {
          nzLabel: 'group-2',
          children: [{ nzValue: 'value_03', nzLabel: 'label_03' }]
        }
      ]);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(3);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(2);
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent?.trim()).toBe('group-1');
      expect(document.querySelectorAll('nz-option-item')[0].textContent?.trim()).toBe('label_01');
      component.listOfGroup.set([
        {
          nzLabel: 'change-group',
          children: [
            { nzValue: 'value_01', nzLabel: 'change-label' },
            { nzValue: 'value_02', nzLabel: 'label_02' }
          ]
        },
        {
          nzLabel: 'group-2',
          children: [{ nzValue: 'value_03', nzLabel: 'label_03' }]
        }
      ]);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent?.trim()).toBe('change-group');
      expect(document.querySelectorAll('nz-option-item')[0].textContent?.trim()).toBe('change-label');
    });

    it('should group item sort be right', async () => {
      component.listOfGroup.set([
        {
          nzLabel: 'group-1',
          children: [
            { nzValue: 'value_01', nzLabel: 'label_01' },
            { nzValue: 'value_02', nzLabel: 'label_02' }
          ]
        },
        {
          nzLabel: 'group-2',
          children: [
            { nzValue: 'value_03', nzLabel: 'label_03' },
            { nzValue: 'value_04', nzLabel: 'label_04' }
          ]
        }
      ]);
      component.nzOpen.set(true);
      await flushChanges();
      expect(
        document
          .querySelectorAll('nz-option-item')[0]
          .parentElement!.querySelector('nz-option-item')!
          .nextElementSibling!.textContent?.trim()
      ).toBe('label_02');
    });

    it('should have selected class if item was selected', async () => {
      component.listOfOption.set([
        { nzValue: 0, nzLabel: 'Falsy value' },
        { nzValue: 'Truthy value', nzLabel: 'Truthy value' },
        { nzValue: 'disabled', nzLabel: 'disabled', nzDisabled: true },
        { nzValue: undefined, nzLabel: 'undefined' },
        { nzValue: null, nzLabel: 'null' }
      ]);
      component.nzOpen.set(true);
      component.value.set(0);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected').length).toBe(1);
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected')[0].textContent?.trim()).toBe(
        'Falsy value'
      );
      component.value.set('Truthy value');
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected').length).toBe(1);
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected')[0].textContent?.trim()).toBe(
        'Truthy value'
      );
      for (const value of ['disabled', undefined, null]) {
        component.value.set(value);
        await flushChanges();
        expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected').length).toBe(0);
      }
    });

    it('should select item on TAB when nzSelectOnTab is true', async () => {
      component.nzSelectOnTab.set(true);
      component.listOfOption.set([
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02' },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ]);
      component.nzOpen.set(true);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledWith('value_01');
      await flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(1);
    });

    it('should close select and keep the same value on TAB when nzSelectOnTab is default(false)', async () => {
      component.listOfOption.set([
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02' },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ]);
      component.value.set('value_02');
      component.nzOpen.set(true);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      await flushChanges();
      expect(component.valueChange).not.toHaveBeenCalled();
      await flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(1);
    });
  });

  describe('multiple template mode', () => {
    let component: TestSelectTemplateMultipleComponent;
    let fixture: ComponentFixture<TestSelectTemplateMultipleComponent>;
    let selectElement!: HTMLElement;
    let overlayContainerElement: HTMLElement;

    async function flushChanges(): Promise<void> {
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectTemplateMultipleComponent);
      component = fixture.componentInstance;
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      fixture.detectChanges();
      overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    });

    it('should classname correct', () => {
      expect(selectElement.classList).toContain('ant-select-multiple');
    });

    it('should ngModel works', async () => {
      component.listOfOption.set([
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02' }
      ]);
      component.value.set(['value_01', 'value_02']);
      await flushChanges();
      let listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent?.trim()).toBe('label_01');
      expect(listOfSelectItem[1].textContent?.trim()).toBe('label_02');
      component.listOfOption.set([{ nzValue: 'value_01', nzLabel: 'label_01' }]);
      fixture.detectChanges();
      listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent?.trim()).toBe('label_01');
      expect(listOfSelectItem[1].textContent?.trim()).toBe('label_02');
      expect(component.valueChange).not.toHaveBeenCalled();
    });

    it('should preserve the activated option when the value changes while opened', async () => {
      component.listOfOption.set([
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02' },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ]);
      component.value.set(['value_01']);
      await flushChanges();

      component.nzOpen.set(true);
      await flushChanges();
      dispatchFakeEvent(overlayContainerElement.querySelectorAll('nz-option-item')[1], 'mouseenter');
      await flushChanges();

      component.value.set(['value_01', 'value_03']);
      await flushChanges();

      expect(overlayContainerElement.querySelectorAll('nz-option-item')[1].classList).toContain(
        'ant-select-item-option-active'
      );
    });

    it('should click option work', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ]);
      component.value.set(['test_01']);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.value().length).toBe(2);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(2);
      expect(component.value().length).toBe(1);
      expect(component.value()[0]).toBe('test_01');
      expect(component.openChange).not.toHaveBeenCalled();
    });

    it('should compareWith works', async () => {
      component.listOfOption.set([{ nzValue: { value: 'value' }, nzLabel: 'label' }]);
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(0);
      component.value.set([{ value: 'value' }]);
      component.compareWith.set((o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2));
      await flushChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(1);
      expect(selectElement.querySelectorAll('nz-select-item')[0].textContent?.trim()).toBe('label');
    });

    it('should nzMenuItemSelectedIcon works', async () => {
      component.listOfOption.set([{ nzValue: 'value', nzLabel: 'label' }]);
      component.value.set(['value']);
      component.nzOpen.set(true);
      await flushChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(1);
      component.nzMenuItemSelectedIcon.set(component.iconTemplate);
      fixture.detectChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(0);
      expect(document.querySelector('.ant-select-item-option-state')!.textContent?.trim()).toBe('icon');
    });

    it('should removeIcon works', async () => {
      component.listOfOption.set([{ nzValue: 'value', nzLabel: 'label' }]);
      component.value.set(['value']);
      await flushChanges();
      expect(selectElement.querySelector('.anticon-close')).toBeTruthy();
      component.nzRemoveIcon.set(component.iconTemplate);
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-selection-item-remove')!.textContent?.trim()).toBe('icon');
    });

    it('should removeIcon click works', async () => {
      component.listOfOption.set([{ nzValue: 'value', nzLabel: 'label' }]);
      component.value.set(['value']);
      await flushChanges();
      dispatchFakeEvent(selectElement.querySelector('.anticon-close')!, 'click');
      await flushChanges();
      expect(component.value().length).toBe(0);
    });

    it('should backspace works', async () => {
      component.listOfOption.set([{ nzValue: 'value', nzLabel: 'label' }]);
      component.value.set(['value']);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', BACKSPACE, inputElement);
      await flushChanges();
      expect(component.value().length).toBe(0);
    });

    it('should nzTokenSeparators work', async () => {
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'label_01' },
        { nzValue: 'test_02', nzLabel: 'label_02' }
      ]);
      component.value.set([]);
      component.nzTokenSeparators.set([',']);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.value().length).toBe(1);
      expect(component.value()[0]).toBe('test_01');
    });

    it('should nzMaxMultipleCount work', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ]);
      component.value.set([]);
      component.nzMaxMultipleCount.set(1);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(component.value().length).toBe(1);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      await flushChanges();
      expect(component.value().length).toBe(1);
      expect(component.value()[0]).toBe('test_01');
    });

    it('should nzAutoClearSearchValue work', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ]);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue.set(false);
      await flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(inputElement.value).toBe('test');
    });

    it('should nzAutoClearSearchValue work when cdkOverlay send emit close', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ]);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue.set(false);
      await flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);
      await flushChanges();
      expect(inputElement.value).toBe('test');
    });
  });

  describe('tags template mode', () => {
    let component: TestSelectTemplateTagsComponent;
    let fixture: ComponentFixture<TestSelectTemplateTagsComponent>;
    let selectElement!: HTMLElement;

    async function flushChanges(): Promise<void> {
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectTemplateTagsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });

    it('should classname correct', () => {
      expect(selectElement.classList).toContain('ant-select-multiple');
    });

    it('should nzTokenSeparators works', async () => {
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'label_01' },
        { nzValue: 'test_02', nzLabel: 'label_02' }
      ]);
      component.value.set([]);
      component.nzTokenSeparators.set([',']);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.value().length).toBe(2);
      expect(component.value()[0]).toBe('test_01');
      expect(component.value()[1]).toBe('test_02');
    });

    it('should nzMaxTagCount works', async () => {
      component.listOfOption.set([
        { nzValue: 'test_01', nzLabel: 'label_01' },
        { nzValue: 'test_02', nzLabel: 'label_02' },
        { nzValue: 'test_03', nzLabel: 'label_03' },
        { nzValue: 'test_04', nzLabel: 'label_04' }
      ]);
      component.value.set(['test_01', 'test_02', 'test_03', 'test_04']);
      component.nzMaxTagCount.set(2);
      await flushChanges();
      const listOfItem = selectElement.querySelectorAll('nz-select-item');
      expect(listOfItem.length).toBe(3);
      expect(listOfItem[2].querySelector('.ant-select-selection-item-content')!.textContent?.trim()).toBe('+ 2 ...');
      component.nzMaxTagPlaceholder.set(component.tagTemplate);
      fixture.detectChanges();
      expect(listOfItem[2].textContent?.trim()).toBe('and 2 more selected');
    });

    it('should maxTagCountAttribute handle transform', () => {
      expect(maxTagCountAttribute('responsive')).toBe('responsive');
      expect(maxTagCountAttribute('5')).toBe(5);
      expect(maxTagCountAttribute(10)).toBe(10);
      expect(maxTagCountAttribute(undefined)).toBe(Infinity);
      expect(maxTagCountAttribute(null)).toBe(Infinity);
    });
  });

  describe('responsive maxTagCount', () => {
    let component: TestSelectResponsiveComponent;
    let fixture: ComponentFixture<TestSelectResponsiveComponent>;
    let selectElement: HTMLElement;
    let resize: ReturnType<typeof createSelectResizeHarness>;

    async function flushChanges(): Promise<void> {
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    }

    beforeEach(async () => {
      resize = createSelectResizeHarness();
      TestBed.configureTestingModule({
        providers: [{ provide: NzResizeObserverFactory, useValue: resize.factory }]
      });
      fixture = TestBed.createComponent(TestSelectResponsiveComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      await flushChanges();
    });

    it('should show every tag when the line is wide enough', async () => {
      await layout({ container: 1000, item: 40, rest: 40, suffix: 20 });
      expect(visibleTagHosts().length).toBe(4);
      expect(restHost().hasAttribute('inert')).toBe(true);
      expect(selectElement.querySelector('.ant-select-selection-overflow-item-suffix input')).toBeTruthy();
    });

    it('should collapse tags that do not fit and keep the search suffix', async () => {
      await layout({ container: 200, item: 80, rest: 50, suffix: 30 });
      expect(visibleTagHosts().length).toBe(1);
      expect(tagHosts().filter(item => item.hasAttribute('inert')).length).toBe(3);
      expect(restText()).toBe('+ 3 ...');
      expect(restHost().hasAttribute('inert')).toBe(false);
      const suffix = suffixHost();
      expect(suffix.style.position).toBe('absolute');
      expect(suffix.style.getPropertyValue('inset-inline-start')).toBe('130px');
      expect(suffix.style.left).toBe('');
      expect(suffix.querySelector('input')).toBeTruthy();
    });

    it('should show only the rest item when nothing fits', async () => {
      await layout({ container: 40, item: 80, rest: 40, suffix: 20 });
      expect(overflowContainer().displayCount()).toBe(-1);
      expect(visibleTagHosts().length).toBe(0);
      expect(tagHosts().every(item => item.hasAttribute('inert'))).toBe(true);
      expect(restText()).toBe('+ 4 ...');
      expect(selectElement.querySelector('.ant-select-selection-overflow-item-suffix input')).toBeTruthy();
    });

    it('should render a custom nzMaxTagPlaceholder as the measured rest', async () => {
      component.nzMaxTagPlaceholder.set(component.tagTemplate);
      await flushChanges();
      await layout({ container: 200, item: 80, rest: 50, suffix: 30 });
      expect(restText()).toBe('and 3 more selected');

      await layout({ container: 200, item: 80, rest: 180, suffix: 30 });
      expect(visibleTagHosts().length).toBe(0);
      expect(restText()).toBe('and 4 more selected');
    });

    it('should measure a custom tag template instead of its label text', async () => {
      component.nzCustomTemplate.set(component.customTemplate);
      await flushChanges();
      await layout({ container: 1000, item: 40, rest: 40, suffix: 20 });
      expect(selectElement.textContent).toContain('wide alpha');
      expect(visibleTagHosts().length).toBe(4);

      await layout({ container: 200, item: 180, rest: 40, suffix: 20 });
      expect(visibleTagHosts().length).toBeLessThan(4);
      expect(tagHosts()[0].textContent).toContain('wide alpha');
    });

    it('should drop a tag when the search suffix gets wider', async () => {
      await layout({ container: 250, item: 80, rest: 40, suffix: 20 });
      expect(visibleTagHosts().length).toBe(2);

      const input = suffixHost().querySelector('input')!;
      input.value = 'long search';
      dispatchFakeEvent(input, 'input');
      await flushChanges();
      setMeasuredWidth(suffixHost(), 140);
      resize.flush();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(input.value).toBe('long search');
      expect(visibleTagHosts().length).toBe(0);
    });

    it('should show a previously hidden tag after one tag is removed', async () => {
      await layout({ container: 300, item: 80, rest: 40, suffix: 20 });
      expect(visibleTagHosts().length).toBe(3);
      expect(restHost().hasAttribute('inert')).toBe(false);

      dispatchFakeEvent(selectElement.querySelector('.anticon-close')!, 'click');
      await flushChanges();
      await layout({ container: 300, item: 80, rest: 40, suffix: 20 });

      expect(component.value().length).toBe(3);
      expect(visibleTagHosts().length).toBe(3);
      expect(tagHosts().some(item => item.hasAttribute('inert'))).toBe(false);
      expect(restHost().hasAttribute('inert')).toBe(true);
    });

    it('should clear responsive tags', async () => {
      component.nzAllowClear.set(true);
      await flushChanges();
      dispatchMouseEvent(selectElement.querySelector('nz-select-clear')!, 'click');
      await flushChanges();
      expect(component.value().length).toBe(0);
      expect(tagHosts().length).toBe(0);
    });

    it('should still collapse tags when the select is disabled', async () => {
      component.nzDisabled.set(true);
      await flushChanges();
      await layout({ container: 200, item: 80, rest: 50, suffix: 30 });
      expect(visibleTagHosts().length).toBe(1);
      expect(selectElement.querySelector('.ant-select-selection-item-remove')).toBeNull();
    });

    it('should keep a numeric nzMaxTagCount stable when the container resizes', async () => {
      component.nzMaxTagCount.set(2);
      await flushChanges();
      resize.flush();
      fixture.detectChanges();
      const items = selectElement.querySelectorAll('nz-select-item');
      expect(selectElement.querySelector('nz-overflow-container')).toBeNull();
      expect(items.length).toBe(3);
      expect(items[2].textContent?.trim()).toBe('+ 2 ...');

      component.nzMaxTagPlaceholder.set(component.tagTemplate);
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('nz-select-item')[2].textContent?.trim()).toBe('and 2 more selected');
    });

    it('should ignore responsive maxTagCount in single mode', async () => {
      component.nzMode.set('default');
      component.value.set('a');
      component.nzMaxTagCount.set('responsive');
      await flushChanges();
      expect(selectElement.querySelector('nz-overflow-container')).toBeNull();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(1);
      expect(selectElement.querySelector('nz-select-item')!.textContent).toContain('alpha');
    });

    async function layout(widths: { container: number; item: number; rest: number; suffix: number }): Promise<void> {
      setMeasuredWidth(selectElement.querySelector('nz-overflow-container') as HTMLElement, widths.container);
      tagHosts().forEach(item => setMeasuredWidth(item, widths.item));
      setMeasuredWidth(restHost(), widths.rest);
      setMeasuredWidth(suffixHost(), widths.suffix);
      resize.flush();
      await fixture.whenStable();
      fixture.detectChanges();
    }

    function overflowContainer(): NzOverflowContainerComponent {
      return fixture.debugElement.query(By.directive(NzOverflowContainerComponent)).componentInstance;
    }

    function tagHosts(): HTMLElement[] {
      return [...selectElement.querySelectorAll<HTMLElement>('.ant-select-selection-overflow-item')].filter(
        item =>
          !item.classList.contains('ant-select-selection-overflow-item-rest') &&
          !item.classList.contains('ant-select-selection-overflow-item-suffix')
      );
    }

    function visibleTagHosts(): HTMLElement[] {
      return tagHosts().filter(item => !item.hasAttribute('inert'));
    }

    function restHost(): HTMLElement {
      return selectElement.querySelector<HTMLElement>('.ant-select-selection-overflow-item-rest')!;
    }

    function suffixHost(): HTMLElement {
      return selectElement.querySelector<HTMLElement>('.ant-select-selection-overflow-item-suffix')!;
    }

    function restText(): string {
      return restHost().textContent!.replace(/\s+/g, ' ').trim();
    }
  });

  describe('responsive maxTagCount without ResizeObserver', () => {
    let fixture: ComponentFixture<TestSelectResponsiveComponent>;
    let selectElement: HTMLElement;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        providers: [{ provide: NzResizeObserverFactory, useValue: { create: (): null => null } }]
      });
      fixture = TestBed.createComponent(TestSelectResponsiveComponent);
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    });

    it('should leave every tag visible', () => {
      const tags = [...selectElement.querySelectorAll<HTMLElement>('.ant-select-selection-overflow-item')].filter(
        item =>
          !item.classList.contains('ant-select-selection-overflow-item-rest') &&
          !item.classList.contains('ant-select-selection-overflow-item-suffix')
      );
      expect(tags.length).toBe(4);
      expect(tags.every(item => !item.hasAttribute('inert') && item.style.opacity !== '0')).toBe(true);
    });
  });

  describe('default reactive mode', () => {
    let component: TestSelectReactiveDefaultComponent;
    let fixture: ComponentFixture<TestSelectReactiveDefaultComponent>;
    let selectElement!: HTMLElement;

    async function flushChanges(): Promise<void> {
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectReactiveDefaultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });

    it('should ngModel match nzLabel', async () => {
      component.listOfOption.set([{ value: 'test_value', label: 'test_label' }]);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value.set('test_value');
      await flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
      component.listOfOption.set([]);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
      expect(component.valueChange).not.toHaveBeenCalled();
    });

    it('should ngModelChange trigger when click option', async () => {
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ]);
      component.value.set('test_01');
      component.nzOpen.set(true);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith('test_02');
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
    });

    it('should ngModelChange trigger when click clear icon', async () => {
      component.listOfOption.set([{ value: 'test_value', label: 'test_label' }]);
      component.value.set('test_value');
      await flushChanges();
      expect(selectElement.querySelector('nz-select-clear')).toBeFalsy();
      component.nzAllowClear.set(true);
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('nz-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith(null);
    });

    it('should call the event emitter nzOnClear when click on te clear icon', async () => {
      component.listOfOption.set([{ value: 'test_value', label: 'test_label' }]);
      component.value.set('test_value');
      await flushChanges();
      expect(selectElement.querySelector('nz-select-clear')).toBeFalsy();
      component.nzAllowClear.set(true);
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('nz-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.onClear).toHaveBeenCalled();
    });

    it('should expose raw option fields through implicit and named template contexts', async () => {
      component.listOfOption.set([{ value: 'test_01', label: component.optionTemplate, disabled: true }]);
      component.nzOpen.set(true);
      await flushChanges();

      expect(document.querySelector('nz-option-item')!.textContent?.trim()).toBe('option: test_01 test_01 true');
    });

    it('should display the label in the top control when a string label is provided', async () => {
      component.listOfOption.set([
        { value: 'test_01', label: 'label 1' },
        { value: 'test_02', label: 'label 2' }
      ]);
      component.value.set('test_02');
      await flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('label 2');
    });

    it('should nzCustomTemplate works', async () => {
      component.listOfOption.set([{ value: 'value', label: 'label' }]);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value.set('value');
      component.nzCustomTemplate.set(component.customTemplate);
      await flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('selected: label');
    });

    it('should nzShowSearch works', async () => {
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ]);
      component.nzShowSearch.set(true);
      component.nzOpen.set(true);
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('test');
      expect(document.querySelectorAll('nz-option-item').length).toBe(2);
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(1);
    });

    it('should nzFilterOption works', async () => {
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' },
        { value: 'test_03', label: 'test_03' }
      ]);
      component.nzShowSearch.set(true);
      component.nzFilterOption.set(() => true);
      component.nzOpen.set(true);
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    });

    it('should compareWith works', async () => {
      component.listOfOption.set([{ value: { value: 'test_value' }, label: 'test_label' }]);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value.set({ value: 'test_value' });
      component.compareWith.set((o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2));
      await flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
    });

    it('should nzServerSearch works', async () => {
      component.listOfOption.set([
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ]);
      component.nzServerSearch.set(true);
      component.nzShowSearch.set(true);
      component.nzOpen.set(true);
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    });

    it('should keydown up arrow and down arrow', async () => {
      component.listOfOption.set([
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02', disabled: true },
        { value: 'value_03', label: 'label_03' }
      ]);
      component.value.set('value_01');
      component.nzOpen.set(true);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', UP_ARROW, inputElement);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item')[2]!.classList).toContain('ant-select-item-option-active');
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item')[0]!.classList).toContain('ant-select-item-option-active');
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      await flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledWith('value_03');
      await flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      await flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      await flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(true);
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      await flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(3);
    });

    it('should mouseenter activated option work', async () => {
      component.listOfOption.set([
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02', disabled: true },
        { value: 'value_03', label: 'label_03' }
      ]);
      component.nzOpen.set(true);
      await flushChanges();
      const targetItem = document.querySelectorAll('nz-option-item')[2]!;
      expect(targetItem.classList).not.toContain('ant-select-item-option-active');
      dispatchFakeEvent(targetItem, 'mouseenter');
      await flushChanges();
      expect(targetItem.classList).toContain('ant-select-item-option-active');
    });

    it('should group item change work', async () => {
      component.listOfOption.set([{ groupLabel: 'group-1', value: 'value_01', label: 'label_01' }]);
      component.nzOpen.set(true);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(1);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(1);
      component.listOfOption.set([
        { value: 'value_01', label: 'label_01', groupLabel: 'group-1' },
        { value: 'value_02', label: 'label_02', groupLabel: 'group-1' },
        { value: 'value_03', label: 'label_03', groupLabel: 'group-2' }
      ]);
      await flushChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(3);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(2);
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent?.trim()).toBe('group-1');
      expect(document.querySelectorAll('nz-option-item')[0].textContent?.trim()).toBe('label_01');
      component.listOfOption.set([{ groupLabel: 'change-group', value: 'value_01', label: 'change-label' }]);

      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent?.trim()).toBe('change-group');
      expect(document.querySelectorAll('nz-option-item')[0].textContent?.trim()).toBe('change-label');
    });

    it('should nzAutoClearSearchValue in default mode not work when set to false', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ]);
      component.nzAutoClearSearchValue.set(false);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;

      await flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(inputElement.value).toBe('');
    });

    it('should group item sort be right', async () => {
      component.listOfOption.set([
        { value: 'value_01', label: 'label_01', groupLabel: 'group-1' },
        { value: 'value_02', label: 'label_02', groupLabel: 'group-1' },
        { value: 'value_03', label: 'label_03', groupLabel: 'group-2' },
        { value: 'value_04', label: 'label_04', groupLabel: 'group-2' }
      ]);
      component.nzOpen.set(true);
      await flushChanges();
      expect(
        document
          .querySelectorAll('nz-option-item')[0]
          .parentElement!.querySelector('nz-option-item')!
          .nextElementSibling!.textContent?.trim()
      ).toBe('label_02');
    });
  });

  describe('multiple reactive mode', () => {
    let component: TestSelectReactiveMultipleComponent;
    let fixture: ComponentFixture<TestSelectReactiveMultipleComponent>;
    let selectComponent: NzSelectComponent;
    let selectElement!: HTMLElement;
    let overlayContainerElement: HTMLElement;

    async function flushChanges(): Promise<void> {
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectReactiveMultipleComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectComponent = fixture.debugElement.query(By.directive(NzSelectComponent)).componentInstance;
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    });

    it('should ngModel works', async () => {
      component.listOfOption.set([
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02' }
      ]);
      component.value.set(['value_01', 'value_02']);
      await flushChanges();
      let listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent?.trim()).toBe('label_01');
      expect(listOfSelectItem[1].textContent?.trim()).toBe('label_02');
      component.listOfOption.set([{ value: 'value_01', label: 'label_01' }]);
      fixture.detectChanges();
      listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent?.trim()).toBe('label_01');
      expect(listOfSelectItem[1].textContent?.trim()).toBe('label_02');
      expect(component.valueChange).not.toHaveBeenCalled();
    });

    it('should click option work', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ]);
      component.value.set(['test_01']);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.value().length).toBe(2);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      await flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(2);
      expect(component.value().length).toBe(1);
      expect(component.value()[0]).toBe('test_01');
      expect(component.openChange).not.toHaveBeenCalled();
    });

    it('should compareWith works', async () => {
      component.listOfOption.set([{ value: { value: 'value' }, label: 'label' }]);
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(0);
      component.value.set([{ value: 'value' }]);
      component.compareWith.set((o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2));
      await flushChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(1);
      expect(selectElement.querySelectorAll('nz-select-item')[0].textContent?.trim()).toBe('label');
    });

    it('should nzMenuItemSelectedIcon works', async () => {
      component.listOfOption.set([{ value: 'value', label: 'label' }]);
      component.value.set(['value']);
      component.nzOpen.set(true);
      await flushChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(1);
      component.nzMenuItemSelectedIcon.set(component.iconTemplate);
      fixture.detectChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(0);
      expect(document.querySelector('.ant-select-item-option-state')!.textContent?.trim()).toBe('icon');
    });

    it('should removeIcon works', async () => {
      component.listOfOption.set([{ value: 'value', label: 'label' }]);
      component.value.set(['value']);
      await flushChanges();
      expect(selectElement.querySelector('.anticon-close')).toBeTruthy();
      component.nzRemoveIcon.set(component.iconTemplate);
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-selection-item-remove')!.textContent?.trim()).toBe('icon');
    });

    it('should removeIcon click works', async () => {
      component.listOfOption.set([{ value: 'value', label: 'label' }]);
      component.value.set(['value']);
      await flushChanges();
      dispatchFakeEvent(selectElement.querySelector('.anticon-close')!, 'click');
      await flushChanges();
      expect(component.value().length).toBe(0);
    });

    it('should backspace works', async () => {
      component.listOfOption.set([{ value: 'value', label: 'label' }]);
      component.value.set(['value']);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', BACKSPACE, inputElement);
      await flushChanges();
      expect(component.value().length).toBe(0);
    });

    it('should nzTokenSeparators work', async () => {
      component.listOfOption.set([
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ]);
      component.value.set([]);
      component.nzTokenSeparators.set([',']);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.value().length).toBe(1);
      expect(component.value()[0]).toBe('test_01');
    });

    it('should nzTokenSeparators + nzMaxMultipleCount work', async () => {
      component.nzMaxMultipleCount.set(1);
      component.listOfOption.set([
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ]);
      component.value.set([]);
      component.nzTokenSeparators.set([',']);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,label_02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.value().length).toBe(1);
      expect(component.value()[0]).toBe('test_01');
    });

    it('should nzMaxMultipleCount work', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ]);
      component.value.set([]);
      component.nzMaxMultipleCount.set(1);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(component.value().length).toBe(1);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      await flushChanges();
      expect(component.value().length).toBe(1);
      expect(component.value()[0]).toBe('test_01');
      expect(listOfContainerItem[1].classList.contains('ant-select-item-option-disabled')).toBe(true);
    });

    it('should isMaxMultipleCountSet work correct', () => {
      component.nzMaxMultipleCount.set(Infinity);
      fixture.detectChanges();
      expect(selectComponent.isMaxMultipleCountSet).toBeFalsy();

      component.nzMaxMultipleCount.set(1);
      fixture.detectChanges();
      expect(selectComponent.isMaxMultipleCountSet).toBeTruthy();

      component.nzMode.set('default');
      fixture.detectChanges();
      expect(selectComponent.isMaxMultipleCountSet).toBeFalsy();
    });

    it('should isMaxMultipleCountReached be set correctly when click options', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ]);
      component.value.set([]);
      component.nzMaxMultipleCount.set(1);
      await flushChanges();
      expect(selectComponent.isMaxMultipleCountReached).toBeFalsy();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(selectComponent.isMaxMultipleCountReached).toBeTruthy();
    });

    it('should isMaxMultipleCountReached be set correctly when change the ng model value', async () => {
      const options = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.nzOpen.set(true);
      component.listOfOption.set(options);
      component.value.set([]);
      component.nzMaxMultipleCount.set(1);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      expect(selectComponent.isMaxMultipleCountReached).toBeFalsy();
      selectComponent.writeValue([options[0]]);
      await flushChanges();
      expect(selectComponent.isMaxMultipleCountReached).toBeTruthy();
      expect(listOfContainerItem[1].classList.contains('ant-select-item-option-disabled')).toBe(true);
      selectComponent.writeValue([]);
      await flushChanges();
      expect(selectComponent.isMaxMultipleCountReached).toBeFalsy();
      expect(listOfContainerItem[0].classList.contains('ant-select-item-option-disabled')).toBe(false);
      expect(listOfContainerItem[1].classList.contains('ant-select-item-option-disabled')).toBe(false);
    });

    it('should show nzShowArrow component when nzMaxMultipleCount is not Infinity', () => {
      component.nzMaxMultipleCount.set(1);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-arrow')).toBeTruthy();
    });

    it('should nzAutoClearSearchValue work', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ]);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue.set(false);
      await flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(inputElement.value).toBe('test');
    });

    it('should nzAutoClearSearchValue work when cdkOverlay send emit close', async () => {
      component.nzOpen.set(true);
      component.listOfOption.set([
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ]);
      await flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      await flushChanges();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue.set(false);
      await flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);
      fixture.detectChanges();
      await flushChanges();
      fixture.detectChanges();
      expect(inputElement.value).toBe('test');
    });
  });

  describe('tags reactive mode', () => {
    let component: TestSelectReactiveTagsComponent;
    let fixture: ComponentFixture<TestSelectReactiveTagsComponent>;
    let selectElement!: HTMLElement;

    async function flushChanges(): Promise<void> {
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectReactiveTagsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });

    it('should nzTokenSeparators works', async () => {
      component.listOfOption.set([
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ]);
      component.value.set([]);
      component.nzTokenSeparators.set([',']);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.value().length).toBe(2);
      expect(component.value()[0]).toBe('test_01');
      expect(component.value()[1]).toBe('test_02');
    });

    it('should nzTokenSeparators + nzMaxMultipleCount work', async () => {
      component.nzMaxMultipleCount.set(1);
      component.listOfOption.set([
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ]);
      component.value.set([]);
      component.nzTokenSeparators.set([',']);
      await flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,label_02';
      dispatchFakeEvent(inputElement, 'input');
      await flushChanges();
      expect(component.value().length).toBe(1);
      expect(component.value()[0]).toBe('test_01');
    });

    it('should nzMaxTagCount works', async () => {
      component.listOfOption.set([
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' },
        { value: 'test_03', label: 'label_03' },
        { value: 'test_04', label: 'label_04' }
      ]);
      component.value.set(['test_01', 'test_02', 'test_03', 'test_04']);
      component.nzMaxTagCount.set(2);
      await flushChanges();
      const listOfItem = selectElement.querySelectorAll('nz-select-item');
      expect(listOfItem.length).toBe(3);
      expect(listOfItem[2].querySelector('.ant-select-selection-item-content')!.textContent?.trim()).toBe('+ 2 ...');
      component.nzMaxTagPlaceholder.set(component.tagTemplate);
      fixture.detectChanges();
      expect(listOfItem[2].textContent?.trim()).toBe('and 2 more selected');
    });
  });

  describe('change detection', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    let component: TestSelectTemplateDefaultComponent;
    let fixture: ComponentFixture<TestSelectTemplateDefaultComponent>;
    let selectComponent: NzSelectComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectTemplateDefaultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectComponent = fixture.debugElement.query(By.directive(NzSelectComponent)).componentInstance;
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainerElement = oc.getContainerElement();
    }));

    it('should not run change detection if the `triggerWidth` has not been changed', () => {
      const detectChangesSpy = vi.spyOn(selectComponent['cdr'], 'detectChanges');
      // const requestAnimationFrameSpy = vi.spyOn(window, 'requestAnimationFrame'); this test is totally unstable, depends upon the order of execution

      component.nzOpen.set(true);
      fixture.detectChanges();
      // The `requestAnimationFrame` is simulated as `setTimeout(..., 16)` in the test clock.
      vi.advanceTimersByTime(16);

      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);

      expect(component.nzOpen()).toEqual(false);

      component.nzOpen.set(true);
      fixture.detectChanges();
      vi.advanceTimersByTime(16);

      // Ensure that the `detectChanges()` have been called only once since the `triggerWidth` hasn't been changed.
      expect(detectChangesSpy.mock.calls.length).toBeLessThanOrEqual(1);
      // expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(2);
    });

    it('should not run change detection when `nz-select-top-control` is clicked and should focus the `nz-select-search`', () => {
      const appRef = TestBed.inject(ApplicationRef);
      vi.spyOn(appRef, 'tick').mockImplementation(() => {});

      const nzSelectSearch = fixture.debugElement.query(By.directive(NzSelectSearchComponent));
      vi.spyOn(nzSelectSearch.componentInstance, 'focus').mockImplementation(() => {});

      const nzSelectTopControl = fixture.debugElement.query(By.directive(NzSelectTopControlComponent));
      dispatchMouseEvent(nzSelectTopControl.nativeElement, 'click');

      expect(appRef.tick).toHaveBeenCalledTimes(0);
      expect(nzSelectSearch.componentInstance.focus).toHaveBeenCalled();
    });

    it('should not run change detection when non-backspace button is pressed on the `nz-select-top-control`', () => {
      const appRef = TestBed.inject(ApplicationRef);
      vi.spyOn(appRef, 'tick').mockImplementation(() => {});

      const nzSelectTopControl = fixture.debugElement.query(By.directive(NzSelectTopControlComponent));
      dispatchKeyboardEvent(nzSelectTopControl.nativeElement, 'keydown', TAB, nzSelectTopControl.nativeElement);

      expect(appRef.tick).toHaveBeenCalledTimes(0);
    });
  });

  describe('status', () => {
    let component: TestSelectStatusComponent;
    let fixture: ComponentFixture<TestSelectStatusComponent>;
    let selectElement!: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectStatusComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });

    it('should classname correct', () => {
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-status-error');

      component.status.set('warning');
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-status-warning');

      component.status.set('');
      fixture.detectChanges();
      expect(selectElement.classList).not.toContain('ant-select-status-warning');
    });
  });

  describe('in form', () => {
    let component: TestSelectInFormComponent;
    let fixture: ComponentFixture<TestSelectInFormComponent>;

    async function flushChanges(): Promise<void> {
      fixture.detectChanges();
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectInFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not warn about the internal ngModel control', () => {
      const warnSpy = vi.spyOn(console, 'warn');

      fixture = TestBed.createComponent(TestSelectInFormComponent);
      fixture.detectChanges();

      expect(warnSpy.mock.calls.some(([message]) => String(message).includes('NG01354'))).toBe(false);
      warnSpy.mockRestore();
    });

    it('should classname correct and be disable initially', () => {
      const selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(inputElement.disabled).toBeFalsy();
      expect(selectElement.classList).not.toContain('ant-select-disabled');
      expect(selectElement.classList).toContain('ant-select-status-error');
      expect(selectElement.classList).toContain('ant-select-in-form-item');
      expect(selectElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();

      component.status.set('warning');
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-status-warning');

      component.status.set('success');
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-status-success');

      component.feedback.set(false);
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-form-item-feedback-icon')).toBeNull();
    });

    it('should be disable by default even if form is enable', async () => {
      component.disabled.set(true);
      await flushChanges();
      const selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(inputElement.disabled).toBeTruthy();
      expect(selectElement.classList).toContain('ant-select-disabled');
    });

    it('should be disable if form is disabled and nzDisabled set to false', async () => {
      component.disable();
      await flushChanges();
      const selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(inputElement.disabled).toBeTruthy();
      expect(selectElement.classList).toContain('ant-select-disabled');
    });
  });

  describe('placement', () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    let component: TestSelectTemplateDefaultComponent;
    let fixture: ComponentFixture<TestSelectTemplateDefaultComponent>;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectTemplateDefaultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainerElement = oc.getContainerElement();
    }));

    it('should nzPlacement work', () => {
      component.nzOpen.set(true);
      fixture.detectChanges();
      let element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);
      component.nzOpen.set(false);
      component.nzPlacement.set('bottomRight');
      fixture.detectChanges();
      component.nzOpen.set(true);
      vi.advanceTimersByTime(0);
      fixture.detectChanges();
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);
      component.nzOpen.set(false);
      component.nzPlacement.set('topLeft');
      fixture.detectChanges();
      component.nzOpen.set(true);
      vi.advanceTimersByTime(0);
      fixture.detectChanges();
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);
      component.nzOpen.set(false);
      component.nzPlacement.set('topRight');
      fixture.detectChanges();
      component.nzOpen.set(true);
      vi.advanceTimersByTime(0);
      fixture.detectChanges();
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(true);
      component.nzOpen.set(false);
      fixture.detectChanges();
      vi.advanceTimersByTime(10000);
    });
  });
});

describe('select finalSize', () => {
  let fixture: ComponentFixture<TestSelectFinalSizeComponent>;
  let selectElement: HTMLElement;
  let compactSizeSignal: WritableSignal<NzSizeLDSType>;
  let formSizeSignal: WritableSignal<NzSizeLDSType>;

  beforeEach(() => {
    compactSizeSignal = signal<NzSizeLDSType>('large');
    formSizeSignal = signal<NzSizeLDSType>('default');
  });
  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should set correctly the size from the formSize signal', () => {
    TestBed.configureTestingModule({
      providers: [
        { provide: NZ_FORM_SIZE, useValue: formSizeSignal },
        { provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }
      ]
    });
    fixture = TestBed.createComponent(TestSelectFinalSizeComponent);
    selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    fixture.detectChanges();
    formSizeSignal.set('large');
    fixture.detectChanges();
    expect(selectElement.classList).toContain('ant-select-lg');
  });
  it('should set correctly the size from the compactSize signal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }]
    });
    fixture = TestBed.createComponent(TestSelectFinalSizeComponent);
    selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    fixture.detectChanges();
    expect(selectElement.classList).toContain('ant-select-lg');
  });
  it('should set correctly the size from the component input', () => {
    fixture = TestBed.createComponent(TestSelectFinalSizeComponent);
    selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    fixture.componentInstance.size.set('large');
    fixture.detectChanges();
    expect(selectElement.classList).toContain('ant-select-lg');
  });
});

describe('select finalVariant', () => {
  let fixture: ComponentFixture<TestSelectFinalVariantComponent>;
  let selectElement: HTMLElement;
  let formVariantSignal: WritableSignal<NzVariant>;

  beforeEach(() => {
    formVariantSignal = signal<NzVariant>('outlined');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should use formVariant when nzVariant is not set (undefined by default)', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestSelectFinalVariantComponent);
    selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(selectElement.classList).toContain('ant-select-filled');
  });

  it('should use nzVariant over formVariant when nzVariant is explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestSelectFinalVariantComponent);
    selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    fixture.componentInstance.variant.set('borderless');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(selectElement.classList).toContain('ant-select-borderless');
    expect(selectElement.classList).not.toContain('ant-select-filled');
  });

  it('should use nzVariant outlined over formVariant when explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestSelectFinalVariantComponent);
    selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    fixture.componentInstance.variant.set('outlined');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(selectElement.classList).not.toContain('ant-select-filled');
  });

  it('should use nzVariant when no formVariant is provided', () => {
    fixture = TestBed.createComponent(TestSelectFinalVariantComponent);
    selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    fixture.componentInstance.variant.set('filled');
    fixture.detectChanges();
    expect(selectElement.classList).toContain('ant-select-filled');
  });

  it('should default to outlined when neither nzVariant nor formVariant is set', () => {
    fixture = TestBed.createComponent(TestSelectFinalVariantComponent);
    selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    fixture.detectChanges();
    expect(selectElement.classList).not.toContain('ant-select-filled');
    expect(selectElement.classList).not.toContain('ant-select-borderless');
    expect(selectElement.classList).not.toContain('ant-select-underlined');
  });
});

describe('option container scroll', () => {
  let container: NzOptionContainerComponent;
  let scrollSpy: ReturnType<typeof vi.spyOn>;

  const change = (previousValue: unknown, currentValue: unknown, firstChange = false): SimpleChange =>
    ({ previousValue, currentValue, firstChange, isFirstChange: () => firstChange }) as SimpleChange;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideNzIconsTesting(), provideNzNoAnimation()] });
    container = TestBed.createComponent(NzOptionContainerComponent).componentInstance;
    scrollSpy = vi.spyOn(container, 'scrollToActivatedValue').mockImplementation(() => {});
  });

  it('should not recenter when more options are appended on scroll', () => {
    container.ngOnChanges({ listOfContainerItem: change([{ key: 'a' }], [{ key: 'a' }, { key: 'b' }]) });
    expect(scrollSpy).not.toHaveBeenCalled();
  });

  it('should recenter when the activated value changes (keyboard/selection)', () => {
    container.ngOnChanges({ activatedValue: change('a', 'b') });
    expect(scrollSpy).toHaveBeenCalledTimes(1);
  });

  it('should recenter on the initial population of options', () => {
    container.ngOnChanges({ listOfContainerItem: change([], [{ key: 'a' }], true) });
    expect(scrollSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="default"
      [(ngModel)]="value"
      (ngModelChange)="valueChange($event)"
      [nzSize]="nzSize()"
      [nzDropdownMatchSelectWidth]="nzDropdownMatchSelectWidth"
      [nzPlaceHolder]="nzPlaceHolder()"
      [nzDropdownRender]="nzDropdownRender()"
      [nzCustomTemplate]="nzCustomTemplate() ?? null"
      [nzPrefix]="nzPrefix()"
      [nzSuffixIcon]="nzSuffixIcon()"
      [nzClearIcon]="nzClearIcon()"
      [nzShowArrow]="nzShowArrow()"
      [nzFilterOption]="nzFilterOption()"
      [compareWith]="compareWith()"
      [nzAllowClear]="nzAllowClear()"
      [nzVariant]="nzVariant()"
      [nzShowSearch]="nzShowSearch()"
      [nzLoading]="nzLoading"
      [nzAutoFocus]="nzAutoFocus()"
      [nzServerSearch]="nzServerSearch()"
      [nzDisabled]="nzDisabled()"
      [nzBackdrop]="nzBackdrop()"
      [(nzOpen)]="nzOpen"
      (nzOpenChange)="openChange($event)"
      [nzPlacement]="nzPlacement()"
      [nzSelectOnTab]="nzSelectOnTab()"
      [nzMaxMultipleCount]="nzMaxMultipleCount()"
      (nzOnSearch)="searchValueChange($event)"
    >
      @for (o of listOfOption(); track o.nzValue) {
        <nz-option
          [nzValue]="o.nzValue"
          [nzLabel]="o.nzLabel"
          [nzTitle]="o.nzTitle"
          [nzDisabled]="o.nzDisabled"
          [nzHide]="o.nzHide"
        />
      }
      @for (group of listOfGroup(); track group.nzLabel) {
        <nz-option-group [nzLabel]="group.nzLabel">
          @for (o of group.children; track o) {
            <nz-option
              [nzValue]="o.nzValue"
              [nzLabel]="o.nzLabel"
              [nzTitle]="o.nzTitle"
              [nzDisabled]="o.nzDisabled"
              [nzHide]="o.nzHide"
            />
          }
        </nz-option-group>
      }
    </nz-select>
    <ng-template #dropdownTemplate><div class="dropdown-render">dropdownRender</div></ng-template>
    <ng-template #customTemplate let-selected>selected: {{ selected.nzLabel }}</ng-template>
    <ng-template #affixTemplate>icon</ng-template>
  `
})
export class TestSelectTemplateDefaultComponent {
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('customTemplate') customTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('affixTemplate') affixTemplate!: TemplateRef<NzSafeAny>;
  readonly value = signal<NzSafeAny | null>(null);
  readonly nzOpen = signal(false);
  valueChange = vi.fn<(value: NzSafeAny) => void>();
  openChange = vi.fn<(open: NzSafeAny) => void>();
  searchValueChange = vi.fn<(value: NzSafeAny) => void>();
  readonly listOfGroup = signal<
    Array<{ nzLabel: string | TemplateRef<NzSafeAny> | null; children: NzSelectItemInterface[] }>
  >([]);
  readonly listOfOption = signal<NzSelectItemInterface[]>([]);
  readonly nzSize = signal<NzSelectSizeType>('default');
  nzDropdownMatchSelectWidth = true;
  readonly nzPlaceHolder = signal<string | TemplateRef<NzSafeAny> | null>(null);
  readonly nzDropdownRender = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzCustomTemplate = signal<TemplateRef<{ $implicit: NzSelectItemInterface }> | undefined>(undefined);
  readonly nzPrefix = signal<string | TemplateRef<NzSafeAny> | null>(null);
  readonly nzSuffixIcon = signal<string | TemplateRef<NzSafeAny> | null>(null);
  readonly nzClearIcon = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzShowArrow = signal(true);
  readonly nzMaxMultipleCount = signal<number>(Infinity);
  readonly nzFilterOption = signal<NzFilterOptionType>((searchValue: string, item: NzSelectItemInterface): boolean => {
    if (item && item.nzLabel) {
      return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    } else {
      return false;
    }
  });
  readonly compareWith = signal<(o1: NzSafeAny, o2: NzSafeAny) => boolean>((o1: NzSafeAny, o2: NzSafeAny) => o1 === o2);
  readonly nzAllowClear = signal(false);
  readonly nzVariant = signal<NzVariant | undefined>(undefined);
  readonly nzShowSearch = signal(false);
  nzLoading = false;
  readonly nzAutoFocus = signal(false);
  readonly nzServerSearch = signal(false);
  readonly nzDisabled = signal(false);
  readonly nzBackdrop = signal(false);
  readonly nzSelectOnTab = signal(false);
  readonly nzPlacement = signal<NzSelectPlacementType | null>('bottomLeft');
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="multiple"
      [(ngModel)]="value"
      (ngModelChange)="valueChange($event)"
      [nzMenuItemSelectedIcon]="nzMenuItemSelectedIcon()"
      [nzTokenSeparators]="nzTokenSeparators()"
      [nzRemoveIcon]="nzRemoveIcon()"
      [nzMaxMultipleCount]="nzMaxMultipleCount()"
      [compareWith]="compareWith()"
      [nzAutoClearSearchValue]="nzAutoClearSearchValue()"
      [(nzOpen)]="nzOpen"
      (nzOpenChange)="valueChange($event)"
    >
      @for (o of listOfOption(); track o.nzValue) {
        <nz-option [nzValue]="o.nzValue" [nzLabel]="o.nzLabel" [nzDisabled]="o.nzDisabled" [nzHide]="o.nzHide" />
      }
    </nz-select>
    <ng-template #iconTemplate>icon</ng-template>
  `
})
export class TestSelectTemplateMultipleComponent {
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<NzSafeAny>;
  readonly listOfOption = signal<NzSelectItemInterface[]>([]);
  readonly value = signal<NzSafeAny>([]);
  readonly nzOpen = signal(false);
  valueChange = vi.fn<(value: NzSafeAny) => void>();
  openChange = vi.fn<(open: NzSafeAny) => void>();
  readonly nzMenuItemSelectedIcon = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzRemoveIcon = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzTokenSeparators = signal<string[]>([]);
  readonly nzMaxMultipleCount = signal(Infinity);
  readonly compareWith = signal<(o1: NzSafeAny, o2: NzSafeAny) => boolean>((o1: NzSafeAny, o2: NzSafeAny) => o1 === o2);
  readonly nzAutoClearSearchValue = signal(true);
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="tags"
      [(ngModel)]="value"
      (ngModelChange)="valueChange($event)"
      [nzSize]="nzSize()"
      [nzMaxTagCount]="nzMaxTagCount()"
      [nzTokenSeparators]="nzTokenSeparators()"
      [nzMaxTagPlaceholder]="nzMaxTagPlaceholder() ?? null"
    >
      @for (o of listOfOption(); track o.nzValue) {
        <nz-option [nzValue]="o.nzValue" [nzLabel]="o.nzLabel" [nzDisabled]="o.nzDisabled" [nzHide]="o.nzHide" />
      }
    </nz-select>
    <ng-template #tagTemplate let-selectedList>and {{ selectedList.length }} more selected</ng-template>
  `
})
export class TestSelectTemplateTagsComponent {
  @ViewChild('tagTemplate') tagTemplate!: TemplateRef<NzSafeAny>;
  readonly nzSize = signal<NzSelectSizeType>('default');
  readonly nzMaxTagCount = signal<NzSelectMaxTagCount>(Infinity);
  readonly value = signal<NzSafeAny[]>([]);
  readonly listOfOption = signal<NzSelectItemInterface[]>([]);
  valueChange = vi.fn();
  readonly nzTokenSeparators = signal<string[]>([]);
  readonly nzMaxTagPlaceholder = signal<TemplateRef<{ $implicit: NzSafeAny[] }> | undefined>(undefined);
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="default"
      [(ngModel)]="value"
      (ngModelChange)="valueChange($event)"
      [nzOptions]="listOfOption()"
      [nzSize]="nzSize()"
      [nzDropdownMatchSelectWidth]="nzDropdownMatchSelectWidth"
      [nzPlaceHolder]="nzPlaceHolder()"
      [nzDropdownRender]="nzDropdownRender()"
      [nzCustomTemplate]="nzCustomTemplate() ?? null"
      [nzSuffixIcon]="nzSuffixIcon()"
      [nzClearIcon]="nzClearIcon()"
      [nzShowArrow]="nzShowArrow()"
      [nzFilterOption]="nzFilterOption()"
      [compareWith]="compareWith()"
      [nzAllowClear]="nzAllowClear()"
      [nzShowSearch]="nzShowSearch()"
      [nzLoading]="nzLoading"
      [nzAutoFocus]="nzAutoFocus()"
      [nzServerSearch]="nzServerSearch()"
      [nzDisabled]="nzDisabled()"
      [nzAutoClearSearchValue]="nzAutoClearSearchValue()"
      [(nzOpen)]="nzOpen"
      (nzOpenChange)="openChange($event)"
      (nzOnSearch)="searchValueChange($event)"
      (nzOnClear)="onClear()"
    />
    <ng-template #dropdownTemplate><div class="dropdown-render">dropdownRender</div></ng-template>
    <ng-template #customTemplate let-selected>selected: {{ selected.nzLabel }}</ng-template>
    <ng-template #suffixIconTemplate>icon</ng-template>
    <ng-template #optionTemplate let-option let-value="value" let-disabled="disabled">
      option: {{ option.value }} {{ value }} {{ disabled }}
    </ng-template>
  `
})
export class TestSelectReactiveDefaultComponent {
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('customTemplate') customTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('suffixIconTemplate') suffixIconTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('optionTemplate', { static: true }) optionTemplate!: TemplateRef<NzSafeAny>;
  readonly value = signal<NzSafeAny | null>(null);
  readonly nzOpen = signal(false);
  valueChange = vi.fn<(value: NzSafeAny) => void>();
  openChange = vi.fn<(open: NzSafeAny) => void>();
  readonly nzAutoClearSearchValue = signal(true);

  onClear = vi.fn<() => void>();
  searchValueChange = vi.fn<(value: NzSafeAny) => void>();
  readonly listOfOption = signal<NzSelectOptionInterface[]>([]);
  readonly nzSize = signal<NzSelectSizeType>('default');
  nzDropdownMatchSelectWidth = true;
  readonly nzPlaceHolder = signal<string | TemplateRef<NzSafeAny> | null>(null);
  readonly nzDropdownRender = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzCustomTemplate = signal<TemplateRef<{ $implicit: NzSelectItemInterface }> | undefined>(undefined);
  readonly nzSuffixIcon = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzClearIcon = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzShowArrow = signal(true);
  readonly nzFilterOption = signal<NzFilterOptionType>((searchValue: string, item: NzSelectItemInterface): boolean => {
    if (item && item.nzLabel) {
      return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    } else {
      return false;
    }
  });
  readonly compareWith = signal<(o1: NzSafeAny, o2: NzSafeAny) => boolean>((o1: NzSafeAny, o2: NzSafeAny) => o1 === o2);
  readonly nzAllowClear = signal(false);
  readonly nzShowSearch = signal(false);
  nzLoading = false;
  readonly nzAutoFocus = signal(false);
  readonly nzServerSearch = signal(false);
  readonly nzDisabled = signal(false);
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      [nzMode]="nzMode()"
      [(ngModel)]="value"
      (ngModelChange)="valueChange($event)"
      [nzOptions]="listOfOption()"
      [nzMenuItemSelectedIcon]="nzMenuItemSelectedIcon()"
      [nzTokenSeparators]="nzTokenSeparators()"
      [nzRemoveIcon]="nzRemoveIcon()"
      [nzMaxMultipleCount]="nzMaxMultipleCount()"
      [compareWith]="compareWith()"
      [nzAutoClearSearchValue]="nzAutoClearSearchValue()"
      [(nzOpen)]="nzOpen"
      (nzOpenChange)="valueChange($event)"
    />
    <ng-template #iconTemplate>icon</ng-template>
  `
})
export class TestSelectReactiveMultipleComponent {
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<NzSafeAny>;
  readonly listOfOption = signal<NzSelectOptionInterface[]>([]);
  readonly value = signal<NzSafeAny[]>([]);
  readonly nzOpen = signal(false);
  valueChange = vi.fn();
  openChange = vi.fn();
  readonly nzMenuItemSelectedIcon = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzRemoveIcon = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzTokenSeparators = signal<string[]>([]);
  readonly nzMaxMultipleCount = signal(Infinity);
  readonly nzMode = signal<NzSelectModeType>('multiple');
  readonly compareWith = signal<(o1: NzSafeAny, o2: NzSafeAny) => boolean>((o1: NzSafeAny, o2: NzSafeAny) => o1 === o2);
  readonly nzAutoClearSearchValue = signal(true);
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="tags"
      [(ngModel)]="value"
      (ngModelChange)="valueChange($event)"
      [nzOptions]="listOfOption()"
      [nzSize]="nzSize()"
      [nzMaxTagCount]="nzMaxTagCount()"
      [nzMaxMultipleCount]="nzMaxMultipleCount()"
      [nzTokenSeparators]="nzTokenSeparators()"
      [nzMaxTagPlaceholder]="nzMaxTagPlaceholder() ?? null"
    />
    <ng-template #tagTemplate let-selectedList>and {{ selectedList.length }} more selected</ng-template>
  `
})
export class TestSelectReactiveTagsComponent {
  @ViewChild('tagTemplate') tagTemplate?: TemplateRef<NzSafeAny>;
  readonly nzSize = signal<NzSelectSizeType>('default');
  readonly nzMaxTagCount = signal<NzSelectMaxTagCount>(Infinity);
  readonly value = signal<NzSafeAny[]>([]);
  readonly listOfOption = signal<NzSelectOptionInterface[]>([]);
  valueChange = vi.fn();
  readonly nzTokenSeparators = signal<string[]>([]);
  readonly nzMaxTagPlaceholder = signal<TemplateRef<NzSafeAny> | undefined>(undefined);
  readonly nzMaxMultipleCount = signal<number | undefined>(undefined);
}

@Component({
  imports: [NzSelectModule],
  template: `<nz-select [nzStatus]="status()" />`
})
export class TestSelectStatusComponent {
  readonly status = signal<NzStatus>('error');
}

@Component({
  imports: [ReactiveFormsModule, NzFormModule, NzSelectModule],
  template: `
    <form nz-form [formGroup]="selectForm">
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback()" [nzValidateStatus]="status()">
          <nz-select formControlName="selectControl" [nzOptions]="[]" [nzDisabled]="disabled()" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class TestSelectInFormComponent {
  selectForm = new FormGroup({
    selectControl: new FormControl(null)
  });
  readonly status = signal<NzFormControlStatusType>('error');
  readonly feedback = signal(true);

  readonly disabled = signal(false);

  disable(): void {
    this.selectForm.disable();
  }

  enable(): void {
    this.selectForm.enable();
  }
}

@Component({
  imports: [NzSelectModule],
  template: `<nz-select [nzSize]="size()" />`
})
export class TestSelectFinalSizeComponent {
  readonly size = signal<NzSelectSizeType>('default');
}

@Component({
  imports: [NzSelectModule],
  template: `<nz-select [nzVariant]="variant()" />`
})
export class TestSelectFinalVariantComponent {
  readonly variant = signal<NzVariant | undefined>(undefined);
}

function setMeasuredWidth(element: HTMLElement, width: number): void {
  Object.defineProperty(element, 'clientWidth', { configurable: true, get: () => width });
  Object.defineProperty(element, 'offsetWidth', { configurable: true, get: () => width });
}

function createSelectResizeHarness(): { factory: NzResizeObserverFactory; flush: () => void } {
  const observed: Array<{ callback: ResizeObserverCallback; elements: Set<Element> }> = [];
  const factory: NzResizeObserverFactory = {
    create(callback: ResizeObserverCallback): ResizeObserver {
      const record = { callback, elements: new Set<Element>() };
      observed.push(record);
      return {
        observe: element => {
          record.elements.add(element);
        },
        unobserve: element => {
          record.elements.delete(element);
        },
        disconnect: () => {
          record.elements.clear();
        }
      } as ResizeObserver;
    }
  };
  return {
    factory,
    flush: () => {
      for (const record of observed) {
        const entries = [...record.elements].map(target => ({ target }) as ResizeObserverEntry);
        if (entries.length) {
          record.callback(entries, null as unknown as ResizeObserver);
        }
      }
    }
  };
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      [nzMode]="nzMode()"
      [nzMaxTagCount]="nzMaxTagCount()"
      [nzMaxTagPlaceholder]="nzMaxTagPlaceholder() ?? null"
      [nzCustomTemplate]="nzCustomTemplate() ?? null"
      [nzDisabled]="nzDisabled()"
      [nzAllowClear]="nzAllowClear()"
      [(ngModel)]="value"
    >
      @for (o of listOfOption(); track o.nzValue) {
        <nz-option [nzValue]="o.nzValue" [nzLabel]="o.nzLabel" [nzDisabled]="o.nzDisabled" />
      }
    </nz-select>
    <ng-template #tagTemplate let-selectedList>and {{ selectedList.length }} more selected</ng-template>
    <ng-template #customTemplate let-selected>wide {{ selected.nzLabel }}</ng-template>
  `
})
class TestSelectResponsiveComponent {
  @ViewChild('tagTemplate', { static: true }) tagTemplate!: TemplateRef<{ $implicit: NzSafeAny[] }>;
  @ViewChild('customTemplate', { static: true }) customTemplate!: TemplateRef<{ $implicit: NzSelectItemInterface }>;
  readonly nzMode = signal<NzSelectModeType>('tags');
  readonly nzMaxTagCount = signal<NzSelectMaxTagCount>('responsive');
  readonly nzMaxTagPlaceholder = signal<TemplateRef<{ $implicit: NzSafeAny[] }> | undefined>(undefined);
  readonly nzCustomTemplate = signal<TemplateRef<{ $implicit: NzSelectItemInterface }> | undefined>(undefined);
  readonly nzDisabled = signal(false);
  readonly nzAllowClear = signal(false);
  readonly value = signal<NzSafeAny>(['a', 'b', 'c', 'd']);
  readonly listOfOption = signal<NzSelectItemInterface[]>([
    { nzValue: 'a', nzLabel: 'alpha' },
    { nzValue: 'b', nzLabel: 'bravo' },
    { nzValue: 'c', nzLabel: 'charlie' },
    { nzValue: 'd', nzLabel: 'delta' }
  ]);
}
