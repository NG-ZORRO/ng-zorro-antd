import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzStepComponent } from './nz-step.component';
import { NzStepsComponent } from './nz-steps.component';
import { NzStepsModule } from './nz-steps.module';

describe('steps', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzStepsModule ],
      declarations: [ NzTestOuterStepsComponent, NzTestInnerStepStringComponent, NzTestInnerStepTemplateComponent, NzTestStepForComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('outer steps', () => {
    let fixture;
    let testComponent;
    let outStep;
    let innerSteps;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestOuterStepsComponent);
      testComponent = fixture.debugElement.componentInstance;
      outStep = fixture.debugElement.query(By.directive(NzStepsComponent));
      innerSteps = fixture.debugElement.queryAll(By.directive(NzStepComponent));
    });
    it('should init className correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.className).toBe('ant-steps ant-steps-horizontal ant-steps-label-horizontal');
      expect(innerSteps[ 0 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-process');
      expect(innerSteps[ 1 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
      expect(innerSteps[ 2 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
    }));
    it('should current change correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.current = 1;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-finish');
      expect(innerSteps[ 1 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-process');
      expect(innerSteps[ 2 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
    }));
    it('should tail display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.firstElementChild.classList.contains('ant-steps-item-tail')).toBe(true);
      expect(innerSteps[ 1 ].nativeElement.firstElementChild.classList.contains('ant-steps-item-tail')).toBe(true);
      expect(innerSteps[ 2 ].nativeElement.firstElementChild.classList.contains('ant-steps-item-tail')).toBe(false);
    }));
    it('should title correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('0title');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('1title');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('2title');
    });
    it('should description correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('0description');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('1description');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('2description');
    });
    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-item-icon').firstElementChild.classList.contains('ant-steps-icon')).toBe(true);
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-item-icon').firstElementChild.classList.contains('ant-steps-icon')).toBe(true);
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-item-icon').firstElementChild.classList.contains('ant-steps-icon')).toBe(true);
    });
    it('should size display correct', () => {
      fixture.detectChanges();
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.className).toBe('ant-steps ant-steps-horizontal ant-steps-label-horizontal ant-steps-small');
    });
    it('should direction display correct', () => {
      fixture.detectChanges();
      testComponent.direction = 'vertical';
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.className).toBe('ant-steps ant-steps-vertical');
    });
    it('should status display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.status = 'wait';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
      testComponent.status = 'finish';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-finish');
      testComponent.status = 'error';
      testComponent.current = 1;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[ 1 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-error');
      expect(innerSteps[ 0 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-finish ant-steps-next-error');
    }));
    it('should processDot display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.progressDot = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.classList.contains('ant-steps-dot')).toBe(true);
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.classList.contains('ant-steps-icon-dot')).toBe(true);
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.classList.contains('ant-steps-icon-dot')).toBe(true);
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.classList.contains('ant-steps-icon-dot')).toBe(true);
    }));
    it('should processDot template display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.progressDot = testComponent.progressTemplate;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.classList.contains('ant-steps-dot')).toBe(true);
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.innerText).toBe('process0');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.innerText).toBe('wait1');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.innerText).toBe('wait2');
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-icon').lastElementChild.classList.contains('ant-steps-icon-dot')).toBe(true);
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-icon').lastElementChild.classList.contains('ant-steps-icon-dot')).toBe(true);
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-icon').lastElementChild.classList.contains('ant-steps-icon-dot')).toBe(true);
    }));
    it('should support custom starting index', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.startIndex = 3;
      testComponent.current = 3;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-process');
      expect(innerSteps[ 1 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
      expect(innerSteps[ 2 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-icon').innerText).toBe('4');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-icon').innerText).toBe('5');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-icon').innerText).toBe('6');
    }));
  });
  describe('inner step string', () => {
    let fixture;
    let testComponent;
    let outStep;
    let innerSteps;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInnerStepStringComponent);
      testComponent = fixture.debugElement.componentInstance;
      outStep = fixture.debugElement.query(By.directive(NzStepsComponent));
      innerSteps = fixture.debugElement.queryAll(By.directive(NzStepComponent));
    });
    it('should status display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-process ant-steps-custom');
      expect(innerSteps[ 1 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-process ant-steps-custom');
      expect(innerSteps[ 2 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-process ant-steps-custom');
      testComponent.status = 'wait';
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait ant-steps-custom');
      expect(innerSteps[ 1 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait ant-steps-custom');
      expect(innerSteps[ 2 ].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait ant-steps-custom');
    });
    it('should title display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('title');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('title');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('title');
    });
    it('should description display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('description');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('description');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('description');
    });
    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-user');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-user');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-user');
    });
  });
  describe('inner step template', () => {
    let fixture;
    let testComponent;
    let outStep;
    let innerSteps;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInnerStepTemplateComponent);
      testComponent = fixture.debugElement.componentInstance;
      outStep = fixture.debugElement.query(By.directive(NzStepsComponent));
      innerSteps = fixture.debugElement.queryAll(By.directive(NzStepComponent));
    });
    it('should title display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('titleTemplate');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('titleTemplate');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-item-title').innerText).toBe('titleTemplate');
    });
    it('should description display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('descriptionTemplate');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('descriptionTemplate');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-item-description').innerText).toBe('descriptionTemplate');
    });
    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[ 0 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-smile-o');
      expect(innerSteps[ 1 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-smile-o');
      expect(innerSteps[ 2 ].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-smile-o');
    });
  });
  describe('step ng for', () => {
    it('should title display correct', () => {
      TestBed.createComponent(NzTestStepForComponent).detectChanges();
    });
    it('should push works correct', () => {
      const comp = TestBed.createComponent(NzTestStepForComponent);
      comp.detectChanges();
      comp.debugElement.componentInstance.updateSteps();
      comp.detectChanges();
    });
  });
});

