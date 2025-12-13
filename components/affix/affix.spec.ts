/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { Component, DebugElement, DOCUMENT, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { NzScrollService } from 'ng-zorro-antd/core/services';
import { provideMockDirectionality, sleep } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { toCssPixelNumber } from 'ng-zorro-antd/core/util';

import { NzAffixComponent } from './affix.component';

interface Offset {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface Scroll {
  top: number;
  left: number;
}

describe('affix', () => {
  let scrollService: NzScrollService;
  let fixture: ComponentFixture<TestAffixComponent>;
  let context: TestAffixComponent;
  let debugElement: DebugElement;
  let component: NzAffixComponent;
  let componentObject: NzAffixPageObject;
  const defaultOffsetTop = 0;
  const scrollEvent: Event = new Event('scroll');
  const startOffset = 10;
  const handledEvents: Event[] = [
    scrollEvent,
    new Event('resize'),
    new Event('touchstart'),
    new Event('touchmove'),
    new Event('touchend'),
    new Event('pageshow'),
    new Event('load')
  ];
  const height = 100;
  const width = 100;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAffixComponent);
    context = fixture.componentInstance;
    component = context.nzAffixComponent;
    scrollService = TestBed.inject(NzScrollService);
    componentObject = new NzAffixPageObject();
    debugElement = fixture.debugElement;
    componentObject.wrap().id = 'wrap';
  });

  describe('basic', () => {
    it('recreate bug https://github.com/NG-ZORRO/ng-zorro-antd/issues/671', async () => {
      const edge = defaultOffsetTop + startOffset;
      await setupInitialState();
      await emitScroll(window, edge + 2);
      componentObject.emitScroll(window, edge + 1);
      componentObject.emitScroll(window, edge);
      componentObject.emitScroll(window, edge - 1);
      await sleep(100);

      expect(componentObject.wrap().offsetTop).not.toBe(defaultOffsetTop);
    });

    describe('when scrolled within top offset', () => {
      it('scrolls with the content', async () => {
        await setupInitialState();
        await emitScroll(window, defaultOffsetTop + startOffset - 1);

        expect(componentObject.wrap().offsetTop !== defaultOffsetTop).toBe(true);
      });
    });

    describe('when scrolled below the top offset', () => {
      it('sticks to the top offset', async () => {
        await setupInitialState();
        await emitScroll(window, defaultOffsetTop + startOffset + 1);
        expect(componentObject.wrap().offsetTop).toBe(defaultOffsetTop);
      });

      describe('when element gets shifted horizontally', () => {
        it('adjusts left position accordingly to maintain natural position', async () => {
          await setupInitialState();
          componentObject.offsetTo(componentObject.elementRef(), { top: startOffset, left: 10, width, height });
          await emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetLeft).toBe(10);

          await emitScroll(window, defaultOffsetTop + startOffset - 1);
          componentObject.offsetTo(componentObject.elementRef(), { top: startOffset, left: 100, width, height });
          await emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetLeft).toBe(100);
        });
      });

      for (const event of handledEvents) {
        it(`handles '${event.type}' event`, async () => {
          await setupInitialState();
          await emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetTop).toBe(defaultOffsetTop);
        });
      }
    });
  });

  describe('resize', () => {
    it('should be reset placeholder size', async () => {
      const offsetTop = 150;
      context.newOffset = offsetTop;
      await setupInitialState({ offsetTop: offsetTop + 1 });
      const offsetWidthSpy = spyOnProperty(componentObject.elementRef(), 'offsetWidth', 'get');
      await emitScroll(window, 2);
      expect(componentObject.elementRef().style.width).toBe(`${width}px`);
      componentObject.offsetYTo(componentObject.elementRef(), offsetTop + 2);
      await sleep(20);

      offsetWidthSpy.and.returnValue(100);
      componentObject.emitEvent(window, new Event('resize'));
      await sleep(20);

      expect(componentObject.elementRef().style.width).toBe('100px');
    });

    it('should be reset placeholder size when container becomes greater', async () => {
      const target = componentObject.target();
      const clientHeightSpy = spyOnProperty(target, 'clientHeight', 'get');
      context.fakeTarget = target;
      context.newOffsetBottom = 10;
      clientHeightSpy.and.returnValue(10);
      await setupInitialState();
      await emitScroll(target, 11);
      clientHeightSpy.and.returnValue(100);
      componentObject.emitEvent(target, new Event('resize'));
      await sleep(20);

      expect(componentObject.elementRef().style.width).toBe(`${componentObject.elementRef().offsetWidth}px`);
    });
  });

  describe('[nzOffsetTop]', () => {
    const offsetTop = 150;

    beforeEach(() => {
      context.newOffset = offsetTop;
    });

    describe('when scrolled within top offset', () => {
      it('scrolls with the content', async () => {
        await setupInitialState({ offsetTop: offsetTop + 1 });
        await emitScroll(window, 0);

        expect(componentObject.wrap().offsetTop !== offsetTop).toBe(true);
      });
    });

    describe('when scrolled below the top offset', () => {
      it('sticks to the top offset', async () => {
        await setupInitialState({ offsetTop: offsetTop + 1 });
        await emitScroll(window, 2);

        expect(componentObject.wrap().offsetTop).toBe(offsetTop);
      });
    });

    it('recreate bug https://github.com/NG-ZORRO/ng-zorro-antd/issues/868', async () => {
      context.newOffset = offsetTop.toString() as NzSafeAny;
      await setupInitialState({ offsetTop: offsetTop + 1 });
      await emitScroll(window, 2);

      expect(componentObject.wrap().offsetTop).toBe(offsetTop);
    });
  });

  describe('[nzOffsetBottom]', () => {
    const offsetTop = 0;
    let target: HTMLElement | Window;

    describe('with window', () => {
      beforeEach(() => {
        target = window;
        context.fakeTarget = target;
        context.newOffsetBottom = 10;
      });

      describe('when scrolled below the bottom offset', () => {
        it('should stick to the bottom with the specified offset', async () => {
          await setupInitialState({ offsetTop: 5000 });
          expect(toCssPixelNumber(componentObject.wrap().style.bottom)).toBe(10);
        });
      });
    });

    describe('with target', () => {
      beforeEach(() => {
        target = componentObject.target();
        context.fakeTarget = target;
        context.newOffsetBottom = offsetTop;
      });

      describe('when scrolled within bottom offset', () => {
        it('should scroll with the content', async () => {
          await setupInitialState();
          await emitScroll(target, 0);
          expect(toCssPixelNumber(componentObject.wrap().style.bottom)).toBeGreaterThan(0);
        });
      });

      describe('when scrolled below the bottom offset', () => {
        it('should stick to the bottom offset', async () => {
          await setupInitialState();
          await emitScroll(target, 5000);
          expect(toCssPixelNumber(componentObject.wrap().style.bottom)).toBe(0);
        });
      });
    });
  });

  describe('[nzTarget]', () => {
    let target: HTMLElement;

    beforeEach(() => {
      target = componentObject.target();
      context.fakeTarget = target;
    });

    describe('when window is scrolled', () => {
      it('scrolls with the content', async () => {
        await setupInitialState();
        await emitScroll(window, defaultOffsetTop + startOffset + 1);

        expect(componentObject.elementRef().offsetTop !== defaultOffsetTop).toBe(true);
      });
    });

    describe('when custom target is scrolled within top offset', () => {
      it('scrolls with the content', async () => {
        await setupInitialState();
        await emitScroll(target, defaultOffsetTop + startOffset - 1);

        expect(componentObject.elementRef().offsetTop !== defaultOffsetTop).toBe(true);
      });
    });

    describe('when custom target is scrolled below the top offset', () => {
      it('sticks to the top offset', async () => {
        await setupInitialState();
        await emitScroll(target, defaultOffsetTop + startOffset + 1);

        expect(componentObject.elementRef().offsetTop !== defaultOffsetTop).toBe(true);
      });
    });

    it('should be a string value', async () => {
      spyOn(component, 'updatePosition');
      expect(component.updatePosition).not.toHaveBeenCalled();

      context.fakeTarget = '#target';
      await fixture.whenStable();

      expect(component.updatePosition).toHaveBeenCalled();
    });
  });

  describe('(nzChange)', () => {
    let changeValue: boolean;
    beforeEach(() => {
      component.nzChange.subscribe(returnValue => {
        changeValue = returnValue;
      });
    });

    it(`emit true when is affixed`, async () => {
      await setupInitialState();
      await emitScroll(window, defaultOffsetTop + startOffset + 1);

      expect(changeValue).toBe(true);
    });

    it(`emit false when isn't affixed`, async () => {
      await setupInitialState();
      await emitScroll(window, defaultOffsetTop + startOffset + 1);
      await emitScroll(window, defaultOffsetTop + startOffset - 1);

      expect(changeValue).toBe(false);
    });
  });

  class NzAffixPageObject {
    offsets: Record<string, Offset>;
    scrolls: Record<string, Scroll>;

    constructor() {
      spyOn(component, 'getOffset').and.callFake(this.getOffset.bind(this));
      spyOn(scrollService, 'getScroll').and.callFake(this.getScroll.bind(this));
      this.offsets = { undefined: { top: 10, left: 0, height: 0, width: 0 } };
      this.scrolls = { undefined: { top: 10, left: 0 } };
    }

    getScroll(el?: Element | Window, top: boolean = true): number {
      const ret = this.scrolls[this.getKey(el)] || { top: 0, left: 0 };
      return top ? ret.top : ret.left;
    }

    getOffset(el: Element): Offset {
      return this.offsets[el.id] || { top: 10, left: 0, height, width };
    }

    emitEvent(el: Element | Window, event: Event): void {
      el.dispatchEvent(event);
    }

    emitScroll(el: Element | Window, top: number, left: number = 0): void {
      this.scrolls[this.getKey(el)] = { top, left };
      this.emitEvent(el || window, scrollEvent);
    }

    offsetTo(el: Element, offset: Offset): void {
      this.offsets[this.getKey(el)] = {
        top: offset.top,
        left: offset.left,
        height,
        width
      };
    }

    offsetYTo(el: Element, offsetTop: number): void {
      this.offsetTo(el, {
        top: offsetTop,
        left: 0,
        height,
        width
      });
    }

    elementRef(): HTMLElement {
      return debugElement.query(By.css('nz-affix')).nativeElement;
    }

    wrap(): HTMLElement {
      return debugElement.query(By.css('div')).nativeElement;
    }

    target(): HTMLElement {
      return debugElement.query(By.css('#target')).nativeElement;
    }

    private getKey(el?: Element | Window): string {
      let key: string;
      if (el instanceof Window) {
        key = 'window';
      } else {
        key = (el && el.id) || 'window';
      }

      return key;
    }
  }

  async function setupInitialState(options: { offsetTop?: number } = {}): Promise<void> {
    componentObject.offsetYTo(componentObject.elementRef(), options.offsetTop || startOffset);
    await sleep(20);
    await fixture.whenStable();
    componentObject.emitScroll(window, 0);
    await sleep(20);
    await fixture.whenStable();
  }

  async function emitScroll(el: Element | Window, offset: number): Promise<void> {
    componentObject.emitScroll(el, offset);
    await sleep(20);
    await fixture.whenStable();
  }
});

