/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import {
  BACKSPACE,
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
import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  DebugElement,
  inject,
  signal,
  TemplateRef,
  ViewChild,
  type WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed, inject as testingInject } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzDemoCascaderMultipleComponent } from 'ng-zorro-antd/cascader/demo/multiple';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NZ_FORM_SIZE, NZ_FORM_VARIANT } from 'ng-zorro-antd/core/form';
import {
  createFakeEvent,
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent,
  provideMockDirectionality,
  sleep,
  testDirectionality,
  updateNonSignalsInput
} from 'ng-zorro-antd/core/testing';
import { NzSafeAny, NzStatus, NzVariant, type NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzFormModule } from 'ng-zorro-antd/form';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzSelectItemComponent } from 'ng-zorro-antd/select';
import { NZ_SPACE_COMPACT_SIZE } from 'ng-zorro-antd/space';

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

const MOUSE_EVENT_DELAY = 150;

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
      providers: [provideNzIconsTesting(), provideNzNoAnimation()]
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
      const label = cascader.nativeElement.querySelector('.ant-select-selection-item');
      expect(label).toBeNull();
    });

    it('should placeholder work', () => {
      testComponent.nzPlaceHolder.set('placeholder test');
      fixture.detectChanges();
      expect(getPlaceholder()).toBe('placeholder test');
    });

    it('should show/hide placeholder when trigger compositionstart/compositionend event', () => {
      testComponent.nzPlaceHolder.set('placeholder test');
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
      testComponent.nzSize.set('small');
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-sm');

      testComponent.nzSize.set('large');
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-lg');
    });

    it('should value and label property work', async () => {
      testComponent.nzOptions.set(ID_NAME_LIST);
      testComponent.nzValueProperty.set('id');
      testComponent.nzLabelProperty.set('name');
      fixture.detectChanges();
      // label will not show if no item selected
      expect(getLabelElement()).toBeNull();
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('');

      testComponent.values.set([1, 2, 3]);
      await fixture.whenStable();
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('1,2,3');
    });

    it('should no value and label property work', async () => {
      testComponent.nzValueProperty.set(null!);
      testComponent.nzLabelProperty.set(null!);
      fixture.detectChanges();
      expect(getLabelElement()).toBeNull();
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('');

      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      await fixture.whenStable();
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('zhejiang,hangzhou,xihu');
    });

    it('should showArrow work', () => {
      testComponent.nzShowArrow.set(true);
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow')).toBeDefined();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow .anticon').classList).toContain('anticon-down');

      testComponent.nzShowArrow.set(false);
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow')).toBeNull();
    });

    it('should allowClear work', () => {
      fixture.detectChanges();
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeDefined();

      testComponent.nzAllowClear.set(false);
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeNull();
    });

    describe('should variant works', () => {
      it('outlined', () => {
        testComponent.nzVariant.set('outlined');
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).toContain('ant-select-outlined');
      });

      it('filled', () => {
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).not.toContain('ant-select-filled');
        testComponent.nzVariant.set('filled');
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).toContain('ant-select-filled');
      });

      it('borderless', () => {
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).not.toContain('ant-select-borderless');
        testComponent.nzVariant.set('borderless');
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).toContain('ant-select-borderless');
      });

      it('underlined', () => {
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).not.toContain('ant-select-underlined');
        testComponent.nzVariant.set('underlined');
        fixture.detectChanges();
        expect(cascader.nativeElement.classList).toContain('ant-select-underlined');
      });
    });

    it('should open work', () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-open');
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-open');
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
      expect(testComponent.cascader.nzOptions).toEqual(options1());
    });

    it('should click toggle open', async () => {
      fixture.detectChanges();
      expect(testComponent.nzDisabled()).toBe(false);

      cascader.nativeElement.click();
      await sleep(MOUSE_EVENT_DELAY);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);

      cascader.nativeElement.click();
      await sleep(MOUSE_EVENT_DELAY);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should mouse hover toggle open', async () => {
      fixture.detectChanges();
      testComponent.nzTriggerAction.set('hover');
      fixture.detectChanges();
      expect(testComponent.nzDisabled()).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);

      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      await sleep(300);
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);

      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      await sleep(300);
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should mouse hover toggle open immediately', async () => {
      fixture.detectChanges();
      testComponent.nzTriggerAction.set(['hover']);
      testComponent.nzMouseEnterDelay.set(0);
      testComponent.nzMouseLeaveDelay.set(0);
      fixture.detectChanges();

      expect(testComponent.cascader.menuOpen()).toBe(false);
      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);

      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should clear timer on option mouseenter and mouseleave', async () => {
      testComponent.nzExpandTrigger.set('hover');
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(false);

      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(true);
      await fixture.whenStable();
      const optionEl = getItemAtColumnAndRow(1, 1)!;
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(optionEl, 'mouseenter');
      await sleep(10); // < delay
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(optionEl, 'mouseleave');
      await sleep(MOUSE_EVENT_DELAY);
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(optionEl, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(optionEl.classList).toContain('ant-cascader-menu-item-active');
    });

    it('should disabled work', async () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-disabled');
      testComponent.nzDisabled.set(true);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-disabled');
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);

      cascader.nativeElement.click();
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);

      testComponent.cascader.setMenuOpen(true);
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
    });

    it('should disabled state work', async () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-disabled');
      testComponent.cascader.setDisabledState(true);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-disabled');
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);

      cascader.nativeElement.click();
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
    });

    it('should disabled mouse hover open', async () => {
      testComponent.nzTriggerAction.set('hover');
      testComponent.nzDisabled.set(true);
      fixture.detectChanges();
      expect(testComponent.cascader.nzDisabled).toBe(true);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);

      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);

      testComponent.nzDisabled.set(false);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(testComponent.cascader.nzDisabled).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);

      testComponent.nzDisabled.set(true);
      fixture.detectChanges();
      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
    });

    it('should mouse leave not work when menu not open', async () => {
      testComponent.nzTriggerAction.set(['hover']);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
    });

    it('should clear value work', async () => {
      fixture.detectChanges();
      testComponent.nzAllowClear.set(true);
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      await updateNonSignalsInput(fixture);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);

      spyOn(testComponent, 'onClear');
      expect(testComponent.onClear).not.toHaveBeenCalled();
      cascader.nativeElement.querySelector('.ant-select-clear nz-icon').click();
      fixture.detectChanges();
      expect(testComponent.values()).toEqual([]);
      expect(testComponent.onClear).toHaveBeenCalled();
    });

    it('should clear value work 2', async () => {
      fixture.detectChanges();
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      await updateNonSignalsInput(fixture);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);

      spyOn(testComponent, 'onClear');
      testComponent.cascader.clearSelection();
      fixture.detectChanges();
      expect(testComponent.values()).toEqual([]);
      expect(testComponent.onClear).toHaveBeenCalled();
    });

    it('should autofocus work', () => {
      testComponent.nzShowInput.set(true);
      fixture.detectChanges();
      testComponent.nzAutoFocus.set(true);
      fixture.detectChanges();
      expect(getInputEl().getAttribute('autofocus')).toBe('autofocus');
      testComponent.nzAutoFocus.set(false);
      fixture.detectChanges();
      expect(getInputEl().getAttribute('autofocus')).toBe(null);
    });

    it('should input focus and blur work', async () => {
      const fakeInputFocusEvent = createFakeEvent('focus', false, true);
      const fakeInputBlurEvent = createFakeEvent('blur', false, true);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-focused');

      getInputEl().dispatchEvent(fakeInputFocusEvent);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');

      getInputEl().dispatchEvent(fakeInputBlurEvent);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-select-focused');

      testComponent.cascader.setMenuOpen(true);
      getInputEl().dispatchEvent(fakeInputFocusEvent);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');

      getInputEl().dispatchEvent(fakeInputBlurEvent);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');
    });

    it('should focus and blur function work', () => {
      testComponent.nzShowInput.set(true);
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
      testComponent.nzShowInput.set(false);
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

    it('should menu class work', async () => {
      fixture.detectChanges();
      cascader.nativeElement.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-cascader-menus')!.classList).toContain('menu-classA');
      expect(overlayContainerElement.querySelector('.ant-cascader-menu')!.classList).toContain('column-classA');
    });

    it('should menu style work', async () => {
      fixture.detectChanges();
      cascader.nativeElement.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      const targetElement = overlayContainerElement.querySelector('.menu-classA') as HTMLElement;
      expect(targetElement.style.height).toBe('120px');
    });

    it('should show input false work', async () => {
      testComponent.nzShowInput.set(false);
      fixture.detectChanges();

      expect(cascader.nativeElement.querySelector('.ant-select-selection-search-input')).toBeNull();
      testComponent.nzAllowClear.set(true);
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      await updateNonSignalsInput(fixture);

      expect(cascader.nativeElement.querySelector('.ant-select-selection-search-input')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
    });

    it('should create label work', async () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      await updateNonSignalsInput(fixture);
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
    });

    it('should label template work', async () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      testComponent.nzLabelRender.set(testComponent.renderTpl);
      await updateNonSignalsInput(fixture);
      expect(getLabelText()).toBe('Zhejiang | Hangzhou | West Lake');

      // fix clear
      testComponent.cascader.clearSelection();
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      testComponent.nzLabelRender.set(testComponent.renderTpl);
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      expect(getLabelText()).toBe('Zhejiang | Hangzhou | West Lake');
    });

    it('should label template work on multiple', async () => {
      testComponent.nzMultiple.set(true);
      testComponent.values.set([['zhejiang', 'hangzhou']]);
      await updateNonSignalsInput(fixture);
      expect(getLabelText()).toBe('Zhejiang / Hangzhou');

      testComponent.values.set([['jiangsu']]); // 'Jiangsu / Nanjing / Zhong Hua Men'
      await updateNonSignalsInput(fixture);
      expect(getLabelText()).toBe('Jiangsu');

      testComponent.nzLabelRender.set(testComponent.renderTpl);
      testComponent.values.set([['zhejiang', 'hangzhou']]);
      await updateNonSignalsInput(fixture);
      expect(getLabelText().trim()).toBe('Zhejiang | Hangzhou');

      testComponent.values.set([['jiangsu']]); // 'Jiangsu / Nanjing / Zhong Hua Men'
      await updateNonSignalsInput(fixture);
      expect(getLabelText()).toBe('Jiangsu');
    });

    it('should write value work', async () => {
      const control = testComponent.cascader;
      testComponent.nzOptions.set(options1());
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
      expect(control.getSubmitValue()).toEqual(['zhejiang', 'hangzhou', 'xihu']);

      testComponent.nzOptions.set([]); // empty collection
      fixture.detectChanges();
      control.writeValue(['zhejiang', 'hangzhou', 'xihu']); // so these values are not match
      fixture.detectChanges();
      expect(control.getSubmitValue()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
      expect(getLabelText()).toBe('zhejiang / hangzhou / xihu');
    });

    it('should write value work on setting `nzOptions` async', async () => {
      const control = testComponent.cascader;
      testComponent.nzOptions.set(null);
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
      expect(getLabelText()).toBe('zhejiang');
      testComponent.nzOptions.set(options1()); // update the nzOptions like async
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      expect(getLabelText()).toBe('Zhejiang');
    });

    it('should write value work on setting `nzOptions` async (match)', async () => {
      const control = testComponent.cascader;
      testComponent.nzOptions.set(null);
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      await updateNonSignalsInput(fixture); // force value to be written
      expect(control.getSubmitValue().length).toBe(3);
      expect(getLabelText()).toBe('zhejiang / hangzhou / xihu');

      testComponent.nzOptions.set(options1()); // update the nzOptions like async
      fixture.detectChanges();
      expect(control.getSubmitValue()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
    });

    it('should write value work on setting `nzOptions` async (not match)', async () => {
      const control = testComponent.cascader;
      testComponent.nzOptions.set(null);
      testComponent.values.set(['zhejiang2', 'hangzhou2', 'xihu2']);
      await updateNonSignalsInput(fixture); // force value to be written
      expect(control.getSubmitValue().length).toBe(3);
      expect(getLabelText()).toBe('zhejiang2 / hangzhou2 / xihu2');

      testComponent.nzOptions.set(options1()); // update the nzOptions like async
      fixture.detectChanges(); // but still the values is not match
      expect(control.getSubmitValue()).toEqual(['zhejiang2', 'hangzhou2', 'xihu2']);
      expect(getLabelText()).toBe('zhejiang2 / hangzhou2 / xihu2');
    });

    it('should click option to expand', () => {
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0);
      testComponent.cascader.setMenuOpen(true);
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
      expect(getAllColumns().length).toBe(0);
      testComponent.cascader.setMenuOpen(true);
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

    it('should click option to change column count 2', async () => {
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      await updateNonSignalsInput(fixture); // wait for cdk-overlay to open
      fixture.detectChanges();

      expect(testComponent.cascader.menuOpen()).toBe(true);
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
      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3).toBeNull();
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);

      const itemEl4 = getItemAtColumnAndRow(2, 2)!;
      itemEl4.click(); // click leaf node
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.values()).toEqual(['zhejiang', 'ningbo']);
    });

    it('should click option to change column count 3', () => {
      testComponent.nzOptions.set(options3);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
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

    it('should click disabled option false to expand', async () => {
      testComponent.nzOptions.set(options2);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
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
    });

    it('should click leaf option to close menu', async () => {
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(true);

      getItemAtColumnAndRow(1, 1)!.click();
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(true);

      getItemAtColumnAndRow(2, 1)!.click();
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(true);

      getItemAtColumnAndRow(3, 1)!.click();
      await sleep(MOUSE_EVENT_DELAY);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(getAllColumns().length).toBe(0);
    });

    it('should open menu when press DOWN_ARROW', async () => {
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(true);
    });

    it('should open menu when press UP_ARROW', async () => {
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(true);
    });

    it('should close menu when press ESC', async () => {
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(true);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESCAPE);
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should init menu when selecting cancel', async () => {
      // cancel select by ESCAPE
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl1.click();
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl2.click();
      let itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESCAPE);
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(1);

      // cancel select by clicking outside
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl1.click();
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl2.click();
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchFakeEvent(document.body, 'click');
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(1);
    });

    it('should nzBackdrop works', async () => {
      testComponent.nzBackdrop.set(true);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      const boundingBox = overlayContainerElement.children[0];
      expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
    });

    it('should navigate up when press UP_ARROW', async () => {
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:last-child'
      ) as HTMLElement; // The last of the fisrt column
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      await fixture.whenStable();
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');

      const itemEl2 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      await fixture.whenStable();
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
    });

    it('should navigate down when press DOWN_ARROW', async () => {
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
    });

    it('should navigate right when press RIGHT_ARROW', async () => {
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
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
    });

    it('should navigate left when press LEFT_ARROW', async () => {
      fixture.detectChanges();
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      testComponent.cascader.setMenuOpen(true);
      await fixture.whenStable();
      expect(getAllColumns().length).toBe(3);

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
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
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBeFalse();
    });

    it('should navigate left when press BACKSPACE', async () => {
      fixture.detectChanges();
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      testComponent.cascader.setMenuOpen(true);
      await updateNonSignalsInput(fixture); // wait for cdk-overlay to open
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(3);

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', BACKSPACE);
      fixture.detectChanges();
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
    });

    it('when there is only one column activated, pressing LEFT should fold the menu', async () => {
      testComponent.values.set(['zhejiang', 'ningbo']);
      testComponent.cascader.setMenuOpen(true);
      await fixture.whenStable();

      expect(getAllColumns().length).toBe(2);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBeFalse();
    });

    it('should select option when press ENTER', async () => {
      fixture.detectChanges();
      expect(testComponent.values()).toBeNull();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW); // active 1
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.values()).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW); // active 2
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.values()).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW); // active 3
      fixture.detectChanges();
      expect(testComponent.values()).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();

      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
      await sleep(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should key nav disabled option correct', async () => {
      testComponent.nzOptions.set(options2);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
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
    });

    it('should ignore keyboardEvent on some key', async () => {
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
        expect(testComponent.cascader.menuOpen()).toBe(false);
        dispatchKeyboardEvent(cascader.nativeElement, 'keydown', key);
        fixture.detectChanges();
        expect(testComponent.cascader.menuOpen()).toBe(false);
      });
    });

    it('should expand option on hover', async () => {
      testComponent.nzExpandTrigger.set('hover');
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0); // 0 column
      expect(testComponent.values()).toBeNull(); // not select yet

      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values()).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl1, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values()).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl1, 'mouseleave');
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(2);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values()).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl2, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(getAllColumns().length).toBe(3);
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values()).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl2, 'mouseleave');
      await sleep(MOUSE_EVENT_DELAY);
      expect(getAllColumns().length).toBe(3);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values()).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl3, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(getAllColumns().length).toBe(3);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values()).toBeNull(); // not select yet

      itemEl3.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);

      await sleep(MOUSE_EVENT_DELAY);
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should not expand disabled option on hover', async () => {
      testComponent.nzExpandTrigger.set('hover');
      testComponent.nzOptions.set(options2);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.values()).toBeNull(); // not select yet

      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values()).toBeNull(); // not select yet

      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl2, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(1);

      dispatchMouseEvent(itemEl2, 'mouseleave');
      await sleep(MOUSE_EVENT_DELAY);
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(1);
    });

    // fix #3914
    it('should drop selected items and columns if a leaf node is hovered', async () => {
      testComponent.nzExpandTrigger.set('hover');
      fixture.detectChanges();

      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      testComponent.cascader.setMenuOpen(true); // Open cascader dropdown.
      await sleep(MOUSE_EVENT_DELAY);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3);

      const c2i2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement;
      dispatchMouseEvent(c2i2, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2);
    });

    it('should change on select work', async () => {
      testComponent.nzChangeOnSelect.set(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.values()).toBeNull(); // not select yet

      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values()).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl1.click();
      fixture.detectChanges();

      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(2);

      const value = testComponent.values();
      expect(value![0]).toBe('zhejiang');

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      fixture.detectChanges();

      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(3);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou']);

      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl3.click();
      await sleep(MOUSE_EVENT_DELAY);

      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should not change on hover work', async () => {
      testComponent.nzChangeOnSelect.set(true);
      testComponent.nzExpandTrigger.set('hover');
      fixture.detectChanges();
      expect(testComponent.values()).toBeNull();
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.values()).toBeNull(); // not select yet

      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values()).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl1, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values()).toBeNull(); // mouseenter does not trigger selection

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl2, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(3);
      expect(testComponent.values()).toBeNull(); // mouseenter does not trigger selection

      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl3, 'mouseenter');
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.values()).toBeNull(); // mouseenter does not trigger selection

      itemEl3.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']); // click trigger selection
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should change on function work', async () => {
      testComponent.nzChangeOn.set(testComponent.fakeChangeOn);
      fixture.detectChanges();
      expect(testComponent.values()).toBeNull();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values()).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      fixture.detectChanges();
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(testComponent.values()).toBeNull(); // not select yet

      itemEl1.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.values()).toEqual(['zhejiang']);
    });

    it('should support search', async () => {
      fixture.detectChanges();
      testComponent.nzShowSearch.set(true);
      fixture.detectChanges();
      const spy = spyOn(testComponent.cascader, 'focus');
      cascader.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    });

    it('should searching could be aborted', async () => {
      testComponent.values.set(['zhengjiang', 'hangzhou', 'xihu']);
      testComponent.nzShowSearch.set(true);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      await fixture.whenStable();

      // input search value
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      // clear search value
      testComponent.cascader.inputValue = '';
      await updateNonSignalsInput(fixture, 10);
      fixture.detectChanges();
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.cascader.inSearchingMode).toBe(false);

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang');
    });

    it('should clear input value when searching cancel', async () => {
      testComponent.values.set(['zhengjiang', 'hangzhou', 'xihu']);
      testComponent.nzShowSearch.set(true);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      await updateNonSignalsInput(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESCAPE);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values()).toEqual(['zhengjiang', 'hangzhou', 'xihu']);
    });

    it('should support nzLabelProperty', async () => {
      testComponent.nzShowSearch.set(true);
      testComponent.nzLabelProperty.set('l');
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang New / Hangzhou New / West Lake New');

      itemEl1.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    });

    it('should support nzValueProperty', async () => {
      testComponent.nzShowSearch.set(true);
      testComponent.nzValueProperty.set('v');
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values()).toEqual(['zhejiang-new', 'hangzhou-new', 'xihu-new']);
    });

    it('should support custom filter', async () => {
      testComponent.nzShowSearch.set({
        filter(inputValue: string, path: NzCascaderOption[]): boolean {
          return path.some(p => p.label!.indexOf(inputValue) !== -1);
        }
      } as NzShowSearchOptions);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    });

    it('should support custom sorter', async () => {
      testComponent.nzShowSearch.set({
        sorter(a: NzCascaderOption[], b: NzCascaderOption[], _inputValue: string): number {
          const l1 = a[0].label;
          const l2 = b[0].label; // all reversed, just to be sure it works
          return `${l1}`.localeCompare(l2!);
        }
      } as NzShowSearchOptions);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Jiangsu / Nanjing / Zhong Hua Men');

      itemEl1.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values()).toEqual(['jiangsu', 'nanjing', 'zhonghuamen']);
    });

    it('should forbid disabled search options to be clicked', async () => {
      testComponent.nzOptions.set(options4);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.cascaderService.columns[0][0].isDisabled).toBe(true);

      itemEl1.click();
      await sleep(MOUSE_EVENT_DELAY);
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.cascader.inputValue).toBe('o');
    });

    it('should pass disabled property to children when searching', () => {
      testComponent.nzOptions.set(options4);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      expect(testComponent.cascader.cascaderService.columns[0][0].isDisabled).toBe(true);
      expect(testComponent.cascader.cascaderService.columns[0][1].isDisabled).toBe(false);
      expect(testComponent.cascader.cascaderService.columns[0][2].isDisabled).toBe(true);
    });

    it('should support arrow in search mode', async () => {
      testComponent.nzOptions.set(options2);
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      const itemEl4 = getItemAtColumnAndRow(1, 4)!;
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl4.classList).toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      expect(testComponent.values()).toEqual(['option1', 'option14']);
    });

    it('should not preventDefault left/right arrow in search mode', () => {
      fixture.detectChanges();
      testComponent.nzShowSearch.set(true);
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
    });

    it('should not preventDefault BACKSPACE in search mode', async () => {
      testComponent.nzShowSearch.set(true);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      const event = dispatchKeyboardEvent(cascader.nativeElement, 'keydown', BACKSPACE);
      testComponent.cascader.inputValue = '';
      await updateNonSignalsInput(fixture, 0);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(event.defaultPrevented).toBe(false);
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl1.innerText).toBe('Zhejiang');
      expect(testComponent.cascader.inputValue).toBe('');
    });

    it('should support search a root node have no children ', async () => {
      fixture.detectChanges();
      testComponent.nzShowSearch.set(true);
      testComponent.nzOptions.set(options5);
      fixture.detectChanges();
      const spy = spyOn(testComponent.cascader, 'focus');
      cascader.nativeElement.click();
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
      testComponent.cascader.inputValue = 'Roo';
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText.trim()).toBe('暂无数据');
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
    });

    it('should re-prepare search results when nzOptions change', () => {
      fixture.detectChanges();
      testComponent.nzShowSearch.set(true);
      cascader.nativeElement.click();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      testComponent.nzOptions.set(options2);
      fixture.detectChanges();
      expect(testComponent.cascader.inSearchingMode).toBe(true);

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Option1 / Option11');
    });

    it('should nzPrefix work', () => {
      testComponent.nzPrefix.set('prefix');
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('prefix');
    });

    it('should support changing icon', () => {
      testComponent.nzSuffixIcon.set('home');
      testComponent.nzExpandIcon.set('home');

      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1);
      expect(itemEl1?.querySelector('.anticon-home')).toBeTruthy();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow .anticon')!.classList).toContain('anticon-home');
    });

    it('should nzPlacement works', async () => {
      testComponent.cascader.setMenuOpen(true);
      let element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      const setNzPlacement = async (placement: NzCascaderPlacement): Promise<void> => {
        testComponent.cascader.setMenuOpen(false);
        testComponent.nzPlacement.set(placement);
        testComponent.cascader.setMenuOpen(true);
        await fixture.whenStable();
      };

      await setNzPlacement('bottomRight');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      await setNzPlacement('topLeft');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      await setNzPlacement('topRight');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(true);
    });

    it('should cascade work when the value of ngModel that is not existed in options', () => {
      testComponent.values.set(['zhejiang', 'a']);
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      getItemAtColumnAndRow(1, 1)!.click();
      getItemAtColumnAndRow(2, 1)!.click();
      getItemAtColumnAndRow(3, 1)!.click();
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    });

    it('should display activated column correctly after clicking outside and reopen', async () => {
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      // First open - should display activated columns correctly
      testComponent.cascader.setMenuOpen(true);
      await fixture.whenStable();
      expect(getAllColumns().length).toBe(3);

      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      let itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');

      // Click first column option (zhejiang) - should fold the third column
      itemEl1.click();
      await fixture.whenStable();
      expect(getAllColumns().length).toBe(2);

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3).toBeNull();

      // Click outside to close menu - value should remain unchanged
      dispatchFakeEvent(document.body, 'click');
      await fixture.whenStable();
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);

      // Reopen menu - should display activated columns correctly based on current value
      testComponent.cascader.setMenuOpen(true);
      await fixture.whenStable();
      expect(getAllColumns().length).toBe(3);
      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');
    });

    describe('should nzOpen works', () => {
      beforeEach(async () => {
        testComponent.nzOpen.set(true);
        await fixture.whenStable();
      });

      it('should nzOpen can control the visibility of menu', async () => {
        expect(testComponent.cascader.menuOpen()).toBe(true);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
        testComponent.nzOpen.set(false);
        await fixture.whenStable();
        expect(testComponent.cascader.menuOpen()).toBe(false);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);
      });

      it('should not hide menu by click leaf option or outside place when nzOpen is true', async () => {
        expect(testComponent.cascader.menuOpen()).toBe(true);
        getItemAtColumnAndRow(1, 1)!.click();
        getItemAtColumnAndRow(2, 1)!.click();
        getItemAtColumnAndRow(3, 1)!.click(); // zhejiang, hangzhou, xihu
        await fixture.whenStable();
        expect(testComponent.onValueChanges).toHaveBeenCalled();
        expect(testComponent.cascader.menuOpen()).toBe(true);
        spyOn(testComponent.cascader, 'onClickOutside');
        dispatchFakeEvent(document.body, 'click');
        expect(testComponent.cascader.onClickOutside).toHaveBeenCalled();
        expect(testComponent.cascader.menuOpen()).toBe(true);
      });

      it('should not hide menu by clear options under multiple mode when nzOpen is true', async () => {
        testComponent.nzMultiple.set(true);
        fixture.detectChanges();
        getItemAtColumnAndRow(1, 1)!.click();
        getItemAtColumnAndRow(2, 1)!.click();
        getItemAtColumnAndRow(3, 1)!.click(); // zhejiang, hangzhou, xihu
        getItemAtColumnAndRow(1, 2)!.click();
        getItemAtColumnAndRow(2, 1)!.click();
        getItemAtColumnAndRow(3, 1)!.click(); // jiangsu, nanjing, zhonghuamen
        expect(testComponent.values()).toEqual([['zhejiang', 'hangzhou'], ['jiangsu']]);
        expect(testComponent.cascader.menuOpen()).toBe(true);

        spyOn(testComponent.cascader, 'clearSelection');
        expect(cascader.nativeElement.querySelector('.ant-select-clear .anticon')).toBeDefined();
        cascader.nativeElement.querySelector('.ant-select-clear .anticon').click();
        expect(cascader.componentInstance.clearSelection).toHaveBeenCalled();
        expect(testComponent.cascader.menuOpen()).toBe(true);
      });

      it('should still emit nzOpenChange event when user click outside / option / cascader self', async () => {
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
        expect(testComponent.cascader.menuOpen()).toBe(true);
        cascader.nativeElement.click();
        await sleep(200);
        await fixture.whenStable();
        expect(testComponent.cascader.menuOpen()).toBe(true);
        expect(testComponent.onOpenChange).toHaveBeenCalledWith(false);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);

        getItemAtColumnAndRow(1, 1)!.click();
        fixture.detectChanges();
        getItemAtColumnAndRow(2, 1)!.click();
        fixture.detectChanges();
        getItemAtColumnAndRow(3, 1)!.click();
        await sleep(200);
        await fixture.whenStable();
        expect(testComponent.cascader.menuOpen()).toBe(true);
        expect(testComponent.onOpenChange).toHaveBeenCalledWith(false);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(3);

        dispatchFakeEvent(document.body, 'click');
        await fixture.whenStable();
        expect(testComponent.cascader.menuOpen()).toBe(true);
        expect(testComponent.onOpenChange).toHaveBeenCalledWith(false);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(4);
      });
    });
  });

  describe('multiple', () => {
    let fixture: ComponentFixture<NzDemoCascaderMultipleComponent>;
    let cascader: DebugElement;
    let testComponent: NzDemoCascaderMultipleComponent;

    function setValues(len = 10): void {
      const option = testComponent.nzOptions[0];
      testComponent.values.set(option.children!.slice(0, len).map(o => [option.value, o.value]));
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

    it('should maxTagCount work', async () => {
      // not exceed
      setValues(3);
      await updateNonSignalsInput(fixture);
      let tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(3);

      // exceed maxTagCount
      setValues(10);
      await updateNonSignalsInput(fixture);
      tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(4); // maxTagCount + 1
    });

    it('should remove item work', async () => {
      setValues(4);
      await updateNonSignalsInput(fixture);
      const removeBtn = cascader.queryAll(By.css('.ant-select-selection-item-remove'))[2];
      removeBtn.nativeElement.click();
      const tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(3);
    });

    it('should check state conduct up and down', async () => {
      cascader.componentInstance.setMenuOpen(true);
      await updateNonSignalsInput(fixture);

      // firstly, expand all columns (for convenience)
      getItemAtColumnAndRow(1, 2)!.click();
      await updateNonSignalsInput(fixture);
      getItemAtColumnAndRow(2, 1)!.click();
      await updateNonSignalsInput(fixture);

      const rootEl = getCheckboxAtColumnAndRow(1, 2)!;
      const parentEl = getCheckboxAtColumnAndRow(2, 1)!;
      const children = getCheckboxesAtColumn(3).filter(c => !c.classList.contains('ant-cascader-checkbox-disabled'));

      // check parent option
      parentEl.click();
      await updateNonSignalsInput(fixture);
      expect(parentEl.classList).toContain('ant-cascader-checkbox-checked');
      // Conduct Down: then all children should be checked
      expect(children.every(c => c.classList.contains('ant-cascader-checkbox-checked'))).toBe(true);
      // Conduct Up: and its parent should be checked too
      expect(rootEl.classList).toContain('ant-cascader-checkbox-checked');

      // uncheck a child option
      children[0]!.click();
      await updateNonSignalsInput(fixture);
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
    });

    it('should click checkbox not set option activated', async () => {
      cascader.componentInstance.setMenuOpen(true);
      await fixture.whenStable();

      const option = getItemAtColumnAndRow(1, 1)!;
      const checkbox = getCheckboxAtColumnAndRow(1, 1)!;
      expect(option.classList).not.toContain('ant-cascader-menu-item-active');

      checkbox.click();
      fixture.detectChanges();

      expect(option.classList).not.toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).toContain('ant-cascader-checkbox-checked');
    });

    it('should change check state when click leaf node', async () => {
      cascader.componentInstance.setMenuOpen(true);
      await fixture.whenStable();

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
    });

    it('should change check state trigger ngModelChange', async () => {
      spyOn(testComponent, 'onChanges');
      expect(testComponent.onChanges).not.toHaveBeenCalled();
      cascader.componentInstance.setMenuOpen(true);
      await fixture.whenStable();
      expect(testComponent.onChanges).not.toHaveBeenCalled();

      const checkbox = getCheckboxAtColumnAndRow(1, 1)!;
      checkbox.click();
      fixture.detectChanges();
      expect(testComponent.onChanges).toHaveBeenCalledWith([['light']]);
    });

    it('should support ENTER key to toggle option checked state in multiple mode', async () => {
      cascader.componentInstance.setMenuOpen(true);
      await fixture.whenStable();
      getItemAtColumnAndRow(1, 1)!.click();
      fixture.detectChanges();
      const optionEl = getItemAtColumnAndRow(2, 1)!;
      const checkboxEl = getCheckboxAtColumnAndRow(2, 1)!;
      // Initially, the option should not be checked
      expect(checkboxEl.classList).not.toContain('ant-cascader-checkbox-checked');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(optionEl.classList).toContain('ant-cascader-menu-item-active');
      // Press ENTER to toggle the option checked state
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      // The option should now be checked
      expect(checkboxEl.classList).toContain('ant-cascader-checkbox-checked');
      // Press ENTER again to toggle the option unchecked state
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      fixture.detectChanges();
      // The option should now be unchecked
      expect(checkboxEl.classList).not.toContain('ant-cascader-checkbox-checked');
    });

    it('should not activate option with isDisableCheckbox by pressing RIGHT ARROW key', async () => {
      cascader.componentInstance.setMenuOpen(true);
      await fixture.whenStable();
      getItemAtColumnAndRow(1, 2)!.click();
      fixture.detectChanges();
      getItemAtColumnAndRow(2, 1)!.click();
      fixture.detectChanges();
      // Try to navigate to a disabled checkbox option using keyboard
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      // The option with disableCheckbox should not be activatable via keyboard
      expect(getItemAtColumnAndRow(3, 1)!.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getCheckboxAtColumnAndRow(3, 1)!.classList).toContain('ant-cascader-checkbox-disabled');
      // activate item (3, 2)
      expect(getItemAtColumnAndRow(3, 2)!.classList).toContain('ant-cascader-menu-item-active');
      expect(getCheckboxAtColumnAndRow(3, 2)!.classList).not.toContain('ant-cascader-checkbox-disabled');
    });

    it('should not activate option with isDisableCheckbox in moveUpOrDown method', async () => {
      cascader.componentInstance.setMenuOpen(true);
      await fixture.whenStable();
      getItemAtColumnAndRow(1, 2)!.click();
      fixture.detectChanges();
      getItemAtColumnAndRow(2, 1)!.click();
      fixture.detectChanges();
      getItemAtColumnAndRow(3, 2)!.click();
      fixture.detectChanges();
      expect(getItemAtColumnAndRow(3, 2)!.classList).toContain('ant-cascader-menu-item-active');
      // Up key
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      // The option with disableCheckbox should not be activatable via keyboard
      expect(getItemAtColumnAndRow(3, 1)!.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getItemAtColumnAndRow(3, 2)!.classList).toContain('ant-cascader-menu-item-active');
    });

    describe('should cascade work when the value of ngModel includes nodes that are not existed in options', () => {
      it('should remove item work', async () => {
        setValues(2);
        testComponent.values.update(values => [['light', 'a'], ...values.slice(1)]);
        await updateNonSignalsInput(fixture);
        fixture.detectChanges();
        const removeBtn = cascader.queryAll(By.css('.ant-select-selection-item-remove'))[0];
        removeBtn.nativeElement.click();
        fixture.detectChanges();
        const tags = cascader.queryAll(By.directive(NzSelectItemComponent));
        expect(tags.length).toBe(1);
      });

      it('should add item work', async () => {
        spyOn(testComponent, 'onChanges');
        setValues(2);
        testComponent.values.update(values => [['light', 'a'], ...values.slice(1)]);
        await updateNonSignalsInput(fixture);
        fixture.detectChanges();
        cascader.componentInstance.setMenuOpen(true);
        fixture.detectChanges();
        const checkbox = getCheckboxAtColumnAndRow(2, 3)!;
        checkbox.click();
        fixture.detectChanges();
        expect(testComponent.values().length).toBe(3);
        const selectedNodes = [
          ['light', 1],
          ['light', 'a'],
          ['light', 2]
        ];
        expect(testComponent.values()).toEqual(selectedNodes);
        expect(testComponent.onChanges).toHaveBeenCalledWith(selectedNodes);
      });
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

    it('should nzLoadData work', async () => {
      spyOn(testComponent, 'addCallTimes');

      fixture.detectChanges();
      expect(testComponent.values()).toBeNull();
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.values()).toBeNull(); // not select yet
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(0);

      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(1);

      await sleep(600); // wait for first row to load finish
      fixture.detectChanges();
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values()).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl1.click();
      await sleep(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(2);
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values()).toBeNull(); // not select yet

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      await sleep(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3);
      expect(getAllColumns().length).toBe(3);
      expect(testComponent.values()).toBeNull(); // not select yet

      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl3.click();
      await sleep(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(4);
      expect(testComponent.values()).toBeNull(); // not select yet

      itemEl3.click(); // re-click again, this time it is a leaf
      await sleep(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(4);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    });

    it('should nzLoadData work when specifies default value', async () => {
      spyOn(testComponent, 'addCallTimes');
      testComponent.values.set(['zhejiang', 'hangzhou', 'xihu']);
      await sleep(3000);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(3);
      expect(testComponent.values()).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    });

    it('should not emit error after clear search and reopen it', async () => {
      fixture.detectChanges();
      testComponent.cascader.setMenuOpen(true);
      await sleep(1000); // wait for first row to load finish
      fixture.detectChanges();
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;

      itemEl1.click();
      await sleep(600);
      fixture.detectChanges();
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;

      itemEl2.click();
      await sleep(600);
      fixture.detectChanges();
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;

      itemEl3.click();
      await sleep(600);
      fixture.detectChanges();

      itemEl3.click(); // re-click again, this time it is a leaf
      await sleep(600);
      fixture.detectChanges();
      cascader.nativeElement.querySelector('.ant-select-clear .anticon').click();
      testComponent.cascader.setMenuOpen(true);
      fixture.detectChanges();
      expect(testComponent.values()).toEqual([]);
    });
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

      fixture.componentInstance.status.set('warning');
      fixture.detectChanges();
      expect(cascader.nativeElement.className).toContain('ant-select-status-warning');

      fixture.componentInstance.status.set('');
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

testDirectionality(() => NzDemoCascaderDefaultComponent, By.directive(NzCascaderComponent), 'ant-select', {
  providers: [provideNzIconsTesting(), provideNzNoAnimation()]
});

describe('cascader RTL behavior', () => {
  let overlayContainerElement: HTMLElement;
  let fixture: ComponentFixture<NzDemoCascaderDefaultComponent>;
  let cascader: DebugElement;
  let testComponent: NzDemoCascaderDefaultComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockDirectionality()]
    });
    const dir = TestBed.inject(Directionality);
    dir.valueSignal.set('rtl');
    overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
    testComponent = fixture.debugElement.componentInstance;
    cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
  });

  it('should menu class work', async () => {
    fixture.detectChanges();
    cascader.nativeElement.click();
    await sleep(MOUSE_EVENT_DELAY);
    fixture.detectChanges();
    expect(overlayContainerElement.querySelector('.ant-cascader-menus')!.classList).toContain('ant-cascader-rtl');
  });

  it('should pressing the left and right keys can correctly expand and collapse content', async () => {
    testComponent.nzOptions.set(options3);
    testComponent.cascader.setMenuOpen(true);
    fixture.detectChanges();
    dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
    dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
    fixture.detectChanges();
    const zhejiangItemEl = overlayContainerElement
      .querySelectorAll('.ant-cascader-menu')[0]
      ?.querySelectorAll('.ant-cascader-menu-item')[0];
    const hangzhouItemEl = overlayContainerElement
      .querySelectorAll('.ant-cascader-menu')[1]
      ?.querySelectorAll('.ant-cascader-menu-item')[0];
    expect(zhejiangItemEl!.classList).toContain('ant-cascader-menu-item-active');
    expect(hangzhouItemEl!.classList).toContain('ant-cascader-menu-item-active');
    dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
    fixture.detectChanges();
    expect(hangzhouItemEl!.classList).not.toContain('ant-cascader-menu-item-active');
    expect(zhejiangItemEl!.classList).toContain('ant-cascader-menu-item-active');
  });
});

