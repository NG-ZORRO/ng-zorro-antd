import { Component, DebugElement, ViewChild } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconModule } from '../icon/nz-icon.module';

import { NzDividerComponent } from './nz-divider.component';
import { NzDividerModule } from './nz-divider.module';

describe('divider', () => {
  let fixture: ComponentFixture<TestDividerComponent>;
  let context: TestDividerComponent;
  let dl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NzDividerModule, NzIconModule ],
      declarations: [ TestDividerComponent, TestDividerTextTemplateComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestDividerComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#nzDashed', () => {
    for (const value of [ true, false ]) {
      it(`[${value}]`, () => {
        context.nzDashed = value;
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-divider-dashed')) != null).toBe(value);
      });
    }
  });

  describe('#nzType', () => {
    for (const value of [ 'horizontal', 'vertical' ]) {
      it(`[${value}]`, () => {
        context.nzType = value;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-divider-${value}`)) != null).toBe(true);
      });
    }
  });

  describe('#nzText', () => {
    for (const item of [ { text: 'with text', ret: true }, { text: undefined, ret: false } ]) {
      it(`[${item.text}]`, () => {
        context.nzText = item.text;
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-divider-inner-text')) != null).toBe(item.ret);
      });
    }

    it('should be custom template', () => {
      let fixtureTemplate: ComponentFixture<TestDividerTextTemplateComponent>;
      fixtureTemplate = TestBed.createComponent(TestDividerTextTemplateComponent);
      fixtureTemplate.detectChanges();
      expect(fixtureTemplate.debugElement.query(By.css('.anticon-plus')) != null).toBe(true);
    });
  });

  describe('#nzOrientation', () => {
    [ 'left', 'right' ].forEach(type => {
      it(`with ${type}`, () => {
        context.nzOrientation = type;
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-divider-with-text-${type}`)) != null).toBe(true);
      });
    });
  });
});

@Component({
  template: `
  <nz-divider #comp
    [nzDashed]="nzDashed"
    [nzType]="nzType"
    [nzText]="nzText"
    [nzOrientation]="nzOrientation"></nz-divider>
  `
})
class TestDividerComponent {
  @ViewChild('comp') comp: NzDividerComponent;
  nzDashed = false;
  nzType = 'horizontal';
  nzText = 'with text';
  nzOrientation: string = '';
}

@Component({
  template: `
  <nz-divider nzDashed [nzText]="text">
    <ng-template #text><i nz-icon type="plus"></i> Add</ng-template>
  </nz-divider>
  `
})
class TestDividerTextTemplateComponent {
}
