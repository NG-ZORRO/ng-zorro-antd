/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { TestKey } from '@angular/cdk/testing';
import { UnitTestElement } from '@angular/cdk/testing/testbed';
import { Component, DebugElement, NgZone, signal, TemplateRef, ViewChild, WritableSignal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NZ_FORM_SIZE, NZ_FORM_VARIANT } from 'ng-zorro-antd/core/form';
import {
  createKeyboardEvent,
  dispatchFakeEvent,
  dispatchMouseEvent,
  MockNgZone,
  typeInElement,
  updateNonSignalsInput
} from 'ng-zorro-antd/core/testing';
import { NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzSizeLDSType, NzStatus, NzVariant } from 'ng-zorro-antd/core/types';
import { NzFormControlStatusType, NzFormModule } from 'ng-zorro-antd/form';
import { NZ_SPACE_COMPACT_SIZE } from 'ng-zorro-antd/space';

import { NzPlacementType, NzTreeSelectComponent } from './tree-select.component';
import { NzTreeSelectModule } from './tree-select.module';

describe('tree-select', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  let zone: MockNgZone;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNzNoAnimation(),
        {
          provide: NgZone,
          useFactory: () => {
            zone = new MockNgZone();
            return zone;
          }
        }
      ]
    });
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestTreeSelectBasicComponent>;
    let testComponent: NzTestTreeSelectBasicComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
    });

    it('should size work', () => {
      testComponent.size.set('small');
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-sm');
      testComponent.size.set('large');
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-lg');
    });

    it('should placement works', async () => {
      treeSelectComponent.openDropdown();
      fixture.detectChanges();
      let element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      const setPlacement = async (placement: NzPlacementType): Promise<void> => {
        treeSelectComponent.closeDropdown();
        fixture.detectChanges();
        testComponent.placement.set(placement);
        fixture.detectChanges();
        treeSelectComponent.openDropdown();
        fixture.detectChanges();
        await fixture.whenStable();
      };

      await setPlacement('bottomRight');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      await setPlacement('topLeft');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(true);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(false);

      await setPlacement('topRight');
      element = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(element.classList.contains('ant-select-dropdown-placement-bottomLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-bottomRight')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topLeft')).toBe(false);
      expect(element.classList.contains('ant-select-dropdown-placement-topRight')).toBe(true);
    });

    describe('should variant works', () => {
      it('outlined', () => {
        testComponent.variant.set('outlined');
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).toContain('ant-select-outlined');
      });

      it('filled', () => {
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).not.toContain('ant-select-filled');
        testComponent.variant.set('filled');
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).toContain('ant-select-filled');
      });

      it('borderless', () => {
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).not.toContain('ant-select-borderless');
        testComponent.variant.set('borderless');
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).toContain('ant-select-borderless');
      });

      it('underlined', () => {
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).not.toContain('ant-select-underlined');
        testComponent.variant.set('underlined');
        fixture.detectChanges();
        expect(treeSelect.nativeElement.classList).toContain('ant-select-underlined');
      });
    });

    it('should allowClear work', async () => {
      const nativeElement = treeSelect.nativeElement as HTMLElement;
      expect(nativeElement.classList).not.toContain('ant-select-allow-clear');
      expect(nativeElement.querySelector('nz-select-clear')).toBeNull();
      testComponent.allowClear.set(true);
      await fixture.whenStable();
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

    it('should disabled work', async () => {
      testComponent.disabled.set(true);
      fixture.detectChanges();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-disabled');
      expect(treeSelectComponent.nzOpen).toBe(false);
      treeSelect.nativeElement.click();
      await fixture.whenStable();
      expect(treeSelectComponent.nzOpen).toBe(false);
    });

    it('should dropdownMatchSelectWidth work', async () => {
      testComponent.dropdownMatchSelectWidth.set(true);
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
      expect(overlayPane.style.width).toBe('250px');

      treeSelectComponent.closeDropdown();
      fixture.detectChanges();
      testComponent.dropdownMatchSelectWidth.set(false);
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      await updateNonSignalsInput(fixture, 16);
      fixture.detectChanges();
      expect(overlayPane.style.minWidth).toBe('250px');
    });

    it('should clear value work', async () => {
      testComponent.allowClear.set(true);
      await fixture.whenStable();
      expect(testComponent.value()).toBe('10001');
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      treeSelect.nativeElement.querySelector('nz-select-clear').click();
      await fixture.whenStable();
      expect(testComponent.value()).toBe(null);
    });

    it('should set null value work', async () => {
      fixture.detectChanges();
      expect(testComponent.value()).toBe('10001');
      testComponent.nzSelectTreeComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.setNull();
      await fixture.whenStable();
      expect(testComponent.value()).toBe(null);
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toEqual(0);
      expect(testComponent.nzSelectTreeComponent.value.length).toBe(0);
    });

    it('should dropdown style work', () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      const targetElement = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(targetElement.style.height).toBe('120px');
    });

    it('should dropdown classname work', () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      const targetElement = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(targetElement.classList).toContain('class1');
      expect(targetElement.classList).toContain('class2');
    });

    it('should click option close dropdown', async () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      fixture.detectChanges();
      const targetNode = overlayContainerElement.querySelectorAll('.ant-select-tree-node-content-wrapper')[2];
      dispatchMouseEvent(targetNode, 'click');
      await fixture.whenStable();
      expect(treeSelectComponent.nzOpen).toBe(false);
    });

    it('should be focusable', async () => {
      const focusTrigger = treeSelect.query(By.css('.ant-select-selection-search-input')).nativeElement;
      expect(treeSelect.nativeElement.classList).not.toContain('ant-select-focused');
      dispatchFakeEvent(focusTrigger, 'focus');
      await fixture.whenStable();
      expect(treeSelect.nativeElement.classList).toContain('ant-select-focused');
    });

    async function noop(): Promise<void> {
      // noop
    }

    it('should open dropdown when keydown', async () => {
      const testElement = new UnitTestElement(treeSelect.nativeElement, noop);
      expect(treeSelectComponent.nzOpen).toBe(false);

      await testElement.sendKeys(TestKey.ESCAPE);
      expect(treeSelectComponent.nzOpen).toBe(false);

      await testElement.sendKeys(TestKey.ENTER);
      expect(treeSelectComponent.nzOpen).toBe(true);
    });

    it('should close dropdown when TAB keydown', async () => {
      const testElement = new UnitTestElement(treeSelect.nativeElement, noop);

      treeSelectComponent.nzOpen = true;
      await updateNonSignalsInput(fixture);
      await testElement.sendKeys(TestKey.TAB);
      expect(treeSelectComponent.nzOpen).toBe(false);
    });

    it('should showSearch work', async () => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch.set(true);
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      const searchInput = treeSelect.nativeElement.querySelector('nz-select-search .ant-select-selection-search-input');
      expect(searchInput).toBeTruthy();
      expect(searchInput.style.opacity).toBe('');
      testComponent.showSearch.set(false);
      fixture.detectChanges();
      expect(searchInput.style.opacity).toBe('0');
    });

    it('should display no data', async () => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch.set(true);
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeFalsy();
      fixture.detectChanges();
      treeSelectComponent.setInputValue('invalid_value');
      await updateNonSignalsInput(fixture, 16);
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBe('');
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeTruthy();
    });

    it('should clean search value when reopen', async () => {
      testComponent.showSearch.set(true);
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      treeSelectComponent.setInputValue('invalid_value');
      await updateNonSignalsInput(fixture, 16);
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeTruthy();

      treeSelect.nativeElement.click();
      await fixture.whenStable();
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeFalsy();
    });

    it('should max tag count work', async () => {
      fixture.detectChanges();
      testComponent.multiple.set(true);
      fixture.detectChanges();
      testComponent.value.set(['1001', '10001', '100011', '100012']);
      await updateNonSignalsInput(fixture);
      expect(treeSelect.nativeElement.querySelectorAll('nz-select-item').length).toBe(4);

      testComponent.maxTagCount.set(2);
      await updateNonSignalsInput(fixture);
      expect(treeSelect.nativeElement.querySelectorAll('nz-select-item').length).toBe(3);
      const maxTagPlaceholderElement = treeSelect.nativeElement.querySelectorAll('nz-select-item')[2];
      expect(maxTagPlaceholderElement).toBeTruthy();
      expect(maxTagPlaceholderElement.innerText.trim()).toBe(
        `+ ${testComponent.value()!.length - testComponent.maxTagCount()} ...`
      );
    });

    it('should set selectable', async () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);

      let node = overlayContainerElement.querySelector('.ant-select-tree-node-content-wrapper')!;
      dispatchMouseEvent(node, 'click');
      await fixture.whenStable();
      expect(treeSelectComponent.nzOpen).toBe(false);

      testComponent.nodes.update(nodes => [{ ...nodes[0], selectable: false }, ...nodes.slice(1)]);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);

      node = overlayContainerElement.querySelector('nz-tree-node[builtin]')!;
      dispatchMouseEvent(node, 'click');
      await fixture.whenStable();
      expect(treeSelectComponent.nzOpen).toBe(true);
    });

    it('should nzBackdrop work', () => {
      testComponent.hasBackdrop.set(true);
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      const boundingBox = overlayContainerElement.children[0];
      expect(boundingBox.children[0].classList).toContain('cdk-overlay-backdrop');
    });

    it('should isComposing/inputValue is correct', async () => {
      treeSelectComponent.inputValue = '';
      treeSelectComponent.isComposingChange(true);
      treeSelectComponent.setInputValue('1011');
      await updateNonSignalsInput(fixture);
      expect(treeSelectComponent.isComposing).toBe(true);
      expect(treeSelectComponent.inputValue).toBe('');
    });

    it('should nzPrefix work', () => {
      const host = fixture.debugElement.nativeElement;
      testComponent.prefix.set('prefix');
      fixture.detectChanges();
      expect(host.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('prefix');

      testComponent.prefix.set(testComponent.affixTemplate);
      fixture.detectChanges();
      expect(host.querySelector('.ant-select-prefix')!.textContent?.trim()).toBe('icon');
    });

    it('should nzSuffixIcon work', () => {
      const host = fixture.debugElement.nativeElement;
      expect(host.querySelector('.anticon-down')).toBeTruthy();
      testComponent.suffixIcon.set(testComponent.affixTemplate);
      fixture.detectChanges();
      expect(host.querySelector('nz-select-arrow')!.textContent?.trim()).toBe('icon');
    });
  });

  describe('checkable', () => {
    let fixture: ComponentFixture<NzTestTreeSelectCheckableComponent>;
    let testComponent: NzTestTreeSelectCheckableComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectCheckableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
    });

    it('should is multiple', async () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);
      expect(treeSelectComponent.isMultiple).toBe(true);
    });

    it('should update input width', async () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      testComponent.showSearch.set(true);
      await fixture.whenStable();
      const input = treeSelect.nativeElement.querySelector('input') as HTMLInputElement;
      typeInElement('test', input);
      await fixture.whenStable();
      typeInElement('test test test', input);
      await fixture.whenStable();
      typeInElement('', input);
      await fixture.whenStable();
      zone.simulateZoneExit();
      fixture.detectChanges();
      expect(input.style.width === '').toBe(true);
    });

    it('should set null value work', async () => {
      expect(testComponent.value()![0]).toBe('1000122');
      testComponent.setNull();
      await fixture.whenStable();
      expect(testComponent.value()).toBe(null);
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(0);
      expect(testComponent.nzSelectTreeComponent.value.length).toBe(0);
    });

    it('should not check strictly work', async () => {
      testComponent.value.set(['1001', '10001', '100012']);
      await fixture.whenStable();
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(1);
    });

    it('should check strictly work', async () => {
      testComponent.checkStrictly.set(true);
      testComponent.value.set(['1001', '10001', '100012']);
      await fixture.whenStable();
      expect(testComponent.nzSelectTreeComponent.selectedNodes.length).toBe(3);
      testComponent.checkStrictly.set(false);
      fixture.detectChanges();
    });

    it('should remove checked when press backs', async () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      testComponent.showSearch.set(true);
      await fixture.whenStable();

      const input = treeSelect.nativeElement.querySelector('input') as HTMLInputElement;
      const BACKSPACE_EVENT = createKeyboardEvent('keydown', BACKSPACE, input);
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      expect(treeSelectComponent.selectedNodes.length).toBe(1);

      treeSelectComponent.onKeyDownInput(BACKSPACE_EVENT);
      await updateNonSignalsInput(fixture);
      expect(treeSelectComponent.selectedNodes.length).toBe(0);

      treeSelectComponent.onKeyDownInput(BACKSPACE_EVENT);
      await updateNonSignalsInput(fixture);
      expect(treeSelectComponent.selectedNodes.length).toBe(0);
    });

    it('should click option not close dropdown', async () => {
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzOpen).toBe(true);

      const targetNode = overlayContainerElement.querySelectorAll('nz-tree-node[builtin]')[2];
      dispatchMouseEvent(targetNode, 'click');
      await fixture.whenStable();
      expect(treeSelectComponent.nzOpen).toBe(true);
    });

    it('should prevent open the dropdown when click remove', async () => {
      testComponent.value.set(['1000122']);
      await fixture.whenStable();
      expect(treeSelectComponent.selectedNodes.length).toBe(1);

      treeSelect.nativeElement.querySelector('.ant-select-selection-item-remove').click();
      await fixture.whenStable();
      expect(treeSelectComponent.selectedNodes.length).toBe(0);
      expect(treeSelectComponent.nzOpen).toBe(false);
    });

    it('should display no data', async () => {
      treeSelectComponent.updateSelectedNodes();
      fixture.detectChanges();
      testComponent.showSearch.set(true);
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeFalsy();

      treeSelectComponent.setInputValue('invalid_value');
      await updateNonSignalsInput(fixture, 16);
      expect(overlayContainerElement.querySelector('nz-tree')!.getAttribute('hidden')).toBe('');
      expect(overlayContainerElement.querySelector('.ant-select-not-found')).toBeTruthy();
    });
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

    it('should set disabled work', async () => {
      const nativeElement = treeSelect.nativeElement as HTMLElement;
      expect(nativeElement.classList).not.toContain('ant-select-disabled');
      expect(nativeElement.querySelector('nz-select-clear')).not.toBeNull();

      testComponent.disable();
      await fixture.whenStable();
      expect(nativeElement.classList).toContain('ant-select-disabled');
      expect(nativeElement.querySelector('nz-select-clear')).toBeNull();
    });

    it('should set null value work', async () => {
      expect(testComponent.formControl.value).toBe('10021');
      testComponent.setNull();
      await fixture.whenStable();
      expect(testComponent.formControl.value).toBe(null);
      expect(treeSelectComponent.selectedNodes.length).toBe(0);
      expect(treeSelectComponent.value.length).toBe(0);
    });
  });

  describe('tree component', () => {
    let fixture: ComponentFixture<NzTestTreeSelectCheckableComponent>;
    let testComponent: NzTestTreeSelectCheckableComponent;
    let treeSelectComponent: NzTreeSelectComponent;
    let treeSelect: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeSelectCheckableComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      treeSelect = fixture.debugElement.query(By.directive(NzTreeSelectComponent));
      treeSelectComponent = treeSelect.componentInstance;
    });

    it('should keep expand state', () => {
      testComponent.expandKeys.set([]);
      treeSelect.nativeElement.click();
      fixture.detectChanges();
      expect(treeSelectComponent.nzExpandedKeys.length === 0).toBe(true);
      expect(treeSelectComponent.nzOpen).toBe(true);
      let targetSwitcher = overlayContainerElement.querySelector('.ant-select-tree-switcher')!;
      expect(targetSwitcher.classList.contains('ant-select-tree-switcher_close')).toBe(true);

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

    it('should display', async () => {
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      await fixture.whenStable();
      expect(overlayContainerElement.querySelector('.anticon.anticon-frown-o')).toBeTruthy();
    });
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

      fixture.componentInstance.status.set('warning');
      fixture.detectChanges();
      expect(treeSelect.nativeElement.className).toContain('ant-select-status-warning');

      fixture.componentInstance.status.set('');
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

      fixture.componentInstance.status.set('warning');
      fixture.detectChanges();
      expect(treeSelect.classList).toContain('ant-select-status-warning');

      fixture.componentInstance.status.set('success');
      fixture.detectChanges();
      expect(treeSelect.classList).toContain('ant-select-status-success');

      fixture.componentInstance.feedback.set(false);
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

    it('should set nzVirtualHeight work', async () => {
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      await fixture.whenStable();
      const virtualScrollViewport = overlayContainerElement.querySelector('.cdk-virtual-scroll-viewport')!;
      expect(window.getComputedStyle(virtualScrollViewport).height).toBe('300px');
    });

    it('should support x-scroll when the length of node label is greater than the length of select dropdown', async () => {
      fixture.detectChanges();
      treeSelect.nativeElement.click();
      await fixture.whenStable();
      overlayContainerElement
        .querySelector('.cdk-virtual-scroll-content-wrapper')!
        .setAttribute('style', 'width: 250px');
      const virtualScrollViewport = overlayContainerElement.querySelector('.cdk-virtual-scroll-content-wrapper')!;
      expect(virtualScrollViewport.clientWidth).toBe(250);
      expect(virtualScrollViewport.scrollWidth).toBeGreaterThan(250);
    });
  });
});

