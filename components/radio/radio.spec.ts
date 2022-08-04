import { BidiModule, Dir } from '@angular/cdk/bidi';
import { ApplicationRef, Component, DebugElement, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { createMouseEvent } from 'ng-zorro-antd/core/testing';

import { NzRadioGroupComponent } from './radio-group.component';
import { NzRadioComponent } from './radio.component';
import { NzRadioModule } from './radio.module';

describe('radio', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, NzRadioModule, FormsModule, ReactiveFormsModule],
        declarations: [
          NzTestRadioSingleComponent,
          NzTestRadioButtonComponent,
          NzTestRadioGroupComponent,
          NzTestRadioFormComponent,
          NzTestRadioGroupFormComponent,
          NzTestRadioGroupDisabledComponent,
          NzTestRadioGroupDisabledFormComponent,
          NzTestRadioGroupLabelNgModelComponent,
          NzTestRadioSingleRtlComponent,
          NzTestRadioGroupRtlComponent,
          NzTestRadioButtonRtlComponent
        ]
      });
      TestBed.compileComponents();
    })
  );
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
      it('should support solid css', () => {
        fixture.detectChanges();
        expect(radioGroup.nativeElement.classList).toContain('ant-radio-group-solid');
      });
    });
  });
  describe('radio form', () => {
    let fixture: ComponentFixture<NzTestRadioFormComponent>;
    let testComponent: NzTestRadioFormComponent;
    let radio: DebugElement;
    let inputElement: HTMLElement;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestRadioFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(NzRadioComponent));
      inputElement = radio.nativeElement.querySelector('input') as HTMLInputElement;
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('radio')!.value).toBe(false);
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radio')!.value).toBe(true);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('radio')!.setValue(false);
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radio')!.value).toBe(false);
    }));
  });
  describe('radio group form', () => {
    let fixture: ComponentFixture<NzTestRadioGroupFormComponent>;
    let testComponent: NzTestRadioGroupFormComponent;
    let radios: DebugElement[];

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(NzRadioComponent));
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('radioGroup')!.value).toBe('B');
      radios[0].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radioGroup')!.value).toBe('A');
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      radios[1].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radioGroup')!.value).toBe('A');
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
  // eslint-disable-next-line
  selector: 'nz-test-radio-single',
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
  template: ` <label nz-radio-button>Radio</label> `
})
export class NzTestRadioButtonComponent {}

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-radio-group',
  template: `
    <nz-radio-group
      [(ngModel)]="value"
      [nzName]="name"
      [nzDisabled]="disabled"
      (ngModelChange)="modelChange($event)"
      [nzSize]="size"
    >
      <ng-container [ngClass]>
        <label nz-radio-button nzValue="A">A</label>
        <label nz-radio-button nzValue="B">B</label>
        <label nz-radio-button nzValue="C">C</label>
        <label nz-radio-button nzValue="D">D</label>
      </ng-container>
    </nz-radio-group>
  `
})
export class NzTestRadioGroupComponent {
  size = 'default';
  value = 'A';
  disabled = false;
  name?: string;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <label nz-radio formControlName="radio"></label>
    </form>
  `
})
export class NzTestRadioFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      radio: [false]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <nz-radio-group formControlName="radioGroup">
        <label nz-radio-button nzValue="A">A</label>
        <label nz-radio-button nzValue="B">B</label>
        <label nz-radio-button nzValue="C">C</label>
        <label nz-radio-button nzValue="D">D</label>
      </nz-radio-group>
    </form>
  `
})
export class NzTestRadioGroupFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      radioGroup: ['B']
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1543 **/
/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1734 **/

@Component({
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
  size = 'default';
  value = 'A';
  disabled = false;
  name?: string;
  singleDisabled = false;
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1735 **/
@Component({
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-radio-group formControlName="radio">
        <label nz-radio *ngFor="let val of radioValues" [nzValue]="val">{{ val }}</label>
      </nz-radio-group>
    </form>
  `
})
export class NzTestRadioGroupDisabledFormComponent implements OnInit {
  validateForm?: UntypedFormGroup;
  radioValues = ['A', 'B', 'C', 'D'];

  constructor(private fb: UntypedFormBuilder) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      radio: [{ value: 'B', disabled: true }]
    });
  }
}

@Component({
  template: `
    <nz-radio-group [(ngModel)]="value" [nzButtonStyle]="'solid'">
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
  template: `
    <nz-radio-group>
      <label nz-radio *ngFor="let item of items" [nzValue]="item.label" [(ngModel)]="item.checked">
        {{ item.label }}
      </label>
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
  template: `
    <div [dir]="direction">
      <nz-test-radio-single></nz-test-radio-single>
    </div>
  `
})
export class NzTestRadioSingleRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

@Component({
  template: `
    <div [dir]="direction">
      <label nz-radio-button>Radio</label>
    </div>
  `
})
export class NzTestRadioButtonRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-test-radio-group></nz-test-radio-group>
    </div>
  `
})
export class NzTestRadioGroupRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
