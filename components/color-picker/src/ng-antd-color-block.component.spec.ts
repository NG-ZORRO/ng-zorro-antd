/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NgAntdColorBlockComponent } from './ng-antd-color-block.component';

describe('NgxColorBlockComponent', () => {
  let component: NzxTestColorBlockComponent;
  let fixture: ComponentFixture<NzxTestColorBlockComponent>;
  let resultEl: DebugElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzxTestColorBlockComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NgAntdColorBlockComponent));
  });

  it('color-block color', () => {
    component.color = '#ff6600';
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
      'rgb(255, 102, 0)'
    );
  });

  it('color-block click', () => {
    fixture.detectChanges();
    resultEl.nativeElement.click();
    expect(component.isClick).toBeTrue();
  });
});

@Component({
  imports: [NgAntdColorBlockComponent],
  template: `<ng-antd-color-block [color]="color" (nzOnClick)="clickHandle()" />`
})
export class NzxTestColorBlockComponent {
  color = '#1677ff';
  isClick: boolean = false;

  clickHandle(): void {
    this.isClick = true;
  }
}
