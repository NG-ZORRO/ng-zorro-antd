import { Component, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../core/testing';
import { NzIconModule } from '../icon/nz-icon.module';

import { NzSwitchComponent } from './nz-switch.component';
import { NzSwitchModule } from './nz-switch.module';

describe('switch', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzSwitchModule, FormsModule, ReactiveFormsModule, NzIconModule ],
      declarations: [ NzTestSwitchBasicComponent, NzTestSwitchFormComponent, NzTestSwitchTemplateComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic switch', () => {
    let fixture;
    let testComponent;
    let switchElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSwitchBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.classList).toContain('ant-switch');
    });
    it('should ngModel work', fakeAsync(() => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.classList).not.toContain('ant-switch-checked');
      expect(testComponent.value).toBe(false);
      testComponent.value = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.classList).toContain('ant-switch-checked');
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should click work', fakeAsync(() => {
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      testComponent.control = true;
      fixture.detectChanges();
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
    }));
    it('should disable work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should loading work', fakeAsync(() => {
      testComponent.loading = true;
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.classList).toContain('ant-switch-loading');
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(0);
    }));
    it('should size work', () => {
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.classList).toContain('ant-switch-small');
    });
    it('should key down work', () => {
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      expect(testComponent.value).toBe(true);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', 39);
      fixture.detectChanges();
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', 37);

      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', 37);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', 32);
      fixture.detectChanges();
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', 13);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', 13);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
    });
    it('should children work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.firstElementChild.innerText).toBe('off');
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.firstElementChild.innerText).toBe('on');
    }));
    it('should focus and blur function work', () => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild === document.activeElement).toBe(false);
      testComponent.nzSwitchComponent.focus();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild === document.activeElement).toBe(true);
      testComponent.nzSwitchComponent.blur();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild === document.activeElement).toBe(false);
    });
  });
  describe('template switch', () => {
    let fixture;
    let testComponent;
    let switchElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSwitchTemplateComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
    });
    it('should children template work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.classList).toContain('anticon-close');
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild.firstElementChild.firstElementChild.firstElementChild.classList).toContain('anticon-check');
    }));
  });
  describe('switch form', () => {
    let fixture;
    let testComponent;
    let switchElement;
    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestSwitchFormComponent);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should set disabled work', fakeAsync(() => {
      flush();
      expect(testComponent.formGroup.get('switchValue').value).toBe(true);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('switchValue').value).toBe(false);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('switchValue').setValue(true);
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('switchValue').value).toBe(true);
    }));
  });
});

@Component({
  selector: 'nz-test-switch-basic',
  template: `
    <ng-template #checkedChildrenTemplate><i nz-icon type="check"></i></ng-template>
    <ng-template #unCheckedChildrenTemplate><i nz-icon type="closs"></i></ng-template>
    <nz-switch
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [nzDisabled]="disabled"
      [nzLoading]="loading"
      [nzSize]="size"
      [nzControl]="control"
      [nzCheckedChildren]="checkedChildren"
      [nzUnCheckedChildren]="unCheckedChildren">
    </nz-switch>`
})
export class NzTestSwitchBasicComponent {
  @ViewChild(NzSwitchComponent) nzSwitchComponent: NzSwitchComponent;
  @ViewChild('checkedChildrenTemplate') checkedChildrenTemplate: TemplateRef<void>;
  @ViewChild('unCheckedChildrenTemplate') unCheckedChildrenTemplate: TemplateRef<void>;
  checkedChildren = 'on';
  unCheckedChildren = 'off';
  value = false;
  control = false;
  disabled = false;
  size = 'default';
  loading = false;
  modelChange = jasmine.createSpy('model change callback');
}

@Component({
  selector: 'nz-test-switch-template',
  template: `
    <ng-template #checkedChildrenTemplate><i nz-icon type="check"></i></ng-template>
    <ng-template #unCheckedChildrenTemplate><i nz-icon type="close"></i></ng-template>
    <nz-switch
      [nzCheckedChildren]="checkedChildrenTemplate"
      [nzUnCheckedChildren]="unCheckedChildrenTemplate">
    </nz-switch>`
})
export class NzTestSwitchTemplateComponent {
}

@Component({
  selector: 'nz-test-switch-form',
  template: `
    <form [formGroup]="formGroup">
      <nz-switch formControlName="switchValue"></nz-switch>
    </form>
  `
})
export class NzTestSwitchFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      switchValue: [ true ]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}
