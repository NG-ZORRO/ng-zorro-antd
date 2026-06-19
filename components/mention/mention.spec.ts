/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOWN_ARROW, ENTER, ESCAPE, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { ApplicationRef, Component, DebugElement, NgZone, signal, ViewChild, type WritableSignal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NZ_FORM_VARIANT } from 'ng-zorro-antd/core/form';
import {
  createKeyboardEvent,
  dispatchEvent,
  dispatchFakeEvent,
  dispatchKeyboardEvent,
  MockNgZone,
  provideMockDirectionality,
  testDirectionality,
  typeInElement,
  updateNonSignalsInput
} from 'ng-zorro-antd/core/testing';
import { NzStatus, type NzVariant } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzFormControlStatusType, NzFormModule } from '../form';
import { NzInputModule } from '../input';
import { NzMentionTriggerDirective } from './mention-trigger';
import { NzMentionComponent } from './mention.component';
import { NzMentionModule } from './mention.module';

describe('mention', () => {
  let overlayContainerElement: HTMLElement;
  const scrolledSubject = new Subject();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNzNoAnimation(),
        provideNzIconsTesting(),
        provideMockDirectionality(),
        { provide: ScrollDispatcher, useFactory: () => ({ scrolled: () => scrolledSubject }) },
        {
          provide: NgZone,
          useFactory: () => new MockNgZone()
        }
      ]
    });
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
  }));

  describe('toggling', () => {
    let fixture: ComponentFixture<NzTestSimpleMentionComponent>;
    let textarea: HTMLTextAreaElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestSimpleMentionComponent);
      fixture.detectChanges();
      textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
      textarea.value = '@angular';
      await stabilize(fixture);
    });

    it('should open the dropdown when the input is click', () => {
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.mention.isOpen).toBe(true);
    });

    it('should not open the dropdown when the input is click but empty content', () => {
      textarea.value = '';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      expect(fixture.componentInstance.mention.isOpen).toBe(false);
    });

    it('should not open the dropdown on click if the input is readonly', async () => {
      const mention = fixture.componentInstance.mention;
      textarea.readOnly = true;
      fixture.detectChanges();

      expect(mention.isOpen).toBe(false);
      dispatchFakeEvent(textarea, 'click');
      await stabilize(fixture);

      fixture.detectChanges();
      expect(mention.isOpen).toBe(false);
    });

    it('should not open the dropdown on click if the input is disabled', async () => {
      const mention = fixture.componentInstance.mention;
      textarea.disabled = true;
      fixture.detectChanges();

      expect(mention.isOpen).toBe(false);
      dispatchFakeEvent(textarea, 'click');
      await stabilize(fixture);

      fixture.detectChanges();
      expect(mention.isOpen).toBe(false);
    });

    it('should close the dropdown when the user clicks away', async () => {
      const mention = fixture.componentInstance.mention;
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      await stabilize(fixture);
      expect(mention.isOpen).toBe(true);
      dispatchFakeEvent(document.body, 'click');
      expect(mention.isOpen).toBe(false);
    });

    it('should close the dropdown when the user taps away on a touch device', async () => {
      const mention = fixture.componentInstance.mention;
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      await stabilize(fixture);
      dispatchFakeEvent(document, 'touchend');
      expect(mention.isOpen).toBe(false);
    });

    it('should close the dropdown when an option is clicked', async () => {
      const mention = fixture.componentInstance.mention;
      textarea.value = '@a';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      await stabilize(fixture);

      const option = overlayContainerElement.querySelector('.ant-mentions-dropdown-menu-item') as HTMLElement;
      option.click();
      await stabilize(fixture);
      expect(mention.isOpen).toBe(false);
      expect(overlayContainerElement.textContent).toEqual('');
      expect(textarea.value).toEqual('@angular ');
    });

    it('should prevent default on the mousedown event when an option is clicked and should not run change detection', async () => {
      textarea.value = '@a';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      await stabilize(fixture);

      const appRef = TestBed.inject(ApplicationRef);
      const option = overlayContainerElement.querySelector('.ant-mentions-dropdown-menu-item') as HTMLElement;
      const event = new MouseEvent('mousedown');

      vi.spyOn(appRef, 'tick');
      vi.spyOn(event, 'preventDefault');

      option.dispatchEvent(event);

      expect(event.preventDefault).toHaveBeenCalled();
      expect(appRef.tick).not.toHaveBeenCalled();
    });

    it('should support switch trigger', async () => {
      fixture.componentInstance.inputTrigger.set(true);
      fixture.detectChanges();
      await stabilize(fixture);
      const textareaWithSingleLine = fixture.debugElement.query(By.css('textarea')).nativeElement;
      const mention = fixture.componentInstance.mention;
      expect(textareaWithSingleLine).toBeTruthy();

      textareaWithSingleLine.value = '@a';
      fixture.detectChanges();
      dispatchFakeEvent(textareaWithSingleLine, 'click');
      fixture.detectChanges();
      await stabilize(fixture);

      expect(mention.isOpen).toBe(true);

      const option = overlayContainerElement.querySelector('.ant-mentions-dropdown-menu-item') as HTMLElement;
      expect(option).toBeTruthy();
      option.click();
      await stabilize(fixture);
      expect(mention.isOpen).toBe(false);
      expect(overlayContainerElement.textContent).toEqual('');
    });
  });

  describe('keyboard events', () => {
    let fixture: ComponentFixture<NzTestSimpleMentionComponent>;
    let textarea: HTMLTextAreaElement;
    let DOWN_ARROW_EVENT: KeyboardEvent;
    let UP_ARROW_EVENT: KeyboardEvent;
    let ENTER_EVENT: KeyboardEvent;
    // let LEFT_EVENT: KeyboardEvent;
    let RIGHT_EVENT: KeyboardEvent;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestSimpleMentionComponent);
      fixture.detectChanges();
      textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;

      DOWN_ARROW_EVENT = createKeyboardEvent('keydown', DOWN_ARROW);
      UP_ARROW_EVENT = createKeyboardEvent('keydown', UP_ARROW);
      ENTER_EVENT = createKeyboardEvent('keydown', ENTER);
      // LEFT_EVENT = createKeyboardEvent('keydown', LEFT_ARROW);
      RIGHT_EVENT = createKeyboardEvent('keydown', RIGHT_ARROW);

      fixture.detectChanges();
      await stabilize(fixture);
    });

    it('should set the active item to the second option when DOWN key is pressed', () => {
      textarea.value = '@a';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();

      const mention = fixture.componentInstance.mention;
      const optionEls = overlayContainerElement.querySelectorAll(
        '.ant-mentions-dropdown-menu-item'
      ) as NodeListOf<HTMLElement>;

      expect(mention.isOpen).toBe(true);
      fixture.componentInstance.trigger.onKeydown.emit(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[1].classList).toContain('ant-mentions-dropdown-menu-item-active');
    });

    it('should set the active item to the first option when DOWN key is pressed in last item', () => {
      textarea.value = '@';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      const mention = fixture.componentInstance.mention;
      const optionEls = overlayContainerElement.querySelectorAll(
        '.ant-mentions-dropdown-menu-item'
      ) as NodeListOf<HTMLElement>;

      expect(mention.isOpen).toBe(true);

      [1, 2, 3, 4, 5].forEach(() => fixture.componentInstance.trigger.onKeydown.emit(DOWN_ARROW_EVENT));
      fixture.detectChanges();

      expect(optionEls[1].classList).not.toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[4].classList).not.toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[0].classList).toContain('ant-mentions-dropdown-menu-item-active');
    });

    it('should set the active item to the last option when UP key is pressed', () => {
      textarea.value = '@';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      const mention = fixture.componentInstance.mention;
      const optionEls = overlayContainerElement.querySelectorAll(
        '.ant-mentions-dropdown-menu-item'
      ) as NodeListOf<HTMLElement>;

      expect(mention.isOpen).toBe(true);

      fixture.componentInstance.trigger.onKeydown.emit(UP_ARROW_EVENT);
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[4].classList).toContain('ant-mentions-dropdown-menu-item-active');
    });

    it('should set the active item to the previous option when UP key is pressed', () => {
      textarea.value = '@';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      const mention = fixture.componentInstance.mention;
      const optionEls = overlayContainerElement.querySelectorAll(
        '.ant-mentions-dropdown-menu-item'
      ) as NodeListOf<HTMLElement>;

      expect(mention.isOpen).toBe(true);

      [1, 2, 3].forEach(() => fixture.componentInstance.trigger.onKeydown.emit(UP_ARROW_EVENT));
      fixture.detectChanges();

      expect(optionEls[0].classList).not.toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[2].classList).toContain('ant-mentions-dropdown-menu-item-active');
    });

    it('should set the active item properly after filtering', () => {
      const componentInstance = fixture.componentInstance;

      typeInElement('@a', textarea);
      fixture.detectChanges();

      componentInstance.trigger.onKeydown.emit(DOWN_ARROW_EVENT);
      fixture.detectChanges();

      const optionEls = overlayContainerElement.querySelectorAll(
        '.ant-mentions-dropdown-menu-item'
      ) as NodeListOf<HTMLElement>;

      expect(optionEls[0].classList).not.toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[1].classList).toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[1].innerText).toEqual('ant-design');
    });

    it('should set the active after filtering item when RIGHT/LEFT key is pressed', () => {
      textarea.value = '@a @t';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      const componentInstance = fixture.componentInstance;
      [1, 2, 3, 4].forEach(() => componentInstance.trigger.onKeydown.emit(RIGHT_EVENT));
      fixture.detectChanges();

      const optionEls = overlayContainerElement.querySelectorAll(
        '.ant-mentions-dropdown-menu-item'
      ) as NodeListOf<HTMLElement>;

      expect(optionEls[0].classList).toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[1].classList).not.toContain('ant-mentions-dropdown-menu-item-active');
      expect(optionEls[0].innerText).toEqual('ant-design');
      expect(optionEls[1].innerText).toEqual('mention');
    });

    it('should fill the text field when an option is selected with ENTER', async () => {
      textarea.value = '@';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      const componentInstance = fixture.componentInstance;
      componentInstance.trigger.onKeydown.emit(DOWN_ARROW_EVENT);
      await stabilize(fixture);
      fixture.detectChanges();

      componentInstance.trigger.onKeydown.emit(ENTER_EVENT);
      fixture.detectChanges();

      expect(componentInstance.inputValue).toContain('@ant-design ');

      expect(textarea.value).toContain('@ant-design ');
    });

    it('should prevent the default enter key action', async () => {
      textarea.value = '@';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.componentInstance.trigger.onKeydown.emit(DOWN_ARROW_EVENT);
      await stabilize(fixture);

      fixture.componentInstance.trigger.onKeydown.emit(ENTER_EVENT);
      // TODO: ivy fix
      expect(ENTER_EVENT.defaultPrevented).toBe(true);
      // expect(false).toBe(true);
    });

    it('should not prevent the default enter action for a closed dropdown', () => {
      textarea.value = 'ABC';
      fixture.detectChanges();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      fixture.componentInstance.trigger.onKeydown.emit(ENTER_EVENT);
      // TODO: ivy fix
      expect(ENTER_EVENT.defaultPrevented).toBe(false);
      // expect(true).toBe(false);
    });

    it('should close the dropdown when tabbing', async () => {
      textarea.value = '@';
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-mentions-dropdown')).toBeTruthy();
      dispatchKeyboardEvent(textarea, 'keydown', TAB);
      await stabilize(fixture);
      expect(overlayContainerElement.querySelector('.ant-mentions-dropdown')).toBeFalsy();
    });

    it('should close the dropdown when pressing escape', async () => {
      textarea.value = '@';
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector('.ant-mentions-dropdown')).toBeTruthy();

      dispatchKeyboardEvent(textarea, 'keydown', ESCAPE);
      await stabilize(fixture);
      expect(overlayContainerElement.querySelector('.ant-mentions-dropdown')).toBeFalsy();
    });
  });

  describe('property', () => {
    let fixture: ComponentFixture<NzTestPropertyMentionComponent>;
    let textarea: HTMLTextAreaElement;
    let spyNzOnSearch: ReturnType<typeof vi.spyOn>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestPropertyMentionComponent);
      fixture.detectChanges();
      await stabilize(fixture);
      textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
      spyNzOnSearch = vi.spyOn(fixture.componentInstance, 'onSearchChange');
    });

    afterEach(() => {
      spyNzOnSearch?.mockClear();
    });

    describe('async suggestions', () => {
      beforeEach(() => vi.useFakeTimers());
      afterEach(() => vi.useRealTimers());

      it('should open the dropdown when the async load suggestions', async () => {
        fixture.detectChanges();
        dispatchFakeEvent(textarea, 'click');
        typeInElement('@', textarea);
        fixture.detectChanges();
        fixture.componentInstance.fetchSuggestions();
        fixture.detectChanges();

        await Promise.resolve();
        fixture.detectChanges();
        expect(overlayContainerElement.querySelector('.ant-mentions-dropdown .anticon-loading')).toBeTruthy();
        vi.advanceTimersByTime(500);
        fixture.detectChanges();
        await Promise.resolve();
        fixture.detectChanges();
        expect(overlayContainerElement.querySelector('.ant-mentions-dropdown .anticon-loading')).toBeFalsy();
      });
    });

    it('should open the dropdown when the type in @ prefix', () => {
      fixture.componentInstance.setArrayPrefix();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      typeInElement('@', textarea);
      fixture.detectChanges();

      const mention = fixture.componentInstance.mention;

      expect(mention.isOpen).toBe(true);
    });

    it('should emit nzOnSearchChange when type in @ prefix', () => {
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      typeInElement('@test', textarea);
      fixture.detectChanges();

      expect(spyNzOnSearch).toHaveBeenCalledTimes(1);

      typeInElement('@test  @', textarea);
      fixture.detectChanges();

      expect(spyNzOnSearch).toHaveBeenCalledTimes(2);

      typeInElement('@test  @ @', textarea);
      fixture.detectChanges();

      expect(spyNzOnSearch).toHaveBeenCalledTimes(3);
    });

    it('should open the dropdown when the type in # prefix', () => {
      fixture.componentInstance.setArrayPrefix();
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      typeInElement('#', textarea);
      fixture.detectChanges();

      const mention = fixture.componentInstance.mention;

      expect(mention.isOpen).toBe(true);
    });

    it('should has the custom template in the dropdown', () => {
      dispatchFakeEvent(textarea, 'click');
      fixture.detectChanges();
      typeInElement('@', textarea);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-mentions-dropdown .custom')).toBeTruthy();
    });

    it('should correct parsing the trigger content', () => {
      fixture.componentInstance.setArrayPrefix();
      typeInElement(
        'ABC @Angular 123 @ant-design @你好 foo ant@gmail.com @@ng 123 .@.@ /@hello \\@hello #ng',
        textarea
      );
      fixture.detectChanges();
      expect(fixture.componentInstance.mention.getMentions().join(',')).toBe('@Angular,@ant-design,@你好,@@ng,#ng');
    });
  });

  describe('status', () => {
    let fixture: ComponentFixture<NzTestStatusMentionComponent>;
    let mention: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestStatusMentionComponent);
      mention = fixture.debugElement.query(By.directive(NzMentionComponent));
      fixture.detectChanges();
      await stabilize(fixture);
    });

    it('should className with status correct', () => {
      fixture.detectChanges();
      expect(mention.nativeElement.classList).toContain('ant-mentions-status-error');

      fixture.componentInstance.status.set('warning');
      fixture.detectChanges();
      expect(mention.nativeElement.classList).toContain('ant-mentions-status-warning');

      fixture.componentInstance.status.set('');
      fixture.detectChanges();
      expect(mention.nativeElement.classList).not.toContain('ant-mentions-status-warning');
    });
  });

  describe('in form', () => {
    let fixture: ComponentFixture<NzTestMentionInFormComponent>;
    let mention: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestMentionInFormComponent);
      mention = fixture.debugElement.query(By.directive(NzMentionComponent));
      fixture.detectChanges();
      await stabilize(fixture);
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(mention.nativeElement.classList).toContain('ant-mentions-status-error');
      expect(mention.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();

      fixture.componentInstance.status.set('warning');
      fixture.detectChanges();
      expect(mention.nativeElement.classList).toContain('ant-mentions-status-warning');

      fixture.componentInstance.status.set('success');
      fixture.detectChanges();
      expect(mention.nativeElement.classList).toContain('ant-mentions-status-success');

      fixture.componentInstance.feedback.set(false);
      fixture.detectChanges();
      expect(mention.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeNull();
    });

    it('should trigger form value update onblur', () => {
      const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
      fixture.detectChanges();
      expect(fixture.componentInstance.mention.value).toBe(textarea.value);
      typeInElement(`${textarea.value} World`, textarea);
      dispatchEvent(textarea, new FocusEvent('blur'));
      fixture.detectChanges();
      expect(fixture.componentInstance.mention.value).toBe(textarea.value);
    });
  });

  describe('variant', () => {
    let fixture: ComponentFixture<NzTestVariantMentionComponent>;
    let mention: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestVariantMentionComponent);
      mention = fixture.debugElement.query(By.directive(NzMentionComponent));
      fixture.detectChanges();
      await stabilize(fixture);
    });

    describe('should variant work', () => {
      it('outlined', () => {
        fixture.componentInstance.variant.set('outlined');
        fixture.detectChanges();
        expect(mention.nativeElement.classList).toContain('ant-mentions-outlined');
      });

      it('filled', () => {
        fixture.detectChanges();
        expect(mention.nativeElement.classList).not.toContain('ant-mentions-filled');
        fixture.componentInstance.variant.set('filled');
        fixture.detectChanges();
        expect(mention.nativeElement.classList).toContain('ant-mentions-filled');
      });

      it('borderless', () => {
        fixture.detectChanges();
        expect(mention.nativeElement.classList).not.toContain('ant-mentions-borderless');
        fixture.componentInstance.variant.set('borderless');
        fixture.detectChanges();
        expect(mention.nativeElement.classList).toContain('ant-mentions-borderless');
      });

      it('underlined', () => {
        fixture.detectChanges();
        expect(mention.nativeElement.classList).not.toContain('ant-mentions-underlined');
        fixture.componentInstance.variant.set('underlined');
        fixture.detectChanges();
        expect(mention.nativeElement.classList).toContain('ant-mentions-underlined');
      });
    });

    it('should switch between variants correctly', () => {
      fixture.componentInstance.variant.set('filled');
      fixture.detectChanges();
      expect(mention.nativeElement.classList).toContain('ant-mentions-filled');

      fixture.componentInstance.variant.set('borderless');
      fixture.detectChanges();
      expect(mention.nativeElement.classList).toContain('ant-mentions-borderless');
      expect(mention.nativeElement.classList).not.toContain('ant-mentions-filled');

      fixture.componentInstance.variant.set('outlined');
      fixture.detectChanges();
      expect(mention.nativeElement.classList).not.toContain('ant-mentions-borderless');
      expect(mention.nativeElement.classList).not.toContain('ant-mentions-filled');
      expect(mention.nativeElement.classList).not.toContain('ant-mentions-underlined');
    });

    it('should maintain functionality across different variants', async () => {
      const variants: Array<'outlined' | 'filled' | 'borderless' | 'underlined'> = [
        'outlined',
        'filled',
        'borderless',
        'underlined'
      ];

      for (const variant of variants) {
        fixture.componentInstance.variant.set(variant);
        fixture.detectChanges();

        const textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
        textarea.value = '@angular';
        fixture.detectChanges();

        dispatchFakeEvent(textarea, 'click');
        fixture.detectChanges();
        await stabilize(fixture);

        expect(fixture.componentInstance.mention.isOpen).toBe(true);

        const option = overlayContainerElement.querySelector('.ant-mentions-dropdown-menu-item') as HTMLElement;
        if (option) {
          option.click();
          await stabilize(fixture);

          expect(fixture.componentInstance.mention.isOpen).toBe(false);
        }
      }
    });
  });

  describe('clear button', () => {
    let fixture: ComponentFixture<NzTestClearMentionComponent>;
    let textarea: HTMLTextAreaElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestClearMentionComponent);
      fixture.detectChanges();
      textarea = fixture.debugElement.query(By.css('textarea')).nativeElement;
      await stabilize(fixture);
    });

    it('should not show clear button when nzAllowClear is false', async () => {
      fixture.componentInstance.allowClear.set(false);
      fixture.detectChanges();
      typeInElement('test value', textarea);
      fixture.detectChanges();
      await stabilize(fixture);
      expect(fixture.debugElement.query(By.css('.ant-mentions-clear-icon'))).toBeNull();
    });

    it('should show clear button when nzAllowClear is true and has value', async () => {
      fixture.componentInstance.allowClear.set(true);
      fixture.detectChanges();
      typeInElement('test value', textarea);
      fixture.detectChanges();
      await stabilize(fixture);
      expect(fixture.debugElement.query(By.css('.ant-mentions-clear-icon'))).toBeTruthy();
    });

    it('should not show clear button when nzAllowClear is true but has no value', async () => {
      fixture.componentInstance.allowClear.set(true);
      fixture.detectChanges();
      typeInElement('', textarea);
      fixture.detectChanges();
      await stabilize(fixture);
      expect(fixture.debugElement.query(By.css('.ant-mentions-clear-icon'))).toBeNull();
    });

    it('should clear input value when clear button is clicked', async () => {
      fixture.componentInstance.allowClear.set(true);
      fixture.detectChanges();
      typeInElement('test value', textarea);
      fixture.detectChanges();
      await stabilize(fixture);

      const clearButton = fixture.debugElement.query(By.css('.ant-mentions-clear-icon')).nativeElement;
      clearButton.click();
      fixture.detectChanges();
      await stabilize(fixture);

      expect(textarea.value).toBe('');
      expect(fixture.componentInstance.inputValue).toBe('');
    });

    it('should emit nzOnClear when clear button is clicked', async () => {
      const spy = vi.spyOn(fixture.componentInstance, 'onClear');
      fixture.componentInstance.allowClear.set(true);
      fixture.detectChanges();
      typeInElement('test value', textarea);
      fixture.detectChanges();
      await stabilize(fixture);

      const clearButton = fixture.debugElement.query(By.css('.ant-mentions-clear-icon')).nativeElement;
      clearButton.click();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('should use custom clear icon when provided', async () => {
      fixture.componentInstance.allowClear.set(true);
      fixture.componentInstance.useCustomClearIcon.set(true);
      fixture.detectChanges();
      typeInElement('test value', textarea);
      fixture.detectChanges();
      await stabilize(fixture);

      const clearIcon = fixture.debugElement.query(By.css('.custom-clear-icon'));
      expect(clearIcon).toBeTruthy();
    });
  });
});

