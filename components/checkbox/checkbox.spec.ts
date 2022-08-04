import { BidiModule, Dir } from '@angular/cdk/bidi';
import { ApplicationRef, Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { UntypedFormBuilder, UntypedFormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzCheckboxGroupComponent } from './checkbox-group.component';
import { NzCheckboxWrapperComponent } from './checkbox-wrapper.component';
import { NzCheckboxComponent } from './checkbox.component';
import { NzCheckboxModule } from './checkbox.module';

describe('checkbox', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, NzCheckboxModule, FormsModule, ReactiveFormsModule],
        declarations: [
          NzTestCheckboxSingleComponent,
          NzTestCheckboxGroupComponent,
          NzTestCheckboxFormComponent,
          NzTestCheckboxGroupFormComponent,
          NzTestCheckboxWrapperComponent,
          NzTestCheckboxSingleRtlComponent,
          NzTestCheckboxGroupRtlComponent
        ]
      });
      TestBed.compileComponents();
    })
  );
  describe('checkbox basic', () => {
    let fixture: ComponentFixture<NzTestCheckboxSingleComponent>;
    let testComponent: NzTestCheckboxSingleComponent;
    let checkbox: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCheckboxSingleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      checkbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList.contains('ant-checkbox-wrapper')).toBe(true);
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('ant-checkbox')).toBe(true);
      expect(checkbox.nativeElement.firstElementChild.firstElementChild!.classList.contains('ant-checkbox-input')).toBe(
        true
      );
      expect(checkbox.nativeElement.firstElementChild.lastElementChild.classList.contains('ant-checkbox-inner')).toBe(
        true
      );
      expect(checkbox.nativeElement.lastElementChild.innerText).toBe(' Checkbox');
    });
    it('should click change', () => {
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      checkbox.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('ant-checkbox-checked')).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    });
    it('should click input a11y correct', () => {
      fixture.detectChanges();
      const inputElement = checkbox.nativeElement.querySelector('input');
      expect(testComponent.checked).toBe(false);
      expect(inputElement.checked).toBe(false);
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      inputElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(checkbox.nativeElement.firstElementChild.classList.contains('ant-checkbox-checked')).toBe(true);
      expect(inputElement.checked).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
    });
    it('should ngModel change', fakeAsync(() => {
      testComponent.checked = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('ant-checkbox-checked')).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should disabled work', () => {
      fixture.detectChanges();
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      checkbox.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    });
    it('should indeterminate work', () => {
      fixture.detectChanges();
      testComponent.indeterminate = true;
      fixture.detectChanges();
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('ant-checkbox-indeterminate')).toBe(true);
      testComponent.checked = true;
      fixture.detectChanges();
      expect(checkbox.nativeElement.firstElementChild!.classList.contains('ant-checkbox-indeterminate')).toBe(true);
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
    describe('change detection behavior', () => {
      it('should not run change detection when the `input` is clicked', () => {
        const appRef = TestBed.inject(ApplicationRef);
        const event = new MouseEvent('click');

        spyOn(appRef, 'tick');
        spyOn(event, 'stopPropagation').and.callThrough();

        const nzCheckbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
        nzCheckbox.nativeElement.querySelector('.ant-checkbox-input').dispatchEvent(event);

        expect(appRef.tick).not.toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
      });
      it('should not run change detection when the `nz-checkbox` is clicked and it is disabled', () => {
        testComponent.disabled = true;
        fixture.detectChanges();

        const appRef = TestBed.inject(ApplicationRef);
        const event = new MouseEvent('click');

        spyOn(appRef, 'tick');
        spyOn(event, 'preventDefault').and.callThrough();

        const nzCheckbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
        nzCheckbox.nativeElement.dispatchEvent(event);

        expect(appRef.tick).not.toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
      });
    });
  });
  describe('checkbox group basic', () => {
    let fixture: ComponentFixture<NzTestCheckboxGroupComponent>;
    let testComponent: NzTestCheckboxGroupComponent;
    let checkboxGroup: DebugElement;
    let checkboxs: HTMLElement[];

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
      expect(checkboxs[0].firstElementChild!.classList).toContain('ant-checkbox-checked');
      expect(checkboxs[1].firstElementChild!.classList).toContain('ant-checkbox-disabled');
      expect(checkboxs[1].firstElementChild!.classList).not.toContain('ant-checkbox-checked');
      expect(checkboxs[2].firstElementChild!.classList).not.toContain('ant-checkbox-checked');
    }));
    it('should click correct', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[0].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      expect(checkboxs[0].firstElementChild!.classList).not.toContain('ant-checkbox-checked');
    });
    it('should sub disabled work', () => {
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[1].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      expect(checkboxs[1].firstElementChild!.classList).not.toContain('ant-checkbox-checked');
    });
    it('should all disabled work', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      fixture.detectChanges();
      checkboxs[2].click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
      expect(checkboxs[2].firstElementChild!.classList).not.toContain('ant-checkbox-checked');
    });
    it('should ngModel work', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.options[0].checked = false;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(checkboxs[0].firstElementChild!.classList).not.toContain('ant-checkbox-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
  });
  describe('checkbox form', () => {
    let fixture: ComponentFixture<NzTestCheckboxFormComponent>;
    let testComponent: NzTestCheckboxFormComponent;
    let checkbox: DebugElement;
    let inputElement: HTMLInputElement;

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
      expect(testComponent.formGroup.get('checkbox')!.value).toBe(false);
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('checkbox')!.value).toBe(true);
      testComponent.disable();
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('checkbox')!.value).toBe(true);
    }));
  });
  describe('checkbox group form', () => {
    let fixture: ComponentFixture<NzTestCheckboxGroupFormComponent>;
    let testComponent: NzTestCheckboxGroupFormComponent;
    let checkboxGroup: DebugElement;
    let inputElement: HTMLInputElement;

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
      expect(testComponent.formGroup.get('checkboxGroup')!.valid).toBe(true);
      expect(testComponent.formGroup.get('checkboxGroup')!.pristine).toBe(true);
      expect(testComponent.formGroup.get('checkboxGroup')!.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup')!.value)).toBe(
        JSON.stringify([
          { label: 'Apple', value: 'Apple', checked: true },
          { label: 'Pear', value: 'Pear', disabled: true },
          { label: 'Orange', value: 'Orange' }
        ])
      );
      inputElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup')!.value)).toBe(
        JSON.stringify([
          { label: 'Apple', value: 'Apple', checked: false },
          { label: 'Pear', value: 'Pear', disabled: true },
          { label: 'Orange', value: 'Orange' }
        ])
      );
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(JSON.stringify(testComponent.formGroup.get('checkboxGroup')!.value)).toBe(
        JSON.stringify([
          { label: 'Apple', value: 'Apple', checked: false },
          { label: 'Pear', value: 'Pear', disabled: true },
          { label: 'Orange', value: 'Orange' }
        ])
      );
    }));
  });
  describe('checkbox wrapper', () => {
    let fixture: ComponentFixture<NzTestCheckboxWrapperComponent>;
    let testComponent: NzTestCheckboxWrapperComponent;
    let checkboxWrapper: DebugElement;
    let inputElement: HTMLInputElement;

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
      expect(checkboxWrapper.nativeElement.classList).toContain('ant-checkbox-group');
    }));
    it('should onChange correct', fakeAsync(() => {
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.onChange).toHaveBeenCalledWith([]);
      expect(testComponent.onChange).toHaveBeenCalledTimes(1);
    }));
  });
  describe('RTL', () => {
    it('should single checkbox className correct on dir change', () => {
      const fixture = TestBed.createComponent(NzTestCheckboxSingleRtlComponent);
      const checkbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList).toContain('ant-checkbox-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList).not.toContain('ant-checkbox-rtl');
    });

    it('should group checkbox className correct on dir change', () => {
      const fixture = TestBed.createComponent(NzTestCheckboxGroupRtlComponent);
      const checkbox = fixture.debugElement.query(By.directive(NzCheckboxGroupComponent));
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList).toContain('ant-checkbox-group-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(checkbox.nativeElement.classList).not.toContain('ant-checkbox-group-rtl');
    });
  });
});

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-single-checkbox',
  template: `
    <label
      nz-checkbox
      [nzDisabled]="disabled"
      [(ngModel)]="checked"
      [nzAutoFocus]="autoFocus"
      [nzIndeterminate]="indeterminate"
      (ngModelChange)="modelChange($event)"
    >
      Checkbox
    </label>
  `
})
export class NzTestCheckboxSingleComponent {
  @ViewChild(NzCheckboxComponent, { static: false }) nzCheckboxComponent!: NzCheckboxComponent;
  disabled = false;
  autoFocus = false;
  checked = false;
  indeterminate = false;
  modelChange = jasmine.createSpy('change callback');
}

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-group-checkbox',
  template: `
    <nz-checkbox-group
      [nzDisabled]="disabled"
      [ngModel]="options"
      (ngModelChange)="modelChange($event)"
    ></nz-checkbox-group>
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
  template: `
    <form [formGroup]="formGroup">
      <label nz-checkbox formControlName="checkbox"></label>
    </form>
  `
})
export class NzTestCheckboxFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      checkbox: [false]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <nz-checkbox-group formControlName="checkboxGroup"></nz-checkbox-group>
    </form>
  `
})
export class NzTestCheckboxGroupFormComponent {
  formGroup: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      checkboxGroup: [
        [
          { label: 'Apple', value: 'Apple', checked: true },
          { label: 'Pear', value: 'Pear', disabled: true },
          { label: 'Orange', value: 'Orange' }
        ]
      ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-test-single-checkbox></nz-test-single-checkbox>
    </div>
  `
})
export class NzTestCheckboxSingleRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-test-group-checkbox></nz-test-group-checkbox>
    </div>
  `
})
export class NzTestCheckboxGroupRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
