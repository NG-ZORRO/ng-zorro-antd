import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormSplitComponent } from './nz-form-split.component';

describe('nz-form-split', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NoopAnimationsModule ],
      declarations: [ NzFormSplitComponent, NzTestFormSplitComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture;
    let testComponent;
    let split;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormSplitComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      split = fixture.debugElement.query(By.directive(NzFormSplitComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(split.nativeElement.classList).toContain('ant-form-split');
    });
  });
});

@Component({
  template: `<nz-form-split></nz-form-split>`
})
export class NzTestFormSplitComponent {
}
