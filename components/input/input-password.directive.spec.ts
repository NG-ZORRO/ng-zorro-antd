/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

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
    component.visible = true;
    fixture.detectChanges();
    expect(inputElement.type).toEqual('text');
  });

  it('should be toggle visible by click toggle button', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const toggleElement = fixture.nativeElement.querySelector('.ant-input-password-icon');
    expect(inputElement.type).toEqual('password');
    expect(component.visible).toBe(false);
    toggleElement.click();
    fixture.detectChanges();
    expect(inputElement.type).toEqual('text');
    expect(component.visible).toBe(true);
    toggleElement.click();
    fixture.detectChanges();
    expect(inputElement.type).toEqual('password');
    expect(component.visible).toBe(false);
  });

  it('should be hide toggle', () => {
    expect(fixture.nativeElement.querySelector('.ant-input-password-icon')).toBeTruthy();
    component.visibilityToggle = false;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ant-input-password-icon')).toBeFalsy();
  });

  it('should be custom icon', () => {
    component.customeIcon = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ant-input-password-icon').textContent.trim()).toEqual('show');
    component.visible = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.ant-input-password-icon').textContent.trim()).toEqual('hide');
  });
});

@Component({
  imports: [NzInputModule, FormsModule],
  template: `
    <nz-input-password [nzVisibilityToggle]="visibilityToggle" [(nzVisible)]="visible">
      <input nz-input [(ngModel)]="value" [disabled]="disabled" [readonly]="readonly" />
      @if (customeIcon) {
        <ng-template nzInputPasswordIcon let-visible>{{ visible ? 'hide' : 'show' }}</ng-template>
      }
    </nz-input-password>
  `
})
class InputPasswordTestComponent {
  visibilityToggle = true;
  visible = false;
  customeIcon = false;
}
