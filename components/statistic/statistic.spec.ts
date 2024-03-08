import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';

import { NzStatisticComponent } from './statistic.component';
import { NzStatisticModule } from './statistic.module';

describe('nz-statistic', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestStatisticComponent>;
    let fixture: ComponentFixture<NzTestStatisticComponent>;
    let testComponent: NzTestStatisticComponent;
    let statisticEl: DebugElement;
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

  describe('RTL', () => {
    let testBed: ComponentBed<NzTestStatisticRtlComponent>;
    let fixture: ComponentFixture<NzTestStatisticRtlComponent>;
    let statisticEl: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestStatisticRtlComponent, {
        imports: [BidiModule, NzStatisticModule]
      });
      fixture = testBed.fixture;
      statisticEl = fixture.debugElement.query(By.directive(NzStatisticComponent));
    });

    it('should className correct on dir change', () => {
      fixture.detectChanges();
      expect(statisticEl.nativeElement.classList).toContain('ant-statistic-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(statisticEl.nativeElement.classList).not.toContain('ant-statistic-rtl');
    });
  });
});

@Component({
  template: `
    <nz-statistic [nzValue]="123.45" [nzTitle]="title" [nzSuffix]="suffix" [nzPrefix]="prefix"></nz-statistic>
  `
})
export class NzTestStatisticComponent {
  title = 'title';
  prefix = '';
  suffix = '';
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-statistic [nzValue]="123.45" nzTitle="test title"></nz-statistic>
    </div>
  `
})
export class NzTestStatisticRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
