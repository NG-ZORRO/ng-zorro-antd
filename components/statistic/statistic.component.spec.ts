/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectionStrategy, Component, DebugElement, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { testDirectionality } from 'ng-zorro-antd/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzStatisticComponent } from './statistic.component';
import { NzStatisticModule } from './statistic.module';

describe('statistic', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideZoneChangeDetection()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestStatisticComponent>;
    let testComponent: NzTestStatisticComponent;
    let statisticEl: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestStatisticComponent);
      testComponent = fixture.componentInstance;
      statisticEl = fixture.debugElement.query(By.directive(NzStatisticComponent));
    });

    it('should render title, prefix and suffix', () => {
      fixture.detectChanges();
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-title').innerText).toBe('title');
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-content-prefix')).toBeFalsy();
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-content-suffix')).toBeFalsy();

      testComponent.prefix = 'prefix';
      testComponent.suffix = 'suffix';
      fixture.detectChanges();
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-content-prefix').innerText).toBe('prefix');
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-content-suffix').innerText).toBe('suffix');
    });

    it('should render skeleton', () => {
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-skeleton')).toBeFalsy();
      testComponent.loading = true;
      fixture.detectChanges();
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-skeleton')).toBeTruthy();
    });
  });

  testDirectionality(() => NzTestStatisticComponent, By.directive(NzStatisticComponent), 'ant-statistic');
});

@Component({
  imports: [NzStatisticModule],
  template: `
    <nz-statistic [nzValue]="123.45" [nzTitle]="title" [nzSuffix]="suffix" [nzPrefix]="prefix" [nzLoading]="loading" />
  `,
  changeDetection: ChangeDetectionStrategy.Eager
})
export class NzTestStatisticComponent {
  title = 'title';
  prefix = '';
  suffix = '';
  loading = false;
}
