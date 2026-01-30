/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, provideZoneChangeDetection, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzSpinComponent } from './spin.component';
import { NzSpinModule } from './spin.module';

describe('spin', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideZoneChangeDetection()]
    });
  });

  describe('spin basic', () => {
    let fixture: ComponentFixture<NzTestSpinBasicComponent>;
    let testComponent: NzTestSpinBasicComponent;
    let spin: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSpinBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      spin = fixture.debugElement.query(By.directive(NzSpinComponent));
    });

    it('should className correct', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').firstElementChild!.classList).toContain('ant-spin-dot');
    }));

    it('should size work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-sm');
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-lg');
    }));

    it('should spinning work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.spinning = false;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeNull();
      testComponent.spinning = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeDefined();
    }));

    it('should indicator work', () => {
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-dot')).toBeDefined();

      testComponent.indicator = testComponent.indicatorTemplate;
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-dot')).toBeNull();
      expect(spin.nativeElement.querySelector('.anticon-loading')).toBeDefined();
    });

    it('should global config indicator work', () => {
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-dot')).toBeDefined();

      testComponent.nzConfigService.set('spin', { nzIndicator: testComponent.indicatorTemplate });
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-dot')).toBeNull();
      expect(spin.nativeElement.querySelector('.anticon-loading')).toBeDefined();
    });

    it('should delay work', fakeAsync(() => {
      testComponent.delay = 500;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      // true -> false
      // This should work immediately
      testComponent.spinning = false;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeNull();

      // false -> true
      // This should be debounced
      testComponent.spinning = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeNull();

      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeDefined();
    }));

    it('should wrapper work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-spinning');
      expect(spin.nativeElement.querySelector('.ant-spin-container')).toBeDefined();
      testComponent.simple = true;
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-container')).toBeNull();
    }));

    it('should tip work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-text')).toBeNull();
      testComponent.tip = 'tip';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-text').innerText).toBe('tip');
    }));
  });

  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(NzTestSpinRtlComponent);
      const spin = fixture.debugElement.query(By.directive(NzSpinComponent));
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).not.toContain('ant-spin-rtl');
    });
  });
});

@Component({
  selector: 'nz-test-basic-spin',
  imports: [NzIconModule, NzSpinModule],
  template: `
    <ng-template #indicatorTemplate><nz-icon nzType="loading" style="font-size: 24px;" /></ng-template>
    <nz-spin
      [nzTip]="tip"
      [nzSize]="size"
      [nzDelay]="delay"
      [nzSpinning]="spinning"
      [nzSimple]="simple"
      [nzIndicator]="indicator"
    >
      <div>test</div>
    </nz-spin>
  `
})
export class NzTestSpinBasicComponent {
  @ViewChild('indicatorTemplate', { static: false }) indicatorTemplate!: TemplateRef<void>;

  size: NzSizeLDSType = 'default';
  delay = 0;
  spinning = true;
  indicator!: TemplateRef<NzSafeAny>;
  tip!: string;
  simple = false;

  constructor(public nzConfigService: NzConfigService) {}
}

@Component({
  imports: [BidiModule, NzTestSpinBasicComponent],
  template: `
    <div [dir]="direction">
      <nz-test-basic-spin />
    </div>
  `
})
export class NzTestSpinRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}
