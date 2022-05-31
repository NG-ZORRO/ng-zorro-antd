import { BidiModule, Direction } from '@angular/cdk/bidi';
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
        imports: [BidiModule, NzInputModule, FormsModule, ReactiveFormsModule, NzIconTestModule],
        declarations: [
          NzTestInputWithInputComponent,
          NzTestInputWithTextAreaComponent,
          NzTestInputFormComponent,
          NzTestInputWithStatusComponent,
          NzTestInputWithDirComponent
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

  describe('input RTL', () => {
    let fixture: ComponentFixture<NzTestInputWithDirComponent>;
    let inputElement: DebugElement;
    let inputGroupElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInputWithDirComponent);
      fixture.detectChanges();
      inputElement = fixture.debugElement.query(By.directive(NzInputDirective));
      inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent));
    });

    it('should className correct on dir change', () => {
      expect(inputElement.nativeElement.classList).not.toContain('ant-input-rtl');
      expect(inputGroupElement.nativeElement.classList).not.toContain('ant-input-group-rtl');

      fixture.componentInstance.dir = 'rtl';
      fixture.detectChanges();
      expect(inputElement.nativeElement.classList).toContain('ant-input-rtl');
      expect(inputGroupElement.nativeElement.classList).toContain('ant-input-group-rtl');
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
});

@Component({
  template: `
    <div [dir]="dir">
      <input nz-input />
      <nz-input-group nzAddOnAfterIcon="setting">
        <input type="text" nz-input />
      </nz-input-group>
    </div>
  `
})
export class NzTestInputWithDirComponent {
  dir: Direction = 'ltr';
}

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
