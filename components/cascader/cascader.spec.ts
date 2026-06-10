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

function markForCheckAndDetectChanges<T>(fixture: ComponentFixture<T>): void {
  fixture.debugElement.injector.get(ChangeDetectorRef).markForCheck();
  fixture.detectChanges();
}

async function waitForChanges<T>(fixture: ComponentFixture<T>, ms?: number): Promise<void> {
  if (typeof ms === 'number') {
    await sleep(ms);
  }
  await fixture.whenStable();
  markForCheckAndDetectChanges(fixture);
}

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
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.className).toContain('ant-cascader ant-select');
    });

    it('should have input', () => {
      markForCheckAndDetectChanges(fixture);
      expect(getInputEl()).toBeDefined();
      expect(getPlaceholder()).toBe('please select');
    });

    it('should input change event stopPropagation', () => {
      markForCheckAndDetectChanges(fixture);
      const fakeInputChangeEvent = createFakeEvent('change', true, true);
      spyOn(fakeInputChangeEvent, 'stopPropagation');
      getInputEl().dispatchEvent(fakeInputChangeEvent);
      markForCheckAndDetectChanges(fixture);
      expect(fakeInputChangeEvent.stopPropagation).toHaveBeenCalled();
    });

    it('should not have EMPTY label', () => {
      markForCheckAndDetectChanges(fixture);
      const label: HTMLElement = cascader.nativeElement.querySelector('.ant-select-selection-item');
      expect(label).toBeNull();
    });

    it('should placeholder work', () => {
      const placeholder = 'placeholder test';
      testComponent.nzPlaceHolder = placeholder;
      markForCheckAndDetectChanges(fixture);
      expect(getPlaceholder()).toBe(placeholder);
    });

    it('should show/hide placeholder when trigger compositionstart/compositionend event', () => {
      testComponent.nzPlaceHolder = 'placeholder test';
      markForCheckAndDetectChanges(fixture);

      const placeholderElement = cascader.nativeElement.querySelector('.ant-select-selection-placeholder');
      const fakeCompositionstartEvent = createFakeEvent('compositionstart', true, true);
      getInputEl().dispatchEvent(fakeCompositionstartEvent);
      markForCheckAndDetectChanges(fixture);
      expect(placeholderElement.style.display).toBe('none');

      const fakeCompositionendEvent = createFakeEvent('compositionend', true, true);
      getInputEl().dispatchEvent(fakeCompositionendEvent);
      markForCheckAndDetectChanges(fixture);
      expect(placeholderElement.style.display).toBe('block');
    });

    it('should size work', () => {
      testComponent.nzSize = 'small';
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-sm');
      testComponent.nzSize = 'large';
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-lg');
    });

    it('should value and label property work', async () => {
      testComponent.nzOptions = ID_NAME_LIST;
      testComponent.nzValueProperty = 'id';
      testComponent.nzLabelProperty = 'name';
      markForCheckAndDetectChanges(fixture);
      // label will not show if no item selected
      expect(getLabelElement()).toBeNull();
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('');
      testComponent.values = [1, 2, 3];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('1,2,3');
    });

    it('should no value and label property work', async () => {
      testComponent.nzValueProperty = null!;
      testComponent.nzLabelProperty = null!;
      markForCheckAndDetectChanges(fixture);
      expect(getLabelElement()).toBeNull();
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('zhejiang,hangzhou,xihu');
    });

    it('should showArrow work', () => {
      testComponent.nzShowArrow = true;
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-arrow')).toBeDefined();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow .anticon').classList).toContain('anticon-down');
      testComponent.nzShowArrow = false;
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-arrow')).toBeNull();
    });

    it('should allowClear work', () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeDefined();
      testComponent.nzAllowClear = false;
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeNull();
    });

    describe('should variant works', () => {
      it('outlined', () => {
        testComponent.nzVariant = 'outlined';
        markForCheckAndDetectChanges(fixture);
        expect(cascader.nativeElement.classList).toContain('ant-select-outlined');
      });
      it('filled', () => {
        markForCheckAndDetectChanges(fixture);
        expect(cascader.nativeElement.classList).not.toContain('ant-select-filled');
        testComponent.nzVariant = 'filled';
        markForCheckAndDetectChanges(fixture);
        expect(cascader.nativeElement.classList).toContain('ant-select-filled');
      });
      it('borderless', () => {
        markForCheckAndDetectChanges(fixture);
        expect(cascader.nativeElement.classList).not.toContain('ant-select-borderless');
        testComponent.nzVariant = 'borderless';
        markForCheckAndDetectChanges(fixture);
        expect(cascader.nativeElement.classList).toContain('ant-select-borderless');
      });
      it('underlined', () => {
        markForCheckAndDetectChanges(fixture);
        expect(cascader.nativeElement.classList).not.toContain('ant-select-underlined');
        testComponent.nzVariant = 'underlined';
        markForCheckAndDetectChanges(fixture);
        expect(cascader.nativeElement.classList).toContain('ant-select-underlined');
      });
    });

    it('should open work', () => {
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).not.toContain('ant-select-open');
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-open');
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
      expect(testComponent.cascader.nzOptions).toEqual(options1());
    });

    it('should click toggle open', async () => {
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.nzDisabled).toBe(false);

      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);

      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should mouse hover toggle open', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.nzTriggerAction = 'hover';
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.nzDisabled).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);

      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should mouse hover toggle open immediately', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.nzTriggerAction = ['hover'];
      testComponent.nzMouseEnterDelay = 0;
      testComponent.nzMouseLeaveDelay = 0;
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);
    });

    it('should clear timer on option mouseenter and mouseleave', async () => {
      testComponent.nzExpandTrigger = 'hover';
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      const optionEl = getItemAtColumnAndRow(1, 1)!;
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(optionEl, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 10);
      markForCheckAndDetectChanges(fixture);
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(optionEl, 'mouseleave');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 400);
      markForCheckAndDetectChanges(fixture);
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(optionEl, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 400);
      markForCheckAndDetectChanges(fixture);
      expect(optionEl.classList).toContain('ant-cascader-menu-item-active');
    });

    it('should disabled work', async () => {
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).not.toContain('ant-select-disabled');
      testComponent.nzDisabled = true;
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-disabled');
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
    });

    it('should disabled state work', async () => {
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).not.toContain('ant-select-disabled');
      testComponent.cascader.setDisabledState(true);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-disabled');
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
    });

    it('should disabled mouse hover open', async () => {
      testComponent.nzTriggerAction = 'hover';
      testComponent.nzDisabled = true;
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.nzDisabled).toBe(true);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
      dispatchMouseEvent(cascader.nativeElement, 'mouseenter');
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);

      testComponent.nzDisabled = false;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.nzDisabled).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
      testComponent.nzDisabled = true;
      markForCheckAndDetectChanges(fixture);
      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
    });

    it('should mouse leave not work when menu not open', async () => {
      testComponent.nzTriggerAction = ['hover'];
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      dispatchMouseEvent(cascader.nativeElement, 'mouseleave');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.onOpenChange).toHaveBeenCalledTimes(0);
    });

    it('should clear value work', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.nzAllowClear = true;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      expect(testComponent.values!.length).toBe(3);
      markForCheckAndDetectChanges(fixture);
      spyOn(testComponent, 'onClear');
      cascader.nativeElement.querySelector('.ant-select-clear nz-icon').click();
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values!.length).toBe(0);
      expect(testComponent.onClear).toHaveBeenCalled();
    });

    it('should clear value work 2', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      expect(testComponent.values!.length).toBe(3);
      markForCheckAndDetectChanges(fixture);
      spyOn(testComponent, 'onClear');
      testComponent.cascader.clearSelection();
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values!.length).toBe(0);
      expect(testComponent.onClear).toHaveBeenCalled();
    });

    it('should autofocus work', () => {
      testComponent.nzShowInput = true;
      markForCheckAndDetectChanges(fixture);
      testComponent.nzAutoFocus = true;
      markForCheckAndDetectChanges(fixture);
      expect(getInputEl().getAttribute('autofocus')).toBe('autofocus');
      testComponent.nzAutoFocus = false;
      markForCheckAndDetectChanges(fixture);
      expect(getInputEl().getAttribute('autofocus')).toBe(null);
    });

    it('should input focus and blur work', async () => {
      const fakeInputFocusEvent = createFakeEvent('focus', false, true);
      const fakeInputBlurEvent = createFakeEvent('blur', false, true);

      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).not.toContain('ant-select-focused');
      getInputEl().dispatchEvent(fakeInputFocusEvent);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');
      getInputEl().dispatchEvent(fakeInputBlurEvent);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).not.toContain('ant-select-focused');

      testComponent.cascader.setMenuOpen(true);
      getInputEl().dispatchEvent(fakeInputFocusEvent);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');
      getInputEl().dispatchEvent(fakeInputBlurEvent);
      cascader.injector.get(ChangeDetectorRef).markForCheck();
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-focused');
    });

    it('should focus and blur function work', () => {
      testComponent.nzShowInput = true;
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      expect(getInputEl() === document.activeElement).toBe(false);
      testComponent.cascader.focus();
      markForCheckAndDetectChanges(fixture);
      expect(getInputEl() === document.activeElement).toBe(true);
      testComponent.cascader.blur();
      markForCheckAndDetectChanges(fixture);
      expect(getInputEl() === document.activeElement).toBe(false);
    });

    it('should focus and blur function work 2', () => {
      testComponent.nzShowInput = false;
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement === document.activeElement).toBe(false);
      testComponent.cascader.focus();
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement === document.activeElement).toBe(true);
      testComponent.cascader.blur();
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement === document.activeElement).toBe(false);
    });

    it('should menu class work', async () => {
      markForCheckAndDetectChanges(fixture);
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-cascader-menus')!.classList).toContain('menu-classA');
      expect(overlayContainerElement.querySelector('.ant-cascader-menu')!.classList).toContain('column-classA');
    });

    it('should menu style work', async () => {
      markForCheckAndDetectChanges(fixture);
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      const targetElement = overlayContainerElement.querySelector('.menu-classA') as HTMLElement;
      expect(targetElement.style.height).toBe('120px');
    });

    it('should show input false work', async () => {
      testComponent.nzShowInput = false;
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-selection-search-input')).toBeNull();
      testComponent.nzAllowClear = true;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-selection-search-input')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-select-clear')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
    });

    it('should create label work', async () => {
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
    });

    it('should label template work', async () => {
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-selection-item')).toBeNull();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.nzLabelRender = testComponent.renderTpl;
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText()).toBe('Zhejiang | Hangzhou | West Lake');
      // fix clear
      testComponent.cascader.clearSelection();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.nzLabelRender = testComponent.renderTpl;
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText()).toBe('Zhejiang | Hangzhou | West Lake');
    });

    it('should label template work on multiple', async () => {
      testComponent.nzMultiple = true;
      testComponent.values = [['zhejiang', 'hangzhou']];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText()).toBe('Zhejiang / Hangzhou');

      testComponent.values = [['jiangsu']]; // 'Jiangsu / Nanjing / Zhong Hua Men'
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText()).toBe('Jiangsu');

      testComponent.nzLabelRender = testComponent.renderTpl;
      testComponent.values = [['zhejiang', 'hangzhou']];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText().trim()).toBe('Zhejiang | Hangzhou');

      testComponent.values = [['jiangsu']]; // 'Jiangsu / Nanjing / Zhong Hua Men'
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getLabelText()).toBe('Jiangsu');
    });

    it('should write value work', async () => {
      const control = testComponent.cascader;
      testComponent.nzOptions = options1();
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(null);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(undefined);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue([]);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(0);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(1);
      control.writeValue('');
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(1);
      control.writeValue(['zhejiang']);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      control.writeValue(['zhejiang', 'hangzhou', 'xihu']);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(3);
      const values = control.getSubmitValue();
      expect(values![0]).toBe('zhejiang');
      expect(values![1]).toBe('hangzhou');
      expect(values![2]).toBe('xihu');

      testComponent.nzOptions = []; // empty collection
      markForCheckAndDetectChanges(fixture);
      control.writeValue(['zhejiang', 'hangzhou', 'xihu']); // so these values are not match
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(3);
      const values3 = control.getSubmitValue();
      expect(values3[0]).toBe('zhejiang');
      expect(values3[1]).toBe('hangzhou');
      expect(values3[2]).toBe('xihu');
      expect(getLabelText()).toBe('zhejiang / hangzhou / xihu');
    });

    it('should write value work on setting `nzOptions` async', async () => {
      const control = testComponent.cascader;
      testComponent.nzOptions = null;
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(null);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(undefined);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue([]);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(0);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(1);
      control.writeValue('');
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(1);
      control.writeValue(['zhejiang']);
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      expect(getLabelText()).toBe('zhejiang');
      testComponent.nzOptions = options1(); // update the nzOptions like async
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      expect(getLabelText()).toBe('Zhejiang');
    });

    it('should write value work on setting `nzOptions` async (match)', async () => {
      const control = testComponent.cascader;
      testComponent.nzOptions = null;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture); // force value to be written
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(3);
      expect(getLabelText()).toBe('zhejiang / hangzhou / xihu');
      testComponent.nzOptions = options1(); // update the nzOptions like async
      markForCheckAndDetectChanges(fixture);
      const values = control.getSubmitValue();
      expect(values![0]).toBe('zhejiang');
      expect(values![1]).toBe('hangzhou');
      expect(values![2]).toBe('xihu');
      expect(getLabelText()).toBe('Zhejiang / Hangzhou / West Lake');
    });

    it('should write value work on setting `nzOptions` async (not match)', async () => {
      const control = testComponent.cascader;
      testComponent.nzOptions = null;
      testComponent.values = ['zhejiang2', 'hangzhou2', 'xihu2'];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture); // force value to be written
      markForCheckAndDetectChanges(fixture);
      expect(control.getSubmitValue().length).toBe(3);
      expect(getLabelText()).toBe('zhejiang2 / hangzhou2 / xihu2');
      testComponent.nzOptions = options1(); // update the nzOptions like async
      markForCheckAndDetectChanges(fixture); // but still the values is not match
      const values = control.getSubmitValue();
      expect(values![0]).toBe('zhejiang2');
      expect(values![1]).toBe('hangzhou2');
      expect(values![2]).toBe('xihu2');
      expect(getLabelText()).toBe('zhejiang2 / hangzhou2 / xihu2');
    });

    it('should click option to expand', () => {
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(0);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(1);
      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu')!.firstElementChild as HTMLElement;

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);
      const col2 = getAllColumns().item(1);
      const itemEl2 = col2.firstElementChild as HTMLElement;

      itemEl2.click();
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(3);
    });

    it('should click option to change column count', () => {
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(0);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(1);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;

      itemEl2.click();
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(3);

      const itemEl3 = getItemAtColumnAndRow(1, 2)!;

      itemEl3.click();
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);
    });

    it('should click option to change column count 2', async () => {
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture); // wait for cdk-overlay to open
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(getAllColumns().length).toBe(3);

      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      let itemEl3 = getItemAtColumnAndRow(3, 1)!;

      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      markForCheckAndDetectChanges(fixture);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      markForCheckAndDetectChanges(fixture);
      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3).toBeNull();
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');

      const itemEl4 = getItemAtColumnAndRow(2, 2)!;
      itemEl4.click(); // click leaf node
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture); // wait for cdk-overlay close
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.values!.join(',')).toBe('zhejiang,ningbo');
    });

    it('should click option to change column count 3', () => {
      testComponent.nzOptions = options3;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(1);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);
      let itemEl21 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl21.innerText.trim()).toBe('Hangzhou');

      const itemEl2 = getItemAtColumnAndRow(1, 2)!;

      itemEl2.click();
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);

      itemEl21 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl21.innerText.trim()).toBe('Nanjing');
    });

    it('should click disabled option false to expand', async () => {
      testComponent.nzOptions = options2;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      const optionEl1 = getItemAtColumnAndRow(1, 1)!;
      const optionEl2 = getItemAtColumnAndRow(1, 2)!;

      expect(optionEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');
      optionEl1.click();
      markForCheckAndDetectChanges(fixture);
      expect(optionEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');
      optionEl2.click();
      markForCheckAndDetectChanges(fixture);
      expect(optionEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');
    });

    it('should click leaf option to close menu', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      getItemAtColumnAndRow(1, 1)!.click();
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      getItemAtColumnAndRow(2, 1)!.click();
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      getItemAtColumnAndRow(3, 1)!.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(getAllColumns().length).toBe(0);
    });

    it('should open menu when press DOWN_ARROW', async () => {
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
    });

    it('should open menu when press UP_ARROW', async () => {
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
    });

    it('should close menu when press ESC', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESCAPE);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should init menu when selecting cancel', async () => {
      // cancel select by ESCAPE
      markForCheckAndDetectChanges(fixture);
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
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(1);

      // cancel select by clicking outside
      markForCheckAndDetectChanges(fixture);
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
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(1);
    });

    it('should nzBackdrop works', async () => {
      testComponent.nzBackdrop = true;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      const boundingBox = overlayContainerElement.children[0];
      expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
    });

    it('should navigate up when press UP_ARROW', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:last-child'
      ) as HTMLElement; // The last of the fisrt column
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      const itemEl2 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
    });

    it('should navigate down when press DOWN_ARROW', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
    });

    it('should navigate right when press RIGHT_ARROW', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      markForCheckAndDetectChanges(fixture);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      markForCheckAndDetectChanges(fixture);
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      markForCheckAndDetectChanges(fixture);

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');

      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');
    });

    it('should navigate left when press LEFT_ARROW', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture); // wait for cdk-overlay to open
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(3);

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      let itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3).toBeNull();
      expect(getAllColumns().length).toBe(2);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBeFalse();
    });

    it('should navigate left when press BACKSPACE', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture); // wait for cdk-overlay to open
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(3);

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', BACKSPACE);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
    });

    it('when there is only one column activated, pressing LEFT should fold the menu', async () => {
      testComponent.values = ['zhejiang', 'ningbo'];
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBeFalse();
    });

    it('should select option when press ENTER', async () => {
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeNull();
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW); // active 1
      markForCheckAndDetectChanges(fixture);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW); // active 2
      markForCheckAndDetectChanges(fixture);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW); // active 3
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      markForCheckAndDetectChanges(fixture);

      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
      await updateNonSignalsInput(fixture, 200);
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should key nav disabled option correct', async () => {
      testComponent.nzOptions = options2;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      const optionEl1 = getItemAtColumnAndRow(1, 1)!;
      const optionEl2 = getItemAtColumnAndRow(1, 2)!;

      expect(optionEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW); // active 1
      markForCheckAndDetectChanges(fixture);
      expect(optionEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl2.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      markForCheckAndDetectChanges(fixture); // should NOT active the disabled option2
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
      markForCheckAndDetectChanges(fixture);
      expect(optionEl11.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl12.classList).toContain('ant-cascader-menu-item-active');
      expect(optionEl13.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl14.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      markForCheckAndDetectChanges(fixture);
      expect(optionEl11.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl12.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl13.classList).not.toContain('ant-cascader-menu-item-active');
      expect(optionEl14.classList).toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      markForCheckAndDetectChanges(fixture);
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

      markForCheckAndDetectChanges(fixture);
      keys.forEach(key => {
        expect(testComponent.cascader.menuOpen()).toBe(false);
        dispatchKeyboardEvent(cascader.nativeElement, 'keydown', key);
        markForCheckAndDetectChanges(fixture);
        expect(testComponent.cascader.menuOpen()).toBe(false);
      });
    });

    it('should expand option on hover', async () => {
      testComponent.nzExpandTrigger = 'hover';
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(0); // 0 column
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl1, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl1, 'mouseleave');
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl2, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(3);
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl2, 'mouseleave');
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(3);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl3, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(3);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      itemEl3.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should not expand disabled option on hover', async () => {
      testComponent.nzExpandTrigger = 'hover';
      testComponent.nzOptions = options2;
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl2, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(1);

      dispatchMouseEvent(itemEl2, 'mouseleave');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(1);
    });

    // fix #3914
    it('should drop selected items and columns if a leaf node is hovered', async () => {
      testComponent.nzExpandTrigger = 'hover';
      markForCheckAndDetectChanges(fixture);

      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.cascader.setMenuOpen(true); // Open cascader dropdown.

      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 500);
      markForCheckAndDetectChanges(fixture);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3);

      const c2i2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement;
      dispatchMouseEvent(c2i2, 'mouseenter');

      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 500);
      markForCheckAndDetectChanges(fixture);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2);
    });

    it('should change on select work', async () => {
      testComponent.nzChangeOnSelect = true;
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeNull();
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);

      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(1);
      expect(testComponent.values![0]).toBe('zhejiang');

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      markForCheckAndDetectChanges(fixture);

      expect(testComponent.cascader.menuOpen()).toBe(true);
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
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);

      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should not change on hover work', async () => {
      testComponent.nzChangeOnSelect = true;
      testComponent.nzExpandTrigger = 'hover';
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeNull();
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl1, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);

      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values).toBeNull(); // mouseenter does not trigger selection

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl2, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);

      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(getAllColumns().length).toBe(3);
      expect(testComponent.values).toBeNull(); // mouseenter does not trigger selection

      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl3, 'mouseenter');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);

      expect(testComponent.values).toBeNull(); // mouseenter does not trigger selection

      itemEl3.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      markForCheckAndDetectChanges(fixture);

      expect(testComponent.values).toBeDefined(); // click trigger selection
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.cascader.menuOpen()).toBe(false);
    });

    it('should change on function work', async () => {
      testComponent.nzChangeOn = testComponent.fakeChangeOn;
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeNull();
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      markForCheckAndDetectChanges(fixture);
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 200);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(1);
      expect(testComponent.values![0]).toBe('zhejiang');
    });

    it('should support search', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.nzShowSearch = true;
      markForCheckAndDetectChanges(fixture);
      const spy = spyOn(testComponent.cascader, 'focus');
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      expect(spy).toHaveBeenCalled();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');
    });

    it('should searching could be aborted', async () => {
      testComponent.values = ['zhengjiang', 'hangzhou', 'xihu'];
      testComponent.nzShowSearch = true;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      await waitForChanges(fixture, 0);
      markForCheckAndDetectChanges(fixture);

      // input search value
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      // clear search value
      testComponent.cascader.inputValue = '';
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 10);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.cascader.inSearchingMode).toBe(false);

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang');
    });

    it('should clear input value when searching cancel', async () => {
      testComponent.values = ['zhengjiang', 'hangzhou', 'xihu'];
      testComponent.nzShowSearch = true;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESCAPE);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values).toEqual(['zhengjiang', 'hangzhou', 'xihu']);
    });

    it('should support nzLabelProperty', async () => {
      testComponent.nzShowSearch = true;
      testComponent.nzLabelProperty = 'l';
      markForCheckAndDetectChanges(fixture);
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang New / Hangzhou New / West Lake New');

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');
    });

    it('should support nzValueProperty', async () => {
      testComponent.nzShowSearch = true;
      testComponent.nzValueProperty = 'v';
      markForCheckAndDetectChanges(fixture);
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('zhejiang-new,hangzhou-new,xihu-new');
    });

    it('should support custom filter', async () => {
      testComponent.nzShowSearch = {
        filter(inputValue: string, path: NzCascaderOption[]): boolean {
          return path.some(p => p.label!.indexOf(inputValue) !== -1);
        }
      } as NzShowSearchOptions;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');
    });

    it('should support custom sorter', async () => {
      testComponent.nzShowSearch = {
        sorter(a: NzCascaderOption[], b: NzCascaderOption[], _inputValue: string): number {
          const l1 = a[0].label;
          const l2 = b[0].label; // all reversed, just to be sure it works
          return `${l1}`.localeCompare(l2!);
        }
      } as NzShowSearchOptions;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Jiangsu / Nanjing / Zhong Hua Men');

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.cascader.inputValue).toBe('');
      expect(testComponent.values!.join(',')).toBe('jiangsu,nanjing,zhonghuamen');
    });

    it('should forbid disabled search options to be clicked', async () => {
      testComponent.nzOptions = options4;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.cascaderService.columns[0][0].isDisabled).toBe(true);

      itemEl1.click();
      await waitForChanges(fixture, 300);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(testComponent.cascader.menuOpen()).toBe(true);
      expect(testComponent.cascader.inputValue).toBe('o');
    });

    it('should pass disabled property to children when searching', () => {
      testComponent.nzOptions = options4;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.cascaderService.columns[0][0].isDisabled).toBe(true);
      expect(testComponent.cascader.cascaderService.columns[0][1].isDisabled).toBe(false);
      expect(testComponent.cascader.cascaderService.columns[0][2].isDisabled).toBe(true);
    });

    it('should support arrow in search mode', async () => {
      testComponent.nzOptions = options2;
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      const itemEl2 = getItemAtColumnAndRow(1, 2)!;
      const itemEl4 = getItemAtColumnAndRow(1, 4)!;
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl4.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      expect(testComponent.values!.join(',')).toBe('option1,option14');
    });

    it('should not preventDefault left/right arrow in search mode', () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.nzShowSearch = true;
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      markForCheckAndDetectChanges(fixture);
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      markForCheckAndDetectChanges(fixture);
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
    });

    it('should not preventDefault BACKSPACE in search mode', async () => {
      testComponent.nzShowSearch = true;
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      const event = dispatchKeyboardEvent(cascader.nativeElement, 'keydown', BACKSPACE);
      testComponent.cascader.inputValue = '';
      await waitForChanges(fixture, 0);
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(event.defaultPrevented).toBe(false);
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl1.innerText).toBe('Zhejiang');
      expect(testComponent.cascader.inputValue).toBe('');
    });

    it('should support search a root node have no children ', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.nzShowSearch = true;
      testComponent.nzOptions = options5;
      markForCheckAndDetectChanges(fixture);
      const spy = spyOn(testComponent.cascader, 'focus');
      cascader.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      expect(spy).toHaveBeenCalled();
      testComponent.cascader.inputValue = 'Roo';
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText.trim()).toBe('暂无数据');
      await waitForChanges(fixture);
    });

    it('should re-prepare search results when nzOptions change', () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.nzShowSearch = true;
      cascader.nativeElement.click();
      testComponent.cascader.setMenuOpen(true);
      testComponent.cascader.inputValue = 'o';
      markForCheckAndDetectChanges(fixture);
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      testComponent.nzOptions = options2;
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.inSearchingMode).toBe(true);

      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.innerText).toBe('Option1 / Option11');
    });

    it('should nzPrefix work', () => {
      testComponent.nzPrefix = 'prefix';
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('prefix');
    });

    it('should support changing icon', () => {
      testComponent.nzSuffixIcon = 'home';
      testComponent.nzExpandIcon = 'home';

      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1);
      expect(itemEl1?.querySelector('.anticon-home')).toBeTruthy();
      expect(cascader.nativeElement.querySelector('.ant-select-arrow .anticon')!.classList).toContain('anticon-home');
    });

    it('should nzPlacement works', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      let element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      const setNzPlacement = async (placement: NzCascaderPlacement): Promise<void> => {
        testComponent.cascader.setMenuOpen(false);
        markForCheckAndDetectChanges(fixture);
        testComponent.nzPlacement = placement;
        testComponent.cascader.setMenuOpen(true);
        markForCheckAndDetectChanges(fixture);
        await waitForChanges(fixture, 200);
        markForCheckAndDetectChanges(fixture);
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

    it('should cascade work when the value of ngModel that is not existed in options', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.values = ['zhejiang', 'a'];
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(1, 1)!.click();
      getItemAtColumnAndRow(2, 1)!.click();
      getItemAtColumnAndRow(3, 1)!.click();
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toEqual(['zhejiang', 'hangzhou', 'xihu']);
    });

    it('should display activated column correctly after clicking outside and reopen', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      // First open - should display activated columns correctly
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(3);
      let itemEl1 = getItemAtColumnAndRow(1, 1)!;
      let itemEl2 = getItemAtColumnAndRow(2, 1)!;
      let itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');

      // Click first column option (zhejiang) - should fold the third column
      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(getAllColumns().length).toBe(2);
      itemEl1 = getItemAtColumnAndRow(1, 1)!;
      itemEl2 = getItemAtColumnAndRow(2, 1)!;
      itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3).toBeNull();

      // Click outside to close menu - value should remain unchanged
      dispatchFakeEvent(document.body, 'click');
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.cascader.menuOpen()).toBe(false);
      expect(testComponent.values).toEqual(['zhejiang', 'hangzhou', 'xihu']);

      // Reopen menu - should display activated columns correctly based on current value
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
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
        testComponent.nzOpen = true;
        await waitForChanges(fixture, 200);
        markForCheckAndDetectChanges(fixture);
      });

      it('should nzOpen can control the visibility of menu', async () => {
        expect(testComponent.cascader.menuOpen()).toBe(true);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(1);
        testComponent.nzOpen = false;
        await waitForChanges(fixture, 200);
        markForCheckAndDetectChanges(fixture);
        expect(testComponent.cascader.menuOpen()).toBe(false);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);
      });

      it('should not hide menu by click leaf option or outside place when nzOpen is true', async () => {
        expect(testComponent.cascader.menuOpen()).toBe(true);
        getItemAtColumnAndRow(1, 1)!.click();
        getItemAtColumnAndRow(2, 1)!.click();
        getItemAtColumnAndRow(3, 1)!.click(); // zhejiang, hangzhou, xihu
        await waitForChanges(fixture);
        markForCheckAndDetectChanges(fixture);
        expect(testComponent.onValueChanges).toHaveBeenCalled();
        expect(testComponent.cascader.menuOpen()).toBe(true);
        spyOn(testComponent.cascader, 'onClickOutside');
        dispatchFakeEvent(document.body, 'click');
        expect(testComponent.cascader.onClickOutside).toHaveBeenCalled();
        expect(testComponent.cascader.menuOpen()).toBe(true);
      });

      it('should not hide menu by clear options under multiple mode when nzOpen is true', async () => {
        testComponent.nzMultiple = true;
        markForCheckAndDetectChanges(fixture);
        getItemAtColumnAndRow(1, 1)!.click();
        getItemAtColumnAndRow(2, 1)!.click();
        getItemAtColumnAndRow(3, 1)!.click(); // zhejiang, hangzhou, xihu
        getItemAtColumnAndRow(1, 2)!.click();
        getItemAtColumnAndRow(2, 1)!.click();
        getItemAtColumnAndRow(3, 1)!.click(); // jiangsu, nanjing, zhonghuamen
        expect(testComponent.values).toEqual([['zhejiang', 'hangzhou'], ['jiangsu']]);
        await waitForChanges(fixture);
        markForCheckAndDetectChanges(fixture);
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
        markForCheckAndDetectChanges(fixture);
        await waitForChanges(fixture, 200);
        markForCheckAndDetectChanges(fixture);
        expect(testComponent.cascader.menuOpen()).toBe(true);
        expect(testComponent.onOpenChange).toHaveBeenCalledWith(false);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(2);

        getItemAtColumnAndRow(1, 1)!.click();
        markForCheckAndDetectChanges(fixture);
        getItemAtColumnAndRow(2, 1)!.click();
        markForCheckAndDetectChanges(fixture);
        getItemAtColumnAndRow(3, 1)!.click();
        await waitForChanges(fixture, 200);
        markForCheckAndDetectChanges(fixture);
        expect(testComponent.cascader.menuOpen()).toBe(true);
        expect(testComponent.onOpenChange).toHaveBeenCalledWith(false);
        expect(testComponent.onOpenChange).toHaveBeenCalledTimes(3);

        dispatchFakeEvent(document.body, 'click');
        markForCheckAndDetectChanges(fixture);
        await waitForChanges(fixture);
        markForCheckAndDetectChanges(fixture);
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
      testComponent.values.set(
        testComponent.nzOptions[0].children!.slice(0, len).map(o => [testComponent.nzOptions[0].value, o.value])
      );
      markForCheckAndDetectChanges(fixture);
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
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.classList).toContain('ant-select-multiple');
    });

    it('should maxTagCount work', async () => {
      // not exceed
      setValues(3);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      let tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(3);

      // exceed maxTagCount
      setValues(10);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(4); // maxTagCount + 1
    });

    it('should remove item work', async () => {
      setValues(4);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      const removeBtn = cascader.queryAll(By.css('.ant-select-selection-item-remove'))[2];
      removeBtn.nativeElement.click();
      markForCheckAndDetectChanges(fixture);
      const tags = cascader.queryAll(By.directive(NzSelectItemComponent));
      expect(tags.length).toBe(3);
    });

    it('should check state conduct up and down', async () => {
      cascader.componentInstance.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);

      // firstly, expand all columns (for convenience)
      getItemAtColumnAndRow(1, 2)!.click();
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(2, 1)!.click();
      markForCheckAndDetectChanges(fixture);

      const rootEl = getCheckboxAtColumnAndRow(1, 2)!;
      const parentEl = getCheckboxAtColumnAndRow(2, 1)!;
      const children = getCheckboxesAtColumn(3).filter(c => !c.classList.contains('ant-cascader-checkbox-disabled'));

      // check parent option
      parentEl.click();
      markForCheckAndDetectChanges(fixture);
      expect(parentEl.classList).toContain('ant-cascader-checkbox-checked');
      // Conduct Down: then all children should be checked
      expect(children.every(c => c.classList.contains('ant-cascader-checkbox-checked'))).toBe(true);
      // Conduct Up: and its parent should be checked too
      expect(rootEl.classList).toContain('ant-cascader-checkbox-checked');

      // uncheck a child option
      children[0]!.click();
      markForCheckAndDetectChanges(fixture);
      // Conduct Up: then parent should be half checked
      expect(parentEl.classList).toContain('ant-cascader-checkbox-indeterminate');
      // Conduct Up: and root should be half checked
      expect(rootEl.classList).toContain('ant-cascader-checkbox-indeterminate');

      // check the half checked parent option
      parentEl.click();
      markForCheckAndDetectChanges(fixture);
      expect(parentEl.classList).toContain('ant-cascader-checkbox-checked');
      // Conduct Down: then all children should be checked
      expect(children.every(c => c.classList.contains('ant-cascader-checkbox-checked'))).toBe(true);
      // Conduct Up: and its parent should be checked too
      expect(rootEl.classList).toContain('ant-cascader-checkbox-checked');

      // uncheck the parent option
      parentEl.click();
      markForCheckAndDetectChanges(fixture);
      // Conduct Down: then all children should be unchecked
      expect(children.every(c => !c.classList.contains('ant-cascader-checkbox-checked'))).toBe(true);
      // Conduct Up: and its parent should be unchecked too
      expect(rootEl.classList).not.toContain('ant-cascader-checkbox-checked');
    });

    it('should click checkbox not set option activated', async () => {
      cascader.componentInstance.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);

      const option = getItemAtColumnAndRow(1, 1)!;
      const checkbox = getCheckboxAtColumnAndRow(1, 1)!;
      expect(option.classList).not.toContain('ant-cascader-menu-item-active');

      checkbox.click();
      markForCheckAndDetectChanges(fixture);

      expect(option.classList).not.toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).toContain('ant-cascader-checkbox-checked');
    });

    it('should change check state when click leaf node', async () => {
      cascader.componentInstance.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);

      // firstly, expand all columns (for convenience)
      getItemAtColumnAndRow(1, 2)!.click();
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(2, 1)!.click();
      markForCheckAndDetectChanges(fixture);

      const leaf = getItemAtColumnAndRow(3, 2)!;
      const checkbox = getCheckboxAtColumnAndRow(3, 2)!;
      // click leaf node
      expect(leaf.classList).not.toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).not.toContain('ant-cascader-checkbox-checked');

      leaf.click();
      markForCheckAndDetectChanges(fixture);
      expect(leaf.classList).toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).toContain('ant-cascader-checkbox-checked');

      leaf.click();
      markForCheckAndDetectChanges(fixture);
      expect(leaf.classList).toContain('ant-cascader-menu-item-active');
      expect(checkbox.classList).not.toContain('ant-cascader-checkbox-checked');
    });

    it('should change check state trigger ngModelChange', async () => {
      spyOn(testComponent, 'onChanges');
      expect(testComponent.onChanges).not.toHaveBeenCalled();
      cascader.componentInstance.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.onChanges).not.toHaveBeenCalled();

      const checkbox = getCheckboxAtColumnAndRow(1, 1)!;
      checkbox.click();
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.onChanges).toHaveBeenCalledWith([['light']]);
    });

    it('should support ENTER key to toggle option checked state in multiple mode', async () => {
      cascader.componentInstance.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(1, 1)!.click();
      markForCheckAndDetectChanges(fixture);
      const optionEl = getItemAtColumnAndRow(2, 1)!;
      const checkboxEl = getCheckboxAtColumnAndRow(2, 1)!;
      // Initially, the option should not be checked
      expect(checkboxEl.classList).not.toContain('ant-cascader-checkbox-checked');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      markForCheckAndDetectChanges(fixture);
      expect(optionEl.classList).toContain('ant-cascader-menu-item-active');
      // Press ENTER to toggle the option checked state
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      markForCheckAndDetectChanges(fixture);
      // The option should now be checked
      expect(checkboxEl.classList).toContain('ant-cascader-checkbox-checked');
      // Press ENTER again to toggle the option unchecked state
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ENTER);
      markForCheckAndDetectChanges(fixture);
      // The option should now be unchecked
      expect(checkboxEl.classList).not.toContain('ant-cascader-checkbox-checked');
    });

    it('should not activate option with isDisableCheckbox by pressing RIGHT ARROW key', async () => {
      cascader.componentInstance.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(1, 2)!.click();
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(2, 1)!.click();
      markForCheckAndDetectChanges(fixture);
      // Try to navigate to a disabled checkbox option using keyboard
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      markForCheckAndDetectChanges(fixture);
      // The option with disableCheckbox should not be activatable via keyboard
      expect(getItemAtColumnAndRow(3, 1)!.classList).not.toContain('ant-cascader-menu-item-active');
      expect(getCheckboxAtColumnAndRow(3, 1)!.classList).toContain('ant-cascader-checkbox-disabled');
      // activate item (3, 2)
      expect(getItemAtColumnAndRow(3, 2)!.classList).toContain('ant-cascader-menu-item-active');
      expect(getCheckboxAtColumnAndRow(3, 2)!.classList).not.toContain('ant-cascader-checkbox-disabled');
    });

    it('should not activate option with isDisableCheckbox in moveUpOrDown method', async () => {
      cascader.componentInstance.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(1, 2)!.click();
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(2, 1)!.click();
      markForCheckAndDetectChanges(fixture);
      getItemAtColumnAndRow(3, 2)!.click();
      markForCheckAndDetectChanges(fixture);
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
        testComponent.values()[0] = ['light', 'a'];
        await waitForChanges(fixture);
        markForCheckAndDetectChanges(fixture);
        const removeBtn = cascader.queryAll(By.css('.ant-select-selection-item-remove'))[0];
        removeBtn.nativeElement.click();
        markForCheckAndDetectChanges(fixture);
        const tags = cascader.queryAll(By.directive(NzSelectItemComponent));
        expect(tags.length).toBe(1);
      });

      it('should add item work', async () => {
        spyOn(testComponent, 'onChanges');
        setValues(2);
        testComponent.values()[0] = ['light', 'a'];
        await waitForChanges(fixture);
        markForCheckAndDetectChanges(fixture);
        cascader.componentInstance.setMenuOpen(true);
        markForCheckAndDetectChanges(fixture);
        const checkbox = getCheckboxAtColumnAndRow(2, 3)!;
        checkbox.click();
        markForCheckAndDetectChanges(fixture);
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

      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values).toBeNull();
      expect(getAllColumns().length).toBe(0);
      expect(testComponent.values).toBeNull(); // not select yet
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(0);

      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(1);
      await waitForChanges(fixture, 1000); // wait for first row to load finish
      markForCheckAndDetectChanges(fixture);

      expect(getAllColumns().length).toBe(1);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = getItemAtColumnAndRow(1, 1)!;
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(2);
      expect(getAllColumns().length).toBe(2);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl2 = getItemAtColumnAndRow(2, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl2.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3);
      expect(getAllColumns().length).toBe(3);
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl3 = getItemAtColumnAndRow(3, 1)!;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');

      itemEl3.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(4);
      expect(testComponent.values).toBeNull(); // not select yet

      itemEl3.click(); // re-click again, this time it is a leaf
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(4);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
    });

    it('should nzLoadData work when specifies default value', async () => {
      spyOn(testComponent, 'addCallTimes');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 3000);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3);
      expect(testComponent.cascader.cascaderService.columns.length).toBe(3);
      expect(testComponent.values.join(',')).toBe('zhejiang,hangzhou,xihu');
    });

    it('should not emit error after clear search and reopen it', async () => {
      markForCheckAndDetectChanges(fixture);
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 1000); // wait for first row to load finish
      markForCheckAndDetectChanges(fixture);
      const itemEl1 = getItemAtColumnAndRow(1, 1)!;

      itemEl1.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      const itemEl2 = getItemAtColumnAndRow(2, 1)!;

      itemEl2.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      const itemEl3 = getItemAtColumnAndRow(3, 1)!;

      itemEl3.click();
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);

      itemEl3.click(); // re-click again, this time it is a leaf
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture, 600);
      markForCheckAndDetectChanges(fixture);
      await waitForChanges(fixture);
      markForCheckAndDetectChanges(fixture);
      cascader.nativeElement.querySelector('.ant-select-clear .anticon').click();
      testComponent.cascader.setMenuOpen(true);
      markForCheckAndDetectChanges(fixture);
      expect(testComponent.values!.length).toBe(0);
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
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.className).toContain('ant-select-status-error');

      fixture.componentInstance.status = 'warning';
      markForCheckAndDetectChanges(fixture);
      expect(cascader.nativeElement.className).toContain('ant-select-status-warning');

      fixture.componentInstance.status = '';
      markForCheckAndDetectChanges(fixture);
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
      markForCheckAndDetectChanges(fixture);
    });

    it('should className correct', () => {
      expect(cascader.nativeElement.className).not.toContain('ant-select-status-error');
      expect(cascader.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeNull();
      formGroup.controls.demo.markAsDirty();
      formGroup.controls.demo.setValue(null);
      formGroup.controls.demo.updateValueAndValidity();
      markForCheckAndDetectChanges(fixture);

      // show error
      expect(cascader.nativeElement.className).toContain('ant-select-status-error');
      expect(cascader.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();
      expect(cascader.nativeElement.querySelector('nz-form-item-feedback-icon').className).toContain(
        'ant-form-item-feedback-icon-error'
      );

      formGroup.controls.demo.markAsDirty();
      formGroup.controls.demo.setValue(['a', 'b']);
      formGroup.controls.demo.updateValueAndValidity();
      markForCheckAndDetectChanges(fixture);
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
    markForCheckAndDetectChanges(fixture);
    cascader.nativeElement.click();
    markForCheckAndDetectChanges(fixture);
    await waitForChanges(fixture, 200);
    markForCheckAndDetectChanges(fixture);
    expect(overlayContainerElement.querySelector('.ant-cascader-menus')!.classList).toContain('ant-cascader-rtl');
  });

  it('should pressing the left and right keys can correctly expand and collapse content', async () => {
    testComponent.nzOptions = options3;
    testComponent.cascader.setMenuOpen(true);
    markForCheckAndDetectChanges(fixture);
    dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
    dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
    markForCheckAndDetectChanges(fixture);
    const zhejiangItemEl = overlayContainerElement
      .querySelectorAll('.ant-cascader-menu')[0]
      ?.querySelectorAll('.ant-cascader-menu-item')[0];
    const hangzhouItemEl = overlayContainerElement
      .querySelectorAll('.ant-cascader-menu')[1]
      ?.querySelectorAll('.ant-cascader-menu-item')[0];
    expect(zhejiangItemEl!.classList).toContain('ant-cascader-menu-item-active');
    expect(hangzhouItemEl!.classList).toContain('ant-cascader-menu-item-active');
    dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
    markForCheckAndDetectChanges(fixture);
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
    markForCheckAndDetectChanges(fixture);

    component.cascader.setMenuOpen(true);
    markForCheckAndDetectChanges(fixture);
    await waitForChanges(fixture, 200);
    markForCheckAndDetectChanges(fixture);

    const customFooter = overlayContainerElement.querySelector('.custom-footer');
    expect(customFooter).toBeTruthy();
    expect(customFooter?.textContent).toBe('Custom Footer');

    const menu = overlayContainerElement.querySelector('.ant-cascader-menus');
    expect(menu).toBeTruthy();
  });

  it('should render default menu when nzPopupRender is not provided', async () => {
    const fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
    const component = fixture.componentInstance;
    markForCheckAndDetectChanges(fixture);

    component.cascader.setMenuOpen(true);
    markForCheckAndDetectChanges(fixture);
    await waitForChanges(fixture, 200);
    markForCheckAndDetectChanges(fixture);

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
    markForCheckAndDetectChanges(fixture);
    formSizeSignal.set('large');
    markForCheckAndDetectChanges(fixture);
    expect(cascaderElement.classList).toContain('ant-select-lg');
  });
  it('should set correctly the size from the compactSize signal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }]
    });
    fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    markForCheckAndDetectChanges(fixture);
    expect(cascaderElement.classList).toContain('ant-select-lg');
  });
  it('should set correctly the size from the component input', () => {
    fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.componentInstance.nzSize = 'large';
    markForCheckAndDetectChanges(fixture);
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
    markForCheckAndDetectChanges(fixture);
    formVariantSignal.set('filled');
    markForCheckAndDetectChanges(fixture);
    expect(cascaderElement.classList).toContain('ant-select-filled');
  });

  it('should use nzVariant over formVariant when nzVariant is explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestCascaderFinalVariantComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.componentInstance.variant.set('borderless');
    markForCheckAndDetectChanges(fixture);
    formVariantSignal.set('filled');
    markForCheckAndDetectChanges(fixture);
    expect(cascaderElement.classList).toContain('ant-select-borderless');
    expect(cascaderElement.classList).not.toContain('ant-select-filled');
  });

  it('should use nzVariant when no formVariant is provided', () => {
    fixture = TestBed.createComponent(TestCascaderFinalVariantComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    fixture.componentInstance.variant.set('filled');
    markForCheckAndDetectChanges(fixture);
    expect(cascaderElement.classList).toContain('ant-select-filled');
  });

  it('should use outlined as default when neither nzVariant nor formVariant is provided', () => {
    fixture = TestBed.createComponent(TestCascaderFinalVariantComponent);
    cascaderElement = fixture.debugElement.query(By.directive(NzCascaderComponent)).nativeElement;
    markForCheckAndDetectChanges(fixture);
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
    markForCheckAndDetectChanges(fixture);
    formVariantSignal.set('filled');
    markForCheckAndDetectChanges(fixture);
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
      [(ngModel)]="values"
      [nzOpen]="nzOpen"
      [nzOptions]="nzOptions"
      [nzAllowClear]="nzAllowClear"
      [nzAutoFocus]="nzAutoFocus"
      [nzChangeOn]="nzChangeOn"
      [nzChangeOnSelect]="nzChangeOnSelect"
      [nzColumnClassName]="nzColumnClassName"
      [nzDisabled]="nzDisabled"
      [nzExpandIcon]="nzExpandIcon"
      [nzExpandTrigger]="nzExpandTrigger"
      [nzLabelProperty]="nzLabelProperty"
      [nzValueProperty]="nzValueProperty"
      [nzLabelRender]="nzLabelRender"
      [nzMenuClassName]="nzMenuClassName"
      [nzMenuStyle]="nzMenuStyle"
      [nzMultiple]="nzMultiple"
      [nzMouseEnterDelay]="nzMouseEnterDelay"
      [nzMouseLeaveDelay]="nzMouseLeaveDelay"
      [nzPlaceHolder]="nzPlaceHolder"
      [nzShowArrow]="nzShowArrow"
      [nzShowInput]="nzShowInput"
      [nzShowSearch]="nzShowSearch"
      [nzSize]="nzSize"
      [nzTriggerAction]="nzTriggerAction"
      [nzPrefix]="nzPrefix"
      [nzSuffixIcon]="nzSuffixIcon"
      [nzBackdrop]="nzBackdrop"
      [nzPlacement]="nzPlacement"
      [nzVariant]="nzVariant"
      (ngModelChange)="onValueChanges($event)"
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

  nzOptions: NzSafeAny[] | null = options1();
  values: string[] | string[][] | number[] | null = null;

  nzOpen: boolean | undefined;
  nzMultiple = false;
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
  nzPrefix: string | null = null;
  nzSuffixIcon = 'down';
  nzExpandIcon = 'right';
  nzBackdrop = false;
  nzPlacement: NzCascaderPlacement = 'bottomLeft';
  nzVariant: NzVariant = 'outlined';

  onOpenChange = jasmine.createSpy<(open: boolean) => void>('open change');
  onValueChanges = jasmine.createSpy('value change');
  onClear(): void {}
  fakeChangeOn = (node: NzSafeAny, _index: number): boolean => node.value === 'zhejiang';
}

@Component({
  imports: [FormsModule, NzCascaderModule],
  template: `
    <nz-cascader
      [(ngModel)]="values"
      [nzLoadData]="nzLoadData"
      (ngModelChange)="onValueChanges($event)"
      (nzOpenChange)="onOpenChange($event)"
    />
  `
})
export class NzDemoCascaderLoadDataComponent {
  @ViewChild(NzCascaderComponent, { static: true }) cascader!: NzCascaderComponent;

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
  onOpenChange = jasmine.createSpy<(open: boolean) => void>('open change');
  onValueChanges = jasmine.createSpy('value change');
}

@Component({
  imports: [FormsModule, NzCascaderModule],
  template: `<nz-cascader [nzOptions]="nzOptions" [nzStatus]="status" />`
})
export class NzDemoCascaderStatusComponent {
  nzOptions: NzSafeAny[] | null = options1();
  private readonly statusSignal = signal<NzStatus>('error');

  get status(): NzStatus {
    return this.statusSignal();
  }

  set status(value: NzStatus) {
    this.statusSignal.set(value);
  }
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
