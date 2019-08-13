import { Component, DebugElement } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NgStyleInterface } from 'ng-zorro-antd/core';

import { NzBadgeComponent } from './nz-badge.component';
import { NzBadgeModule } from './nz-badge.module';

describe('badge', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzBadgeModule, NoopAnimationsModule],
      declarations: [NzTestBadgeBasicComponent]
    });
    TestBed.compileComponents();
  }));

  describe('basic badge', () => {
    let fixture: ComponentFixture<NzTestBadgeBasicComponent>;
    let testComponent: NzTestBadgeBasicComponent;
    let badgeElement: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestBadgeBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      badgeElement = fixture.debugElement.query(By.directive(NzBadgeComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).toContain('ant-badge');
    });

    it('should count work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').classList).toContain('ant-scroll-number');
      expect(badgeElement.nativeElement.querySelector('sup').classList).toContain('ant-badge-count');
      expect(badgeElement.nativeElement.querySelector('sup').classList).not.toContain('ant-badge-multiple-words');
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('5');
      testComponent.count = 10;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').classList).toContain('ant-badge-multiple-words');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[0].innerText).toBe('1');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[1].innerText).toBe('0');
    });

    it('should title work', () => {
      testComponent.overflow = 99;
      testComponent.count = 1000;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').getAttribute('title')).toBe('1000');
      testComponent.title = 'test';
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').getAttribute('title')).toBe('test');
    });

    it('should offset work', () => {
      testComponent.offset = [10, 10];
      fixture.detectChanges();
      const style = getComputedStyle(badgeElement.nativeElement.querySelector('sup'));
      expect(style.right).toBe('-10px');
      expect(style.marginTop).toBe('10px');
    });

    it('should overflow work', () => {
      testComponent.overflow = 4;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').innerText).toBe('4+');
      testComponent.overflow = 99;
      testComponent.count = 100;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').innerText).toBe('99+');
      testComponent.overflow = 99;
      testComponent.count = 99;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').innerText).not.toBe('99+');
    });

    it('should showZero work', fakeAsync(() => {
      testComponent.count = 0;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup')).toBeNull();
      testComponent.showZero = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    }));

    it('should negative number not display', fakeAsync(() => {
      testComponent.count = -10;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup')).toBeNull();
      testComponent.showZero = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    }));

    it('should dot work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').classList).not.toContain('ant-badge-dot');
      testComponent.dot = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('sup').classList).toContain('ant-badge-dot');
    });

    it('should no wrapper work', fakeAsync(() => {
      testComponent.inner = false;
      testComponent.style = { backgroundColor: '#52c41a' };
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      badgeElement = fixture.debugElement.query(By.directive(NzBadgeComponent));
      //      TODO: fix next line error
      //      expect(badgeElement.nativeElement.classList).toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('sup').style.backgroundColor).toBe('rgb(82, 196, 26)');
    }));

    it('should status work', () => {
      testComponent.inner = false;
      const statusList = ['success', 'processing', 'default', 'error', 'warning'];
      statusList.forEach(status => {
        testComponent.status = status;
        fixture.detectChanges();
        expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot').classList).toContain(
          `ant-badge-status-${status}`
        );
      });
      testComponent.text = 'test';
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-text').innerText).toBe('test');
    });
  });
});

@Component({
  template: `
    <nz-badge
      [nzCount]="count"
      [nzStatus]="status"
      [nzText]="text"
      [nzShowZero]="showZero"
      [nzOverflowCount]="overflow"
      [nzStyle]="style"
      [nzDot]="dot"
      [nzOffset]="offset"
      [nzTitle]="title"
    >
      <a *ngIf="inner"></a>
    </nz-badge>
  `
})
export class NzTestBadgeBasicComponent {
  count = 5;
  dot = false;
  inner = true;
  overflow = 20;
  showZero = false;
  status: string;
  style: NgStyleInterface;
  text: string;
  title: string;
  offset: [number, number];
}
