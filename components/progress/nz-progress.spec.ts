import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzProgressComponent } from './nz-progress.component';
import { NzProgressModule } from './nz-progress.module';

describe('progress', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzProgressModule ],
      declarations: [ NzTestProgressLineComponent, NzTestProgressDashBoardComponent, NzTestProgressCircleComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('progress line', () => {
    let fixture;
    let testComponent;
    let progress;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestProgressLineComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      progress = fixture.debugElement.query(By.directive(NzProgressComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.className).toBe('ant-progress ant-progress-status-normal ant-progress-line ant-progress-show-info');
    });
    it('should percent work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-bg').style.cssText).toBe('width: 0%; height: 8px;');
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('0%');
      testComponent.percent = 50;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-bg').style.cssText).toBe('width: 50%; height: 8px;');
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('50%');
      testComponent.percent = 100;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-bg').style.cssText).toBe('width: 100%; height: 8px;');
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('');
      expect(progress.nativeElement.querySelector('.anticon-check-circle')).toBeDefined();
    });
    it('should successPercent', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-success-bg').style.cssText).toBe('width: 0%; height: 8px;');
      testComponent.successPercent = 50;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-success-bg').style.cssText).toBe('width: 50%; height: 8px;');
    });
    it('should format work', () => {
      testComponent.format = (percent) => `${percent} percent`;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('0 percent');
      testComponent.percent = 100;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('100 percent');
    });
    it('should status work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.classList).toContain('ant-progress-status-normal');
      const listOfStatus = [ 'success', 'exception', 'active', 'normal' ];
      testComponent.percent = 100;
      listOfStatus.forEach(status => {
        testComponent.status = status;
        fixture.detectChanges();
        expect(progress.nativeElement.firstElementChild.classList).toContain(`ant-progress-status-${status}`);
      });
    });
    it('should showInfo work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.classList).toContain('ant-progress-show-info');
      expect(progress.nativeElement.querySelector('.ant-progress-text')).toBeDefined();
      testComponent.showInfo = false;
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.classList).not.toContain('ant-progress-show-info');
      expect(progress.nativeElement.querySelector('.ant-progress-text')).toBeNull();
    });
    it('should strokeWidth work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-bg').style.cssText).toBe('width: 0%; height: 8px;');
      expect(progress.nativeElement.querySelector('.ant-progress-success-bg').style.cssText).toBe('width: 0%; height: 8px;');
      testComponent.strokeWidth = 6;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-bg').style.cssText).toBe('width: 0%; height: 6px;');
      expect(progress.nativeElement.querySelector('.ant-progress-success-bg').style.cssText).toBe('width: 0%; height: 6px;');
    });
    it('should size work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-bg').style.cssText).toBe('width: 0%; height: 8px;');
      expect(progress.nativeElement.querySelector('.ant-progress-success-bg').style.cssText).toBe('width: 0%; height: 8px;');
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.classList).toContain('ant-progress-small');
      expect(progress.nativeElement.querySelector('.ant-progress-bg').style.cssText).toBe('width: 0%; height: 6px;');
      expect(progress.nativeElement.querySelector('.ant-progress-success-bg').style.cssText).toBe('width: 0%; height: 6px;');
    });
  });
  describe('progress dashboard', () => {
    let fixture;
    let testComponent;
    let progress;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestProgressDashBoardComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      progress = fixture.debugElement.query(By.directive(NzProgressComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.className).toBe('ant-progress ant-progress-status-normal ant-progress-show-info ant-progress-circle');
    });
    it('should format work', () => {
      testComponent.format = (percent) => `${percent} percent`;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('0 percent');
      testComponent.percent = 100;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('100 percent');
    });
    it('should showInfo work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.classList).toContain('ant-progress-show-info');
      expect(progress.nativeElement.querySelector('.ant-progress-text')).toBeDefined();
      testComponent.showInfo = false;
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.classList).not.toContain('ant-progress-show-info');
      expect(progress.nativeElement.querySelector('.ant-progress-text')).toBeNull();
    });
    it('should percent work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('0%');
      testComponent.percent = 50;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('50%');
      testComponent.percent = 100;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-text').innerText.trim()).toBe('');
      expect(progress.nativeElement.querySelector('.anticon-check-circle')).toBeDefined();
    });
    it('should width work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-inner').style.cssText).toBe('width: 132px; height: 132px; font-size: 25.8px;');
      testComponent.width = 100;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-inner').style.cssText).toBe('width: 100px; height: 100px; font-size: 21px;');
    });
    it('should strokeWidth work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-trail').attributes.getNamedItem('stroke-width').value).toBe('6');
      testComponent.strokeWidth = 10;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-trail').attributes.getNamedItem('stroke-width').value).toBe('10');
    });
  });
  describe('progress circle', () => {
    let fixture;
    let testComponent;
    let progress;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestProgressCircleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      progress = fixture.debugElement.query(By.directive(NzProgressComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.firstElementChild.className).toBe('ant-progress ant-progress-status-normal ant-progress-show-info ant-progress-circle');
    });
    it('should gapDegree work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-path').style.strokeDashoffset).toBe('0px');
      testComponent.gapDegree = 120;
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-path').style.strokeDashoffset).toBe('-60px');
    });
    it('should gapPosition work', () => {
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-path').attributes.getNamedItem('d').value).toBe(`M 50,50 m 0,-47\n     a 47,47 0 1 1 0,94\n     a 47,47 0 1 1 0,-94`);
      testComponent.gapPosition = 'left';
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-path').attributes.getNamedItem('d').value).toBe(`M 50,50 m -47,0\n     a 47,47 0 1 1 94,0\n     a 47,47 0 1 1 -94,0`);
      testComponent.gapPosition = 'right';
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-path').attributes.getNamedItem('d').value).toBe(`M 50,50 m 47,0\n     a 47,47 0 1 1 -94,0\n     a 47,47 0 1 1 94,0`);
      testComponent.gapPosition = 'bottom';
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-path').attributes.getNamedItem('d').value).toBe(`M 50,50 m 0,47\n     a 47,47 0 1 1 0,-94\n     a 47,47 0 1 1 0,94`);
      testComponent.gapPosition = 'top';
      fixture.detectChanges();
      expect(progress.nativeElement.querySelector('.ant-progress-circle-path').attributes.getNamedItem('d').value).toBe(`M 50,50 m 0,-47\n     a 47,47 0 1 1 0,94\n     a 47,47 0 1 1 0,-94`);
    });
  });
});