testDirectionality(() => NzTestSimpleMentionComponent, By.directive(NzMentionComponent), 'ant-mentions', {
  providers: [provideNzNoAnimation(), provideNzIconsTesting()]
});

async function stabilize<T>(fixture: ComponentFixture<T>, ms?: number): Promise<void> {
  fixture.detectChanges();
  await updateNonSignalsInput(fixture, ms);
  fixture.detectChanges();
}

describe('finalVariant', () => {
  let fixture: ComponentFixture<NzTestFinalVariantMentionComponent>;
  let mentionHtmlElement: HTMLElement;
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
    fixture = TestBed.createComponent(NzTestFinalVariantMentionComponent);
    mentionHtmlElement = fixture.debugElement.query(By.directive(NzMentionComponent)).nativeElement;
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(mentionHtmlElement.classList).toContain('ant-mentions-filled');
  });

  it('should use nzVariant over formVariant when nzVariant is explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(NzTestFinalVariantMentionComponent);
    mentionHtmlElement = fixture.debugElement.query(By.directive(NzMentionComponent)).nativeElement;
    fixture.componentInstance.variant.set('borderless');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(mentionHtmlElement.classList).toContain('ant-mentions-borderless');
    expect(mentionHtmlElement.classList).not.toContain('ant-mentions-filled');
  });

  it('should use nzVariant outlined over formVariant when explicitly set', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_VARIANT, useValue: formVariantSignal }]
    });
    fixture = TestBed.createComponent(NzTestFinalVariantMentionComponent);
    mentionHtmlElement = fixture.debugElement.query(By.directive(NzMentionComponent)).nativeElement;
    fixture.componentInstance.variant.set('outlined');
    fixture.detectChanges();
    formVariantSignal.set('filled');
    fixture.detectChanges();
    expect(mentionHtmlElement.classList).not.toContain('ant-mentions-filled');
  });

  it('should use nzVariant when no formVariant is provided', () => {
    fixture = TestBed.createComponent(NzTestFinalVariantMentionComponent);
    mentionHtmlElement = fixture.debugElement.query(By.directive(NzMentionComponent)).nativeElement;
    fixture.componentInstance.variant.set('filled');
    fixture.detectChanges();
    expect(mentionHtmlElement.classList).toContain('ant-mentions-filled');
  });

  it('should default to outlined when neither nzVariant nor formVariant is set', () => {
    fixture = TestBed.createComponent(NzTestFinalVariantMentionComponent);
    mentionHtmlElement = fixture.debugElement.query(By.directive(NzMentionComponent)).nativeElement;
    fixture.detectChanges();
    expect(mentionHtmlElement.classList).not.toContain('ant-mentions-filled');
    expect(mentionHtmlElement.classList).not.toContain('ant-mentions-borderless');
    expect(mentionHtmlElement.classList).not.toContain('ant-mentions-underlined');
  });
});

