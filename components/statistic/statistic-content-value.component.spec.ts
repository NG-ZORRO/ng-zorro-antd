/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DecimalPipe } from '@angular/common';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzStatisticValueType } from 'ng-zorro-antd/statistic/typings';

import { NzStatisticContentValueComponent } from './statistic-content-value.component';
import { NzStatisticModule } from './statistic.module';

describe('nz-statistic-content-value', () => {
  let fixture: ComponentFixture<NzTestNumberComponent>;
  let testComponent: NzTestNumberComponent;
  let numberEl: DebugElement;

  describe('basic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestNumberComponent);
      testComponent = fixture.componentInstance;
      numberEl = fixture.debugElement.query(By.directive(NzStatisticContentValueComponent));
    });

    it('should have correct class', () => {
      fixture.detectChanges();
      expect(numberEl.nativeElement.classList.contains('ant-statistic-content-value')).toBeTruthy();
    });

    it('should render number', () => {
      // Int with group separator, decimal.
      testComponent.value = 12345.012;
      fixture.detectChanges();
      expect(numberEl.nativeElement.querySelector('.ant-statistic-content-value-int').innerText).toBe('12,345');
      expect(numberEl.nativeElement.querySelector('.ant-statistic-content-value-decimal').innerText).toBe('.012');
    });

    it('should support template', () => {
      testComponent.template = testComponent.tpl;
      testComponent.value = 12345.012;
      fixture.detectChanges();
      expect(numberEl.nativeElement.querySelector('.ant-statistic-content-value-int')).toBeFalsy();
      expect(numberEl.nativeElement.querySelector('.ant-statistic-content-value-decimal')).toBeFalsy();
      expect(numberEl.nativeElement.innerText).toBe("It's 12,345.012");
    });
  });
});

@Component({
  imports: [DecimalPipe, NzStatisticModule],
  template: `
    <nz-statistic-content-value [nzValue]="(value | number)!" [nzValueTemplate]="template" />
    <ng-template #tpl let-value>It's {{ value }}</ng-template>
  `
})
export class NzTestNumberComponent {
  @ViewChild('tpl', { static: true }) tpl?: TemplateRef<{ $implicit: NzStatisticValueType }>;

  value = 1;
  template?: TemplateRef<{ $implicit: NzStatisticValueType }>;
}
