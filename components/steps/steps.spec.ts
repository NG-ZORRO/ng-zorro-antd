import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DebugElement, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzDemoStepsClickableComponent } from './demo/clickable';

import { NzDemoStepsNavComponent } from './demo/nav';
import { NzStepComponent } from './step.component';
import { NzStepsComponent } from './steps.component';
import { NzStepsModule } from './steps.module';

describe('steps', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NzStepsModule, NzIconTestModule, NzDividerModule],
        declarations: [
          NzTestOuterStepsComponent,
          NzDemoStepsClickableComponent,
          NzTestInnerStepStringComponent,
          NzTestInnerStepTemplateComponent,
          NzTestStepForComponent,
          NzTestStepAsyncComponent,
          NzDemoStepsNavComponent
        ]
      });
      TestBed.compileComponents();
    })
  );
  describe('outer steps', () => {
    let fixture: ComponentFixture<NzTestOuterStepsComponent>;
    let testComponent: NzTestOuterStepsComponent;
    let outStep: DebugElement;
    let innerSteps: DebugElement[];

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
      expect(innerSteps[0].nativeElement.className).toBe('ant-steps-item ant-steps-item-active ant-steps-item-process');
      expect(innerSteps[1].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
      expect(innerSteps[2].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
    }));

    it('should current change correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.current = 1;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.className).toBe('ant-steps-item ant-steps-item-finish');
      expect(innerSteps[1].nativeElement.className).toBe('ant-steps-item ant-steps-item-process ant-steps-item-active');
      expect(innerSteps[2].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
    }));

    it('should tail display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-item-tail')).toBeTruthy();
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-item-tail')).toBeTruthy();
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-item-tail')).toBeFalsy();
    }));

    it('should title correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('0title');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('1title');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('2title');
    });

    it('should subtitle correct', () => {
      testComponent.subtitle = '0subtitle';
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-item-subtitle').innerText.trim()).toBe('0subtitle');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-item-subtitle')).toBeFalsy();
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-item-subtitle')).toBeFalsy();
      testComponent.subtitle = null;
      fixture.detectChanges();
    });

    it('should description correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('0description');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('1description');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('2description');
    });

    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(
        innerSteps[0].nativeElement.querySelector('.ant-steps-item-icon').firstElementChild!.classList.contains('ant-steps-icon')
      ).toBe(true);
      expect(
        innerSteps[1].nativeElement.querySelector('.ant-steps-item-icon').firstElementChild!.classList.contains('ant-steps-icon')
      ).toBe(true);
      expect(
        innerSteps[2].nativeElement.querySelector('.ant-steps-item-icon').firstElementChild!.classList.contains('ant-steps-icon')
      ).toBe(true);
    });

    it('should size display correct', () => {
      fixture.detectChanges();
      testComponent.size = 'small';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.className).toBe(
        'ant-steps ant-steps-horizontal ant-steps-label-horizontal ant-steps-small'
      );
    });

    it('should direction display correct', () => {
      fixture.detectChanges();
      testComponent.direction = 'vertical';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild.className).toBe('ant-steps ant-steps-vertical');
    });

    it('should label placement display correct', () => {
      fixture.detectChanges();
      testComponent.labelPlacement = 'vertical';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild!.classList).toContain('ant-steps-label-vertical');
    });

    it('should status display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.status = 'wait';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.className).toBe('ant-steps-item ant-steps-item-active ant-steps-item-wait');
      testComponent.status = 'finish';
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.className).toBe('ant-steps-item ant-steps-item-active ant-steps-item-finish');
      testComponent.status = 'error';
      testComponent.current = 1;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[1].nativeElement.className).toBe('ant-steps-item ant-steps-item-error ant-steps-item-active');
      expect(innerSteps[0].nativeElement.className).toBe('ant-steps-item ant-steps-item-finish ant-steps-next-error');
    }));

    it('should processDot display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.progressDot = true;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild!.classList.contains('ant-steps-dot')).toBe(true);
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-icon').firstElementChild!.classList.contains('ant-steps-icon-dot')).toBe(
        true
      );
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-icon').firstElementChild!.classList.contains('ant-steps-icon-dot')).toBe(
        true
      );
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-icon').firstElementChild!.classList.contains('ant-steps-icon-dot')).toBe(
        true
      );
    }));

    it('should processDot template display correct', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.progressDot = testComponent.progressTemplate!;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(outStep.nativeElement.firstElementChild!.classList.contains('ant-steps-dot')).toBe(true);
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-icon').firstElementChild.innerText.trim()).toBe('process0');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-icon').firstElementChild.innerText.trim()).toBe('wait1');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-icon').firstElementChild.innerText.trim()).toBe('wait2');
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-icon').lastElementChild.classList.contains('ant-steps-icon-dot')).toBe(
        true
      );
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-icon').lastElementChild.classList.contains('ant-steps-icon-dot')).toBe(
        true
      );
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-icon').lastElementChild.classList.contains('ant-steps-icon-dot')).toBe(
        true
      );
    }));

    it('should support custom starting index', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.startIndex = 3;
      testComponent.current = 3;
      testComponent.cdr.markForCheck();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.className).toBe('ant-steps-item ant-steps-item-active ant-steps-item-process');
      expect(innerSteps[1].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
      expect(innerSteps[2].nativeElement.className).toBe('ant-steps-item ant-steps-item-wait');
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-icon').innerText.trim()).toBe('4');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-icon').innerText.trim()).toBe('5');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-icon').innerText.trim()).toBe('6');
    }));
  });

  describe('inner step string', () => {
    let fixture: ComponentFixture<NzTestInnerStepStringComponent>;
    let testComponent: NzTestInnerStepStringComponent;
    let innerSteps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInnerStepStringComponent);
      testComponent = fixture.debugElement.componentInstance;
      innerSteps = fixture.debugElement.queryAll(By.directive(NzStepComponent));
    });

    it('should status display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.classList).toContain('ant-steps-item-process');
      expect(innerSteps[1].nativeElement.classList).toContain('ant-steps-item-process');
      expect(innerSteps[2].nativeElement.classList).toContain('ant-steps-item-process');
      testComponent.status = 'wait';
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.classList).toContain('ant-steps-item-wait');
      expect(innerSteps[1].nativeElement.classList).toContain('ant-steps-item-wait');
      expect(innerSteps[2].nativeElement.classList).toContain('ant-steps-item-wait');
    });

    it('should title display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('title');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('title');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('title');
    });

    it('should description display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('description');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('description');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('description');
    });

    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-user');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-user');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toBe('anticon anticon-user');
    });
  });

  describe('inner step template', () => {
    let fixture: ComponentFixture<NzTestInnerStepTemplateComponent>;
    let innerSteps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestInnerStepTemplateComponent);
      innerSteps = fixture.debugElement.queryAll(By.directive(NzStepComponent));
    });

    it('should title display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('titleTemplate');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('titleTemplate');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-item-title').innerText.trim()).toBe('titleTemplate');
    });

    it('should description display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('descriptionTemplate');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('descriptionTemplate');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-item-description').innerText.trim()).toBe('descriptionTemplate');
    });

    it('should icon display correct', () => {
      fixture.detectChanges();
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toContain('anticon-smile-o');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toContain('anticon-smile-o');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-icon').firstElementChild.className).toContain('anticon-smile-o');
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

  describe('step async assign steps', () => {
    it('should allow steps assigned asynchronously', fakeAsync(() => {
      const fixture: ComponentFixture<NzTestStepAsyncComponent> = TestBed.createComponent(NzTestStepAsyncComponent);
      let innerSteps: DebugElement[];

      fixture.detectChanges();
      innerSteps = fixture.debugElement.queryAll(By.directive(NzStepComponent));
      expect(innerSteps.length).toBe(0);

      tick(1000);
      fixture.detectChanges();
      tick();
      innerSteps = fixture.debugElement.queryAll(By.directive(NzStepComponent));
      fixture.detectChanges();
      expect(innerSteps.length).toBe(3);
      expect(innerSteps[0].nativeElement.className).toBe('ant-steps-item ant-steps-item-finish');
      expect(innerSteps[1].nativeElement.className).toBe('ant-steps-item ant-steps-item-active ant-steps-item-process');
      expect(innerSteps[0].nativeElement.querySelector('.ant-steps-icon').innerText.trim()).toBe('');
      expect(innerSteps[1].nativeElement.querySelector('.ant-steps-icon').innerText.trim()).toBe('2');
      expect(innerSteps[2].nativeElement.querySelector('.ant-steps-icon').innerText.trim()).toBe('3');
    }));
  });

  describe('step clickable', () => {
    let fixture: ComponentFixture<NzDemoStepsClickableComponent>;
    let testComponent: NzDemoStepsClickableComponent;
    let innerSteps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoStepsClickableComponent);
      testComponent = fixture.debugElement.componentInstance;
      innerSteps = fixture.debugElement.queryAll(By.directive(NzStepComponent));
    });

    it('should clickable', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      innerSteps
        .map(step => step.nativeElement.querySelector('.ant-steps-item-container'))
        .forEach((e: HTMLElement) => {
          expect(e.getAttribute('role')).toBe('button');
        });
    }));

    it('should output work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      spyOn(testComponent, 'onIndexChange');
      innerSteps[1].nativeElement.querySelector('.ant-steps-item-container').click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).toHaveBeenCalledWith(1);
    }));

    it('should disable work', fakeAsync(() => {
      testComponent.disable = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const step = innerSteps[0].nativeElement.querySelector('.ant-steps-item-container') as HTMLElement;
      expect(step.getAttribute('role')).not.toBe('button');
      spyOn(testComponent, 'onIndexChange');
      step.click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).not.toHaveBeenCalled();
    }));

    it("should can't click when status is process", fakeAsync(() => {
      testComponent.disable = false;
      testComponent.index = 0;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      spyOn(testComponent, 'onIndexChange');
      innerSteps[0].nativeElement.click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).not.toHaveBeenCalled();
    }));

    it('should enable and disable work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      innerSteps[1].componentInstance.disable();
      fixture.detectChanges();
      spyOn(testComponent, 'onIndexChange');
      innerSteps[1].nativeElement.querySelector('.ant-steps-item-container').click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).not.toHaveBeenCalled();
      innerSteps[1].componentInstance.enable();
      fixture.detectChanges();
      innerSteps[1].nativeElement.querySelector('.ant-steps-item-container').click();
      fixture.detectChanges();
      expect(testComponent.onIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.onIndexChange).toHaveBeenCalledWith(1);
    }));
  });

  describe('navigation', () => {
    let fixture: ComponentFixture<NzDemoStepsNavComponent>;
    let steps: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoStepsNavComponent);
      steps = fixture.debugElement.queryAll(By.directive(NzStepsComponent));
    });

    it('should clickable', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      steps
        .map(step => step.nativeElement.querySelector('.ant-steps'))
        .forEach((e: HTMLElement) => {
          expect(e.classList).toContain('ant-steps-navigation');
        });
    }));
  });
});

