import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { ComponentFixture, fakeAsync, flush, inject, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzInputModule } from 'ng-zorro-antd/input';
import { Subject } from 'rxjs';

import { createKeyboardEvent, dispatchFakeEvent, dispatchKeyboardEvent, MockNgZone, typeInElement } from 'ng-zorro-antd/core/testing';

import { getNzAutocompleteMissingPanelError } from './autocomplete-trigger.directive';
import { NzAutocompleteComponent, NzAutocompleteModule, NzAutocompleteOptionComponent, NzAutocompleteTriggerDirective } from './index';

describe('auto-complete', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  const scrolledSubject = new Subject();
  let zone: MockNgZone;

  beforeEach(
    waitForAsync(() => {
      const dir = 'ltr';
      TestBed.configureTestingModule({
        imports: [NzAutocompleteModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule, NzInputModule],
        declarations: [
          NzTestSimpleAutocompleteComponent,
          NzTestAutocompletePropertyComponent,
          NzTestAutocompleteWithoutPanelComponent,
          NzTestAutocompleteGroupComponent,
          NzTestAutocompleteWithOnPushDelayComponent,
          NzTestAutocompleteWithFormComponent,
          NzTestAutocompleteWithObjectOptionComponent,
          NzTestAutocompleteDifferentValueWithFormComponent,
          NzTestAutocompleteWithGroupInputComponent
        ],
        providers: [
          { provide: Directionality, useFactory: () => ({ value: dir }) },
          { provide: ScrollDispatcher, useFactory: () => ({ scrolled: () => scrolledSubject }) },
          {
            provide: NgZone,
            useFactory: () => {
              zone = new MockNgZone();
              return zone;
            }
          }
        ]
      });

      TestBed.compileComponents();

      inject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
      })();
    })
  );
  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

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

    it('should not open the panel on focus if the input is readonly', fakeAsync(() => {
      const trigger = fixture.componentInstance.trigger;
      input.readOnly = true;
      fixture.detectChanges();

      expect(trigger.panelOpen).toBe(false);
      dispatchFakeEvent(input, 'focusin');
      flush();

      fixture.detectChanges();
      expect(trigger.panelOpen).toBe(false);
    }));

    it('should not open the panel on focus if the input is disabled', fakeAsync(() => {
      const trigger = fixture.componentInstance.trigger;
      input.disabled = true;
      fixture.detectChanges();

      dispatchFakeEvent(input, 'focusin');
      flush();
      fixture.detectChanges();

      expect(trigger.panelOpen).toBe(false);
    }));

    it('should open the panel programmatically', () => {
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);
      expect(overlayContainerElement.textContent).toContain('Burns Bay Road');
    });

    it('should close the panel programmatically', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      fixture.componentInstance.trigger.closePanel();
      fixture.detectChanges();

      tick(500);
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
      expect(overlayContainerElement.textContent).toEqual('');
    }));

    it('should close the panel when the user clicks away', fakeAsync(() => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      flush();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);

      dispatchFakeEvent(document, 'click');

      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
    }));

    it('should not close the panel when the user clicks this input', fakeAsync(() => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      flush();

      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);

      dispatchFakeEvent(input, 'click');

      expect(fixture.componentInstance.trigger.panelOpen).toBe(true);
    }));

    it('should not throw when attempting to close the panel of a destroyed autocomplete', () => {
      const trigger = fixture.componentInstance.trigger;

      trigger.openPanel();
      fixture.detectChanges();
      // @ts-ignore
      trigger.destroyPanel();

      expect(() => trigger.closePanel()).not.toThrow();
    });

    it('should close the panel when the user taps away on a touch device', fakeAsync(() => {
      dispatchFakeEvent(input, 'focus');
      fixture.detectChanges();
      flush();
      dispatchFakeEvent(document, 'touchend');

      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
    }));

    it('should close the panel when an option is clicked', fakeAsync(() => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      flush();

      const option = overlayContainerElement.querySelector('nz-auto-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      tick(500);
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
      expect(overlayContainerElement.textContent).toEqual('');
    }));

    it('should close the panel when an option is tap', fakeAsync(() => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      flush();

      const option = overlayContainerElement.querySelector('nz-auto-option') as HTMLElement;
      dispatchFakeEvent(option, 'touchend');
      dispatchFakeEvent(option, 'click');
      fixture.detectChanges();

      tick(500);
      expect(fixture.componentInstance.trigger.panelOpen).toBe(false);
      expect(overlayContainerElement.textContent).toEqual('');
    }));

    it('should hide the panel when the options list is empty', fakeAsync(() => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      tick(150);
      const panel = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;

      typeInElement('B', input);
      fixture.detectChanges();
      tick(150);
      fixture.detectChanges();

      expect(panel.classList).not.toContain('ant-select-dropdown-hidden');

      typeInElement('x', input);
      fixture.detectChanges();
      tick(150);
      fixture.detectChanges();

      expect(panel.classList).toContain('ant-select-dropdown-hidden');
    }));
  });

  describe('property', () => {
    let fixture: ComponentFixture<NzTestAutocompletePropertyComponent>;
    let input: HTMLInputElement;
    let DOWN_ARROW_EVENT: KeyboardEvent;
    let ENTER_EVENT: KeyboardEvent;
    let TAB_EVENT: KeyboardEvent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestAutocompletePropertyComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
      DOWN_ARROW_EVENT = createKeyboardEvent('keydown', DOWN_ARROW);
      ENTER_EVENT = createKeyboardEvent('keydown', ENTER);
      TAB_EVENT = createKeyboardEvent('keydown', TAB);
    });

    it('should have correct width when setting', () => {
      fixture.componentInstance.width = 500;
      fixture.detectChanges();

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

      expect(Math.ceil(parseFloat(overlayPane.style.width as string))).toBe(500);
    });

    it('should back fill display value when DOWN key is pressed', fakeAsync(() => {
      const componentInstance = fixture.componentInstance;
      componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();
      tick(100);

      expect(componentInstance.trigger.panelOpen).toBe(true);
      flush();
      fixture.detectChanges();

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(input.value).toBe('Burns Bay Road');
    }));

    it('should reset the backfilled value display when pressing tabbing', fakeAsync(() => {
      const componentInstance = fixture.componentInstance;
      componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(input.value).toBe('Burns Bay Road');

      componentInstance.trigger.handleKeydown(TAB_EVENT);
      fixture.detectChanges();

      expect(input.value).not.toBe('Burns Bay Road');

      componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();
      flush();

      expect(input.value).toBe('Downing Street');

      componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      componentInstance.trigger.handleKeydown(TAB_EVENT);
      fixture.detectChanges();
      tick(500);
      flush();
      fixture.detectChanges();
      expect(input.value).toBe('Downing Street');
    }));

    it('should overlayClassName & overlayStyle work', () => {
      fixture.componentInstance.overlayClassName = 'testClass';
      fixture.componentInstance.overlayStyle = { color: 'rgb(1, 2, 3)' };
      fixture.detectChanges();

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      const dropdown = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
      expect(dropdown.classList.contains(`testClass`)).toBe(true);
      expect(dropdown.style.color).toBe(`rgb(1, 2, 3)`);
    });
  });

  describe('value', () => {
    let fixture: ComponentFixture<NzTestSimpleAutocompleteComponent>;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should update input value when option is selected with option value', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      fixture.detectChanges();
      const options = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[1].click();
      flush();
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.value).toEqual('Downing Street');
    }));

    it('should update number-input value when option is selected with option value', fakeAsync(() => {
      input.type = 'number';
      fixture.componentInstance.options = [100, 200, 300];
      fixture.componentInstance.filteredOptions = [100, 200, 300];
      fixture.detectChanges();
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      const options = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[1].click();
      fixture.detectChanges();
      flush();

      expect(input.value).toBe('200');
    }));

    it('should handle autocomplete being attached to number inputs', fakeAsync(() => {
      input.type = 'number';
      fixture.detectChanges();

      typeInElement('200', input);
      fixture.detectChanges();
      flush();

      expect(fixture.componentInstance.inputControl.value).toBe(200);

      typeInElement('', input);
      fixture.detectChanges();
      flush();

      expect(fixture.componentInstance.inputControl.value).toBe(null);
    }));

    it('should mark the autocomplete control as touched on blur', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.touched).toBe(false);
      dispatchFakeEvent(input, 'blur');
      fixture.detectChanges();
      flush();
      expect(fixture.componentInstance.inputControl.touched).toBe(true);
    }));

    it('should be able to re-type the same value when it is reset while open', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      typeInElement('Burns', input);
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.value).toBe('Burns');

      fixture.componentInstance.inputControl.setValue('');
      tick();
      fixture.detectChanges();
      expect(input.value).toBe('');

      typeInElement('Burns', input);
      tick();
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.value).toBe('Burns');
    }));
  });

  describe('object option', () => {
    let fixture: ComponentFixture<NzTestAutocompleteWithObjectOptionComponent>;
    let componentInstance: NzTestAutocompleteWithObjectOptionComponent;
    let input: HTMLInputElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestAutocompleteWithObjectOptionComponent);
      componentInstance = fixture.componentInstance;
      flush();
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    }));

    it('should select init option', fakeAsync(() => {
      componentInstance.trigger.openPanel();
      const options = componentInstance.trigger.nzAutocomplete.options.toArray();
      expect(options[0].selected).toBe(true);
      expect(input.value).toBe('Lucy');
      expect(componentInstance.form.get('formControl')?.value.value).toBe('lucy');
    }));

    it('should set object option', fakeAsync(() => {
      componentInstance.form.get('formControl')?.setValue({ label: 'Jack', value: 'jack' });
      flush();
      fixture.detectChanges();
      componentInstance.trigger.openPanel();
      const options = componentInstance.trigger.nzAutocomplete.options.toArray();
      expect(options[0].selected).toBe(false);
      expect(options[1].selected).toBe(true);
      expect(input.value).toBe('Jack');
      expect(componentInstance.form.get('formControl')?.value.value).toBe('jack');
    }));

    it('should be typing other string', fakeAsync(() => {
      typeInElement('string', input);
      fixture.detectChanges();
      expect(componentInstance.form.get('formControl')?.value).toBe('string');
    }));
  });

  describe('form', () => {
    let fixture: ComponentFixture<NzTestAutocompleteWithFormComponent>;
    let input: HTMLInputElement;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestAutocompleteWithFormComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    }));

    it('should set the value with form', fakeAsync(() => {
      const componentInstance = fixture.componentInstance;
      flush();
      fixture.detectChanges();
      expect(componentInstance.form.get('formControl')!.value).toContain('Burns');
      expect(input.value).toContain('Burns');
    }));

    it('should set disabled work', () => {
      const componentInstance = fixture.componentInstance;
      const formControl = (componentInstance.form as FormGroup).get('formControl')!;
      fixture.detectChanges();

      expect(input.disabled).toBe(false);

      formControl.disable();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
    });

    it('should close the panel when the input is disabled', () => {
      const componentInstance = fixture.componentInstance;
      const formControl = (componentInstance.form as FormGroup).get('formControl')!;
      fixture.detectChanges();

      componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      formControl.disable();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
      expect(componentInstance.trigger.panelOpen).toBe(false);
    });

    it('should set correct label', fakeAsync(() => {
      const differentValueWithFormFixture = TestBed.createComponent(NzTestAutocompleteDifferentValueWithFormComponent);
      differentValueWithFormFixture.detectChanges();
      flush();
      differentValueWithFormFixture.detectChanges();

      const differentValueWithFormInput = differentValueWithFormFixture.debugElement.query(By.css('input')).nativeElement;

      expect(differentValueWithFormInput.value).toBe('Lucy');
      expect(differentValueWithFormFixture.componentInstance.form.get('formControl')?.value).toBe('lucy');
    }));
  });

  describe('option groups', () => {
    let fixture: ComponentFixture<NzTestAutocompleteGroupComponent>;
    let input: HTMLInputElement;
    let DOWN_ARROW_EVENT: KeyboardEvent;
    let ENTER_EVENT: KeyboardEvent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestAutocompleteGroupComponent);
      fixture.detectChanges();

      input = fixture.debugElement.query(By.css('input')).nativeElement;

      DOWN_ARROW_EVENT = createKeyboardEvent('keydown', DOWN_ARROW);
      ENTER_EVENT = createKeyboardEvent('keydown', ENTER);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();
    }));

    it('should fill the text field when an option is selected with ENTER', fakeAsync(() => {
      const componentInstance = fixture.componentInstance;

      expect(componentInstance.trigger.panelOpen).toBe(true);

      [1, 2, 3].forEach(() => {
        componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      });
      fixture.detectChanges();
      flush();
      componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();
      flush();
      expect(componentInstance.inputValue).toContain('AntDesign four');

      expect(input.value).toContain('AntDesign four');
    }));
  });

  describe('Option selection', () => {
    let fixture: ComponentFixture<NzTestSimpleAutocompleteComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
    });

    it('should deselect any other selected option', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      let options = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[0].click();
      fixture.detectChanges();
      zone.simulateZoneExit();
      fixture.detectChanges();

      const componentOptions = fixture.componentInstance.optionComponents.toArray();
      expect(componentOptions[0].selected).toBe(true);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      options = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[1].click();
      fixture.detectChanges();
      flush();

      expect(componentOptions[0].selected).toBe(false);
      expect(componentOptions[1].selected).toBe(true);
    }));

    it('should not deselect when repeat selected option', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      let options = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[0].click();
      fixture.detectChanges();
      zone.simulateZoneExit();
      fixture.detectChanges();

      const componentOptions = fixture.componentInstance.optionComponents.toArray();
      expect(componentOptions[0].selected).toBe(true);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      options = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[0].click();
      fixture.detectChanges();
      flush();
      expect(componentOptions[0].selected).toBe(true);
    }));
  });

  describe('keyboard events', () => {
    let fixture: ComponentFixture<NzTestSimpleAutocompleteComponent>;
    let input: HTMLInputElement;
    let DOWN_ARROW_EVENT: KeyboardEvent;
    let UP_ARROW_EVENT: KeyboardEvent;
    let ENTER_EVENT: KeyboardEvent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;

      DOWN_ARROW_EVENT = createKeyboardEvent('keydown', DOWN_ARROW);
      UP_ARROW_EVENT = createKeyboardEvent('keydown', UP_ARROW);
      ENTER_EVENT = createKeyboardEvent('keydown', ENTER);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();
    }));

    it('should set the active item to the second option when DOWN key is pressed', () => {
      const componentInstance = fixture.componentInstance;
      const optionEls = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen).toBe(true);

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-select-item-option-active');
      expect(optionEls[1].classList).toContain('ant-select-item-option-active');
    });

    it('should set the active item to the first option when DOWN key is pressed in last item', () => {
      const componentInstance = fixture.componentInstance;
      const optionEls = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen).toBe(true);

      [1, 2, 3].forEach(() => componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT));
      fixture.detectChanges();

      expect(optionEls[1].classList).not.toContain('ant-select-item-option-active');
      expect(optionEls[0].classList).toContain('ant-select-item-option-active');
    });

    it('should set the active item when mouse is enter', () => {
      const componentInstance = fixture.componentInstance;
      const optionEls = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen).toBe(true);

      fixture.detectChanges();

      dispatchFakeEvent(optionEls[1], 'mouseenter');

      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-select-item-option-active');
      expect(optionEls[1].classList).toContain('ant-select-item-option-active');
      expect(optionEls[2].classList).not.toContain('ant-select-item-option-active');

      dispatchFakeEvent(optionEls[0], 'mouseenter');

      fixture.detectChanges();

      expect(optionEls[0].classList).toContain('ant-select-item-option-active');
      expect(optionEls[1].classList).not.toContain('ant-select-item-option-active');
      expect(optionEls[2].classList).not.toContain('ant-select-item-option-active');
    });

    it('should set the active item to the last option when UP key is pressed', () => {
      const componentInstance = fixture.componentInstance;
      const optionEls = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen).toBe(true);

      componentInstance.trigger.handleKeydown(UP_ARROW_EVENT);
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-select-item-option-active');
      expect(optionEls[1].classList).not.toContain('ant-select-item-option-active');
      expect(optionEls[2].classList).toContain('ant-select-item-option-active');
    });

    it('should set the active item to the previous option when UP key is pressed', () => {
      const componentInstance = fixture.componentInstance;
      const optionEls = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen).toBe(true);

      [1, 2].forEach(() => componentInstance.trigger.handleKeydown(UP_ARROW_EVENT));
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-select-item-option-active');
      expect(optionEls[1].classList).toContain('ant-select-item-option-active');
      expect(optionEls[2].classList).not.toContain('ant-select-item-option-active');
    });

    it('should set the active item properly after filtering', () => {
      const componentInstance = fixture.componentInstance;

      typeInElement('Str', input);
      fixture.detectChanges();

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      const optionEls = overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(optionEls[0].classList).not.toContain('ant-select-item-option-active');
      expect(optionEls[1].classList).toContain('ant-select-item-option-active');
      expect(optionEls[1].innerText).toEqual('Wall Street');
    });

    it('should not open the panel if the `input` event was dispatched with changing the value', fakeAsync(() => {
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
      flush();

      expect(trigger.panelOpen).toBe(false);
    }));

    it('should fill the text field when an option is selected with ENTER', fakeAsync(() => {
      const componentInstance = fixture.componentInstance;
      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();
      flush();

      componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();
      flush();

      expect(componentInstance.inputControl.value).toContain('Downing Street');

      expect(input.value).toContain('Downing Street');
    }));

    it('should prevent the default enter key action', fakeAsync(() => {
      fixture.componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      flush();

      fixture.componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();
      flush();

      expect(ENTER_EVENT.defaultPrevented).toBe(true);
    }));

    it('should not prevent the default enter action for a closed panel after a user action', () => {
      fixture.componentInstance.trigger.handleKeydown(UP_ARROW_EVENT);
      fixture.detectChanges();

      fixture.componentInstance.trigger.closePanel();
      fixture.detectChanges();
      fixture.componentInstance.trigger.handleKeydown(ENTER_EVENT);

      expect(ENTER_EVENT.defaultPrevented).toBe(false);
    });

    it('should close the panel when tabbing', fakeAsync(() => {
      fixture.detectChanges();
      input.focus();
      flush();

      expect(overlayContainerElement.querySelector('.ant-select-dropdown')).toBeTruthy();

      dispatchKeyboardEvent(input, 'keydown', TAB);
      fixture.detectChanges();

      tick(500);
      expect(overlayContainerElement.querySelector('.ant-select-dropdown')).toBeFalsy();
    }));

    it('should close the panel when pressing escape', fakeAsync(() => {
      fixture.detectChanges();
      input.focus();
      flush();

      expect(overlayContainerElement.querySelector('.ant-select-dropdown')).toBeTruthy();

      dispatchKeyboardEvent(input, 'keydown', ESCAPE);
      fixture.detectChanges();

      tick(500);
      expect(overlayContainerElement.querySelector('.ant-select-dropdown')).toBeFalsy();
    }));
  });

  describe('Fallback positions', () => {
    let fixture: ComponentFixture<NzTestSimpleAutocompleteComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
    });
  });

  describe('misc', () => {
    let fixture: ComponentFixture<NzTestAutocompleteWithoutPanelComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestAutocompleteWithoutPanelComponent);
      fixture.detectChanges();
    });

    it('should throw on with the panel is not defined', fakeAsync(() => {
      fixture.detectChanges();

      expect(() => {
        fixture.componentInstance.trigger.openPanel();
      }).toThrow(getNzAutocompleteMissingPanelError());
    }));

    it(
      'should show the panel when the options are initialized later within a component with ' + 'OnPush change detection',
      fakeAsync(() => {
        fixture = TestBed.createComponent(NzTestAutocompleteWithOnPushDelayComponent);
        fixture.detectChanges();

        dispatchFakeEvent(fixture.debugElement.query(By.css('input')).nativeElement, 'focusin');
        fixture.detectChanges();
        tick(1000);

        fixture.detectChanges();
        tick();

        Promise.resolve().then(() => {
          fixture.detectChanges();
          flush();
          fixture.detectChanges();
          const panel = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
          expect(panel.classList).not.toContain('ant-select-dropdown-hidden');
        });
      })
    );
  });

  describe('group-input', () => {
    let fixture: ComponentFixture<NzTestAutocompleteWithGroupInputComponent>;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestAutocompleteWithGroupInputComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should use the group-input as the dropdown target', () => {
      const componentInstance = fixture.componentInstance;
      fixture.detectChanges();
      dispatchFakeEvent(input, 'blur');
      fixture.detectChanges();
      // tslint:disable-next-line:no-any
      expect((componentInstance.trigger as any).getConnectedElement().nativeElement).toEqual(
        componentInstance.inputGroupComponent.nativeElement
      );
    });
  });
});

