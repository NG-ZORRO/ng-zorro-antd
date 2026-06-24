/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { NzConfigService } from 'ng-zorro-antd/core/config';
import { testDirectionality } from 'ng-zorro-antd/core/testing';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzSpinComponent } from './spin.component';
import { NzSpinModule } from './spin.module';

describe('spin', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestSpinBasicComponent>;
    let testComponent: NzTestSpinBasicComponent;
    let spin: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSpinBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      spin = fixture.debugElement.query(By.directive(NzSpinComponent));
    });

    it('should className correct', () => {
      expect(spin.nativeElement.querySelector('.ant-spin').firstElementChild!.classList).toContain('ant-spin-dot');
    });

    it('should size work', () => {
      testComponent.size.set('small');
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-sm');
      testComponent.size.set('large');
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-lg');
    });

    it('should spinning work', () => {
      testComponent.spinning.set(false);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeNull();
      testComponent.spinning.set(true);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeDefined();
    });

    it('should indicator work', () => {
      testComponent.indicator.set(testComponent.indicatorTemplate);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-dot')).toBeNull();
      expect(spin.nativeElement.querySelector('.anticon-loading')).toBeDefined();
    });

    it('should global config indicator work', () => {
      testComponent.nzConfigService.set('spin', { nzIndicator: testComponent.indicatorTemplate });
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-dot')).toBeNull();
      expect(spin.nativeElement.querySelector('.anticon-loading')).toBeDefined();
    });

    it('should delay work', () => {
      vi.useFakeTimers();
      testComponent.delay.set(500);

      // true -> false
      // This should work immediately
      testComponent.spinning.set(false);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeNull();

      // false -> true
      // This should be debounced
      testComponent.spinning.set(true);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeNull();

      vi.advanceTimersByTime(500);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeDefined();
      vi.useRealTimers();
    });

    it('should wrapper work', () => {
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-spinning');
      expect(spin.nativeElement.querySelector('.ant-spin-container')).toBeDefined();
      testComponent.simple.set(true);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-container')).toBeNull();
    });

    it('should tip work', () => {
      expect(spin.nativeElement.querySelector('.ant-spin-text')).toBeNull();
      testComponent.tip.set('tip');
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-text').innerText).toBe('tip');
    });
  });

  testDirectionality(() => NzTestSpinBasicComponent, By.css('.ant-spin'), 'ant-spin');
});

@Component({
  selector: 'nz-test-basic-spin',
  imports: [NzIconModule, NzSpinModule],
  template: `
    <ng-template #indicatorTemplate><nz-icon nzType="loading" style="font-size: 24px;" /></ng-template>
    <nz-spin
      [nzTip]="tip()"
      [nzSize]="size()"
      [nzDelay]="delay()"
      [nzSpinning]="spinning()"
      [nzSimple]="simple()"
      [nzIndicator]="indicator()"
    >
      <div>test</div>
    </nz-spin>
  `
})
export class NzTestSpinBasicComponent {
  public readonly nzConfigService = inject(NzConfigService);

  @ViewChild('indicatorTemplate', { static: false }) indicatorTemplate!: TemplateRef<void>;

  readonly size = signal<NzSizeLDSType>('default');
  readonly delay = signal(0);
  readonly spinning = signal(true);
  readonly indicator = signal<TemplateRef<NzSafeAny> | null>(undefined!);
  readonly tip = signal<string | null>(null);
  readonly simple = signal(false);
}