@Component({
  imports: [NzAffixComponent],
  template: `
    <nz-affix id="affix" [nzTarget]="fakeTarget" [nzOffsetTop]="newOffset" [nzOffsetBottom]="newOffsetBottom">
      <button id="content">Affix Button</button>
    </nz-affix>
    <div id="target"></div>
  `
})
class TestAffixComponent {
  @ViewChild(NzAffixComponent, { static: true }) nzAffixComponent!: NzAffixComponent;
  fakeTarget?: string | Element | Window;
  newOffset!: number;
  newOffsetBottom!: number;
}

describe('NzAffixComponent', () => {
  let component: NzAffixComponent;
  let fixture: ComponentFixture<NzAffixComponent>;
  let mockPlatform: Platform;
  let mockDirectionality: Directionality;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NzAffixComponent,
        NzScrollService,
        { provide: Renderer2, useValue: jasmine.createSpyObj('Renderer2', ['setStyle', 'addClass', 'removeClass']) },
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
        { provide: DOCUMENT, useValue: document },
        provideMockDirectionality(),
        { provide: Platform, useValue: { isBrowser: true } }
      ]
    });

    fixture = TestBed.createComponent(NzAffixComponent);
    component = fixture.componentInstance;
    mockPlatform = TestBed.inject(Platform);
    mockDirectionality = TestBed.inject(Directionality);
  });

  it('should handle directionality change', async () => {
    spyOn<NzSafeAny>(component, 'registerListeners');
    spyOn(component, 'updatePosition');

    await fixture.whenStable();

    expect(component['registerListeners']).toHaveBeenCalledTimes(1);
    expect(component.updatePosition).toHaveBeenCalledTimes(1);

    mockDirectionality.valueSignal.set('rtl');
    await fixture.whenStable();

    expect(component['registerListeners']).toHaveBeenCalledTimes(2);
    expect(component.updatePosition).toHaveBeenCalledTimes(2);
  });

  it('should register listeners if platform is browser', async () => {
    spyOn(component as NzSafeAny, 'removeListeners');

    await fixture.whenStable();

    expect(component['removeListeners']).toHaveBeenCalled();
    expect(component['positionChangeSubscription']).toBeDefined();
    expect(component['timeout']).toBeDefined();
  });

  it('should not register listeners if platform is not browser', async () => {
    mockPlatform.isBrowser = false;

    await fixture.whenStable();

    expect(component['positionChangeSubscription']).toEqual(Subscription.EMPTY);
  });

  it('should remove listeners on destroy', () => {
    spyOn(component as NzSafeAny, 'removeListeners');
    fixture.destroy();
    expect(component['removeListeners']).toHaveBeenCalled();
  });

  it('should update position correctly', () => {
    spyOn<NzSafeAny>(component, 'setAffixStyle');
    spyOn<NzSafeAny>(component, 'setPlaceholderStyle');

    const event = new Event('scroll');
    component.updatePosition(event);

    expect(component['setAffixStyle']).toHaveBeenCalled();
    expect(component['setPlaceholderStyle']).toHaveBeenCalled();
  });

  it('should update RTL class when direction changes', () => {
    const fixedEl = component['fixedEl'].nativeElement;
    fixedEl.classList.add('ant-affix');
    component['updateRtlClass']();

    expect(fixedEl.classList.contains('ant-affix-rtl')).toBeFalse();

    mockDirectionality.valueSignal.set('rtl');
    component['updateRtlClass']();

    expect(fixedEl.classList.contains('ant-affix-rtl')).toBeTrue();

    mockDirectionality.valueSignal.set('ltr');
    component['updateRtlClass']();

    expect(fixedEl.classList.contains('ant-affix-rtl')).toBeFalse();

    mockDirectionality.valueSignal.set('rtl');
    fixedEl.classList.remove('ant-affix');
    fixedEl.classList.add('ant-affix-rtl');
    component['updateRtlClass']();

    expect(component['fixedEl'].nativeElement.classList.contains('ant-affix-rtl')).toBeFalse();
  });

  it('should not perform position updates if platform is not browser', () => {
    mockPlatform.isBrowser = false;
    spyOn<NzSafeAny>(component, 'getOffset');

    component.updatePosition(new Event('scroll'));

    expect(component['getOffset']).not.toHaveBeenCalled();
  });

  it('should update affixStyle with new width on resize event', () => {
    mockPlatform.isBrowser = true;
    spyOn(component, 'getOffset').and.returnValue({
      top: 0,
      left: 0,
      width: 100,
      height: 50
    });
    spyOn<NzSafeAny>(component, 'setAffixStyle');
    component.nzOffsetTop = 10;
    component.nzOffsetBottom = 10;

    component.updatePosition(new Event('resize'));

    expect(component['setAffixStyle']).toHaveBeenCalledWith(
      jasmine.any(Event),
      jasmine.objectContaining({ width: 100 })
    );
  });

  it('should update the affix style with the correct width on resize', () => {
    spyOn<NzSafeAny>(component, 'setAffixStyle');

    const scrollTop = 40;
    spyOn(component['scrollSrv'], 'getScroll').and.returnValue(scrollTop);
    const elemOffset = { top: 200, left: 0, width: 200, height: 50 };
    spyOn(component, 'getOffset').and.returnValue(elemOffset);
    component['nzOffsetTop'] = 150;
    component['nzOffsetBottom'] = 50;
    spyOnProperty(component['placeholderNode'], 'offsetWidth').and.returnValue(120);

    component['affixStyle'] = {
      position: 'fixed',
      top: '10px',
      left: '10px',
      width: '100px'
    };

    const mockEvent = new Event('resize');
    component.updatePosition(mockEvent);

    expect(component['setAffixStyle']).toHaveBeenCalledWith(mockEvent, {
      position: 'fixed',
      top: '10px',
      left: '10px',
      width: 120
    });
  });
});
