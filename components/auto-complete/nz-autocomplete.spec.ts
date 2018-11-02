import { Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, ESCAPE, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { async, fakeAsync, flush, inject, tick, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import {
  createKeyboardEvent,
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  typeInElement,
  MockNgZone
} from '../core/testing';

import {
  NzAutocompleteComponent,
  NzAutocompleteModule,
  NzAutocompleteOptionComponent,
  NzAutocompleteTriggerDirective
} from './index';
import { getNzAutocompleteMissingPanelError } from './nz-autocomplete-trigger.directive';

describe('auto-complete', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  const scrolledSubject = new Subject();
  let zone: MockNgZone;

  beforeEach(async(() => {
    const dir = 'ltr';
    TestBed.configureTestingModule({
      imports     : [ NzAutocompleteModule, NoopAnimationsModule, FormsModule, ReactiveFormsModule ],
      declarations: [
        NzTestSimpleAutocompleteComponent,
        NzTestAutocompletePropertyComponent,
        NzTestAutocompleteWithoutPanelComponent,
        NzTestAutocompleteGroupComponent,
        NzTestAutocompleteWithOnPushDelayComponent,
        NzTestAutocompleteWithFormComponent
      ],
      providers   : [
        { provide: Directionality, useFactory: () => ({ value: dir }) },
        { provide: ScrollDispatcher, useFactory: () => ({ scrolled: () => scrolledSubject }) },
        {provide: NgZone, useFactory: () => {
            zone = new MockNgZone();
            return zone;
          }}
      ]
    });

    TestBed.compileComponents();

    inject([ OverlayContainer ], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));
  afterEach(inject([ OverlayContainer ], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  describe('toggling', () => {
    let fixture;
    let input;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should open the panel when the input is focused', () => {
      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(false);

      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(true);
      expect(overlayContainerElement.textContent)
      .toContain('Burns Bay Road');
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

      expect(trigger.panelOpen).toBe(false);
      dispatchFakeEvent(input, 'focusin');
      flush();

      fixture.detectChanges();
      expect(trigger.panelOpen).toBe(false);
    }));

    it('should open the panel programmatically', () => {
      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(false);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(true);
      expect(overlayContainerElement.textContent)
      .toContain('Burns Bay Road');
    });

    it('should close the panel programmatically', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      fixture.componentInstance.trigger.closePanel();
      fixture.detectChanges();

      tick(500);
      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(false);
      expect(overlayContainerElement.textContent)
      .toEqual('');
    }));

    it('should close the panel when the user clicks away', fakeAsync(() => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      flush();

      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(true);

      dispatchFakeEvent(document, 'click');

      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(false);
    }));

    it('should not close the panel when the user clicks this input', fakeAsync(() => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      flush();

      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(true);

      dispatchFakeEvent(input, 'click');

      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(true);
    }));

    it('should not throw when attempting to close the panel of a destroyed autocomplete', () => {
      const trigger = fixture.componentInstance.trigger;

      trigger.openPanel();
      fixture.detectChanges();
      trigger.destroyPanel();

      expect(() => trigger.closePanel()).not.toThrow();
    });

    it('should close the panel when the user taps away on a touch device', fakeAsync(() => {
      dispatchFakeEvent(input, 'focus');
      fixture.detectChanges();
      flush();
      dispatchFakeEvent(document, 'touchend');

      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(false);
    }));

    it('should close the panel when an option is clicked', fakeAsync(() => {
      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();
      flush();

      const option = overlayContainerElement.querySelector('nz-auto-option') as HTMLElement;
      option.click();
      fixture.detectChanges();

      tick(500);
      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(false);
      expect(overlayContainerElement.textContent)
      .toEqual('');
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
      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(false);
      expect(overlayContainerElement.textContent)
      .toEqual('');
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

      expect(panel.classList)
      .not
      .toContain('ant-select-dropdown-hidden');

      typeInElement('x', input);
      fixture.detectChanges();
      tick(150);
      fixture.detectChanges();

      expect(panel.classList)
      .toContain('ant-select-dropdown-hidden');
    }));

  });

  describe('property', () => {
    let fixture;
    let input;
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

    it('should open the panel when the input is focused', () => {
      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(false);

      dispatchFakeEvent(input, 'focusin');
      fixture.detectChanges();

      expect(fixture.componentInstance.trigger.panelOpen)
      .toBe(true);
      expect(overlayContainerElement.textContent)
      .toContain('Burns Bay Road');
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

      expect(componentInstance.trigger.panelOpen)
      .toBe(true);

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();
      flush();

      expect(input.value)
      .toBe('Burns Bay Road');

    }));

    it('should reset the backfilled value display when pressing tabbing', fakeAsync(() => {
      const componentInstance = fixture.componentInstance;
      componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      expect(componentInstance.trigger.panelOpen)
      .toBe(true);

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(input.value)
      .toBe('Burns Bay Road');

      componentInstance.trigger.handleKeydown(TAB_EVENT);
      fixture.detectChanges();

      expect(input.value)
      .not.toBe('Burns Bay Road');

      componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();
      flush();

      expect(input.value)
      .toBe('Downing Street');

      componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      componentInstance.trigger.handleKeydown(TAB_EVENT);
      fixture.detectChanges();
      tick(500);
      flush();
      fixture.detectChanges();
      expect(input.value)
      .toBe('Downing Street');

    }));

  });

  describe('value', () => {
    let fixture;
    let input;

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
      const options =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[1].click();
      flush();
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.value)
      .toEqual('Downing Street');
    }));

    it('should update number-input value when option is selected with option value', fakeAsync(() => {
      input.type = 'number';
      fixture.componentInstance.options = [100, 200, 300];
      fixture.componentInstance.filteredOptions = [100, 200, 300];
      fixture.detectChanges();
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      const options =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[1].click();
      fixture.detectChanges();
      flush();

      expect(input.value)
      .toBe('200');
    }));

    it('should handle autocomplete being attached to number inputs', fakeAsync(() => {
      input.type = 'number';
      fixture.detectChanges();

      typeInElement('200', input);
      fixture.detectChanges();
      flush();

      expect(fixture.componentInstance.inputControl.value).toBe(200);
    }));

    it('should mark the autocomplete control as touched on blur', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(fixture.componentInstance.inputControl.touched)
      .toBe(false);
      dispatchFakeEvent(input, 'blur');
      fixture.detectChanges();
      flush();
      expect(fixture.componentInstance.inputControl.touched)
      .toBe(true);
    }));

  });

  describe('form', () => {
    let fixture;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestAutocompleteWithFormComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should set the value with form', () => {
      const componentInstance = fixture.componentInstance;
      fixture.detectChanges();
      expect(componentInstance.form.get('formControl').value)
        .toContain('Burns');
      expect(input.value)
        .toContain('Burns');
    });

    it('should set disabled work', () => {
      const componentInstance = fixture.componentInstance;
      const formControl = (componentInstance.form as FormGroup).get('formControl');
      fixture.detectChanges();

      expect(input.disabled).toBe(false);

      formControl.disable();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);

    });

    it('should close the panel when the input is disabled', () => {
      const componentInstance = fixture.componentInstance;
      const formControl = (componentInstance.form as FormGroup).get('formControl');
      fixture.detectChanges();

      componentInstance.trigger.openPanel();
      fixture.detectChanges();

      expect(componentInstance.trigger.panelOpen).toBe(true);

      formControl.disable();
      fixture.detectChanges();

      expect(input.disabled).toBe(true);
      expect(componentInstance.trigger.panelOpen).toBe(false);

    });
  });

  describe('option groups', () => {
    let fixture;
    let input;
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

      expect(componentInstance.trigger.panelOpen)
      .toBe(true);

      [1, 2, 3].forEach(() => {
        componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      });
      fixture.detectChanges();
      flush();
      componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();
      flush();
      expect(componentInstance.inputValue)
      .toContain('AntDesign four');

      expect(input.value)
      .toContain('AntDesign four');

    }));

  });

  describe('Option selection', () => {
    let fixture;

    beforeEach((() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
    }));

    it('should deselect any other selected option', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      let options =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[0].click();
      fixture.detectChanges();
      zone.simulateZoneExit();
      fixture.detectChanges();

      const componentOptions = fixture.componentInstance.optionComponents.toArray();
      expect(componentOptions[0].selected)
      .toBe(true);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      options =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[1].click();
      fixture.detectChanges();
      flush();

      expect(componentOptions[0].selected)
      .toBe(false);
      expect(componentOptions[1].selected)
      .toBe(true);
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
      expect(componentOptions[0].selected)
      .toBe(true);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      options =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;
      options[0].click();
      fixture.detectChanges();
      flush();
      expect(componentOptions[0].selected)
      .toBe(true);
    }));

  });

  describe('keyboard events', () => {
    let fixture;
    let input;
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
      const optionEls =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen)
      .toBe(true);

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-select-dropdown-menu-item-active');
      expect(optionEls[1].classList).toContain('ant-select-dropdown-menu-item-active');

    });

    it('should set the active item to the first option when DOWN key is pressed in last item', () => {
      const componentInstance = fixture.componentInstance;
      const optionEls =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen)
      .toBe(true);

      [1, 2, 3].forEach(() => componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT));
      fixture.detectChanges();

      expect(optionEls[1].classList).not.toContain('ant-select-dropdown-menu-item-active');
      expect(optionEls[0].classList).toContain('ant-select-dropdown-menu-item-active');

    });

    it('should set the active item to the last option when UP key is pressed', () => {
      const componentInstance = fixture.componentInstance;
      const optionEls =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen)
      .toBe(true);

      componentInstance.trigger.handleKeydown(UP_ARROW_EVENT);
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-select-dropdown-menu-item-active');
      expect(optionEls[1].classList).not.toContain('ant-select-dropdown-menu-item-active');
      expect(optionEls[2].classList).toContain('ant-select-dropdown-menu-item-active');

    });

    it('should set the active item to the previous option when UP key is pressed', () => {
      const componentInstance = fixture.componentInstance;
      const optionEls =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(componentInstance.trigger.panelOpen)
      .toBe(true);

      [1, 2].forEach(() => componentInstance.trigger.handleKeydown(UP_ARROW_EVENT));
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-select-dropdown-menu-item-active');
      expect(optionEls[1].classList).toContain('ant-select-dropdown-menu-item-active');
      expect(optionEls[2].classList).not.toContain('ant-select-dropdown-menu-item-active');

    });

    it('should set the active item properly after filtering', () => {
      const componentInstance = fixture.componentInstance;

      typeInElement('Str', input);
      fixture.detectChanges();

      componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      const optionEls =
        overlayContainerElement.querySelectorAll('nz-auto-option') as NodeListOf<HTMLElement>;

      expect(optionEls[0].classList).not.toContain('ant-select-dropdown-menu-item-active');
      expect(optionEls[1].classList).toContain('ant-select-dropdown-menu-item-active');
      expect(optionEls[1].innerText).toEqual('Wall Street');

    });

    it('should not open the panel if the `input` event was dispatched with changing the value',
      fakeAsync(() => {
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

      expect(componentInstance.inputControl.value)
      .toContain('Downing Street');

      expect(input.value)
      .toContain('Downing Street');

    }));

    it('should prevent the default enter key action', fakeAsync(() => {
      fixture.componentInstance.trigger.handleKeydown(DOWN_ARROW_EVENT);
      flush();

      fixture.componentInstance.trigger.handleKeydown(ENTER_EVENT);
      fixture.detectChanges();
      flush();

      expect(ENTER_EVENT.defaultPrevented)
      .toBe(true);
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

      expect(overlayContainerElement.querySelector('.ant-select-dropdown'))
      .toBeTruthy();

      dispatchKeyboardEvent(input, 'keydown', TAB);
      fixture.detectChanges();

      tick(500);
      expect(overlayContainerElement.querySelector('.ant-select-dropdown'))
      .toBeFalsy();
    }));

    it('should close the panel when pressing escape', fakeAsync(() => {
      fixture.detectChanges();
      input.focus();
      flush();

      expect(overlayContainerElement.querySelector('.ant-select-dropdown'))
      .toBeTruthy();

      dispatchKeyboardEvent(input, 'keydown', ESCAPE);
      fixture.detectChanges();

      tick(500);
      expect(overlayContainerElement.querySelector('.ant-select-dropdown'))
      .toBeFalsy();
    }));

  });

  describe('Fallback positions', () => {
    let fixture;
    let input: HTMLInputElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSimpleAutocompleteComponent);
      fixture.detectChanges();
      input = fixture.debugElement.query(By.css('input')).nativeElement;
    });

    it('should use bottom positioning by default', fakeAsync(() => {
      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();
      flush();

      const position = fixture.componentInstance.trigger.nzAutocomplete.dropDownPosition;
      expect(position)
      .toEqual('bottom');
    }));

    it('should reposition the panel on scroll', () => {
      const spacer = document.createElement('div');

      spacer.style.height = '1000px';
      document.body.appendChild(spacer);

      fixture.componentInstance.trigger.openPanel();
      fixture.detectChanges();

      const autocomplete = fixture.componentInstance.trigger.nzAutocomplete;

      autocomplete.dropDownPosition = 'top';
      fixture.detectChanges();

      expect(autocomplete.dropDownPosition)
      .toEqual('top');

      window.scroll(0, 100);
      scrolledSubject.next();
      fixture.detectChanges();

      expect(autocomplete.dropDownPosition)
      .toEqual('bottom');

      document.body.removeChild(spacer);
    });

  });

  describe('misc', () => {
    let fixture;

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

    it('should show the panel when the options are initialized later within a component with ' +
      'OnPush change detection', fakeAsync(() => {
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
        const panel = overlayContainerElement.querySelector('.ant-select-dropdown') as HTMLElement;
        expect(panel.classList).not.toContain('ant-select-dropdown-hidden');
      });
    }));

  });

});

