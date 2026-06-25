/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';

import { NzHashCodeComponent } from './hash-code.component';
import { NzHashCodeModule } from './hash-code.module';
import { NzModeType } from './typings';

describe('hash-code', () => {
  let fixture: ComponentFixture<NzTestHashCodeBasicComponent>;
  let testComponent: NzTestHashCodeBasicComponent;
  let resultEl: DebugElement;

  async function waitingForTooltipToggling(): Promise<void> {
    fixture.detectChanges();
    await updateNonSignalsInput(fixture, 500);
    fixture.detectChanges();
  }

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestHashCodeBasicComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzHashCodeComponent));
  });

  it('basic', () => {
    fixture.detectChanges();
    const dom = resultEl.nativeElement;
    expect(dom.querySelector('.ant-hash-code-header-title').innerText).toBe('HashCode');
    expect(dom.querySelectorAll('.ant-hash-code-code-value-block').length).toBe(8);
    expect(dom.querySelector('.ant-hash-code-header-logo').innerText).toBe('Antd');
    expect(!!dom.querySelector('.ant-hash-code-texaure')).toBe(true);
  });

  it('should value length work', () => {
    testComponent.value.set(
      '683109f0f40ca72a15e05cc20931f8e6683109f0f40ca72a15e05cc20931f8e6683109f0f40ca72a15e05cc20931f8e6683109f0f40ca72a15e05cc20931f8e6'
    );
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelectorAll('.ant-hash-code-code-value-block').length).toBe(8);
    testComponent.value.set('683109f0f40ca72a15e05cc20931f8e6');
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelectorAll('.ant-hash-code-code-value-block').length).toBe(8);
    testComponent.value.set('683109f0f40ca72a');
    fixture.detectChanges();
    expect(resultEl.nativeElement.querySelectorAll('.ant-hash-code-code-value-block').length).toBe(4);
  });

  it('should mode single work', () => {
    testComponent.mode.set('single');
    fixture.detectChanges();
    expect(!!resultEl.nativeElement.querySelector('.ant-hash-code-header')).toBe(false);
    expect(!!resultEl.nativeElement.querySelector('.ant-hash-code-header-copy')).toBe(true);
    expect(resultEl.nativeElement.classList).toContain('ant-hash-code-single');
  });

  it('should mode strip work', () => {
    testComponent.mode.set('strip');
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-hash-code-strip');
  });

  it('should rect mode work', () => {
    testComponent.mode.set('rect');
    fixture.detectChanges();
    expect(!!resultEl.nativeElement.querySelector('.ant-hash-code-header')).toBe(false);
    expect(!!resultEl.nativeElement.querySelector('.ant-hash-code-header-copy')).toBe(true);
    expect(resultEl.nativeElement.classList).toContain('ant-hash-code-rect');
  });

  it('should type work', () => {
    testComponent.type.set('primary');
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-hash-code-primary');
  });

  it('should copy work', async () => {
    fixture.detectChanges();
    const copy = resultEl.nativeElement.querySelector('.ant-hash-code-header-copy');
    dispatchMouseEvent(copy, 'click');
    await waitingForTooltipToggling();
    expect(testComponent.copyValue()).toBe(testComponent.value());
  });
});

@Component({
  imports: [NzHashCodeModule],
  template: `
    <nz-hash-code
      [nzValue]="value()"
      [nzTitle]="title()"
      [nzLogo]="logo()"
      [nzMode]="mode()"
      [nzType]="type()"
      (nzOnCopy)="onCopy($event)"
    />
  `
})
export class NzTestHashCodeBasicComponent {
  readonly value = signal('dfb5fe9ef7b99b2b1db102114a6d7d445d992f40a5d575f801c148990199a068');
  readonly title = signal('HashCode');
  readonly logo = signal('Antd');
  readonly mode = signal<NzModeType>('double');
  readonly type = signal<'default' | 'primary'>('default');
  readonly copyValue = signal('');

  onCopy(value: string): void {
    this.copyValue.set(value);
  }
}
