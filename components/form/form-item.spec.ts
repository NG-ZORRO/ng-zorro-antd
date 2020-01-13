import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormItemComponent } from './form-item.component';
import { NzFormModule } from './form.module';

describe('nz-form-item', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzFormModule, NoopAnimationsModule],
      declarations: [NzTestFormItemComponent]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture: ComponentFixture<NzTestFormItemComponent>;
    let testComponent: NzTestFormItemComponent;
    let item: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormItemComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      item = fixture.debugElement.query(By.directive(NzFormItemComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(item.nativeElement.classList).toContain('ant-form-item');
    });
    it('should flex work', () => {
      fixture.detectChanges();
      expect(item.nativeElement.style.display).toBe('');
      testComponent.flex = true;
      fixture.detectChanges();
      expect(item.nativeElement.style.display).toBe('flex');
      testComponent.flex = false;
      fixture.detectChanges();
      expect(item.nativeElement.style.display).toBe('');
    });
  });
});

@Component({
  template: `
    <nz-form-item [nzFlex]="flex"></nz-form-item>
  `
})
export class NzTestFormItemComponent {
  flex = false;
}