describe('nzPopupRender', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNzNoAnimation()]
    });
  });

  beforeEach(
    testingInject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
      overlayContainer = currentOverlayContainer;
      overlayContainerElement = currentOverlayContainer.getContainerElement();
    })
  );

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  it('should render custom footer when nzPopupRender is provided', async () => {
    const fixture = TestBed.createComponent(NzDemoCascaderPopupRenderComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.cascader.setMenuOpen(true);
    const customFooter = overlayContainerElement.querySelector('.custom-footer');
    expect(customFooter).toBeTruthy();
    expect(customFooter?.textContent).toBe('Custom Footer');

    const menu = overlayContainerElement.querySelector('.ant-cascader-menus');
    expect(menu).toBeTruthy();
  });

  it('should render default menu when nzPopupRender is not provided', async () => {
    const fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
    const component = fixture.componentInstance;
    fixture.detectChanges();

    component.cascader.setMenuOpen(true);
    const menu = overlayContainerElement.querySelector('.ant-cascader-menus');
    expect(menu).toBeTruthy();

    const customFooter = overlayContainerElement.querySelector('.custom-footer');
    expect(customFooter).toBeFalsy();
  });
});

describe('finalSize', () => {
  let fixture: ComponentFixture<NzDemoCascaderDefaultComponent>;
  let cascaderElement: HTMLElement;
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
    fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.detectChanges();
    formSizeSignal.set('large');
    fixture.detectChanges();
    expect(cascaderElement.classList).toContain('ant-select-lg');
  });

  it('should set correctly the size from the compactSize signal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }]
    });
    fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.detectChanges();
    expect(cascaderElement.classList).toContain('ant-select-lg');
  });

  it('should set correctly the size from the component input', () => {
    fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.componentInstance.nzSize.set('large');
    fixture.detectChanges();
    expect(cascaderElement.classList).toContain('ant-select-lg');
  });
});

