import { BACKSPACE, DOWN_ARROW, ENTER, ESCAPE, SPACE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  ɵComponentBed as ComponentBed,
  ɵcreateComponentBed as createComponentBed
} from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzSelectComponent, NzSelectSizeType } from './select.component';
import { NzSelectModule } from './select.module';
import { NzFilterOptionType, NzSelectItemInterface, NzSelectOptionInterface } from './select.types';

describe('select', () => {
  describe('default template mode', () => {
    let testBed: ComponentBed<TestSelectTemplateDefaultComponent>;
    let component: TestSelectTemplateDefaultComponent;
    let fixture: ComponentFixture<TestSelectTemplateDefaultComponent>;
    let selectElement!: HTMLElement;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      testBed = createComponentBed(TestSelectTemplateDefaultComponent, { imports: [NzSelectModule, NzIconTestModule, FormsModule] });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
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
      expect(selectElement.querySelector('.ant-select-selection-placeholder')!.textContent).toContain('placeholder');
    });
    it('should nzDropdownRender work', () => {
      component.nzOpen = true;
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-render').length).toBe(0);
      component.nzDropdownRender = component.dropdownTemplate;
      fixture.detectChanges();
      expect(document.getElementsByClassName('dropdown-render')[0]!.textContent).toBe('dropdownRender');
    });
    it('should ngModel match nzLabel', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'test_value', nzLabel: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = 'test_value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent).toBe('test_label');
      component.listOfOption = [];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent).toBe('test_label');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));
    it('should ngModelChange trigger when click option', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      component.value = 'test_01';
      component.nzOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith('test_02');
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
    }));
    it('should ngModelChange trigger when click clear icon', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'test_value', nzLabel: 'test_label' }];
      component.value = 'test_value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent).toBe('selected: label');
    }));
    it('should nzShowArrow works', () => {
      expect(selectElement.querySelector('nz-select-arrow')).toBeTruthy();
      component.nzShowArrow = false;
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-arrow')).toBeFalsy();
    });
    it('should nzSuffixIcon works', () => {
      expect(selectElement.querySelector('.anticon-down')).toBeTruthy();
      component.nzSuffixIcon = component.suffixIconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-arrow')!.textContent).toBe('icon');
    });
    it('should nzClearIcon works', fakeAsync(() => {
      component.nzAllowClear = true;
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = 'value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('.anticon-close-circle')).toBeTruthy();
      component.nzClearIcon = component.suffixIconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-clear')!.textContent).toBe('icon');
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('test');
      expect(document.querySelectorAll('nz-option-item').length).toBe(2);
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
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
      expect(selectElement.querySelector('nz-select-item')!.textContent).toBe('test_label');
    }));
    it('should nzBorderless works', () => {
      expect(selectElement.classList).not.toContain('ant-select-borderless');
      component.nzBorderless = true;
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-borderless');
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    }));
    it('should nzDisabled works', fakeAsync(() => {
      component.nzDisabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.classList).toContain('ant-select-disabled');
      expect(selectElement.querySelector('input')!.getAttribute('disabled')).toBe('');
    }));

    it('should close dropdown when ESC keydown', fakeAsync(() => {
      component.nzOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      dispatchKeyboardEvent(overlayContainerElement, 'keydown', ESCAPE, overlayContainerElement);

      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(component.nzOpen).toBe(false);
    }));

    it('should keydown up arrow and down arrow', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
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
    it('should mouseenter activated option work', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(3);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(2);
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent).toBe('group-1');
      expect(document.querySelectorAll('nz-option-item')[0].textContent).toBe('label_01');
      component.listOfGroup[0].nzLabel = 'change-group';
      component.listOfGroup[0].children[0].nzLabel = 'change-label';
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent).toBe('change-group');
      expect(document.querySelectorAll('nz-option-item')[0].textContent).toBe('change-label');
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(
        document.querySelectorAll('nz-option-item')[0].parentElement!.querySelector('nz-option-item')!.nextElementSibling!.textContent
      ).toBe('label_02');
    }));

    it('should have selected class if item was selected', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
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
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected')[0].textContent).toBe('Falsy value');
      component.value = 'Truthy value';
      flushChanges();
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected').length).toBe(1);
      expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected')[0].textContent).toBe('Truthy value');
      ['disabled', undefined, null].forEach(value => {
        component.value = value;
        flushChanges();
        expect(document.querySelectorAll('nz-option-item.ant-select-item-option-selected').length).toBe(0);
      });
    }));
  });
  describe('multiple template mode', () => {
    let testBed: ComponentBed<TestSelectTemplateMultipleComponent>;
    let component: TestSelectTemplateMultipleComponent;
    let fixture: ComponentFixture<TestSelectTemplateMultipleComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectTemplateMultipleComponent, { imports: [NzSelectModule, NzIconTestModule, FormsModule] });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      let listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent).toBe('label_01');
      expect(listOfSelectItem[1].textContent).toBe('label_02');
      component.listOfOption = [{ nzValue: 'value_01', nzLabel: 'label_01' }];
      fixture.detectChanges();
      listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent).toBe('label_01');
      expect(listOfSelectItem[1].textContent).toBe('label_02');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));
    it('should click option work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.nzOpen = true;
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      component.value = ['test_01'];
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.value.length).toBe(2);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(1);
      expect(selectElement.querySelectorAll('nz-select-item')[0].textContent).toBe('label');
    }));
    it('should nzMenuItemSelectedIcon works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = ['value'];
      component.nzOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(1);
      component.nzMenuItemSelectedIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(0);
      expect(document.querySelector('.ant-select-item-option-state')!.textContent).toBe('icon');
    }));
    it('should removeIcon works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('.anticon-close')).toBeTruthy();
      component.nzRemoveIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-selection-item-remove')!.textContent).toBe('icon');
    }));
    it('should removeIcon click works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      dispatchFakeEvent(selectElement.querySelector('.anticon-close')!, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(0);
    }));
    it('should backspace works', fakeAsync(() => {
      component.listOfOption = [{ nzValue: 'value', nzLabel: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', BACKSPACE, inputElement);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(0);
    }));
    it('should nzTokenSeparators work', fakeAsync(() => {
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'label_01' },
        { nzValue: 'test_02', nzLabel: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));
    it('should nzMaxMultipleCount work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.nzOpen = true;
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      component.value = [];
      component.nzMaxMultipleCount = 1;
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(component.value.length).toBe(1);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));
    it('should nzAutoClearSearchValue work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.nzOpen = true;
      component.listOfOption = [
        { nzValue: 'test_01', nzLabel: 'test_01' },
        { nzValue: 'test_02', nzLabel: 'test_02' }
      ];
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue = false;
      flushRefresh();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(inputElement.value).toBe('test');
    }));
  });
  describe('tags template mode', () => {
    let testBed: ComponentBed<TestSelectTemplateTagsComponent>;
    let component: TestSelectTemplateTagsComponent;
    let fixture: ComponentFixture<TestSelectTemplateTagsComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectTemplateTagsComponent, { imports: [NzSelectModule, NzIconTestModule, FormsModule] });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const listOfItem = selectElement.querySelectorAll('nz-select-item');
      expect(listOfItem.length).toBe(3);
      expect(listOfItem[2].querySelector('.ant-select-selection-item-content')!.textContent).toBe('+ 2 ...');
      component.nzMaxTagPlaceholder = component.tagTemplate;
      fixture.detectChanges();
      expect(listOfItem[2].textContent).toBe('and 2 more selected');
    }));
  });
  describe('default reactive mode', () => {
    let testBed: ComponentBed<TestSelectReactiveDefaultComponent>;
    let component: TestSelectReactiveDefaultComponent;
    let fixture: ComponentFixture<TestSelectReactiveDefaultComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectReactiveDefaultComponent, { imports: [NzSelectModule, NzIconTestModule, FormsModule] });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });
    it('should ngModel match nzLabel', fakeAsync(() => {
      component.listOfOption = [{ value: 'test_value', label: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = 'test_value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent).toBe('test_label');
      component.listOfOption = [];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent).toBe('test_label');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));
    it('should ngModelChange trigger when click option', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = 'test_01';
      component.nzOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith('test_02');
      expect(component.openChange).toHaveBeenCalledTimes(1);
      expect(component.openChange).toHaveBeenCalledWith(false);
    }));
    it('should ngModelChange trigger when click clear icon', fakeAsync(() => {
      component.listOfOption = [{ value: 'test_value', label: 'test_label' }];
      component.value = 'test_value';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-clear')).toBeFalsy();
      component.nzAllowClear = true;
      fixture.detectChanges();
      dispatchMouseEvent(selectElement.querySelector('nz-select-clear')!, 'click');
      fixture.detectChanges();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.valueChange).toHaveBeenCalledWith(null);
    }));
    it('should nzCustomTemplate works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = 'value';
      component.nzCustomTemplate = component.customTemplate;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent).toBe('selected: label');
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.searchValueChange).toHaveBeenCalledWith('test');
      expect(document.querySelectorAll('nz-option-item').length).toBe(2);
      inputElement.value = '02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    }));
    it('should compareWith works', fakeAsync(() => {
      component.listOfOption = [{ value: { value: 'test_value' }, label: 'test_label' }];
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')).toBeFalsy();
      component.value = { value: 'test_value' };
      component.compareWith = (o1: NzSafeAny, o2: NzSafeAny) => (o1 && o2 ? o1.value === o2.value : o1 === o2);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('nz-select-item')!.textContent).toBe('test_label');
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item').length).toBe(3);
    }));
    it('should keydown up arrow and down arrow', fakeAsync(() => {
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
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
      const flushChanges = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(1);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(1);
      component.listOfOption = [
        { value: 'value_01', label: 'label_01', groupLabel: 'group-1' },
        { value: 'value_02', label: 'label_02', groupLabel: 'group-1' },
        { value: 'value_03', label: 'label_03', groupLabel: 'group-2' }
      ];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item')!.length).toBe(3);
      expect(document.querySelectorAll('nz-option-item-group')!.length).toBe(2);
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent).toBe('group-1');
      expect(document.querySelectorAll('nz-option-item')[0].textContent).toBe('label_01');
      component.listOfOption = [{ groupLabel: 'change-group', value: 'value_01', label: 'change-label' }];

      fixture.detectChanges();
      expect(document.querySelectorAll('nz-option-item-group')[0]!.textContent).toBe('change-group');
      expect(document.querySelectorAll('nz-option-item')[0].textContent).toBe('change-label');
    }));

    it('should group item sort be right', fakeAsync(() => {
      component.listOfOption = [
        { value: 'value_01', label: 'label_01', groupLabel: 'group-1' },
        { value: 'value_02', label: 'label_02', groupLabel: 'group-1' },
        { value: 'value_03', label: 'label_03', groupLabel: 'group-2' },
        { value: 'value_04', label: 'label_04', groupLabel: 'group-2' }
      ];
      component.nzOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(
        document.querySelectorAll('nz-option-item')[0].parentElement!.querySelector('nz-option-item')!.nextElementSibling!.textContent
      ).toBe('label_02');
    }));
  });
  describe('multiple reactive mode', () => {
    let testBed: ComponentBed<TestSelectReactiveMultipleComponent>;
    let component: TestSelectReactiveMultipleComponent;
    let fixture: ComponentFixture<TestSelectReactiveMultipleComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectReactiveMultipleComponent, { imports: [NzSelectModule, NzIconTestModule, FormsModule] });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });
    it('should ngModel works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'value_01', label: 'label_01' },
        { value: 'value_02', label: 'label_02' }
      ];
      component.value = ['value_01', 'value_02'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      let listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent).toBe('label_01');
      expect(listOfSelectItem[1].textContent).toBe('label_02');
      component.listOfOption = [{ value: 'value_01', label: 'label_01' }];
      fixture.detectChanges();
      listOfSelectItem = selectElement.querySelectorAll('nz-select-item')!;
      expect(listOfSelectItem.length).toBe(2);
      expect(listOfSelectItem[0].textContent).toBe('label_01');
      expect(listOfSelectItem[1].textContent).toBe('label_02');
      expect(component.valueChange).not.toHaveBeenCalled();
    }));
    it('should click option work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.nzOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = ['test_01'];
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.valueChange).toHaveBeenCalledTimes(1);
      expect(component.value.length).toBe(2);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelectorAll('nz-select-item').length).toBe(1);
      expect(selectElement.querySelectorAll('nz-select-item')[0].textContent).toBe('label');
    }));
    it('should nzMenuItemSelectedIcon works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      component.nzOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(1);
      component.nzMenuItemSelectedIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(document.querySelectorAll('.ant-select-selected-icon').length).toBe(0);
      expect(document.querySelector('.ant-select-item-option-state')!.textContent).toBe('icon');
    }));
    it('should removeIcon works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectElement.querySelector('.anticon-close')).toBeTruthy();
      component.nzRemoveIcon = component.iconTemplate;
      fixture.detectChanges();
      expect(selectElement.querySelector('.ant-select-selection-item-remove')!.textContent).toBe('icon');
    }));
    it('should removeIcon click works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      dispatchFakeEvent(selectElement.querySelector('.anticon-close')!, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(0);
    }));
    it('should backspace works', fakeAsync(() => {
      component.listOfOption = [{ value: 'value', label: 'label' }];
      component.value = ['value'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      dispatchKeyboardEvent(inputElement, 'keydown', BACKSPACE, inputElement);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(0);
    }));
    it('should nzTokenSeparators work', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));
    it('should nzMaxMultipleCount work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.nzOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      component.value = [];
      component.nzMaxMultipleCount = 1;
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(component.value.length).toBe(1);
      dispatchMouseEvent(listOfContainerItem[1], 'click');
      flushRefresh();
      expect(component.value.length).toBe(1);
      expect(component.value[0]).toBe('test_01');
    }));
    it('should nzAutoClearSearchValue work', fakeAsync(() => {
      const flushRefresh = () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      };
      component.nzOpen = true;
      component.listOfOption = [
        { value: 'test_01', label: 'test_01' },
        { value: 'test_02', label: 'test_02' }
      ];
      flushRefresh();
      const listOfContainerItem = document.querySelectorAll('nz-option-item');
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(inputElement.value).toBe('');
      component.nzAutoClearSearchValue = false;
      flushRefresh();
      inputElement.value = 'test';
      dispatchFakeEvent(inputElement, 'input');
      dispatchMouseEvent(listOfContainerItem[0], 'click');
      flushRefresh();
      expect(inputElement.value).toBe('test');
    }));
  });
  describe('tags reactive mode', () => {
    let testBed: ComponentBed<TestSelectReactiveTagsComponent>;
    let component: TestSelectReactiveTagsComponent;
    let fixture: ComponentFixture<TestSelectReactiveTagsComponent>;
    let selectElement!: HTMLElement;
    beforeEach(() => {
      testBed = createComponentBed(TestSelectReactiveTagsComponent, { imports: [NzSelectModule, NzIconTestModule, FormsModule] });
      component = testBed.component;
      fixture = testBed.fixture;
      selectElement = testBed.debugElement.query(By.directive(NzSelectComponent)).nativeElement;
    });
    it('should nzTokenSeparators works', fakeAsync(() => {
      component.listOfOption = [
        { value: 'test_01', label: 'label_01' },
        { value: 'test_02', label: 'label_02' }
      ];
      component.value = [];
      component.nzTokenSeparators = [','];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const inputElement = selectElement.querySelector('input')!;
      inputElement.value = 'label_01,test_02';
      dispatchFakeEvent(inputElement, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(component.value.length).toBe(2);
      expect(component.value[0]).toBe('test_01');
      expect(component.value[1]).toBe('test_02');
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
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const listOfItem = selectElement.querySelectorAll('nz-select-item');
      expect(listOfItem.length).toBe(3);
      expect(listOfItem[2].querySelector('.ant-select-selection-item-content')!.textContent).toBe('+ 2 ...');
      component.nzMaxTagPlaceholder = component.tagTemplate;
      fixture.detectChanges();
      expect(listOfItem[2].textContent).toBe('and 2 more selected');
    }));
  });
});

