import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzStatus } from 'ng-zorro-antd/core/types';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzInputGroupComponent } from 'ng-zorro-antd/input/input-group.component';

import { NzInputDirective } from './input.directive';
import { NzInputModule } from './input.module';

describe('input', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NzInputModule, FormsModule, ReactiveFormsModule, NzIconTestModule],
        declarations: [
          NzTestInputWithInputComponent,
          NzTestInputWithTextAreaComponent,
          NzTestInputFormComponent,
          NzTestInputWithStatusComponent,
          NzTestInputGroupWithStatusComponent
        ],
        providers: []
      }).compileComponents();
    })
  );
  describe('single input', () => {
    describe('input with input element', () => {
      let fixture: ComponentFixture<NzTestInputWithInputComponent>;
      let testComponent: NzTestInputWithInputComponent;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithInputComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });
      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
      });
      it('should disabled work', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).not.toContain('ant-input-disabled');
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-disabled');
      });
      it('should nzSize work', () => {
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
        expect(inputElement.nativeElement.classList).toContain('ant-input-sm');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
        expect(inputElement.nativeElement.classList).toContain('ant-input-lg');
      });
    });

    describe('input with textarea element', () => {
      let fixture: ComponentFixture<NzTestInputWithInputComponent>;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputWithInputComponent);
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input');
      });
    });
  });

  describe('input form', () => {
    describe('input with form', () => {
      let fixture: ComponentFixture<NzTestInputFormComponent>;
      let testComponent: NzTestInputFormComponent;
      let inputElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputFormComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      });
      it('should set disabled work', fakeAsync(() => {
        flush();
        expect(inputElement.nativeElement.attributes.getNamedItem('disabled')).toBeNull();
        testComponent.disable();
        flush();
        fixture.detectChanges();
        expect(inputElement.nativeElement.attributes.getNamedItem('disabled')).toBeDefined();
      }));
    });
  });

  describe('input with status', () => {
    let fixture: ComponentFixture<NzTestInputWithStatusComponent>;
    let inputElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputWithStatusComponent);
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-status-error');

      fixture.componentInstance.status = 'warning';
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).toContain('ant-input-status-warning');

      fixture.componentInstance.status = '';
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).not.toContain('ant-input-status-warning');
    });
  });

  describe('input group with status', () => {
    let fixture: ComponentFixture<NzTestInputGroupWithStatusComponent>;
    let inputElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputGroupWithStatusComponent);
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NzInputGroupComponent));
    });

    it('should className correct with prefix', () => {
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-affix-wrapper-status-error');

      fixture.componentInstance.status = 'warning';
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).toContain('ant-input-affix-wrapper-status-warning');

      fixture.componentInstance.status = '';
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).not.toContain('ant-input-affix-wrapper-status-warning');
    });

    it('should className correct with addon', () => {
      fixture.componentInstance.isAddon = true;
      fixture.detectChanges();
      // re-query input element
      inputElement = fixture.debugElement.query(By.directive(NzInputGroupComponent));
      expect(inputElement.nativeElement.classList).toContain('ant-input-group-wrapper-status-error');

      fixture.componentInstance.status = 'warning';
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).toContain('ant-input-group-wrapper-status-warning');

      fixture.componentInstance.status = '';
      fixture.detectChanges();
      expect(inputElement.nativeElement.className).not.toContain('ant-input-group-wrapper-status-warning');
    });
  });
});

@Component({
  template: ` <input nz-input [nzSize]="size" [disabled]="disabled" /> `
})
export class NzTestInputWithInputComponent {
  size = 'default';
  disabled = false;
}

@Component({
  template: ` <textarea nz-input></textarea> `
})
export class NzTestInputWithTextAreaComponent {}

@Component({
  template: `
    <form [formGroup]="formGroup">
      <input nz-input formControlName="input" />
    </form>
  `
})
export class NzTestInputFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroup = this.formBuilder.group({
      input: ['abc']
    });
  }

  disable(): void {
    this.formGroup.disable();
  }
}

// status
@Component({
  template: ` <input nz-input [nzStatus]="status" /> `
})
export class NzTestInputWithStatusComponent {
  status: NzStatus = 'error';
}

@Component({
  template: `
    <ng-container *ngIf="!isAddon">
      <nz-input-group [nzPrefix]="prefixTemplateClock" [nzStatus]="status">
        <input type="text" nz-input />
      </nz-input-group>
      <ng-template #prefixTemplateClock><i nz-icon nzType="clock-circle" nzTheme="outline"></i></ng-template>
    </ng-container>
    <ng-container *ngIf="isAddon">
      <nz-input-group nzAddOnAfterIcon="setting" [nzStatus]="status">
        <input type="text" nz-input />
      </nz-input-group>
    </ng-container>
  `
})
export class NzTestInputGroupWithStatusComponent {
  isAddon = false;
  status: NzStatus = 'error';
}
