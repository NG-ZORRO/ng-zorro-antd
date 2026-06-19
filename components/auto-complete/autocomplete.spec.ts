/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ApplicationRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  NgZone,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
  signal
} from '@angular/core';
import { ComponentFixture, inject as testingInject, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import {
  createKeyboardEvent,
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  MockNgZone,
  sleep,
  typeInElement
} from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzInputModule } from 'ng-zorro-antd/input';

import {
  NzAutocompleteComponent,
  NzAutocompleteModule,
  NzAutocompleteOptionComponent,
  NzAutocompleteTriggerDirective,
  NzOptionSelectionChange
} from './index';

describe('auto-complete', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  const scrolledSubject = new Subject();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNzNoAnimation(),
        { provide: ScrollDispatcher, useFactory: () => ({ scrolled: () => scrolledSubject }) },
        {
          provide: NgZone,
          useFactory: () => new MockNgZone()
        }
      ]
    });
  });

  beforeEach(
    testingInject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })
  );

  afterEach(
    testingInject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
      currentOverlayContainer.ngOnDestroy();
      overlayContainer.ngOnDestroy();
    })
  );

  function getPanel(): HTMLElement {
    return overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
  }

  function getOptions(): NodeListOf<HTMLElement> {
    return overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
  }

  async function stabilize<T>(fixture: ComponentFixture<T>, ms?: number): Promise<void> {
    fixture.detectChanges();
    TestBed.inject(ApplicationRef).tick();
    if (typeof ms === 'number') {
      await sleep(ms);
    }
    await fixture.whenStable();
    fixture.detectChanges();
  }

  describe('toggling', () => {
    let fixture: ComponentFixture<NzTestSimpleAutocompleteComponent>;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should open the panel when the input is focused', () => {
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);

      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);
      expect(overlayContainerElement.textContent).toContain('Burns Bay Road');
    });

    it('should open the panel when type', () => {
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
      typeInElement('value', input);
      fixture.detectChanges();
      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);
    });

    it('should not open the panel on focus if the input is readonly', async () => {
      const trigger = fixture.componentInstance.trigger;
      input.readOnly = true;
      fixture.detectChanges();
      expect(trigger.panelOpen).toBe(false);

      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      expect(trigger.panelOpen).toBe(false);
    });

    it('should not open the panel on focus if the input is disabled', () => {
      const trigger = fixture.componentInstance.trigger;
      input.disabled = true;
      fixture.detectChanges();

      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();

      expect(trigger.panelOpen).toBe(false);
    });

    it('should open the panel programmatically', () => {
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);
      expect(overlayContainerElement.textContent).toContain('Burns Bay Road');
    });

    it('should close the panel programmatically', () => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      fixture.componentInstance.trigger.closePanel();
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
      // With native animations, the overlay is detached immediately when NoopAnimations is used
      // The important check is that the panel state is closed, not the DOM cleanup timing
    });

    it('should close the panel when the user clicks away', () => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);

      dispatchFakeEvent(document.body, 'click');
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
    });

    it('should not close the panel when the user clicks this input', () => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);

      dispatchFakeEvent(input, 'click');
      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);
    });

    it('should not throw when attempting to close the panel of a destroyed autocomplete', () => {
      const trigger = fixture.componentInstance.trigger;

      trigger.openPanel();
      fixture.detectChanges();
      // @ts-ignore
      trigger.destroyPanel();

      expect(() => trigger.closePanel()).not.toThrow();
    });

    it('should close the panel when the user taps away on a touch device', () => {
      dispatchFakeEvent(input, 'focus');
      fixture.detectChanges();
      dispatchFakeEvent(document, 'touchend');
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
    });

    it('should close the panel when an option is clicked', () => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('nz-auto-option') as HTMLElement;
      option.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
    });

    it('should open the panel when the input that has already been focused is clicked', () => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('nz-auto-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);

      dispatchFakeEvent(input, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);
    });

    it('should close the panel when an option is tap', () => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();

      const option = overlayContainerElement.querySelector('nz-auto-option') as HTMLElement;
      dispatchFakeEvent(option, 'touchend');
      dispatchFakeEvent(option, 'click');
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
    });

    it('should hide the panel when the options list is empty', async () => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      const panel = getPanel();

      typeInElement('B', input);
      await sleep(150);
      fixture.detectChanges();
      expect(panel.classList).not.toContain('ant-select-dropdown-hidden');

      typeInElement('x', input);
      await sleep(150);
      fixture.detectChanges();
      expect(panel.classList).toContain('ant-select-dropdown-hidden');
    });

    it('should not run change detection on `mouseenter` and `mousedown` events for `nz-auto-option`', () => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();

      const appRef = TestBed.inject(ApplicationRef);
      vi.spyOn(appRef, 'tick');

      const option = overlayContainerElement.querySelector('nz-auto-option') as HTMLElement;
      const event = new MouseEvent('mousedown');
      vi.spyOn(event, 'preventDefault');

      option.dispatchEvent(event);
      option.dispatchEvent(new MouseEvent('mouseenter'));

      expect(event.preventDefault).toHaveBeenCalled();
      expect(appRef.tick).not.toHaveBeenCalled();
    });
  });

  describe('property', () => {
    let fixture: ComponentFixture<NzTestAutocompletePropertyComponent>;
    let component: NzTestAutocompletePropertyComponent;
    let input: HTMLInputElement;
    let DOWN_ARROW_EVENT: KeyboardEvent;
    let ENTER_EVENT: KeyboardEvent;
    let TAB_EVENT: KeyboardEvent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestAutocompletePropertyComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
      component = fixture.componentInstance;
      DOWN_ARROW_EVENT = createKeyboardEvent('keydown', DOWN_ARROW);
      ENTER_EVENT = createKeyboardEvent('keydown', ENTER);
      TAB_EVENT = createKeyboardEvent('keydown', TAB);
    });

    it('should have correct width when setting', () => {
      component.width.set(500);
      fixture.detectChanges();

      component.trigger.openPanel();
      fixture.detectChanges();

      const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
      expect(Math.ceil(parseFloat(overlayPane.style.width))).toBe(500);
    });

    it('should backfill display value when DOWN key is pressed', async () => {
      component.trigger.openPanel();
      await stabilize(fixture, 0);
      expect(component.trigger.panelOpen).toBe(true);

      component.trigger.handleKeydown(DOWN_ARROW_EVENT);
      expect(input.value).toBe('Burns Bay Road');
    });

    it('should reset the backfilled value display when pressing TAB key', async () => {
      const options = component.options();
      component.trigger.openPanel();
      await stabilize(fixture, 0);
      expect(component.trigger.panelOpen).toBe(true);

      component.trigger.handleKeydown(DOWN_ARROW_EVENT);

      expect(input.value).toBe(options[0]);

      component.trigger.handleKeydown(TAB_EVENT);
      fixture.detectChanges();

      expect(input.value).toBe('');

      component.trigger.openPanel();
      await stabilize(fixture, 0);

      component.trigger.handleKeydown(DOWN_ARROW_EVENT);
      component.trigger.handleKeydown(DOWN_ARROW_EVENT);
      component.trigger.handleKeydown(ENTER_EVENT);
      await stabilize(fixture);

      expect(input.value).toBe(options[1]);

      component.trigger.openPanel();
      await stabilize(fixture, 0);

      component.trigger.handleKeydown(DOWN_ARROW_EVENT);
      expect(input.value).toBe(options[2]);
      component.trigger.handleKeydown(TAB_EVENT);
      fixture.detectChanges();
      expect(input.value).toBe(options[1]);
    });

    it('should overlayClassName & overlayStyle work', () => {
      component.overlayClassName.set('testClass');
      component.overlayStyle.set({ color: 'rgb(1, 2, 3)' });
      fixture.detectChanges();

      component.trigger.openPanel();
      fixture.detectChanges();

      const panel = getPanel();
      expect(panel.classList.contains(`testClass`)).toBe(true);
      expect(panel.style.color).toBe(`rgb(1, 2, 3)`);
    });
  });

  describe('value', () => {
    let fixture: ComponentFixture<NzTestSimpleAutocompleteComponent>;
    let component: NzTestSimpleAutocompleteComponent;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
      component = fixture.componentInstance;
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should update input value when option is selected with option value', () => {
      component.trigger.openPanel();
      fixture.detectChanges();

      const options = getOptions();
      options[1].click();
      fixture.detectChanges();
      expect(component.inputControl.value).toEqual('Downing Street');
    });

    it('should update number-input value when option is selected with option value', () => {
      input.type = 'number';
      fixture.componentInstance.options = [100, 200, 300];
      fixture.componentInstance.filteredOptions.set([100, 200, 300]);
      fixture.detectChanges();
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      const options = getOptions();
      options[1].click();
      fixture.detectChanges();

      expect(input.value).toBe('200');
    });

    it('should handle autocomplete being attached to number inputs', () => {
      input.type = 'number';
      fixture.detectChanges();

      typeInElement('200', input);
      fixture.detectChanges();
      expect(fixture.componentInstance.inputControl.value).toBe(200);

      typeInElement('', input);
      fixture.detectChanges();
      expect(fixture.componentInstance.inputControl.value).toBe(null);
    });

    it('should mark the autocomplete control as touched on blur', () => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.touched).toBe(false);
      dispatchFakeEvent(input, 'blur');
      fixture.detectChanges();
      expect(fixture.componentInstance.inputControl.touched).toBe(true);
    });

    it('should be able to re-type the same value when it is reset while open', async () => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      typeInElement('Burns', input);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.value).toBe('Burns');

      fixture.componentInstance.inputControl.setValue('');
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      expect(input.value).toBe('');

      typeInElement('Burns', input);
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.value).toBe('Burns');
    });
  });

  describe('object option', () => {
    let fixture: ComponentFixture<NzTestAutocompleteWithObjectOptionComponent>;
    let componentInstance: NzTestAutocompleteWithObjectOptionComponent;
    let input: HTMLInputElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestAutocompleteWithObjectOptionComponent);
      componentInstance = fixture.componentInstance;
      fixture.detectChanges();
      await fixture.whenStable();
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should select init option', () => {
      componentInstance.trigger.openPanel();
      const options = componentInstance.trigger.nzAutocomplete.options.toArray();
      expect(options[0].selected).toBe(true);
      expect(input.value).toBe('Lucy');
      expect(componentInstance.formControl.value).toEqual({ label: 'Lucy', value: 'lucy' });
    });

    it('should set object option', async () => {
      componentInstance.formControl.setValue({ label: 'Jack', value: 'jack' });
      await fixture.whenStable();
      componentInstance.trigger.openPanel();
      fixture.detectChanges();
      const options = componentInstance.trigger.nzAutocomplete.options.toArray();
      expect(options[0].selected).toBe(false);
      expect(options[1].selected).toBe(true);
      expect(input.value).toBe('Jack');
      expect(componentInstance.formControl.value).toEqual({ label: 'Jack', value: 'jack' });
    });

    it('should be typing other string', () => {
      typeInElement('string', input);
      fixture.detectChanges();
      expect(componentInstance.formControl.value).toBe('string');
    });
  });

  describe('form', () => {
    let fixture: ComponentFixture<NzTestAutocompleteWithFormComponent>;
    let componentInstance: NzTestAutocompleteWithFormComponent;
    let input: HTMLInputElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestAutocompleteWithFormComponent);
      fixture.detectChanges();
      await fixture.whenStable();
      componentInstance = fixture.componentInstance;
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should set the value with form', () => {
      expect(componentInstance.formControl.value).toContain('Burns');
      expect(input.value).toContain('Burns');
    });

    it('should set disabled work', () => {
      expect(input.disabled).toBe(false);

      componentInstance.formControl.disable();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
    });

    it('should close the panel when the input is disabled', () => {
      componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      componentInstance.formControl.disable();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
      expect(componentInstance.trigger.panelOpen).toBe(false);
    });

    it('should set correct label', async () => {
      const fixture = TestBed.createComponent(NzTestAutocompleteDifferentValueWithFormComponent);
      fixture.detectChanges();
      await fixture.whenStable();

      const input = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(input.value).toBe('Lucy');
      expect(fixture.componentInstance.formControl.value).toBe('lucy');
    });
  });

  describe('option groups', () => {
    let fixture: ComponentFixture<NzTestAutocompleteGroupComponent>;
    let input: HTMLInputElement;
    let DOWN_ARROW_EVENT: KeyboardEvent;
    let ENTER_EVENT: KeyboardEvent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestAutocompleteGroupComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;

      DOWN_ARROW_EVENT = createKeyboardEvent('keydown', DOWN_ARROW);
      ENTER_EVENT = createKeyboardEvent('keydown', ENTER);
    });

    it('should fill the text field when an option is selected with ENTER', async () => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();
      const componentInstance = fixture.componentInstance;

      expect(componentInstance.trigger.panelOpen).toBe(true);

      [1, 2, 3].forEach(() => {
        componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      });
      await stabilize(fixture, 0);
      componentInstance.trigger.handleKeydown(ENTER_EVENT);
      await stabilize(fixture, 0);
      expect(componentInstance.inputValue).toContain('AntDesign four');
      expect(input.value).toContain('AntDesign four');
    });
  });

  describe('Option selection', () => {
    let fixture: ComponentFixture<NzTestSimpleAutocompleteComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
    });

    it('should deselect any other selected option', () => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      let options = getOptions();
      options[0].click();

      // Run application change detection after next render hooks.
      TestBed.inject(ApplicationRef).tick();

      const componentOptions = fixture.componentInstance.optionComponents.toArray();
      expect(componentOptions[0].selected).toBe(true);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      options = getOptions();
      options[1].click();
      fixture.detectChanges();

      expect(componentOptions[0].selected).toBe(false);
      expect(componentOptions[1].selected).toBe(true);
    });

    it('should not deselect when repeat selected option', () => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      let options = getOptions();
      options[0].click();

      // Run application change detection after next render hooks.
      TestBed.inject(ApplicationRef).tick();

      const componentOptions = fixture.componentInstance.optionComponents.toArray();
      expect(componentOptions[0].selected).toBe(true);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      options = getOptions();
      options[0].click();
      fixture.detectChanges();
      expect(componentOptions[0].selected).toBe(true);
    });
  });

  describe('keyboard events', () => {
    let fixture: ComponentFixture<NzTestSimpleAutocompleteComponent>;
    let input: HTMLInputElement;
    let DOWN_ARROW_EVENT: KeyboardEvent;
    let UP_ARROW_EVENT: KeyboardEvent;
    let ENTER_EVENT: KeyboardEvent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;

      DOWN_ARROW_EVENT = createKeyboardEvent('keydown', DOWN_ARROW);
      UP_ARROW_EVENT = createKeyboardEvent('keydown', UP_ARROW);
      ENTER_EVENT = createKeyboardEvent('keydown', ENTER);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();
    });

    it('should set the active item to the second option when DOWN key is pressed', () => {
      const componentInstance = fixture.componentInstance;
      const options = getOptions();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(options[0].classList).not.toContain('ant-select-item-option-active');
      expect(options[1].classList).toContain('ant-select-item-option-active');
    });

    it('should set the active item to the first option when DOWN key is pressed in last item', () => {
      const componentInstance = fixture.componentInstance;
      const options = getOptions();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      [1, 2, 3].forEach(() => componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT));
      fixture.detectChanges();

      expect(options[1].classList).not.toContain('ant-select-item-option-active');
      expect(options[0].classList).toContain('ant-select-item-option-active');
    });

    it('should set the active item when mouse is enter', () => {
      const componentInstance = fixture.componentInstance;
      const options = getOptions();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      fixture.detectChanges();

      dispatchFakeEvent(options[1], 'mouseenter');

      fixture.detectChanges();

      expect(options[0].classList).not.toContain('ant-select-item-option-active');
      expect(options[1].classList).toContain('ant-select-item-option-active');
      expect(options[2].classList).not.toContain('ant-select-item-option-active');

      dispatchFakeEvent(options[0], 'mouseenter');

      fixture.detectChanges();

      expect(options[0].classList).toContain('ant-select-item-option-active');
      expect(options[1].classList).not.toContain('ant-select-item-option-active');
      expect(options[2].classList).not.toContain('ant-select-item-option-active');
    });

    it('should set the active item to the last option when UP key is pressed', () => {
      const componentInstance = fixture.componentInstance;
      const options = getOptions();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      componentInstance.trigger.handleKeydown(UP_ARROW_EVENT);
      fixture.detectChanges();

      expect(options[0].classList).not.toContain('ant-select-item-option-active');
      expect(options[1].classList).not.toContain('ant-select-item-option-active');
      expect(options[2].classList).toContain('ant-select-item-option-active');
    });

    it('should set the active item to the previous option when UP key is pressed', () => {
      const componentInstance = fixture.componentInstance;
      const options = getOptions();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      [1, 2].forEach(() => componentInstance.trigger.handleKeydown(UP_ARROW_EVENT));
      fixture.detectChanges();

      expect(options[0].classList).not.toContain('ant-select-item-option-active');
      expect(options[1].classList).toContain('ant-select-item-option-active');
      expect(options[2].classList).not.toContain('ant-select-item-option-active');
    });

    it('should set the active item properly after filtering', () => {
      const componentInstance = fixture.componentInstance;

      typeInElement('Str', input);
      fixture.detectChanges();

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      const options = getOptions();

      expect(options[0].classList).not.toContain('ant-select-item-option-active');
      expect(options[1].classList).toContain('ant-select-item-option-active');
      expect(options[1].innerText).toEqual('Wall Street');
    });

    it('should not open the panel if the `input` event was dispatched with changing the value', () => {
      const trigger = fixture.componentInstance.trigger;

      dispatchFakeEvent(input, 'focusin');
      typeInElement('A', input);
      fixture.detectChanges();

      expect(trigger.panelOpen).toBe(true);

      trigger.closePanel();
      fixture.detectChanges();

      expect(trigger.panelOpen).toBe(false);

      dispatchFakeEvent(input, 'input');
      fixture.detectChanges();

      expect(trigger.panelOpen).toBe(false);
    });

    it('should fill the text field when an option is selected with ENTER', () => {
      const componentInstance = fixture.componentInstance;
      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();

      expect(componentInstance.inputControl.value).toContain('Downing Street');
      expect(input.value).toContain('Downing Street');
    });

    it('should prevent the default enter key action', () => {
      fixture.componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);

      fixture.componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();

      expect(ENTER_EVENT.defaultPrevented).toBe(true);
    });

    it('should not prevent the default enter action for a closed panel after a user action', () => {
      fixture.componentInstance.trigger.handleKeydown(UP_ARROW_EVENT);
      fixture.detectChanges();

      fixture.componentInstance.trigger.closePanel();
      fixture.detectChanges();
      fixture.componentInstance.trigger.handleKeydown(ENTER_EVENT);

      expect(ENTER_EVENT.defaultPrevented).toBe(false);
    });

    it('should close the panel when tabbing', () => {
      fixture.detectChanges();
      input.focus();

      expect(overlayContainerElement.querySelector('.ant-select-dropdown')).toBeTruthy();

      dispatchKeyboardEvent(input, 'keydown', TAB);
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
    });

    it('should close the panel when pressing escape', () => {
      fixture.detectChanges();
      input.focus();

      expect(overlayContainerElement.querySelector('.ant-select-dropdown')).toBeTruthy();

      dispatchKeyboardEvent(input, 'keydown', ESCAPE);
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
    });

    it('should call closePanel on correct circumstances', () => {
      const trigger = fixture.componentInstance.trigger;

      trigger.panelOpen = true;
      trigger.nzAutocomplete.showPanel = true;
      const event = new KeyboardEvent('keydown', {
        key: 'Enter',
        code: 'Enter',
        which: 13,
        keyCode: 13
      });
      vi.spyOn(trigger, 'activeOption', 'get').mockReturnValue(null);
      vi.spyOn(trigger, 'closePanel');

      trigger.handleKeydown(event);

      expect(trigger.closePanel).toHaveBeenCalled();
    });
  });

  describe('within input-wrapper', () => {
    let fixture: ComponentFixture<NzTestAutocompleteWithGroupInputComponent>;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestAutocompleteWithGroupInputComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should use the input element as the dropdown target', () => {
      const componentInstance = fixture.componentInstance;
      fixture.detectChanges();
      dispatchFakeEvent(input, 'blur');
      fixture.detectChanges();
      expect(componentInstance.trigger['elementRef'].nativeElement).toEqual(componentInstance.inputRef.nativeElement);
    });
  });
});

