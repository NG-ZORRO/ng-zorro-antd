/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
  ApplicationRef,
  Component,
  DebugElement,
  signal,
  TemplateRef,
  ViewChild,
  type WritableSignal
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NZ_FORM_SIZE } from 'ng-zorro-antd/core/form';
import {
  createKeyboardEvent,
  dispatchKeyboardEvent,
  testDirectionality,
  updateNonSignalsInput
} from 'ng-zorro-antd/core/testing';
import { NzSizeDSType, type NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzSwitchComponent } from './switch.component';
import { NzSwitchModule } from './switch.module';

describe('switch', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  });

  describe('basic switch', () => {
    let fixture: ComponentFixture<NzTestSwitchBasicComponent>;
    let testComponent: NzTestSwitchBasicComponent;
    let switchElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSwitchBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('ant-switch');
    });

    it('should ngModel work', async () => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).not.toContain('ant-switch-checked');
      expect(testComponent.value()).toBe(false);
      testComponent.value.set(true);
      await stabilize(fixture);
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('ant-switch-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    });

    it('should click work', () => {
      const switchButton = switchElement.nativeElement.firstElementChild! as HTMLButtonElement;
      expect(testComponent.value()).toBe(false);
      switchButton.click();
      expect(testComponent.value()).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      switchButton.click();
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      testComponent.control.set(true);
      fixture.detectChanges();
      switchButton.click();
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
    });

    it('should disable work', async () => {
      testComponent.disabled.set(true);
      fixture.detectChanges();
      expect(testComponent.value()).toBe(false);
      (switchElement.nativeElement.firstElementChild! as HTMLButtonElement).click();
      await stabilize(fixture);
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    });

    it('should loading work', async () => {
      testComponent.loading.set(true);
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('ant-switch-loading');
      expect(testComponent.value()).toBe(false);
      (switchElement.nativeElement.firstElementChild! as HTMLButtonElement).click();
      await stabilize(fixture);
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    });

    it('should size work', () => {
      testComponent.size.set('small');
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('ant-switch-small');
    });

    it('should key down work', () => {
      expect(testComponent.value()).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      expect(testComponent.value()).toBe(true);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value()).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);

      fixture.detectChanges();
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', SPACE);
      fixture.detectChanges();
      expect(testComponent.value()).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control.set(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control.set(false);
      testComponent.loading.set(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control.set(false);
      testComponent.loading.set(false);
      testComponent.disabled.set(true);
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
    });

    it('should children work', async () => {
      await stabilize(fixture);
      expect(switchElement.nativeElement.querySelector('.ant-switch-inner').innerText).toBe('off');
      (switchElement.nativeElement.firstElementChild! as HTMLButtonElement).click();
      await stabilize(fixture);
      expect(switchElement.nativeElement.querySelector('.ant-switch-inner').innerText).toBe('on');
    });

    it('should focus and blur function work', async () => {
      fixture.detectChanges();
      const buttonElement = switchElement.nativeElement.firstElementChild as HTMLElement;
      spyOn(buttonElement, 'focus').and.callThrough();
      spyOn(buttonElement, 'blur').and.callThrough();
      testComponent.nzSwitchComponent.focus();
      await Promise.resolve();
      fixture.detectChanges();
      expect(buttonElement.focus).toHaveBeenCalledTimes(1);
      testComponent.nzSwitchComponent.blur();
      await Promise.resolve();
      fixture.detectChanges();
      expect(buttonElement.blur).toHaveBeenCalledTimes(1);
    });
    describe('change detection behavior', () => {
      it('should not run change detection on `click` events if the switch is disabled', () => {
        testComponent.disabled.set(true);
        fixture.detectChanges();

        const appRef = TestBed.inject(ApplicationRef);
        const event = new MouseEvent('click');

        spyOn(appRef, 'tick');
        spyOn(event, 'preventDefault').and.callThrough();

        switchElement.nativeElement.dispatchEvent(event);

        expect(appRef.tick).not.toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
      });
      it('should not run change detection on `keydown` events if the switch is disabled', async () => {
        testComponent.disabled.set(true);
        await stabilize(fixture);

        const switchButton = switchElement.nativeElement.querySelector('.ant-switch');
        const appRef = TestBed.inject(ApplicationRef);
        const event = new KeyboardEvent('keydown', {
          keyCode: SPACE
        });

        spyOn(appRef, 'tick');
        spyOn(event, 'preventDefault').and.callThrough();

        switchButton.dispatchEvent(event);

        expect(appRef.tick).not.toHaveBeenCalled();
        expect(event.preventDefault).not.toHaveBeenCalled();

        testComponent.disabled.set(false);
        await stabilize(fixture);

        const enabledEvent = createKeyboardEvent('keydown', SPACE);
        spyOn(enabledEvent, 'preventDefault').and.callThrough();
        switchButton.dispatchEvent(enabledEvent);

        expect(enabledEvent.preventDefault).toHaveBeenCalled();
      });
    });
  });
  describe('template switch', () => {
    let fixture: ComponentFixture<NzTestSwitchTemplateComponent>;
    let switchElement: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSwitchTemplateComponent);
      fixture.detectChanges();
      switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
    });

    it('should children template work', async () => {
      await stabilize(fixture);
      expect(switchElement.nativeElement.querySelector('.ant-switch-inner').firstElementChild!.classList).toContain(
        'anticon-close'
      );
      (switchElement.nativeElement.firstElementChild! as HTMLButtonElement).click();
      await stabilize(fixture);
      expect(switchElement.nativeElement.querySelector('.ant-switch-inner').firstElementChild!.classList).toContain(
        'anticon-check'
      );
    });
  });

  describe('switch form', () => {
    let fixture: ComponentFixture<NzTestSwitchFormComponent>;
    let testComponent: NzTestSwitchFormComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSwitchFormComponent);
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should be in pristine, untouched, and valid states and enable initially', async () => {
      await stabilize(fixture);
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      const buttonElement = switchElement.nativeElement.firstElementChild! as HTMLButtonElement;
      expect(testComponent.formControl.valid).toBe(true);
      expect(testComponent.formControl.pristine).toBe(true);
      expect(testComponent.formControl.touched).toBe(false);
      expect(buttonElement.disabled).toBeFalsy();
      expect(buttonElement.classList).not.toContain('ant-switch-disabled');
    });

    it('should be disable if form is disable and nzDisable set to false initially', async () => {
      testComponent.disable();
      await stabilize(fixture);
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      const buttonElement = switchElement.nativeElement.firstElementChild! as HTMLButtonElement;
      expect(buttonElement.disabled).toBeTruthy();
      expect(buttonElement.classList).toContain('ant-switch-disabled');
    });

    it('should set disabled work', async () => {
      testComponent.disabled.set(true);
      await stabilize(fixture);
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      const buttonElement = switchElement.nativeElement.firstElementChild! as HTMLButtonElement;

      expect(buttonElement.disabled).toBeTruthy();
      expect(buttonElement.classList).toContain('ant-switch-disabled');
      expect(testComponent.formControl.value).toBe(true);

      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(true);

      testComponent.enable();
      await stabilize(fixture);
      expect(buttonElement.disabled).toBeFalsy();
      expect(buttonElement.classList).not.toContain('ant-switch-disabled');
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(false);

      testComponent.disable();
      await stabilize(fixture);
      expect(buttonElement.disabled).toBeTruthy();
      expect(buttonElement.classList).toContain('ant-switch-disabled');
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(false);
    });
  });

  testDirectionality(() => NzTestSwitchBasicComponent, By.css('.ant-switch'), 'ant-switch');
});

