/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzNoAnimationDirective, provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { testDirectionality, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NgStyleInterface, NzSizeDSType } from 'ng-zorro-antd/core/types';

import { NzBadgeComponent } from './badge.component';
import { NzBadgeModule } from './badge.module';
import { badgePresetColors } from './preset-colors';
import { NzRibbonComponent } from './ribbon.component';
import { NzBadgeStatusType } from './types';

describe('badge', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
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
      testComponent.count.set(10);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-multiple-words');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[0].innerText).toBe('1');
      expect(badgeElement.nativeElement.querySelectorAll('.current')[1].innerText).toBe('0');
    });

    it('should title work', () => {
      testComponent.overflow.set(99);
      testComponent.count.set(1000);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').getAttribute('title')).toBe('1000');
      testComponent.title.set('test');
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').getAttribute('title')).toBe('test');
    });

    it('should be no title attribute when `nzTitle` is null', () => {
      testComponent.title.set(null);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').getAttribute('title')).toBeFalsy();
    });

    it('should offset work', () => {
      testComponent.offset.set([10, 10]);
      fixture.detectChanges();
      const style = getComputedStyle(badgeElement.nativeElement.querySelector('nz-badge-sup'));
      expect(style.right).toBe('-10px');
      expect(style.marginTop).toBe('10px');
    });

    it('should overflow work', () => {
      testComponent.overflow.set(4);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').innerText).toBe('4+');
      testComponent.overflow.set(99);
      testComponent.count.set(100);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').innerText).toBe('99+');
      testComponent.overflow.set(99);
      testComponent.count.set(99);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').innerText).not.toBe('99+');
    });

    it('should showZero work', async () => {
      testComponent.count.set(0);
      fixture.detectChanges();
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup')).toBeNull();
      testComponent.showZero.set(true);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    });

    it('should negative number not display', async () => {
      testComponent.count.set(-10);
      fixture.detectChanges();
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup')).toBeNull();
      testComponent.showZero.set(true);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.current').innerText).toBe('0');
    });

    it('should dot work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).not.toContain('ant-badge-dot');
      testComponent.dot.set(true);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-dot');
    });

    it('should no wrapper work', async () => {
      testComponent.standalone.set(true);
      testComponent.style.set({ backgroundColor: '#52c41a' });
      fixture.detectChanges();
      await updateNonSignalsInput(fixture);
      fixture.detectChanges();
      badgeElement = fixture.debugElement.query(By.directive(NzBadgeComponent));
      expect(badgeElement.nativeElement.classList).toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').style.backgroundColor).toBe('rgb(82, 196, 26)');
    });

    it('should disable animation for inner elements when `noAnimation` is `true` ', async () => {
      testComponent.noAnimation.set(true);
      fixture.detectChanges();
      await updateNonSignalsInput(fixture);
      expect(badgeElement.nativeElement.classList).toContain('nz-animate-disabled');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup .ant-scroll-number-only').classList).toContain(
        'nz-animate-disabled'
      );
      fixture.detectChanges();
    });

    it('should status work', () => {
      testComponent.standalone.set(true);
      testComponent.count.set(0);
      const statusList = ['success', 'processing', 'default', 'error', 'warning'];
      statusList.forEach(status => {
        testComponent.status.set(status);
        fixture.detectChanges();
        expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot').classList).toContain(
          `ant-badge-status-${status}`
        );
      });
      testComponent.text.set('test');
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-text').innerText).toBe('test');
    });

    it('should size work', () => {
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-count');
      testComponent.size.set('small');
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').classList).toContain('ant-badge-count-sm');
    });

    it('should set presetColor of nzColor change', () => {
      const color = badgePresetColors[0];
      const component: NzBadgeComponent = badgeElement.componentInstance;

      testComponent.color.set(color);
      fixture.detectChanges();
      expect(component.presetColor).toEqual(color);

      testComponent.color.set(undefined);
      fixture.detectChanges();
      expect(component.presetColor).toEqual(null);
    });

    it('should display correct of nzColor related change', () => {
      let color: string | undefined;
      testComponent.standalone.set(true);
      testComponent.count.set(0);
      testComponent.status.set('success');
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot').classList).toContain(
        `ant-badge-status-success`
      );
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-text').innerText).toBe('');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup')).toBeNull();

      testComponent.status.set('');
      testComponent.text.set('test');
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot')).toBeNull();
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-text')).toBeNull();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup')).toBeNull();

      color = 'blue';
      testComponent.color.set(color);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot').classList).toContain(
        `ant-badge-status-${color}`
      );
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-text').innerText).toBe('test');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup')).toBeNull();

      testComponent.standalone.set(false);
      color = '#f5222d';
      testComponent.color.set(color);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot').classList).not.toContain(
        `ant-badge-status-`
      );
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot').style.backgroundColor).toBe(
        'rgb(245, 34, 45)'
      );
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-text').innerText).toBe('test');
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup')).toBeNull();

      testComponent.text.set('');
      testComponent.showZero.set(true);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).not.toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot')).toBeNull();
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-text')).toBeNull();

      testComponent.count.set(5);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.classList).not.toContain('ant-badge-not-a-wrapper');
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot')).toBeNull();
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-text')).toBeNull();
    });

    it('should hex nzColor work', () => {
      testComponent.count.set(0);
      testComponent.color.set('#f5222d');
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot').style.backgroundColor).toBe(
        'rgb(245, 34, 45)'
      );

      testComponent.count.set(5);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').style.backgroundColor).toBe('rgb(245, 34, 45)');
    });

    it('should nzStyle work even if nzColor is not provided', () => {
      testComponent.color.set(undefined);
      testComponent.status.set('success'); // must set nzStatus to make sure status dot is rendered
      testComponent.style.set({ backgroundColor: '#52c41a' });
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('nz-badge-sup').style.backgroundColor).toBe('rgb(82, 196, 26)');

      testComponent.standalone.set(true);
      testComponent.count.set(0);
      fixture.detectChanges();
      expect(badgeElement.nativeElement.querySelector('.ant-badge-status-dot').style.backgroundColor).toBe(
        'rgb(82, 196, 26)'
      );
    });
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

    it('should set presetColor on nzColor change', async () => {
      const color = badgePresetColors[0];
      fixture.componentRef.setInput('nzColor', color);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.presetColor).toEqual(color);

      fixture.componentRef.setInput('nzColor', undefined);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(component.presetColor).toEqual(null);
    });
  });

  testDirectionality(() => NzTestBadgeBasicComponent, By.directive(NzBadgeComponent), 'ant-badge');
});

