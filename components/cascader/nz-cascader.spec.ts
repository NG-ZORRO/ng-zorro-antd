// tslint:disable:no-any
import { ConnectedOverlayPositionChange, OverlayContainer } from '@angular/cdk/overlay';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, inject, tick, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { dispatchKeyboardEvent, dispatchMouseEvent } from '../core/testing';

// import { NzDemoCascaderBasicComponent } from './demo/basic';
import { NzCascaderComponent } from './nz-cascader.component';
import { NzCascaderModule } from './nz-cascader.module';

describe('cascader', () => {
  let fixture;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  describe('default', () => {
    let cascader;
    let testComponent: NzDemoCascaderDefaultComponent;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ FormsModule, ReactiveFormsModule, NoopAnimationsModule, NzCascaderModule ],
        declarations: [ NzDemoCascaderDefaultComponent ],
        providers   : []
      }).compileComponents();

      inject([ OverlayContainer ], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      })();
    }));
    afterEach(inject([ OverlayContainer ], (currentOverlayContainer: OverlayContainer) => {
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
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe('Zhejiang / Hangzhou / West Lake');
      expect(testComponent.cascader.getSubmitValue().join(',')).toBe('1,2,3');
    }));
    it('should showArrow work', () => {
      testComponent.nzShowArrow = true;
      fixture.detectChanges();
      const arrow: HTMLElement = cascader.nativeElement.querySelector('.ant-cascader-picker-arrow');
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-arrow')).toBeDefined();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-arrow').classList).toContain('anticon-down');
      testComponent.nzShowArrow = false;
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-arrow')).toBeNull();
    });
    it('should allowClear work', () => {
      fixture.detectChanges();
      const input: HTMLElement = cascader.nativeElement.querySelector('.ant-cascader-input');
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
    });
    it('should click toggle open', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.nzDisabled).toBe(false);

      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(1);

      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(2);
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
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
      expect(testComponent.onVisibleChange).toHaveBeenCalledTimes(0);
    }));
    it('should clear value work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.nzAllowClear = true;
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      expect(testComponent.values.length).toBe(3);
      fixture.detectChanges();
      cascader.nativeElement.querySelector('.ant-cascader-picker-clear').click();
      fixture.detectChanges();
      expect(testComponent.values.length).toBe(0);
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
    it('should menu class work', fakeAsync(() => {
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-cascader-menus').classList).toContain('menu-classA');
      expect(overlayContainerElement.querySelector('.ant-cascader-menu').classList).toContain('column-classA');
    }));
    it('should menu style work', fakeAsync(() => {
      fixture.detectChanges();
      cascader.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
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
      expect(cascader.nativeElement.querySelector('.ant-cascader-input')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-clear')).toBeNull();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label')).toBeNull();
    }));
    it('should create label work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe('');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe('Zhejiang / Hangzhou / West Lake');
    }));
    it('should label template work', fakeAsync(() => {
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText).toBe('');
      testComponent.values = ['zhejiang', 'hangzhou', 'xihu'];
      testComponent.nzLabelRender = testComponent.renderTpl;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(cascader.nativeElement.querySelector('.ant-cascader-picker-label').innerText.trim()).toBe('Zhejiang | Hangzhou | West Lake');
    }));
    it('should click option to expand', () => {
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列：未显示菜单
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(1); // 1列
      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu').firstElementChild as HTMLElement;
      itemEl1.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      const col2 = overlayContainerElement.querySelectorAll('.ant-cascader-menu').item(1);
      const itemEl2 = col2.firstElementChild as HTMLElement;
      itemEl2.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
    });
    it('should click left option to close menu', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      (overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement).click(); // 第1列第1个
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      (overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)') as HTMLElement).click(); // 第2列第1个
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      (overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)') as HTMLElement).click(); // 第3列第1个
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0);
    }));
    it('should open menu when press DOWN_ARROW', fakeAsync(() => {
      const DOWN_ARROW = 40;
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', DOWN_ARROW);
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
    }));
    it('should open menu when press UP_ARROW', fakeAsync(() => {
      const UP_ARROW = 38;
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', UP_ARROW);
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
    }));
    it('should close menu when press ESC', fakeAsync(() => {
      const ESC = 27;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', ESC);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
    }));
    it('should navigate down when press DOWN_ARROW', fakeAsync(() => {
      const DOWN_ARROW = 40;
      fixture.detectChanges();
      testComponent.cascader.setMenuVisible(true);
      fixture.detectChanges();
      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第1列第1个
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
      let itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      let itemEl2 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第2列第1个
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      dispatchKeyboardEvent(cascader.nativeElement, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      itemEl2 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第2列第1个
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      const itemEl3 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第3列第1个
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

      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第1列第1个
      const itemEl2 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第2列第1个
      const itemEl3 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第3列第1个
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
      expect(testComponent.values.length).toBe(3);
      expect(testComponent.values[0]).toBe('zhejiang');
      expect(testComponent.values[1]).toBe('hangzhou');
      expect(testComponent.values[2]).toBe('xihu');
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
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

      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');

      dispatchMouseEvent(itemEl1, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      const itemEl2 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第2列第1个
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
      const itemEl3 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第3列第1个
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
      expect(testComponent.values.length).toBe(3);
      expect(testComponent.values[0]).toBe('zhejiang');
      expect(testComponent.values[1]).toBe('hangzhou');
      expect(testComponent.values[2]).toBe('xihu');
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
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

      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl1.click();
      fixture.detectChanges();

      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values.length).toBe(1);
      expect(testComponent.values[0]).toBe('zhejiang');

      const itemEl2 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第2列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl2.click();
      fixture.detectChanges();

      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values.length).toBe(2);
      expect(testComponent.values[0]).toBe('zhejiang');
      expect(testComponent.values[1]).toBe('hangzhou');

      const itemEl3 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第3列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl3.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.values).toBeDefined();
      expect(testComponent.values.length).toBe(3);
      expect(testComponent.values[0]).toBe('zhejiang');
      expect(testComponent.values[1]).toBe('hangzhou');
      expect(testComponent.values[2]).toBe('xihu');
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
    }));

    it('should change on hover work', fakeAsync(() => {
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

      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl1, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values.length).toBe(1);
      expect(testComponent.values[0]).toBe('zhejiang');

      const itemEl2 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第2列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl2, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.cascader.isMenuVisible()).toBe(true);
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      expect(testComponent.values).toBeDefined();
      expect(testComponent.values.length).toBe(2);
      expect(testComponent.values[0]).toBe('zhejiang');
      expect(testComponent.values[1]).toBe('hangzhou');

      const itemEl3 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第3列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      dispatchMouseEvent(itemEl3, 'mouseenter');
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.values).toBeDefined();
      expect(testComponent.values.length).toBe(2);
      expect(testComponent.values[0]).toBe('zhejiang');
      expect(testComponent.values[1]).toBe('hangzhou');

      itemEl3.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();

      expect(testComponent.values).toBeDefined();
      expect(testComponent.values.length).toBe(3);
      expect(testComponent.values[0]).toBe('zhejiang');
      expect(testComponent.values[1]).toBe('hangzhou');
      expect(testComponent.values[2]).toBe('xihu');
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(0); // 0列
      expect(testComponent.cascader.isMenuVisible()).toBe(false);
    }));
  });

  describe('load data lazily', () => {
    let cascader;
    let testComponent: NzDemoCascaderLoadDataComponent;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ FormsModule, ReactiveFormsModule, NoopAnimationsModule, NzCascaderModule ],
        declarations: [ NzDemoCascaderLoadDataComponent ],
        providers   : []
      }).compileComponents();

      inject([ OverlayContainer ], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      })();
    }));
    afterEach(inject([ OverlayContainer ], (currentOverlayContainer: OverlayContainer) => {
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

      const itemEl1 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(1) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第1列第1个
      expect(itemEl1.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl1.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(2);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(2); // 2列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl2 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(2) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第2列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl2.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3);
      expect(overlayContainerElement.querySelectorAll('.ant-cascader-menu').length).toBe(3); // 3列
      expect(testComponent.values).toBeNull(); // not select yet

      const itemEl3 = overlayContainerElement.querySelector('.ant-cascader-menu:nth-child(3) .ant-cascader-menu-item:nth-child(1)') as HTMLElement; // 第3列第1个
      expect(itemEl1.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl2.classList).toContain('ant-cascader-menu-item-active');
      expect(itemEl3.classList).not.toContain('ant-cascader-menu-item-active');
      itemEl3.click();
      fixture.detectChanges();
      tick(600);
      fixture.detectChanges();
      flush(); // wait for cdk-overlay to close
      fixture.detectChanges();
      expect(testComponent.addCallTimes).toHaveBeenCalledTimes(3); // left node will not load data

      expect(testComponent.values).toBeDefined();
      expect(testComponent.values.length).toBe(3);
      expect(testComponent.values[0]).toBe('zhejiang');
      expect(testComponent.values[1]).toBe('hangzhou');
      expect(testComponent.values[2]).toBe('xihu');
    }));

  });
});

