/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TestKey } from '@angular/cdk/testing';
import { UnitTestElement } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, NgZone, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import {
  createKeyboardEvent,
  dispatchFakeEvent,
  dispatchMouseEvent,
  MockNgZone,
  typeInElement
} from 'ng-zorro-antd/core/testing';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzSizeLDSType, NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { NzFormControlStatusType, NzFormModule } from 'ng-zorro-antd/form';

import { NzTreeSelectComponent } from './tree-select.component';
import { NzTreeSelectModule } from './tree-select.module';

describe('tree-select', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let zone: MockNgZone;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          }
        }
      ]
    });
    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestTreeSelectBasicComponent>;
    let testComponent: NzTestTreeSelectBasicComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
    }));

    it('should size work', fakeAsync(() => {
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-sm');
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-lg');
    }));

    describe('should variant works', () => {
      it('filled', () => {
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).not.toContain('ant-select-filled');
        testComponent.variant = 'filled';
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).toContain('ant-select-filled');
      });

      it('borderless', () => {
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).not.toContain('ant-select-borderless');
        testComponent.variant = 'borderless';
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).toContain('ant-select-borderless');
      });

      it('underlined', () => {
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).not.toContain('ant-select-underlined');
        testComponent.variant = 'underlined';
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).toContain('ant-select-underlined');
      });
    });

    it('should allowClear work', () => {
      const nativeElement = treeSelect.nativeElement as HTMLElement;
      expect(nativeElement.classList).not.toContain('ant-select-allow-clear');
      expect(nativeElement.querySelector('nz-select-clear')).toBeNull();
      testComponent.allowClear = true;
      fixture.detectChanges();
      expect(nativeElement.classList).toContain('ant-select-allow-clear');
      expect(nativeElement.querySelector('nz-select-clear')).not.toBeNull();

      (nativeElement.querySelector('nz-select-clear') as HTMLElement)!.click();
      fixture.detectChanges();

      expect(nativeElement.querySelector('nz-select-clear')).toBeNull();
    });

    it('should click toggle open', () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(false);
    });

    it('should close when the outside clicks', () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      dispatchFakeEvent(document.body, 'click');
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(false);
      fixture.detectChanges();
    });

    it('should disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-disabled');
      expect(treeSelectComponent.nzOpen).toBe(false);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      tick();
      expect(treeSelectComponent.nzOpen).toBe(false);
      treeSelectComponent.openDropdown();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      tick();
    }));

    it('should dropdownMatchSelectWidth work', () => {
      testComponent.dropdownMatchSelectWidth = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      expect(overlayPane.style.width).toBe('250px');
      treeSelectComponent.closeDropdown();
      fixture.detectChanges();
      testComponent.dropdownMatchSelectWidth = false;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      expect(overlayPane.style.minWidth).toBe('250px');
    });

    it('should clear value work', fakeAsync(() => {
      testComponent.allowClear = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe('10001');
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      treeSelect.nativeElement.querySelector('nz-select-clear').click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(null);
    }));

    it('should set null value work', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.value).toBe('10001');
      testComponent.nzSelectTreeComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.setNull();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.value).toBe(null);
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toEqual(0);
      expect(testComponent.nzSelectTreeComponent.value.length).toBe(0);
    }));

    it('should dropdown style work', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      flush();
      const targetElement = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(targetElement.style.height).toBe('120px');
    }));

    it('should dropdown classname work', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      flush();
      const targetElement = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(targetElement.classList).toContain('class1');
      expect(targetElement.classList).toContain('class2');
    }));

    it('should click option close dropdown', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      fixture.detectChanges();
      const targetNode = overlayContainerElement.querySelectorAll('.ant-select-tree-node-content-wrapper')[2];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      flush();
      expect(treeSelectComponent.nzOpen).toBe(false);
    }));

    it('should be focusable', fakeAsync(() => {
      const focusTrigger = treeSelect.query(By.css('.ant-select-selection-search-input')).nativeElement;
      expect(treeSelect.nativeElement.classList).not.toContain('ant-select-focused');
      dispatchFakeEvent(focusTrigger, 'focus');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-focused');
    }));

    it('should open dropdown when keydown', fakeAsync(async () => {
      const testElement = new UnitTestElement(treeSelect.nativeElement, async () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      });
      expect(treeSelectComponent.nzOpen).toBe(false);
      await testElement.sendKeys(TestKey.ESCAPE);
      expect(treeSelectComponent.nzOpen).toBe(false);

      await testElement.sendKeys(TestKey.ENTER);
      expect(treeSelectComponent.nzOpen).toBe(true);
    }));

    it('should close dropdown when TAB keydown', fakeAsync(async () => {
      const testElement = new UnitTestElement(treeSelect.nativeElement, async () => {
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
      });

      treeSelectComponent.nzOpen = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      await testElement.sendKeys(TestKey.TAB);
      expect(treeSelectComponent.nzOpen).toBe(false);
    }));

    it('should showSearch work', fakeAsync(() => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      const searchInput = treeSelect.nativeElement.querySelector('nz-select-search .ant-select-selection-search-input');
      expect(searchInput).toBeTruthy();
      expect(searchInput.style.opacity).toBe('');
      testComponent.showSearch = false;
      fixture.detectChanges();
      tick();
      expect(searchInput.style.opacity).toBe('0');
      flush();
      fixture.detectChanges();
    }));

    it('should display no data', fakeAsync(() => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeFalsy();
      fixture.detectChanges();
      treeSelectComponent.inputValue = 'invalid_value';
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBe('');
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeTruthy();
    }));

    it('should clean search value when reopen', fakeAsync(() => {
      testComponent.showSearch = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      treeSelectComponent.inputValue = 'invalid_value';
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeTruthy();

      treeSelect.nativeElement.click();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeFalsy();
    }));

    it('should max tag count work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.multiple = true;
      fixture.detectChanges();
      testComponent.value = ['1001', '10001', '100011', '100012'];
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(treeSelect.nativeElement.querySelectorAll('nz-select-item').length).toBe(4);
      testComponent.maxTagCount = 2;
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(treeSelect.nativeElement.querySelectorAll('nz-select-item').length).toBe(3);
      const maxTagPlaceholderElement = treeSelect.nativeElement.querySelectorAll('nz-select-item')[2];
      expect(maxTagPlaceholderElement).toBeTruthy();
      expect(maxTagPlaceholderElement.innerText.trim()).toBe(
        `+ ${testComponent.value.length - testComponent.maxTagCount} ...`
      );
    }));

    it('should set selectable', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      let node = overlayContainerElement.querySelector('.ant-select-tree-node-content-wrapper')!;
      dispatchMouseEvent(node, 'click');
      fixture.detectChanges();
      flush();
      expect(treeSelectComponent.nzOpen).toBe(false);
      testComponent.nodes[0].selectable = false;
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      node = overlayContainerElement.querySelector('nz-tree-node[builtin]')!;
      dispatchMouseEvent(node, 'click');
      fixture.detectChanges();
      flush();
      expect(treeSelectComponent.nzOpen).toBe(true);
    }));

    it('should nzBackdrop work', fakeAsync(() => {
      testComponent.hasBackdrop = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(overlayContainerElement.children[0].classList).toContain('cdk-overlay-backdrop');
    }));

    it('should isComposing/inputValue is correct', fakeAsync(() => {
      treeSelectComponent.inputValue = '';
      treeSelectComponent.isComposingChange(true);
      treeSelectComponent.setInputValue('1011');
      flush();
      expect(treeSelectComponent.isComposing).toBe(true);
      expect(treeSelectComponent.inputValue).toBe('');
    }));

    it('should nzPrefix work', () => {
      const host = fixture.debugElement.nativeElement;
      testComponent.prefix = 'prefix';
      fixture.detectChanges();
      expect(host.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('prefix');

      testComponent.prefix = testComponent.affixTemplate;
      fixture.detectChanges();
      expect(host.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('icon');
    });

    it('should nzSuffixIcon work', () => {
      const host = fixture.debugElement.nativeElement;
      expect(host.querySelector('.anticon-down')).toBeTruthy();
      testComponent.suffixIcon = testComponent.affixTemplate;
      fixture.detectChanges();
      expect(host.querySelector('nz-select-arrow')!.textContent?.trim()).toBe('icon');
    });
  });

  describe('checkable', () => {
    let fixture: ComponentFixture<NzTestTreeSelectCheckableComponent>;
    let testComponent: NzTestTreeSelectCheckableComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectCheckableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
    }));

    it('should is multiple', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      expect(treeSelectComponent.isMultiple).toBe(true);
      flush();
    }));

    it('should update input width', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      flush();
      const input = treeSelect.nativeElement.querySelector('input') as HTMLInputElement;
      typeInElement('test', input);
      fixture.detectChanges();
      flush();
      typeInElement('test test test', input);
      fixture.detectChanges();
      flush();
      treeSelectComponent.inputValue = '';
      fixture.detectChanges();
      flush();
      typeInElement('', input);
      fixture.detectChanges();
      flush();
      zone.simulateZoneExit();
      fixture.detectChanges();
      expect(input.style.width === '').toBe(true);
    }));

    it('should set null value work', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.value![0]).toBe('1000122');
      testComponent.setNull();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.value).toBe(null);
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(0);
      expect(testComponent.nzSelectTreeComponent.value.length).toBe(0);
    }));

    it('should not check strictly work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.value = ['1001', '10001', '100012'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(1);
      flush();
    }));

    it('should check strictly work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.checkStrictly = true;
      testComponent.value = ['1001', '10001', '100012'];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(3);
      testComponent.checkStrictly = false;
      flush();
      fixture.detectChanges();
    }));

    it('should remove checked when press backs', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      flush();
      const input = treeSelect.nativeElement.querySelector('input') as HTMLInputElement;
      const BACKSPACE_EVENT = createKeyboardEvent('keydown', BACKSPACE, input);
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      expect(treeSelectComponent.selectedNodes.length === 1).toBe(true);
      treeSelectComponent.onKeyDownInput(BACKSPACE_EVENT);
      fixture.detectChanges();
      tick(200);
      expect(treeSelectComponent.selectedNodes.length === 0).toBe(true);
      treeSelectComponent.onKeyDownInput(BACKSPACE_EVENT);
      fixture.detectChanges();
      tick(200);
      expect(treeSelectComponent.selectedNodes.length === 0).toBe(true);
    }));

    it('should click option not close dropdown', fakeAsync(() => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      fixture.detectChanges();
      const targetNode = overlayContainerElement.querySelectorAll('nz-tree-node[builtin]')[2];
      dispatchMouseEvent(targetNode, 'click');
      fixture.detectChanges();
      flush();
      expect(treeSelectComponent.nzOpen).toBe(true);
    }));

    it('should prevent open the dropdown when click remove', fakeAsync(() => {
      testComponent.value = ['1000122'];
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(treeSelectComponent.selectedNodes.length).toBe(1);
      treeSelect.nativeElement.querySelector('.ant-select-selection-item-remove').click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(treeSelectComponent.selectedNodes.length).toBe(0);
      expect(treeSelectComponent.nzOpen).toBe(false);
    }));

    it('should display no data', fakeAsync(() => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch = true;
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeFalsy();
      fixture.detectChanges();
      treeSelectComponent.inputValue = 'invalid_value';
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBe('');
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeTruthy();
    }));
  });

  describe('form', () => {
    let fixture: ComponentFixture<NzTestTreeSelectFormComponent>;
    let testComponent: NzTestTreeSelectFormComponent;
    let treeSelect: DebugElement;
    let treeSelectComponent: NzTreeSelectComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectFormComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
    });

    it('should set disabled work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const nativeElement = treeSelect.nativeElement as HTMLElement;
      expect(nativeElement.classList).not.toContain('ant-select-disabled');
      expect(nativeElement.querySelector('nz-select-clear')).not.toBeNull();
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(nativeElement.classList).toContain('ant-select-disabled');
      expect(nativeElement.querySelector('nz-select-clear')).toBeNull();
    }));

    it('should set null value work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe('10021');
      testComponent.setNull();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(null);
      expect(treeSelectComponent.selectedNodes.length).toBe(0);
      expect(treeSelectComponent.value.length).toBe(0);
    }));
  });

  describe('tree component', () => {
    let fixture: ComponentFixture<NzTestTreeSelectCheckableComponent>;
    let testComponent: NzTestTreeSelectCheckableComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectCheckableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      tick(200);
      fixture.detectChanges();
    }));

    it('should keep expand state', () => {
      testComponent.expandKeys = [];
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzExpandedKeys.length === 0).toBe(true);
      expect(treeSelectComponent.nzOpen).toBe(true);
      let targetSwitcher = overlayContainerElement.querySelector('.ant-select-tree-switcher')!;
      expect(targetSwitcher.classList.contains('ant-select-tree-switcher_close')).toBe(true);
      fixture.detectChanges();
      dispatchMouseEvent(targetSwitcher, 'click');
      fixture.detectChanges();
      targetSwitcher = overlayContainerElement.querySelector('.ant-select-tree-switcher')!;
      expect(targetSwitcher.classList.contains('ant-select-tree-switcher_open')).toBe(true);
      expect(treeSelectComponent.nzExpandedKeys[0] === '1001').toBe(true);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(false);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      targetSwitcher = overlayContainerElement.querySelector('.ant-select-tree-switcher')!;
      expect(treeSelectComponent.nzOpen).toBe(true);
      expect(targetSwitcher.classList.contains('ant-select-tree-switcher_open')).toBe(true);
      expect(treeSelectComponent.nzExpandedKeys[0] === '1001').toBe(true);
    });
  });

  describe('customized icon', () => {
    let fixture: ComponentFixture<NzTestTreeSelectCustomizedIconComponent>;
    let treeSelect: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectCustomizedIconComponent);
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
    });

    it('should display', fakeAsync(() => {
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      flush();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.anticon.anticon-frown-o')).toBeTruthy();
    }));
  });

  describe('Status', () => {
    let fixture: ComponentFixture<NzTestTreeSelectStatusComponent>;
    let treeSelect: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectStatusComponent);
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(treeSelect.nativeElement.className).toContain('ant-select-status-error');

      fixture.componentInstance.status = 'warning';
      fixture.detectChanges();
      expect(treeSelect.nativeElement.className).toContain('ant-select-status-warning');

      fixture.componentInstance.status = '';
      fixture.detectChanges();
      expect(treeSelect.nativeElement.className).not.toContain('ant-select-status-warning');
    });
  });

  describe('in form', () => {
    let fixture: ComponentFixture<NzTestTreeSelectInFormComponent>;
    let treeSelect!: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectInFormComponent);
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(treeSelect.classList).toContain('ant-select-status-error');

      fixture.componentInstance.status = 'warning';
      fixture.detectChanges();
      expect(treeSelect.classList).toContain('ant-select-status-warning');

      fixture.componentInstance.status = 'success';
      fixture.detectChanges();
      expect(treeSelect.classList).toContain('ant-select-status-success');

      fixture.componentInstance.feedback = false;
      fixture.detectChanges();
      expect(treeSelect.querySelector('nz-form-item-feedback-icon')).toBeNull();
    });
  });

  describe('virtual scroll', () => {
    let fixture: ComponentFixture<NzTestTreeSelectVirtualScrollComponent>;
    let treeSelect: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectVirtualScrollComponent);
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
    });

    it('should set nzVirtualHeight work', fakeAsync(() => {
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      flush();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const virtualScrollViewport = overlayContainerElement.querySelector('.cdk-virtual-scroll-viewport')!;
      expect(window.getComputedStyle(virtualScrollViewport).height).toBe('300px');
    }));

    it('should support x-scroll when the length of node label is greater than the length of select dropdown', fakeAsync(() => {
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      flush();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      overlayContainerElement
        .querySelector('.cdk-virtual-scroll-content-wrapper')!
        .setAttribute('style', 'width: 250px');
      const virtualScrollViewport = overlayContainerElement.querySelector('.cdk-virtual-scroll-content-wrapper')!;
      expect(virtualScrollViewport.clientWidth).toBe(250);
      expect(virtualScrollViewport.scrollWidth).toBeGreaterThan(250);
    }));
  });
});