@Component({
  imports: [NzNoAnimationDirective, NzBadgeModule],
  template: `
    <nz-badge
      [nzCount]="count()"
      [nzStatus]="status()"
      [nzText]="text()"
      [nzShowZero]="showZero()"
      [nzOverflowCount]="overflow()"
      [nzNoAnimation]="noAnimation()"
      [nzStyle]="style()"
      [nzDot]="dot()"
      [nzOffset]="offset()"
      [nzTitle]="title()"
      [nzStandalone]="standalone()"
      [nzSize]="size()"
      [nzColor]="color()"
    >
      @if (!standalone()) {
        <a></a>
      }
    </nz-badge>
  `
})
export class NzTestBadgeBasicComponent {
  readonly count = signal(5);
  readonly dot = signal(false);
  readonly standalone = signal(false);
  readonly overflow = signal(20);
  readonly showZero = signal(false);
  readonly status = signal<NzBadgeStatusType | string | undefined>(undefined);
  readonly style = signal<NgStyleInterface | null>(null);
  readonly text = signal<string | undefined>(undefined);
  readonly title = signal<string | null | undefined>(undefined);
  readonly offset = signal<[number, number] | undefined>(undefined);
  readonly size = signal<NzSizeDSType>('default');
  readonly noAnimation = signal(true);
  readonly color = signal<string | undefined>(undefined);
}