@Component({
  template: `
    <nz-select
      nzMode="default"
      [(ngModel)]="value"
      [nzSize]="nzSize"
      [nzDropdownMatchSelectWidth]="nzDropdownMatchSelectWidth"
      [nzPlaceHolder]="nzPlaceHolder"
      [nzDropdownRender]="nzDropdownRender"
      [nzCustomTemplate]="nzCustomTemplate"
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
    >
      <nz-option
        *ngFor="let o of listOfOption"
        [nzValue]="o.nzValue"
        [nzLabel]="o.nzLabel"
        [nzDisabled]="o.nzDisabled"
        [nzHide]="o.nzHide"
      ></nz-option>
      <nz-option-group *ngFor="let group of listOfGroup" [nzLabel]="group.nzLabel">
        <nz-option
          *ngFor="let o of group.children"
          [nzValue]="o.nzValue"
          [nzLabel]="o.nzLabel"
          [nzDisabled]="o.nzDisabled"
          [nzHide]="o.nzHide"
        ></nz-option>
      </nz-option-group>
    </nz-select>
    <ng-template #dropdownTemplate><div class="dropdown-render">dropdownRender</div></ng-template>
    <ng-template #customTemplate let-selected>selected: {{ selected.nzLabel }}</ng-template>
    <ng-template #suffixIconTemplate>icon</ng-template>
  `
})
export class TestSelectTemplateDefaultComponent {
  @ViewChild('dropdownTemplate') dropdownTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('customTemplate') customTemplate!: TemplateRef<NzSafeAny>;
  @ViewChild('suffixIconTemplate') suffixIconTemplate!: TemplateRef<NzSafeAny>;
  value: NzSafeAny | null = null;
  valueChange = jasmine.createSpy('valueChange');
  openChange = jasmine.createSpy('openChange');
  searchValueChange = jasmine.createSpy('searchValueChange');
  listOfGroup: Array<{ nzLabel: string | TemplateRef<NzSafeAny> | null; children: NzSelectItemInterface[] }> = [];
  listOfOption: NzSelectItemInterface[] = [];
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
      return item.nzLabel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
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
      <nz-option
        *ngFor="let o of listOfOption"
        [nzValue]="o.nzValue"
        [nzLabel]="o.nzLabel"
        [nzDisabled]="o.nzDisabled"
        [nzHide]="o.nzHide"
      ></nz-option>
    </nz-select>
    <ng-template #iconTemplate>icon</ng-template>
  `
})
export class TestSelectTemplateMultipleComponent {
  @ViewChild('iconTemplate') iconTemplate!: TemplateRef<NzSafeAny>;
  listOfOption: NzSelectItemInterface[] = [];
  value: NzSafeAny[] = [];
  nzOpen = false;
  valueChange = jasmine.createSpy('valueChange');
  openChange = jasmine.createSpy('openChange');
  nzMenuItemSelectedIcon: TemplateRef<NzSafeAny> | null = null;
  nzRemoveIcon: TemplateRef<NzSafeAny> | null = null;
  nzTokenSeparators: string[] = [];
  nzMaxMultipleCount = Infinity;
  compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  nzAutoClearSearchValue = true;
}

@Component({
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
      <nz-option
        *ngFor="let o of listOfOption"
        [nzValue]="o.nzValue"
        [nzLabel]="o.nzLabel"
        [nzDisabled]="o.nzDisabled"
        [nzHide]="o.nzHide"
      ></nz-option>
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
  template: `
    <nz-select
      nzMode="default"
      [(ngModel)]="value"
      [nzOptions]="listOfOption"
      [nzSize]="nzSize"
      [nzDropdownMatchSelectWidth]="nzDropdownMatchSelectWidth"
      [nzPlaceHolder]="nzPlaceHolder"
      [nzDropdownRender]="nzDropdownRender"
      [nzCustomTemplate]="nzCustomTemplate"
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
    ></nz-select>
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
  valueChange = jasmine.createSpy('valueChange');
  openChange = jasmine.createSpy('openChange');
  searchValueChange = jasmine.createSpy('searchValueChange');
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
      return item.nzLabel.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
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
  template: `
    <nz-select
      nzMode="multiple"
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
    ></nz-select>
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
  compareWith: (o1: NzSafeAny, o2: NzSafeAny) => boolean = (o1: NzSafeAny, o2: NzSafeAny) => o1 === o2;
  nzAutoClearSearchValue = true;
}

@Component({
  template: `
    <nz-select
      nzMode="tags"
      [(ngModel)]="value"
      [nzOptions]="listOfOption"
      [nzSize]="nzSize"
      [nzMaxTagCount]="nzMaxTagCount"
      [nzTokenSeparators]="nzTokenSeparators"
      [nzMaxTagPlaceholder]="nzMaxTagPlaceholder"
      (ngModelChange)="valueChange($event)"
    ></nz-select>
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
  nzMaxTagPlaceholder?: TemplateRef<{ $implicit: NzSafeAny[] }>;
}