@Component({
  template: `
  <div>
      <input class="input"
             nz-input
             [formControl]="inputControl"
             [nzAutocomplete]="auto"
             (input)="onInput($event.target?.value)">
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of filteredOptions" [nzValue]="option">{{option}}</nz-auto-option>
      </nz-autocomplete>
    </div>
  `
})
class NzTestSimpleAutocompleteComponent {
  inputValue: string;
  filteredOptions: string[];
  inputControl = new FormControl();
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];

  @ViewChild(NzAutocompleteComponent) panel: NzAutocompleteComponent;
  @ViewChild(NzAutocompleteTriggerDirective) trigger: NzAutocompleteTriggerDirective;
  @ViewChildren(NzAutocompleteOptionComponent) optionComponents: QueryList<NzAutocompleteOptionComponent>;

  constructor() {
    this.filteredOptions = this.options;
  }

  onInput(value: string): void {
    this.filteredOptions = this.options.filter(s => new RegExp(value, 'gi').test(s));
  }
}

@Component({
  template: `
  <div>
      <input [(ngModel)]="inputValue"
             [nzAutocomplete]="auto">
      <nz-autocomplete [nzWidth]="width" [nzDataSource]="options" [nzDefaultActiveFirstOption]="false" nzBackfill #auto>
      </nz-autocomplete>
  </div>
  `
})
class NzTestAutocompletePropertyComponent {
  inputValue: string;
  width: number;
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  @ViewChild(NzAutocompleteComponent) panel: NzAutocompleteComponent;
  @ViewChild(NzAutocompleteTriggerDirective) trigger: NzAutocompleteTriggerDirective;