@Component({
  template: `
    <div>
      <input class="input" nz-input [formControl]="inputControl" [nzAutocomplete]="auto" (input)="onInput($event.target?.value)" />
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of filteredOptions" [nzValue]="option">{{ option }}</nz-auto-option>
      </nz-autocomplete>
    </div>
  `
})
class NzTestSimpleAutocompleteComponent {
  inputValue!: string;
  filteredOptions: Array<string | number>;
  inputControl = new FormControl();
  options: Array<string | number> = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

  @ViewChild(NzAutocompleteComponent, { static: false }) panel!: NzAutocompleteComponent;
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;
  @ViewChildren(NzAutocompleteOptionComponent) optionComponents!: QueryList<NzAutocompleteOptionComponent>;

  constructor() {
    this.filteredOptions = this.options;
  }

  onInput(value: string): void {
    this.filteredOptions = this.options.filter(s => new RegExp(value, 'gi').test(`${s}`));
  }
}

@Component({
  template: `
    <div>
      <input [(ngModel)]="inputValue" [nzAutocomplete]="auto" />
      <nz-autocomplete
        [nzWidth]="width"
        [nzOverlayClassName]="overlayClassName"
        [nzOverlayStyle]="overlayStyle"
        [nzDataSource]="options"
        [nzDefaultActiveFirstOption]="false"
        nzBackfill
        #auto
      ></nz-autocomplete>
    </div>
  `
})
class NzTestAutocompletePropertyComponent {
  inputValue?: string;
  width?: number;
  overlayClassName = '';
  overlayStyle = {};
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  @ViewChild(NzAutocompleteComponent, { static: false }) panel!: NzAutocompleteComponent;
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;

