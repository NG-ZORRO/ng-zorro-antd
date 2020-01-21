import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core';
import { NzFormItemComponent } from './form-item.component';
import { NzFormModule } from './form.module';

const testBedOptions = { imports: [NzFormModule, NoopAnimationsModule] };

describe('nz-form-item', () => {
  describe('default', () => {
    let testBed: ComponentBed<NzTestFormItemComponent>;
    let testComponent: NzTestFormItemComponent;
    let formItem: DebugElement;
    beforeEach(() => {
      testBed = createComponentBed(NzTestFormItemComponent, testBedOptions);
      testComponent = testBed.component;
      formItem = testBed.fixture.debugElement.query(By.directive(NzFormItemComponent));
    });
    it('should className correct', () => {
      expect(formItem.nativeElement.classList).toContain('ant-form-item');
    });
    it('should flex work', () => {
      expect(formItem.nativeElement.style.display).toBe('');

      testComponent.flex = true;

      testBed.fixture.detectChanges();

      expect(formItem.nativeElement.style.display).toBe('flex');

      testComponent.flex = false;

      testBed.fixture.detectChanges();

      expect(formItem.nativeElement.style.display).toBe('');
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
