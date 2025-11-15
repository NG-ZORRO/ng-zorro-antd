/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { ApplicationRef, Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzCheckboxComponent } from './checkbox.component';
import { NzCheckboxModule } from './checkbox.module';

describe('checkbox', () => {
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

  describe('checkbox form', () => {
    let fixture: ComponentFixture<NzTestCheckboxFormComponent>;
    let testComponent: NzTestCheckboxFormComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCheckboxFormComponent);
      testComponent = fixture.componentInstance;
    });
    it('should be in pristine, untouched, and valid states and enable initially', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      const checkbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
      const inputElement = checkbox.nativeElement.querySelector('input') as HTMLInputElement;
      expect(checkbox.nativeElement.firstElementChild!.classList).not.toContain('ant-checkbox-disabled');
      expect(inputElement.disabled).toBeFalsy();
      expect(testComponent.formControl.valid).toBe(true);
      expect(testComponent.formControl.pristine).toBe(true);
      expect(testComponent.formControl.touched).toBe(false);
    }));
    it('should be disable if form is disable and nzDisable set to false', fakeAsync(() => {
      testComponent.disable();
      fixture.detectChanges();
      flush();
      const checkbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
      const inputElement = checkbox.nativeElement.querySelector('input') as HTMLInputElement;
      expect(checkbox.nativeElement.firstElementChild!.classList).toContain('ant-checkbox-disabled');
      expect(inputElement.disabled).toBeTruthy();
    }));
    it('should set disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      flush();
      const checkbox = fixture.debugElement.query(By.directive(NzCheckboxComponent));
      const inputElement = checkbox.nativeElement.querySelector('input') as HTMLInputElement;

      expect(checkbox.nativeElement.firstElementChild!.classList).toContain('ant-checkbox-disabled');
      expect(inputElement.disabled).toBeTruthy();
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(false);

      testComponent.enable();
      fixture.detectChanges();
      flush();
      expect(checkbox.nativeElement.firstElementChild!.classList).not.toContain('ant-checkbox-disabled');
      expect(inputElement.disabled).toBeFalsy();
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(true);

      testComponent.disable();
      fixture.detectChanges();
      flush();
      expect(checkbox.nativeElement.firstElementChild!.classList).toContain('ant-checkbox-disabled');
      expect(inputElement.disabled).toBeTruthy();
      inputElement.click();
      flush();
      fixture.detectChanges();
      expect(testComponent.formControl.value).toBe(true);
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
  });
});

@Component({
  imports: [FormsModule, NzCheckboxModule],
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
  imports: [ReactiveFormsModule, NzCheckboxModule],
  template: `
    <form>
      <label nz-checkbox [formControl]="formControl" [nzDisabled]="disabled"></label>
    </form>
  `
})
export class NzTestCheckboxFormComponent {
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
  imports: [BidiModule, NzTestCheckboxSingleComponent],
  template: `
    <div [dir]="direction">
      <nz-test-single-checkbox></nz-test-single-checkbox>
    </div>
  `
})
export class NzTestCheckboxSingleRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}

describe('checkbox component', () => {
  let fixture: ComponentFixture<NzCheckboxComponent>;
  let component: NzCheckboxComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(NzCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('focus should be called in afterViewInit if nzAutoFocus is set', () => {
    spyOn(component, 'focus');
    component.nzAutoFocus = false;
    component.ngAfterViewInit();
    expect(component.focus).not.toHaveBeenCalled();

    spyOn(component, 'focus');
    component.nzAutoFocus = true;
    component.ngAfterViewInit();
    expect(component.focus).toHaveBeenCalled();
  });
});
