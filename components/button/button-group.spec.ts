import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Component, Input, ViewChild } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
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

  it('should RTL classname work', fakeAsync(() => {
    const testBed = createComponentBed(NzTestButtonGroupRtlComponent, {
      declarations: [NzButtonGroupComponent],
      imports: [BidiModule]
    });
    const buttonGroupElement = testBed.debugElement.query(By.directive(NzButtonGroupComponent)).nativeElement;
    expect(buttonGroupElement.className).toBe('ant-btn-group ant-btn-group-rtl');
    testBed.component.direction = 'ltr';
    testBed.fixture.detectChanges();
    expect(buttonGroupElement.className).toBe('ant-btn-group');
  }));
});

@Component({
  template: ` <nz-button-group [nzSize]="nzSize"></nz-button-group> `
})
export class TestButtonGroupComponent {
  @Input() nzSize: NzButtonGroupSize = 'default';
}

@Component({
  template: `
    <div [dir]="direction">
      <nz-button-group></nz-button-group>
    </div>
  `
})
export class NzTestButtonGroupRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
