import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormTextComponent } from './nz-form-text.component';

describe('nz-form-text', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [NzFormTextComponent, NzTestFormTextComponent]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormTextComponent>;
    let text: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormTextComponent);
      fixture.detectChanges();
      text = fixture.debugElement.query(By.directive(NzFormTextComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(text.nativeElement.classList).toContain('ant-form-text');
    });
  });
});

@Component({
  template: `
    <nz-form-text></nz-form-text>
  `
})
export class NzTestFormTextComponent {}