@Component({
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions()">
      @if (!inputTrigger()) {
        <textarea nz-input [(ngModel)]="inputValue" nzMentionTrigger></textarea>
      } @else {
        <textarea rows="1" nz-input [(ngModel)]="inputValue" nzMentionTrigger></textarea>
      }
    </nz-mention>
  `
})
class NzTestSimpleMentionComponent {
  inputValue: string = '@angular';
  readonly inputTrigger = signal(false);
  readonly suggestions = signal(['angular', 'ant-design', 'mention', '中文', 'にほんご']);
  @ViewChild(NzMentionComponent, { static: false }) mention!: NzMentionComponent;
  @ViewChild(NzMentionTriggerDirective, { static: false }) trigger!: NzMentionTriggerDirective;
}

@Component({
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention
      [nzSuggestions]="webFrameworks()"
      [nzValueWith]="valueWith"
      [nzPrefix]="prefix()"
      nzPlacement="top"
      [nzLoading]="loading()"
      (nzOnSearchChange)="onSearchChange()"
    >
      <textarea nz-input [(ngModel)]="inputValue" nzMentionTrigger></textarea>
      <ng-container *nzMentionSuggestion="let framework">
        <span class="custom">{{ framework.name }} - {{ framework.type }}</span>
      </ng-container>
    </nz-mention>
  `
})
class NzTestPropertyMentionComponent {
  inputValue: string = '@angular';
  readonly webFrameworks = signal([
    { name: 'React', type: 'JavaScript' },
    { name: 'Angular', type: 'JavaScript' },
    { name: 'Laravel', type: 'PHP' },
    { name: 'Flask', type: 'Python' },
    { name: 'Django', type: 'Python' }
  ]);
  readonly loading = signal(false);
  readonly prefix = signal<string | string[]>('@');
  valueWith = (data: { name: string; type: string }): string => data.name;
  @ViewChild(NzMentionComponent, { static: false }) mention!: NzMentionComponent;
  @ViewChild(NzMentionTriggerDirective, { static: false }) trigger!: NzMentionTriggerDirective;

