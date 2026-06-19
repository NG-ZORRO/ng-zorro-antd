/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzColorBlockComponent, NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

describe('color-block', () => {
  let fixture: ComponentFixture<NzTestColorBlockComponent>;
  let component: NzTestColorBlockComponent;
  let resultEl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(() => {
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
    component.nzColor.set('#ff6600');
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 102, 0)'
    );
  });

  it('color-block size', () => {
    component.nzSize.set('small');
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('ng-antd-color-block').parentNode.classList).toContain(
      'ant-color-picker-inline-sm'
    );
    component.nzSize.set('large');
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('ng-antd-color-block').parentNode.classList).toContain(
      'ant-color-picker-inline-lg'
    );
  });

  it('color-block click', () => {
    fixture.detectChanges();
    resultEl.nativeElement.querySelector('.ant-color-picker-color-block').click();
    expect(component.isClick()).toBe(true);
  });
});

@Component({
  imports: [NzColorPickerModule],
  template: `<nz-color-block [nzColor]="nzColor()" [nzSize]="nzSize()" (nzOnClick)="clickHandle()" />`
})
export class NzTestColorBlockComponent {
  readonly nzColor = signal('#1677ff');
  readonly nzSize = signal<NzSizeLDSType>('default');
  readonly isClick = signal(false);

  clickHandle(): void {
    this.isClick.set(true);
  }
}
