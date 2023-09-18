import { Component, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzColorBlockComponent, NzColorPickerModule } from 'ng-zorro-antd/color-picker';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';

describe('nz-color-block', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestColorBlockComponent>;
    let fixture: ComponentFixture<NzTestColorBlockComponent>;
    let testComponent: NzTestColorBlockComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestColorBlockComponent, {
        imports: [NzColorPickerModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzColorBlockComponent));
    });

    it('color-block basic', () => {
      fixture.detectChanges();
      const colorDom = resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner');
      expect(colorDom.style.backgroundColor).toBe('rgb(22, 119, 255)');
    });

    it('color-block color', () => {
      testComponent.nzColor = '#ff6600';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('.ant-color-picker-color-block-inner').style.backgroundColor).toBe(
        'rgb(255, 102, 0)'
      );
    });

    it('color-block size', () => {
      testComponent.nzSize = 'small';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('ng-antd-color-block').parentNode.classList).toContain(
        'ant-color-picker-inline-sm'
      );
      testComponent.nzSize = 'large';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelector('ng-antd-color-block').parentNode.classList).toContain(
        'ant-color-picker-inline-lg'
      );
    });

    it('color-block click', () => {
      fixture.detectChanges();
      resultEl.nativeElement.querySelector('.ant-color-picker-color-block').click();
      expect(testComponent.isClick).toBeTrue();
    });
  });
});

@Component({
  template: `
    <nz-color-block [nzColor]="nzColor" [nzSize]="nzSize" (nzOnClick)="clickHandle($event)"></nz-color-block>
  `
})
export class NzTestColorBlockComponent {
  nzColor = '#1677ff';
  nzSize: NzSizeLDSType = 'default';
  isClick: boolean = false;

  clickHandle(value: boolean): void {
    this.isClick = value;
  }
}
