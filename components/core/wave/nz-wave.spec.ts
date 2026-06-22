/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { dispatchMouseEvent, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';

import { NzWaveDirective } from './nz-wave.directive';
import { NzWaveModule } from './nz-wave.module';
import { provideNzNoAnimation } from '../animation';

const WAVE_ATTRIBUTE_NAME = 'ant-click-animating-without-extra-node';
const WAVE_ATTRIBUTE_NAME_EXTRA_NODE = 'ant-click-animating';
const EXTRA_NODE_CLASS_NAME = '.ant-click-animating-node';

describe('nz-wave basic', () => {
  let fixture: ComponentFixture<WaveContainerWithButtonComponent>;
  let waveTarget: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveContainerWithButtonComponent);
    fixture.detectChanges();
    waveTarget = fixture.componentInstance.trigger.nativeElement;
  });

  it('should create wave on click', () => {
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(true);
    expect(document.body.querySelector('style') !== null).toBe(true);
  });

  it('should remove wave when transition end', async () => {
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(true);
    expect(document.body.querySelector('style') !== null).toBe(true);
    await updateNonSignalsInput(fixture, 500);
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(false);
    expect(document.body.querySelector('style') !== null).toBe(false);
  });

  it('should throttling when clicks', () => {
    dispatchMouseEvent(waveTarget, 'click');
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    fixture.detectChanges();
    expect(document.body.querySelectorAll('style').length).toBe(1);
  });

  it('should not create wave on click when disabled', () => {
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    fixture.detectChanges();
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(false);
    expect(document.body.querySelector('style') !== null).toBe(false);
  });

  it('should not create wave on click when has disabled class', () => {
    fixture.componentInstance.disabledClass.set(true);
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(false);
    expect(document.body.querySelector('style') !== null).toBe(false);
  });

  it('should not create wave style on click when invalid color', () => {
    fixture.componentInstance.borderColor.set('#ffffff');
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    expect(document.body.querySelector('style') !== null).toBe(false);
  });

  it('should priority use border-color color', () => {
    fixture.componentInstance.borderColor.set('rgb(255, 255, 0)');
    fixture.componentInstance.backgroundColor.set('rgb(255, 0, 0)');
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    const style: string = document.body.querySelector('style')!.innerText;
    expect(style.includes(fixture.componentInstance.borderColor())).toBe(true);
  });

  it('should not create wave style on click when grey color', () => {
    fixture.componentInstance.borderColor.set('#eee');
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    expect(document.body.querySelector('style') !== null).toBe(false);
  });

  it('should destroy', () => {
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(true);
    expect(document.body.querySelector('style') !== null).toBe(true);

    fixture.componentInstance.isDestroyed.set(true);
    fixture.detectChanges();

    expect(document.body.querySelector('style') !== null).toBe(false);
  });
});

describe('nz-wave extra', () => {
  let fixture: ComponentFixture<WaveContainerWithExtraNodeComponent>;
  let waveTarget: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveContainerWithExtraNodeComponent);
    fixture.detectChanges();
    waveTarget = fixture.componentInstance.trigger.nativeElement;
  });

  it('should create wave on click', () => {
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME_EXTRA_NODE)).toBe(true);
    expect(document.body.querySelector('style') !== null).toBe(true);
    expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(true);
  });

  it('should remove wave when transition end', async () => {
    dispatchMouseEvent(waveTarget, 'click');
    expect(document.body.querySelector('style') !== null).toBe(true);
    expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(true);
    await updateNonSignalsInput(fixture, 500);
    expect(document.body.querySelector('style') !== null).toBe(false);
    expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(false);
  });

  it('should not create wave on click when has disabled class', () => {
    fixture.componentInstance.disabledClass.set(true);
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME_EXTRA_NODE)).toBe(false);
    expect(document.body.querySelector('style') !== null).toBe(false);
    expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(false);
  });

  it('should not create wave style on click when invalid color', () => {
    fixture.componentInstance.borderColor.set('#ffffff');
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    expect(document.body.querySelector('style') !== null).toBe(false);
  });

  it('should priority use border-color color', () => {
    fixture.componentInstance.borderColor.set('rgb(255, 255, 0)');
    fixture.componentInstance.backgroundColor.set('rgb(255, 0, 0)');
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    const style: string = document.body.querySelector('style')!.innerText;
    expect(style.includes(fixture.componentInstance.borderColor())).toBe(true);
  });

  it('should not create wave style on click when grey color', () => {
    fixture.componentInstance.borderColor.set('#eee');
    fixture.detectChanges();
    dispatchMouseEvent(waveTarget, 'click');
    expect(document.body.querySelector('style') !== null).toBe(false);
  });

  it('should destroy', () => {
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME_EXTRA_NODE)).toBe(true);
    expect(document.body.querySelector('style') !== null).toBe(true);
    expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(true);

    fixture.componentInstance.isDestroyed.set(true);
    fixture.detectChanges();

    expect(document.body.querySelector('style') !== null).toBe(false);
    expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(false);
  });
});

