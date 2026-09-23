/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzInputModule } from './input.module';

describe('input-password', () => {
  let component: InputPasswordTestComponent;
  let fixture: ComponentFixture<InputPasswordTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPasswordTestComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should be apply classes', () => {
    const passwordElement = fixture.nativeElement.querySelector('nz-input-password');
    expect(passwordElement.classList).toContain('ant-input-password');
  });

  it('should be toggle visible by two-way binding', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.type).toEqual('password');
    component.visible.set(true);
    fixture.detectChanges();
    expect(inputElement.type).toEqual('text');
  });

  it('should be toggle visible by click toggle button', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const toggleElement = fixture.nativeElement.querySelector('.ant-input-password-icon');
    expect(inputElement.type).toEqual('password');
    expect(component.visible()).toBe(false);
    toggleElement.click();
    fixture.detectChanges();
    expect(inputElement.type).toEqual('text');
    expect(component.visible()).toBe(true);
    toggleElement.click();
    fixture.detectChanges();
    expect(inputElement.type).toEqual('password');
    expect(component.visible()).toBe(false);
  });

  it('should be toggle visible by enter and space', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const toggleElement = fixture.nativeElement.querySelector('.ant-input-password-icon');

    const enter = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
    toggleElement.dispatchEvent(enter);
    fixture.detectChanges();
    expect(inputElement.type).toEqual('text');
    expect(component.visible()).toBe(true);
    expect(enter.defaultPrevented).toBe(true);

    const space = new KeyboardEvent('keydown', { key: ' ', bubbles: true, cancelable: true });
    toggleElement.dispatchEvent(space);
    fixture.detectChanges();
    expect(inputElement.type).toEqual('password');
    expect(component.visible()).toBe(false);
    // Space would otherwise scroll the page.
    expect(space.defaultPrevented).toBe(true);
  });

  it('should be an accessible toggle button', () => {
    const toggleElement = fixture.nativeElement.querySelector('.ant-input-password-icon');
    expect(toggleElement.getAttribute('role')).toEqual('button');
    expect(toggleElement.getAttribute('tabindex')).toEqual('0');
    expect(toggleElement.getAttribute('aria-label')).toEqual('Show password');
    expect(toggleElement.getAttribute('aria-pressed')).toEqual('false');

    component.visible.set(true);
    fixture.detectChanges();
    expect(toggleElement.getAttribute('aria-pressed')).toEqual('true');
  });

  it('should be inert while the input is disabled', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const toggleElement = fixture.nativeElement.querySelector('.ant-input-password-icon');
    component.disabled.set(true);
    fixture.detectChanges();
    expect(toggleElement.getAttribute('tabindex')).toEqual('-1');
    expect(toggleElement.getAttribute('aria-disabled')).toEqual('true');

    toggleElement.click();
    toggleElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true }));
    fixture.detectChanges();
    expect(inputElement.type).toEqual('password');
    expect(component.visible()).toBe(false);
  });

  it('should be hide toggle', () => {
    expect(fixture.nativeElement.querySelector('.ant-input-password-icon')).toBeTruthy();
    component.visibilityToggle.set(false);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ant-input-password-icon')).toBeFalsy();
  });

  it('should be custom icon', () => {
    component.customeIcon.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ant-input-password-icon').textContent.trim()).toEqual('show');
    component.visible.set(true);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ant-input-password-icon').textContent.trim()).toEqual('hide');
  });
});

@Component({
  imports: [NzInputModule],
  template: `
    <nz-input-password [nzVisibilityToggle]="visibilityToggle()" [(nzVisible)]="visible">
      <input nz-input [disabled]="disabled()" />
      @if (customeIcon()) {
        <ng-template nzInputPasswordIcon let-visible>{{ visible ? 'hide' : 'show' }}</ng-template>
      }
    </nz-input-password>
  `
})
class InputPasswordTestComponent {
  readonly visibilityToggle = signal(true);
  readonly visible = signal(false);
  readonly customeIcon = signal(false);
  readonly disabled = signal(false);
}
