/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import {
  COMMA,
  DELETE,
  DOWN_ARROW,
  END,
  ENTER,
  ESCAPE,
  HOME,
  LEFT_ARROW,
  NINE,
  PAGE_DOWN,
  PAGE_UP,
  RIGHT_ARROW,
  SPACE,
  TAB,
  UP_ARROW,
  ZERO
} from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, inject, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject as testingInject, TestBed, tick } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzDemoCascaderMultipleComponent } from 'ng-zorro-antd/cascader/demo/multiple';
import {
  createFakeEvent,
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent
} from 'ng-zorro-antd/core/testing';
import { NzSafeAny, NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzSelectItemComponent } from 'ng-zorro-antd/select';

import { NzCascaderComponent } from './cascader.component';
import { NzCascaderModule } from './cascader.module';
import {
  NzCascaderExpandTrigger,
  NzCascaderOption,
  NzCascaderPlacement,
  NzCascaderSize,
  NzCascaderTriggerType,
  NzShowSearchOptions
} from './typings';

describe('cascader', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  function getItemAtColumnAndRow(column: number, row: number): HTMLElement | null {
    if (row === -1) {
      return overlayContainerElement.querySelector(
        `.ant-cascader-menu:nth-child(${column}) .ant-cascader-menu-item:last-child`
      );
    }

    return overlayContainerElement.querySelector(
      `.ant-cascader-menu:nth-child(${column}) .ant-cascader-menu-item:nth-child(${row})`
    );
  }

  function getAllColumns(): NodeListOf<Element> {
    return overlayContainerElement.querySelectorAll(`.ant-cascader-menu`);
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  beforeEach(
    testingInject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
      overlayContainer = currentOverlayContainer;
      overlayContainerElement = currentOverlayContainer.getContainerElement();
    })
  );

  afterEach(
    testingInject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
      currentOverlayContainer.ngOnDestroy();
      overlayContainer.ngOnDestroy();
    })
  );

  describe('default', () => {
    let fixture: ComponentFixture<NzDemoCascaderDefaultComponent>;
    let cascader: DebugElement;
    let testComponent: NzDemoCascaderDefaultComponent;

    function getLabelElement(): HTMLElement | null {
      return cascader.nativeElement.querySelector('.ant-select-selection-item');
    }

    function getLabelText(): string {
      return cascader.nativeElement.querySelector('.ant-select-selection-item').innerText.trim();
    }

    function getPlaceholder(): string {
      return cascader.nativeElement.querySelector('.ant-select-selection-placeholder').innerText.trim();
    }

    function getInputEl(): HTMLElement {
      return cascader.nativeElement.querySelector('input')!;
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
      testComponent = fixture.debugElement.componentInstance;
      cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.className).toContain('ant-cascader ant-select');
    });

    it('should have input', () => {
      fixture.detectChanges();
      expect(getInputEl()).toBeDefined();
      expect(getPlaceholder()).toBe('please select');
    });

    it('should input change event stopPropagation', () => {
      fixture.detectChanges();
      const fakeInputChangeEvent = createFakeEvent('change', true, true);
      spyOn(fakeInputChangeEvent, 'stopPropagation');
      getInputEl().dispatchEvent(fakeInputChangeEvent);
      fixture.detectChanges();
      expect(fakeInputChangeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should not have EMPTY label', () => {
      fixture.detectChanges();
      const label: HTMLElement = cascader.nativeElement.querySelector('.ant-select-selection-item');
      expect(label).toBeNull();
    });

    it('should placeholder work', () => {
      const placeholder = 'placeholder test';
      testComponent.nzPlaceHolder = placeholder;
      fixture.detectChanges();
      expect(getPlaceholder()).toBe(placeholder);
    });

    it('should show/hide placeholder when trigger compositionstart/compositionend event', () => {
      testComponent.nzPlaceHolder = 'placeholder test';
      fixture.detectChanges();

      const placeholderElement = cascader.nativeElement.querySelector('.ant-select-selection-placeholder');
      const fakeCompositionstartEvent = createFakeEvent('compositionstart', true, true);
      getInputEl().dispatchEvent(fakeCompositionstartEvent);
      fixture.detectChanges();
      expect(placeholderElement.style.display).toBe('none');

      const fakeCompositionendEvent = createFakeEvent('compositionend', true, true);
      getInputEl().dispatchEvent(fakeCompositionendEvent);
      fixture.detectChanges();
      expect(placeholderElement.style.display).toBe('block');
    });

    it('should size work', () => {
      testComponent.nzSize = 'small';
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-sm');
      testComponent.nzSize = 'large';
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-lg');
    });

    it('should value and label property work', fakeAsync(() => {
      testComponent.nzOptions = ID_NAME_LIST;
      testComponent.nzValueProperty = 'id';
      testComponent.nzLabelProperty = 'name';
      fixture.detectChanges();
      // label will not show if no item selected
      expect(getLabelElement()).toBeNull();
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('');
      testComponent.values = [1, 2, 3];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('1,2,3');
    }));

    it('should no value and label property work', fakeAsync(() => {
      testComponent.nzValueProperty = null!;
      testComponent.nzLabelProperty = null!;
      fixture.detectChanges();
      expect(getLabelElement()).toBeNull();
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('zhejiang,hangzhou,xihu');
    }));

    it('should showArrow work', () => {
      testComponent.nzShowArrow = true;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow')).toBeDefined();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow .anticon').classList).toContain('anticon-down');
      testComponent.nzShowArrow = false;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow')).toBeNull();
    });

    it('should allowClear work', () => {
      fixture.detectChanges();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeDefined();
      testComponent.nzAllowClear = false;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeNull();
    });

    describe('should variant works', () => {
      it('filled', () => {
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).not.toContain('ant-select-filled');
        testComponent.nzVariant = 'filled';
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).toContain('ant-select-filled');
      });
      it('borderless', () => {
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).not.toContain('ant-select-borderless');
        testComponent.nzVariant = 'borderless';
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).toContain('ant-select-borderless');
      });
      it('underlined', () => {
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).not.toContain('ant-select-underlined');
        testComponent.nzVariant = 'underlined';
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).toContain('ant-select-underlined');
      });
    });

    it('should open work', () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-open');
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-open');
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(1);
      expect(testComponent.cascader.nzOptions).toEqual(options1);
    });

    it('should click toggle open', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.nzDisabled).toBe(false);

      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(1);

      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(2);
    }));

    it('should mouse hover toggle open', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.nzTriggerAction = 'hover';
      fixture.detectChanges();
      expect(testComponent.nzDisabled).toBe(false);
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      tick(300);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(1);

      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      tick(300);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(2);
    }));

    it('should mouse hover toggle open immediately', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.nzTriggerAction = ['hover'];
      testComponent.nzMouseEnterDelay = 0;
      testComponent.nzMouseLeaveDelay = 0;
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(1);
      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(2);
    }));

    it('should clear timer on option mouseenter and mouseleave', fakeAsync(() => {
      testComponent.nzExpandTrigger = 'hover';
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      flush();
      fixture.detectChanges();
      const optionEl = getItemAtColumnAndRow(1, 1)!;
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(optionEl, 'mouseenter');
      fixture.detectChanges();
      tick(10);
      fixture.detectChanges();
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(optionEl, 'mouseleave');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(optionEl, 'mouseenter');
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(optionEl.classList).toContain('ant-cascader-menu-item-active');
    }));

    it('should disabled work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-disabled');
      testComponent.nzDisabled = true;
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-disabled');
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
      cascader.nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
    }));

    it('should disabled state work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-disabled');
      testComponent.cascader.setDisabledState(true);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-disabled');
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
      cascader.nativeElement.click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
    }));

    it('should disabled mouse hover open', fakeAsync(() => {
      testComponent.nzTriggerAction = 'hover';
      testComponent.nzDisabled = true;
      fixture.detectChanges();
      expect(testComponent.cascader.nzDisabled).toBe(true);
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      tick(300);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);

      testComponent.nzDisabled = false;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.nzDisabled).toBe(false);
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(1);
      testComponent.nzDisabled = true;
      fixture.detectChanges();
      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      tick(300);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(1);
    }));

    it('should mouse leave not work when menu not open', fakeAsync(() => {
      testComponent.nzTriggerAction = ['hover'];
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
    }));

    it('should clear value work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.nzAllowClear = true;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      expect(testComponent.values!.length).toBe(3);
      fixture.detectChanges();
      spyOn(testComponent, 'onClear');
      cascader.nativeElement.querySelector('.ant-select-clear nz-icon').click();
      fixture.detectChanges();
      expect(testComponent.values!.length).toBe(0);
      expect(testComponent.onClear).toHaveBeenCalled();
    }));

    it('should clear value work 2', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      expect(testComponent.values!.length).toBe(3);
      fixture.detectChanges();
      spyOn(testComponent, 'onClear');
      testComponent.cascader.clearSelection();
      fixture.detectChanges();
      expect(testComponent.values!.length).toBe(0);
      expect(testComponent.onClear).toHaveBeenCalled();
    }));

    it('should autofocus work', () => {
      testComponent.nzShowInput = true;
      testComponent.nzAutoFocus = true;
      fixture.detectChanges();
      expect(getInputEl().getAttribute('autofocus')).toBe('autofocus');
      testComponent.nzAutoFocus = false;
      fixture.detectChanges();
      expect(getInputEl().getAttribute('autofocus')).toBe(null);
    });

    it('should input focus and blur work', fakeAsync(() => {
      const fakeInputFocusEvent = createFakeEvent('focus', false, true);
      const fakeInputBlurEvent = createFakeEvent('blur', false, true);

      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-focused');
      getInputEl().dispatchEvent(fakeInputFocusEvent);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');
      getInputEl().dispatchEvent(fakeInputBlurEvent);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-focused');

      testComponent.cascader.setMenuVisible(true);
      getInputEl().dispatchEvent(fakeInputFocusEvent);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');
      getInputEl().dispatchEvent(fakeInputBlurEvent);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');
    }));

    it('should focus and blur function work', () => {
      testComponent.nzShowInput = true;
      cascader.nativeElement.click();
      fixture.detectChanges();
      expect(getInputEl() === document.activeElement).toBe(false);
      testComponent.cascader.focus();
      fixture.detectChanges();
      expect(getInputEl() === document.activeElement).toBe(true);
      testComponent.cascader.blur();
      fixture.detectChanges();
      expect(getInputEl() === document.activeElement).toBe(false);
    });

    it('should focus and blur function work 2', () => {
      testComponent.nzShowInput = false;
      cascader.nativeElement.click();
      fixture.detectChanges();
      expect(cascader.nativeElement === document.activeElement).toBe(false);
      testComponent.cascader.focus();
      fixture.detectChanges();
      expect(cascader.nativeElement === document.activeElement).toBe(true);
      testComponent.cascader.blur();
      fixture.detectChanges();
      expect(cascader.nativeElement === document.activeElement).toBe(false);
    });

    it('should menu class work', fakeAsync(() => {
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-cascader-menus')!.classList).toContain('menu-classA');
      expect(overlayContainerElement.querySelector('.ant-cascader-menu')!.classList).toContain('column-classA');
    }));

    it('should menu style work', fakeAsync(() => {
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      const targetElement = overlayContainerElement.querySelector('.menu-classA') as HTMLElement;
      expect(targetElement.style.height).toBe('120px');
    }));

    it('should show input false work', fakeAsync(() => {
      testComponent.nzShowInput = false;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-selection-search-input')).toBeNull();
      testComponent.nzAllowClear = true;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.nzOptions).toEqual(options1);
      expect(cascader.nativeElement.querySelector('.ant-select-selection-search-input')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
    }));

    it('should create label work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
    }));

    it('should label template work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.nzLabelRender = testComponent.renderTpl;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getLabelText().trim()).toBe('Zhejiang | Hangzhou | West Lake');
      // fix clear
      testComponent.cascader.clearSelection();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.nzLabelRender = testComponent.renderTpl;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(getLabelText().trim()).toBe('Zhejiang | Hangzhou | West Lake');
    }));

    it('should write value work', fakeAsync(() => {
      const control = testComponent.cascader;
      testComponent.nzOptions = options1;
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(null);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(undefined);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue([]);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(0);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      control.writeValue('');
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      control.writeValue(['zhejiang']);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      control.writeValue(['zhejiang', 'hangzhou', 'xihu']);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(3);
      const values = control.getSubmitValue();
      expect(values![0]).toBe('zhejiang');
      expect(values![1]).toBe('hangzhou');
      expect(values![2]).toBe('xihu');

      testComponent.nzOptions = []; // empty collection
      fixture.detectChanges();
      control.writeValue(['zhejiang', 'hangzhou', 'xihu']); // so these values are not match
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(3);
      const values3 = control.getSubmitValue();
      expect(values3[0]).toBe('zhejiang');
      expect(values3[1]).toBe('hangzhou');
      expect(values3[2]).toBe('xihu');
      expect(control.labelRenderText).toBe('zhejiang / hangzhou / xihu');
    }));

    it('should write value work on setting `nzOptions` async', fakeAsync(() => {
      const control = testComponent.cascader;
      testComponent.nzOptions = null;
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(null);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(undefined);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue([]);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(0);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      control.writeValue('');
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      control.writeValue(['zhejiang']);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      expect(control.labelRenderText).toBe('zhejiang');
      testComponent.nzOptions = options1; // update the nzOptions like async
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      expect(control.labelRenderText).toBe('Zhejiang');
    }));

    it('should write value work on setting `nzOptions` async (match)', fakeAsync(() => {
      const control = testComponent.cascader;
      testComponent.nzOptions = null;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush(); // force value to be written
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(3);
      expect(control.labelRenderText).toBe('zhejiang / hangzhou / xihu');
      testComponent.nzOptions = options1; // update the nzOptions like async
      fixture.detectChanges();
      const values = control.getSubmitValue();
      expect(values![0]).toBe('zhejiang');
      expect(values![1]).toBe('hangzhou');
      expect(values![2]).toBe('xihu');
      expect(control.labelRenderText).toBe('Zhejiang / Hangzhou / West Lake');
    }));

    it('should write value work on setting `nzOptions` async (not match)', fakeAsync(() => {
      const control = testComponent.cascader;
      testComponent.nzOptions = null;
      testComponent.values = ['zhejiang2', 'hangzhou2', 'xihu2'];
      fixture.detectChanges();
      flush(); // force value to be written
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(3);
      expect(control.labelRenderText).toBe('zhejiang2 / hangzhou2 / xihu2');
      testComponent.nzOptions = options1; // update the nzOptions like async
      fixture.detectChanges(); // but still the values is not match
      const values = control.getSubmitValue();
      expect(values![0]).toBe('zhejiang2');
      expect(values![1]).toBe('hangzhou2');
      expect(values![2]).toBe('xihu2');
      expect(control.labelRenderText).toBe('zhejiang2 / hangzhou2 / xihu2');
    }));

    it('should click option to expand', () => {
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0); // 0列：未显示菜单
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu')!.firstElementChild as HTMLElement;

      itemEl1.click();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);
      const col2 = getAllColumns().item(1);
      const itemEl2 = col2.firstElementChild as HTMLElement;

      itemEl2.click();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(3);
    });

    it('should click option to change column count', () => {
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0); // 0列：未显示菜单
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;

      itemEl1.click();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;

      itemEl2.click();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(3);

      const itemEl3 = getItemAtColumnAndRow(1, 2)!;

      itemEl3.click();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);
    });

    it('should click option to change column count 2', fakeAsync(() => {
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to open
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(getAllColumns().length).toBe(3);

      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      let itemEl3 = getItemAtColumnAndRow(3, 1)!;

      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2).toBeNull();
      expect(itemEl3).toBeNull();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');

      itemEl1.click();
      const itemEl4 = getItemAtColumnAndRow(2, 2)!;
      itemEl4.click(); // 选中一个叶子
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay close
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.values!.join(',')).toBe('zhejiang,ningbo');
    }));

    it('should click option to change column count 3', () => {
      testComponent.nzOptions = options3;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;

      itemEl1.click();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);
      let itemEl21 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl21.innerText.trim()).toBe('Hangzhou');

      const itemEl2 = getItemAtColumnAndRow(1, 2)!;

      itemEl2.click();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);

      itemEl21 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl21.innerText.trim()).toBe('Nanjing');
    });

    it('should click disabled option false to expand', fakeAsync(() => {
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const optionEl1 = getItemAtColumnAndRow(1, 1)!;
      const optionEl2 = getItemAtColumnAndRow(1, 2)!;

      expect(optionEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');
      optionEl1.click();
      fixture.detectChanges();
      expect(optionEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');
      optionEl2.click();
      fixture.detectChanges();
      expect(optionEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');
    }));

    it('should click leaf option to close menu', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      getItemAtColumnAndRow(1, 1)!.click();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      getItemAtColumnAndRow(2, 1)!.click();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      getItemAtColumnAndRow(3, 1)!.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(getAllColumns().length).toBe(0);
    }));

    it('should open menu when press DOWN_ARROW', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
    }));

    it('should open menu when press UP_ARROW', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
    }));

    it('should close menu when press ESC', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESCAPE);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));

    it('should init menu when selecting cancel', fakeAsync(() => {
      // cancel select by ESCAPE
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl1.click();
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl2.click();
      let itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESCAPE);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(1);

      // cancel select by clicking outside
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl1.click();
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl2.click();
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchFakeEvent(document.body, 'click');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(1);
    }));

    it('should nzBackdrop works', fakeAsync(() => {
      testComponent.nzBackdrop = true;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
    }));

    it('should navigate up when press UP_ARROW', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:last-child'
      ) as HTMLElement; // The last of the fisrt column
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      const itemEl2 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
    }));

    it('should navigate down when press DOWN_ARROW', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
    }));

    it('should navigate right when press RIGHT_ARROW', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');

      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');
    }));

    it('should navigate left when press LEFT_ARROW', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to open
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(3);

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      let itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3).toBeNull();
      expect(getAllColumns().length).toBe(2);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2).toBeNull();
      expect(getAllColumns().length).toBe(1);
    }));

    it('should select option when press ENTER', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW); // active 1
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW); // active 2
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW); // active 3
      fixture.detectChanges();
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));

    it('should key nav disabled option correct', fakeAsync(() => {
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const optionEl1 = getItemAtColumnAndRow(1, 1)!;
      const optionEl2 = getItemAtColumnAndRow(1, 2)!;

      expect(optionEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW); // active 1
      fixture.detectChanges();
      expect(optionEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges(); // should NOT active the disabled option2
      expect(optionEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');

      const optionEl11 = getItemAtColumnAndRow(2, 1)!;
      const optionEl12 = getItemAtColumnAndRow(2, 2)!;
      const optionEl13 = getItemAtColumnAndRow(2, 3)!;
      const optionEl14 = getItemAtColumnAndRow(2, 4)!;
      expect(optionEl11.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl12.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl13.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl14.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW); // active 2
      fixture.detectChanges();
      expect(optionEl11.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl12.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl13.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl14.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      expect(optionEl11.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl12.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl13.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl14.classList).toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();
      expect(optionEl11.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl12.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl13.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl14.classList).not.toContain('ant-cascader-menu-item-active');
    }));

    it('should ignore keyboardEvent on some key', fakeAsync(() => {
      const A = 65;
      const Z = 90;
      const keys = [PAGE_UP, PAGE_DOWN, TAB, HOME, END, SPACE, COMMA, DELETE];
      for (let k = A; k <= Z; k++) {
        keys.push(k);
      }
      for (let k = ZERO; k <= NINE; k++) {
        keys.push(k);
      }

      fixture.detectChanges();
      keys.forEach(key => {
        expect(testComponent.cascader.menuVisible).toBe(false);
        dispatchKeyboardEvent(cascader.nativeElement, 'keydown', key);
        fixture.detectChanges();
        expect(testComponent.cascader.menuVisible).toBe(false);
      });
    }));

    it('should expand option on hover', fakeAsync(() => {
      testComponent.nzExpandTrigger = 'hover';
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl1, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl1, 'mouseleave');
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl2, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(3);
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl2, 'mouseleave');
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(3);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl3, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(3);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      itemEl3.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
      flush();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0); // 0列
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));

    it('should not expand disabled option on hover', fakeAsync(() => {
      testComponent.nzExpandTrigger = 'hover';
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl2, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(1);

      dispatchMouseEvent(itemEl2, 'mouseleave');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(1);
    }));

    // fix #3914
    it('should drop selected items and columns if a leaf node is hovered', fakeAsync(() => {
      testComponent.nzExpandTrigger = 'hover';
      fixture.detectChanges();

      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.cascader.setMenuVisible(true); // Open cascader dropdown.

      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3);

      const c2i2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement;
      dispatchMouseEvent(c2i2, 'mouseenter');

      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2);
    }));

    it('should change on select work', fakeAsync(() => {
      testComponent.nzChangeOnSelect = true;
      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      expect(getAllColumns().length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl1.click();
      fixture.detectChanges();

      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(1);
      expect(testComponent.values![0]).toBe('zhejiang');

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      fixture.detectChanges();

      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(3);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(2);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');

      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl3.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
      flush();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0); // 0列
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));

    it('should not change on hover work', fakeAsync(() => {
      testComponent.nzChangeOnSelect = true;
      testComponent.nzExpandTrigger = 'hover';
      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      expect(getAllColumns().length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl1, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values).toBeNull(); // mouseenter does not trigger selection

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl2, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(3);
      expect(testComponent.values).toBeNull(); // mouseenter does not trigger selection

      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl3, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.values).toBeNull(); // mouseenter does not trigger selection

      itemEl3.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.values).toBeDefined(); // click trigger selection
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
      flush();
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0); // 0列
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));

    it('should change on function work', fakeAsync(() => {
      testComponent.nzChangeOn = testComponent.fakeChangeOn;
      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      fixture.detectChanges();
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      itemEl1.click();
      fixture.detectChanges();
      tick(200);
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(1);
      expect(testComponent.values![0]).toBe('zhejiang');
    }));

    it('should support search', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.nzShowSearch = true;
      fixture.detectChanges();
      const spy = spyOn(testComponent.cascader, 'focus');
      cascader.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');
    }));

    it('should searching could be aborted', fakeAsync(() => {
      testComponent.values = ['zhengjiang', 'hangzhou', 'xihu'];
      testComponent.nzShowSearch = true;
      fixture.detectChanges();
      cascader.nativeElement.click();
      flush();
      fixture.detectChanges();

      // input search value
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      // clear search value
      testComponent.cascader.inputValue = '';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.cascader.inSearchingMode).toBe(false);

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang');
    }));

    it('should clear input value when searching cancel', fakeAsync(() => {
      testComponent.values = ['zhengjiang', 'hangzhou', 'xihu'];
      testComponent.nzShowSearch = true;
      fixture.detectChanges();
      cascader.nativeElement.click();
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESCAPE);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values).toEqual(['zhengjiang', 'hangzhou', 'xihu']);
    }));

    it('should support nzLabelProperty', fakeAsync(() => {
      testComponent.nzShowSearch = true;
      testComponent.nzLabelProperty = 'l';
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');
    }));

    it('should support custom filter', fakeAsync(() => {
      testComponent.nzShowSearch = {
        filter(inputValue: string, path: NzCascaderOption[]): boolean {
          return path.some(p => p.label!.indexOf(inputValue) !== -1);
        }
      } as NzShowSearchOptions;
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');
    }));

    it('should support custom sorter', fakeAsync(() => {
      testComponent.nzShowSearch = {
        sorter(a: NzCascaderOption[], b: NzCascaderOption[], _inputValue: string): number {
          const l1 = a[0].label;
          const l2 = b[0].label; // all reversed, just to be sure it works
          return `${l1}`.localeCompare(l2!);
        }
      } as NzShowSearchOptions;
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Jiangsu / Nanjing / Zhong Hua Men');

      itemEl1.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('jiangsu,nanjing,zhonghuamen');
    }));

    it('should forbid disabled search options to be clicked', fakeAsync(() => {
      testComponent.nzOptions = options4;
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.cascaderService.columns[0][0].isDisabled).toBe(true);

      itemEl1.click();
      tick(300);
      fixture.detectChanges();
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.cascader.inputValue).toBe('o');
      // expect(testComponent.values).toBe(null);
    }));

    it('should pass disabled property to children when searching', () => {
      testComponent.nzOptions = options4;
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.cascaderService.columns[0][0].isDisabled).toBe(true);
      expect(testComponent.cascader.cascaderService.columns[0][1].isDisabled).toBe(false);
      expect(testComponent.cascader.cascaderService.columns[0][2].isDisabled).toBe(true);
    });

    it('should support arrow in search mode', done => {
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      const itemEl4 = getItemAtColumnAndRow(1, 4)!;
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl4.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        expect(testComponent.values!.join(',')).toBe('option1,option14');
        done();
      });
    });

    it('should not preventDefault left/right arrow in search mode', () => {
      fixture.detectChanges();
      testComponent.nzShowSearch = true;
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      fixture.detectChanges();
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
    });

    it('should support search a root node have no children ', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.nzShowSearch = true;
      testComponent.nzOptions = options5;
      fixture.detectChanges();
      const spy = spyOn(testComponent.cascader, 'focus');
      cascader.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      testComponent.cascader.inputValue = 'Roo';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText.trim()).toBe('暂无数据');
      flush();
    }));

    it('should re-prepare search results when nzOptions change', () => {
      fixture.detectChanges();
      testComponent.nzShowSearch = true;
      cascader.nativeElement.click();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      expect(testComponent.cascader.inSearchingMode).toBe(true);

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Option1 / Option11');
    });

    it('should support changing icon', () => {
      testComponent.nzSuffixIcon = 'home';
      testComponent.nzExpandIcon = 'home';

      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1);
      expect(itemEl1?.querySelector('.anticon-home')).toBeTruthy();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow .anticon')!.classList).toContain('anticon-home');
    });

    it('should nzPlacement works', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      let element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      const setNzPlacement = (placement: NzCascaderPlacement): void => {
        testComponent.cascader.setMenuVisible(false);
        fixture.detectChanges();
        testComponent.nzPlacement = placement;
        testComponent.cascader.setMenuVisible(true);
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
      };

      setNzPlacement('bottomRight');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      setNzPlacement('topLeft');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      setNzPlacement('topRight');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(true);
    }));

    it('should cascade work when the value of ngModel that is not existed in options', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.values = ['zhejiang', 'a'];
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      getItemAtColumnAndRow(1, 1)!.click();
      getItemAtColumnAndRow(2, 1)!.click();
      getItemAtColumnAndRow(3, 1)!.click();
      fixture.detectChanges();
      expect(testComponent.values).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    }));
  });

  describe('multiple', () => {
    let fixture: ComponentFixture<NzDemoCascaderMultipleComponent>;
    let cascader: DebugElement;
    let testComponent: NzDemoCascaderMultipleComponent;

    function setValues(len = 10): void {
      testComponent.values = testComponent.nzOptions[0]
        .children!.slice(0, len)
        .map(o => [testComponent.nzOptions[0].value, o.value]);
      fixture.detectChanges();
    }

    function getCheckboxAtColumnAndRow(column: number, row: number): HTMLElement | null {
      return overlayContainerElement.querySelector(
        `.ant-cascader-menu:nth-of-type(${column}) .ant-cascader-menu-item:nth-child(${row}) .ant-cascader-checkbox`
      );
    }

    function getCheckboxesAtColumn(column: number): HTMLElement[] {
      return Array.from(
        overlayContainerElement.querySelectorAll(
          `.ant-cascader-menu:nth-of-type(${column}) .ant-cascader-menu-item .ant-cascader-checkbox`
        )
      );
    }

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoCascaderMultipleComponent);
      testComponent = fixture.componentInstance;
      cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
    });

    it('should have correct classes', () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-multiple');
    });

    it('should maxTagCount work', fakeAsync(() => {
      // not exceed
      setValues(3);
      tick();
      fixture.detectChanges();
      let tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(3);

      // exceed maxTagCount
      setValues(10);
      tick();
      fixture.detectChanges();
      tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(4); // maxTagCount + 1
    }));

    it('should remove item work', fakeAsync(() => {
      setValues(4);
      tick();
      fixture.detectChanges();
      const removeBtn = cascader.queryAll(By.css('.ant-select-selection-item-remove'))[2];
      removeBtn.nativeElement.click();
      fixture.detectChanges();
      const tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(3);
    }));

    it('should check state conduct up and down', fakeAsync(() => {
      cascader.componentInstance.setMenuVisible(true);
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();

      // firstly, expand all columns (for convenience)
      getItemAtColumnAndRow(1, 2)!.click();
      fixture.detectChanges();
      getItemAtColumnAndRow(2, 1)!.click();
      fixture.detectChanges();

      const rootEl = getCheckboxAtColumnAndRow(1, 2)!;
      const parentEl = getCheckboxAtColumnAndRow(2, 1)!;
      const children = getCheckboxesAtColumn(3).filter(c => !c.classList.contains('ant-cascader-checkbox-disabled'));

      // check parent option
      parentEl.click();
      fixture.detectChanges();
      expect(parentEl.classList).toContain('ant-cascader-checkbox-checked');
      // Conduct Down: then all children should be checked
      expect(children.every(c => c.classList.contains('ant-cascader-checkbox-checked'))).toBe(true);
      // Conduct Up: and its parent should be checked too
      expect(rootEl.classList).toContain('ant-cascader-checkbox-checked');

      // uncheck a child option
      children[0]!.click();
      fixture.detectChanges();
      // Conduct Up: then parent should be half checked
      expect(parentEl.classList).toContain('ant-cascader-checkbox-indeterminate');
      // Conduct Up: and root should be half checked
      expect(rootEl.classList).toContain('ant-cascader-checkbox-indeterminate');

      // check the half checked parent option
      parentEl.click();
      fixture.detectChanges();
      expect(parentEl.classList).toContain('ant-cascader-checkbox-checked');
      // Conduct Down: then all children should be checked
      expect(children.every(c => c.classList.contains('ant-cascader-checkbox-checked'))).toBe(true);
      // Conduct Up: and its parent should be checked too
      expect(rootEl.classList).toContain('ant-cascader-checkbox-checked');

      // uncheck the parent option
      parentEl.click();
      fixture.detectChanges();
      // Conduct Down: then all children should be unchecked
      expect(children.every(c => !c.classList.contains('ant-cascader-checkbox-checked'))).toBe(true);
      // Conduct Up: and its parent should be unchecked too
      expect(rootEl.classList).not.toContain('ant-cascader-checkbox-checked');
    }));

    it('should click checkbox not set option activated', fakeAsync(() => {
      cascader.componentInstance.setMenuVisible(true);
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();

      const option = getItemAtColumnAndRow(1, 1)!;
      const checkbox = getCheckboxAtColumnAndRow(1, 1)!;
      expect(option.classList).not.toContain('ant-cascader-menu-item-active');

      checkbox.click();
      fixture.detectChanges();

      expect(option.classList).not.toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).toContain('ant-cascader-checkbox-checked');
    }));

    it('should change check state when click leaf node', fakeAsync(() => {
      cascader.componentInstance.setMenuVisible(true);
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();

      // firstly, expand all columns (for convenience)
      getItemAtColumnAndRow(1, 2)!.click();
      fixture.detectChanges();
      getItemAtColumnAndRow(2, 1)!.click();
      fixture.detectChanges();

      const leaf = getItemAtColumnAndRow(3, 2)!;
      const checkbox = getCheckboxAtColumnAndRow(3, 2)!;
      // click leaf node
      expect(leaf.classList).not.toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).not.toContain('ant-cascader-checkbox-checked');

      leaf.click();
      fixture.detectChanges();
      expect(leaf.classList).toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).toContain('ant-cascader-checkbox-checked');

      leaf.click();
      fixture.detectChanges();
      expect(leaf.classList).toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).not.toContain('ant-cascader-checkbox-checked');
    }));

    it('should change check state trigger ngModelChange', fakeAsync(() => {
      spyOn(testComponent, 'onChanges');
      expect(testComponent.onChanges).not.toHaveBeenCalled();
      cascader.componentInstance.setMenuVisible(true);
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      expect(testComponent.onChanges).not.toHaveBeenCalled();

      const checkbox = getCheckboxAtColumnAndRow(1, 1)!;
      checkbox.click();
      fixture.detectChanges();
      expect(testComponent.onChanges).toHaveBeenCalledWith([['light']]);
    }));

    describe('should cascade work when the value of ngModel includes nodes that are not existed in options', () => {
      it('should remove item work', fakeAsync(() => {
        setValues(2);
        testComponent.values![0] = ['light', 'a'];
        tick();
        fixture.detectChanges();
        const removeBtn = cascader.queryAll(By.css('.ant-select-selection-item-remove'))[0];
        removeBtn.nativeElement.click();
        fixture.detectChanges();
        const tags = cascader.queryAll(By.directive(NzSelectItemComponent));
        expect(tags.length).toBe(1);
      }));

      it('should add item work', fakeAsync(() => {
        spyOn(testComponent, 'onChanges');
        setValues(2);
        testComponent.values![0] = ['light', 'a'];
        console.log(testComponent.values);
        tick();
        fixture.detectChanges();
        cascader.componentInstance.setMenuVisible(true);
        fixture.detectChanges();
        const checkbox = getCheckboxAtColumnAndRow(2, 3)!;
        checkbox.click();
        fixture.detectChanges();
        expect(testComponent.values!.length).toBe(3);
        const selectedNodes = [
          ['light', 1],
          ['light', 'a'],
          ['light', 2]
        ];
        expect(testComponent.values).toEqual(selectedNodes);
        expect(testComponent.onChanges).toHaveBeenCalledWith(selectedNodes);
      }));
    });
  });

  describe('load data lazily', () => {
    let fixture: ComponentFixture<NzDemoCascaderLoadDataComponent>;
    let cascader: DebugElement;
    let testComponent: NzDemoCascaderLoadDataComponent;

    afterEach(
      testingInject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
        currentOverlayContainer.ngOnDestroy();
        overlayContainer.ngOnDestroy();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoCascaderLoadDataComponent);
      testComponent = fixture.debugElement.componentInstance;
      cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
    });

    it('should nzLoadData work', fakeAsync(() => {
      spyOn(testComponent, 'addCallTimes');

      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      expect(getAllColumns().length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(0);

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(1);
      tick(1000); // wait for first row to load finish
      fixture.detectChanges();

      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl1.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(2);
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3);
      expect(getAllColumns().length).toBe(3);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl3.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(4);
      expect(testComponent.values).toBeNull(); // not select yet

      itemEl3.click(); // re-click again, this time it is a leaf
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(4);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
    }));

    it('should nzLoadData work when specifies default value', fakeAsync(() => {
      spyOn(testComponent, 'addCallTimes');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      tick(3000);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(3);
      expect(testComponent.values.join(',')).toBe('zhejiang,hangzhou,xihu');
    }));

    it('should not emit error after clear search and reopen it', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      tick(1000); // wait for first row to load finish
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;

      itemEl1.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;

      itemEl2.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;

      itemEl3.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      itemEl3.click(); // re-click again, this time it is a leaf
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      cascader.nativeElement.querySelector('.ant-select-clear .anticon').click();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.values!.length).toBe(0);
    }));
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzDemoCascaderRtlComponent>;
    let cascader: DebugElement;
    let testComponent: NzDemoCascaderRtlComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoCascaderRtlComponent);
      testComponent = fixture.debugElement.componentInstance;
      cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.className).toContain('ant-select-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(cascader.nativeElement.className).not.toContain('ant-select-rtl');
    });

    it('should menu class work', fakeAsync(() => {
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-cascader-menus')!.classList).toContain('ant-cascader-rtl');
    }));

    it('should item arrow display correct direction', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.nzOptions = options3;
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl1.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const itemEl21 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl21.querySelector('.anticon')?.classList).toContain('anticon-left');
    }));
  });

  describe('Status', () => {
    let fixture: ComponentFixture<NzDemoCascaderStatusComponent>;
    let cascader: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoCascaderStatusComponent);
      cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.className).toContain('ant-select-status-error');

      fixture.componentInstance.status = 'warning';
      fixture.detectChanges();
      expect(cascader.nativeElement.className).toContain('ant-select-status-warning');

      fixture.componentInstance.status = '';
      fixture.detectChanges();
      expect(cascader.nativeElement.className).not.toContain('ant-select-status-warning');
    });
  });

  describe('In form', () => {
    let fixture: ComponentFixture<NzDemoCascaderInFormComponent>;
    let formGroup: FormGroup<{
      demo: FormControl<string[] | null>;
    }>;
    let cascader: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoCascaderInFormComponent);
      cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
      formGroup = fixture.componentInstance.validateForm;
      fixture.detectChanges();
    });

    it('should className correct', () => {
      expect(cascader.nativeElement.className).not.toContain('ant-select-status-error');
      expect(cascader.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeNull();
      formGroup.controls.demo.markAsDirty();
      formGroup.controls.demo.setValue(null);
      formGroup.controls.demo.updateValueAndValidity();
      fixture.detectChanges();

      // show error
      expect(cascader.nativeElement.className).toContain('ant-select-status-error');
      expect(cascader.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();
      expect(cascader.nativeElement.querySelector('nz-form-item-feedback-icon').className).toContain(
        'ant-form-item-feedback-icon-error'
      );

      formGroup.controls.demo.markAsDirty();
      formGroup.controls.demo.setValue(['a', 'b']);
      formGroup.controls.demo.updateValueAndValidity();
      fixture.detectChanges();
      // show success
      expect(cascader.nativeElement.className).toContain('ant-select-status-success');
      expect(cascader.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();
      expect(cascader.nativeElement.querySelector('nz-form-item-feedback-icon').className).toContain(
        'ant-form-item-feedback-icon-success'
      );
    });
  });
});