  constructor() {}
}

@Component({
  template: `
    <input [nzAutocomplete]="auto" />
  `
})
class NzTestAutocompleteWithoutPanelComponent {
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>
      <input [nzAutocomplete]="auto" />
      <nz-autocomplete [nzDataSource]="options" #auto></nz-autocomplete>
    </div>
  `
})
class NzTestAutocompleteWithOnPushDelayComponent implements OnInit {
  options: string[] = [];
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.options = ['One'];
      this.cdr.markForCheck();
    }, 1000);
  }
}

@Component({
  template: `
    <input [nzAutocomplete]="auto" [(ngModel)]="inputValue" />
    <nz-autocomplete #auto>
      <nz-auto-optgroup *ngFor="let group of optionGroups" [nzLabel]="groupTitle">
        <ng-template #groupTitle>
          <span>
            {{ group.title }}
            <a class="more-link" href="https://www.google.com/search?q=ng+zorro" target="_blank">更多</a>
          </span>
        </ng-template>
        <nz-auto-option *ngFor="let option of group.children" [nzValue]="option.title" [nzDisabled]="option.disabled">
          {{ option.title }}
          <span class="certain-search-item-count">{{ option.count }} 人 关注</span>
        </nz-auto-option>
      </nz-auto-optgroup>
    </nz-autocomplete>
  `
})
class NzTestAutocompleteGroupComponent {
  inputValue!: string;
  optionGroups = [
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
  template: `
    <form [formGroup]="form">
      <input formControlName="formControl" [nzAutocomplete]="auto" />
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option">{{ option }}</nz-auto-option>
      </nz-autocomplete>
    </form>
  `
})
class NzTestAutocompleteWithFormComponent {
  form: FormGroup;
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ formControl: 'Burns' });
  }
}

@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="formControl" [nzAutocomplete]="auto" />
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option.value" [nzLabel]="option.label">
          {{ option.label }}
        </nz-auto-option>
      </nz-autocomplete>
    </form>
  `
})
class NzTestAutocompleteDifferentValueWithFormComponent {
  form: FormGroup;
  options = [
    { label: 'Lucy', value: 'lucy' },
    { label: 'Jack', value: 'jack' }
  ];
  @ViewChild(NzAutocompleteTriggerDirective) trigger!: NzAutocompleteTriggerDirective;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ formControl: 'lucy' });
  }
}