@Component({
  selector: 'nz-test-progress-line',
  template: `
    <nz-progress
      [nzSize]="size"
      [nzSuccessPercent]="successPercent"
      [nzFormat]="format"
      [nzStatus]="status"
      [nzShowInfo]="showInfo"
      [nzStrokeWidth]="strokeWidth"
      [nzPercent]="percent">
    </nz-progress>
  `
})
export class NzTestProgressLineComponent {
  size;
  status;
  format;
  strokeWidth;
  percent = 0;
  successPercent = 0;
  showInfo = true;
}

@Component({
  selector: 'nz-test-progress-dashboard',
  template: `
    <nz-progress
      nzType="dashboard"
      [nzWidth]="width"
      [nzFormat]="format"
      [nzStatus]="status"
      [nzShowInfo]="showInfo"
      [nzStrokeWidth]="strokeWidth"
      [nzPercent]="percent">
    </nz-progress>
  `
})
export class NzTestProgressDashBoardComponent {
  status;
  format;
  strokeWidth;
  percent = 0;
  successPercent = 0;
  showInfo = true;
  width = 132;
}

@Component({
  selector: 'nz-test-progress-circle',
  template: `
    <nz-progress
      nzType="circle"
      [nzGapDegree]="gapDegree"
      [nzGapPosition]="gapPosition">
    </nz-progress>
  `
})
export class NzTestProgressCircleComponent {
  gapDegree;
  gapPosition;
}
