// tslint:disable:no-any
import { ConnectedOverlayPositionChange, OverlayContainer } from '@angular/cdk/overlay';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  createFakeEvent,
  createMouseEvent,
  dispatchEvent,
  dispatchKeyboardEvent,
  dispatchMouseEvent
} from '../core/testing';

import { CascaderOption, NzShowSearchOptions } from './nz-cascader-definitions';
import { clone, isObject } from './nz-cascader-utils';
import { NzCascaderComponent } from './nz-cascader.component';
import { NzCascaderModule } from './nz-cascader.module';

describe('cascader', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  describe('default', () => {
    let fixture: ComponentFixture<NzDemoCascaderDefaultComponent>;
    let cascader: DebugElement;
    let testComponent: NzDemoCascaderDefaultComponent;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, NoopAnimationsModule, NzCascaderModule],
        declarations: [NzDemoCascaderDefaultComponent],
        providers: []
      }).compileComponents();

      inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      })();
    }));
    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
      currentOverlayContainer.ngOnDestroy();
      overlayContainer.ngOnDestroy();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoCascaderDefaultComponent);
      testComponent = fixture.debugElement.componentInstance;
      cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.className).toContain('ant-cascader ant-cascader-picker');
    });
    it('should have input', () => {
      fixture.detectChanges();
      const input: HTMLElement = cascader.nativeElement.querySelector('.ant-cascader-input');
      expect(input).toBeDefined();
      expect(input.getAttribute('placeholder')).toBe('please select');
    });
    it('should input change event stopPropagation', () => {
      fixture.detectChanges();
      const input: HTMLElement = cascader.nativeElement.querySelector('.ant-cascader-input');
      const fakeInputChangeEvent = createFakeEvent('change', true, true);
      spyOn(fakeInputChangeEvent, 'stopPropagation');
      input.dispatchEvent(fakeInputChangeEvent);
      fixture.detectChanges();
      expect(fakeInputChangeEvent.stopPropagation).toHaveBeenCalled();
    });
    it('should have EMPTY label', () => {
      fixture.detectChanges();
      const label: HTMLElement = cascader.nativeElement.querySelector('.ant-cascader-picker-label');
      expect(label).toBeDefined();
      expect(label.innerText).toBe('');
    });
    it('should placeholder work', () => {
      const placeholder = 'placeholder test';
      testComponent.nzPlaceHolder = placeholder;
      fixture.detectChanges();
      const input: HTMLElement = cascader.nativeElement.querySelector('.ant-cascader-input');
      expect(input.getAttribute('placeholder')).toBe(placeholder);
    });
    // This API is redundant and should be removed.
    // it('should prefixCls work', () => {
    //   testComponent.nzPrefixCls = 'new-cascader';
    //   fixture.detectChanges();
    //   expect(testComponent.cascader.nzPrefixCls).toBe('new-cascader');
    //   expect(cascader.nativeElement.className).toContain('new-cascader new-cascader-picker');
    // });
    it('should size work', () => {
      testComponent.nzSize = 'small';
      fixture.detectChanges();
      const input: HTMLElement = cascader.nativeElement.querySelector('.ant-cascader-input');
      expect(input.classList).toContain('ant-input-sm');
      testComponent.nzSize = 'large';
      fixture.detectChanges();
      expect(input.classList).toContain('ant-input-lg');
    });
    it('should value and label property work', fakeAsync(() => {
      testComponent.nzOptions = ID_NAME_LIST;
      testComponent.nzValueProperty = 'id';
      testComponent.nzLabelProperty = 'name';
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe('');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('');
      testComponent.values = [1, 2, 3];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe(
        'Zhejiang / Hangzhou / West Lake'
      );
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('1,2,3');
    }));
    it('should no value and label property work', fakeAsync(() => {
      testComponent.nzValueProperty = null;
      testComponent.nzLabelProperty = null;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe('');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe(
        'Zhejiang / Hangzhou / West Lake'
      );
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('zhejiang,hangzhou,xihu');
    }));
    it('should showArrow work', () => {
      testComponent.nzShowArrow = true;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-arrow')).toBeDefined();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-arrow').classList).toContain('anticon-down');
      testComponent.nzShowArrow = false;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-arrow')).toBeNull();
    });
    it('should allowClear work', () => {
      fixture.detectChanges();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-clear')).toBeDefined();
      testComponent.nzAllowClear = false;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-clear')).toBeNull();
    });
    it('should open work', () => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-cascader-picker-open');
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-cascader-picker-open');
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(1);
      expect(testComponent.cascader.nzOptions).not.toBe(options1);
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

      const mouseleave = createMouseEvent('mouseleave');
      mouseleave.initMouseEvent(
        'mouseleave',
        false /* canBubble */,
        false /* cancelable */,
        window /* view */,
        0 /* detail */,
        0 /* screenX */,
        0 /* screenY */,
        0 /* clientX */,
        0 /* clientY */,
        false /* ctrlKey */,
        false /* altKey */,
        false /* shiftKey */,
        false /* metaKey */,
        0 /* button */,
        overlayContainerElement.querySelector('.ant-cascader-menu') /* relatedTarget */
      );
      dispatchEvent(cascader.nativeElement, mouseleave);
      tick(300);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);

      mouseleave.initMouseEvent(
        'mouseleave',
        false /* canBubble */,
        false /* cancelable */,
        window /* view */,
        0 /* detail */,
        0 /* screenX */,
        0 /* screenY */,
        0 /* clientX */,
        0 /* clientY */,
        false /* ctrlKey */,
        false /* altKey */,
        false /* shiftKey */,
        false /* metaKey */,
        0 /* button */,
        cascader.nativeElement /* relatedTarget */
      );
      dispatchEvent(cascader.nativeElement, mouseleave);
      tick(300);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);

      mouseleave.initMouseEvent(
        'mouseleave',
        false /* canBubble */,
        false /* cancelable */,
        window /* view */,
        0 /* detail */,
        0 /* screenX */,
        0 /* screenY */,
        0 /* clientX */,
        0 /* clientY */,
        false /* ctrlKey */,
        false /* altKey */,
        false /* shiftKey */,
        false /* metaKey */,
        0 /* button */,
        document.body /* relatedTarget */
      );
      dispatchEvent(cascader.nativeElement, mouseleave);
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
      const mouseenter = createMouseEvent('mouseenter');
      const mouseleave = createMouseEvent('mouseleave');
      const option = options1[0]; // zhejiang

      testComponent.nzExpandTrigger = 'hover';
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      flush();
      fixture.detectChanges();
      const optionEl = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      testComponent.cascader.onOptionMouseEnter(option, 0, mouseenter);
      fixture.detectChanges();
      tick(10);
      fixture.detectChanges();
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');
      testComponent.cascader.onOptionMouseLeave(option, 0, mouseleave);
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');

      testComponent.cascader.onOptionMouseEnter(option, 0, mouseenter);
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      expect(optionEl.classList).not.toContain('ant-cascader-menu-item-active');
    }));
    it('should disabled work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-cascader-picker-disabled');
      testComponent.nzDisabled = true;
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-cascader-picker-disabled');
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
      expect(cascader.nativeElement.classList).not.toContain('ant-cascader-picker-disabled');
      testComponent.cascader.setDisabledState(true);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-cascader-picker-disabled');
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
      cascader.nativeElement.querySelector('.ant-cascader-picker-clear').click();
      fixture.detectChanges();
      expect(testComponent.values!.length).toBe(0);
    }));
    it('should clear value work 2', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      expect(testComponent.values!.length).toBe(3);
      fixture.detectChanges();
      testComponent.cascader.clearSelection();
      fixture.detectChanges();
      expect(testComponent.values!.length).toBe(0);
    }));
    it('should autofocus work', () => {
      testComponent.nzShowInput = true;
      testComponent.nzAutoFocus = true;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('input').getAttribute('autofocus')).toBe('autofocus');
      testComponent.nzAutoFocus = false;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('input').getAttribute('autofocus')).toBe(null);
    });
    it('should input focus and blur work', fakeAsync(() => {
      const fakeInputFocusEvent = createFakeEvent('focus', false, true);
      const fakeInputBlurEvent = createFakeEvent('blur', false, true);

      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-cascader-focused');
      cascader.nativeElement.querySelector('input').dispatchEvent(fakeInputFocusEvent);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-cascader-focused');
      cascader.nativeElement.querySelector('input').dispatchEvent(fakeInputBlurEvent);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-cascader-focused');

      testComponent.cascader.setMenuVisible(true);
      cascader.nativeElement.querySelector('input').dispatchEvent(fakeInputFocusEvent);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-cascader-focused');
      cascader.nativeElement.querySelector('input').dispatchEvent(fakeInputBlurEvent);
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-cascader-focused');
    }));
    it('should focus and blur function work', () => {
      testComponent.nzShowInput = true;
      cascader.nativeElement.click();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('input') === document.activeElement).toBe(false);
      testComponent.cascader.focus();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('input') === document.activeElement).toBe(true);
      testComponent.cascader.blur();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('input') === document.activeElement).toBe(false);
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
      expect(cascader.nativeElement.querySelector('.ant-cascader-input')).toBeNull();
      testComponent.nzAllowClear = true;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.nzOptions).not.toBe(options1);
      expect(cascader.nativeElement.querySelector('.ant-cascader-input')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-clear')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label')).toBeNull();
    }));
    it('should input value work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).not.toContain('ant-cascader-picker-with-value');
      testComponent.cascader.inputValue = '12345';
      fixture.detectChanges();
      expect(cascader.nativeElement.classList).toContain('ant-cascader-picker-with-value');
    }));
    it('should create label work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe('');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe(
        'Zhejiang / Hangzhou / West Lake'
      );
    }));
    it('should label template work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe('');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.nzLabelRender = testComponent.renderTpl;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText.trim()).toBe(
        'Zhejiang | Hangzhou | West Lake'
      );
      // fix clear
      testComponent.clearSelection();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.nzLabelRender = testComponent.renderTpl;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText.trim()).toBe(
        'Zhejiang | Hangzhou | West Lake'
      );
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
      control.writeValue('');
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
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
      control.writeValue([
        { value: 'zhejiang', text: 'Zj' },
        { value: 'hangzhou', text: 'Hz' },
        { value: 'xihu', text: 'Xh' }
      ]);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(3);
      const values2 = control.getSubmitValue();
      expect(values2[0]).toBe('zhejiang');
      expect(values2[1]).toBe('hangzhou');
      expect(values2[2]).toBe('xihu');
      expect(control.labelRenderText).toBe('Zhejiang / Hangzhou / West Lake');

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

      control.writeValue([
        { value: 'zhejiang', label: 'ZJ' },
        { value: 'hangzhou', label: 'HZ' },
        { value: 'xihu', label: 'XH' }
      ]); // so these values are not match
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(3);
      const values4 = control.getSubmitValue();
      expect(values4[0]).toBe('zhejiang');
      expect(values4[1]).toBe('hangzhou');
      expect(values4[2]).toBe('xihu');
      expect(control.labelRenderText).toBe('ZJ / HZ / XH');
    }));
    it('should write value work on setting `nzOptions` asyn', fakeAsync(() => {
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
      control.writeValue('');
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(0);
      control.writeValue(['zhejiang']);
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      expect(control.labelRenderText).toBe('zhejiang');
      testComponent.nzOptions = options1; // update the nzOptions like asyn
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(1);
      expect(control.getSubmitValue()[0]).toBe('zhejiang');
      expect(control.labelRenderText).toBe('Zhejiang');
    }));
    it('should write value work on setting `nzOptions` asyn (match)', fakeAsync(() => {
      const control = testComponent.cascader;
      testComponent.nzOptions = null;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush(); // force value to be write
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(3);
      expect(control.labelRenderText).toBe('zhejiang / hangzhou / xihu');
      testComponent.nzOptions = options1; // update the nzOptions like asyn
      fixture.detectChanges();
      const values = control.getSubmitValue();
      expect(values![0]).toBe('zhejiang');
      expect(values![1]).toBe('hangzhou');
      expect(values![2]).toBe('xihu');
      expect(control.labelRenderText).toBe('Zhejiang / Hangzhou / West Lake');
    }));
    it('should write value work on setting `nzOptions` asyn (not match)', fakeAsync(() => {
      const control = testComponent.cascader;
      testComponent.nzOptions = null;
      testComponent.values = ['zhejiang2', 'hangzhou2', 'xihu2'];
      fixture.detectChanges();
      flush(); // force value to be write
      fixture.detectChanges();
      expect(control.getSubmitValue().length).toBe(3);
      expect(control.labelRenderText).toBe('zhejiang2 / hangzhou2 / xihu2');
      testComponent.nzOptions = options1; // update the nzOptions like asyn
      fixture.detectChanges(); // but still the values is not match
      const values = control.getSubmitValue();
      expect(values![0]).toBe('zhejiang2');
      expect(values![1]).toBe('hangzhou2');
      expect(values![2]).toBe('xihu2');
      expect(control.labelRenderText).toBe('zhejiang2 / hangzhou2 / xihu2');
    }));
    it('should click option to expand', () => {
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列：未显示菜单
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu')!.firstElementChild as HTMLElement;
      itemEl1.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      const col2 = overlayContainerElement.querySelectorAll('.ant-cascader-menu').item(1);
      const itemEl2 = col2.firstElementChild as HTMLElement;
      itemEl2.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
    });
    it('should click option to change column count', () => {
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列：未显示菜单
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      itemEl1.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      itemEl2.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列

      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement;
      itemEl3.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
    });
    it('should click option to change column count 2', fakeAsync(() => {
      const LEFT_ARROW = 37;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to open
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列

      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');

      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3);
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values!.join(',')).toBe('zhejiang,hangzhou,xihu');

      const itemEl4 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement;
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
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      itemEl1.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      let itemEl21 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      expect(itemEl21.innerText.trim()).toBe('Hangzhou');

      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement;
      itemEl2.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      itemEl21 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      expect(itemEl21.innerText.trim()).toBe('Nanjing');
    });
    it('should click disabled option false to expand', fakeAsync(() => {
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const optionEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      const optionEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement; // 第1列第2个

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
      (overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement).click(); // 第1列第1个
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      (overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement).click(); // 第2列第1个
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      (overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement).click(); // 第3列第1个
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0);
    }));
    it('should open menu when press DOWN_ARROW', fakeAsync(() => {
      const DOWN_ARROW = 40;
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
    }));
    it('should open menu when press UP_ARROW', fakeAsync(() => {
      const UP_ARROW = 38;
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
    }));
    it('should close menu when press ESC', fakeAsync(() => {
      const ESC = 27;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESC);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));
    it('should navigate up when press UP_ARROW', fakeAsync(() => {
      const UP_ARROW = 38;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:last-child'
      ) as HTMLElement; // 第1列最后1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:first-child'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
    }));
    it('should navigate down when press DOWN_ARROW', fakeAsync(() => {
      const DOWN_ARROW = 40;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
    }));
    it('should navigate right when press RIGHT_ARROW', fakeAsync(() => {
      const DOWN_ARROW = 40;
      const RIGHT_ARROW = 39;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      let itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      let itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第3列第1个
      expect(itemEl3.classList).toContain('ant-cascader-menu-item-active');
    }));
    it('should navigate left when press LEFT_ARROW', fakeAsync(() => {
      const LEFT_ARROW = 37;
      fixture.detectChanges();
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to open
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列

      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第3列第1个
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
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
    }));
    it('should select option when press ENTER', fakeAsync(() => {
      const DOWN_ARROW = 40;
      const RIGHT_ARROW = 39;
      const ENTER = 13;
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
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));
    it('should key nav disabled option correct', fakeAsync(() => {
      const DOWN_ARROW = 40;
      const RIGHT_ARROW = 39;
      const UP_ARROW = 38;

      testComponent.nzOptions = options2;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const optionEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      const optionEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement; // 第1列第2个

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

      const optionEl11 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      const optionEl12 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement; // 第2列第1个
      const optionEl13 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(3)'
      ) as HTMLElement; // 第2列第1个
      const optionEl14 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(4)'
      ) as HTMLElement; // 第2列第1个
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
      const PAGE_UP = 33;
      const PAGE_DOWN = 34;
      const TAB = 9;
      const HOME = 36;
      const END = 35;
      const SPACE = 32;
      const DELETE = 46;
      const COMMA = 188;
      const A = 65;
      const Z = 90;
      const ZERO = 48;
      const NINE = 57;
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
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl1, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl1, 'mouseleave');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl2, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第3列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl2, 'mouseleave');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      expect(testComponent.values).toBeNull(); // not select yet

      dispatchMouseEvent(itemEl3, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active'); // not select because it is leaf
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
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));
    it('should not expand disabled option on hover', fakeAsync(() => {
      testComponent.nzExpandTrigger = 'hover';
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl2, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列

      dispatchMouseEvent(itemEl2, 'mouseleave');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
    }));
    it('should change on select work', fakeAsync(() => {
      testComponent.nzChangeOnSelect = true;
      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl1.click();
      fixture.detectChanges();

      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(1);
      expect(testComponent.values![0]).toBe('zhejiang');

      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl2.click();
      fixture.detectChanges();

      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(2);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');

      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第3列第1个
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
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));
    it('should not change on hover work', fakeAsync(() => {
      testComponent.nzChangeOnSelect = true;
      testComponent.nzExpandTrigger = 'hover';
      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl1, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      expect(testComponent.values).toBeNull(); // mouseenter does not trigger selection

      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl2, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      expect(testComponent.values).toBeNull(); // mouseenter does not trigger selection

      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第3列第1个
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
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.cascader.menuVisible).toBe(false);
    }));
    it('should change on function work', fakeAsync(() => {
      testComponent.nzChangeOn = testComponent.fakeChangeOn;
      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement; // 第1列第2个
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
    it('should position change correct', () => {
      const fakeTopEvent = {
        connectionPair: {
          originX: 'center',
          originY: 'top',
          overlayX: 'center',
          overlayY: 'bottom'
        }
      } as ConnectedOverlayPositionChange;
      const fakeBottomEvent = {
        connectionPair: {
          originX: 'center',
          originY: 'bottom',
          overlayX: 'center',
          overlayY: 'top'
        }
      } as ConnectedOverlayPositionChange;

      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      testComponent.cascader.onPositionChange(fakeTopEvent);
      fixture.detectChanges();
      expect(testComponent.cascader.dropDownPosition).toBe('top');
      testComponent.cascader.onPositionChange(fakeBottomEvent);
      fixture.detectChanges();
      expect(testComponent.cascader.dropDownPosition).toBe('bottom');
    });
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
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
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
      testComponent.cascader.inputValue = 'o';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      let itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      testComponent.cascader.inputValue = '';
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.menuVisible).toBe(true);
      expect(testComponent.cascader.inSearchingMode).toBe(false);
      itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      expect(itemEl1.innerText).toBe('Zhejiang');
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
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
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
        filter(inputValue: string, path: CascaderOption[]): boolean {
          return path.some(p => p.label!.indexOf(inputValue) !== -1);
        }
      } as NzShowSearchOptions;
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
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
        sorter(a: CascaderOption[], b: CascaderOption[], _inputValue: string): number {
          const l1 = a[0].label;
          const l2 = b[0].label; // all reversed, just to be sure it works
          return ('' + l1).localeCompare(l2!);
        }
      } as NzShowSearchOptions;
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
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
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.cascaderService.columns[0][0].disabled).toBe(true);
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
      expect(testComponent.cascader.cascaderService.columns[0][0].disabled).toBe(true);
      expect(testComponent.cascader.cascaderService.columns[0][1].disabled).toBe(undefined);
      expect(testComponent.cascader.cascaderService.columns[0][2].disabled).toBe(true);
    });
    it('should support arrow in search mode', done => {
      const DOWN_ARROW = 40;
      const ENTER = 13;
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(2)'
      ) as HTMLElement;
      const itemEl4 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(4)'
      ) as HTMLElement;
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
      const LEFT_ARROW = 37;
      const RIGHT_ARROW = 39;
      fixture.detectChanges();
      testComponent.nzShowSearch = true;
      testComponent.cascader.inputValue = 'o';
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', LEFT_ARROW);
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
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
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
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
      let itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      expect(itemEl1.innerText).toBe('Zhejiang / Hangzhou / West Lake');
      testComponent.nzOptions = options2;
      fixture.detectChanges();
      expect(testComponent.cascader.inSearchingMode).toBe(true);
      itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement;
      expect(itemEl1.innerText).toBe('Option1 / Option11');
    });
  });

  describe('load data lazily', () => {
    let fixture: ComponentFixture<NzDemoCascaderLoadDataComponent>;
    let cascader: DebugElement;
    let testComponent: NzDemoCascaderLoadDataComponent;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule, ReactiveFormsModule, NoopAnimationsModule, NzCascaderModule],
        declarations: [NzDemoCascaderLoadDataComponent],
        providers: []
      }).compileComponents();

      inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      })();
    }));
    afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
      currentOverlayContainer.ngOnDestroy();
      overlayContainer.ngOnDestroy();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoCascaderLoadDataComponent);
      testComponent = fixture.debugElement.componentInstance;
      cascader = fixture.debugElement.query(By.directive(NzCascaderComponent));
    });

    it('should LOAD DATA work', fakeAsync(() => {
      spyOn(testComponent, 'addCallTimes');

      fixture.detectChanges();
      expect(testComponent.values).toBeNull();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.values).toBeNull(); // not select yet
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(0);

      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(1);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      tick(1000); // wait for first row to load finish
      fixture.detectChanges();

      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl1.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(2);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl2.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第3列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl3.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(4);
      expect(testComponent.values).toBeNull(); // not select yet

      itemEl3.click(); // re-click again, this time it is a leaf
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(4);
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values!.length).toBe(3);
      expect(testComponent.values![0]).toBe('zhejiang');
      expect(testComponent.values![1]).toBe('hangzhou');
      expect(testComponent.values![2]).toBe('xihu');
    }));

    it('should LOAD DATA work when specifies default value', fakeAsync(() => {
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
      const itemEl1 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第1列第1个
      itemEl1.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      const itemEl2 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第2列第1个
      itemEl2.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      const itemEl3 = overlayContainerElement.querySelector(
        '.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)'
      ) as HTMLElement; // 第3列第1个
      itemEl3.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      itemEl3.click(); // re-click again, this time it is a leaf
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      cascader.nativeElement.querySelector('.ant-cascader-picker-clear').click();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.values!.length).toBe(0);
    }));
  });
});

