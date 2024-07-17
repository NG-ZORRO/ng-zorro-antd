import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgAntdColorBlockComponent } from './ng-antd-color-block.component';

describe('NgxColorBlockComponent', () => {
  let component: NzxTestColorBlockComponent;
  let fixture: ComponentFixture<NzxTestColorBlockComponent>;
  let resultEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NzxTestColorBlockComponent],
      imports: [NgAntdColorBlockComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NzxTestColorBlockComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NgAntdColorBlockComponent));
  });

  it('color-block color', () => {
    component.color = '#ff6600';
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 102, 0)'
    );
  });

  it('color-block click', () => {
    fixture.detectChanges();
    resultEl.nativeElement.querySelector('.ant-color-picker-color-block').click();
    expect(component.isClick).toBeTrue();
  });
});

@Component({
  template: ` <ng-antd-color-block [color]="color" (nzOnClick)="clickHandle($event)"></ng-antd-color-block> `
})
export class NzxTestColorBlockComponent {
  color = '#1677ff';
  isClick: boolean = false;

  clickHandle(value: boolean): void {
    this.isClick = value;
  }
}