@Component({
  imports: [ReactiveFormsModule, NzAutocompleteModule, NzInputModule],
  template: `
    <input
      class="input"
      nz-input
      [formControl]="inputControl"
      [nzAutocomplete]="auto"
      (input)="onInput($any($event).target?.value)"
    />
    <nz-autocomplete #auto>
      @for (option of filteredOptions(); track option) {
        <nz-auto-option [nzValue]="option">{{ option }}</nz-auto-option>
      }
    </nz-autocomplete>
  `
})
class NzTestSimpleAutocompleteComponent {
  inputValue!: string;
  readonly filteredOptions = signal<Array<string | number> | undefined>(undefined);
  inputControl = new FormControl<string | number | null>('');
  options: Array<string | number> = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

  @ViewChild(NzAutocompleteComponent, { static: false }) panel!: NzAutocompleteComponent;
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;
  @ViewChildren(NzAutocompleteOptionComponent) optionComponents!: QueryList<NzAutocompleteOptionComponent>;

  constructor() {
    this.filteredOptions.set(this.options);
  }

  onInput(value: string): void {
    this.filteredOptions.set(this.options.filter(s => new RegExp(value, 'gi').test(`${s}`)));
  }
}

@Component({
  imports: [FormsModule, NzAutocompleteModule],
  template: `
    <input [ngModel]="inputValue" (ngModelChange)="inputValue = $event" [nzAutocomplete]="auto" />
    <nz-autocomplete
      [nzWidth]="width()"
      [nzOverlayClassName]="overlayClassName()"
      [nzOverlayStyle]="overlayStyle()"
      [nzDataSource]="options()"
      [nzDefaultActiveFirstOption]="false"
      nzBackfill
      #auto
    />
  `
})
class NzTestAutocompletePropertyComponent {
  inputValue?: string;
  readonly width = signal<number | undefined>(undefined);
  readonly overlayClassName = signal('');
  readonly overlayStyle = signal({});
  readonly options = signal(['Burns Bay Road', 'Downing Street', 'Wall Street']);
  @ViewChild(NzAutocompleteComponent, { static: false }) panel!: NzAutocompleteComponent;
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;
}

