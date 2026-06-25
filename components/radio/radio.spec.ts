/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, DebugElement, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { NZ_FORM_SIZE } from 'ng-zorro-antd/core/form';
import { createMouseEvent, testDirectionality, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { NzRadioGroupComponent } from './radio-group.component';
import { NzRadioComponent } from './radio.component';
import { NzRadioModule } from './radio.module';

describe('radio', () => {
  describe('single radio basic', () => {
    let fixture: ComponentFixture<NzTestRadioSingleComponent>;
    let testComponent: NzTestRadioSingleComponent;
    let radio: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioSingleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(NzRadioComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(radio.nativeElement.classList).toContain('ant-radio-wrapper');
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio');
      expect(radio.nativeElement.firstElementChild.lastElementChild.classList).toContain('ant-radio-inner');
    });

    it('should click work', async () => {
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radio.nativeElement.click();
      await stabilize(fixture, 100);
      expect(testComponent.value()).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      radio.nativeElement.click();
      await stabilize(fixture, 100);
      expect(testComponent.value()).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledWith(true);
    });

    it('should disabled work', async () => {
      testComponent.disabled.set(true);
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radio.nativeElement.click();
      await stabilize(fixture);
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-checked');
      expect(testComponent.value()).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    });

    it('should not run change detection if the radio is disabled', () => {
      testComponent.disabled.set(true);
      fixture.detectChanges();
      const appRef = TestBed.inject(ApplicationRef);
      vi.spyOn(appRef, 'tick');
      const event = createMouseEvent('click');
      vi.spyOn(event, 'preventDefault');
      vi.spyOn(event, 'stopPropagation');
      radio.nativeElement.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(appRef.tick).not.toHaveBeenCalled();
    });

    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autoFocus.set(true);
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autoFocus.set(false);
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')).toBe(null);
    });

    it('should focus and blur function work', () => {
      fixture.detectChanges();
      const inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
      vi.spyOn(inputElement, 'focus');
      vi.spyOn(inputElement, 'blur');
      testComponent.nzRadioComponent.focus();
      fixture.detectChanges();
      expect(inputElement.focus).toHaveBeenCalledTimes(1);
      testComponent.nzRadioComponent.blur();
      fixture.detectChanges();
      expect(inputElement.blur).toHaveBeenCalledTimes(1);
    });
  });

  describe('single radio button', () => {
    let fixture: ComponentFixture<NzTestRadioButtonComponent>;
    let radio: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioButtonComponent);
      fixture.detectChanges();
      radio = fixture.debugElement.query(By.directive(NzRadioComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(radio.nativeElement.classList).toContain('ant-radio-button-wrapper');
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-button');
      expect(radio.nativeElement.firstElementChild.lastElementChild.classList).toContain('ant-radio-button-inner');
    });
  });

  describe('radio group', () => {
    let fixture: ComponentFixture<NzTestRadioGroupComponent>;
    let testComponent: NzTestRadioGroupComponent;
    let radios: DebugElement[];
    let radioGroup: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));
      radioGroup = fixture.debugElement.query(By.directive(NzRadioGroupComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(radioGroup.nativeElement.classList).toContain('ant-radio-group');
    });

    it('should click work', async () => {
      fixture.detectChanges();
      expect(testComponent.value()).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radios[1].nativeElement.click();
      await stabilize(fixture, 100);
      expect(testComponent.value()).toBe('B');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      radios[1].nativeElement.click();
      await stabilize(fixture, 100);
      expect(testComponent.value()).toBe('B');
      expect(testComponent.modelChange).toHaveBeenCalledWith('B');
    });

    it('should disable work', async () => {
      testComponent.disabled.set(true);
      await stabilize(fixture);
      expect(testComponent.value()).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radios[1].nativeElement.click();
      await stabilize(fixture);
      expect(radios[1].nativeElement.firstElementChild!.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value()).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    });

    it('should name work', async () => {
      testComponent.name.set('test');
      await stabilize(fixture);
      expect(radios.every(radio => radio.nativeElement.querySelector('input').name === 'test')).toBe(true);
    });
  });

  describe('radio group disabled', () => {
    let fixture: ComponentFixture<NzTestRadioGroupDisabledComponent>;
    let testComponent: NzTestRadioGroupDisabledComponent;
    let radios: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupDisabledComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));
    });

    it('should group disable work', async () => {
      testComponent.disabled.set(true);
      await stabilize(fixture);
      expect(testComponent.value()).toBe('A');
      radios[1].nativeElement.click();
      await stabilize(fixture);
      expect(radios[1].nativeElement.firstElementChild!.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value()).toBe('A');
    });

    it('should single disable work', async () => {
      testComponent.disabled.set(false);
      fixture.detectChanges();
      testComponent.singleDisabled.set(true);
      fixture.detectChanges();
      expect(testComponent.value()).toBe('A');
      radios[2].nativeElement.click();
      await stabilize(fixture);
      expect(radios[2].nativeElement.firstElementChild!.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value()).toBe('A');
    });
  });

  describe('radio group solid', () => {
    let fixture: ComponentFixture<NzTestRadioGroupSolidComponent>;
    let radioGroup: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupSolidComponent);
      fixture.detectChanges();
      radioGroup = fixture.debugElement.query(By.directive(NzRadioGroupComponent));
    });

    it('should support solid css', () => {
      fixture.detectChanges();
      expect(radioGroup.nativeElement.classList).toContain('ant-radio-group-solid');
    });
  });

  describe('radio form', () => {
    let fixture: ComponentFixture<NzTestRadioFormComponent>;
    let testComponent: NzTestRadioFormComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioFormComponent);
      testComponent = fixture.componentInstance;
    });

    it('should be in pristine, untouched, and valid states and enable initially', async () => {
      await stabilize(fixture);
      const radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      const inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeFalsy();
      expect(testComponent.formControl.valid).toBe(true);
      expect(testComponent.formControl.pristine).toBe(true);
      expect(testComponent.formControl.touched).toBe(false);
    });

    it('should be disable if form is disable and nzDisable set to false initially', async () => {
      testComponent.formControl.disable();
      await stabilize(fixture);
      const radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      const inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeTruthy();
    });

    it('should set disabled work', async () => {
      testComponent.disabled.set(true);
      await stabilize(fixture);
      const radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      const inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeTruthy();
      expect(testComponent.formControl.value).toBe(false);
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(false);

      testComponent.enable();
      await stabilize(fixture);
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeFalsy();
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(true);

      testComponent.disable();
      await stabilize(fixture);
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeTruthy();
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(true);
    });
  });

  describe('radio group form', () => {
    let fixture: ComponentFixture<NzTestRadioGroupFormComponent>;
    let testComponent: NzTestRadioGroupFormComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupFormComponent);
      testComponent = fixture.componentInstance;
    });

    it('should be in pristine, untouched, and valid states initially', async () => {
      await stabilize(fixture);
      const radioGroup: NzRadioGroupComponent = fixture.debugElement.query(
        By.directive(NzRadioGroupComponent)
      ).componentInstance;
      const radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));
      const [firstRadios] = radios;
      expect(testComponent.formControl.valid).toBe(true);
      expect(testComponent.formControl.pristine).toBe(true);
      expect(testComponent.formControl.touched).toBe(false);
      expect(radioGroup.nzDisabled).toBeFalsy();
      expect(firstRadios.componentInstance.nzDisabled).toBeTruthy();
    });

    it('should be disable if form is disable and nzDisable set to false initially', async () => {
      testComponent.formControl.disable();
      await stabilize(fixture);
      const radioGroup: NzRadioGroupComponent = fixture.debugElement.query(
        By.directive(NzRadioGroupComponent)
      ).componentInstance;
      expect(radioGroup.nzDisabled).toBeTruthy();
    });

    it('should set disabled work', async () => {
      testComponent.nzDisabled.set(true);
      await stabilize(fixture);
      let radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));
      const radioGroup: NzRadioGroupComponent = fixture.debugElement.query(
        By.directive(NzRadioGroupComponent)
      ).componentInstance;
      expect(radioGroup.nzDisabled).toBeTruthy();
      radios[0].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe('B');

      testComponent.enable();
      await stabilize(fixture);

      expect(radioGroup.nzDisabled).toBeFalsy();
      radios[0].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe('A');

      testComponent.disable();
      await stabilize(fixture);

      expect(radioGroup.nzDisabled).toBeTruthy();
      radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));
      radios[1].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe('A');
    });
  });

  describe('radio group disable form', () => {
    it('expect not to thrown error', () => {
      expect(() => {
        const fixture = TestBed.createComponent(NzTestRadioGroupDisabledFormComponent);
        fixture.detectChanges();
      }).not.toThrow();
    });
  });

  describe('ngModel on the `nz-radio` button', () => {
    it('`onChange` of each `nz-radio` should emit correct values', async () => {
      const fixture = TestBed.createComponent(NzTestRadioGroupLabelNgModelComponent);
      fixture.detectChanges();

      let radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));

      radios[0].nativeElement.click();
      await stabilize(fixture);
      expect(fixture.componentInstance.items).toEqual([
        { label: 'A', checked: true },
        { label: 'B', checked: false },
        { label: 'C', checked: false },
        { label: 'D', checked: false }
      ]);

      radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));
      radios[1].nativeElement.click();
      await stabilize(fixture);
      expect(fixture.componentInstance.items).toEqual([
        { label: 'A', checked: true },
        { label: 'B', checked: true },
        { label: 'C', checked: false },
        { label: 'D', checked: false }
      ]);
    });
  });

  testDirectionality(() => NzTestRadioSingleComponent, By.directive(NzRadioComponent), 'ant-radio-wrapper');
  testDirectionality(() => NzTestRadioButtonComponent, By.directive(NzRadioComponent), 'ant-radio-button-wrapper');
  testDirectionality(() => NzTestRadioGroupComponent, By.directive(NzRadioGroupComponent), 'ant-radio-group');

  describe('finalSize', () => {
    let fixture: ComponentFixture<TestRadioGroupFinalSizeComponent>;
    let radioGroupElement: HTMLElement;
    let component: TestRadioGroupFinalSizeComponent;
    const formSize = signal<NzSizeLDSType | undefined>(undefined);

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [{ provide: NZ_FORM_SIZE, useValue: formSize }]
      });

      fixture = TestBed.createComponent(TestRadioGroupFinalSizeComponent);
      component = fixture.componentInstance;
      radioGroupElement = fixture.debugElement.query(By.directive(NzRadioGroupComponent)).nativeElement;
      fixture.detectChanges();
    });

    it('should prioritize formSize > nzSize', () => {
      component.size.set('default');
      formSize.set('large');
      fixture.detectChanges();
      expect(radioGroupElement.classList).toContain('ant-radio-group-large');

      formSize.set('small');
      fixture.detectChanges();
      expect(radioGroupElement.classList).toContain('ant-radio-group-small');

      formSize.set('default');
      fixture.detectChanges();
      expect(radioGroupElement.classList).not.toContain('ant-radio-group-large');
      expect(radioGroupElement.classList).not.toContain('ant-radio-group-small');
    });
  });
});

