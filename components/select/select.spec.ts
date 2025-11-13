/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ApplicationRef, Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, inject, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchFakeEvent, dispatchKeyboardEvent, dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NzSafeAny, NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { NzFormControlStatusType, NzFormModule } from 'ng-zorro-antd/form';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzSelectSearchComponent } from './select-search.component';
import { NzSelectTopControlComponent } from './select-top-control.component';
import { NzSelectComponent, NzSelectSizeType } from './select.component';
import { NzSelectModule } from './select.module';
import {
  NzFilterOptionType,
  NzSelectItemInterface,
  NzSelectModeType,
  NzSelectOptionInterface,
  NzSelectPlacementType
} from './select.types';

describe('select', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('default template mode', () => {
    let component: TestSelectTemplateDefaultComponent;
    let fixture: ComponentFixture<TestSelectTemplateDefaultComponent>;
    let selectElement!: HTMLElement;
    let overlayContainerElement: HTMLElement;

    function flushChanges(): void {
      fixture.detectChanges();
      flush();
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
      component.nzSize = 'large';
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-lg');
      component.nzSize = 'small';
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-sm');
    });

    it('should nzPlaceHolder work', () => {
      expect(selectElement.querySelector('.ant-select-selection-placeholder')!.textContent!.trim()).toBe('');
      component.nzPlaceHolder = 'placeholder';
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-selection-placeholder')!.textContent?.trim()).toContain(
        'placeholder'
      );
    });

    it('should nzDropdownRender work', () => {
      component.nzOpen = true;
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-render').length).toBe(0);
      component.nzDropdownRender = component.dropdownTemplate;
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-render')[0]!.textContent?.trim()).toBe('dropdownRender');
    });

    it('should ngModel match nzLabel', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'test_value', nzLabel: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = 'test_value';
      flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
      component.listOfOption = [];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));

    it('should ngModelChange trigger when click option', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      component.value = 'test_01';
      component.nzOpen = true;
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith('test_02');
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
    }));

    it('should ngModelChange trigger when click clear icon', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'test_value', nzLabel: 'test_label' }];
      component.value = 'test_value';
      flushChanges();
      expect(selectElement.querySelector('nz-select-clear')).toBeFalsy();
      component.nzAllowClear = true;
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('nz-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith(null);
    }));

    it('should nzOpenChange trigger correct times', () => {
      component.nzOpen = true;
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
      component.nzShowSearch = true;
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

    it('should nzCustomTemplate works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = 'value';
      component.nzCustomTemplate = component.customTemplate;
      flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('selected: label');
    }));

    it('should nzShowArrow works', () => {
      expect(selectElement.querySelector('nz-select-arrow')).toBeTruthy();
      component.nzShowArrow = false;
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-arrow')).toBeFalsy();
    });

    it('should nzPrefix works', () => {
      component.nzPrefix = 'prefix';
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('prefix');

      component.nzPrefix = component.affixTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('icon');
    });

    it('should nzSuffixIcon works', () => {
      expect(selectElement.querySelector('.anticon-down')).toBeTruthy();
      component.nzSuffixIcon = component.affixTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-arrow')!.textContent?.trim()).toBe('icon');
    });

    it('should nzClearIcon works', fakeAsync(() => {
      component.nzAllowClear = true;
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = 'value';
      flushChanges();
      expect(selectElement.querySelector('.anticon-close-circle')).toBeTruthy();
      component.nzClearIcon = component.affixTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-clear')!.textContent?.trim()).toBe('icon');
    }));

    it('should nzShowSearch works', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      component.nzShowSearch = true;
      component.nzOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('test');
      expect(document.querySelectorAll('nz-option-item').length).toBe(2);
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(1);
    }));

    it('should nzFilterOption works', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' },
        { nzValue: 'test_03', nzLabel: 'test_03' }
      ];
      component.nzShowSearch = true;
      component.nzFilterOption = () => true;
      component.nzOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    }));

    it('should compareWith works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: { value: 'test_value' }, nzLabel: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = { value: 'test_value' };
      component.compareWith = (o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
    }));

    it('should nzBorderless works', () => {
      expect(selectElement.classList).not.toContain('ant-select-borderless');
      component.nzBorderless = true;
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-borderless');
    });

    describe('should nzVariant works', () => {
      it('filled', () => {
        fixture.detectChanges();
        expect(selectElement.classList).not.toContain('ant-select-filled');
        component.nzVariant = 'filled';
        fixture.detectChanges();
        expect(selectElement.classList).toContain('ant-select-filled');
      });

      it('borderless', () => {
        fixture.detectChanges();
        expect(selectElement.classList).not.toContain('ant-select-borderless');
        component.nzVariant = 'borderless';
        fixture.detectChanges();
        expect(selectElement.classList).toContain('ant-select-borderless');
      });

      it('underlined', () => {
        fixture.detectChanges();
        expect(selectElement.classList).not.toContain('ant-select-underlined');
        component.nzVariant = 'underlined';
        fixture.detectChanges();
        expect(selectElement.classList).toContain('ant-select-underlined');
      });
    });

    it('should nzAutoFocus works', () => {
      component.nzAutoFocus = true;
      fixture.detectChanges();
      expect(selectElement.querySelector('input')!.attributes.getNamedItem('autofocus')!.name).toBe('autofocus');
      component.nzAutoFocus = false;
      fixture.detectChanges();
      expect(selectElement.querySelector('input')!.attributes.getNamedItem('autofocus')).toBeFalsy();
    });

    it('should nzServerSearch works', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: '1', nzLabel: '1' },
        { nzValue: '2', nzLabel: '2' },
        { nzValue: '3', nzLabel: '3' }
      ];
      component.nzServerSearch = true;
      component.nzShowSearch = true;
      component.nzOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    }));

    it('should nzDisabled works', fakeAsync(() => {
      component.nzDisabled = true;
      flushChanges();
      expect(selectElement.classList).toContain('ant-select-disabled');
      expect(selectElement.querySelector('input')!.getAttribute('disabled')).toBe('');
    }));

    it('should nzTitle works', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: '1', nzLabel: '1' },
        { nzValue: '2', nzLabel: '2', nzTitle: '-' },
        { nzValue: '3', nzLabel: '3', nzTitle: null }
      ];
      component.nzOpen = true;
      flushChanges();
      expect((document.querySelectorAll('nz-option-item')[0] as HTMLElement)?.title).toBe('1');
      expect((document.querySelectorAll('nz-option-item')[1] as HTMLElement)?.title).toBe('-');
      expect((document.querySelectorAll('nz-option-item')[2] as HTMLElement)?.title).toBeFalsy();
    }));

    it('should select option by enter', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'value', nzLabel: 'label' },
        { nzValue: 'disabledValue', nzLabel: 'disabledLabel', nzDisabled: true }
      ];
      component.nzShowSearch = true;
      component.nzOpen = true;

      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label';

      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('label');

      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      flushChanges();
      expect(component.value).toBe('value');
    }));

    it('should nzDisabled option works', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'value', nzLabel: 'label' },
        { nzValue: 'disabledValue', nzLabel: 'disabledLabel', nzDisabled: true }
      ];
      component.nzShowSearch = true;
      component.nzOpen = true;

      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'disabled';

      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('disabled');

      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      flushChanges();
      expect(component.value).not.toBe('disabledValue');
    }));

    it('should nzBackdrop works', fakeAsync(() => {
      component.nzOpen = true;
      component.nzBackdrop = true;
      flushChanges();
      expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
    }));

    it('should close dropdown when ESC keydown', fakeAsync(() => {
      component.nzOpen = true;
      flushChanges();
      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);
      flushChanges();
      expect(component.nzOpen).toBe(false);
    }));

    it('should keydown up arrow and down arrow', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02', nzDisabled: true },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ];
      component.value = 'value_01';
      component.nzOpen = true;
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', UP_ARROW, inputElement);
      flushChanges();
      expect(document.querySelectorAll('nz-option-item')[2]!.classList).toContain('ant-select-item-option-active');
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      expect(document.querySelectorAll('nz-option-item')[0]!.classList).toContain('ant-select-item-option-active');
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledWith('value_03');
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(true);
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(3);
    }));

    it('should not throw error with keydown up arrow and down arrow event when listOfOption is empty', fakeAsync(() => {
      component.listOfOption = [];
      component.nzOpen = true;
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', UP_ARROW, inputElement);
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(0);
    }));

    it('should mouseenter activated option work', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02', nzDisabled: true },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ];
      component.nzOpen = true;
      flushChanges();
      const targetItem = document.querySelectorAll('nz-option-item')[2]!;
      expect(targetItem.classList).not.toContain('ant-select-item-option-active');
      dispatchFakeEvent(targetItem, 'mouseenter');
      flushChanges();
      expect(targetItem.classList).toContain('ant-select-item-option-active');
    }));

    it('should group item change work', fakeAsync(() => {
      component.listOfGroup = [{ nzLabel: 'group-1', children: [{ nzValue: 'value_01', nzLabel: 'label_01' }] }];
      component.nzOpen = true;
      flushChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(1);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(1);
      component.listOfGroup = [
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
      ];
      flushChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(3);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(2);
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent?.trim()).toBe('group-1');
      expect(document.querySelectorAll('nz-option-item')[0].textContent?.trim()).toBe('label_01');
      component.listOfGroup[0].nzLabel = 'change-group';
      component.listOfGroup[0].children[0].nzLabel = 'change-label';
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent?.trim()).toBe('change-group');
      expect(document.querySelectorAll('nz-option-item')[0].textContent?.trim()).toBe('change-label');
    }));

    it('should group item sort be right', fakeAsync(() => {
      component.listOfGroup = [
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
      ];
      component.nzOpen = true;
      flushChanges();
      expect(
        document
          .querySelectorAll('nz-option-item')[0]
          .parentElement!.querySelector('nz-option-item')!
          .nextElementSibling!.textContent?.trim()
      ).toBe('label_02');
    }));

    it('should have selected class if item was selected', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 0, nzLabel: 'Falsy value' },
        { nzValue: 'Truthy value', nzLabel: 'Truthy value' },
        { nzValue: 'disabled', nzLabel: 'disabled', nzDisabled: true },
        { nzValue: undefined, nzLabel: 'undefined' },
        { nzValue: null, nzLabel: 'null' }
      ];
      component.nzOpen = true;
      component.value = 0;
      flushChanges();
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected').length).toBe(1);
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected')[0].textContent?.trim()).toBe(
        'Falsy value'
      );
      component.value = 'Truthy value';
      flushChanges();
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected').length).toBe(1);
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected')[0].textContent?.trim()).toBe(
        'Truthy value'
      );
      ['disabled', undefined, null].forEach(value => {
        component.value = value;
        flushChanges();
        expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected').length).toBe(0);
      });
    }));

    it('should select item on TAB when nzSelectOnTab is true', fakeAsync(() => {
      component.nzSelectOnTab = true;
      component.listOfOption = [
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02' },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ];
      component.nzOpen = true;
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledWith('value_01');
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(1);
    }));

    it('should close select and keep the same value on TAB when nzSelectOnTab is default(false)', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02' },
        { nzValue: 'value_03', nzLabel: 'label_03' }
      ];
      component.value = 'value_02';
      component.nzOpen = true;
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      flushChanges();
      expect(component.valueChange).not.toHaveBeenCalled();
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(1);
    }));
  });

  describe('multiple template mode', () => {
    let component: TestSelectTemplateMultipleComponent;
    let fixture: ComponentFixture<TestSelectTemplateMultipleComponent>;
    let selectElement!: HTMLElement;
    let overlayContainerElement: HTMLElement;

    function flushChanges(): void {
      fixture.detectChanges();
      flush();
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

    it('should ngModel works', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'value_01', nzLabel: 'label_01' },
        { nzValue: 'value_02', nzLabel: 'label_02' }
      ];
      component.value = ['value_01', 'value_02'];
      flushChanges();
      let listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent?.trim()).toBe('label_01');
      expect(listOfSelectItem[1].textContent?.trim()).toBe('label_02');
      component.listOfOption = [{ nzValue: 'value_01', nzLabel: 'label_01' }];
      fixture.detectChanges();
      listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent?.trim()).toBe('label_01');
      expect(listOfSelectItem[1].textContent?.trim()).toBe('label_02');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));

    it('should click option work', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      component.value = ['test_01'];
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.value.length).toBe(2);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(2);
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
      expect(component.openChange).not.toHaveBeenCalled();
    }));

    it('should compareWith works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: { value: 'value' }, nzLabel: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(0);
      component.value = [{ value: 'value' }];
      component.compareWith = (o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
      flushChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(1);
      expect(selectElement.querySelectorAll('nz-select-item')[0].textContent?.trim()).toBe('label');
    }));

    it('should nzMenuItemSelectedIcon works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = ['value'];
      component.nzOpen = true;
      flushChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(1);
      component.nzMenuItemSelectedIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(0);
      expect(document.querySelector('.ant-select-item-option-state')!.textContent?.trim()).toBe('icon');
    }));

    it('should removeIcon works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = ['value'];
      flushChanges();
      expect(selectElement.querySelector('.anticon-close')).toBeTruthy();
      component.nzRemoveIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-selection-item-remove')!.textContent?.trim()).toBe('icon');
    }));

    it('should removeIcon click works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = ['value'];
      flushChanges();
      dispatchFakeEvent(selectElement.querySelector('.anticon-close')!, 'click');
      flushChanges();
      expect(component.value.length).toBe(0);
    }));

    it('should backspace works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = ['value'];
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', BACKSPACE, inputElement);
      flushChanges();
      expect(component.value.length).toBe(0);
    }));

    it('should nzTokenSeparators work', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'label_01' },
        { nzValue: 'test_02', nzLabel: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));

    it('should nzMaxMultipleCount work', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      component.value = [];
      component.nzMaxMultipleCount = 1;
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(component.value.length).toBe(1);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));

    it('should nzAutoClearSearchValue work', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue = false;
      flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(inputElement.value).toBe('test');
    }));

    it('should nzAutoClearSearchValue work when cdkOverlay send emit close', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue = false;
      flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);
      flushChanges();
      expect(inputElement.value).toBe('test');
    }));
  });

  describe('tags template mode', () => {
    let component: TestSelectTemplateTagsComponent;
    let fixture: ComponentFixture<TestSelectTemplateTagsComponent>;
    let selectElement!: HTMLElement;

    function flushChanges(): void {
      fixture.detectChanges();
      flush();
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

    it('should nzTokenSeparators works', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'label_01' },
        { nzValue: 'test_02', nzLabel: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.value.length).toBe(2);
      expect(component.value[0]).toBe('test_01');
      expect(component.value[1]).toBe('test_02');
    }));

    it('should nzMaxTagCount works', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'label_01' },
        { nzValue: 'test_02', nzLabel: 'label_02' },
        { nzValue: 'test_03', nzLabel: 'label_03' },
        { nzValue: 'test_04', nzLabel: 'label_04' }
      ];
      component.value = ['test_01', 'test_02', 'test_03', 'test_04'];
      component.nzMaxTagCount = 2;
      flushChanges();
      const listOfItem = selectElement.querySelectorAll('nz-select-item');
      expect(listOfItem.length).toBe(3);
      expect(listOfItem[2].querySelector('.ant-select-selection-item-content')!.textContent?.trim()).toBe('+ 2 ...');
      component.nzMaxTagPlaceholder = component.tagTemplate;
      fixture.detectChanges();
      expect(listOfItem[2].textContent?.trim()).toBe('and 2 more selected');
    }));
  });

  describe('default reactive mode', () => {
    let component: TestSelectReactiveDefaultComponent;
    let fixture: ComponentFixture<TestSelectReactiveDefaultComponent>;
    let selectElement!: HTMLElement;

    function flushChanges(): void {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectReactiveDefaultComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });

    it('should ngModel match nzLabel', fakeAsync(() => {
      component.listOfOption = [{ value: 'test_value', label: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = 'test_value';
      flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
      component.listOfOption = [];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));

    it('should ngModelChange trigger when click option', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = 'test_01';
      component.nzOpen = true;
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith('test_02');
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
    }));

    it('should ngModelChange trigger when click clear icon', fakeAsync(() => {
      component.listOfOption = [{ value: 'test_value', label: 'test_label' }];
      component.value = 'test_value';
      flushChanges();
      expect(selectElement.querySelector('nz-select-clear')).toBeFalsy();
      component.nzAllowClear = true;
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('nz-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith(null);
    }));

    it('should call the event emitter nzOnClear when click on te clear icon', fakeAsync(() => {
      component.listOfOption = [{ value: 'test_value', label: 'test_label' }];
      component.value = 'test_value';
      flushChanges();
      expect(selectElement.querySelector('nz-select-clear')).toBeFalsy();
      component.nzAllowClear = true;
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('nz-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.onClear).toHaveBeenCalled();
    }));

    it('should nzCustomTemplate works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = 'value';
      component.nzCustomTemplate = component.customTemplate;
      flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('selected: label');
    }));

    it('should nzShowSearch works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.nzShowSearch = true;
      component.nzOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('test');
      expect(document.querySelectorAll('nz-option-item').length).toBe(2);
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(1);
    }));

    it('should nzFilterOption works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' },
        { value: 'test_03', label: 'test_03' }
      ];
      component.nzShowSearch = true;
      component.nzFilterOption = () => true;
      component.nzOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    }));

    it('should compareWith works', fakeAsync(() => {
      component.listOfOption = [{ value: { value: 'test_value' }, label: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = { value: 'test_value' };
      component.compareWith = (o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
      flushChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent?.trim()).toBe('test_label');
    }));

    it('should nzServerSearch works', fakeAsync(() => {
      component.listOfOption = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' }
      ];
      component.nzServerSearch = true;
      component.nzShowSearch = true;
      component.nzOpen = true;
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    }));

    it('should keydown up arrow and down arrow', fakeAsync(() => {
      component.listOfOption = [
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02', disabled: true },
        { value: 'value_03', label: 'label_03' }
      ];
      component.value = 'value_01';
      component.nzOpen = true;
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', UP_ARROW, inputElement);
      flushChanges();
      expect(document.querySelectorAll('nz-option-item')[2]!.classList).toContain('ant-select-item-option-active');
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      expect(document.querySelectorAll('nz-option-item')[0]!.classList).toContain('ant-select-item-option-active');
      dispatchKeyboardEvent(inputElement, 'keydown', DOWN_ARROW, inputElement);
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', ENTER, inputElement);
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledWith('value_03');
      flushChanges();
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      dispatchKeyboardEvent(inputElement, 'keydown', SPACE, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(true);
      dispatchKeyboardEvent(inputElement, 'keydown', TAB, inputElement);
      flushChanges();
      expect(component.openChange).toHaveBeenCalledWith(false);
      expect(component.openChange).toHaveBeenCalledTimes(3);
    }));

    it('should mouseenter activated option work', fakeAsync(() => {
      component.listOfOption = [
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02', disabled: true },
        { value: 'value_03', label: 'label_03' }
      ];
      component.nzOpen = true;
      flushChanges();
      const targetItem = document.querySelectorAll('nz-option-item')[2]!;
      expect(targetItem.classList).not.toContain('ant-select-item-option-active');
      dispatchFakeEvent(targetItem, 'mouseenter');
      flushChanges();
      expect(targetItem.classList).toContain('ant-select-item-option-active');
    }));

    it('should group item change work', fakeAsync(() => {
      component.listOfOption = [{ groupLabel: 'group-1', value: 'value_01', label: 'label_01' }];
      component.nzOpen = true;
      flushChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(1);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(1);
      component.listOfOption = [
        { value: 'value_01', label: 'label_01', groupLabel: 'group-1' },
        { value: 'value_02', label: 'label_02', groupLabel: 'group-1' },
        { value: 'value_03', label: 'label_03', groupLabel: 'group-2' }
      ];
      flushChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(3);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(2);
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent?.trim()).toBe('group-1');
      expect(document.querySelectorAll('nz-option-item')[0].textContent?.trim()).toBe('label_01');
      component.listOfOption = [{ groupLabel: 'change-group', value: 'value_01', label: 'change-label' }];

      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent?.trim()).toBe('change-group');
      expect(document.querySelectorAll('nz-option-item')[0].textContent?.trim()).toBe('change-label');
    }));

    it('should group item sort be right', fakeAsync(() => {
      component.listOfOption = [
        { value: 'value_01', label: 'label_01', groupLabel: 'group-1' },
        { value: 'value_02', label: 'label_02', groupLabel: 'group-1' },
        { value: 'value_03', label: 'label_03', groupLabel: 'group-2' },
        { value: 'value_04', label: 'label_04', groupLabel: 'group-2' }
      ];
      component.nzOpen = true;
      flushChanges();
      expect(
        document
          .querySelectorAll('nz-option-item')[0]
          .parentElement!.querySelector('nz-option-item')!
          .nextElementSibling!.textContent?.trim()
      ).toBe('label_02');
    }));
  });

  describe('multiple reactive mode', () => {
    let component: TestSelectReactiveMultipleComponent;
    let fixture: ComponentFixture<TestSelectReactiveMultipleComponent>;
    let selectComponent: NzSelectComponent;
    let selectElement!: HTMLElement;
    let overlayContainerElement: HTMLElement;

    function flushChanges(): void {
      fixture.detectChanges();
      flush();
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

    it('should ngModel works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02' }
      ];
      component.value = ['value_01', 'value_02'];
      flushChanges();
      let listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent?.trim()).toBe('label_01');
      expect(listOfSelectItem[1].textContent?.trim()).toBe('label_02');
      component.listOfOption = [{ value: 'value_01', label: 'label_01' }];
      fixture.detectChanges();
      listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent?.trim()).toBe('label_01');
      expect(listOfSelectItem[1].textContent?.trim()).toBe('label_02');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));

    it('should click option work', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = ['test_01'];
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.value.length).toBe(2);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(2);
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
      expect(component.openChange).not.toHaveBeenCalled();
    }));

    it('should compareWith works', fakeAsync(() => {
      component.listOfOption = [{ value: { value: 'value' }, label: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(0);
      component.value = [{ value: 'value' }];
      component.compareWith = (o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
      flushChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(1);
      expect(selectElement.querySelectorAll('nz-select-item')[0].textContent?.trim()).toBe('label');
    }));

    it('should nzMenuItemSelectedIcon works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      component.nzOpen = true;
      flushChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(1);
      component.nzMenuItemSelectedIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(0);
      expect(document.querySelector('.ant-select-item-option-state')!.textContent?.trim()).toBe('icon');
    }));

    it('should removeIcon works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      flushChanges();
      expect(selectElement.querySelector('.anticon-close')).toBeTruthy();
      component.nzRemoveIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-selection-item-remove')!.textContent?.trim()).toBe('icon');
    }));

    it('should removeIcon click works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      flushChanges();
      dispatchFakeEvent(selectElement.querySelector('.anticon-close')!, 'click');
      flushChanges();
      expect(component.value.length).toBe(0);
    }));

    it('should backspace works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', BACKSPACE, inputElement);
      flushChanges();
      expect(component.value.length).toBe(0);
    }));

    it('should nzTokenSeparators work', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));

    it('should nzTokenSeparators + nzMaxMultipleCount work', fakeAsync(() => {
      component.nzMaxMultipleCount = 1;
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,label_02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));

    it('should nzMaxMultipleCount work', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = [];
      component.nzMaxMultipleCount = 1;
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(component.value.length).toBe(1);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
      expect(listOfContainerItem[1]).toHaveClass('ant-select-item-option-disabled');
    }));

    it('should isMaxMultipleCountSet work correct', () => {
      component.nzMaxMultipleCount = Infinity;
      fixture.detectChanges();
      expect(selectComponent.isMaxMultipleCountSet).toBeFalsy();

      component.nzMaxMultipleCount = 1;
      fixture.detectChanges();
      expect(selectComponent.isMaxMultipleCountSet).toBeTruthy();

      component.nzMode = 'default';
      fixture.detectChanges();
      expect(selectComponent.isMaxMultipleCountSet).toBeFalsy();
    });

    it('should isMaxMultipleCountReached be set correctly when click options', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = [];
      component.nzMaxMultipleCount = 1;
      flushChanges();
      expect(selectComponent.isMaxMultipleCountReached).toBeFalsy();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(selectComponent.isMaxMultipleCountReached).toBeTruthy();
    }));

    it('should isMaxMultipleCountReached be set correctly when change the ng model value', fakeAsync(() => {
      const options = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.nzOpen = true;
      component.listOfOption = options;
      component.value = [];
      component.nzMaxMultipleCount = 1;
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      expect(selectComponent.isMaxMultipleCountReached).toBeFalsy();
      selectComponent.writeValue([options[0]]);
      flushChanges();
      expect(selectComponent.isMaxMultipleCountReached).toBeTruthy();
      expect(listOfContainerItem[1]).toHaveClass('ant-select-item-option-disabled');
      selectComponent.writeValue([]);
      flushChanges();
      expect(selectComponent.isMaxMultipleCountReached).toBeFalsy();
      expect(listOfContainerItem[0]).not.toHaveClass('ant-select-item-option-disabled');
      expect(listOfContainerItem[1]).not.toHaveClass('ant-select-item-option-disabled');
    }));

    it('should show nzShowArrow component when nzMaxMultipleCount is not Infinity', () => {
      component.nzMaxMultipleCount = 1;
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-arrow')).toBeTruthy();
    });

    it('should nzAutoClearSearchValue work', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue = false;
      flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(inputElement.value).toBe('test');
    }));

    it('should nzAutoClearSearchValue work when cdkOverlay send emit close', fakeAsync(() => {
      component.nzOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      flushChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushChanges();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue = false;
      flushChanges();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);
      fixture.detectChanges();
      flushChanges();
      fixture.detectChanges();
      expect(inputElement.value).toBe('test');
    }));
  });

  describe('tags reactive mode', () => {
    let component: TestSelectReactiveTagsComponent;
    let fixture: ComponentFixture<TestSelectReactiveTagsComponent>;
    let selectElement!: HTMLElement;

    function flushChanges(): void {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectReactiveTagsComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
      selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });

    it('should nzTokenSeparators works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.value.length).toBe(2);
      expect(component.value[0]).toBe('test_01');
      expect(component.value[1]).toBe('test_02');
    }));

    it('should nzTokenSeparators + nzMaxMultipleCount work', fakeAsync(() => {
      component.nzMaxMultipleCount = 1;
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      flushChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,label_02';
      dispatchFakeEvent(inputElement, 'input');
      flushChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));

    it('should nzMaxTagCount works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' },
        { value: 'test_03', label: 'label_03' },
        { value: 'test_04', label: 'label_04' }
      ];
      component.value = ['test_01', 'test_02', 'test_03', 'test_04'];
      component.nzMaxTagCount = 2;
      flushChanges();
      const listOfItem = selectElement.querySelectorAll('nz-select-item');
      expect(listOfItem.length).toBe(3);
      expect(listOfItem[2].querySelector('.ant-select-selection-item-content')!.textContent?.trim()).toBe('+ 2 ...');
      component.nzMaxTagPlaceholder = component.tagTemplate;
      fixture.detectChanges();
      expect(listOfItem[2].textContent?.trim()).toBe('and 2 more selected');
    }));
  });

  describe('change detection', () => {
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

    it('should not run change detection if the `triggerWidth` has not been changed', fakeAsync(() => {
      const detectChangesSpy = spyOn(selectComponent['cdr'], 'detectChanges').and.callThrough();
      // const requestAnimationFrameSpy = spyOn(window, 'requestAnimationFrame').and.callThrough(); this test is totally unstable, depends upon the order of execution

      component.nzOpen = true;
      fixture.detectChanges();
      // The `requestAnimationFrame` is simulated as `setTimeout(..., 16)` inside the `fakeAsync`.
      tick(16);

      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);
      fixture.detectChanges();
      flush();

      expect(component.nzOpen).toEqual(false);

      component.nzOpen = true;
      fixture.detectChanges();
      tick(16);

      // Ensure that the `detectChanges()` have been called only once since the `triggerWidth` hasn't been changed.
      expect(detectChangesSpy).toHaveBeenCalledTimes(1);
      // expect(requestAnimationFrameSpy).toHaveBeenCalledTimes(2);
    }));

    it('should not run change detection when `nz-select-top-control` is clicked and should focus the `nz-select-search`', () => {
      const appRef = TestBed.inject(ApplicationRef);
      spyOn(appRef, 'tick');

      const nzSelectSearch = fixture.debugElement.query(By.directive(NzSelectSearchComponent));
      spyOn(nzSelectSearch.componentInstance, 'focus');

      const nzSelectTopControl = fixture.debugElement.query(By.directive(NzSelectTopControlComponent));
      dispatchMouseEvent(nzSelectTopControl.nativeElement, 'click');

      expect(appRef.tick).toHaveBeenCalledTimes(0);
      expect(nzSelectSearch.componentInstance.focus).toHaveBeenCalled();
    });

    it('should not run change detection when non-backspace button is pressed on the `nz-select-top-control`', () => {
      const appRef = TestBed.inject(ApplicationRef);
      spyOn(appRef, 'tick');

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

      component.status = 'warning';
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-status-warning');

      component.status = '';
      fixture.detectChanges();
      expect(selectElement.classList).not.toContain('ant-select-status-warning');
    });
  });

  describe('in form', () => {
    let component: TestSelectInFormComponent;
    let fixture: ComponentFixture<TestSelectInFormComponent>;

    function flushChanges(): void {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(TestSelectInFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should classname correct and be disable initially', () => {
      const selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;

      expect(inputElement.disabled).toBeFalsy();
      expect(selectElement.classList).not.toContain('ant-select-disabled');
      expect(selectElement.classList).toContain('ant-select-status-error');
      expect(selectElement.classList).toContain('ant-select-in-form-item');
      expect(selectElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();

      component.status = 'warning';
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-status-warning');

      component.status = 'success';
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-status-success');

      component.feedback = false;
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-form-item-feedback-icon')).toBeNull();
    });

    it('should be disable by default even if form is enable', fakeAsync(() => {
      component.disabled = true;
      flushChanges();
      const selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(inputElement.disabled).toBeTruthy();
      expect(selectElement.classList).toContain('ant-select-disabled');
    }));

    it('should be disable if form is disabled and nzDisabled set to false', fakeAsync(() => {
      component.disable();
      flushChanges();
      const selectElement = fixture.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
      const inputElement = fixture.debugElement.query(By.css('input')).nativeElement as HTMLInputElement;
      expect(inputElement.disabled).toBeTruthy();
      expect(selectElement.classList).toContain('ant-select-disabled');
    }));
  });

  describe('placement', () => {
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

    it('should nzPlacement work', fakeAsync(() => {
      component.nzOpen = true;
      fixture.detectChanges();
      let element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);
      component.nzOpen = false;
      component.nzPlacement = 'bottomRight';
      fixture.detectChanges();
      component.nzOpen = true;
      tick();
      fixture.detectChanges();
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);
      component.nzOpen = false;
      component.nzPlacement = 'topLeft';
      fixture.detectChanges();
      component.nzOpen = true;
      tick();
      fixture.detectChanges();
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);
      component.nzOpen = false;
      component.nzPlacement = 'topRight';
      fixture.detectChanges();
      component.nzOpen = true;
      tick();
      fixture.detectChanges();
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(true);
      component.nzOpen = false;
      fixture.detectChanges();
      flush();
    }));
  });
});

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="default"
      [(ngModel)]="value"
      [nzSize]="nzSize"
      [nzDropdownMatchSelectWidth]="nzDropdownMatchSelectWidth"
      [nzPlaceHolder]="nzPlaceHolder"
      [nzDropdownRender]="nzDropdownRender"
      [nzCustomTemplate]="nzCustomTemplate ?? null"
      [nzPrefix]="nzPrefix"
      [nzSuffixIcon]="nzSuffixIcon"
      [nzClearIcon]="nzClearIcon"
      [nzShowArrow]="nzShowArrow"
      [nzFilterOption]="nzFilterOption"
      [compareWith]="compareWith"
      [nzAllowClear]="nzAllowClear"
      [nzBorderless]="nzBorderless"
      [nzVariant]="nzVariant"
      [nzShowSearch]="nzShowSearch"
      [nzLoading]="nzLoading"
      [nzAutoFocus]="nzAutoFocus"
      [nzServerSearch]="nzServerSearch"
      [nzDisabled]="nzDisabled"
      [nzBackdrop]="nzBackdrop"
      [(nzOpen)]="nzOpen"
      [nzPlacement]="nzPlacement"
      [nzSelectOnTab]="nzSelectOnTab"
      [nzMaxMultipleCount]="nzMaxMultipleCount"
      (ngModelChange)="valueChange($event)"
      (nzOnSearch)="searchValueChange($event)"
      (nzOpenChange)="openChange($event)"
    >
      @for (o of listOfOption; track o) {
        <nz-option
          [nzValue]="o.nzValue"
          [nzLabel]="o.nzLabel"
          [nzTitle]="o.nzTitle"
          [nzDisabled]="o.nzDisabled"
          [nzHide]="o.nzHide"
        />
      }
      @for (group of listOfGroup; track group) {
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
  value: NzSafeAny | null = null;
  valueChange = jasmine.createSpy<NzSafeAny>('valueChange');
  openChange = jasmine.createSpy<NzSafeAny>('openChange');
  searchValueChange = jasmine.createSpy<NzSafeAny>('searchValueChange');
  listOfGroup: Array<{ nzLabel: string | TemplateRef<NzSafeAny> | null; children: NzSelectItemInterface[] }> = [];
  listOfOption: NzSelectItemInterface[] = [];
  nzSize: NzSelectSizeType = 'default';
  nzDropdownMatchSelectWidth = true;
  nzPlaceHolder: string | TemplateRef<NzSafeAny> | null = null;
  nzDropdownRender: TemplateRef<NzSafeAny> | null = null;
  nzCustomTemplate?: TemplateRef<{ $implicit: NzSelectItemInterface }>;
  nzPrefix: string | TemplateRef<NzSafeAny> | null = null;
  nzSuffixIcon: string | TemplateRef<NzSafeAny> | null = null;
  nzClearIcon: TemplateRef<NzSafeAny> | null = null;
  nzShowArrow = true;
  nzMaxMultipleCount: number = Infinity;
  nzFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
    if (item && item.nzLabel) {
      return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    } else {
      return false;
    }
  };
  compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  nzAllowClear = false;
  nzBorderless = false;
  nzVariant: NzVariant = 'outlined';
  nzShowSearch = false;
  nzLoading = false;
  nzAutoFocus = false;
  nzServerSearch = false;
  nzDisabled = false;
  nzOpen = false;
  nzBackdrop = false;
  nzSelectOnTab = false;
  nzPlacement: NzSelectPlacementType | null = 'bottomLeft';
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="multiple"
      [(ngModel)]="value"
      [nzMenuItemSelectedIcon]="nzMenuItemSelectedIcon"
      [nzTokenSeparators]="nzTokenSeparators"
      [nzRemoveIcon]="nzRemoveIcon"
      [nzMaxMultipleCount]="nzMaxMultipleCount"
      [compareWith]="compareWith"
      [nzAutoClearSearchValue]="nzAutoClearSearchValue"
      [(nzOpen)]="nzOpen"
      (ngModelChange)="valueChange($event)"
      (nzOpenChange)="valueChange($event)"
    >
      @for (o of listOfOption; track o) {
        <nz-option [nzValue]="o.nzValue" [nzLabel]="o.nzLabel" [nzDisabled]="o.nzDisabled" [nzHide]="o.nzHide" />
      }
    </nz-select>
    <ng-template #iconTemplate>icon</ng-template>
  `
})
export class TestSelectTemplateMultipleComponent {
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<NzSafeAny>;
  listOfOption: NzSelectItemInterface[] = [];
  value: NzSafeAny[] = [];
  nzOpen = false;
  valueChange = jasmine.createSpy<NzSafeAny>('valueChange');
  openChange = jasmine.createSpy<NzSafeAny>('openChange');
  nzMenuItemSelectedIcon: TemplateRef<NzSafeAny> | null = null;
  nzRemoveIcon: TemplateRef<NzSafeAny> | null = null;
  nzTokenSeparators: string[] = [];
  nzMaxMultipleCount = Infinity;
  compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  nzAutoClearSearchValue = true;
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="tags"
      [(ngModel)]="value"
      [nzSize]="nzSize"
      [nzMaxTagCount]="nzMaxTagCount"
      [nzTokenSeparators]="nzTokenSeparators"
      [nzMaxTagPlaceholder]="nzMaxTagPlaceholder"
      (ngModelChange)="valueChange($event)"
    >
      @for (o of listOfOption; track o) {
        <nz-option [nzValue]="o.nzValue" [nzLabel]="o.nzLabel" [nzDisabled]="o.nzDisabled" [nzHide]="o.nzHide" />
      }
    </nz-select>
    <ng-template #tagTemplate let-selectedList>and {{ selectedList.length }} more selected</ng-template>
  `
})
export class TestSelectTemplateTagsComponent {
  @ViewChild('tagTemplate') tagTemplate!: TemplateRef<NzSafeAny>;
  nzSize: NzSelectSizeType = 'default';
  nzMaxTagCount = Infinity;
  value: NzSafeAny[] = [];
  listOfOption: NzSelectItemInterface[] = [];
  valueChange = jasmine.createSpy('valueChange');
  nzTokenSeparators: string[] = [];
  nzMaxTagPlaceholder!: TemplateRef<{ $implicit: NzSafeAny[] }>;
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="default"
      [(ngModel)]="value"
      [nzOptions]="listOfOption"
      [nzSize]="nzSize"
      [nzDropdownMatchSelectWidth]="nzDropdownMatchSelectWidth"
      [nzPlaceHolder]="nzPlaceHolder"
      [nzDropdownRender]="nzDropdownRender"
      [nzCustomTemplate]="nzCustomTemplate ?? null"
      [nzSuffixIcon]="nzSuffixIcon"
      [nzClearIcon]="nzClearIcon"
      [nzShowArrow]="nzShowArrow"
      [nzFilterOption]="nzFilterOption"
      [compareWith]="compareWith"
      [nzAllowClear]="nzAllowClear"
      [nzBorderless]="nzBorderless"
      [nzShowSearch]="nzShowSearch"
      [nzLoading]="nzLoading"
      [nzAutoFocus]="nzAutoFocus"
      [nzServerSearch]="nzServerSearch"
      [nzDisabled]="nzDisabled"
      [(nzOpen)]="nzOpen"
      (ngModelChange)="valueChange($event)"
      (nzOnSearch)="searchValueChange($event)"
      (nzOpenChange)="openChange($event)"
      (nzOnClear)="onClear()"
    />
    <ng-template #dropdownTemplate><div class="dropdown-render">dropdownRender</div></ng-template>
    <ng-template #customTemplate let-selected>selected: {{ selected.nzLabel }}</ng-template>
    <ng-template #suffixIconTemplate>icon</ng-template>
  `
})
export class TestSelectReactiveDefaultComponent {
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('customTemplate') customTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('suffixIconTemplate') suffixIconTemplate!: TemplateRef<NzSafeAny>;
  value: NzSafeAny | null = null;
  valueChange = jasmine.createSpy<NzSafeAny>('valueChange');
  openChange = jasmine.createSpy<NzSafeAny>('openChange');

  onClear = jasmine.createSpy<NzSafeAny>('onClear');
  searchValueChange = jasmine.createSpy<NzSafeAny>('searchValueChange');
  listOfOption: NzSelectOptionInterface[] = [];
  nzSize: NzSelectSizeType = 'default';
  nzDropdownMatchSelectWidth = true;
  nzPlaceHolder: string | TemplateRef<NzSafeAny> | null = null;
  nzDropdownRender: TemplateRef<NzSafeAny> | null = null;
  nzCustomTemplate?: TemplateRef<{ $implicit: NzSelectItemInterface }>;
  nzSuffixIcon: TemplateRef<NzSafeAny> | null = null;
  nzClearIcon: TemplateRef<NzSafeAny> | null = null;
  nzShowArrow = true;
  nzFilterOption: NzFilterOptionType = (searchValue: string, item: NzSelectItemInterface): boolean => {
    if (item && item.nzLabel) {
      return item.nzLabel.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
    } else {
      return false;
    }
  };
  compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  nzAllowClear = false;
  nzBorderless = false;
  nzShowSearch = false;
  nzLoading = false;
  nzAutoFocus = false;
  nzServerSearch = false;
  nzDisabled = false;
  nzOpen = false;
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      [nzMode]="nzMode"
      [(ngModel)]="value"
      [nzOptions]="listOfOption"
      [nzMenuItemSelectedIcon]="nzMenuItemSelectedIcon"
      [nzTokenSeparators]="nzTokenSeparators"
      [nzRemoveIcon]="nzRemoveIcon"
      [nzMaxMultipleCount]="nzMaxMultipleCount"
      [compareWith]="compareWith"
      [nzAutoClearSearchValue]="nzAutoClearSearchValue"
      [(nzOpen)]="nzOpen"
      (ngModelChange)="valueChange($event)"
      (nzOpenChange)="valueChange($event)"
    />
    <ng-template #iconTemplate>icon</ng-template>
  `
})
export class TestSelectReactiveMultipleComponent {
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<NzSafeAny>;
  listOfOption: NzSelectOptionInterface[] = [];
  value: NzSafeAny[] = [];
  nzOpen = false;
  valueChange = jasmine.createSpy('valueChange');
  openChange = jasmine.createSpy('openChange');
  nzMenuItemSelectedIcon: TemplateRef<NzSafeAny> | null = null;
  nzRemoveIcon: TemplateRef<NzSafeAny> | null = null;
  nzTokenSeparators: string[] = [];
  nzMaxMultipleCount = Infinity;
  nzMode: NzSelectModeType = 'multiple';
  compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  nzAutoClearSearchValue = true;
}