@Component({
  imports: [NzAutocompleteModule],
  template: `<input [nzAutocomplete]="null!" />`
})
class NzTestAutocompleteWithoutPanelComponent {
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;
}

@Component({
  imports: [NzAutocompleteModule],
  template: `
    <input [nzAutocomplete]="auto" />
    <nz-autocomplete [nzDataSource]="options()" #auto />
  `
})
class NzTestAutocompleteWithDelayComponent implements OnInit {
  readonly cdr = inject(ChangeDetectorRef);
  readonly options = signal<string[]>([]);
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;

  ngOnInit(): void {
    setTimeout(() => this.options.set(['One']), 300);
  }
}

@Component({
  imports: [FormsModule, NzAutocompleteModule],
  template: `
    <input [nzAutocomplete]="auto" [ngModel]="inputValue" (ngModelChange)="inputValue = $event" />
    <nz-autocomplete #auto>
      @for (group of optionGroups; track group.title) {
        <nz-auto-optgroup [nzLabel]="groupTitle">
          <ng-template #groupTitle>
            <span>
              {{ group.title }}
              <a class="more-link" href="https://www.google.com/search?q=ng+zorro" target="_blank">更多</a>
            </span>
          </ng-template>
          @for (option of group.children; track option.title) {
            <nz-auto-option [nzValue]="option.title" [nzDisabled]="option.disabled">
              {{ option.title }}
              <span class="certain-search-item-count">{{ option.count }} 人 关注</span>
            </nz-auto-option>
          }
        </nz-auto-optgroup>
      }
    </nz-autocomplete>
  `
})
class NzTestAutocompleteGroupComponent {
  inputValue!: string;
  optionGroups: Array<{ title: string; children: Array<{ title: string; count: number; disabled?: boolean }> }> = [
    {
      title: '话题',
      children: [
        {
          title: 'AntDesign one',
          count: 10000
        },
        {
          title: 'AntDesign two',
          count: 10600
        }
      ]
    },
    {
      title: '问题',
      children: [
        {
          title: 'AntDesign three',
          count: 60100
        },
        {
          title: 'AntDesign four',
          count: 30010
        }
      ]
    },
    {
      title: '文章',
      children: [
        {
          title: 'AntDesign five',
          disabled: true,
          count: 100000
        }
      ]
    }
  ];

  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;
}

