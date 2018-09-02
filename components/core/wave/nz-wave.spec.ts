import { Component, ElementRef, ViewChild } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { dispatchMouseEvent } from '../testing';
import { NzWaveDirective } from './nz-wave.directive';
import { NzWaveModule } from './nz-wave.module';

const WAVE_ATTRIBUTE_NAME = 'ant-click-animating-without-extra-node';
const WAVE_ATTRIBUTE_NAME_EXTRA_NODE = 'ant-click-animating';
const EXTRA_NODE_CLASS_NAME = '.ant-click-animating-node';

describe('nz-wave', () => {
  let fixture: ComponentFixture<WaveContainerWithButtonComponent | WaveContainerWithExtraNodeComponent>;
  let waveTarget: HTMLElement;
  let waveDirective: NzWaveDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzWaveModule],
      declarations: [
        WaveContainerWithButtonComponent,
        WaveContainerWithExtraNodeComponent
      ]
    });
  });

  describe('basic wave', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(WaveContainerWithButtonComponent);
      fixture.detectChanges();
      waveTarget = fixture.componentInstance.trigger.nativeElement;
      waveDirective = fixture.componentInstance.wave;
    });

    it('should create wave on click', () => {
      dispatchMouseEvent(waveTarget, 'click');
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(true);
      expect(document.body.querySelector('style') !== null).toBe(true);
    });

    it('should remove wave when transition end', fakeAsync(() => {
      dispatchMouseEvent(waveTarget, 'click');
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(true);
      expect(document.body.querySelector('style') !== null).toBe(true);
      tick(500);
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(false);
      expect(document.body.querySelector('style') !== null).toBe(false);
    }));

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
      (fixture.componentInstance as WaveContainerWithButtonComponent).disabled = true;
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(false);
      expect(document.body.querySelector('style') !== null).toBe(false);
    });

    it('should not create wave on click when has disabled class', () => {
      fixture.componentInstance.disabledClass = true;
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(false);
      expect(document.body.querySelector('style') !== null).toBe(false);
    });

    it('should not create wave style on click when invalid color', () => {
      fixture.componentInstance.borderColor = '#ffffff';
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      expect(document.body.querySelector('style') !== null).toBe(false);
    });

    it('should priority use border-color color', () => {
      fixture.componentInstance.borderColor = 'rgb(255, 255, 0)';
      fixture.componentInstance.backgroundColor = 'rgb(255, 0, 0)';
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      const style: string = document.body.querySelector('style').innerText;
      expect(style.includes(fixture.componentInstance.borderColor)).toBe(true);
    });

    it('should not create wave style on click when grey color', () => {
      fixture.componentInstance.borderColor = '#eee';
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      expect(document.body.querySelector('style') !== null).toBe(false);
    });

    it('should destroy', () => {
      dispatchMouseEvent(waveTarget, 'click');
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME)).toBe(true);
      expect(document.body.querySelector('style') !== null).toBe(true);

      fixture.componentInstance.isDestroyed = true;
      fixture.detectChanges();

      expect(document.body.querySelector('style') !== null).toBe(false);
    });
  });

  describe('extra node wave', () => {

    beforeEach(() => {
      fixture = TestBed.createComponent(WaveContainerWithExtraNodeComponent);
      fixture.detectChanges();
      waveTarget = fixture.componentInstance.trigger.nativeElement;
      waveDirective = fixture.componentInstance.wave;
    });

    it('should create wave on click', () => {
      dispatchMouseEvent(waveTarget, 'click');
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME_EXTRA_NODE)).toBe(true);
      expect(document.body.querySelector('style') !== null).toBe(true);
      expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(true);
    });

    it('should remove wave when transition end', fakeAsync(() => {
      dispatchMouseEvent(waveTarget, 'click');
      expect(document.body.querySelector('style') !== null).toBe(true);
      expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(true);
      tick(500);
      expect(document.body.querySelector('style') !== null).toBe(false);
      expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(false);
    }));

    it('should not create wave on click when has disabled class', () => {
      fixture.componentInstance.disabledClass = true;
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME_EXTRA_NODE)).toBe(false);
      expect(document.body.querySelector('style') !== null).toBe(false);
      expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(false);
    });

    it('should not create wave style on click when invalid color', () => {
      fixture.componentInstance.borderColor = '#ffffff';
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      expect(document.body.querySelector('style') !== null).toBe(false);
    });

    it('should priority use border-color color', () => {
      fixture.componentInstance.borderColor = 'rgb(255, 255, 0)';
      fixture.componentInstance.backgroundColor = 'rgb(255, 0, 0)';
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      const style: string = document.body.querySelector('style').innerText;
      expect(style.includes(fixture.componentInstance.borderColor)).toBe(true);
    });

    it('should not create wave style on click when grey color', () => {
      fixture.componentInstance.borderColor = '#eee';
      fixture.detectChanges();
      dispatchMouseEvent(waveTarget, 'click');
      expect(document.body.querySelector('style') !== null).toBe(false);
    });

    it('should destroy', () => {
      dispatchMouseEvent(waveTarget, 'click');
      expect(waveTarget.hasAttribute(WAVE_ATTRIBUTE_NAME_EXTRA_NODE)).toBe(true);
      expect(document.body.querySelector('style') !== null).toBe(true);
      expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(true);

      fixture.componentInstance.isDestroyed = true;
      fixture.detectChanges();

      expect(document.body.querySelector('style') !== null).toBe(false);
      expect(waveTarget.querySelector(EXTRA_NODE_CLASS_NAME) !== null).toBe(false);

    });

  });

});

@Component({
  template: `
  <button
    #trigger
    nz-wave
    *ngIf="!isDestroyed"
    [disabled]="disabled"
    [class.disabled]="disabledClass"
    [style.border-color]="borderColor"
    [style.background-color]="backgroundColor">
    Button
  </button>
  `
})
class WaveContainerWithButtonComponent {
  disabled = false;
  disabledClass = false;
  isDestroyed = false;
  borderColor = 'rgb(0,255,0)';
  backgroundColor = 'rgb(255,255,255)';
  @ViewChild('trigger') trigger: ElementRef<HTMLElement>;
  @ViewChild(NzWaveDirective) wave: NzWaveDirective;
}

@Component({
  template: `
  <div
    #trigger
    nz-wave
    *ngIf="!isDestroyed"
    [nzWaveExtraNode]="true"
    [class.disabled]="disabledClass"
    [style.border-color]="borderColor"
    [style.background-color]="backgroundColor">
    <button>Button</button>
  </div>
  `
})
class WaveContainerWithExtraNodeComponent {
  disabledClass = false;
  isDestroyed = false;
  borderColor = 'rgb(0,255,0)';
  backgroundColor = 'rgb(255,255,255)';
  @ViewChild('trigger') trigger: ElementRef<HTMLElement>;
  @ViewChild(NzWaveDirective) wave: NzWaveDirective;
}