describe('tree-select finalSize', () => {
  let fixture: ComponentFixture<TestTreeSelectFinalSizeComponent>;
  let treeSelectElement: HTMLElement;
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
    fixture = TestBed.createComponent(TestTreeSelectFinalSizeComponent);
    treeSelectElement = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    fixture.detectChanges();
    formSizeSignal.set('large');
    fixture.detectChanges();
    expect(treeSelectElement.classList).toContain('ant-select-lg');
  });

  it('should set correctly the size from the compactSize signal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_SPACE_COMPACT_SIZE, useValue: compactSizeSignal }]
    });
    fixture = TestBed.createComponent(TestTreeSelectFinalSizeComponent);
    treeSelectElement = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    fixture.detectChanges();
    expect(treeSelectElement.classList).toContain('ant-select-lg');
  });

  it('should set correctly the size from the component input', () => {
    fixture = TestBed.createComponent(TestTreeSelectFinalSizeComponent);
    treeSelectElement = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    fixture.componentInstance.size.set('large');
    fixture.detectChanges();
    expect(treeSelectElement.classList).toContain('ant-select-lg');
  });
});

describe('finalVariant', () => {
  let fixture: ComponentFixture<TestTreeSelectFinalVariantComponent>;
  let treeSelectElement: HTMLElement;
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
    fixture = TestBed.createComponent(TestTreeSelectFinalVariantComponent);
    treeSelectElement = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(treeSelectElement.classList).toContain('ant-select-filled');
  });

  it('should use nzVariant over formVariant when nzVariant is explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestTreeSelectFinalVariantComponent);
    treeSelectElement = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    fixture.componentInstance.variant.set('borderless');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(treeSelectElement.classList).toContain('ant-select-borderless');
    expect(treeSelectElement.classList).not.toContain('ant-select-filled');
  });

  it('should use nzVariant outlined over formVariant when explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(TestTreeSelectFinalVariantComponent);
    treeSelectElement = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    fixture.componentInstance.variant.set('outlined');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(treeSelectElement.classList).not.toContain('ant-select-filled');
  });

  it('should use nzVariant when no formVariant is provided', () => {
    fixture = TestBed.createComponent(TestTreeSelectFinalVariantComponent);
    treeSelectElement = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    fixture.componentInstance.variant.set('filled');
    fixture.detectChanges();
    expect(treeSelectElement.classList).toContain('ant-select-filled');
  });

  it('should default to outlined when neither nzVariant nor formVariant is set', () => {
    fixture = TestBed.createComponent(TestTreeSelectFinalVariantComponent);
    treeSelectElement = fixture.debugElement.query(By.directive(NzTreeSelectComponent)).nativeElement;
    fixture.detectChanges();
    expect(treeSelectElement.classList).not.toContain('ant-select-filled');
    expect(treeSelectElement.classList).not.toContain('ant-select-borderless');
    expect(treeSelectElement.classList).not.toContain('ant-select-underlined');
  });
});

