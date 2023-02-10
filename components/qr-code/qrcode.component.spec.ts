/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';

import { NzQrCodeComponent } from './qrcode.component';
import { NzQrCodeModule } from './qrcode.module';

@Component({
  // eslint-disable-next-line
  selector: 'nz-test-basic-qr-code',
  template: `
    <nz-qrcode [nzValue]="value" [nzColor]="color" [nzSize]="size" [nzBordered]="bordered" [nzStatus]="status">
    </nz-qrcode>
  `
})
export class NzTestQrCodeBasicComponent {
  value: string = 'https://ng.ant.design/';
  color = { dark: '#000', light: '#fff' };
  size: number = 160;
  bordered: boolean = true;
  status: 'active' | 'expired' | 'loading' = 'active';
}

describe('nz-qrcode', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestQrCodeBasicComponent>;
    let fixture: ComponentFixture<NzTestQrCodeBasicComponent>;
    let testComponent: NzTestQrCodeBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestQrCodeBasicComponent, {
        imports: [NzQrCodeModule]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzQrCodeComponent));
    });

    it('qr code bordered', () => {
      testComponent.bordered = false;
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).not.toContain('ant-qrcode-border');
    });

    it('qr code width', () => {
      testComponent.size = 200;
      fixture.detectChanges();
      const widthView = resultEl.nativeElement.querySelector('.ant-qrcode-content > canvas');
      expect(widthView.style.width).toBe('200px');
    });

    it('qr code bgColor', () => {
      testComponent.color = { dark: '#ff6600', light: '#f6f6f6' };
      fixture.detectChanges();
      const colorView = resultEl.nativeElement.querySelector('.ant-qrcode-content');
      expect(colorView.style.backgroundColor).toBe('rgb(246, 246, 246)');
    });

    it('qr code status', () => {
      const statusList: Array<'active' | 'expired' | 'loading'> = ['expired', 'loading'];

      for (let i = 0; i < statusList.length; i++) {
        testComponent.status = statusList[i];
        fixture.detectChanges();
        const statusView = resultEl.nativeElement.querySelector('.ant-qrcode-mask');
        if (i === 0) {
          expect(statusView.firstElementChild.tagName).toBe('DIV');
        } else {
          expect(statusView.firstElementChild.tagName).toBe('NZ-SPIN');
        }
      }
    });
  });
});