describe('cascader utils', () => {
  it('should predicate args type', () => {
    const date = new Date();
    expect(isObject(date)).toBeTruthy();
    expect(isObject('')).toBeFalsy();
    expect(isObject(void 0)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject({})).toBeTruthy();
  });

  it('should deep copy target', () => {
    expect(clone(null)).toBeNull();
    expect(clone(void 0)).toBeUndefined();
    expect(clone(/a/).toString()).toEqual(/a/.toString());
    const date = new Date();
    expect(clone(date).getTime()).toEqual(date.getTime());

    expect(clone(options1)).not.toBe(options1);
    expect(JSON.stringify(clone(options1))).toEqual(JSON.stringify(options1));
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

const options1 = [
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

const options5: any[] = []; // tslint:disable-line:no-any

@Component({
  selector: 'nz-demo-cascader-default',
  template: `
    <nz-cascader
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      [nzAllowClear]="nzAllowClear"
      [nzAutoFocus]="nzAutoFocus"
      [nzMenuStyle]="nzMenuStyle"
      [nzMenuClassName]="nzMenuClassName"
      [nzColumnClassName]="nzColumnClassName"
      [nzExpandTrigger]="nzExpandTrigger"
      [nzDisabled]="nzDisabled"
      [nzLabelRender]="nzLabelRender"
      [nzLabelProperty]="nzLabelProperty"
      [nzValueProperty]="nzValueProperty"
      [nzPlaceHolder]="nzPlaceHolder"
      [nzShowArrow]="nzShowArrow"
      [nzShowInput]="nzShowInput"
      [nzShowSearch]="nzShowSearch"
      [nzSize]="nzSize"
      [nzTriggerAction]="nzTriggerAction"
      [nzMouseEnterDelay]="nzMouseEnterDelay"
      [nzMouseLeaveDelay]="nzMouseLeaveDelay"
      [nzChangeOn]="nzChangeOn"
      [nzChangeOnSelect]="nzChangeOnSelect"
      (ngModelChange)="onValueChanges($event)"
      (nzVisibleChange)="onVisibleChange($event)"
    >
    </nz-cascader>

    <ng-template #renderTpl let-labels="labels" let-selectedOptions="selectedOptions">
      <ng-container *ngFor="let label of labels; let i = index; let isLast = last">
        {{ label }}{{ isLast ? '' : ' | ' }}
      </ng-container>
    </ng-template>
  `,
  styles: [
    `
      .ant-cascader-picker {
        width: 300px;
      }
    `
  ]
})
export class NzDemoCascaderDefaultComponent {
  @ViewChild(NzCascaderComponent) cascader: NzCascaderComponent;
  @ViewChild('renderTpl') renderTpl: TemplateRef<any>;

  public nzOptions: any[] | null = options1;
  public values: string[] | number[] | null = null;

  nzAllowClear = true;
  nzAutoFocus = false;
  nzMenuClassName = 'menu-classA menu-classB';
  nzColumnClassName = 'column-classA column-classB';
  nzMenuStyle = { height: '120px' };
  nzExpandTrigger = 'click';
  nzDisabled = false;
  nzLabelProperty: string | null = 'label';
  nzValueProperty: string | null = 'value';
  nzPlaceHolder = 'please select';
  nzShowArrow = true;
  nzShowInput = true;
  nzShowSearch: boolean | NzShowSearchOptions = false;
  nzSize = 'default';
  nzLabelRender: TemplateRef<any> | null = null;
  nzChangeOn: any = null;
  nzChangeOnSelect = false;
  nzTriggerAction: string | string[] = 'click';
  nzMouseEnterDelay = 150; // ms
  nzMouseLeaveDelay = 150; // ms

  onVisibleChange = jasmine.createSpy('open change');
  onValueChanges = jasmine.createSpy('value change');

  fakeChangeOn = (node: any, _index: number): boolean => {
    return node.value === 'zhejiang';
  };

  clearSelection(): void {
    this.cascader.clearSelection();
  }
}

@Component({
  selector: 'nz-demo-cascader-load-data',
  template: `
    <nz-cascader
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      [nzLoadData]="nzLoadData"
      (ngModelChange)="onValueChanges($event)"
      (nzVisibleChange)="onVisibleChange($event)"
    >
    </nz-cascader>
  `,
  styles: [
    `
      .ant-cascader-picker {
        width: 300px;
      }
    `
  ]
})
export class NzDemoCascaderLoadDataComponent {
  @ViewChild(NzCascaderComponent) cascader: NzCascaderComponent;

  public nzOptions: any[] | null = null;
  public values: string[] | null = null;

  public nzLoadData = (node: any, index: number): PromiseLike<any> => {
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
          resolve();
        } else if (index === 0) {
          node.children = [
            {
              value: 'hangzhou',
              label: 'Hangzhou'
            }
          ];
          resolve();
        } else if (index === 1) {
          node.children = [
            {
              value: 'xihu',
              label: 'West Lake'
            }
          ];
          resolve();
        } else {
          reject();
        }
      }, 500);
    });
  };

  public addCallTimes(): void {}

  onVisibleChange = jasmine.createSpy('open change');
  onValueChanges = jasmine.createSpy('value change');
}
