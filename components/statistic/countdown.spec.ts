import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';

import { NzCountdownComponent } from './countdown.component';
import { NzStatisticModule } from './statistic.module';

describe('nz-countdown', () => {
  let testBed: ComponentBed<NzTestCountdownComponent>;
  let fixture: ComponentFixture<NzTestCountdownComponent>;
  let testComponent: NzTestCountdownComponent;
  let countdownEl: DebugElement;

  describe('basic', () => {
    beforeEach(() => {
      testBed = createComponentBed(NzTestCountdownComponent, {
        imports: [NzStatisticModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;
      countdownEl = fixture.debugElement.query(By.directive(NzCountdownComponent));
    });

    it('should render time', fakeAsync(() => {
      testComponent.resetTimerWithFormat('HH:mm:ss');
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      expect(countdownEl.nativeElement.querySelector('.ant-statistic-content-value').innerText).toBe('48:00:29');
      testComponent.countdown.stopTimer();
    }));

    it('should stop timer when nzValue is earlier than current', fakeAsync(() => {
      const beforeTime = new Date().getTime() - 1000 * 1000;
      const spyOnStop = spyOn(testComponent.countdown, 'stopTimer');
      testComponent.value = beforeTime;

      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      expect(countdownEl.nativeElement.querySelector('.ant-statistic-content-value').innerText).toBe('00:00:00');
      expect(spyOnStop).toHaveBeenCalledTimes(1);
    }));

    it('should support template', fakeAsync(() => {
      testComponent.resetWithTemplate();
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();

      expect(countdownEl.nativeElement.querySelector('.ant-statistic-content-value').innerText).toBe('172829900');
      testComponent.countdown.stopTimer();
    }));

    it('should stop timer and emit event', fakeAsync(() => {
      const nearTime = new Date().getTime() + 1000 * 2;
      testComponent.value = nearTime;

      fixture.detectChanges();
      tick(3000);
      fixture.detectChanges();
      expect(testComponent.finished).toBe(1);
    }));
  });
});

@Component({
  template: `
    <nz-countdown
      [nzTitle]="'Countdown'"
      [nzValue]="value"
      [nzFormat]="format"
      [nzValueTemplate]="template"
      (nzCountdownFinish)="onFinish()"
    >
    </nz-countdown>
    <ng-template #tpl let-diff>
      {{ diff }}
    </ng-template>
  `
})
export class NzTestCountdownComponent {
  @ViewChild(NzCountdownComponent, { static: true }) countdown!: NzCountdownComponent;
  @ViewChild('tpl', { static: true }) tpl!: TemplateRef<number>;

  format?: string;
  value?: number;
  template?: TemplateRef<number>;
  finished = 0;

  resetTimerWithFormat(format: string): void {
    this.format = format;
    this.value = new Date().getTime() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  }

  resetWithTemplate(): void {
    this.template = this.tpl;
    this.value = new Date().getTime() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;
  }

  onFinish(): void {
    this.finished += 1;
  }
}