@Component({
  imports: [FormsModule, NzSelectModule],
  template: `
    <nz-select
      nzMode="tags"
      [(ngModel)]="value"
      [nzOptions]="listOfOption"
      [nzSize]="nzSize"
      [nzMaxTagCount]="nzMaxTagCount"
      [nzMaxMultipleCount]="nzMaxMultipleCount"
      [nzTokenSeparators]="nzTokenSeparators"
      [nzMaxTagPlaceholder]="nzMaxTagPlaceholder ?? null"
      (ngModelChange)="valueChange($event)"
    />
    <ng-template #tagTemplate let-selectedList>and {{ selectedList.length }} more selected</ng-template>
  `
})
export class TestSelectReactiveTagsComponent {
  @ViewChild('tagTemplate') tagTemplate?: TemplateRef<NzSafeAny>;
  nzSize: NzSelectSizeType = 'default';
  nzMaxTagCount = Infinity;
  value: NzSafeAny[] = [];
  listOfOption: NzSelectOptionInterface[] = [];
  valueChange = jasmine.createSpy('valueChange');
  nzTokenSeparators: string[] = [];
  nzMaxTagPlaceholder?: TemplateRef<NzSafeAny>;
  nzMaxMultipleCount?: number;
}

@Component({
  imports: [NzSelectModule],
  template: `<nz-select [nzStatus]="status" />`
})
export class TestSelectStatusComponent {
  status: NzStatus = 'error';
}

@Component({
  imports: [ReactiveFormsModule, NzFormModule, NzSelectModule],
  template: `
    <form nz-form [formGroup]="selectForm">
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback" [nzValidateStatus]="status">
          <nz-select formControlName="selectControl" [nzOptions]="[]" [nzDisabled]="disabled" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class TestSelectInFormComponent {
  selectForm = new FormGroup({
    selectControl: new FormControl(null)
  });
  status: NzFormControlStatusType = 'error';
  feedback = true;

  disabled = false;

  disable(): void {
    this.selectForm.disable();
  }

  enable(): void {
    this.selectForm.enable();
  }
}
