import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NzRadioModule } from 'ng-zorro-antd/radio';

import { NzDemoTimelineLabelComponent } from './demo/label';
import { NzTimelineComponent } from './timeline.component';
import { NzTimelineModule } from './timeline.module';

describe('nz-timeline', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestTimelineBasicComponent>;
    let fixture: ComponentFixture<NzTestTimelineBasicComponent>;
    let testComponent: NzTestTimelineBasicComponent;
    let timeline: DebugElement;
    let items: HTMLDivElement[] = [];

    beforeEach(() => {
      testBed = createComponentBed(NzTestTimelineBasicComponent, {
        imports: [NzTimelineModule]
      });
      fixture = testBed.fixture;
      testComponent = testBed.component;

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
      expect(timeline.nativeElement.firstElementChild.firstElementChild!.classList).toContain(
        'ant-timeline-item-pending'
      );
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

  // add another test component for simplicity
  it('should custom position work', () => {
    let testBed: ComponentBed<NzTestTimelineCustomPositionComponent>;
    let fixture: ComponentFixture<NzTestTimelineCustomPositionComponent>;
    let timeline: DebugElement;
    let items: HTMLDivElement[] = [];

    testBed = createComponentBed(NzTestTimelineCustomPositionComponent, {
      imports: [NzTimelineModule]
    });
    fixture = testBed.fixture;

    fixture.detectChanges();

    timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
    items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.ant-timeline-item'));
    // console.log(fixture.debugElement.nativeElement.outerHTML);

    expect(timeline.nativeElement.firstElementChild!.classList).toContain('ant-timeline-alternate');
    expect(items[0].classList).toContain('ant-timeline-item-right');
  });

  describe('custom color', () => {
    let testBed: ComponentBed<NzTestTimelineCustomColorComponent>;
    let fixture: ComponentFixture<NzTestTimelineCustomColorComponent>;
    let items: HTMLLIElement[];

    beforeEach(() => {
      testBed = createComponentBed(NzTestTimelineCustomColorComponent, {
        imports: [NzTimelineModule]
      });
      fixture = testBed.fixture;

      fixture.detectChanges();

      items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.ant-timeline-item'));
    });

    it('should support custom color', () => {
      fixture.detectChanges();
      expect((items[0].querySelector('.ant-timeline-item-head') as HTMLDivElement)!.style.borderColor).toBe('cyan');
      expect((items[1].querySelector('.ant-timeline-item-head') as HTMLDivElement)!.style.borderColor).toBe(
        'rgb(200, 0, 0)'
      );
      expect((items[2].querySelector('.ant-timeline-item-head') as HTMLDivElement)!.style.borderColor).toBe(
        'rgb(120, 18, 65)'
      ); // hex would be converted to rgb()
      expect((items[3].querySelector('.ant-timeline-item-head') as HTMLDivElement)!.style.borderColor).toBe('');
    });
  });

  describe('pending', () => {
    let testBed: ComponentBed<NzTestTimelinePendingComponent>;
    let fixture: ComponentFixture<NzTestTimelinePendingComponent>;
    let timeline: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestTimelinePendingComponent, {
        imports: [NzTimelineModule]
      });
      fixture = testBed.fixture;

      fixture.detectChanges();

      timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
    });

    it('should pending work', () => {
      fixture.detectChanges();
      expect(timeline.nativeElement.querySelector('.ant-timeline-item-pending').innerText).toBe('template');
    });
  });

  describe('label', () => {
    let testBed: ComponentBed<NzDemoTimelineLabelComponent>;
    let fixture: ComponentFixture<NzDemoTimelineLabelComponent>;
    let timeline: DebugElement;
    let items: HTMLLIElement[];

    beforeEach(() => {
      testBed = createComponentBed(NzDemoTimelineLabelComponent, {
        imports: [NzTimelineModule, NzRadioModule]
      });
      fixture = testBed.fixture;

      fixture.detectChanges();

      timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
      items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.ant-timeline-item'));
    });

    it('should label work', () => {
      expect(timeline.nativeElement.firstElementChild!.classList).toContain('ant-timeline-label');
      expect(items[0].firstElementChild!.classList).toContain('ant-timeline-item-label');
      expect(items[2].firstElementChild!.classList).not.toContain('ant-timeline-item-label');
    });

    it('should mode right not affecting classnames', () => {
      fixture.componentInstance.mode = 'right';
      fixture.detectChanges();

      expect(timeline.nativeElement.firstElementChild!.classList).not.toContain('ant-timeline-right');
    });
  });

  describe('RTL', () => {
    let testBed: ComponentBed<NzTestTimelineRtlComponent>;
    let fixture: ComponentFixture<NzTestTimelineRtlComponent>;
    let timeline: DebugElement;
    let items: HTMLDivElement[] = [];

    beforeEach(
      waitForAsync(() => {
        testBed = createComponentBed(NzTestTimelineRtlComponent, {
          imports: [BidiModule, NzTimelineModule],
          declarations: [NzTestTimelineBasicComponent]
        });

        fixture = testBed.fixture;

        fixture.detectChanges();

        timeline = fixture.debugElement.query(By.directive(NzTimelineComponent));
        items = Array.from((fixture.debugElement.nativeElement as HTMLElement).querySelectorAll('.ant-timeline-item'));
      })
    );

    it('should init className correct', () => {
      expect(timeline.nativeElement.firstElementChild!.classList).toContain('ant-timeline-rtl');
      expect(items.length).toBeGreaterThan(0);

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(timeline.nativeElement.firstElementChild!.classList).not.toContain('ant-timeline-rtl');
    });
  });

  describe('clear', () => {
    let testBed: ComponentBed<NzTestTimelineClearItemsComponent>;
    let fixture: ComponentFixture<NzTestTimelineClearItemsComponent>;
    let timeline: NzTimelineComponent;

    beforeEach(() => {
      testBed = createComponentBed(NzTestTimelineClearItemsComponent, {
        imports: [NzTimelineModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      timeline = fixture.componentInstance.nzTimeLine;
    });

    it('test clear items', () => {
      fixture.componentInstance.reset();
      fixture.detectChanges();
      expect(timeline.timelineItems.length).toBe(0);
    });
  });
});

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-basic-timeline',
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

@Component({
  template: `
    <nz-timeline nzMode="custom">
      <nz-timeline-item nzPosition="right">Right</nz-timeline-item>
      <nz-timelint-item nzPosition="left">Left</nz-timelint-item>
    </nz-timeline>
  `
})
export class NzTestTimelineCustomPositionComponent {}

@Component({
  template: `
    <div [dir]="direction">
      <nz-test-basic-timeline></nz-test-basic-timeline>
    </div>
  `
})
export class NzTestTimelineRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}

@Component({
  template: `
    <nz-timeline nzMode="custom">
      <nz-timeline-item *ngFor="let item of data">{{ item }}</nz-timeline-item>
    </nz-timeline>
    <span (click)="reset()">reset</span>
  `
})
export class NzTestTimelineClearItemsComponent {
  @ViewChild(NzTimelineComponent)
  nzTimeLine!: NzTimelineComponent;
  data = [1, 2, 3];
  reset(): void {
    this.data = [];
  }
}