  constructor() {
  }

}

@Component({
  template: `<input [nzAutocomplete]="auto">`
})
class NzTestAutocompleteWithoutPanelComponent {
  @ViewChild(NzAutocompleteTriggerDirective) trigger: NzAutocompleteTriggerDirective;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <div>
      <input [nzAutocomplete]="auto">
      <nz-autocomplete [nzDataSource]="options" #auto>
      </nz-autocomplete>
  </div>
  `
})
class NzTestAutocompleteWithOnPushDelayComponent implements OnInit {
  options: string[] = [];
  @ViewChild(NzAutocompleteTriggerDirective) trigger: NzAutocompleteTriggerDirective;

  ngOnInit(): void {
    setTimeout(() => {
      this.options = ['One'];
    }, 1000);
  }
}

@Component({
  template: `
  <input [nzAutocomplete]="auto" [(ngModel)]="inputValue">
  <nz-autocomplete #auto>
    <nz-auto-optgroup *ngFor="let group of optionGroups" [nzLabel]="groupTitle">
      <ng-template #groupTitle>
        <span>{{group.title}}
          <a class="more-link" href="https://www.google.com/search?q=ng+zorro" target="_blank">更多</a>
        </span>
      </ng-template>
      <nz-auto-option *ngFor="let option of group.children" [nzValue]="option.title" [nzDisabled]="option.disabled">
        {{option.title}}
        <span class="certain-search-item-count">{{option.count}} 人  关注</span>
      </nz-auto-option>
    </nz-auto-optgroup>
  </nz-autocomplete>
`
})
class NzTestAutocompleteGroupComponent {
  inputValue: string;
  optionGroups = [{
    title: '话题',
    children: [{
      title: 'AntDesign one',
      count: 10000
    },         {
      title: 'AntDesign two',
      count: 10600
    }]
  },              {
    title: '问题',
    children: [{
      title: 'AntDesign three',
      count: 60100
    },         {
      title: 'AntDesign four',
      count: 30010
    }]
  },              {
    title: '文章',
    children: [{
      title: 'AntDesign five',
      disabled: true,
      count: 100000
    }]
  }];

  @ViewChild(NzAutocompleteTriggerDirective) trigger: NzAutocompleteTriggerDirective;
}

@Component({
  template: `
    <form [formGroup]='form'>
      <input formControlName="formControl" [nzAutocomplete]="auto"/>
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option">{{option}}</nz-auto-option>
      </nz-autocomplete>
    </form>
  `
})
class NzTestAutocompleteWithFormComponent {
  form: FormGroup;
  options = ['Burns Bay Road', 'Downing Street', 'Wall Street'];
  @ViewChild(NzAutocompleteTriggerDirective) trigger: NzAutocompleteTriggerDirective;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({ formControl: 'Burns' });
  }
}
