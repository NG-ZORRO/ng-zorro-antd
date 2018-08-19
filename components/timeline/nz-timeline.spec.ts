import { Component } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTimelineItemComponent } from './nz-timeline-item.component';
import { NzTimelineComponent } from './nz-timeline.component';
import { NzTimelineModule } from './nz-timeline.module';

describe('timeline', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzTimelineModule ],
      declarations: [ NzTestTimelineBasicComponent, NzTestTimelinePendingComponent, NzTestTimelineCustomColorComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic timeline', () => {
    let fixture;
    let testComponent;
    let timeline;
    let items;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimelineBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
      items = fixture.debugElement.queryAll(By.directive(NzTimelineItemComponent));
    });
    it('should init className correct', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild.classList).toContain('ant-timeline');
      expect(items.every(item => item.nativeElement.firstElementChild.classList.contains('ant-timeline-item'))).toBe(true);
      expect(items[ 0 ].nativeElement.firstElementChild.classList).not.toContain('ant-timeline-item-last');
      expect(items[ 3 ].nativeElement.firstElementChild.classList).toContain('ant-timeline-item-last');
    });
    it('should color work', () => {
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.ant-timeline-item-head').classList).toContain('ant-timeline-item-head-blue');
      testComponent.color = 'red';
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.ant-timeline-item-head').classList).toContain('ant-timeline-item-head-red');
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.ant-timeline-item-head').classList).toContain('ant-timeline-item-head-green');
    });
    it('should dot work', () => {
      fixture.detectChanges();
      expect(items[ 0 ].nativeElement.querySelector('.ant-timeline-item-head').innerText).toBe('dot');
      expect(items[ 1 ].nativeElement.querySelector('.ant-timeline-item-head').innerText).toBe('template');
    });
    it('should last work', () => {
      fixture.detectChanges();
      expect(items.length).toBe(4);
      testComponent.last = true;
      fixture.detectChanges();
      items = fixture.debugElement.queryAll(By.directive(NzTimelineItemComponent));
      expect(items.length).toBe(5);
      expect(items[ 4 ].nativeElement.firstElementChild.classList).toContain('ant-timeline-item-last');
    });
    it('should pending work', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.ant-timeline-item-pending')).toBeNull();
      testComponent.pending = true;
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.ant-timeline-item-pending').innerText).toBe('');
      testComponent.pending = 'pending';
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.ant-timeline-item-pending').innerText).toBe('pending');
    });
  });
  describe('custom color timeline', () => {
    let fixture;
    let testComponent;
    let timeline;
    let items;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimelineCustomColorComponent);
      testComponent = fixture.debugElement.componentInstance;
      timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
      items = fixture.debugElement.queryAll(By.directive(NzTimelineItemComponent));
    });
    it('should support custom color', () => {
      fixture.detectChanges();
      expect(items[0].nativeElement.querySelector('.ant-timeline-item-head').style.borderColor).toBe('grey');
      expect(items[1].nativeElement.querySelector('.ant-timeline-item-head').style.borderColor).toBe('rgb(200, 0, 0)');
      expect(items[2].nativeElement.querySelector('.ant-timeline-item-head').style.borderColor).toBe('rgb(120, 18, 65)'); // hex would be converted to rgb()
      expect(items[3].nativeElement.querySelector('.ant-timeline-item-head').style.borderColor).toBe('');
    });
  });
  describe('pending timeline', () => {
    let fixture;
    let testComponent;
    let timeline;
    let items;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimelinePendingComponent);
      testComponent = fixture.debugElement.componentInstance;
      timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
      items = fixture.debugElement.queryAll(By.directive(NzTimelineItemComponent));
    });
    it('should pending work', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.ant-timeline-item-pending').innerText).toBe('template');
    });
  });
});

@Component({
  selector: 'nz-test-timeline-basic',
  template: `
    <ng-template #dotTemplate>template</ng-template>
    <nz-timeline [nzPending]="pending">
      <nz-timeline-item [nzColor]="color" [nzDot]="dot">Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzDot]="dotTemplate">Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
      <nz-timeline-item *ngIf="last">Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>`
})
export class NzTestTimelineBasicComponent {
  color = 'blue';
  dot = 'dot';
  pending = false;
  last = false;
}

@Component({
  selector: 'nz-test-timeline-custom-color',
  template: `
    <nz-timeline>
      <nz-timeline-item [nzColor]="'grey'">Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzColor]="'rgb(200, 0, 0)'">Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzColor]="'#781241'">Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzColor]="'red'">Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>`
})
export class NzTestTimelineCustomColorComponent {
}

@Component({
  selector: 'nz-test-timeline-pending',
  template: `
    <ng-template #pendingTemplate>template</ng-template>
    <nz-timeline [nzPending]="pendingTemplate">
      <nz-timeline-item>Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>`
})
export class NzTestTimelinePendingComponent {
}