const ID_NAME_LIST = [
  {
    id: 1,
    name: 'Zhejiang',
    children: [
      {
        id: 2,
        name: 'Hangzhou',
        children: [
          {
            id: 3,
            name: 'West Lake',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

const options1: NzCascaderOption[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    l: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        l: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            l: 'West Lake',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        l: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    l: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        l: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            l: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

const options2 = [
  {
    value: 'option1',
    label: 'Option1',
    children: [
      {
        value: 'option11',
        label: 'Option11',
        disabled: true,
        isLeaf: true
      },
      {
        value: 'option12',
        label: 'Option12',
        isLeaf: true
      },
      {
        value: 'option13',
        label: 'Option13',
        disabled: true,
        isLeaf: true
      },
      {
        value: 'option14',
        label: 'Option14',
        isLeaf: true
      }
    ]
  },
  {
    value: 'option2',
    label: 'Option2',
    disabled: true,
    children: [
      {
        value: 'option21',
        label: 'Option21',
        isLeaf: true
      },
      {
        value: 'option22',
        label: 'Option22',
        isLeaf: true
      }
    ]
  }
];

const options3 = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      },
      {
        value: 'suzhou',
        label: 'Suzhou',
        isLeaf: true
      }
    ]
  }
];

const options4 = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        disabled: true,
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }
        ]
      },
      {
        value: 'ningbo',
        label: 'Ningbo',
        isLeaf: true
      }
    ]
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    disabled: true,
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
            isLeaf: true
          }
        ]
      }
    ]
  }
];

