import { Component, DebugElement } from '@angular/core';
import { async, fakeAsync, flush, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzIconTestModule } from '../icon/nz-icon-test.module';
import { NzInputDirective } from './nz-input.directive';
import { NzInputModule } from './nz-input.module';

describe('input', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzInputModule, FormsModule, ReactiveFormsModule, NzIconTestModule],
      declarations: [NzTestInputWithInputComponent, NzTestInputWithTextAreaComponent, NzTestInputFormComponent],
      providers: []
    }).compileComponents();
  }));
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
        expect(inputElement.nativeElement.classList).not.toContain('ant-input-disabled');
        testComponent.disable();
        flush();
        fixture.detectChanges();
        expect(inputElement.nativeElement.classList).toContain('ant-input-disabled');
      }));
    });
  });
});

@Component({
  selector: 'nz-test-input-with-input',
  template: `
    <input nz-input [nzSize]="size" [disabled]="disabled" />
  `
})
export class NzTestInputWithInputComponent {
  size = 'default';
  disabled = false;
}

@Component({
  selector: 'nz-test-input-with-textarea',
  template: `
    <textarea nz-input></textarea>
  `
})
export class NzTestInputWithTextAreaComponent {}

@Component({
  selector: 'nz-test-input-form',
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
