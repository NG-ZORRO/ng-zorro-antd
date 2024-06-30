import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { ComponentBed, createComponentBed } from 'ng-zorro-antd/core/testing/component-bed';

import { NzHashCodeComponent } from './hash-code.component';
import { NzHashCodeModule } from './hash-code.module';
import { NzModeType } from './typings';

describe('nz-hash-code', () => {
  describe('basic', () => {
    let testBed: ComponentBed<NzTestHashCodeBasicComponent>;
    let fixture: ComponentFixture<NzTestHashCodeBasicComponent>;
    let testComponent: NzTestHashCodeBasicComponent;
    let resultEl: DebugElement;

    function waitingForTooltipToggling(): void {
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
    }

    beforeEach(fakeAsync(() => {
      testBed = createComponentBed(NzTestHashCodeBasicComponent, {
        imports: [NzHashCodeModule],
        providers: [provideHttpClientTesting()]
      });
      fixture = testBed.fixture;
      fixture.detectChanges();
      testComponent = testBed.component;
      resultEl = fixture.debugElement.query(By.directive(NzHashCodeComponent));
    }));

    it('hash-code bash', () => {
      fixture.detectChanges();
      const dom = resultEl.nativeElement;
      expect(dom.querySelector('.ant-hashCode-header-title').innerText).toBe('HashCode');
      expect(dom.querySelectorAll('.ant-hashCode-code-value-block').length).toBe(8);
      expect(dom.querySelector('.ant-hashCode-header-logo').innerText).toBe('Antd');
      expect(!!dom.querySelector('.ant-hashCode-texaure')).toBeTrue();
    });

    it('hash-code value length', () => {
      testComponent.value =
        '683109f0f40ca72a15e05cc20931f8e6683109f0f40ca72a15e05cc20931f8e6683109f0f40ca72a15e05cc20931f8e6683109f0f40ca72a15e05cc20931f8e6';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelectorAll('.ant-hashCode-code-value-block').length).toBe(8);
      testComponent.value = '683109f0f40ca72a15e05cc20931f8e6';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelectorAll('.ant-hashCode-code-value-block').length).toBe(8);
      testComponent.value = '683109f0f40ca72a';
      fixture.detectChanges();
      expect(resultEl.nativeElement.querySelectorAll('.ant-hashCode-code-value-block').length).toBe(4);
    });

    it('hash-code single', () => {
      testComponent.mode = 'single';
      fixture.detectChanges();
      expect(!!resultEl.nativeElement.querySelector('.ant-hashCode-header')).toBeFalse();
      expect(!!resultEl.nativeElement.querySelector('.ant-hashCode-header-copy')).toBeTrue();
      expect(resultEl.nativeElement.classList).toContain('ant-hashCode-single');
    });

    it('hash-code strip', () => {
      testComponent.mode = 'strip';
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-hashCode-strip');
    });

    it('hash-code rect', () => {
      testComponent.mode = 'rect';
      fixture.detectChanges();
      expect(!!resultEl.nativeElement.querySelector('.ant-hashCode-header')).toBeFalse();
      expect(!!resultEl.nativeElement.querySelector('.ant-hashCode-header-copy')).toBeTrue();
      expect(resultEl.nativeElement.classList).toContain('ant-hashCode-rect');
    });

    it('hash-code type', () => {
      testComponent.type = 'primary';
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-hashCode-primary');
    });

    it('hash-code copy', fakeAsync(() => {
      fixture.detectChanges();
      const copy = resultEl.nativeElement.querySelector('.ant-hashCode-header-copy');
      dispatchMouseEvent(copy, 'click');
      waitingForTooltipToggling();
      expect(testComponent.copyValue).toBe(testComponent.value);
    }));
  });
});

@Component({
  template: `
    <nz-hash-code
      [nzValue]="value"
      [nzTitle]="title"
      [nzLogo]="logo"
      [nzMode]="mode"
      [nzType]="type"
      (nzOnCopy)="onCopy($event)"
    >
    </nz-hash-code>
  `
})
export class NzTestHashCodeBasicComponent {
  value = 'dfb5fe9ef7b99b2b1db102114a6d7d445d992f40a5d575f801c148990199a068';
  title = 'HashCode';
  logo = 'Antd';
  mode: NzModeType = 'double';
  type: 'default' | 'primary' = 'default';
  copyValue = '';

  onCopy(value: string): void {
    this.copyValue = value;
  }
}
