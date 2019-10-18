import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzConfigService } from 'ng-zorro-antd/core';
import { NzSpinComponent } from './nz-spin.component';
import { NzSpinModule } from './nz-spin.module';

describe('spin', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzSpinModule, NzIconTestModule],
      declarations: [NzTestSpinBasicComponent]
    });
    TestBed.compileComponents();
  }));

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
      console.log(spin.nativeElement);
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
    })

    it('should delay work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.delay = 500;
      testComponent.spinning = false;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeDefined();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin')).toBeNull();
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
});

@Component({
  template: `
    <ng-template #indicatorTemplate><i nz-icon nzType="loading" style="font-size: 24px;"></i> </ng-template>
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
  @ViewChild('indicatorTemplate', { static: false }) indicatorTemplate: TemplateRef<void>;

  size = 'default';
  delay = 0;
  spinning = true;
  indicator: TemplateRef<void>;
  tip: string;
  simple = false;

  constructor(public nzConfigService: NzConfigService) {}
}
