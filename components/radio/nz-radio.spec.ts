import { Component, OnInit, ViewChild } from '@angular/core';
import { fakeAsync, flush, tick, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzRadioButtonComponent } from './nz-radio-button.component';
import { NzRadioGroupComponent } from './nz-radio-group.component';
import { NzRadioComponent } from './nz-radio.component';
import { NzRadioModule } from './nz-radio.module';

describe('radio', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzRadioModule, FormsModule, ReactiveFormsModule ],
      declarations: [ NzTestRadioSingleComponent, NzTestRadioButtonComponent, NzTestRadioGroupComponent, NzTestRadioFormComponent, NzTestRadioGroupFormComponent, NzTestRadioGroupDisabledComponent, NzTestRadioGroupDisabledFormComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('single radio basic', () => {
    let fixture;
    let testComponent;
    let radio;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioSingleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(NzRadioComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(radio.nativeElement.classList).toContain('ant-radio-wrapper');
      expect(radio.nativeElement.firstElementChild.classList).toContain('ant-radio');
      expect(radio.nativeElement.firstElementChild.lastElementChild.classList).toContain('ant-radio-inner');
    });
    it('should click work', fakeAsync(() => {
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild.classList).not.toContain('ant-radio-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild.classList).toContain('ant-radio-checked');
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild.classList).toContain('ant-radio-checked');
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    }));
    it('should disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild.classList).not.toContain('ant-radio-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      radio.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radio.nativeElement.firstElementChild.classList).not.toContain('ant-radio-checked');
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
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
    let fixture;
    let testComponent;
    let radio;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioButtonComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radio = fixture.debugElement.query(By.directive(NzRadioButtonComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(radio.nativeElement.classList).toContain('ant-radio-button-wrapper');
      expect(radio.nativeElement.firstElementChild.classList).toContain('ant-radio-button');
      expect(radio.nativeElement.firstElementChild.lastElementChild.classList).toContain('ant-radio-button-inner');
    });
  });
  describe('radio group', () => {
    let fixture;
    let testComponent;
    let radios;
    let radioGroup;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(NzRadioButtonComponent));
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
      radios[ 1 ].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[ 0 ].nativeElement.firstElementChild.classList).not.toContain('ant-radio-button-checked');
      expect(radios[ 1 ].nativeElement.firstElementChild.classList).toContain('ant-radio-button-checked');
      expect(testComponent.value).toBe('B');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      radios[ 1 ].nativeElement.click();
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
      radios[ 1 ].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[ 1 ].nativeElement.firstElementChild.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value).toBe('A');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should name work', () => {
      testComponent.name = 'test';
      fixture.detectChanges();
      expect(radios.every(radio => radio.nativeElement.querySelector('input').name === 'test')).toBe(true);
    });
  });
  describe('radio group disabled', () => {
    let fixture;
    let testComponent;
    let radios;
    let radioGroup;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupDisabledComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(NzRadioButtonComponent));
      radioGroup = fixture.debugElement.query(By.directive(NzRadioGroupComponent));
    });
    it('should group disable work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      radios[ 1 ].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[ 1 ].nativeElement.firstElementChild.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value).toBe('A');
    }));
    it('should single disable work', fakeAsync(() => {
      testComponent.disabled = false;
      fixture.detectChanges();
      testComponent.singleDisabled = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe('A');
      radios[ 2 ].nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(radios[ 2 ].nativeElement.firstElementChild.classList).not.toContain('ant-radio-button-checked');
      expect(testComponent.value).toBe('A');
    }));
  });
  describe('radio group solid', () => {
    let fixture;
    let radioGroup;
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
    let fixture;
    let testComponent;
    let radio;
    let inputElement;
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
      expect(testComponent.formGroup.get('radio').value).toBe(false);
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radio').value).toBe(true);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('radio').setValue(false);
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radio').value).toBe(false);
    }));
  });
  describe('radio group form', () => {
    let fixture;
    let testComponent;
    let radios;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestRadioGroupFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      radios = fixture.debugElement.queryAll(By.directive(NzRadioButtonComponent));
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('radioGroup').value).toBe('B');
      radios[ 0 ].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radioGroup').value).toBe('A');
      testComponent.disable();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      radios[ 1 ].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('radioGroup').value).toBe('A');
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
});

@Component({
  selector: 'nz-test-radio-single',
  template: `
    <label nz-radio [(ngModel)]="value" (ngModelChange)="modelChange($event)" [nzDisabled]="disabled" [nzAutoFocus]="autoFocus">Radio</label>`
})
export class NzTestRadioSingleComponent {
  @ViewChild(NzRadioComponent) nzRadioComponent: NzRadioComponent;
  value = false;
  autoFocus = false;
  disabled = false;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  selector: 'nz-test-radio-button',
  template: `
    <label nz-radio-button>Radio</label>`
})
export class NzTestRadioButtonComponent {
}

@Component({
  selector: 'nz-test-radio-group',
  template: `
    <nz-radio-group [(ngModel)]="value" [nzName]="name" [nzDisabled]="disabled" (ngModelChange)="modelChange($event)" [nzSize]="size">
      <label nz-radio-button nzValue="A">A</label>
      <label nz-radio-button nzValue="B">B</label>
      <label nz-radio-button nzValue="C">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>`
})

export class NzTestRadioGroupComponent {
  size = 'default';
  value = 'A';
  disabled = false;
  name: string;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  selector: 'nz-test-radio-form',
  template: `
    <form [formGroup]="formGroup">
      <label nz-radio formControlName="radio"></label>
    </form>
  `
})
export class NzTestRadioFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      radio: [ false ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  selector: 'nz-test-radio-group-form',
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
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      radioGroup: [ 'B' ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1543 **/
/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1734 **/

@Component({
  selector: 'nz-test-radio-group-disabled',
  template: `
    <nz-radio-group [(ngModel)]="value" [nzName]="name" [nzDisabled]="disabled" [nzSize]="size">
      <label nz-radio-button nzValue="A">A</label>
      <label nz-radio-button nzValue="B">B</label>
      <label nz-radio-button nzValue="C" [nzDisabled]="singleDisabled">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>`
})

export class NzTestRadioGroupDisabledComponent {
  size = 'default';
  value = 'A';
  disabled = false;
  name: string;
  singleDisabled = false;
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1735 **/
@Component({
  selector: 'nz-test-radio-group-disabled-form',
  template: `
    <form nz-form [formGroup]="validateForm">
      <nz-radio-group formControlName="radio">
        <label nz-radio *ngFor="let val of radioValues" [nzValue]="val">{{val}}</label>
      </nz-radio-group>
    </form>`
})
export class NzTestRadioGroupDisabledFormComponent implements OnInit {
  validateForm: FormGroup;
  radioValues = [ 'A', 'B', 'C', 'D' ];

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      radio: [ { value: 'B', disabled: true } ]
    });
  }
}

@Component({
  selector: 'nz-test-radui-group-solid',
  template: `
    <nz-radio-group [(ngModel)]="value" [nzButtonStyle]="'solid'">
      <label nz-radio-button nzValue="A">A</label>
      <label nz-radio-button nzValue="B">B</label>
      <label nz-radio-button nzValue="C" [nzDisabled]="singleDisabled">C</label>
      <label nz-radio-button nzValue="D">D</label>
    </nz-radio-group>`
})
export class NzTestRadioGroupSolidComponent {
  value = 'A';
  singleDisabled = false;
}