@Component({
  imports: [NzTreeSelectModule, FormsModule],
  template: `
    <nz-tree-select
      style="width:250px;position: relative;display: block;"
      nzPlaceHolder="Please select"
      [nzExpandedKeys]="expandKeys()"
      [nzNodes]="nodes()"
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
      [nzSize]="size()"
      [nzVariant]="variant()"
      [nzAllowClear]="allowClear()"
      [nzDropdownMatchSelectWidth]="dropdownMatchSelectWidth()"
      [nzDisabled]="disabled()"
      [nzShowSearch]="showSearch()"
      [nzMultiple]="multiple()"
      [nzMaxTagCount]="maxTagCount()"
      [nzDropdownStyle]="{ height: '120px' }"
      [nzBackdrop]="hasBackdrop()"
      [nzPrefix]="prefix()"
      [nzSuffixIcon]="suffixIcon()"
      [nzPlacement]="placement()"
      nzDropdownClassName="class1 class2"
    />
    <ng-template #affixTemplate>icon</ng-template>
  `
})
export class NzTestTreeSelectBasicComponent {
  @ViewChild(NzTreeSelectComponent, { static: false }) nzSelectTreeComponent!: NzTreeSelectComponent;
  @ViewChild('affixTemplate', { static: false }) affixTemplate!: TemplateRef<void>;
  readonly expandKeys = signal(['1001', '10001']);
  readonly value = signal<string | string[] | null>('10001');
  readonly size = signal<NzSizeLDSType>('default');
  readonly variant = signal<NzVariant>('outlined');
  readonly allowClear = signal(false);
  readonly disabled = signal(false);
  readonly showSearch = signal(false);
  readonly dropdownMatchSelectWidth = signal(true);
  readonly multiple = signal(false);
  readonly maxTagCount = signal(Infinity);
  readonly prefix = signal<string | TemplateRef<void> | null>(null);
  readonly suffixIcon = signal<string | TemplateRef<void> | null>(null);
  readonly nodes = signal<NzTreeNodeOptions[]>([
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
  ]);
  readonly hasBackdrop = signal(false);
  readonly placement = signal<NzPlacementType>('bottomLeft');

