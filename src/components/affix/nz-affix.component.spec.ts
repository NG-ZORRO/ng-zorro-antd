/* tslint:disable:no-unused-variable prefer-const */
import { Component, DebugElement, ViewChild } from '@angular/core';
import {
  discardPeriodicTasks,
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzScrollService } from '../core/scroll/nz-scroll.service';

import { NzAffixComponent } from './nz-affix.component';
import { NzAffixModule } from './nz-affix.module';

interface Offset {
  top: number;
  left: number;
}

describe('Component:nz-affix', () => {
  let scrollService: NzScrollService;
  let fixture: ComponentFixture<TestAffixComponent>;
  let context: TestAffixComponent;
  let debugElement: DebugElement;
  let component: NzAffixComponent;
  let componentObject: NzAffixPageObject;
  let defaultOffsetTop = 0;
  let scrollEvent: Event = new Event('scroll');
  let startOffset = 10;
  let handledEvents: Event[] = [
    scrollEvent,
    new Event('resize'),
    new Event('touchstart'),
    new Event('touchmove'),
    new Event('touchend'),
    new Event('pageshow'),
  ];

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzAffixModule],
      declarations: [TestAffixComponent],
      providers: [
        {
          provide: NzScrollService,
          useClass: NzScrollService
        },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestAffixComponent);
    context = fixture.componentInstance;
    component = context.nzAffixComponent;
    scrollService = TestBed.get(NzScrollService);
    componentObject = new NzAffixPageObject();
    debugElement = fixture.debugElement;
    componentObject.wrap().id = 'wrap';
  }));

  describe('[default]', () => {
    it('recreate bug https://github.com/NG-ZORRO/ng-zorro-antd/issues/671', fakeAsync(() => {
      let edge = defaultOffsetTop + startOffset;
      setupInitialState();
      emitScroll(window, edge + 2);
      componentObject.emitScroll(window, edge + 1);
      componentObject.emitScroll(window, edge);
      componentObject.emitScroll(window, edge - 1);
      tick(100);
      fixture.detectChanges();

      expect(componentObject.wrap().offsetTop !== defaultOffsetTop).toBe(true);

      discardPeriodicTasks();
    }));

    it('wraps content with affix', () => {
      expect(componentObject.content() === null).toBe(false);
    });

    describe('when scrolled within top offset', () => {
      it('scrolls with the content', fakeAsync(() => {
        setupInitialState();
        emitScroll(window, defaultOffsetTop + startOffset - 1);

        expect(componentObject.wrap().offsetTop !== defaultOffsetTop).toBe(true);

        discardPeriodicTasks();
      }));
    });

    describe('when scrolled below the top offset', () => {
      it('sticks to the top offset', fakeAsync(() => {
        setupInitialState();
        emitScroll(window, defaultOffsetTop + startOffset + 1);

        expect(componentObject.wrap().offsetTop).toBe(defaultOffsetTop);

        discardPeriodicTasks();
      }));

      // TODO: fix bug
      describe('when element gets shifted horizontally', () => {
        xit('adjusts left position accordingly to maintain natural position', fakeAsync(() => {
          setupInitialState();
          componentObject.offsetTo(componentObject.elementRef(), { top: startOffset, left: 10 });
          emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetLeft).toBe(10);

          emitScroll(window, defaultOffsetTop + startOffset - 1);
          componentObject.offsetTo(componentObject.elementRef(), { top: startOffset, left: 100 });
          emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetLeft).toBe(100);

          discardPeriodicTasks();
        }));
      });

      for (let event of handledEvents) {
        it(`handles '${event.type}' event`, fakeAsync(() => {
          setupInitialState();
          emitScroll(window, defaultOffsetTop + startOffset + 1);

          expect(componentObject.wrap().offsetTop).toBe(defaultOffsetTop);

          discardPeriodicTasks();
        }));
      }
    });
  });

  describe('[nzOffsetTop]', () => {
    let offsetTop = 150;
    let componentOffset = 160;

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

        discardPeriodicTasks();
      }));
    });

    it('recreate bug https://github.com/NG-ZORRO/ng-zorro-antd/issues/868', fakeAsync(() => {
      context.newOffset = offsetTop.toString();
      setupInitialState({ offsetTop: offsetTop + 1 });
      emitScroll(window, 2);

      expect(componentObject.wrap().offsetTop).toBe(offsetTop);

      discardPeriodicTasks();
    }));
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

        discardPeriodicTasks();
      }));
    });

    describe('when custom target is scrolled within top offset', () => {
      it('scrolls with the content', fakeAsync(() => {
        setupInitialState();
        emitScroll(target, defaultOffsetTop + startOffset - 1);

        expect(componentObject.elementRef().offsetTop !== defaultOffsetTop).toBe(true);

        discardPeriodicTasks();
      }));
    });

    describe('when custom target is scrolled below the top offset', () => {
      it('sticks to the top offset', fakeAsync(() => {
        setupInitialState();
        emitScroll(target, defaultOffsetTop + startOffset + 1);

        expect(componentObject.elementRef().offsetTop !== defaultOffsetTop).toBe(true);

        discardPeriodicTasks();
      }));
    });
  });

  describe('(nzChange)', () => {
    let changeValue;
    beforeEach(() => {
      component.nzChange.subscribe((returnValue) => {
        changeValue = returnValue;
      });
    });

    it(`emit true when is affixed`, fakeAsync((done) => {
      setupInitialState();
      emitScroll(window, defaultOffsetTop + startOffset + 1);

      expect(changeValue).toBe(true);

      discardPeriodicTasks();
    }));

    it(`emit false when is unaffixed`, fakeAsync((done) => {
      setupInitialState();
      emitScroll(window, defaultOffsetTop + startOffset + 1);
      emitScroll(window, defaultOffsetTop + startOffset - 1);

      expect(changeValue).toBe(false);

      discardPeriodicTasks();
    }));
  });

  class NzAffixPageObject {
    offsets: { [key: string]: Offset };
    scrolls: { [key: string]: number };

    constructor() {
      spyOn(scrollService, 'getOffset').and.callFake(this.getOffset.bind(this));
      spyOn(scrollService, 'getScroll').and.callFake(this.getScroll.bind(this));
      this.offsets = { 'undefined': { top: 10, left: 0 } };
      this.scrolls = { 'undefined': 0 };
    }

    getScroll(el?: Window | Element, left?: boolean): number {
      let scroll = left ? 0 : (this.scrolls[this.getKey(el)]);
      return scroll;
    }

    getOffset(el: Element): Offset {
      return this.offsets[el.id] || { top: 10, left: 0 };
    }

    emitEvent(el: Element | Window, event: Event): void {
      el.dispatchEvent(event);
    }

    emitScroll(el: Element | Window, topScroll: number): void {
      this.scrolls[this.getKey(el)] = topScroll;
      this.emitEvent((el || window), scrollEvent);
    }

    offsetTo(el: Element, offset: Offset): void {
      this.offsets[this.getKey(el)] = {
        top: offset.top,
        left: offset.left
      };
    }

    offsetYTo(el: Element, offsetTop: number): void {
      this.offsetTo(
        el,
        {
          top: offsetTop,
          left: 0,
        }
      );
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

    private getKey(el: Element | Window): string {
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
    tick(100);
    fixture.detectChanges();
    componentObject.emitScroll(window, 0);
    tick(100);
    fixture.detectChanges();
  }

  function emitScroll(el: Element | Window, offset: number): void {
    componentObject.emitScroll(el, offset);
    tick(100);
    fixture.detectChanges();
  }
});

@Component({
  template: `
<nz-affix id="affix" [nzTarget]="fakeTarget" [nzOffsetTop]="newOffset || 0">
  <button id="content">Affix Button</button>
</nz-affix>
<div id="target"></div>
`
})
class TestAffixComponent {
  @ViewChild(NzAffixComponent)
  nzAffixComponent: NzAffixComponent;
  fakeTarget: Element;
  newOffset: {};
}
