/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ANIMATION_MODULE_TYPE, Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import {
  isAnimationEnabled,
  NZ_NO_ANIMATION_CLASS,
  NzNoAnimationDirective,
  provideNzNoAnimation,
  withAnimationCheck
} from './no-animation';

@Component({
  template: `<div #element [nzNoAnimation]="noAnimation()" data-testid="test-element"></div>`,
  imports: [NzNoAnimationDirective]
})
class TestComponent {
  noAnimation = signal(false);
  animationClass = withAnimationCheck(() => 'animation-class');
  animationEnabled = isAnimationEnabled(() => !this.noAnimation());
}

describe('NzNoAnimationDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;

  describe('without NoopAnimations', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({});
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should not add animation disabled class when nzNoAnimation is false', () => {
      const element = fixture.nativeElement.querySelector('[data-testid="test-element"]');
      expect(element.classList.contains(NZ_NO_ANIMATION_CLASS)).toBeFalse();
    });

    it('should add animation disabled class when nzNoAnimation is true', async () => {
      component.noAnimation.set(true);
      await fixture.whenStable();
      const element = fixture.nativeElement.querySelector('[data-testid="test-element"]');
      expect(element.classList.contains(NZ_NO_ANIMATION_CLASS)).toBeTrue();
    });
  });

  describe('with NoopAnimations', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNoopAnimations()]
      });
      fixture = TestBed.createComponent(TestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should add animation disabled class even when nzNoAnimation is false', () => {
      const element = fixture.nativeElement.querySelector('[data-testid="test-element"]');
      expect(element.classList.contains(NZ_NO_ANIMATION_CLASS)).toBeTrue();
    });

    it('should keep animation disabled class when nzNoAnimation is true', async () => {
      component.noAnimation.set(true);
      await fixture.whenStable();
      const element = fixture.nativeElement.querySelector('[data-testid="test-element"]');
      expect(element.classList.contains(NZ_NO_ANIMATION_CLASS)).toBeTrue();
    });
  });
});

describe('provideNzNoAnimation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  it('should provide NoopAnimations animation type', () => {
    const animationType = TestBed.inject(ANIMATION_MODULE_TYPE);
    expect(animationType).toBe('NoopAnimations');
  });

  it('should disable animations globally when used', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('[data-testid="test-element"]');
    expect(element.classList.contains(NZ_NO_ANIMATION_CLASS)).toBeTrue();
  });
});

describe('isAnimationEnabled', () => {
  it('should return passed getter when animations are enabled', () => {
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance.animationEnabled()).toBe(true);

    fixture.componentInstance.noAnimation.set(true);
    expect(fixture.componentInstance.animationEnabled()).toBe(false);
  });

  it('should return false with provideNoopAnimations', async () => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance.animationEnabled()).toBe(false);
  });

  it('should return false with provideNzNoAnimation', async () => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
    const fixture = TestBed.createComponent(TestComponent);
    expect(fixture.componentInstance.animationEnabled()).toBe(false);
  });

  describe('injection context validation', () => {
    it('should throw error when called outside injection context in dev mode', () => {
      const originalDevMode = (globalThis as { ngDevMode?: boolean }).ngDevMode;
      (globalThis as { ngDevMode?: boolean }).ngDevMode = true;

      expect(() => {
        isAnimationEnabled(() => true);
      }).toThrow();

      (globalThis as { ngDevMode?: boolean }).ngDevMode = originalDevMode;
    });
  });
});

describe('withAnimationCheck', () => {
  it('should return dynamic class when animations are enabled', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.animationClass()).toBe('animation-class');
  });

  it('should return no-animation class with provideNoopAnimations', () => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
    });
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.animationClass()).toBe(NZ_NO_ANIMATION_CLASS);
  });

  it('should return no-animation class with provideNzNoAnimation', () => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    expect(fixture.componentInstance.animationClass()).toBe(NZ_NO_ANIMATION_CLASS);
  });

  describe('injection context validation', () => {
    it('should throw error when called outside injection context in dev mode', () => {
      const originalDevMode = (globalThis as { ngDevMode?: boolean }).ngDevMode;
      (globalThis as { ngDevMode?: boolean }).ngDevMode = true;

      expect(() => {
        withAnimationCheck(() => 'test-class');
      }).toThrow();

      (globalThis as { ngDevMode?: boolean }).ngDevMode = originalDevMode;
    });
  });
});