async function stabilize<T>(fixture: ComponentFixture<T>, ms?: number): Promise<void> {
  fixture.detectChanges();
  await updateNonSignalsInput(fixture, ms);
  fixture.detectChanges();
}

@Component({
  selector: 'nz-test-radio-single',
  imports: [FormsModule, NzRadioModule],
  template: `
    <label
      nz-radio
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [nzDisabled]="disabled()"
      [nzAutoFocus]="autoFocus()"
    >
      Radio
    </label>
  `
})
export class NzTestRadioSingleComponent {
  @ViewChild(NzRadioComponent, { static: false }) nzRadioComponent!: NzRadioComponent;
  readonly value = signal(false);
  readonly autoFocus = signal(false);
  readonly disabled = signal(false);
  modelChange = vi.fn();
}

@Component({
  imports: [FormsModule, NzRadioModule],
  template: `<label nz-radio-button>Radio</label>`
})
export class NzTestRadioButtonComponent {}

@Component({
  selector: 'nz-test-radio-group',
  imports: [FormsModule, NzRadioModule],
  template: `
    <nz-radio-group
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [nzName]="name()!"
      [nzDisabled]="disabled()"
      [nzSize]="size()"
    >
      <label nz-radio-button nzValue="A">A</label>
      <label nz-radio-button nzValue="B">B</label>
      <label nz-radio-button nzValue="C">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>
  `
})
export class NzTestRadioGroupComponent {
  readonly size = signal<NzSizeLDSType>('default');
  readonly value = signal('A');
  readonly disabled = signal(false);
  readonly name = signal<string | undefined>(undefined);
  modelChange = vi.fn();
}

