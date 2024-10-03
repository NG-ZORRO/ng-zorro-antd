import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchMouseEvent } from 'ng-zorro-antd/core/testing';

import { NzHashCodeComponent } from './hash-code.component';
import { NzHashCodeModule } from './hash-code.module';
import { NzModeType } from './typings';

describe('nz-hash-code', () => {
  let fixture: ComponentFixture<NzTestHashCodeBasicComponent>;
  let testComponent: NzTestHashCodeBasicComponent;
  let resultEl: DebugElement;

  function waitingForTooltipToggling(): void {
    fixture.detectChanges();
    tick(500);
    fixture.detectChanges();
  }

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(NzTestHashCodeBasicComponent);
    fixture.detectChanges();
    testComponent = fixture.componentInstance;
    resultEl = fixture.debugElement.query(By.directive(NzHashCodeComponent));
  }));

  it('basic', () => {
    fixture.detectChanges();
    const dom = resultEl.nativeElement;
    expect(dom.querySelector('.ant-hashCode-header-title').innerText).toBe('HashCode');
    expect(dom.querySelectorAll('.ant-hashCode-code-value-block').length).toBe(8);
    expect(dom.querySelector('.ant-hashCode-header-logo').innerText).toBe('Antd');
    expect(!!dom.querySelector('.ant-hashCode-texaure')).toBeTrue();
  });

  it('should value length work', () => {
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

  it('should mode single work', () => {
    testComponent.mode = 'single';
    fixture.detectChanges();
    expect(!!resultEl.nativeElement.querySelector('.ant-hashCode-header')).toBeFalse();
    expect(!!resultEl.nativeElement.querySelector('.ant-hashCode-header-copy')).toBeTrue();
    expect(resultEl.nativeElement.classList).toContain('ant-hashCode-single');
  });

  it('should mode strip work', () => {
    testComponent.mode = 'strip';
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-hashCode-strip');
  });

  it('should rect mode work', () => {
    testComponent.mode = 'rect';
    fixture.detectChanges();
    expect(!!resultEl.nativeElement.querySelector('.ant-hashCode-header')).toBeFalse();
    expect(!!resultEl.nativeElement.querySelector('.ant-hashCode-header-copy')).toBeTrue();
    expect(resultEl.nativeElement.classList).toContain('ant-hashCode-rect');
  });

  it('should type work', () => {
    testComponent.type = 'primary';
    fixture.detectChanges();
    expect(resultEl.nativeElement.classList).toContain('ant-hashCode-primary');
  });

  it('should copy work', fakeAsync(() => {
    fixture.detectChanges();
    const copy = resultEl.nativeElement.querySelector('.ant-hashCode-header-copy');
    dispatchMouseEvent(copy, 'click');
    waitingForTooltipToggling();
    expect(testComponent.copyValue).toBe(testComponent.value);
  }));
});

@Component({
  standalone: true,
  imports: [NzHashCodeModule],
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
