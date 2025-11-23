/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { ApplicationRef, Component, DebugElement, provideZoneChangeDetection, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { createMouseEvent } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

import { NzRadioGroupComponent } from './radio-group.component';
import { NzRadioComponent } from './radio.component';
import { NzRadioModule } from './radio.module';

describe('radio', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
  });

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

    it('should click work', fakeAsync(() => {
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-checked');
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-checked');
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));

    it('should disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-checked');
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));

    it('should not run change detection if the radio is disabled', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      const appRef = TestBed.inject(ApplicationRef);
      spyOn(appRef, 'tick');
      const event = createMouseEvent('click');
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');
      radio.nativeElement.dispatchEvent(event);
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
      expect(appRef.tick).not.toHaveBeenCalled();
    }));

    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')).toBe(null);
    });

    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input') === document.activeElement).toBe(false);
      testComponent.nzRadioComponent.focus();
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input') === document.activeElement).toBe(true);
      testComponent.nzRadioComponent.blur();
      fixture.detectChanges();
      expect(radio.nativeElement.querySelector('input') === document.activeElement).toBe(false);
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

    it('should click work', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[0].nativeElement.firstElementChild!.classList).not.toContain('ant-radio-button-checked');
      expect(radios[1].nativeElement.firstElementChild!.classList).toContain('ant-radio-button-checked');
      expect(testComponent.value).toBe('B');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe('B');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));

    it('should disable work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[1].nativeElement.firstElementChild!.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));

    it('should name work', fakeAsync(() => {
      testComponent.name = 'test';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(radios.every(radio => radio.nativeElement.querySelector('input').name === 'test')).toBe(true);
    }));
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

    it('should group disable work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[1].nativeElement.firstElementChild!.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value).toBe('A');
    }));

    it('should single disable work', fakeAsync(() => {
      testComponent.disabled = false;
      fixture.detectChanges();
      testComponent.singleDisabled = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      radios[2].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[2].nativeElement.firstElementChild!.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value).toBe('A');
    }));
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

    it('should be in pristine, untouched, and valid states and enable initially', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      const radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      const inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeFalsy();
      expect(testComponent.formControl.valid).toBe(true);
      expect(testComponent.formControl.pristine).toBe(true);
      expect(testComponent.formControl.touched).toBe(false);
    }));

    it('should be disable if form is disable and nzDisable set to false initially', fakeAsync(() => {
      testComponent.formControl.disable();
      fixture.detectChanges();
      flush();
      const radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      const inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeTruthy();
    }));

    it('should set disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      flush();
      const radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      const inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeTruthy();
      expect(testComponent.formControl.value).toBe(false);
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(false);

      testComponent.enable();
      fixture.detectChanges();
      flush();
      expect(radio.nativeElement.firstElementChild!.classList).not.toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeFalsy();
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(true);

      testComponent.disable();
      fixture.detectChanges();
      flush();
      expect(radio.nativeElement.firstElementChild!.classList).toContain('ant-radio-disabled');
      expect(inputElement.disabled).toBeTruthy();
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(true);
    }));
  });

  describe('radio group form', () => {
    let fixture: ComponentFixture<NzTestRadioGroupFormComponent>;
    let testComponent: NzTestRadioGroupFormComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupFormComponent);
      testComponent = fixture.componentInstance;
    }));

    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      fixture.detectChanges();
      flush();
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
    }));

    it('should be disable if form is disable and nzDisable set to false initially', fakeAsync(() => {
      testComponent.formControl.disable();
      fixture.detectChanges();
      flush();
      const radioGroup: NzRadioGroupComponent = fixture.debugElement.query(
        By.directive(NzRadioGroupComponent)
      ).componentInstance;
      expect(radioGroup.nzDisabled).toBeTruthy();
    }));

    it('should set disabled work', fakeAsync(() => {
      testComponent.nzDisabled = true;
      fixture.detectChanges();
      flush();
      const radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));
      const radioGroup: NzRadioGroupComponent = fixture.debugElement.query(
        By.directive(NzRadioGroupComponent)
      ).componentInstance;
      expect(radioGroup.nzDisabled).toBeTruthy();
      radios[0].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe('B');

      testComponent.enable();
      fixture.detectChanges();
      flush();

      expect(radioGroup.nzDisabled).toBeFalsy();
      radios[0].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe('A');

      testComponent.disable();
      fixture.detectChanges();
      flush();

      expect(radioGroup.nzDisabled).toBeTruthy();
      radios[1].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe('A');
    }));
  });

  describe('radio group disable form', () => {
    it('expect not to thrown error', fakeAsync(() => {
      expect(() => {
        const fixture = TestBed.createComponent(NzTestRadioGroupDisabledFormComponent);
        fixture.detectChanges();
      }).not.toThrow();
    }));
  });

  describe('ngModel on the `nz-radio` button', () => {
    it('`onChange` of each `nz-radio` should emit correct values', () => {
      const fixture = TestBed.createComponent(NzTestRadioGroupLabelNgModelComponent);
      fixture.detectChanges();

      const radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));

      radios[0].nativeElement.click();
      expect(fixture.componentInstance.items).toEqual([
        { label: 'A', checked: true },
        { label: 'B', checked: false },
        { label: 'C', checked: false },
        { label: 'D', checked: false }
      ]);

      radios[1].nativeElement.click();
      expect(fixture.componentInstance.items).toEqual([
        { label: 'A', checked: false },
        { label: 'B', checked: true },
        { label: 'C', checked: false },
        { label: 'D', checked: false }
      ]);
    });
  });

  describe('RTL', () => {
    it('should single radio className correct', () => {
      const fixture = TestBed.createComponent(NzTestRadioSingleRtlComponent);
      const radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      fixture.detectChanges();
      expect(radio.nativeElement.className).toContain('ant-radio-wrapper-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(radio.nativeElement.className).not.toContain('ant-radio-wrapper-rtl');
    });

    it('should radio button className correct', () => {
      const fixture = TestBed.createComponent(NzTestRadioButtonRtlComponent);
      const radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      fixture.detectChanges();
      expect(radio.nativeElement.className).toContain('ant-radio-button-wrapper-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(radio.nativeElement.className).not.toContain('ant-radio-button-wrapper-rtl');
    });

    it('should radio group className correct', () => {
      const fixture = TestBed.createComponent(NzTestRadioGroupRtlComponent);
      const radioGroup = fixture.debugElement.query(By.directive(NzRadioGroupComponent));
      fixture.detectChanges();
      expect(radioGroup.nativeElement.classList).toContain('ant-radio-group-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(radioGroup.nativeElement.className).not.toContain('ant-radio-group-rtl');
    });
  });
});

@Component({
  selector: 'nz-test-radio-single',
  imports: [FormsModule, NzRadioModule],
  template: `
    <label
      nz-radio
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [nzDisabled]="disabled"
      [nzAutoFocus]="autoFocus"
    >
      Radio
    </label>
  `
})
export class NzTestRadioSingleComponent {
  @ViewChild(NzRadioComponent, { static: false }) nzRadioComponent!: NzRadioComponent;
  value = false;
  autoFocus = false;
  disabled = false;
  modelChange = jasmine.createSpy('change callback');
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
      [nzName]="name"
      [nzDisabled]="disabled"
      (ngModelChange)="modelChange($event)"
      [nzSize]="size"
    >
      <label nz-radio-button nzValue="A">A</label>
      <label nz-radio-button nzValue="B">B</label>
      <label nz-radio-button nzValue="C">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>
  `
})
export class NzTestRadioGroupComponent {
  size: NzSizeLDSType = 'default';
  value = 'A';
  disabled = false;
  name!: string;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  imports: [ReactiveFormsModule, NzRadioModule],
  template: `
    <form>
      <label nz-radio [formControl]="formControl" [nzDisabled]="disabled"></label>
    </form>
  `
})
export class NzTestRadioFormComponent {
  formControl = new FormControl(false);

  disabled = false;

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
      <nz-radio-group [formControl]="formControl" [nzDisabled]="nzDisabled">
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
  nzDisabled = false;

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
    <nz-radio-group [(ngModel)]="value" [nzName]="name" [nzDisabled]="disabled" [nzSize]="size">
      <label nz-radio-button nzValue="A">A</label>
      <label nz-radio-button nzValue="B">B</label>
      <label nz-radio-button nzValue="C" [nzDisabled]="singleDisabled">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>
  `
})
export class NzTestRadioGroupDisabledComponent {
  size: NzSizeLDSType = 'default';
  value = 'A';
  disabled = false;
  name!: string;
  singleDisabled = false;
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
      <label nz-radio-button nzValue="C" [nzDisabled]="singleDisabled">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>
  `
})
export class NzTestRadioGroupSolidComponent {
  value = 'A';
  singleDisabled = false;
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
  imports: [BidiModule, NzTestRadioSingleComponent],
  template: `
    <div [dir]="direction">
      <nz-test-radio-single></nz-test-radio-single>
    </div>
  `
})
export class NzTestRadioSingleRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}

@Component({
  imports: [BidiModule, NzRadioModule],
  template: `
    <div [dir]="direction">
      <label nz-radio-button>Radio</label>
    </div>
  `
})
export class NzTestRadioButtonRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}

@Component({
  imports: [BidiModule, NzTestRadioGroupComponent],
  template: `
    <div [dir]="direction">
      <nz-test-radio-group></nz-test-radio-group>
    </div>
  `
})
export class NzTestRadioGroupRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}
