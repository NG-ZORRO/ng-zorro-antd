/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { ENTER, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, discardPeriodicTasks, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { dispatchKeyboardEvent, dispatchMouseEvent } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzCarouselContentDirective } from './carousel-content.directive';
import { NzCarouselComponent } from './carousel.component';
import { NzCarouselModule } from './carousel.module';
import { NzCarouselFlipStrategy } from './strategies/experimental/flip-strategy';
import { NzCarouselTransformNoLoopStrategy } from './strategies/experimental/transform-no-loop-strategy';
import { NZ_CAROUSEL_CUSTOM_STRATEGIES } from './typings';

describe('carousel', () => {
  describe('carousel basic', () => {
    let fixture: ComponentFixture<NzTestCarouselBasicComponent>;
    let testComponent: NzTestCarouselBasicComponent;
    let carouselWrapper: DebugElement;
    let carouselContents: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCarouselBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      carouselWrapper = fixture.debugElement.query(By.directive(NzCarouselComponent));
      carouselContents = fixture.debugElement.queryAll(By.directive(NzCarouselContentDirective));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.classList).toContain('ant-carousel');
      expect(carouselContents.every(content => content.nativeElement.classList.contains('slick-slide'))).toBe(true);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    });

    it('should dynamic change content work', fakeAsync(() => {
      fixture.detectChanges();
      tick(3000);
      fixture.detectChanges();
      expect(carouselContents.length).toBe(4);
      testComponent.array = [];
      fixture.detectChanges();
      tick(3000);
      fixture.detectChanges();
      carouselContents = fixture.debugElement.queryAll(By.directive(NzCarouselContentDirective));
      expect(carouselContents.length).toBe(0);
    }));

    it('should nzDots work', () => {
      fixture.detectChanges();
      expect(testComponent.dots).toBe(true);
      expect(carouselWrapper.nativeElement.querySelector('.slick-dots').children.length).toBe(4);
      testComponent.dots = false;
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.querySelector('.slick-dots')).toBeNull();
    });

    it('should nzDotRender work', () => {
      fixture.detectChanges();
      expect(testComponent.dots).toBe(true);
      expect(carouselWrapper.nativeElement.querySelector('.slick-dots').children.length).toBe(4);
      expect(carouselWrapper.nativeElement.querySelector('.slick-dots').firstElementChild.innerText).toBe('1');
      expect(carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.innerText).toBe('4');
      expect(
        carouselWrapper.nativeElement.querySelector('.slick-dots').firstElementChild.firstElementChild.tagName
      ).toBe('A');
    });

    it('should call layout on component resize', fakeAsync(() => {
      testComponent.nzCarouselComponent.ngOnInit();
      const spy = spyOn(testComponent.nzCarouselComponent, 'layout');
      window.dispatchEvent(new Event('resize'));
      tick(500);

      (testComponent.nzCarouselComponent['nzResizeObserver'] as NzResizeObserver)
        .observe(testComponent.nzCarouselComponent.el)
        .subscribe(() => {
          expect(spy).toHaveBeenCalled();
        });
    }));

    it('should call layout on component resize', fakeAsync(() => {
      const spyOnResize = spyOn(testComponent.nzCarouselComponent, 'layout');
      window.dispatchEvent(new Event('resize'));
      tick(500);

      expect(spyOnResize).toHaveBeenCalled();
      discardPeriodicTasks();
    }));

    it('should click content change', () => {
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
    });

    it('should keydown change content work', fakeAsync(() => {
      fixture.detectChanges();
      const list = carouselWrapper.nativeElement.querySelector('.slick-list');

      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');

      dispatchKeyboardEvent(list, 'keydown', LEFT_ARROW);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', LEFT_ARROW);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[2].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', RIGHT_ARROW);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', RIGHT_ARROW);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    }));

    it('should nzDotPosition work', () => {
      testComponent.dotPosition = 'left';
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.firstElementChild!.classList).toContain('slick-vertical');
    });

    it('should effect change work', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe(
        'translate3d(0px, 0px, 0px)'
      );
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      tickMilliseconds(fixture, 700);
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe('');

      testComponent.effect = 'fade';
      testComponent.dotPosition = 'left';
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      tickMilliseconds(fixture, 700);
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe('');

      testComponent.effect = 'scrollx';
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      tickMilliseconds(fixture, 700);
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe(
        'translate3d(0px, 0px, 0px)'
      );
    }));

    it('should autoplay work', fakeAsync(() => {
      testComponent.autoPlay = true;
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      fixture.detectChanges();
      tick(5000);
      fixture.detectChanges();
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      tick(5000);
      fixture.detectChanges();
      testComponent.autoPlay = false;
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    }));

    it('should autoplay speed work', fakeAsync(() => {
      testComponent.autoPlay = true;
      testComponent.autoPlaySpeed = 1000;
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      fixture.detectChanges();
      tick(1000 + 10);
      fixture.detectChanges();
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
      testComponent.autoPlaySpeed = 0;
      fixture.detectChanges();
      tick(2000 + 10);
      fixture.detectChanges();
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
    }));

    it('should func work', fakeAsync(() => {
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      testComponent.nzCarouselComponent.next();
      tickMilliseconds(fixture, 700);
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
      testComponent.nzCarouselComponent.pre();
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      testComponent.nzCarouselComponent.goTo(2);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[2].nativeElement.classList).toContain('slick-active');
    }));

    it('should resize content after window resized', fakeAsync(() => {
      const resizeSpy = spyOn(testComponent.nzCarouselComponent.strategy!, 'withCarouselContents');
      window.dispatchEvent(new Event('resize'));
      tick(16);
      expect(resizeSpy).toHaveBeenCalledTimes(1);
    }));

    // this test may fail on WSL
    it('should support swiping to switch', fakeAsync(() => {
      swipe(testComponent.nzCarouselComponent, 500);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).not.toContain('slick-active');
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');

      swipe(testComponent.nzCarouselComponent, -500);
      tickMilliseconds(fixture, 700);
      swipe(testComponent.nzCarouselComponent, -500);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).not.toContain('slick-active');
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
    }));

    it('should prevent swipes that are not long enough', fakeAsync(() => {
      swipe(testComponent.nzCarouselComponent, 57);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    }));

    it('should disable dragging during transitioning', fakeAsync(() => {
      tickMilliseconds(fixture, 700);
      testComponent.nzCarouselComponent.goTo(1);
      swipe(testComponent.nzCarouselComponent, 500);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
    }));

    it('should disable loop work', fakeAsync(() => {
      testComponent.loop = false;
      fixture.detectChanges();
      swipe(testComponent.nzCarouselComponent, -10);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      swipe(testComponent.nzCarouselComponent, -1000);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');

      testComponent.loop = true;
      fixture.detectChanges();
      swipe(testComponent.nzCarouselComponent, -1000);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
      swipe(testComponent.nzCarouselComponent, 1000);
      tickMilliseconds(fixture, 700);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');

      testComponent.loop = false;
      testComponent.autoPlay = true;
      testComponent.autoPlaySpeed = 1000;
      fixture.detectChanges();
      tick(10000);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
      tick(1000 + 10);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
    }));

    it('should call goTo function on slick dot click', () => {
      spyOn(testComponent.nzCarouselComponent, 'goTo');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      expect(testComponent.nzCarouselComponent.goTo).toHaveBeenCalledWith(3);
    });
  });

  describe('strategies', () => {
    let fixture: ComponentFixture<NzTestCarouselBasicComponent>;
    let testComponent: NzTestCarouselBasicComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCarouselBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
    });

    describe('transform strategy', () => {
      it('horizontal transform', fakeAsync(() => {
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);

        testComponent.nzCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);

        testComponent.nzCarouselComponent.pre();
        tickMilliseconds(fixture, 700);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);

        // From first to last.
        testComponent.nzCarouselComponent.pre();
        tickMilliseconds(fixture, 700);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);

        // From last to first.
        testComponent.nzCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);
      }));

      it('vertical', fakeAsync(() => {
        testComponent.dotPosition = 'left';
        fixture.detectChanges();

        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);

        testComponent.nzCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.nzCarouselComponent.el.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);

        testComponent.nzCarouselComponent.pre();
        tickMilliseconds(fixture, 700);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);

        // From first to last.
        testComponent.nzCarouselComponent.pre();
        tickMilliseconds(fixture, 700);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);

        // From last to first.
        testComponent.nzCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);
      }));
    });
  });

  describe('carousel nzAfterChange return value', () => {
    let fixture: ComponentFixture<NzTestCarouselActiveIndexComponent>;
    let testComponent: NzTestCarouselActiveIndexComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCarouselActiveIndexComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
    });

    it('carousel activeIndex should be equal to nzAfterChange return value', fakeAsync(() => {
      fixture.detectChanges();
      [0, 1, 2, 3, 4].forEach(_ => {
        testComponent.nzCarouselComponent.next();
        tickMilliseconds(fixture, 700);
        expect(testComponent.index).toBe(testComponent.nzCarouselComponent.activeIndex);
      });
    }));
  });
});