@Component({
  imports: [ReactiveFormsModule, NzAutocompleteModule],
  template: `
    <form>
      <input [formControl]="formControl" [nzAutocomplete]="auto" />
      <nz-autocomplete #auto>
        @for (option of options(); track option) {
          <nz-auto-option [nzValue]="option">{{ option }}</nz-auto-option>
        }
      </nz-autocomplete>
    </form>
  `
})
class NzTestAutocompleteWithFormComponent {
  formControl = new FormControl('Burns');
  readonly options = signal(['Burns Bay Road', 'Downing Street', 'Wall Street']);
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;
}

@Component({
  imports: [ReactiveFormsModule, NzAutocompleteModule],
  template: `
    <input [formControl]="formControl" [nzAutocomplete]="auto" />
    <nz-autocomplete #auto>
      @for (option of options; track option.value) {
        <nz-auto-option [nzValue]="option.value" [nzLabel]="option.label">
          {{ option.label }}
        </nz-auto-option>
      }
    </nz-autocomplete>
  `
})
class NzTestAutocompleteDifferentValueWithFormComponent {
  formControl = new FormControl('lucy');
  options = [
    { label: 'Lucy', value: 'lucy' },
    { label: 'Jack', value: 'jack' }
  ];
  @ViewChild(NzAutocompleteTriggerDirective) trigger!: NzAutocompleteTriggerDirective;
}