  setNull(): void {
    this.value.set(null);
  }
}

@Component({
  imports: [FormsModule, NzTreeSelectModule],
  template: `
    <nz-tree-select
      nzPlaceHolder="Please select"
      [nzExpandedKeys]="expandKeys()"
      [nzNodes]="nodes()"
      [nzShowSearch]="showSearch()"
      [nzCheckable]="true"
      [nzCheckStrictly]="checkStrictly()"
      [ngModel]="value()"
      (ngModelChange)="value.set($event)"
    />
  `
})
export class NzTestTreeSelectCheckableComponent {
  @ViewChild(NzTreeSelectComponent, { static: false }) nzSelectTreeComponent!: NzTreeSelectComponent;
  readonly expandKeys = signal(['1001', '10001']);
  readonly value = signal<string[] | null>(['1000122']);
  readonly showSearch = signal(false);
  readonly checkStrictly = signal(false);
  readonly nodes = signal([
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
  ]);

  setNull(): void {
    this.value.set(null);
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
      [nzStatus]="status()"
      nzPlaceHolder="Please select"
      [(ngModel)]="value"
    />
  `
})
export class NzTestTreeSelectStatusComponent {
  readonly status = signal<NzStatus>('error');
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
        <nz-form-control [nzHasFeedback]="feedback()" [nzValidateStatus]="status()">
          <nz-tree-select [nzNodes]="[]" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestTreeSelectInFormComponent {
  readonly status = signal<NzFormControlStatusType>('error');
  readonly feedback = signal(true);
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

@Component({
  imports: [NzTreeSelectModule],
  template: `<nz-tree-select [nzNodes]="[]" [nzSize]="size()" />`
})
export class TestTreeSelectFinalSizeComponent {
  readonly size = signal<NzSizeLDSType>('default');
}

@Component({
  imports: [NzTreeSelectComponent],
  template: `<nz-tree-select [nzVariant]="variant()" />`
})
export class TestTreeSelectFinalVariantComponent {
  readonly variant = signal<NzVariant | undefined>(undefined);
}