@Component({
  imports: [NzTreeSelectModule, FormsModule],
  template: `
    <nz-tree-select
      style="width:250px;position: relative;display: block;"
      nzPlaceHolder="Please select"
      [nzExpandedKeys]="expandKeys"
      [nzNodes]="nodes"
      [(ngModel)]="value"
      [nzSize]="size"
      [nzVariant]="variant"
      [nzAllowClear]="allowClear"
      [nzDropdownMatchSelectWidth]="dropdownMatchSelectWidth"
      [nzDisabled]="disabled"
      [nzShowSearch]="showSearch"
      [nzMultiple]="multiple"
      [nzMaxTagCount]="maxTagCount"
      [nzDropdownStyle]="{ height: '120px' }"
      [nzBackdrop]="hasBackdrop"
      [nzPrefix]="prefix"
      [nzSuffixIcon]="suffixIcon"
      nzDropdownClassName="class1 class2"
    />
    <ng-template #affixTemplate>icon</ng-template>
  `
})
export class NzTestTreeSelectBasicComponent {
  @ViewChild(NzTreeSelectComponent, { static: false }) nzSelectTreeComponent!: NzTreeSelectComponent;
  @ViewChild('affixTemplate', { static: false }) affixTemplate!: TemplateRef<void>;
  expandKeys = ['1001', '10001'];
  value: string | string[] | null = '10001';
  size: NzSizeLDSType = 'default';
  variant: NzVariant = 'outlined';
  allowClear = false;
  disabled = false;
  showSearch = false;
  dropdownMatchSelectWidth = true;
  multiple = false;
  maxTagCount = Infinity;
  prefix: string | TemplateRef<void> | null = null;
  suffixIcon: string | TemplateRef<void> | null = null;
  nodes: NzTreeNodeOptions[] = [
    {
      title: 'root1',
      key: '1001',
      children: [
        {
          title: 'child1',
          key: '10001',
          children: [
            {
              title: 'child1.1',
              key: '100011',
              children: []
            },
            {
              title: 'child1.2',
              key: '100012',
              children: [
                {
                  title: 'grandchild1.2.1',
                  key: '1000121',
                  isLeaf: true,
                  disabled: true
                },
                {
                  title: 'grandchild1.2.2',
                  key: '1000122',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'root2',
      key: '1002',
      children: [
        {
          title: 'child2.1',
          key: '10021',
          children: [],
          disableCheckbox: true
        },
        {
          title: 'child2.2',
          key: '10022',
          children: [
            {
              title: 'grandchild2.2.1',
              key: '100221',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];
  hasBackdrop = false;

  setNull(): void {
    this.value = null;
  }
}

@Component({
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      nzPlaceHolder="Please select"
      [nzExpandedKeys]="expandKeys"
      [nzNodes]="nodes"
      [nzShowSearch]="showSearch"
      [nzCheckable]="true"
      [nzCheckStrictly]="checkStrictly"
      [(ngModel)]="value"
    />
  `
})
export class NzTestTreeSelectCheckableComponent {
  @ViewChild(NzTreeSelectComponent, { static: false }) nzSelectTreeComponent!: NzTreeSelectComponent;
  expandKeys = ['1001', '10001'];
  value: string[] | null = ['1000122'];
  showSearch = false;
  checkStrictly = false;
  nodes = [
    {
      title: 'root1',
      key: '1001',
      children: [
        {
          title: 'child1',
          key: '10001',
          children: [
            {
              title: 'child1.1',
              key: '100011',
              children: []
            },
            {
              title: 'child1.2',
              key: '100012',
              children: [
                {
                  title: 'grandchild1.2.1',
                  key: '1000121',
                  isLeaf: true,
                  disabled: true
                },
                {
                  title: 'grandchild1.2.2',
                  key: '1000122',
                  isLeaf: true
                }
              ]
            }
          ]
        }
      ]
    },
    {
      title: 'root2',
      key: '1002',
      children: [
        {
          title: 'child2.1',
          key: '10021',
          children: [],
          disableCheckbox: true
        },
        {
          title: 'child2.2',
          key: '10022',
          children: [
            {
              title: 'grandchild2.2.1',
              key: '100221',
              isLeaf: true
            }
          ]
        }
      ]
    }
  ];

  setNull(): void {
    this.value = null;
  }
}

@Component({
  imports: [ReactiveFormsModule, NzTreeSelectModule],
  template: `
    <form>
      <nz-tree-select [formControl]="formControl" [nzNodes]="nodes" />
    </form>
  `
})
export class NzTestTreeSelectFormComponent {
  formControl = new FormControl('10021');
  nodes = [
    {
      title: 'root2',
      key: '1002',
      children: [
        {
          title: 'child2.1',
          key: '10021'
        },
        {
          title: 'child2.2',
          key: '10022'
        }
      ]
    }
  ].map(item => new NzTreeNode(item));

  disable(): void {
    this.formControl.disable();
  }

  setNull(): void {
    this.formControl.reset(null);
  }
}

@Component({
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select [nzNodes]="nodes" [(ngModel)]="value">
      <ng-template #nzTreeTemplate let-node>
        <span>
          <span class="anticon anticon-frown-o"></span>
          {{ node.title }}
        </span>
      </ng-template>
    </nz-tree-select>
  `
})
export class NzTestTreeSelectCustomizedIconComponent {
  value?: string;
  nodes = [
    new NzTreeNode({
      title: 'root3',
      key: '1003',
      children: [
        {
          title: 'child3.1',
          key: '10031'
        },
        {
          title: 'child3.2',
          key: '10032'
        }
      ]
    })
  ];
}

@Component({
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      [nzNodes]="nodes"
      nzShowSearch
      [nzStatus]="status"
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
    />
  `
})
export class NzTestTreeSelectStatusComponent {
  status: NzStatus = 'error';
  value?: string = '1001';
  nodes = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          children: [
            { title: 'leaf 1-0-0', key: '10010', isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }]
        }
      ]
    }
  ];
}

@Component({
  imports: [ReactiveFormsModule, NzFormModule, NzTreeSelectModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback" [nzValidateStatus]="status">
          <nz-tree-select [nzNodes]="[]" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestTreeSelectInFormComponent {
  status: NzFormControlStatusType = 'error';
  feedback = true;
}

function dig(path = '0', level = 3): NzTreeNodeOptions[] {
  const list: NzTreeNodeOptions[] = [];
  for (let i = 0; i < 10; i += 1) {
    // long key for overflow
    const key = `${path}-${i}-${Array(50).join('x')}`;
    const treeNode: NzTreeNodeOptions = {
      title: key,
      key,
      expanded: true,
      children: [],
      isLeaf: false
    };

    if (level > 0) {
      treeNode.children = dig(key, level - 1);
    } else {
      treeNode.isLeaf = true;
    }

    list.push(treeNode);
  }
  return list;
}

@Component({
  imports: [NzTreeSelectModule],
  template: `
    <nz-tree-select
      [nzNodes]="nodes"
      nzShowSearch
      nzPlaceHolder="Please select"
      nzVirtualHeight="300px"
      nzHideUnMatched="true"
      [nzDropdownMatchSelectWidth]="true"
    />
  `
})
export class NzTestTreeSelectVirtualScrollComponent {
  nodes: NzTreeNodeOptions[] = dig();
}