describe('carousel custom strategies', () => {
  let fixture: ComponentFixture<NzTestCarouselBasicComponent>;
  let testComponent: NzTestCarouselBasicComponent;
  let carouselWrapper: DebugElement;
  let carouselContents: DebugElement[];

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NZ_CAROUSEL_CUSTOM_STRATEGIES,
          useValue: [
            {
              name: 'flip',
              strategy: NzCarouselFlipStrategy
            },
            {
              name: 'transform-no-loop',
              strategy: NzCarouselTransformNoLoopStrategy
            }
          ]
        }
      ]
    });
  }));

  it('could use custom strategies', fakeAsync(() => {
    fixture = TestBed.createComponent(NzTestCarouselBasicComponent);
    fixture.detectChanges();
    testComponent = fixture.debugElement.componentInstance;
    carouselWrapper = fixture.debugElement.query(By.directive(NzCarouselComponent));
    carouselContents = fixture.debugElement.queryAll(By.directive(NzCarouselContentDirective));

    testComponent.effect = 'flip';
    fixture.detectChanges();
    expect(carouselContents[0].nativeElement.style.transform).toBe('rotateY(0deg)');
    expect(carouselContents[1].nativeElement.style.transform).toBe('rotateY(180deg)');
    carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
    tickMilliseconds(fixture, 700);
    expect(carouselContents[0].nativeElement.style.transform).toBe('rotateY(180deg)');
    expect(carouselContents[3].nativeElement.style.transform).toBe('rotateY(0deg)');

    testComponent.effect = 'transform-no-loop';
    fixture.detectChanges();
    expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe(
      'translate3d(0px, 0px, 0px)'
    );
    carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
    tickMilliseconds(fixture, 700);
    expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe(
      'translate3d(0px, 0px, 0px)'
    );

    testComponent.dotPosition = 'left';
    fixture.detectChanges();
    carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
    tickMilliseconds(fixture, 700);
    expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe(
      'translate3d(0px, 0px, 0px)'
    );
  }));
});

