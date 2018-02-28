import { Component, ViewChild } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzCheckboxGroupComponent } from './nz-checkbox-group.component';
import { NzCheckboxWrapperComponent } from './nz-checkbox-wrapper.component';
import { NzCheckboxComponent } from './nz-checkbox.component';
import { NzCheckboxModule } from './nz-checkbox.module';

describe('checkbox', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzCheckboxModule, FormsModule, ReactiveFormsModule ],
      declarations: [ NzTestCheckboxSingleComponent, NzTestCheckboxGroupComponent, NzTestCheckboxFormComponent, NzTestCheckboxGroupFormComponent, NzTestCheckboxWrapperComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('checkbox basic', () => {
    let fixture;
    let testComponent;
    let checkbox;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCheckboxSingleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList.contains('ant-checkbox-wrapper')).toBe(true);
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox')).toBe(true);
      expect(checkbox.nativeElement.firstElementChild.firstElementChild.classList.contains('ant-checkbox-input')).toBe(true);
      expect(checkbox.nativeElement.firstElementChild.lastElementChild.classList.contains('ant-checkbox-inner')).toBe(true);
      expect(checkbox.nativeElement.lastElementChild.innerText).toBe('Checkbox');
    });
    it('should click change', () => {
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      checkbox.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-checked')).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    });
    it('should ngModel change', fakeAsync(() => {
      testComponent.checked = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-checked')).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should disabled work', () => {
      fixture.detectChanges();
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      checkbox.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    });
    it('should indeterminate work', () => {
      fixture.detectChanges();
      testComponent.indeterminate = true;
      fixture.detectChanges();
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-indeterminate')).toBe(true);
      testComponent.checked = true;
      fixture.detectChanges();
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-indeterminate')).toBe(true);
    });
    it('should autofocus work', () => {
      fixture.detectChanges();
      testComponent.autoFocus = true;
      fixture.detectChanges();
      expect(checkbox.nativeElement.querySelector('input').attributes.getNamedItem('autofocus').name).toBe('autofocus');
      testComponent.autoFocus = false;
      fixture.detectChanges();
      expect(checkbox.nativeElement.querySelector('input').attributes.getNamedItem('autofocus')).toBe(null);
    });
    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(checkbox.nativeElement.querySelector('input') === document.activeElement).toBe(false);
      testComponent.nzCheckboxComponent.focus();
      fixture.detectChanges();
      expect(checkbox.nativeElement.querySelector('input') === document.activeElement).toBe(true);
      testComponent.nzCheckboxComponent.blur();
      fixture.detectChanges();
      expect(checkbox.nativeElement.querySelector('input') === document.activeElement).toBe(false);
    });
  });
  describe('checkbox group basic', () => {
    let fixture;
    let testComponent;
    let checkboxGroup;
    let checkboxs;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestCheckboxGroupComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkboxGroup = fixture.debugElement.query(By.directive(NzCheckboxGroupComponent));
      checkboxs = checkboxGroup.nativeElement.children;
    }));
    it('should className correct', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(checkboxGroup.nativeElement.classList).toContain('ant-checkbox-group');
      expect(checkboxs[ 0 ].firstElementChild.classList).toContain('ant-checkbox-checked');
      expect(checkboxs[ 1 ].firstElementChild.classList).toContain('ant-checkbox-disabled');
      expect(checkboxs[ 1 ].firstElementChild.classList).not.toContain('ant-checkbox-checked');
      expect(checkboxs[ 2 ].firstElementChild.classList).not.toContain('ant-checkbox-checked');
    }));
    it('should click correct', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[ 0 ].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      expect(checkboxs[ 0 ].firstElementChild.classList).not.toContain('ant-checkbox-checked');
    });
    it('should sub disabled work', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[ 1 ].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      expect(checkboxs[ 1 ].firstElementChild.classList).not.toContain('ant-checkbox-checked');
    });
    it('should all disabled work', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[ 2 ].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      expect(checkboxs[ 2 ].firstElementChild.classList).not.toContain('ant-checkbox-checked');
    });
    it('should ngModel work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.options[ 0 ].checked = false;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(checkboxs[ 0 ].firstElementChild.classList).not.toContain('ant-checkbox-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
  });
  describe('checkbox form', () => {
    let fixture;
    let testComponent;
    let checkbox;
    let inputElement;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestCheckboxFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
      inputElement = checkbox.nativeElement.querySelector('input') as HTMLInputElement;
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('checkbox').value).toBe(false);
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('checkbox').value).toBe(true);
      testComponent.disable();
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('checkbox').value).toBe(true);
    }));
  });
  describe('checkbox group form', () => {
    let fixture;
    let testComponent;
    let checkboxGroup;
    let inputElement;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestCheckboxGroupFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkboxGroup = fixture.debugElement.query(By.directive(NzCheckboxGroupComponent));
      inputElement = checkboxGroup.nativeElement.querySelector('input') as HTMLInputElement;
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('checkboxGroup').valid).toBe(true);
      expect(testComponent.formGroup.get('checkboxGroup').pristine).toBe(true);
      expect(testComponent.formGroup.get('checkboxGroup').touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup').value)).toBe(JSON.stringify([
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear', disabled: true },
        { label: 'Orange', value: 'Orange' }
      ]));
      inputElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup').value)).toBe(JSON.stringify([
        { label: 'Apple', value: 'Apple', checked: false },
        { label: 'Pear', value: 'Pear', disabled: true },
        { label: 'Orange', value: 'Orange' }
      ]));
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      inputElement.click();
      fixture.detectChanges();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup').value)).toBe(JSON.stringify([
        { label: 'Apple', value: 'Apple', checked: false },
        { label: 'Pear', value: 'Pear', disabled: true },
        { label: 'Orange', value: 'Orange' }
      ]));
    }));
  });
  describe('checkbox wrapper', () => {
    let fixture;
    let testComponent;
    let checkboxWrapper;
    let inputElement;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestCheckboxWrapperComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkboxWrapper = fixture.debugElement.query(By.directive(NzCheckboxWrapperComponent));
      inputElement = checkboxWrapper.nativeElement.querySelector('input') as HTMLInputElement;
    }));
    it('should className correct', fakeAsync(() => {
      expect(checkboxWrapper.nativeElement.firstElementChild.classList).toContain('ant-checkbox-group');
    }));
    it('should onChange correct', fakeAsync(() => {
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.onChange).toHaveBeenCalledWith([]);
      expect(testComponent.onChange).toHaveBeenCalledTimes(1);
    }));
  });
});

