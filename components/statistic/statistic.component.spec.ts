/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { testDirectionality } from 'ng-zorro-antd/core/testing';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzStatisticComponent } from './statistic.component';
import { NzStatisticModule } from './statistic.module';

describe('statistic', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
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

      testComponent.prefix.set('prefix');
      testComponent.suffix.set('suffix');
      fixture.detectChanges();
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-content-prefix').innerText).toBe('prefix');
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-content-suffix').innerText).toBe('suffix');
    });

    it('should render skeleton', () => {
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-skeleton')).toBeFalsy();
      testComponent.loading.set(true);
      fixture.detectChanges();
      expect(statisticEl.nativeElement.querySelector('.ant-statistic-skeleton')).toBeTruthy();
    });
  });

  testDirectionality(() => NzTestStatisticComponent, By.directive(NzStatisticComponent), 'ant-statistic');
});

@Component({
  imports: [NzStatisticModule],
  template: `
    <nz-statistic
      [nzValue]="123.45"
      [nzTitle]="title()"
      [nzSuffix]="suffix()"
      [nzPrefix]="prefix()"
      [nzLoading]="loading()"
    />
  `
})
export class NzTestStatisticComponent {
  readonly title = signal('title');
  readonly prefix = signal('');
  readonly suffix = signal('');
  readonly loading = signal(false);
}