@Component({
  template: `
    <form [formGroup]="form">
      <input formControlName="formControl" [nzAutocomplete]="auto" />
      <nz-autocomplete #auto [compareWith]="compareFun">
        <nz-auto-option *ngFor="let option of options" [nzValue]="option" [nzLabel]="option.label">{{ option.label }}</nz-auto-option>
      </nz-autocomplete>
    </form>
  `
})
class NzTestAutocompleteWithObjectOptionComponent {
  form: FormGroup;
  options = [
    { label: 'Lucy', value: 'lucy' },
    { label: 'Jack', value: 'jack' }
  ];
  @ViewChild(NzAutocompleteTriggerDirective) trigger!: NzAutocompleteTriggerDirective;

  // tslint:disable-next-line: no-any
  compareFun = (o1: any, o2: any) => {
    if (o1) {
      return typeof o1 === 'string' ? o1 === o2.label : o1.value === o2.value;
    } else {
      return false;
    }
  };

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ formControl: { label: 'Lucy', value: 'lucy', age: 20 } });
  }
}

@Component({
  template: `
    <nz-input-group #inputGroupComponent nzSize="large" [nzSuffix]="suffixIcon">
      <input placeholder="input here" nz-input [nzAutocomplete]="auto" />
      <ng-template #suffixIcon></ng-template>
      <nz-autocomplete #auto>
        <nz-auto-option nzValue="value">label</nz-auto-option>
      </nz-autocomplete>
    </nz-input-group>
  `
})
class NzTestAutocompleteWithGroupInputComponent {
  @ViewChild(NzAutocompleteTriggerDirective, { static: false }) trigger!: NzAutocompleteTriggerDirective;
  @ViewChild('inputGroupComponent', { static: false, read: ElementRef }) inputGroupComponent!: ElementRef;
  constructor() {}
}