const options5: NzSafeAny[] = [];

@Component({
  imports: [FormsModule, NzCascaderModule],
  selector: 'nz-test-cascader-default',
  template: `
    <nz-cascader
      [(ngModel)]="values"
      [nzAllowClear]="nzAllowClear"
      [nzAutoFocus]="nzAutoFocus"
      [nzChangeOn]="nzChangeOn"
      [nzChangeOnSelect]="nzChangeOnSelect"
      [nzColumnClassName]="nzColumnClassName"
      [nzDisabled]="nzDisabled"
      [nzExpandIcon]="nzExpandIcon"
      [nzExpandTrigger]="nzExpandTrigger"
      [nzLabelProperty]="nzLabelProperty"
      [nzLabelRender]="nzLabelRender"
      [nzMenuClassName]="nzMenuClassName"
      [nzMenuStyle]="nzMenuStyle"
      [nzMouseEnterDelay]="nzMouseEnterDelay"
      [nzMouseLeaveDelay]="nzMouseLeaveDelay"
      [nzOptions]="nzOptions"
      [nzPlaceHolder]="nzPlaceHolder"
      [nzShowArrow]="nzShowArrow"
      [nzShowInput]="nzShowInput"
      [nzShowSearch]="nzShowSearch"
      [nzSize]="nzSize"
      [nzTriggerAction]="nzTriggerAction"
      [nzSuffixIcon]="nzSuffixIcon"
      [nzValueProperty]="nzValueProperty"
      [nzBackdrop]="nzBackdrop"
      [nzPlacement]="nzPlacement"
      [nzVariant]="nzVariant"
      (ngModelChange)="onValueChanges($event)"
      (nzVisibleChange)="onVisibleChange($event)"
      (nzClear)="onClear()"
    ></nz-cascader>

    <ng-template #renderTpl let-labels="labels" let-selectedOptions="selectedOptions">
      @for (label of labels; track $index) {
        {{ label }}{{ $last ? '' : ' | ' }}
      }
    </ng-template>
  `
})
export class NzDemoCascaderDefaultComponent {
  @ViewChild(NzCascaderComponent, { static: true }) cascader!: NzCascaderComponent;
  @ViewChild('renderTpl', { static: true }) renderTpl!: TemplateRef<NzSafeAny>;

