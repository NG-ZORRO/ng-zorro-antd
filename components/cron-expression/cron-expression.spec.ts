import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NzCronExpressionComponent } from 'ng-zorro-antd/cron-expression/cron-expression.component';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression/cron-expression.module';
import { NzCronExpressionSize } from 'ng-zorro-antd/cron-expression/typings';
import { NzFormModule } from 'ng-zorro-antd/form';

describe('nz-cron-expression', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestCronExpressionComponent>;
    let fixture: ComponentFixture<NzTestCronExpressionComponent>;
    let testComponent: NzTestCronExpressionComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestCronExpressionComponent, {
        imports: [NzCronExpressionModule, HttpClientTestingModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzCronExpressionComponent));
    });

    it('cron-expression basic', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain('ant-input');
    });

    it('cron-expression nzSize', () => {
      testComponent.nzSize = 'small';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-sm'
      );
      testComponent.nzSize = 'large';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-lg'
      );
    });

    it('cron-expression nzDisabled', () => {
      testComponent.nzDisabled = true;
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-disabled'
      );
    });

    it('cron-expression nzBorderless', () => {
      testComponent.nzBorderless = true;
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-borderless'
      );
    });

    it('cron-expression nzCollapseDisable', () => {
      expect(resultEl.nativeElement.querySelector('nz-cron-expression-preview')).not.toBe(null);
      testComponent.nzCollapseDisable = true;
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('nz-cron-expression-preview')).toBe(null);
    });

    it('cron-expression nzExtra', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-map')).not.toBe(null);
    });

    it('cron-expression nzSemantic', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-preview-dateTime').innerText).toBe('Test');
    });
  });

  describe('type', () => {
    let testBed: ComponentBed<NzTestCronExpressionTypeComponent>;
    let fixture: ComponentFixture<NzTestCronExpressionTypeComponent>;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestCronExpressionTypeComponent, {
        imports: [NzCronExpressionModule, HttpClientTestingModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      resultEl = fixture.debugElement.query(By.directive(NzCronExpressionComponent));
    });

    it('cron-expression type', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelectorAll('nz-cron-expression-input').length).toBe(6);
      expect(resultEl.nativeElement.querySelectorAll('nz-cron-expression-label').length).toBe(6);

      fixture.componentRef.instance.nzType = 'linux';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelectorAll('nz-cron-expression-input').length).toBe(5);
      expect(resultEl.nativeElement.querySelectorAll('nz-cron-expression-label').length).toBe(5);
    });
  });

  describe('form', () => {
    let testBed: ComponentBed<NzTestCronExpressionFormComponent>;
    let fixture: ComponentFixture<NzTestCronExpressionFormComponent>;
    let testComponent: NzTestCronExpressionFormComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestCronExpressionFormComponent, {
        imports: [NzCronExpressionModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule, NzFormModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzCronExpressionComponent));
    });

    it('cron-expression form', fakeAsync(() => {
      flush();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).not.toContain(
        'ant-input-disabled'
      );
      testComponent.disable();
      fixture.detectChanges();
      flush();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-disabled'
      );
    }));
  });
});

@Component({
  template: `
    <nz-cron-expression
      [nzSize]="nzSize"
      [nzCollapseDisable]="nzCollapseDisable"
      [nzDisabled]="nzDisabled"
      [nzBorderless]="nzBorderless"
      [nzExtra]="shortcuts"
      [nzSemantic]="semanticTemplate"
    ></nz-cron-expression>
    <ng-template #shortcuts>
      <button nz-button nzType="primary">Test</button>
    </ng-template>
    <ng-template #semanticTemplate>Test</ng-template>
  `
})
export class NzTestCronExpressionComponent {
  nzSize: NzCronExpressionSize = 'default';
  nzDisabled = false;
  nzBorderless = false;
  nzCollapseDisable = false;
}

@Component({
  template: ` <nz-cron-expression [nzType]="nzType"></nz-cron-expression> `
})
export class NzTestCronExpressionTypeComponent {
  nzType: 'linux' | 'spring' = 'spring';
}

@Component({
  template: `<nz-cron-expression [formControl]="formControl"></nz-cron-expression>`
})
export class NzTestCronExpressionFormComponent {
  formControl = new FormControl('1 1 1 * *');

  disable(): void {
    this.formControl.disable();
  }
}
