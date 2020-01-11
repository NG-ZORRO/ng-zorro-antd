/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core';
import { NzTransitionPatchDirective } from './transition-patch.directive';

describe('transition-patch', () => {
  it('should visible after afterViewInit', () => {
    const testBed = createComponentBed(TestTransitionPatchComponent, { declarations: [NzTransitionPatchDirective] });
    const buttonElement = testBed.debugElement.query(By.directive(NzTransitionPatchDirective)).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
  });
  it('should hidden after afterViewInit', () => {
    const testBed = createComponentBed(TestTransitionPatchHiddenComponent, { declarations: [NzTransitionPatchDirective] });
    const buttonElement = testBed.debugElement.query(By.directive(NzTransitionPatchDirective)).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
  });
  it('should restore after afterViewInit', () => {
    const testBed = createComponentBed(TestTransitionPatchRestoreComponent, { declarations: [NzTransitionPatchDirective] });
    const buttonElement = testBed.debugElement.query(By.directive(NzTransitionPatchDirective)).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBe('abc');
  });
});

@Component({
  template: `
    <button nz-button></button>
  `
})
export class TestTransitionPatchComponent {}

@Component({
  template: `
    <button nz-button hidden></button>
  `
})
export class TestTransitionPatchHiddenComponent {}

@Component({
  template: `
    <button nz-button hidden="abc"></button>
  `
})
export class TestTransitionPatchRestoreComponent {}