function tickMilliseconds<T>(fixture: ComponentFixture<T>, seconds: number = 1): void {
  fixture.detectChanges();
  tick(seconds);
  fixture.detectChanges();
}

/*
 * Swipe a carousel.
 *
 * @param carousel: Carousel component.
 * @param Distance: Positive to right. Negative to left.
 */
function swipe(carousel: NzCarouselComponent, distance: number): void {
  carousel.pointerDown(
    new MouseEvent('mousedown', {
      clientX: 500,
      clientY: 0
    })
  );

  dispatchMouseEvent(document, 'mousemove', 500 - distance, 0);
  dispatchMouseEvent(document, 'mouseup');
}

@Component({
  selector: 'nz-test-carousel',
  imports: [NzCarouselModule],
  template: `
    <nz-carousel
      [nzEffect]="effect"
      [nzDots]="dots"
      [nzDotPosition]="dotPosition"
      [nzDotRender]="dotRender"
      [nzAutoPlay]="autoPlay"
      [nzAutoPlaySpeed]="autoPlaySpeed"
      [nzLoop]="loop"
      (nzAfterChange)="afterChange($event)"
      (nzBeforeChange)="beforeChange($event)"
    >
      @for (index of array; track index) {
        <div nz-carousel-content>
          <h3>{{ index }}</h3>
        </div>
      }
      <ng-template #dotRender let-index>
        <a>{{ index + 1 }}</a>
      </ng-template>
    </nz-carousel>
  `
})
export class NzTestCarouselBasicComponent {
  @ViewChild(NzCarouselComponent, { static: false }) nzCarouselComponent!: NzCarouselComponent;
  dots = true;
  dotPosition = 'bottom';
  effect = 'scrollx';
  array = [1, 2, 3, 4];
  autoPlay = false;
  autoPlaySpeed = 3000;
  loop = true;
  afterChange = jasmine.createSpy('afterChange callback');
  beforeChange = jasmine.createSpy('beforeChange callback');
}

