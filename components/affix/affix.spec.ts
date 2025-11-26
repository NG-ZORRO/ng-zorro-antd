/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import {
  Component,
  DebugElement,
  DOCUMENT,
  ElementRef,
  provideZoneChangeDetection,
  Renderer2,
  ViewChild
} from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject, Subscription } from 'rxjs';

import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

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
    TestBed.configureTestingModule({
      providers: [
        // todo: use zoneless
        provideZoneChangeDetection(),
        {
          provide: NzScrollService,
          useClass: NzScrollService
        }
      ]
    });

    fixture = TestBed.createComponent(TestAffixComponent);
    context = fixture.componentInstance;
    component = context.nzAffixComponent;
    scrollService = TestBed.inject(NzScrollService);
    componentObject = new NzAffixPageObject();
    debugElement = fixture.debugElement;
    componentObject.wrap().id = 'wrap';
  });

  afterEach(fakeAsync(() => {
    setupInitialState();
  }));

  describe('[default]', () => {
    it('recreate bug https://github.com/NG-ZORRO/ng-zorro-antd/issues/671', fakeAsync(() => {
      const edge = defaultOffsetTop + startOffset;
      setupInitialState();
      emitScroll(window, edge + 2);
      componentObject.emitScroll(window, edge + 1);
      componentObject.emitScroll(window, edge);
      componentObject.emitScroll(window, edge - 1);
      tick(100);
      fixture.detectChanges();

      expect(componentObject.wrap().offsetTop !== defaultOffsetTop).toBe(true);
      setupInitialState();
      discardPeriodicTasks();
    }));

    it('wraps content with affix', fakeAsync(() => {
      expect(componentObject.content() === null).toBe(false);
      setupInitialState();
      discardPeriodicTasks();
    }));

    describe('when scrolled within top offset', () => {
      it('scrolls with the content', fakeAsync(() => {
        setupInitialState();
        emitScroll(window, defaultOffsetTop + startOffset - 1);

        expect(componentObject.wrap().offsetTop !== defaultOffsetTop).toBe(true);
        setupInitialState();
        discardPeriodicTasks();
      }));
    });

    describe('when scrolled below the top offset', () => {
      it('sticks to the top offset', fakeAsync(() => {
        setupInitialState();
        emitScroll(window, defaultOffsetTop + startOffset + 1);
        expect(componentObject.wrap().offsetTop).toBe(defaultOffsetTop);
        setupInitialState();
        discardPeriodicTasks();
      }));

      describe('when element gets shifted horizontally', () => {
        it('adjusts left position accordingly to maintain natural position', fakeAsync(() => {
          setupInitialState();
          componentObject.offsetTo(componentObject.elementRef(), { top: startOffset, left: 10, width, height });
          emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetLeft).toBe(10);

          emitScroll(window, defaultOffsetTop + startOffset - 1);
          componentObject.offsetTo(componentObject.elementRef(), { top: startOffset, left: 100, width, height });
          emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetLeft).toBe(100);
          setupInitialState();
          discardPeriodicTasks();
        }));
      });

      for (const event of handledEvents) {
        it(`handles '${event.type}' event`, fakeAsync(() => {
          setupInitialState();
          emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetTop).toBe(defaultOffsetTop);
          setupInitialState();
          discardPeriodicTasks();
        }));
      }
    });

    it('should be re-adjust width when trigger resize', fakeAsync(() => {
      setupInitialState();
      emitScroll(window, defaultOffsetTop + startOffset - 1);
      componentObject.emitEvent(window, new Event('resize'));
      tick(20);
      fixture.detectChanges();
      setupInitialState();
      discardPeriodicTasks();
    }));
  });

  describe('resize', () => {
    it('should be reset placeholder size', fakeAsync(() => {
      const offsetTop = 150;
      context.newOffset = offsetTop;
      setupInitialState({ offsetTop: offsetTop + 1 });
      const offsetWidthSpy = spyOnProperty(componentObject.elementRef(), 'offsetWidth', 'get');
      emitScroll(window, 2);
      expect(componentObject.elementRef().style.width).toBe(`${width}px`);
      componentObject.offsetYTo(componentObject.elementRef(), offsetTop + 2);
      tick(20);
      fixture.detectChanges();
      offsetWidthSpy.and.returnValue(100);
      componentObject.emitEvent(window, new Event('resize'));
      tick(20);
      fixture.detectChanges();

      expect(componentObject.elementRef().style.width).toBe(`100px`);
      setupInitialState();
      discardPeriodicTasks();
    }));

    it('should be reset placeholder size when container becomes greater', fakeAsync(() => {
      const target = componentObject.target();
      const clientHeightSpy = spyOnProperty(target, 'clientHeight', 'get');
      context.fakeTarget = target;
      context.newOffsetBottom = 10;
      clientHeightSpy.and.returnValue(10);
      setupInitialState();
      emitScroll(target, 11);
      clientHeightSpy.and.returnValue(100);
      componentObject.emitEvent(target, new Event('resize'));
      tick(20);
      fixture.detectChanges();
      expect(componentObject.elementRef().style.width).toBe(`${componentObject.elementRef().offsetWidth}px`);
      setupInitialState();
      discardPeriodicTasks();
    }));
  });

  describe('[nzOffsetTop]', () => {
    const offsetTop = 150;

    beforeEach(() => {
      context.newOffset = offsetTop;
    });

    describe('when scrolled within top offset', () => {
      it('scrolls with the content', fakeAsync(() => {
        setupInitialState({ offsetTop: offsetTop + 1 });
        emitScroll(window, 0);

        expect(componentObject.wrap().offsetTop !== offsetTop).toBe(true);

        discardPeriodicTasks();
      }));
    });

    describe('when scrolled below the top offset', () => {
      it('sticks to the top offset', fakeAsync(() => {
        setupInitialState({ offsetTop: offsetTop + 1 });
        emitScroll(window, 2);

        expect(componentObject.wrap().offsetTop).toBe(offsetTop);
        emitScroll(window, 0);

        discardPeriodicTasks();
      }));
    });

    it('recreate bug https://github.com/NG-ZORRO/ng-zorro-antd/issues/868', fakeAsync(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      context.newOffset = offsetTop.toString() as any;
      setupInitialState({ offsetTop: offsetTop + 1 });
      emitScroll(window, 2);

      expect(componentObject.wrap().offsetTop).toBe(offsetTop);
      emitScroll(window, 0);

      discardPeriodicTasks();
    }));
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
        it('sticks to the bottom offset', fakeAsync(() => {
          setupInitialState();
          emitScroll(target, 5000);
          const wrapEl = componentObject.wrap();
          expect(+wrapEl.style.bottom!.replace('px', '')).toBe(0);
          emitScroll(window, 0);

          setupInitialState();
        }));
      });
    });

    describe('with target', () => {
      beforeEach(() => {
        target = componentObject.target();
        context.fakeTarget = target;
        context.newOffsetBottom = offsetTop;
      });
      describe('when scrolled within bottom offset', () => {
        it('scrolls with the content', fakeAsync(() => {
          setupInitialState();
          emitScroll(target, 0);
          const wrapEl = componentObject.wrap();
          expect(+wrapEl.style.bottom!.replace('px', '')).toBeGreaterThan(0);
          setupInitialState();
          discardPeriodicTasks();
        }));
      });

      describe('when scrolled below the bottom offset', () => {
        it('sticks to the bottom offset', fakeAsync(() => {
          setupInitialState();
          emitScroll(target, 5000);
          const wrapEl = componentObject.wrap();
          expect(+wrapEl.style.bottom!.replace('px', '')).toBe(0);
          setupInitialState();
          discardPeriodicTasks();
        }));
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
      it('scrolls with the content', fakeAsync(() => {
        setupInitialState();
        emitScroll(window, defaultOffsetTop + startOffset + 1);

        expect(componentObject.elementRef().offsetTop !== defaultOffsetTop).toBe(true);
        emitScroll(window, 0);
        discardPeriodicTasks();
      }));
    });

    describe('when custom target is scrolled within top offset', () => {
      it('scrolls with the content', fakeAsync(() => {
        setupInitialState();
        emitScroll(target, defaultOffsetTop + startOffset - 1);

        expect(componentObject.elementRef().offsetTop !== defaultOffsetTop).toBe(true);
        setupInitialState();
        discardPeriodicTasks();
      }));
    });

    describe('when custom target is scrolled below the top offset', () => {
      it('sticks to the top offset', fakeAsync(() => {
        setupInitialState();
        emitScroll(target, defaultOffsetTop + startOffset + 1);

        expect(componentObject.elementRef().offsetTop !== defaultOffsetTop).toBe(true);
        setupInitialState();
        discardPeriodicTasks();
      }));
    });

    it('should be a string value', fakeAsync(() => {
      spyOn(component, 'updatePosition');
      expect(component.updatePosition).not.toHaveBeenCalled();
      fixture.detectChanges();
      context.fakeTarget = '#target';
      fixture.detectChanges();
      tick();
      expect(component.updatePosition).toHaveBeenCalled();
      discardPeriodicTasks();
    }));
  });

  describe('(nzChange)', () => {
    let changeValue: boolean;
    beforeEach(() => {
      component.nzChange.subscribe((returnValue: boolean) => {
        changeValue = returnValue;
      });
    });

    it(`emit true when is affixed`, fakeAsync(() => {
      setupInitialState();
      emitScroll(window, defaultOffsetTop + startOffset + 1);

      expect(changeValue).toBe(true);

      discardPeriodicTasks();
    }));

    it(`emit false when isn't affixed`, fakeAsync(() => {
      setupInitialState();
      emitScroll(window, defaultOffsetTop + startOffset + 1);
      emitScroll(window, defaultOffsetTop + startOffset - 1);

      expect(changeValue).toBe(false);
      setupInitialState();
      discardPeriodicTasks();
    }));
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

    content(): HTMLElement {
      return debugElement.query(By.css('#content')).nativeElement;
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

  function setupInitialState(options: { offsetTop?: number } = {}): void {
    componentObject.offsetYTo(componentObject.elementRef(), options.offsetTop || startOffset);
    tick(20);
    fixture.detectChanges();
    componentObject.emitScroll(window, 0);
    tick(20);
    fixture.detectChanges();
  }

  function emitScroll(el: Element | Window, offset: number): void {
    componentObject.emitScroll(el, offset);
    tick(20);
    fixture.detectChanges();
  }
});

describe('affix-extra', () => {
  let fixture: ComponentFixture<TestAffixComponent>;
  let context: TestAffixComponent;
  let dl: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAffixComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('#getOffset', () => {
    const ret = fixture.componentInstance.nzAffixComponent.getOffset(
      fixture.debugElement.query(By.css('#affix')).nativeElement,
      window
    );
    expect(ret).not.toBeUndefined();
  });
  it('with window when scrolled below the bottom offset', fakeAsync(() => {
    const value = 10;
    context.newOffsetBottom = value;
    context.fakeTarget = window;
    fixture.detectChanges();
    const el = dl.query(By.css('nz-affix')).nativeElement as HTMLElement;
    spyOn(el, 'getBoundingClientRect').and.returnValue({
      top: 1000,
      left: 5,
      width: 200,
      height: 20
    } as DOMRect);
    window.dispatchEvent(new Event('scroll'));
    tick(30);
    fixture.detectChanges();
    window.dispatchEvent(new Event('scroll'));
    tick(30);
    fixture.detectChanges();
    const ret = +(el.querySelector('.ant-affix') as HTMLElement).style.bottom!.replace('px', '');
    expect(ret).toBe(value);
  }));
});

describe('affix RTL', () => {
  let fixture: ComponentFixture<TestAffixRtlComponent>;
  let context: TestAffixRtlComponent;
  let dl: DebugElement;

  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideZoneChangeDetection()]
    });
    fixture = TestBed.createComponent(TestAffixRtlComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
  });

  it('should className correct on dir change', fakeAsync(() => {
    context.newOffsetBottom = 10;
    context.fakeTarget = window;
    fixture.detectChanges();
    const el = dl.query(By.css('nz-affix')).nativeElement as HTMLElement;
    spyOn(el, 'getBoundingClientRect').and.returnValue({
      top: 1000,
      left: 5,
      width: 200,
      height: 20
    } as DOMRect);
    window.dispatchEvent(new Event('scroll'));
    tick(30);
    fixture.detectChanges();
    window.dispatchEvent(new Event('scroll'));
    tick(30);
    fixture.detectChanges();
    expect(el.querySelector('.ant-affix')?.classList).toContain('ant-affix-rtl');
    fixture.destroy();
  }));
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

