/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzAlertMarqueeComponent } from './alert-marquee.component';
import { NzAlertModule } from './alert.module';

describe('NzAlertMarqueeComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  });

  describe('structure', () => {
    let fixture: ComponentFixture<NzTestMarqueeBasicComponent>;
    let marquee: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestMarqueeBasicComponent);
      marquee = fixture.debugElement.query(By.directive(NzAlertMarqueeComponent));
      fixture.autoDetectChanges();
      await fixture.whenStable();
    });

    it('should render the marquee container', () => {
      expect(marquee.nativeElement.querySelector('.ant-alert-marquee')).not.toBeNull();
    });

    it('should render exactly two tracks inside the container', () => {
      const tracks = marquee.nativeElement.querySelectorAll('.ant-alert-marquee-track');
      expect(tracks.length).toBe(2);
    });

    it('should project content into the first track', () => {
      const tracks = marquee.nativeElement.querySelectorAll('.ant-alert-marquee-track');
      expect(tracks[0].textContent.trim()).toContain('Scrolling message');
    });

    it('should clone content into the second track', () => {
      const tracks = marquee.nativeElement.querySelectorAll('.ant-alert-marquee-track');
      expect(tracks[1].textContent.trim()).toContain('Scrolling message');
    });

    it('should set aria-hidden="true" on the second track for accessibility', () => {
      const tracks = marquee.nativeElement.querySelectorAll('.ant-alert-marquee-track');
      expect(tracks[1].getAttribute('aria-hidden')).toBe('true');
    });

    it('should not set aria-hidden on the first track', () => {
      const tracks = marquee.nativeElement.querySelectorAll('.ant-alert-marquee-track');
      expect(tracks[0].hasAttribute('aria-hidden')).toBeFalse();
    });
  });

  describe('nzSpeed', () => {
    let fixture: ComponentFixture<NzTestMarqueeBasicComponent>;
    let marquee: DebugElement;

    beforeEach(async () => {
      spyOnProperty(HTMLElement.prototype, 'offsetWidth', 'get').and.returnValue(500);
      fixture = TestBed.createComponent(NzTestMarqueeBasicComponent);
      marquee = fixture.debugElement.query(By.directive(NzAlertMarqueeComponent));
      fixture.autoDetectChanges();
      await fixture.whenStable();
    });

    it('should calculate duration as trackWidth divided by nzSpeed', () => {
      const tracks = marquee.nativeElement.querySelectorAll('.ant-alert-marquee-track');
      // 500px / 50px/s = 10s
      expect(tracks[0].style.animationDuration).toBe('10s');
    });

    it('should apply a custom animation duration via nzSpeed', () => {
      fixture.componentInstance.speed.set(100);
      fixture.detectChanges();
      const tracks = marquee.nativeElement.querySelectorAll('.ant-alert-marquee-track');
      // 500px / 100px/s = 5s
      expect(tracks[0].style.animationDuration).toBe('5s');
    });

    it('should coerce nzSpeed string attribute to a number', () => {
      fixture.componentInstance.speed.set(25);
      fixture.detectChanges();
      const tracks = marquee.nativeElement.querySelectorAll('.ant-alert-marquee-track');
      // 500px / 25px/s = 20s
      expect(tracks[0].style.animationDuration).toBe('20s');
    });
  });

  describe('nzPauseOnHover', () => {
    let fixture: ComponentFixture<NzTestMarqueeBasicComponent>;
    let marquee: DebugElement;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestMarqueeBasicComponent);
      marquee = fixture.debugElement.query(By.directive(NzAlertMarqueeComponent));
      fixture.autoDetectChanges();
      await fixture.whenStable();
    });

    it('should not apply the pause-on-hover class by default', () => {
      const container = marquee.nativeElement.querySelector('.ant-alert-marquee');
      expect(container.classList).not.toContain('ant-alert-marquee-pause-on-hover');
    });

    it('should apply the pause-on-hover class when nzPauseOnHover is true', () => {
      fixture.componentInstance.pauseOnHover.set(true);
      fixture.detectChanges();
      const container = marquee.nativeElement.querySelector('.ant-alert-marquee');
      expect(container.classList).toContain('ant-alert-marquee-pause-on-hover');
    });

    it('should remove the pause-on-hover class when nzPauseOnHover is toggled back to false', () => {
      fixture.componentInstance.pauseOnHover.set(true);
      fixture.detectChanges();
      fixture.componentInstance.pauseOnHover.set(false);
      fixture.detectChanges();
      const container = marquee.nativeElement.querySelector('.ant-alert-marquee');
      expect(container.classList).not.toContain('ant-alert-marquee-pause-on-hover');
    });
  });

  describe('used inside nz-alert', () => {
    let fixture: ComponentFixture<NzTestMarqueeInsideAlertComponent>;

    beforeEach(async () => {
      fixture = TestBed.createComponent(NzTestMarqueeInsideAlertComponent);
      fixture.autoDetectChanges();
      await fixture.whenStable();
    });

    it('should render inside the alert message area', () => {
      expect(fixture.nativeElement.querySelector('.ant-alert-message .ant-alert-marquee')).not.toBeNull();
    });

    it('should render the marquee track inside the alert', () => {
      expect(fixture.nativeElement.querySelector('.ant-alert-message .ant-alert-marquee-track')).not.toBeNull();
    });

    it('should work correctly alongside nzBanner', () => {
      expect(fixture.nativeElement.querySelector('.ant-alert-banner')).not.toBeNull();
      expect(fixture.nativeElement.querySelector('.ant-alert-marquee')).not.toBeNull();
    });

    it('should project content into the track when used inside nz-alert', () => {
      const track = fixture.nativeElement.querySelector('.ant-alert-marquee-track') as HTMLElement;
      expect(track.textContent.trim()).toContain('Loop banner text');
    });
  });
});

@Component({
  imports: [NzAlertModule],
  template: `
    <nz-alert-marquee [nzPauseOnHover]="pauseOnHover()" [nzSpeed]="speed()"> Scrolling message </nz-alert-marquee>
  `
})
export class NzTestMarqueeBasicComponent {
  readonly pauseOnHover = signal(false);
  readonly speed = signal(50);
}

@Component({
  imports: [NzAlertModule],
  template: `
    <nz-alert nzBanner [nzMessage]="message" />
    <ng-template #message>
      <nz-alert-marquee>Loop banner text</nz-alert-marquee>
    </ng-template>
  `
})
export class NzTestMarqueeInsideAlertComponent {}
