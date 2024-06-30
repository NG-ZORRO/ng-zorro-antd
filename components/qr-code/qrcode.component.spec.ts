/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';

import { NzQRCodeComponent } from './qrcode.component';
import { NzQRCodeModule } from './qrcode.module';

@Component({
  template: ` <nz-qrcode [nzValue]="value" [nzSize]="size" [nzBordered]="bordered" [nzStatus]="status"> </nz-qrcode> `
})
export class NzTestQrCodeBasicComponent {
  value: string = 'https://ng.ant.design/';
  size: number = 160;
  bordered: boolean = true;
  status: 'active' | 'expired' | 'loading' | 'scanned' = 'active';
}

describe('nz-qrcode', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestQrCodeBasicComponent>;
    let fixture: ComponentFixture<NzTestQrCodeBasicComponent>;
    let testComponent: NzTestQrCodeBasicComponent;
    let resultEl: DebugElement;

    beforeEach(() => {
      testBed = createComponentBed(NzTestQrCodeBasicComponent, {
        imports: [NzQRCodeModule],
        providers: [provideHttpClientTesting()]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzQRCodeComponent));
    });

    it('qr code bordered', () => {
      testComponent.bordered = false;
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).not.toContain('ant-qrcode-border');
    });

    it('qr code width', () => {
      testComponent.size = 200;
      fixture.detectChanges();
      const widthView = resultEl.nativeElement.querySelector('.ant-qrcode > canvas');
      expect(widthView.style.width).toBe('200px');
    });

    it('qr code status', () => {
      const statusList: Array<'active' | 'expired' | 'loading' | 'scanned'> = ['expired', 'loading', 'scanned'];

      for (let i = 0; i < statusList.length; i++) {
        testComponent.status = statusList[i];
        fixture.detectChanges();
        const statusView = resultEl.nativeElement.querySelector('.ant-qrcode-mask');
        if (i === 1) {
          expect(statusView.firstElementChild.tagName).toBe('NZ-SPIN');
        } else {
          expect(statusView.firstElementChild.tagName).toBe('DIV');
        }
      }
    });
  });
});
