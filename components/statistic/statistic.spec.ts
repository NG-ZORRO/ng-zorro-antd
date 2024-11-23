import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzStatisticComponent } from './statistic.component';
import { NzStatisticModule } from './statistic.module';

describe('nz-statistic', () => {
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

  describe('RTL', () => {
    let fixture: ComponentFixture<NzTestStatisticRtlComponent>;
    let statisticEl: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestStatisticRtlComponent);
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
  standalone: true,
  imports: [NzStatisticModule],
  template: `
    <nz-statistic
      [nzValue]="123.45"
      [nzTitle]="title"
      [nzSuffix]="suffix"
      [nzPrefix]="prefix"
      [nzLoading]="loading"
    ></nz-statistic>
  `
})
export class NzTestStatisticComponent {
  title = 'title';
  prefix = '';
  suffix = '';
  loading = false;
}

@Component({
  standalone: true,
  imports: [BidiModule, NzStatisticModule],
  template: `
    <div [dir]="direction">
      <nz-statistic [nzValue]="123.45" nzTitle="test title"></nz-statistic>
    </div>
  `
})
export class NzTestStatisticRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}
