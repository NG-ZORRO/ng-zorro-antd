/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCronExpressionComponent } from 'ng-zorro-antd/cron-expression/cron-expression.component';
import { NzCronExpressionModule } from 'ng-zorro-antd/cron-expression/cron-expression.module';
import { NzCronExpressionSize } from 'ng-zorro-antd/cron-expression/typings';

describe('cron-expression', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestCronExpressionComponent>;
    let testComponent: NzTestCronExpressionComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCronExpressionComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
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
    let fixture: ComponentFixture<NzTestCronExpressionTypeComponent>;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCronExpressionTypeComponent);
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
    let fixture: ComponentFixture<NzTestCronExpressionFormComponent>;
    let testComponent: NzTestCronExpressionFormComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCronExpressionFormComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
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
  imports: [NzButtonModule, NzCronExpressionModule],
  template: `
    <nz-cron-expression
      [nzSize]="nzSize"
      [nzCollapseDisable]="nzCollapseDisable"
      [nzDisabled]="nzDisabled"
      [nzBorderless]="nzBorderless"
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
  nzSize: NzCronExpressionSize = 'default';
  nzDisabled = false;
  nzBorderless = false;
  nzCollapseDisable = false;
}

@Component({
  imports: [NzCronExpressionModule],
  template: `<nz-cron-expression [nzType]="nzType" />`
})
export class NzTestCronExpressionTypeComponent {
  nzType: 'linux' | 'spring' = 'spring';
}

@Component({
  imports: [ReactiveFormsModule, NzCronExpressionModule],
  template: `<nz-cron-expression [formControl]="formControl" />`
})
export class NzTestCronExpressionFormComponent {
  formControl = new FormControl('1 1 1 * *');

  disable(): void {
    this.formControl.disable();
  }
}