  nzOptions: NzSafeAny[] | null = options1;
  values: string[] | number[] | null = null;

  nzAllowClear = true;
  nzAutoFocus = false;
  nzMenuClassName = 'menu-classA menu-classB';
  nzColumnClassName = 'column-classA column-classB';
  nzMenuStyle = { height: '120px' };
  nzExpandTrigger: NzCascaderExpandTrigger = 'click';
  nzDisabled = false;
  nzLabelProperty: string = 'label';
  nzValueProperty: string = 'value';
  nzPlaceHolder = 'please select';
  nzShowArrow = true;
  nzShowInput = true;
  nzShowSearch: boolean | NzShowSearchOptions = false;
  nzSize: NzCascaderSize = 'default';
  nzLabelRender: TemplateRef<NzSafeAny> | null = null;
  nzChangeOn: NzSafeAny = null;
  nzChangeOnSelect = false;
  nzTriggerAction: NzCascaderTriggerType | NzCascaderTriggerType[] = 'click';
  nzMouseEnterDelay = 150; // ms
  nzMouseLeaveDelay = 150; // ms
  nzSuffixIcon = 'down';
  nzExpandIcon = 'right';
  nzBackdrop = false;
  nzPlacement: NzCascaderPlacement = 'bottomLeft';
  nzVariant: NzVariant = 'outlined';