describe('finalVariant', () => {
  let fixture: ComponentFixture<TestCascaderFinalVariantComponent>;
  let cascaderElement: HTMLElement;
  let formVariantSignal: WritableSignal<NzVariant>;

  beforeEach(() => {
    formVariantSignal = signal<NzVariant>('outlined');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should use formVariant when nzVariant is not set (default)', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestCascaderFinalVariantComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(cascaderElement.classList).toContain('ant-select-filled');
  });

  it('should use nzVariant over formVariant when nzVariant is explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestCascaderFinalVariantComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.componentInstance.variant.set('borderless');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(cascaderElement.classList).toContain('ant-select-borderless');
    expect(cascaderElement.classList).not.toContain('ant-select-filled');
  });

  it('should use nzVariant when no formVariant is provided', () => {
    fixture = TestBed.createComponent(TestCascaderFinalVariantComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.componentInstance.variant.set('filled');
    fixture.detectChanges();
    expect(cascaderElement.classList).toContain('ant-select-filled');
  });

  it('should use outlined as default when neither nzVariant nor formVariant is provided', () => {
    fixture = TestBed.createComponent(TestCascaderFinalVariantComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.detectChanges();
    expect(cascaderElement.classList).not.toContain('ant-select-filled');
    expect(cascaderElement.classList).not.toContain('ant-select-borderless');
    expect(cascaderElement.classList).not.toContain('ant-select-underlined');
  });

  it('should use explicitly set outlined over formVariant', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestCascaderFinalVariantComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.componentInstance.variant.set('outlined');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(cascaderElement.classList).not.toContain('ant-select-filled');
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

function options1(): NzCascaderOption[] {
  return [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      v: 'zhejiang-new',
      l: 'Zhejiang New',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          v: 'hangzhou-new',
          l: 'Hangzhou New',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
              v: 'xihu-new',
              l: 'West Lake New',
              isLeaf: true
            }
          ]
        },
        {
          value: 'ningbo',
          label: 'Ningbo',
          v: 'ningbo-new',
          l: 'Ningbo New',
          isLeaf: true
        }
      ]
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      v: 'jiangsu-new',
      l: 'Jiangsu New',
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          v: 'nanjing-new',
          l: 'Nanjing New',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
              v: 'zhonghuamen-new',
              l: 'Zhong Hua Men New',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];
}

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
      [ngModel]="values()"
      (ngModelChange)="values.set($event); onValueChanges($event)"
      [nzOpen]="nzOpen()"
      [nzOptions]="nzOptions()"
      [nzAllowClear]="nzAllowClear()"
      [nzAutoFocus]="nzAutoFocus()"
      [nzChangeOn]="nzChangeOn()"
      [nzChangeOnSelect]="nzChangeOnSelect()"
      [nzColumnClassName]="nzColumnClassName"
      [nzDisabled]="nzDisabled()"
      [nzExpandIcon]="nzExpandIcon()"
      [nzExpandTrigger]="nzExpandTrigger()"
      [nzLabelProperty]="nzLabelProperty()"
      [nzValueProperty]="nzValueProperty()"
      [nzLabelRender]="nzLabelRender()"
      [nzMenuClassName]="nzMenuClassName"
      [nzMenuStyle]="nzMenuStyle"
      [nzMultiple]="nzMultiple()"
      [nzMouseEnterDelay]="nzMouseEnterDelay()"
      [nzMouseLeaveDelay]="nzMouseLeaveDelay()"
      [nzPlaceHolder]="nzPlaceHolder()"
      [nzShowArrow]="nzShowArrow()"
      [nzShowInput]="nzShowInput()"
      [nzShowSearch]="nzShowSearch()"
      [nzSize]="nzSize()"
      [nzTriggerAction]="nzTriggerAction()"
      [nzPrefix]="nzPrefix()"
      [nzSuffixIcon]="nzSuffixIcon()"
      [nzBackdrop]="nzBackdrop()"
      [nzPlacement]="nzPlacement()"
      [nzVariant]="nzVariant()"
      (nzOpenChange)="onOpenChange($event)"
      (nzClear)="onClear()"
    />

    <ng-template #renderTpl let-labels="labels">
      @for (label of labels; track $index) {
        {{ label }}{{ $last ? '' : ' | ' }}
      }
    </ng-template>
  `
})
export class NzDemoCascaderDefaultComponent {
  @ViewChild(NzCascaderComponent, { static: true }) cascader!: NzCascaderComponent;
  @ViewChild('renderTpl', { static: true }) renderTpl!: TemplateRef<NzSafeAny>;

  readonly nzOptions = signal<NzSafeAny[] | null>(options1());
  readonly values = signal<string[] | string[][] | number[] | null>(null);

  readonly nzOpen = signal<boolean | undefined>(undefined);
  readonly nzMultiple = signal(false);
  readonly nzAllowClear = signal(true);
  readonly nzAutoFocus = signal(false);
  nzMenuClassName = 'menu-classA menu-classB';
  nzColumnClassName = 'column-classA column-classB';
  nzMenuStyle = { height: '120px' };
  readonly nzExpandTrigger = signal<NzCascaderExpandTrigger>('click');
  readonly nzDisabled = signal(false);
  readonly nzLabelProperty = signal<string>('label');
  readonly nzValueProperty = signal<string>('value');
  readonly nzPlaceHolder = signal('please select');
  readonly nzShowArrow = signal(true);
  readonly nzShowInput = signal(true);
  readonly nzShowSearch = signal<boolean | NzShowSearchOptions>(false);
  readonly nzSize = signal<NzCascaderSize>('default');
  readonly nzLabelRender = signal<TemplateRef<NzSafeAny> | null>(null);
  readonly nzChangeOn = signal<NzSafeAny>(null);
  readonly nzChangeOnSelect = signal(false);
  readonly nzTriggerAction = signal<NzCascaderTriggerType | NzCascaderTriggerType[]>('click');
  readonly nzMouseEnterDelay = signal(150);
  readonly nzMouseLeaveDelay = signal(150);
  readonly nzPrefix = signal<string | null>(null);
  readonly nzSuffixIcon = signal('down');
  readonly nzExpandIcon = signal('right');
  readonly nzBackdrop = signal(false);
  readonly nzPlacement = signal<NzCascaderPlacement>('bottomLeft');
  readonly nzVariant = signal<NzVariant>('outlined');

  onOpenChange = jasmine.createSpy<(open: boolean) => void>('open change');
  onValueChanges = jasmine.createSpy('value change');
  onClear(): void {}
  fakeChangeOn = (node: NzSafeAny, _index: number): boolean => node.value === 'zhejiang';
}

@Component({
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader
      [ngModel]="values()"
      (ngModelChange)="values.set($event); onValueChanges($event)"
      [nzLoadData]="nzLoadData"
      (nzOpenChange)="onOpenChange($event)"
    />
  `
})
export class NzDemoCascaderLoadDataComponent {
  @ViewChild(NzCascaderComponent, { static: true }) cascader!: NzCascaderComponent;

