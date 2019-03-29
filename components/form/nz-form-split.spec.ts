import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormSplitComponent } from './nz-form-split.component';

describe('nz-form-split', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [NzFormSplitComponent, NzTestFormSplitComponent]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormSplitComponent>;
    let split: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormSplitComponent);
      fixture.detectChanges();
      split = fixture.debugElement.query(By.directive(NzFormSplitComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(split.nativeElement.classList).toContain('ant-form-split');
    });
  });
});

@Component({
  template: `
    <nz-form-split></nz-form-split>
  `
})
export class NzTestFormSplitComponent {}
