/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzButtonModule } from 'ng-zorro-antd/button';

import { NzTransitionPatchDirective } from './transition-patch.directive';
import { NzTransitionPatchModule } from './transition-patch.module';

describe('transition-patch', () => {
  it('should visible after afterViewInit', () => {
    const fixture = TestBed.createComponent(TestTransitionPatchComponent);
    const buttonElement = fixture.debugElement.query(By.directive(NzTransitionPatchDirective)).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
  });

  it('should hidden after afterViewInit', () => {
    const fixture = TestBed.createComponent(TestTransitionPatchHiddenComponent);
    const buttonElement = fixture.debugElement.query(By.directive(NzTransitionPatchDirective)).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
  });

  it('should restore after afterViewInit', () => {
    const fixture = TestBed.createComponent(TestTransitionPatchRestoreComponent);
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.directive(NzTransitionPatchDirective)).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBe('abc');
  });

  it('should work if hidden binding', () => {
    const fixture = TestBed.createComponent(TestTransitionPatchHiddenBindingComponent);
    const component = fixture.componentInstance;
    const buttonElement = fixture.debugElement.query(By.directive(NzTransitionPatchDirective)).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
    component.hidden = true;
    fixture.detectChanges();
    expect(buttonElement.getAttribute('hidden')).toBe('');
  });

  it('should work if hidden binding with undefined', () => {
    const fixture = TestBed.createComponent(TestTransitionPatchHiddenBindingComponent);
    const component = fixture.componentInstance;
    const buttonElement = fixture.debugElement.query(By.directive(NzTransitionPatchDirective)).nativeElement;
    expect(buttonElement.getAttribute('hidden')).toBeFalsy();
    component.hidden = undefined;
    fixture.detectChanges();
    expect(buttonElement.hasAttribute('hidden')).toBeFalse();
  });
});

@Component({
  imports: [NzButtonModule, NzTransitionPatchModule],
  template: `<button nz-button></button>`
})
export class TestTransitionPatchComponent {}

@Component({
  imports: [NzButtonModule, NzTransitionPatchModule],
  template: `<button nz-button hidden></button>`
})
export class TestTransitionPatchHiddenComponent {}

@Component({
  imports: [NzButtonModule, NzTransitionPatchModule],
  template: `<button nz-button hidden="abc"></button>`
})
export class TestTransitionPatchRestoreComponent {}

@Component({
  imports: [NzButtonModule, NzTransitionPatchModule],
  template: `<button nz-button [hidden]="hidden"></button>`
})
export class TestTransitionPatchHiddenBindingComponent {
  hidden?: boolean = false;
}
