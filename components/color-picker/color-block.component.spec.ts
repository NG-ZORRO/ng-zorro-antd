/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzColorBlockComponent, NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

describe('nz-color-block', () => {
  let fixture: ComponentFixture<NzTestColorBlockComponent>;
  let component: NzTestColorBlockComponent;
  let resultEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
    fixture = TestBed.createComponent(NzTestColorBlockComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzColorBlockComponent));
  });

  it('color-block basic', () => {
    fixture.detectChanges();
    const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
    expect(colorDom.style.backgroundColor).toBe('rgb(22, 119, 255)');
  });

  it('color-block color', () => {
    component.nzColor = '#ff6600';
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 102, 0)'
    );
  });

  it('color-block size', () => {
    component.nzSize = 'small';
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('ng-antd-color-block').parentNode.classList).toContain(
      'ant-color-picker-inline-sm'
    );
    component.nzSize = 'large';
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('ng-antd-color-block').parentNode.classList).toContain(
      'ant-color-picker-inline-lg'
    );
  });

  it('color-block click', () => {
    fixture.detectChanges();
    resultEl.nativeElement.querySelector('.ant-color-picker-color-block').click();
    expect(component.isClick).toBeTrue();
  });
});

@Component({
  imports: [NzColorPickerModule],
  template: ` <nz-color-block [nzColor]="nzColor" [nzSize]="nzSize" (nzOnClick)="clickHandle()"></nz-color-block> `
})
export class NzTestColorBlockComponent {
  nzColor = '#1677ff';
  nzSize: NzSizeLDSType = 'default';
  isClick: boolean = false;

  clickHandle(): void {
    this.isClick = true;
  }
}
