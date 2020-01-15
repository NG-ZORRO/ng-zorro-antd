import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTimelineComponent } from './timeline.component';
import { NzTimelineModule } from './timeline.module';

describe('timeline', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzTimelineModule],
      declarations: [NzTestTimelineBasicComponent, NzTestTimelinePendingComponent, NzTestTimelineCustomColorComponent]
    });
    TestBed.compileComponents();
  }));
  describe('basic timeline', () => {
    let fixture: ComponentFixture<NzTestTimelineBasicComponent>;
    let testComponent: NzTestTimelineBasicComponent;
    let timeline: DebugElement;
    let items: HTMLDivElement[] = [];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimelineBasicComponent);
      testComponent = fixture.debugElement.componentInstance;

      fixture.detectChanges();

      timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
      items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.ant-timeline-item'));
    });

    it('should init className correct', () => {
      expect(timeline.nativeElement.firstElementChild!.classList).toContain('ant-timeline');
      expect(items.length).toBeGreaterThan(0);
      expect(items[0].classList).not.toContain('ant-timeline-item-last');
      expect(items[3].classList).toContain('ant-timeline-item-last');
    });

    it('should color work', () => {
      fixture.detectChanges();
      expect(items[0].querySelector('.ant-timeline-item-head')!.classList).toContain('ant-timeline-item-head-blue');
      testComponent.color = 'red';
      fixture.detectChanges();
      expect(items[0].querySelector('.ant-timeline-item-head')!.classList).toContain('ant-timeline-item-head-red');
      testComponent.color = 'green';
      fixture.detectChanges();
      expect(items[0].querySelector('.ant-timeline-item-head')!.classList).toContain('ant-timeline-item-head-green');
    });

    it('should dot work', () => {
      fixture.detectChanges();
      expect((items[0].querySelector('.ant-timeline-item-head') as HTMLDivElement).innerText).toBe('dot');
      expect((items[1].querySelector('.ant-timeline-item-head') as HTMLDivElement).innerText).toBe('template');
    });

    it('should last work', () => {
      fixture.detectChanges();
      expect(items.length).toBe(4);
      testComponent.last = true;
      fixture.detectChanges();
      items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.ant-timeline-item'));
      expect(items.length).toBe(5);
      expect(items[4]!.classList).toContain('ant-timeline-item-last');
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
    it('should reverse work', () => {
      fixture.detectChanges();
      testComponent.pending = true;
      testComponent.reverse = true;
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild.firstElementChild!.classList).toContain('ant-timeline-item-pending');
      expect(items[0].classList).toContain('ant-timeline-item-last');
      expect(items[3].classList).not.toContain('ant-timeline-item-last');
    });
    it('should alternate position work', () => {
      fixture.detectChanges();
      testComponent.mode = 'alternate';
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild!.classList).toContain('ant-timeline-alternate');
      expect(items[0].classList).toContain('ant-timeline-item-left');
      expect(items[1].classList).toContain('ant-timeline-item-right');
      expect(items[2].classList).toContain('ant-timeline-item-left');
    });
    it('should alternate right position work', () => {
      fixture.detectChanges();
      testComponent.mode = 'right';
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild!.classList).toContain('ant-timeline-right');
      expect(items[0].classList).toContain('ant-timeline-item-right');
      expect(items[1].classList).toContain('ant-timeline-item-right');
      expect(items[2].classList).toContain('ant-timeline-item-right');
    });
  });

  describe('custom color timeline', () => {
    let fixture: ComponentFixture<NzTestTimelineCustomColorComponent>;
    let items: HTMLLIElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimelineCustomColorComponent);
      fixture.detectChanges();
      items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.ant-timeline-item'));
    });

    it('should support custom color', () => {
      fixture.detectChanges();
      expect((items[0].querySelector('.ant-timeline-item-head') as HTMLDivElement)!.style.borderColor).toBe('cyan');
      expect((items[1].querySelector('.ant-timeline-item-head') as HTMLDivElement)!.style.borderColor).toBe('rgb(200, 0, 0)');
      expect((items[2].querySelector('.ant-timeline-item-head') as HTMLDivElement)!.style.borderColor).toBe('rgb(120, 18, 65)'); // hex would be converted to rgb()
      expect((items[3].querySelector('.ant-timeline-item-head') as HTMLDivElement)!.style.borderColor).toBe('');
    });
  });

  describe('pending timeline', () => {
    let fixture: ComponentFixture<NzTestTimelinePendingComponent>;
    let timeline: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTimelinePendingComponent);
      timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
    });
    it('should pending work', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.ant-timeline-item-pending').innerText).toBe('template');
    });
  });
});

@Component({
  template: `
    <ng-template #dotTemplate>template</ng-template>
    <nz-timeline [nzPending]="pending" [nzReverse]="reverse" [nzMode]="mode">
      <nz-timeline-item [nzColor]="color" [nzDot]="dot">Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzDot]="dotTemplate">Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
      <nz-timeline-item *ngIf="last">Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>
  `
})
export class NzTestTimelineBasicComponent {
  color = 'blue';
  dot = 'dot';
  pending: boolean | string = false;
  last = false;
  reverse = false;
  mode = 'left';
}

@Component({
  template: `
    <nz-timeline>
      <nz-timeline-item [nzColor]="'cyan'">Create a services site 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzColor]="'rgb(200, 0, 0)'">Solve initial network problems 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzColor]="'#781241'">Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item [nzColor]="'red'">Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>
  `
})
export class NzTestTimelineCustomColorComponent {}

@Component({
  template: `
    <ng-template #pendingTemplate>template</ng-template>
    <nz-timeline [nzPending]="pendingTemplate">
      <nz-timeline-item>Technical testing 2015-09-01</nz-timeline-item>
      <nz-timeline-item>Network problems being solved 2015-09-01</nz-timeline-item>
    </nz-timeline>
  `
})
export class NzTestTimelinePendingComponent {}
