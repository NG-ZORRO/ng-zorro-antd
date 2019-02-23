import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormDirective } from './nz-form.directive';

describe('nz-form', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NoopAnimationsModule ],
      declarations: [ NzFormDirective, NzTestFormDirectiveComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormDirectiveComponent>;
    let testComponent: NzTestFormDirectiveComponent;
    let form: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormDirectiveComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      form = fixture.debugElement.query(By.directive(NzFormDirective));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(form.nativeElement.classList).toContain('ant-form');
      expect(form.nativeElement.classList).toContain('ant-form-horizontal');
    });
    it('should layout work', () => {
      fixture.detectChanges();
      testComponent.layout = 'vertical';
      fixture.detectChanges();
      expect(form.nativeElement.classList).toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');
      testComponent.layout = 'inline';
      fixture.detectChanges();
      expect(form.nativeElement.classList).not.toContain('ant-form-vertical');
      expect(form.nativeElement.classList).not.toContain('ant-form-horizontal');
      expect(form.nativeElement.classList).toContain('ant-form-inline');
    });
  });
});

@Component({
  template: `
    <form nz-form [nzLayout]="layout"></form>`
})
export class NzTestFormDirectiveComponent {
  layout = 'horizontal';
}