  readonly values = signal<string[] | null>(null);

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
  onOpenChange = jasmine.createSpy<(open: boolean) => void>('open change');
  onValueChanges = jasmine.createSpy('value change');
}

@Component({
  imports: [FormsModule, NzCascaderModule],
  template: `<nz-cascader [nzOptions]="nzOptions" [nzStatus]="status()" />`
})
export class NzDemoCascaderStatusComponent {
  nzOptions: NzSafeAny[] | null = options1();
  readonly status = signal<NzStatus>('error');
}

@Component({
  imports: [ReactiveFormsModule, NzFormModule, NzCascaderModule],
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-form-item>
        <nz-form-control nzHasFeedback>
          <nz-cascader formControlName="demo" [nzOptions]="nzOptions" />
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
  nzOptions: NzSafeAny[] | null = options1();
}

@Component({
  imports: [NzCascaderModule],
  template: `<nz-cascader [nzVariant]="variant()" />`
})
export class TestCascaderFinalVariantComponent {
  readonly variant = signal<NzVariant | undefined>(undefined);
}

@Component({
  imports: [CommonModule, FormsModule, NzCascaderModule],
  template: `
    <nz-cascader [nzOptions]="nzOptions" [nzPopupRender]="popupRenderTpl" [(ngModel)]="values" />

    <ng-template #popupRenderTpl let-menu>
      <ng-container [ngTemplateOutlet]="menu" />
      <div class="custom-footer">Custom Footer</div>
    </ng-template>
  `
})
export class NzDemoCascaderPopupRenderComponent {
  @ViewChild(NzCascaderComponent, { static: true }) cascader!: NzCascaderComponent;
  nzOptions: NzSafeAny[] = options1();
  values: string[] | null = null;
}