const ID_NAME_LIST = [{
  id: 1,
  name: 'Zhejiang',
  children: [{
    id: 2,
    name: 'Hangzhou',
    children: [{
      id: 3,
      name: 'West Lake',
      isLeaf: true
    }]
  }]
}];

const options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }]
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }]
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }]
  }]
}];

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
      [nzSize]="nzSize"
      [nzChangeOnSelect]="nzChangeOnSelect"
      (ngModelChange)="onValueChanges($event)"
      (nzVisibleChange)="onVisibleChange($event)">
    </nz-cascader>

    <ng-template #renderTpl let-labels="labels" let-selectedOptions="selectedOptions">
      <ng-container *ngFor="let label of labels; let i = index; let isLast = last">
        {{label}}{{isLast ? '' : ' | '}}
      </ng-container>
    </ng-template>
    `,
  styles  : [
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

  public nzOptions: any[] = options;
  public values: string[] | number[] = null;

  nzAllowClear = true;
  nzAutoFocus = false;
  nzMenuClassName = 'menu-classA menu-classB';
  nzColumnClassName = 'column-classA column-classB';
  nzMenuStyle = { height: '120px' };
  nzExpandTrigger = 'click';
  nzDisabled = false;
  nzLabelProperty = 'label';
  nzValueProperty = 'value';
  nzPlaceHolder = 'please select';
  nzShowArrow = true;
  nzShowInput = true;
  nzSize = 'default';
  nzLabelRender = null;
  nzChangeOnSelect = false;

  onVisibleChange = jasmine.createSpy('open change');
  onValueChanges = jasmine.createSpy('value change');

}

@Component({
  selector: 'nz-demo-cascader-load-data',
  template: `
    <nz-cascader
      [nzOptions]="nzOptions"
      [(ngModel)]="values"
      [nzLoadData]="nzLoadData"
      (ngModelChange)="onValueChanges($event)"
      (nzVisibleChange)="onVisibleChange($event)">
    </nz-cascader>
    `,
  styles  : [
    `
    .ant-cascader-picker {
      width: 300px;
    }
    `
  ]
})
export class NzDemoCascaderLoadDataComponent {
  @ViewChild(NzCascaderComponent) cascader: NzCascaderComponent;

  public nzOptions: any[] = null;
  public values: string[] = null;

  public nzLoadData = (node: any, index: number): PromiseLike<any> => {
    this.addCallTimes();
    return new Promise((resolve) => {
      setTimeout(() => {
        if (index < 0) { // if index less than 0 it is root node
          node.children = [{
            value: 'zhejiang',
            label: 'Zhejiang'
          }];
        } else if (index === 0) {
          node.children = [{
            value: 'hangzhou',
            label: 'Hangzhou'
          }];
        } else {
          node.children = [{
            value: 'xihu',
            label: 'West Lake',
            isLeaf: true
          }];
        }
        resolve();
      }, 500);
    });
  }

  public addCallTimes(): void {
  }

  onVisibleChange = jasmine.createSpy('open change');
  onValueChanges = jasmine.createSpy('value change');

}