  onVisibleChange = jasmine.createSpy<(visible: boolean) => void>('open change');
  onValueChanges = jasmine.createSpy('value change');
  onClear(): void {}
  fakeChangeOn = (node: NzSafeAny, _index: number): boolean => node.value === 'zhejiang';
}

@Component({
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      [nzLoadData]="nzLoadData"
      (ngModelChange)="onValueChanges($event)"
      (nzVisibleChange)="onVisibleChange($event)"
    ></nz-cascader>
  `
})
export class NzDemoCascaderLoadDataComponent {
  @ViewChild(NzCascaderComponent, { static: true }) cascader!: NzCascaderComponent;

  nzOptions: NzSafeAny[] | null = null;
  values: string[] | null = null;

  nzLoadData = (node: NzSafeAny, index: number): PromiseLike<NzSafeAny> => {
    this.addCallTimes();
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (index < 0) {
          // if index less than 0 it is root node
          node.children = [
            {
              value: 'zhejiang',
              label: 'Zhejiang'
            }
          ];
          resolve(null);
        } else if (index === 0) {
          node.children = [
            {
              value: 'hangzhou',
              label: 'Hangzhou'
            }
          ];
          resolve(null);
        } else if (index === 1) {
          node.children = [
            {
              value: 'xihu',
              label: 'West Lake'
            }
          ];
          resolve(null);
        } else {
          reject();
        }
      }, 500);
    });
  };

  addCallTimes(): void {}
  onVisibleChange = jasmine.createSpy<(visible: boolean) => void>('open change');
  onValueChanges = jasmine.createSpy('value change');
}

@Component({
  imports: [BidiModule, NzCascaderModule],
  template: `
    <div [dir]="direction">
      <nz-cascader [nzOptions]="nzOptions"></nz-cascader>
    </div>
  `
})
export class NzDemoCascaderRtlComponent {
  @ViewChild(NzCascaderComponent, { static: true }) cascader!: NzCascaderComponent;
  nzOptions: NzSafeAny[] | null = options1;
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}

@Component({
  imports: [FormsModule, NzCascaderModule],
  template: `<nz-cascader [nzOptions]="nzOptions" [nzStatus]="status"></nz-cascader>`
})
export class NzDemoCascaderStatusComponent {
  nzOptions: NzSafeAny[] | null = options1;
  status: NzStatus = 'error';
}

@Component({
  imports: [ReactiveFormsModule, NzFormModule, NzCascaderModule],
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-form-item>
        <nz-form-control nzHasFeedback>
          <nz-cascader formControlName="demo" [nzOptions]="nzOptions"></nz-cascader>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzDemoCascaderInFormComponent {
  private fb = inject(FormBuilder);
  validateForm = this.fb.group({
    demo: this.fb.control<string[] | null>(null, Validators.required)
  });
  nzOptions: NzSafeAny[] | null = options1;
}
