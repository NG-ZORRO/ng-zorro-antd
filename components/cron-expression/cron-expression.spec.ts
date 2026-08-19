/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStatus } from 'ng-zorro-antd/core/types';
import { NzCronExpressionComponent } from 'ng-zorro-antd/cron-expression/cron-expression.component';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression/cron-expression.module';
import { NzCronExpressionSize } from 'ng-zorro-antd/cron-expression/typings';
import { NzFormControlStatusType, NzFormModule } from 'ng-zorro-antd/form';

describe('cron-expression', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<NzTestCronExpressionComponent>;
    let testComponent: NzTestCronExpressionComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCronExpressionComponent);
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzCronExpressionComponent));
    });

    it('should render basic cron-expression', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain('ant-input');
    });

    it('should nzSize work', () => {
      testComponent.nzSize.set('small');
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-sm'
      );
      testComponent.nzSize.set('large');
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-lg'
      );
    });

    it('should nzDisabled work', () => {
      testComponent.nzDisabled.set(true);
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-disabled'
      );
    });

    it('should nzBorderless work', () => {
      testComponent.nzBorderless.set(true);
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-borderless'
      );
    });

    it('should nzStatus work', () => {
      testComponent.nzStatus.set('error');
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-status-error'
      );

      testComponent.nzStatus.set('warning');
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-status-warning'
      );
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).not.toContain(
        'ant-input-status-error'
      );

      testComponent.nzStatus.set('');
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).not.toContain(
        'ant-input-status-warning'
      );
    });

    it('should use standard input focus class', () => {
      fixture.detectChanges();
      resultEl.componentInstance.focusEffect('minute');
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-focused'
      );

      resultEl.componentInstance.blurEffect();
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).not.toContain(
        'ant-input-focused'
      );
    });

    it('should nzCollapseDisable work', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('nz-cron-expression-preview')).not.toBeNull();
      testComponent.nzCollapseDisable.set(true);
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('nz-cron-expression-preview')).toBeNull();
    });

    it('should nzExtra work', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-map')).not.toBeNull();
    });

    it('should nzSemantic work', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-preview-dateTime').innerText).toBe('Test');
    });
  });

  describe('type', () => {
    it('should nzType work', () => {
      const fixture = TestBed.createComponent(NzCronExpressionComponent);
      const element = fixture.debugElement.nativeElement;
      fixture.componentRef.setInput('nzType', 'spring');
      fixture.detectChanges();
      expect(element.querySelectorAll('nz-cron-expression-input').length).toBe(6);
      expect(element.querySelectorAll('nz-cron-expression-label').length).toBe(6);

      fixture.componentRef.setInput('nzType', 'linux');
      fixture.detectChanges();
      expect(element.querySelectorAll('nz-cron-expression-input').length).toBe(5);
      expect(element.querySelectorAll('nz-cron-expression-label').length).toBe(5);
    });
  });

  describe('form', () => {
    let fixture: ComponentFixture<NzTestCronExpressionFormComponent>;
    let testComponent: NzTestCronExpressionFormComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCronExpressionFormComponent);
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzCronExpressionComponent));
    });

    it('should work with form', async () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).not.toContain(
        'ant-input-disabled'
      );
      testComponent.disable();
      await fixture.whenStable();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-disabled'
      );
    });

    it('should reflect parent FormControl validation status', () => {
      fixture.detectChanges();
      testComponent.formControl.markAsTouched();
      testComponent.formControl.setErrors({ external: true });
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
        'ant-input-status-error'
      );

      testComponent.formControl.setErrors(null);
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).not.toContain(
        'ant-input-status-error'
      );
    });
  });

  describe('form status', () => {
    let fixture: ComponentFixture<NzTestCronExpressionStatusInFormComponent>;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCronExpressionStatusInFormComponent);
      resultEl = fixture.debugElement.query(By.directive(NzCronExpressionComponent));
    });

    it.each(['error', 'warning', 'success', 'validating'] as const)(
      'should reflect %s status from nz-form-control',
      status => {
        fixture.componentInstance.status.set(status);
        fixture.detectChanges();
        expect(resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList).toContain(
          `ant-input-status-${status}`
        );
      }
    );

    it('should prioritize internal validation error', () => {
      fixture.componentInstance.status.set('warning');
      fixture.detectChanges();
      resultEl.componentInstance.getValue({ label: 'minute', value: 'invalid' });
      fixture.detectChanges();

      const classList = resultEl.nativeElement.querySelector('.ant-cron-expression-input-group').classList;
      expect(classList).toContain('ant-input-status-error');
      expect(classList).not.toContain('ant-input-status-warning');
    });
  });
});

@Component({
  imports: [NzButtonModule, NzCronExpressionModule],
  template: `
    <nz-cron-expression
      [nzSize]="nzSize()"
      [nzCollapseDisable]="nzCollapseDisable()"
      [nzDisabled]="nzDisabled()"
      [nzBorderless]="nzBorderless()"
      [nzStatus]="nzStatus()"
      [nzExtra]="shortcuts"
      [nzSemantic]="semanticTemplate"
    />
    <ng-template #shortcuts>
      <button nz-button nzType="primary">Test</button>
    </ng-template>
    <ng-template #semanticTemplate>Test</ng-template>
  `
})
export class NzTestCronExpressionComponent {
  readonly nzSize = signal<NzCronExpressionSize>('default');
  readonly nzDisabled = signal(false);
  readonly nzBorderless = signal(false);
  readonly nzCollapseDisable = signal(false);
  readonly nzStatus = signal<NzStatus>('');
}

@Component({
  imports: [ReactiveFormsModule, NzCronExpressionModule, NzFormModule],
  template: `
    <nz-form-control>
      <nz-cron-expression [formControl]="formControl" />
    </nz-form-control>
  `
})
export class NzTestCronExpressionFormComponent {
  formControl = new FormControl('1 1 1 * *');

  disable(): void {
    this.formControl.disable();
  }
}

@Component({
  imports: [NzCronExpressionModule, NzFormModule],
  template: `
    <nz-form-control [nzValidateStatus]="status()">
      <nz-cron-expression />
    </nz-form-control>
  `
})
export class NzTestCronExpressionStatusInFormComponent {
  readonly status = signal<NzFormControlStatusType>('');
}
