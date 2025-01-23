/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { Component, Input, ViewChild } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzButtonGroupComponent, NzButtonGroupSize } from './button-group.component';

describe('button-group', () => {
  it('should button group size work', () => {
    const fixture = TestBed.createComponent(TestButtonGroupComponent);
    const component = fixture.componentInstance;

    const buttonGroupElement = fixture.debugElement.query(By.directive(NzButtonGroupComponent)).nativeElement;
    expect(buttonGroupElement.className).toBe('ant-btn-group');

    component.nzSize = 'large';
    fixture.detectChanges();
    expect(buttonGroupElement.classList).toContain('ant-btn-group-lg');

    component.nzSize = 'small';
    fixture.detectChanges();
    expect(buttonGroupElement.classList).toContain('ant-btn-group-sm');
  });

  it('should RTL classname work', fakeAsync(() => {
    const fixture = TestBed.createComponent(NzTestButtonGroupRtlComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();
    const buttonGroupElement = fixture.debugElement.query(By.directive(NzButtonGroupComponent)).nativeElement;
    expect(buttonGroupElement.className).toBe('ant-btn-group ant-btn-group-rtl');

    component.direction = 'ltr';
    fixture.detectChanges();
    expect(buttonGroupElement.className).toBe('ant-btn-group');
  }));
});

@Component({
  imports: [NzButtonGroupComponent],
  template: `<nz-button-group [nzSize]="nzSize"></nz-button-group>`
})
export class TestButtonGroupComponent {
  @Input() nzSize: NzButtonGroupSize = 'default';
}

@Component({
  imports: [BidiModule, NzButtonGroupComponent],
  template: `
    <div [dir]="direction">
      <nz-button-group></nz-button-group>
    </div>
  `
})
export class NzTestButtonGroupRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}