@Component({
  selector: 'nz-test-checkbox-single',
  template: `
    <label nz-checkbox [nzDisabled]="disabled" [(ngModel)]="checked" [nzAutoFocus]="autoFocus" [nzIndeterminate]="indeterminate" (ngModelChange)="modelChange($event)">Checkbox</label>`
})
export class NzTestCheckboxSingleComponent {
  @ViewChild(NzCheckboxComponent) nzCheckboxComponent: NzCheckboxComponent;
  disabled = false;
  autoFocus = false;
  checked = false;
  indeterminate = false;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  selector: 'nz-test-checkbox-group',
  template: `
    <nz-checkbox-group [nzDisabled]="disabled" [ngModel]="options" (ngModelChange)="modelChange($event)"></nz-checkbox-group>
  `
})
export class NzTestCheckboxGroupComponent {
  options = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', disabled: true },
    { label: 'Orange', value: 'Orange' }
  ];
  disabled = false;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  selector: 'nz-test-checkbox-wrapper',
  template: `
    <nz-checkbox-wrapper (nzOnChange)="onChange($event)">
      <div><label nz-checkbox nzValue="A" [ngModel]="true">A</label></div>
      <div><label nz-checkbox nzValue="B">B</label></div>
      <div><label nz-checkbox nzValue="C">C</label></div>
      <div><label nz-checkbox nzValue="D">D</label></div>
      <div><label nz-checkbox nzValue="E">E</label></div>
    </nz-checkbox-wrapper>
  `
})
export class NzTestCheckboxWrapperComponent {
  onChange = jasmine.createSpy('change callback');
}

@Component({
  selector: 'nz-test-checkbox-form',
  template: `
    <form [formGroup]="formGroup">
      <label nz-checkbox formControlName="checkbox"></label>
    </form>
  `
})
export class NzTestCheckboxFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      checkbox: [ false ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  selector: 'nz-test-checkbox-group-form',
  template: `
    <form [formGroup]="formGroup">
      <nz-checkbox-group formControlName="checkboxGroup"></nz-checkbox-group>
    </form>
  `
})
export class NzTestCheckboxGroupFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      checkboxGroup: [ [
        { label: 'Apple', value: 'Apple', checked: true },
        { label: 'Pear', value: 'Pear', disabled: true },
        { label: 'Orange', value: 'Orange' }
      ] ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}
