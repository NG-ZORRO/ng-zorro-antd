import { BidiModule, Dir } from '@angular/cdk/bidi';
import { ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { ApplicationRef, Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from 'ng-zorro-antd/core/testing';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzSwitchComponent } from './switch.component';
import { NzSwitchModule } from './switch.module';

describe('switch', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, NzSwitchModule, FormsModule, ReactiveFormsModule, NzIconTestModule],
        declarations: [
          NzTestSwitchBasicComponent,
          NzTestSwitchFormComponent,
          NzTestSwitchTemplateComponent,
          NzTestSwitchRtlComponent
        ]
      });
      TestBed.compileComponents();
    })
  );

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
    it('should ngModel work', fakeAsync(() => {
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).not.toContain('ant-switch-checked');
      expect(testComponent.value).toBe(false);
      testComponent.value = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('ant-switch-checked');
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
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('ant-switch-loading');
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
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('ant-switch-small');
    });
    it('should key down work', () => {
      expect(testComponent.value).toBe(false);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      expect(testComponent.value).toBe(true);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', RIGHT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(1);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);

      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', LEFT_ARROW);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(2);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', SPACE);
      fixture.detectChanges();
      expect(testComponent.value).toBe(true);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(3);
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control = false;
      testComponent.loading = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
      testComponent.control = false;
      testComponent.loading = false;
      testComponent.disabled = true;
      fixture.detectChanges();
      dispatchKeyboardEvent(switchElement.nativeElement.firstElementChild, 'keydown', ENTER);
      fixture.detectChanges();
      expect(testComponent.value).toBe(false);
      expect(testComponent.modelChange).toHaveBeenCalledTimes(4);
    });
    it('should children work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.querySelector('.ant-switch-inner').innerText).toBe('off');
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.querySelector('.ant-switch-inner').innerText).toBe('on');
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
    describe('change detection behavior', () => {
      it('should not run change detection on `click` events if the switch is disabled', () => {
        testComponent.disabled = true;
        fixture.detectChanges();

        const appRef = TestBed.inject(ApplicationRef);
        const event = new MouseEvent('click');

        spyOn(appRef, 'tick');
        spyOn(event, 'preventDefault').and.callThrough();

        switchElement.nativeElement.dispatchEvent(event);

        expect(appRef.tick).not.toHaveBeenCalled();
        expect(event.preventDefault).toHaveBeenCalled();
      });
      it('should not run change detection on `keydown` events if the switch is disabled', () => {
        testComponent.disabled = true;
        fixture.detectChanges();

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

        testComponent.disabled = false;
        fixture.detectChanges();

        switchButton.dispatchEvent(event);

        expect(event.preventDefault).toHaveBeenCalled();
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
    it('should children template work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.querySelector('.ant-switch-inner').firstElementChild!.classList).toContain(
        'anticon-close'
      );
      switchElement.nativeElement.click();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(switchElement.nativeElement.querySelector('.ant-switch-inner').firstElementChild!.classList).toContain(
        'anticon-check'
      );
    }));
  });
  describe('switch form', () => {
    let fixture: ComponentFixture<NzTestSwitchFormComponent>;
    let testComponent: NzTestSwitchFormComponent;

    beforeEach(fakeAsync(() => {
      fixture = TestBed.createComponent(NzTestSwitchFormComponent);
      testComponent = fixture.debugElement.componentInstance;
    }));
    it('should be in pristine, untouched, and valid states initially', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.formGroup.valid).toBe(true);
      expect(testComponent.formGroup.pristine).toBe(true);
      expect(testComponent.formGroup.touched).toBe(false);
    }));
    it('should be disable by default even if form is enable', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      const buttonElement = switchElement.nativeElement.firstElementChild! as HTMLButtonElement;
      expect(buttonElement.disabled).toBeTruthy();
      expect(buttonElement.classList).toContain('ant-switch-disabled');
    }));
    it('should be enable if form is enable and nzDisable set to false', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      const buttonElement = switchElement.nativeElement.firstElementChild! as HTMLButtonElement;
      expect(buttonElement.disabled).toBeFalsy();
      expect(buttonElement.classList).not.toContain('ant-switch-disabled');
    }));
    it('should be disable if form is disable and nzDisable set to false', fakeAsync(() => {
      testComponent.formGroup.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      const buttonElement = switchElement.nativeElement.firstElementChild! as HTMLButtonElement;
      expect(buttonElement.disabled).toBeTruthy();
      expect(buttonElement.classList).toContain('ant-switch-disabled');
    }));
    it('should be disable first if nzDisabled set to true then enable when enable function is called', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      const buttonElement = switchElement.nativeElement.firstElementChild! as HTMLButtonElement;
      expect(buttonElement.disabled).toBeTruthy();
      expect(buttonElement.classList).toContain('ant-switch-disabled');
      testComponent.formGroup.enable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(buttonElement.disabled).toBeFalsy();
      expect(buttonElement.classList).not.toContain('ant-switch-disabled');
    }));
    it('should set disabled work', fakeAsync(() => {
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      expect(testComponent.formGroup.get('switchValue')!.value).toBe(true);
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('switchValue')!.value).toBe(false);
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      testComponent.formGroup.get('switchValue')!.setValue(true);
      testComponent.disable();
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      switchElement.nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.formGroup.get('switchValue')!.value).toBe(true);
    }));
  });
  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(NzTestSwitchRtlComponent);
      const switchElement = fixture.debugElement.query(By.directive(NzSwitchComponent));
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).toContain('ant-switch-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(switchElement.nativeElement.firstElementChild!.classList).not.toContain('ant-switch-rtl');
    });
  });
});
@Component({
  template: `
    <ng-template #checkedChildrenTemplate><span nz-icon nzType="check"></span></ng-template>
    <ng-template #unCheckedChildrenTemplate><span nz-icon nzType="closs"></span></ng-template>
    <nz-switch
      [(ngModel)]="value"
      (ngModelChange)="modelChange($event)"
      [nzDisabled]="disabled"
      [nzLoading]="loading"
      [nzSize]="size"
      [nzControl]="control"
      [nzCheckedChildren]="checkedChildren"
      [nzUnCheckedChildren]="unCheckedChildren"
    ></nz-switch>
  `
})
export class NzTestSwitchBasicComponent {
  @ViewChild(NzSwitchComponent, { static: false }) nzSwitchComponent!: NzSwitchComponent;
  @ViewChild('checkedChildrenTemplate', { static: false }) checkedChildrenTemplate!: TemplateRef<void>;
  @ViewChild('unCheckedChildrenTemplate', { static: false }) unCheckedChildrenTemplate!: TemplateRef<void>;
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
  template: `
    <ng-template #checkedChildrenTemplate><span nz-icon nzType="check"></span></ng-template>
    <ng-template #unCheckedChildrenTemplate><span nz-icon nzType="close"></span></ng-template>
    <nz-switch
      [nzCheckedChildren]="checkedChildrenTemplate"
      [nzUnCheckedChildren]="unCheckedChildrenTemplate"
    ></nz-switch>
  `
})
export class NzTestSwitchTemplateComponent {}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <nz-switch formControlName="switchValue" [nzDisabled]="disabled"></nz-switch>
    </form>
  `
})
export class NzTestSwitchFormComponent {
  formGroup: UntypedFormGroup;

  disabled = false;

  constructor(private formBuilder: UntypedFormBuilder) {
    this.formGroup = this.formBuilder.group({
      switchValue: [true]
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-switch [(ngModel)]="switchValue"></nz-switch>
    </div>
  `
})
export class NzTestSwitchRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
  switchValue = false;
}