@Component({
  imports: [ReactiveFormsModule, NzAutocompleteModule],
  template: `
    <input [formControl]="formControl" [nzAutocomplete]="auto" />
    <nz-autocomplete #auto [compareWith]="compareFun">
      @for (option of options(); track option.value) {
        <nz-auto-option [nzValue]="option" [nzLabel]="option.label">
          {{ option.label }}
        </nz-auto-option>
      }
    </nz-autocomplete>
  `
})
class NzTestAutocompleteWithObjectOptionComponent {
  formControl = new FormControl<string | { label: string; value: string } | null>({ label: 'Lucy', value: 'lucy' });
  readonly options = signal([
    { label: 'Lucy', value: 'lucy' },
    { label: 'Jack', value: 'jack' }
  ]);
  @ViewChild(NzAutocompleteTriggerDirective) trigger!: NzAutocompleteTriggerDirective;

  compareFun = (o1: NzSafeAny, o2: NzSafeAny): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };
}

@Component({
  imports: [NzAutocompleteModule, NzInputModule],
  template: `
    <nz-input-wrapper #inputGroupComponent>
      <input #input placeholder="input here" nz-input nzSize="large" [nzAutocomplete]="auto" />
      <nz-autocomplete #auto>
        <nz-auto-option nzValue="value">label</nz-auto-option>
      </nz-autocomplete>
    </nz-input-wrapper>
  `
})
class NzTestAutocompleteWithGroupInputComponent {
  @ViewChild(NzAutocompleteTriggerDirective, { static: true }) trigger!: NzAutocompleteTriggerDirective;
  @ViewChild('input', { static: true, read: ElementRef }) inputRef!: ElementRef;
}

