import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzFloatButtonComponent } from './float-button.component';
import { NzFloatButtonModule } from './float-button.module';

describe('nz-float-button', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, NzFloatButtonModule, NzIconTestModule],
      declarations: [NzTestFloatButtonBasicComponent]
    });
    TestBed.compileComponents();
  }));

  describe('float-button basic', () => {
    let fixture: ComponentFixture<NzTestFloatButtonBasicComponent>;
    let testComponent: NzTestFloatButtonBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFloatButtonBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzFloatButtonComponent));
    });

    it('nzType', () => {
      testComponent.nzType = 'primary';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.ant-float-btn > .ant-btn-primary');
      expect(view.tagName).toBe('BUTTON');
    });

    it('nzShape', () => {
      testComponent.nzShape = 'square';
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-float-btn-square');
    });

    it('nzHref && nzTarget', () => {
      testComponent.nzTarget = '_blank';
      testComponent.nzHref = 'https://ng.ant.design/';
      fixture.detectChanges();
      const view = resultEl.nativeElement.querySelector('.ant-float-btn > .ant-btn');
      expect(view.getAttribute('href') === 'https://ng.ant.design/').toBe(true);
      expect(view.getAttribute('target') === '_blank').toBe(true);
    });

    it('nzIcon', () => {
      testComponent.nzIcon = testComponent.icon;
      fixture.detectChanges();
      const view = resultEl.nativeElement.getElementsByClassName('anticon-question-circle')[0];
      expect(view.getAttribute('nztype') === 'question-circle').toBe(true);
    });

    it('nzOnClick', () => {
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(testComponent.isClick).toBe(true);
    });
  });
});

describe('nz-float-button RTL', () => {
  let fixture: ComponentFixture<NzTestFloatButtonRtlComponent>;
  let resultEl: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BidiModule, NzFloatButtonModule, NzIconTestModule],
      declarations: [NzTestFloatButtonRtlComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(NzTestFloatButtonRtlComponent);
    resultEl = fixture.debugElement.query(By.directive(NzFloatButtonComponent));
  }));

  it('rtl', () => {
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-float-btn-rtl');
  });
});

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-basic-float-button',
  template: `
    <nz-float-button
      [nzIcon]="nzIcon"
      [nzDescription]="nzDescription"
      [nzHref]="nzHref"
      [nzTarget]="nzTarget"
      [nzType]="nzType"
      [nzShape]="nzShape"
      (nzOnClick)="onClick($event)"
    ></nz-float-button>
    <ng-template #icon>
      <span nz-icon nzType="question-circle" nzTheme="outline"></span>
    </ng-template>
    <ng-template #description>HELP</ng-template>
  `
})
export class NzTestFloatButtonBasicComponent {
  nzHref: string | null = null;
  nzTarget: string | null = null;
  nzType: 'default' | 'primary' = 'default';
  nzShape: 'circle' | 'square' = 'circle';
  nzIcon: TemplateRef<void> | null = null;
  nzDescription: TemplateRef<void> | null = null;

  @ViewChild('icon', { static: false }) icon!: TemplateRef<void>;
  @ViewChild('description', { static: false }) description!: TemplateRef<void>;

  isClick: boolean = false;

  constructor() {}

  onClick(value: boolean): void {
    this.isClick = value;
  }
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-float-button></nz-float-button>
    </div>
  `
})
export class NzTestFloatButtonRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