@Component({
  imports: [ReactiveFormsModule, NzRadioModule],
  template: `
    <form>
      <label nz-radio [formControl]="formControl" [nzDisabled]="disabled()"></label>
    </form>
  `
})
export class NzTestRadioFormComponent {
  formControl = new FormControl(false);

  readonly disabled = signal(false);

  disable(): void {
    this.formControl.disable();
  }

  enable(): void {
    this.formControl.enable();
  }
}

@Component({
  imports: [ReactiveFormsModule, NzRadioModule],
  template: `
    <form>
      <nz-radio-group [formControl]="formControl" [nzDisabled]="nzDisabled()">
        <label nz-radio-button nzValue="A" [nzDisabled]="true">A</label>
        <label nz-radio-button nzValue="B">B</label>
        <label nz-radio-button nzValue="C">C</label>
        <label nz-radio-button nzValue="D">D</label>
      </nz-radio-group>
    </form>
  `
})
export class NzTestRadioGroupFormComponent {
  formControl = new FormControl('B');
  readonly nzDisabled = signal(false);

  disable(): void {
    this.formControl.disable();
  }

  enable(): void {
    this.formControl.enable();
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1543 **/

@Component({
  imports: [FormsModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="value" [nzName]="name()!" [nzDisabled]="disabled()" [nzSize]="size()">
      <label nz-radio-button nzValue="A">A</label>
      <label nz-radio-button nzValue="B">B</label>
      <label nz-radio-button nzValue="C" [nzDisabled]="singleDisabled()">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>
  `
})
export class NzTestRadioGroupDisabledComponent {
  readonly size = signal<NzSizeLDSType>('default');
  readonly value = signal('A');
  readonly disabled = signal(false);
  readonly name = signal<string | undefined>(undefined);
  readonly singleDisabled = signal(false);
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1735 **/
@Component({
  imports: [ReactiveFormsModule, NzRadioModule],
  template: `
    <form>
      <nz-radio-group [formControl]="formControl">
        @for (val of radioValues; track val) {
          <label nz-radio [nzValue]="val">{{ val }}</label>
        }
      </nz-radio-group>
    </form>
  `
})
export class NzTestRadioGroupDisabledFormComponent {
  formControl = new FormControl({ value: 'B', disabled: true });
  radioValues = ['A', 'B', 'C', 'D'];
}

@Component({
  imports: [FormsModule, NzRadioModule],
  template: `
    <nz-radio-group [(ngModel)]="value" nzButtonStyle="solid">
      <label nz-radio-button nzValue="A">A</label>
      <label nz-radio-button nzValue="B">B</label>
      <label nz-radio-button nzValue="C" [nzDisabled]="singleDisabled()">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>
  `
})
export class NzTestRadioGroupSolidComponent {
  value = 'A';
  readonly singleDisabled = signal(false);
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/7254 */
@Component({
  imports: [FormsModule, NzRadioModule],
  template: `
    <nz-radio-group>
      @for (item of items; track item) {
        <label nz-radio [nzValue]="item.label" [(ngModel)]="item.checked">
          {{ item.label }}
        </label>
      }
    </nz-radio-group>
  `
})
export class NzTestRadioGroupLabelNgModelComponent {
  items = [
    {
      label: 'A',
      checked: false
    },
    {
      label: 'B',
      checked: false
    },
    {
      label: 'C',
      checked: false
    },
    {
      label: 'D',
      checked: false
    }
  ];
}

@Component({
  imports: [NzRadioModule],
  selector: 'nz-test-radio-group-final-size',
  template: `<nz-radio-group [nzSize]="size()" />`
})
export class TestRadioGroupFinalSizeComponent {
  readonly size = signal<NzSizeLDSType>('default');
}