@Component({
  imports: [NzCarouselModule],
  template: `
    <nz-carousel (nzAfterChange)="afterChange($event)">
      @for (index of array; track index) {
        <div nz-carousel-content>
          <h3>{{ index }}</h3>
        </div>
      }
    </nz-carousel>
  `
})
export class NzTestCarouselActiveIndexComponent {
  @ViewChild(NzCarouselComponent, { static: true }) nzCarouselComponent!: NzCarouselComponent;
  array = [0, 1, 2, 3, 4];
  index = 0;

  afterChange(index: number): void {
    this.index = index;
  }
}

class MockDirectionality {
  value = 'ltr';
  change = new Subject();
}

describe('carousel', () => {
  let fixture: ComponentFixture<NzCarouselComponent>;
  let component: NzCarouselComponent;
  let mockDirectionality: MockDirectionality;
  let mockObserve$: Subject<void>;

  beforeEach(() => {
    mockObserve$ = new Subject();
    const nzResizeObserverSpy = jasmine.createSpyObj('NzResizeObserver', {
      observe: mockObserve$.asObservable()
    });

    TestBed.configureTestingModule({
      providers: [
        {
          provide: Directionality,
          useClass: MockDirectionality
        },
        {
          provide: NzResizeObserver,
          useValue: nzResizeObserverSpy
        }
      ]
    });

    fixture = TestBed.createComponent(NzCarouselComponent);
    component = fixture.componentInstance;
    mockDirectionality = TestBed.inject(Directionality) as unknown as MockDirectionality;
  });

  it('directionality change detection', fakeAsync(() => {
    spyOn<NzSafeAny>(component, 'markContentActive');
    spyOn<NzSafeAny>(component['cdr'], 'detectChanges');
    mockDirectionality.value = 'ltr';
    component.ngOnInit();
    expect(component.dir).toEqual('ltr');

    mockDirectionality.change.next('rtl');
    tick();
    expect(component.dir).toEqual('rtl');
    expect(component['markContentActive']).toHaveBeenCalled();
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  }));

  it('should not execute if keyCode is not of type LEFT_ARROW  or RIGHT_ARROW', fakeAsync(() => {
    component.ngOnInit();
    tick(1);
    let event: KeyboardEvent;

    event = new KeyboardEvent('keydown', { keyCode: LEFT_ARROW });
    spyOn(event, 'preventDefault');
    component.slickListEl.dispatchEvent(event);
    expect(event.preventDefault).toHaveBeenCalled();

    event = new KeyboardEvent('keydown', { keyCode: RIGHT_ARROW });
    spyOn(event, 'preventDefault');
    component.slickListEl.dispatchEvent(event);
    expect(event.preventDefault).toHaveBeenCalled();

    event = new KeyboardEvent('keydown', { keyCode: ENTER });
    spyOn(event, 'preventDefault');
    component.slickListEl.dispatchEvent(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  }));

  it('should call layout method when resizing', fakeAsync(() => {
    spyOn(component, 'layout');
    component.ngOnInit();
    tick(1);
    mockObserve$.next();
    tick(101);
    expect(component.layout).toHaveBeenCalled();
  }));
});
