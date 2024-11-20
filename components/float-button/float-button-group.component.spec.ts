import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzFloatButtonGroupComponent } from './float-button-group.component';
import { NzFloatButtonModule } from './float-button.module';

describe('nz-float-button-group', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, NzFloatButtonModule, NzIconTestModule, NoopAnimationsModule],
      declarations: [NzTestFloatButtonGroupBasicComponent]
    });
    TestBed.compileComponents();
  }));

  describe('float-button-group basic', () => {
    let fixture: ComponentFixture<NzTestFloatButtonGroupBasicComponent>;
    let testComponent: NzTestFloatButtonGroupBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFloatButtonGroupBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzFloatButtonGroupComponent));
    });

    it('basic', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-circle');
    });

    it('nzShape', () => {
      testComponent.nzShape = 'square';
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-square');
    });

    it('nzTrigger hover', () => {
      testComponent.nzIcon = testComponent.icon;
      testComponent.nzTrigger = 'hover';
      fixture.detectChanges();
      resultEl.nativeElement.getElementsByClassName('ant-float-btn')[0].dispatchEvent(new MouseEvent('mouseover'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(true);
      expect(testComponent.isClick).toBe(true);
      resultEl.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(
        false
      );
      expect(testComponent.isClick).toBe(false);
    });

    it('nzTrigger click', () => {
      testComponent.nzIcon = testComponent.icon;
      testComponent.nzTrigger = 'click';
      fixture.detectChanges();
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(true);
      expect(testComponent.isClick).toBe(true);
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(
        false
      );
      expect(testComponent.isClick).toBe(false);
    });

    it('nzOpen true', () => {
      testComponent.nzIcon = testComponent.icon;
      testComponent.nzOpen = true;
      testComponent.nzTrigger = 'click';
      fixture.detectChanges();
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(true);
    });

    it('nzOpen false', () => {
      testComponent.nzIcon = testComponent.icon;
      testComponent.nzOpen = false;
      testComponent.nzTrigger = 'click';
      fixture.detectChanges();
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(
        false
      );
    });
  });
});

describe('nz-float-button-group RTL', () => {
  let fixture: ComponentFixture<NzTestFloatButtonRtlComponent>;
  let resultEl: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, NzFloatButtonModule, NzIconTestModule, NoopAnimationsModule],
      declarations: [NzTestFloatButtonRtlComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(NzTestFloatButtonRtlComponent);
    resultEl = fixture.debugElement.query(By.directive(NzFloatButtonGroupComponent));
  }));

  it('rtl', () => {
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-rtl');
  });
});

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-basic-float-button-group',
  template: `
    <nz-float-button-group
      [nzIcon]="nzIcon"
      [nzShape]="nzShape"
      [nzTrigger]="nzTrigger"
      [nzOpen]="nzOpen"
      (nzOnOpenChange)="onClick($event)"
    >
    </nz-float-button-group>
    <ng-template #icon>
      <span nz-icon nzType="question-circle" nzTheme="outline"></span>
    </ng-template>
  `
})
export class NzTestFloatButtonGroupBasicComponent {
  nzShape: 'circle' | 'square' = 'circle';
  nzTrigger: 'click' | 'hover' | null = null;
  nzOpen: boolean | null = null;
  nzIcon: TemplateRef<void> | null = null;
  @ViewChild('icon', { static: false }) icon!: TemplateRef<void>;

  isClick: boolean = false;

  constructor() {}

  onClick(value: boolean): void {
    this.isClick = value;
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-float-button-group></nz-float-button-group>
    </div>
  `
})
export class NzTestFloatButtonRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