describe('finalSize', () => {
  let fixture: ComponentFixture<NzTestSwitchBasicComponent>;
  let switchElement: HTMLElement;
  let formSizeSignal: WritableSignal<NzSizeLDSType>;

  beforeEach(() => {
    formSizeSignal = signal<NzSizeDSType>('default');
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should set correctly the size from the formSize signal', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NZ_FORM_SIZE, useValue: formSizeSignal }]
    });
    fixture = TestBed.createComponent(NzTestSwitchBasicComponent);
    switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent)).nativeElement;
    fixture.detectChanges();
    formSizeSignal.set('small');
    fixture.detectChanges();
    expect(switchElement.firstElementChild!.classList).toContain('ant-switch-small');
  });

  it('should set correctly the size from the component input', () => {
    fixture = TestBed.createComponent(NzTestSwitchBasicComponent);
    switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent)).nativeElement;
    fixture.componentInstance.size.set('small');
    fixture.detectChanges();
    expect(switchElement.firstElementChild!.classList).toContain('ant-switch-small');
  });
});

async function stabilize<T>(fixture: ComponentFixture<T>): Promise<void> {
  fixture.detectChanges();
  await updateNonSignalsInput(fixture);
  fixture.detectChanges();
}

@Component({
  imports: [FormsModule, NzIconModule, NzSwitchModule],
  template: `
    <ng-template #checkedChildrenTemplate><nz-icon nzType="check" /></ng-template>
    <ng-template #unCheckedChildrenTemplate><nz-icon nzType="closs" /></ng-template>
    <nz-switch
      [ngModel]="value()"
      (ngModelChange)="value.set($event); modelChange($event)"
      [nzDisabled]="disabled()"
      [nzLoading]="loading()"
      [nzSize]="size()"
      [nzControl]="control()"
      [nzCheckedChildren]="checkedChildren"
      [nzUnCheckedChildren]="unCheckedChildren"
    />
  `
})
export class NzTestSwitchBasicComponent {
  @ViewChild(NzSwitchComponent, { static: false }) nzSwitchComponent!: NzSwitchComponent;
  @ViewChild('checkedChildrenTemplate', { static: false }) checkedChildrenTemplate!: TemplateRef<void>;
  @ViewChild('unCheckedChildrenTemplate', { static: false }) unCheckedChildrenTemplate!: TemplateRef<void>;
  checkedChildren = 'on';
  unCheckedChildren = 'off';
  readonly value = signal(false);
  readonly control = signal(false);
  readonly disabled = signal(false);
  readonly size = signal<NzSizeDSType>('default');
  readonly loading = signal(false);
  modelChange = jasmine.createSpy('model change callback');
}

@Component({
  imports: [NzIconModule, NzSwitchModule],
  template: `
    <ng-template #checkedChildrenTemplate><nz-icon nzType="check" /></ng-template>
    <ng-template #unCheckedChildrenTemplate><nz-icon nzType="close" /></ng-template>
    <nz-switch [nzCheckedChildren]="checkedChildrenTemplate" [nzUnCheckedChildren]="unCheckedChildrenTemplate" />
  `
})
export class NzTestSwitchTemplateComponent {}

@Component({
  imports: [ReactiveFormsModule, NzSwitchModule],
  selector: 'nz-test-switch-form',
  template: `
    <form>
      <nz-switch [formControl]="formControl" [nzDisabled]="disabled()" />
    </form>
  `
})
export class NzTestSwitchFormComponent {
  formControl = new FormControl(true);

  readonly disabled = signal(false);

  disable(): void {
    this.formControl.disable();
  }

  enable(): void {
    this.formControl.enable();
  }
}
