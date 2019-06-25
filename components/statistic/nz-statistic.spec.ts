import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzStatisticComponent } from './nz-statistic.component';
import { NzStatisticModule } from './nz-statistic.module';

describe('nz-statistic', () => {
  let fixture: ComponentFixture<NzTestStatisticComponent>;
  let testComponent: NzTestStatisticComponent;
  let statisticEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NzStatisticModule],
      declarations: [NzTestStatisticComponent]
    }).compileComponents();
  });

  describe('basic', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestStatisticComponent);
      testComponent = fixture.debugElement.componentInstance;
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
