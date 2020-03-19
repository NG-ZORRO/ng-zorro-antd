import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzButtonGroupComponent, NzButtonGroupSize } from './button-group.component';

describe('button-group', () => {
  it('should button group size work', () => {
    const testBed = createComponentBed(TestButtonGroupComponent, { declarations: [NzButtonGroupComponent] });
    const buttonGroupElement = testBed.debugElement.query(By.directive(NzButtonGroupComponent)).nativeElement;
    expect(buttonGroupElement.className).toBe('ant-btn-group');
    testBed.component.nzSize = 'large';
    testBed.fixture.detectChanges();
    expect(buttonGroupElement.classList).toContain('ant-btn-group-lg');
    testBed.component.nzSize = 'small';
    testBed.fixture.detectChanges();
    expect(buttonGroupElement.classList).toContain('ant-btn-group-sm');
  });
});

@Component({
  template: `
    <nz-button-group [nzSize]="nzSize"></nz-button-group>
  `
})
export class TestButtonGroupComponent {
  @Input() nzSize: NzButtonGroupSize = 'default';
}