@Component({
  imports: [NzAffixComponent, BidiModule],
  template: `
    <div [dir]="direction">
      <nz-affix id="affix" [nzTarget]="fakeTarget" [nzOffsetTop]="newOffset" [nzOffsetBottom]="newOffsetBottom">
        <button id="content">Affix Button</button>
      </nz-affix>
      <div id="target"></div>
    </div>
  `
})
export class TestAffixRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';

  @ViewChild(NzAffixComponent, { static: true }) nzAffixComponent!: NzAffixComponent;
  fakeTarget?: string | Element | Window;
  newOffset!: number;
  newOffsetBottom!: number;
}

class MockDirectionality {
  value = 'ltr';
  change = new Subject();
}

describe('NzAffixComponent', () => {
  let component: NzAffixComponent;
  let fixture: ComponentFixture<NzAffixComponent>;
  let mockRenderer: Renderer2;
  let mockPlatform: Platform;
  let mockDirectionality: MockDirectionality;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NzAffixComponent,
        NzScrollService,
        { provide: Renderer2, useValue: jasmine.createSpyObj('Renderer2', ['setStyle', 'addClass', 'removeClass']) },
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) },
        { provide: DOCUMENT, useValue: document },
        { provide: Directionality, useClass: MockDirectionality },
        { provide: Platform, useValue: { isBrowser: true } }
      ]
    });

    fixture = TestBed.createComponent(NzAffixComponent);
    component = fixture.componentInstance;
    mockRenderer = TestBed.inject(Renderer2);
    mockPlatform = TestBed.inject(Platform);
    mockDirectionality = TestBed.inject(Directionality) as unknown as MockDirectionality;
  });

  afterEach(() => {
    mockDirectionality.change.complete();
  });

  it('should handle directionality change', () => {
    mockDirectionality.value = 'ltr';
    component.ngOnInit();

    spyOn<NzSafeAny>(component, 'registerListeners');
    spyOn(component, 'updatePosition');
    spyOn(component['cdr'], 'detectChanges');

    mockDirectionality.change.next('rtl');

    expect(component.dir).toBe('rtl');
    expect(component['registerListeners']).toHaveBeenCalled();
    expect(component.updatePosition).toHaveBeenCalled();
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  });

  it('should register listeners if platform is browser', () => {
    spyOn(component as NzSafeAny, 'removeListeners').and.callThrough();
    spyOn(mockRenderer, 'setStyle');

    component.ngOnInit();
    component.ngAfterViewInit();

    expect(component['removeListeners']).toHaveBeenCalled();
    expect(component['positionChangeSubscription']).toBeDefined();
    expect(component['timeout']).toBeDefined();
  });

  it('should not register listeners if platform is not browser', () => {
    mockPlatform.isBrowser = false;

    component.ngOnInit();
    component.ngAfterViewInit();

    expect(component['positionChangeSubscription']).toEqual(Subscription.EMPTY);
  });

  it('should remove listeners on destroy', () => {
    spyOn(component as NzSafeAny, 'removeListeners').and.callThrough();
    fixture.destroy();
    expect(component['removeListeners']).toHaveBeenCalled();
  });

  it('should update position correctly', () => {
    spyOn<NzSafeAny>(component, 'setAffixStyle').and.callThrough();
    spyOn<NzSafeAny>(component, 'setPlaceholderStyle').and.callThrough();

    const event = new Event('scroll');
    component.updatePosition(event);

    expect(component['setAffixStyle']).toHaveBeenCalled();
    expect(component['setPlaceholderStyle']).toHaveBeenCalled();
  });

  it('should update RTL class when direction changes', () => {
    component['fixedEl'].nativeElement.classList.add('ant-affix');
    component.dir = 'ltr';
    component['updateRtlClass']();
    fixture.detectChanges();

    expect(component['fixedEl'].nativeElement.classList.contains('ant-affix-rtl')).toBeFalse();

    component.dir = 'rtl';
    component['updateRtlClass']();
    fixture.detectChanges();

    expect(component['fixedEl'].nativeElement.classList.contains('ant-affix-rtl')).toBeTrue();

    component.dir = 'ltr';
    component['updateRtlClass']();
    fixture.detectChanges();

    expect(component['fixedEl'].nativeElement.classList.contains('ant-affix-rtl')).toBeFalse();

    component.dir = 'rtl';
    component['fixedEl'].nativeElement.classList.remove('ant-affix');
    component['fixedEl'].nativeElement.classList.add('ant-affix-rtl');
    component['updateRtlClass']();
    fixture.detectChanges();

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
    spyOn<NzSafeAny>(component, 'setAffixStyle').and.callThrough();
    component.nzOffsetTop = 10;
    component.nzOffsetBottom = 10;

    component.updatePosition(new Event('resize'));

    expect(component['setAffixStyle']).toHaveBeenCalledWith(
      jasmine.any(Event),
      jasmine.objectContaining({ width: 100 })
    );
  });

  it('should update the affix style with the correct width on resize', () => {
    spyOn<NzSafeAny>(component, 'setAffixStyle').and.callThrough();

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
