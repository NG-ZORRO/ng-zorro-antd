import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconModule } from '../icon/nz-icon.module';

import { NzSpinComponent } from './nz-spin.component';
import { NzSpinModule } from './nz-spin.module';

describe('spin', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzSpinModule, NzIconModule ],
      declarations: [ NzTestSpinBasicComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('spin basic', () => {
    let fixture;
    let testComponent;
    let spin;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSpinBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      spin = fixture.debugElement.query(By.directive(NzSpinComponent));
    });
    it('should className correct', async(() => {
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').firstElementChild.classList).toContain('ant-spin-dot');
    }));
    it('should size work', async(() => {
      fixture.detectChanges();
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-sm');
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-lg');
    }));
    it('should spinning work', async(() => {
      fixture.detectChanges();
      testComponent.spinning = false;
      fixture.whenStable().then(() => {
        expect(spin.nativeElement.querySelector('.ant-spin').classList).not.toContain('ant-spin-spinning');
        testComponent.spinning = true;
        fixture.detectChanges();
        expect(spin.nativeElement.querySelector('.ant-spin').classList).toContain('ant-spin-spinning');
      });
    }));
    it('should indicator work', () => {
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-dot')).toBeDefined();
      testComponent.indicator = testComponent.indicatorTemplate;
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-dot')).toBeNull();
      expect(spin.nativeElement.querySelector('.anticon-loading')).toBeDefined();
    });
    it('should delay work', async(() => {
      testComponent.delay = 500;
      fixture.detectChanges();
      testComponent.spinning = false;
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin').classList).not.toContain('ant-spin-spinning');
    }));
    it('should wrapper work', async(() => {
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-container').style.display).toBe('none');
      // testComponent.wrapper = true;
      // fixture.detectChanges();
      // TODO: fix next line error
      // fixture.whenStable().then(() => {
      //  expect(spin.nativeElement.querySelector('.ant-spin-container').attributes.getNamedItem('hidden')).toBeNull();
      // });
    }));
    it('should tip work', async(() => {
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-text')).toBeNull();
      testComponent.tip = 'tip';
      fixture.detectChanges();
      expect(spin.nativeElement.querySelector('.ant-spin-text').innerText).toBe('tip');
    }));
  });
});

@Component({
  selector: 'nz-test-spin-basic',
  template: `
    <ng-template #indicatorTemplate><i nz-icon type="loading" style="font-size: 24px;"></i>
    </ng-template>
    <nz-spin
      [nzTip]="tip"
      [nzSize]="size"
      [nzDelay]="delay"
      [nzSpinning]="spinning"
      [nzIndicator]="indicator">
      <div *ngIf="wrapper">test</div>
    </nz-spin>`
})
export class NzTestSpinBasicComponent {
  @ViewChild('indicatorTemplate') indicatorTemplate: TemplateRef<void>;
  size = 'default';
  delay;
  spinning = true;
  indicator;
  tip;
  wrapper = false;
}
