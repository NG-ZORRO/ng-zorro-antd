import { Component, DebugElement } from '@angular/core';
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzFormExplainComponent } from './nz-form-explain.component';
import { NzFormItemComponent } from './nz-form-item.component';
import { NzFormModule } from './nz-form.module';

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
    let explain: DebugElement;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFormItemComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      item = fixture.debugElement.query(By.directive(NzFormItemComponent));
      explain = fixture.debugElement.query(By.directive(NzFormExplainComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(item.nativeElement.classList).toContain('ant-form-item');
      expect(explain.nativeElement.classList).toContain('ant-form-explain');
    });
    it('should help class correct', () => {
      fixture.detectChanges();
      expect(item.nativeElement.classList).toContain('ant-form-item-with-help');
      testComponent.second = true;
      fixture.detectChanges();
      expect(item.nativeElement.classList).toContain('ant-form-item-with-help');
      testComponent.first = false;
      testComponent.second = false;
      fixture.detectChanges();
      expect(item.nativeElement.classList).not.toContain('ant-form-item-with-help');
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
    <nz-form-item [nzFlex]="flex">
      <nz-form-explain *ngIf="first"></nz-form-explain>
      <nz-form-explain *ngIf="second"></nz-form-explain>
    </nz-form-item>
  `
})
export class NzTestFormItemComponent {
  first = true;
  second = false;
  flex = false;
}