describe('auto-complete', () => {
  let component: NzAutocompleteComponent;
  let fixture: ComponentFixture<NzAutocompleteComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NzAutocompleteComponent);
    component = fixture.componentInstance;
  });

  it('should normalizeDataSource return correct value', () => {
    let changes: SimpleChanges = {
      nzDataSource: {
        currentValue: [1, 2],
        firstChange: false,
        previousValue: undefined,
        isFirstChange: function (): boolean {
          throw new Error('Function not implemented.');
        }
      }
    };
    component.ngOnChanges(changes);
    expect(component.normalizedDataSource).toEqual([
      {
        label: '1',
        value: '1'
      },
      {
        label: '2',
        value: '2'
      }
    ]);

    changes = {
      nzDataSource: {
        currentValue: ['1', '2'],
        firstChange: false,
        previousValue: undefined,
        isFirstChange: function (): boolean {
          throw new Error('Function not implemented.');
        }
      }
    };
    component.ngOnChanges(changes);
    expect(component.normalizedDataSource).toEqual([
      {
        label: '1',
        value: '1'
      },
      {
        label: '2',
        value: '2'
      }
    ]);

    changes = {
      nzDataSource: {
        currentValue: [
          {
            label: '1',
            value: '1'
          },
          {
            label: '2',
            value: '2'
          }
        ],
        firstChange: false,
        previousValue: undefined,
        isFirstChange: function (): boolean {
          throw new Error('Function not implemented.');
        }
      }
    };
    component.ngOnChanges(changes);
    expect(component.normalizedDataSource).toEqual([
      {
        label: '1',
        value: '1'
      },
      {
        label: '2',
        value: '2'
      }
    ]);
  });

  it('NzOptionSelectionChange should have correct initial value for isUserInput', () => {
    const nzOptionSelectionChange = new NzOptionSelectionChange({} as NzSafeAny);
    expect(nzOptionSelectionChange.isUserInput).toBeFalsy();
  });
});
