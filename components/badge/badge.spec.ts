/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, SimpleChange, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { badgePresetColors } from 'ng-zorro-antd/badge/preset-colors';
import { NzRibbonComponent } from 'ng-zorro-antd/badge/ribbon.component';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NgStyleInterface, NzSizeDSType } from 'ng-zorro-antd/core/types';

import { NzBadgeComponent } from './badge.component';
import { NzBadgeModule } from './badge.module';

describe('nz-badge', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAnimationsAsync()]
    });
  });

  describe('basic', () => {
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
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-scroll-number');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-count');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).not.toContain(
        'ant-badge-multiple-words'
      );
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('5');
      testComponent.count = 10;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-multiple-words');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[0].innerText).toBe('1');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[1].innerText).toBe('0');
    });

    it('should title work', () => {
      testComponent.overflow = 99;
      testComponent.count = 1000;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').getAttribute('title')).toBe('1000');
      testComponent.title = 'test';
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').getAttribute('title')).toBe('test');
    });

    it('should be no title attribute when `nzTitle` is null', () => {
      testComponent.title = null;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').getAttribute('title')).toBeFalsy();
    });

    it('should offset work', () => {
      testComponent.offset = [10, 10];
      fixture.detectChanges();
      const style = getComputedStyle(badgeElement.nativeElement.querySelector('nz-badge-sup'));
      expect(style.right).toBe('-10px');
      expect(style.marginTop).toBe('10px');
    });

    it('should overflow work', () => {
      testComponent.overflow = 4;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').innerText).toBe('4+');
      testComponent.overflow = 99;
      testComponent.count = 100;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').innerText).toBe('99+');
      testComponent.overflow = 99;
      testComponent.count = 99;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').innerText).not.toBe('99+');
    });

    it('should showZero work', fakeAsync(() => {
      testComponent.count = 0;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup')).toBeNull();
      testComponent.showZero = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    }));

    it('should negative number not display', fakeAsync(() => {
      testComponent.count = -10;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup')).toBeNull();
      testComponent.showZero = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    }));

    it('should dot work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).not.toContain('ant-badge-dot');
      testComponent.dot = true;
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-dot');
    });

    it('should no wrapper work', fakeAsync(() => {
      testComponent.inner = false;
      testComponent.style = { backgroundColor: '#52c41a' };
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      badgeElement = fixture.debugElement.query(By.directive(NzBadgeComponent));
      expect(badgeElement.nativeElement.classList).toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').style.backgroundColor).toBe('rgb(82, 196, 26)');
    }));

    it('should disable animation for inner elements when `noAnimation` is `true` ', fakeAsync(() => {
      testComponent.noAnimation = true;
      fixture.detectChanges();
      tick(1000);
      expect(badgeElement.nativeElement.classList).toContain('nz-animate-disabled');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup .ant-scroll-number-only').classList).toContain(
        'nz-animate-disabled'
      );
      fixture.detectChanges();
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

    it('should size work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-count');
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-count-sm');
    });

    it('should set presetColor of nzColor change', fakeAsync(() => {
      let color: string | undefined;
      const fixture = TestBed.createComponent(NzBadgeComponent);
      const component = fixture.componentInstance;
      fixture.detectChanges();

      color = badgePresetColors[0];
      component.nzColor = color;
      component.ngOnChanges({
        nzColor: new SimpleChange(undefined, color, false)
      });
      tick();
      expect(component.presetColor).toEqual(color);

      color = undefined;
      component.nzColor = color;
      component.ngOnChanges({
        nzColor: new SimpleChange(undefined, color, false)
      });
      tick();
      expect(component.presetColor).toEqual(null);
    }));
  });

  describe('ribbon', () => {
    let fixture: ComponentFixture<NzRibbonComponent>;
    let component: NzRibbonComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzRibbonComponent);
      component = fixture.componentInstance;
    });

    it('default value for nzPlacement', () => {
      expect(component.nzPlacement).toEqual('end');
    });

    it('default value for nzText', () => {
      expect(component.nzText).toEqual(null);
    });

    it('default value for presetColor', () => {
      expect(component.presetColor).toEqual(null);
    });

    it('should set presetColor on nzColor change', fakeAsync(() => {
      let color: string | undefined;

      color = badgePresetColors[1];

      component.nzColor = color;
      component.ngOnChanges({
        nzColor: new SimpleChange(undefined, color, false)
      });
      tick();
      expect(component.presetColor).toEqual(color);

      color = undefined;
      component.nzColor = color;
      component.ngOnChanges({
        nzColor: new SimpleChange(undefined, color, false)
      });
      tick();
      expect(component.presetColor).toEqual(null);
    }));
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzTestBadgeRtlComponent>;
    let badge: DebugElement;
    let badgeElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestBadgeRtlComponent);
      badge = fixture.debugElement.query(By.directive(NzBadgeComponent));
      fixture.detectChanges();
      badgeElement = badge.nativeElement;
    });

    it('should pagination className correct on dir change', () => {
      fixture.detectChanges();
      expect(badgeElement.classList).toContain('ant-badge-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(badgeElement.classList).not.toContain('ant-badge-rtl');
    });
  });
});

@Component({
  imports: [NzNoAnimationDirective, NzBadgeModule],
  template: `
    <nz-badge
      [nzCount]="count"
      [nzStatus]="status"
      [nzText]="text"
      [nzShowZero]="showZero"
      [nzOverflowCount]="overflow"
      [nzNoAnimation]="noAnimation"
      [nzStyle]="style"
      [nzDot]="dot"
      [nzOffset]="offset"
      [nzTitle]="title"
      [nzStandalone]="!inner"
      [nzSize]="size"
    >
      @if (inner) {
        <a></a>
      }
    </nz-badge>
  `
})
export class NzTestBadgeBasicComponent {
  count = 5;
  dot = false;
  inner = true;
  overflow = 20;
  showZero = false;
  status!: string;
  style!: NgStyleInterface;
  text!: string;
  title?: string | null;
  offset?: [number, number];
  size: NzSizeDSType = 'default';
  noAnimation = true;
}

@Component({
  imports: [BidiModule, NzBadgeModule],
  template: `
    <div [dir]="direction">
      <nz-badge [nzCount]="count"></nz-badge>
    </div>
  `
})
export class NzTestBadgeRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
  count = 5;
}
