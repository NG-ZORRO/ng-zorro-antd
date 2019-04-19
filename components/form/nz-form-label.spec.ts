import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormLabelComponent } from './nz-form-label.component';

describe('nz-form-label', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [NzFormLabelComponent, NzTestFormLabelComponent]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormLabelComponent>;
    let testComponent: NzTestFormLabelComponent;
    let label: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormLabelComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      label = fixture.debugElement.query(By.directive(NzFormLabelComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(label.nativeElement.classList).toContain('ant-form-item-label');
    });
    it('should label for work', () => {
      fixture.detectChanges();
      expect(label.nativeElement.querySelector('label').attributes.getNamedItem('for').value).toBe('test');
    });
    it('should required work', () => {
      fixture.detectChanges();
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-required');
      testComponent.required = true;
      fixture.detectChanges();
      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-required');
    });

    it('should no colon work', () => {
      fixture.detectChanges();
      expect(label.nativeElement.querySelector('label').classList).not.toContain('ant-form-item-no-colon');
      testComponent.noColon = true;
      fixture.detectChanges();
      expect(label.nativeElement.querySelector('label').classList).toContain('ant-form-item-no-colon');
    });
  });
});

@Component({
  template: `
    <nz-form-label [nzFor]="forValue" [nzNoColon]="noColon" [nzRequired]="required"></nz-form-label>
  `
})
export class NzTestFormLabelComponent {
  forValue = 'test';
  required = false;
  noColon = false;
}
