import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from 'ng-zorro-antd/core';

import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import { NzCarouselComponent } from './nz-carousel.component';
import { NzCarouselModule } from './nz-carousel.module';

describe('carousel', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzCarouselModule],
      declarations: [NzTestCarouselBasicComponent]
    });
    TestBed.compileComponents();
  }));

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
      tick();
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

    it('should click content change', () => {
      fixture.detectChanges();
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
      tickATransition(fixture);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', LEFT_ARROW);
      tickATransition(fixture);
      expect(carouselContents[2].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', RIGHT_ARROW);
      tickATransition(fixture);
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', RIGHT_ARROW);
      tickATransition(fixture);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    }));

    it('should vertical work', () => {
      fixture.detectChanges();

      expect(carouselWrapper.nativeElement.firstElementChild!.classList).toContain('slick-initialized');
      expect(carouselWrapper.nativeElement.firstElementChild!.classList).toContain('slick-slider');
      expect(carouselWrapper.nativeElement.firstElementChild!.classList).not.toContain('slick-vertical');
      testComponent.vertical = true;
      fixture.detectChanges();

      expect(carouselWrapper.nativeElement.firstElementChild!.classList).toContain('slick-initialized');
      expect(carouselWrapper.nativeElement.firstElementChild!.classList).toContain('slick-slider');
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
      tickATransition(fixture);
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe('');

      testComponent.effect = 'fade';
      testComponent.vertical = true;
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      tickATransition(fixture);
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe('');

      testComponent.effect = 'scrollx';
      fixture.detectChanges();
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      tickATransition(fixture);
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
      tickATransition(fixture);
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
      testComponent.nzCarouselComponent.pre();
      tickATransition(fixture);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
      testComponent.nzCarouselComponent.goTo(2);
      tickATransition(fixture);
      expect(carouselContents[2].nativeElement.classList).toContain('slick-active');
    }));

    it('should resize content after window resized', fakeAsync(() => {
      const resizeSpy = spyOn(testComponent.nzCarouselComponent.strategy, 'withCarouselContents');
      window.dispatchEvent(new Event('resize'));
      tick(16);
      expect(resizeSpy).toHaveBeenCalledTimes(1);
    }));

    it('should support swiping to switch', fakeAsync(() => {
      swipe(testComponent.nzCarouselComponent, 500);
      tickATransition(fixture);
      expect(carouselContents[0].nativeElement.classList).not.toContain('slick-active');
      expect(carouselContents[1].nativeElement.classList).toContain('slick-active');

      swipe(testComponent.nzCarouselComponent, -500);
      tickATransition(fixture);
      swipe(testComponent.nzCarouselComponent, -500);
      tickATransition(fixture);
      expect(carouselContents[0].nativeElement.classList).not.toContain('slick-active');
      expect(carouselContents[3].nativeElement.classList).toContain('slick-active');
    }));

    it('should prevent swipes that are not long enough', fakeAsync(() => {
      swipe(testComponent.nzCarouselComponent, 2);
      tickATransition(fixture);
      expect(carouselContents[0].nativeElement.classList).toContain('slick-active');
    }));
  });

  describe('strategies', () => {
    let fixture: ComponentFixture<NzTestCarouselBasicComponent>;
    let testComponent: NzTestCarouselBasicComponent;
    let carouselContents: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCarouselBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      carouselContents = fixture.debugElement.queryAll(By.directive(NzCarouselContentDirective));
    });

    describe('transform strategy', () => {
      it('should set transform', fakeAsync(() => {
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);

        swipe(testComponent.nzCarouselComponent, 500);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);

        tickATransition(fixture);

        swipe(testComponent.nzCarouselComponent, -500);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);
        tickATransition(fixture);

        // From first to last.
        swipe(testComponent.nzCarouselComponent, -500);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);
        tickATransition(fixture);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);

        // From last to first.
        swipe(testComponent.nzCarouselComponent, 500);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);
        tickATransition(fixture);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);
      }));

      it('vertical', fakeAsync(() => {
        testComponent.vertical = true;
        fixture.detectChanges();

        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);

        swipe(testComponent.nzCarouselComponent, 500);
        expect(testComponent.nzCarouselComponent.el.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);
        tickATransition(fixture);

        swipe(testComponent.nzCarouselComponent, -500);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);
        tickATransition(fixture);

        // From first to last.
        swipe(testComponent.nzCarouselComponent, -500);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);
        tickATransition(fixture);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);

        // From last to first.
        swipe(testComponent.nzCarouselComponent, 500);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).not.toBe(`translate3d(0px, 0px, 0px)`);
        tickATransition(fixture);
        expect(testComponent.nzCarouselComponent.slickTrackEl.style.transform).toBe(`translate3d(0px, 0px, 0px)`);
      }));

      it('should disable dragging during transitioning', fakeAsync(() => {
        testComponent.nzCarouselComponent.goTo(1);
        swipe(testComponent.nzCarouselComponent, 500);
        tickATransition(fixture);
        expect(carouselContents[1].nativeElement.classList).toContain('slick-active');
      }));
    });

    // Already covered in components specs.
    describe('opacity strategy', () => {});
  });
});

@Component({
  selector: 'nz-test-carousel-basic',
  template: `
    <nz-carousel
      [nzEffect]="effect"
      [nzVertical]="vertical"
      [nzDots]="dots"
      [nzDotRender]="dotRender"
      [nzAutoPlay]="autoPlay"
      [nzAutoPlaySpeed]="autoPlaySpeed"
      (nzAfterChange)="afterChange($event)"
      (nzBeforeChange)="beforeChange($event)"
    >
      <div nz-carousel-content *ngFor="let index of array">
        <h3>{{ index }}</h3>
      </div>
      <ng-template #dotRender let-index
        ><a>{{ index + 1 }}</a></ng-template
      >
    </nz-carousel>
  `
})
export class NzTestCarouselBasicComponent {
  @ViewChild(NzCarouselComponent) nzCarouselComponent: NzCarouselComponent;
  dots = true;
  vertical = false;
  effect = 'scrollx';
  array = [1, 2, 3, 4];
  autoPlay = false;
  autoPlaySpeed = 3000;
  afterChange = jasmine.createSpy('afterChange callback');
  beforeChange = jasmine.createSpy('beforeChange callback');
}

function tickATransition<T>(fixture: ComponentFixture<T>): void {
  fixture.detectChanges();
  tick(700);
  fixture.detectChanges();
}

/*
 * Swipe a carousel.
 * @param carousel: Carousel component.
 * @Distance: Positive to right. Nagetive to left.
 */
function swipe(carousel: NzCarouselComponent, distance: number): void {
  carousel.pointerDown(new MouseEvent('mousedown', { clientX: 500, clientY: 0 }));
  carousel.pointerMove(new MouseEvent('mousemove', { clientX: 500 - distance, clientY: 0 }));
  carousel.pointerUp();
}
