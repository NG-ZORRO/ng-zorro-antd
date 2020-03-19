import { Component, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';

import { NzStatisticComponent } from './statistic.component';
import { NzStatisticModule } from './statistic.module';

describe('nz-statistic', () => {
  let testBed: ComponentBed<NzTestStatisticComponent>;
  let fixture: ComponentFixture<NzTestStatisticComponent>;
  let testComponent: NzTestStatisticComponent;
  let statisticEl: DebugElement;

  describe('basic', () => {
    beforeEach(() => {
      testBed = createComponentBed(NzTestStatisticComponent, {
        imports: [NzStatisticModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;
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
  });
});

@Component({
  template: `
    <nz-statistic [nzValue]="123.45" [nzTitle]="title" [nzSuffix]="suffix" [nzPrefix]="prefix"> </nz-statistic>
  `
})
export class NzTestStatisticComponent {
  title = 'title';
  prefix = '';
  suffix = '';
}