@Component({
  template: `
    <nz-steps
      [nzCurrent]="current"
      [nzDirection]="direction"
      [nzLabelPlacement]="labelPlacement"
      [nzSize]="size"
      [nzStatus]="status"
      [nzProgressDot]="progressDot"
      [nzStartIndex]="startIndex"
    >
      <nz-step nzTitle="0title" [nzSubtitle]="subtitle" nzDescription="0description"></nz-step>
      <nz-step nzTitle="1title" nzDescription="1description"></nz-step>
      <nz-step nzTitle="2title" nzDescription="2description"></nz-step>
    </nz-steps>
    <ng-template #progressTemplate let-dot let-status="status" let-index="index">
      <span class="insert-span">{{ status }}{{ index }}</span>
      <ng-template [ngTemplateOutlet]="dot"></ng-template>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzTestOuterStepsComponent {
  @ViewChild('progressTemplate', { static: false }) progressTemplate?: TemplateRef<void>;
  current = 0;
  direction = 'horizontal';
  labelPlacement = 'horizontal';
  size = 'default';
  status = 'process';
  subtitle: string | null = null;
  progressDot: boolean | TemplateRef<void> = false;
  startIndex = 0;
  constructor(public cdr: ChangeDetectorRef) {}
}

@Component({
  template: `
    <nz-steps [nzCurrent]="current">
      <nz-step [nzTitle]="title" [nzDescription]="description" [nzIcon]="icon" [nzStatus]="status"></nz-step>
      <nz-step [nzTitle]="title" [nzDescription]="description" [nzIcon]="icon" [nzStatus]="status"></nz-step>
      <nz-step [nzTitle]="title" [nzDescription]="description" [nzIcon]="icon" [nzStatus]="status"></nz-step>
    </nz-steps>
    <ng-template #titleTemplate>titleTemplate</ng-template>
    <ng-template #descriptionTemplate>descriptionTemplate</ng-template>
    <ng-template #iconTemplate><i nz-icon nzType="smile-o"></i></ng-template>
  `
})
export class NzTestInnerStepStringComponent {
  @ViewChild('titleTemplate', { static: false }) titleTemplate?: TemplateRef<void>;
  @ViewChild('descriptionTemplate', { static: false }) descriptionTemplate?: TemplateRef<void>;
  @ViewChild('iconTemplate', { static: false }) iconTemplate?: TemplateRef<void>;
  status = 'process';
  current = 1;
  icon = 'user';
  title = 'title';
  description = 'description';
}

@Component({
  template: `
    <nz-steps [nzCurrent]="1">
      <nz-step [nzTitle]="titleTemplate" [nzDescription]="descriptionTemplate" [nzIcon]="iconTemplate"></nz-step>
      <nz-step [nzTitle]="titleTemplate" [nzDescription]="descriptionTemplate" [nzIcon]="iconTemplate"></nz-step>
      <nz-step [nzTitle]="titleTemplate" [nzDescription]="descriptionTemplate" [nzIcon]="iconTemplate"></nz-step>
    </nz-steps>
    <ng-template #titleTemplate>titleTemplate</ng-template>
    <ng-template #descriptionTemplate>descriptionTemplate</ng-template>
    <ng-template #iconTemplate><i nz-icon nzType="smile-o"></i></ng-template>
  `
})
export class NzTestInnerStepTemplateComponent {}

@Component({
  template: `
    <nz-steps>
      <nz-step *ngFor="let step of steps; trackBy: trackById"></nz-step>
    </nz-steps>
  `
})
export class NzTestStepForComponent {
  steps = [1, 2, 3];

  trackById(index: number): number {
    return index;
  }

  updateSteps(): void {
    this.steps.push(4);
  }
}

@Component({
  template: `
    <nz-steps [nzCurrent]="1">
      <nz-step *ngFor="let step of steps; trackBy: trackById"></nz-step>
    </nz-steps>
  `
})
export class NzTestStepAsyncComponent implements OnInit {
  steps: number[] = [];

  trackById(index: number): number {
    return index;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.steps = [1, 2, 3];
    }, 1000);
  }
}