  setArrayPrefix(): void {
    this.prefix.set(['@', '#']);
  }

  onSearchChange(): void {}

  fetchSuggestions(): void {
    this.webFrameworks.set([]);
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.webFrameworks.set([
        { name: 'React', type: 'JavaScript' },
        { name: 'Angular', type: 'JavaScript' },
        { name: 'Laravel', type: 'PHP' },
        { name: 'Flask', type: 'Python' },
        { name: 'Django', type: 'Python' }
      ]);
    }, 500);
  }
}

@Component({
  imports: [NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="[]" [nzStatus]="status()">
      <textarea rows="1" nz-input nzMentionTrigger></textarea>
    </nz-mention>
  `
})
class NzTestStatusMentionComponent {
  readonly status = signal<NzStatus>('error');
}

@Component({
  imports: [NzFormModule, ReactiveFormsModule, NzMentionModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback()" [nzValidateStatus]="status()">
          <nz-mention [nzSuggestions]="[]">
            <textarea rows="1" nzMentionTrigger [formControl]="mention"></textarea>
          </nz-mention>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
class NzTestMentionInFormComponent {
  readonly status = signal<NzFormControlStatusType>('error');
  readonly feedback = signal(true);

  mention = new FormControl('Hello @iaosee', { updateOn: 'blur' });
}

@Component({
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions()" [nzVariant]="variant()">
      <textarea nz-input [(ngModel)]="inputValue" nzMentionTrigger></textarea>
    </nz-mention>
  `
})
class NzTestVariantMentionComponent {
  inputValue: string = '@angular';
  readonly variant = signal<'outlined' | 'filled' | 'borderless' | 'underlined'>('outlined');
  readonly suggestions = signal(['angular', 'ant-design', 'mention']);
  @ViewChild(NzMentionComponent, { static: false }) mention!: NzMentionComponent;
}

@Component({
  imports: [FormsModule, NzInputModule, NzMentionModule],
  template: `
    <nz-mention
      [nzSuggestions]="suggestions()"
      [nzAllowClear]="allowClear()"
      [nzClearIcon]="useCustomClearIcon() ? clearIconTemplate : null"
      (nzOnClear)="onClear()"
    >
      <textarea nz-input [(ngModel)]="inputValue" nzMentionTrigger></textarea>
      <ng-template #clearIconTemplate>
        <span class="custom-clear-icon">×</span>
      </ng-template>
    </nz-mention>
  `
})
class NzTestClearMentionComponent {
  inputValue = '';
  readonly suggestions = signal(['angular', 'ant-design', 'mention']);
  readonly allowClear = signal(false);
  readonly useCustomClearIcon = signal(false);

  @ViewChild(NzMentionComponent, { static: false }) mention!: NzMentionComponent;

  onClear(): void {}
}

@Component({
  imports: [NzMentionModule],
  template: `
    <nz-mention [nzSuggestions]="suggestions()" [nzVariant]="variant()">
      <textarea nz-input nzMentionTrigger></textarea>
    </nz-mention>
  `
})
class NzTestFinalVariantMentionComponent {
  readonly variant = signal<NzVariant | undefined>(undefined);
  readonly suggestions = signal(['angular', 'ant-design', 'mention']);
}
