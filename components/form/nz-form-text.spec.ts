import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormTextComponent } from './nz-form-text.component';

describe('nz-form-text', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NoopAnimationsModule ],
      declarations: [ NzFormTextComponent, NzTestFormTextComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture;
    let testComponent;
    let text;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormTextComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      text = fixture.debugElement.query(By.directive(NzFormTextComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(text.nativeElement.classList).toContain('ant-form-text');
    });
  });
});

@Component({
  template: `<nz-form-text></nz-form-text>`
})
export class NzTestFormTextComponent {
}