describe('nz-wave noAnimation', () => {
  let fixture: ComponentFixture<WaveContainerWithButtonComponent>;
  let waveRef: NzWaveDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveContainerWithButtonComponent);
    fixture.detectChanges();
    waveRef = fixture.componentInstance.wave;
  });

  it('should disable by NoopAnimationsModule ', () => {
    expect(waveRef.disabled).toBe(true);
    expect(waveRef.rendererRef).toBeFalsy();
  });

  it('should config priority', () => {
    waveRef.enable();
    expect(waveRef.disabled).toBe(true);
    expect(waveRef.rendererRef).toBeFalsy();
  });
});

describe('nz-wave disable/enable', () => {
  let fixture: ComponentFixture<WaveContainerWithButtonComponent>;
  let waveTarget: HTMLElement;
  let waveRef: NzWaveDirective;

  beforeEach(() => {
    fixture = TestBed.createComponent(WaveContainerWithButtonComponent);
    fixture.detectChanges();
    waveTarget = fixture.componentInstance.trigger.nativeElement;
    waveRef = fixture.componentInstance.wave;
  });

  it('should enable work', () => {
    waveRef.enable();
    expect(waveRef.disabled).toBe(false);
    expect(waveRef.rendererRef).toBeTruthy();
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(true);
    expect(document.body.querySelector('style') !== null).toBe(true);
  });

  it('should disable work', () => {
    waveRef.disable();
    expect(waveRef.disabled).toBe(true);
    dispatchMouseEvent(waveTarget, 'click');
    expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(false);
    expect(document.body.querySelector('style') === null).toBe(true);
  });
});

@Component({
  imports: [NzWaveModule],
  template: `
    @if (!isDestroyed()) {
      <button
        #trigger
        nz-wave
        [attr.disabled]="disabled() || null"
        [class.disabled]="disabledClass()"
        [style.border-color]="borderColor()"
        [style.background-color]="backgroundColor()"
      >
        Button
      </button>
    }
  `
})
class WaveContainerWithButtonComponent {
  readonly disabled = signal(false);
  readonly disabledClass = signal(false);
  readonly isDestroyed = signal(false);
  readonly borderColor = signal('rgb(0,255,0)');
  readonly backgroundColor = signal('rgb(255,255,255)');
  @ViewChild('trigger', { static: false }) trigger!: ElementRef<HTMLElement>;
  @ViewChild(NzWaveDirective, { static: false }) wave!: NzWaveDirective;
}

@Component({
  imports: [NzWaveModule],
  template: `
    @if (!isDestroyed()) {
      <div
        #trigger
        nz-wave
        [nzWaveExtraNode]="true"
        [class.disabled]="disabledClass()"
        [style.border-color]="borderColor()"
        [style.background-color]="backgroundColor()"
      >
        <button>Button</button>
      </div>
    }
  `
})
class WaveContainerWithExtraNodeComponent {
  readonly disabledClass = signal(false);
  readonly isDestroyed = signal(false);
  readonly borderColor = signal('rgb(0,255,0)');
  readonly backgroundColor = signal('rgb(255,255,255)');
  @ViewChild('trigger', { static: false }) trigger!: ElementRef<HTMLElement>;
  @ViewChild(NzWaveDirective, { static: false }) wave!: NzWaveDirective;
}