@Component({
  selector: 'nz-test-outer-steps',
  template: `
    <nz-steps [nzCurrent]="current" [nzDirection]="direction" [nzSize]="size" [nzStatus]="status" [nzProgressDot]="progressDot" [nzStartIndex]="startIndex">
      <nz-step nzTitle="0title" nzDescription="0description"></nz-step>
      <nz-step nzTitle="1title" nzDescription="1description"></nz-step>
      <nz-step nzTitle="2title" nzDescription="2description"></nz-step>
    </nz-steps>
    <ng-template #progressTemplate let-dot let-status="status" let-index="index">
      <span class="insert-span">{{status}}{{index}}</span>
      <ng-template [ngTemplateOutlet]="dot"></ng-template>
    </ng-template>
  `
})
export class NzTestOuterStepsComponent {
  @ViewChild('progressTemplate') progressTemplate: TemplateRef<void>;
  current = 0;
  direction = 'horizontal';
  size = 'default';
  status = 'process';
  progressDot = false;
  startIndex = 0;
}

@Component({
  selector: 'nz-test-inner-step-string',
  template: `
    <nz-steps [nzCurrent]="current">
      <nz-step [nzTitle]="title" [nzDescription]="description" [nzIcon]="icon" [nzStatus]="status"></nz-step>
      <nz-step [nzTitle]="title" [nzDescription]="description" [nzIcon]="icon" [nzStatus]="status"></nz-step>
      <nz-step [nzTitle]="title" [nzDescription]="description" [nzIcon]="icon" [nzStatus]="status"></nz-step>
    </nz-steps>
    <ng-template #titleTemplate>titleTemplate</ng-template>
    <ng-template #descriptionTemplate>descriptionTemplate</ng-template>
    <ng-template #iconTemplate><i class="anticon anticon-smile-o"></i></ng-template>
  `
})
export class NzTestInnerStepStringComponent {
  @ViewChild('titleTemplate') titleTemplate: TemplateRef<void>;
  @ViewChild('descriptionTemplate') descriptionTemplate: TemplateRef<void>;
  @ViewChild('iconTemplate') iconTemplate: TemplateRef<void>;
  status = 'process';
  current = 1;
  icon = 'anticon anticon-user';
  title = 'title';
  description = 'description';
}

@Component({
  selector: 'nz-test-inner-step-template',
  template: `
    <nz-steps [nzCurrent]="1">
      <nz-step [nzTitle]="titleTemplate" [nzDescription]="descriptionTemplate" [nzIcon]="iconTemplate"></nz-step>
      <nz-step [nzTitle]="titleTemplate" [nzDescription]="descriptionTemplate" [nzIcon]="iconTemplate"></nz-step>
      <nz-step [nzTitle]="titleTemplate" [nzDescription]="descriptionTemplate" [nzIcon]="iconTemplate"></nz-step>
    </nz-steps>
    <ng-template #titleTemplate>titleTemplate</ng-template>
    <ng-template #descriptionTemplate>descriptionTemplate</ng-template>
    <ng-template #iconTemplate><i class="anticon anticon-smile-o"></i></ng-template>
  `
})
export class NzTestInnerStepTemplateComponent {
}

@Component({
  selector: 'nz-test-step-for',
  template: `
    <nz-steps>
      <nz-step *ngFor="let step of steps"></nz-step>
    </nz-steps>
  `
})
export class NzTestStepForComponent {
  steps = [ 1, 2, 3 ];

  updateSteps(): void {
    this.steps.push(4);
  }
}
