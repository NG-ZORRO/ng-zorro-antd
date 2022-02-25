import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTabHoverDirective } from 'ng-zorro-antd/tabs/tab-hover.directive';

@Component({
  template: `<div nzTabHover>Test tab hover directive</div>`
})
class TestTabHoverComponent {}

describe('Directive: nzTabHover', () => {
  let fixture: ComponentFixture<TestTabHoverComponent>;
  let testDivEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NzTabHoverDirective, TestTabHoverComponent]
    });

    fixture = TestBed.createComponent(TestTabHoverComponent);
    testDivEl = fixture.debugElement.query(By.css('div'));
  });

  it('should add hover class to element on mouseover', () => {
    testDivEl.triggerEventHandler('mouseover', null);
    fixture.detectChanges();
    expect(testDivEl.nativeElement).toHaveClass('ant-tab-hover');
  });

  it('should add hover class to element on mouseover', () => {
    testDivEl.triggerEventHandler('mouseout', null);
    fixture.detectChanges();
    expect(testDivEl.nativeElement).not.toHaveClass('ant-tab-hover');
  });
});
