import { Component, ViewChild } from '@angular/core';
import { fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { dispatchKeyboardEvent } from '../core/testing';

import { NzCarouselContentDirective } from './nz-carousel-content.directive';
import { NzCarouselComponent } from './nz-carousel.component';
import { NzCarouselModule } from './nz-carousel.module';

describe('carousel', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzCarouselModule ],
      declarations: [ NzTestCarouselBasicComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('carousel basic', () => {
    let fixture;
    let testComponent;
    let carouselWrapper;
    let carouselContents;
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
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
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
    it('should click content change', () => {
      fixture.detectChanges();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      expect(carouselContents[ 3 ].nativeElement.classList).toContain('slick-active');
    });
    it('should keydown change content work', () => {
      fixture.detectChanges();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
      const list = carouselWrapper.nativeElement.querySelector('.slick-list');
      dispatchKeyboardEvent(list, 'keydown', 37);
      fixture.detectChanges();
      expect(carouselContents[ 3 ].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', 37);
      fixture.detectChanges();
      expect(carouselContents[ 2 ].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', 39);
      fixture.detectChanges();
      expect(carouselContents[ 3 ].nativeElement.classList).toContain('slick-active');
      dispatchKeyboardEvent(list, 'keydown', 39);
      fixture.detectChanges();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
    });
    it('should vertical work', () => {
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.firstElementChild.classList).toContain('slick-initialized');
      expect(carouselWrapper.nativeElement.firstElementChild.classList).toContain('slick-slider');
      expect(carouselWrapper.nativeElement.firstElementChild.classList).not.toContain('slick-vertical');
      testComponent.vertical = true;
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.firstElementChild.classList).toContain('slick-initialized');
      expect(carouselWrapper.nativeElement.firstElementChild.classList).toContain('slick-slider');
      expect(carouselWrapper.nativeElement.firstElementChild.classList).toContain('slick-vertical');
    });
    it('should effect change work', () => {
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe('translate3d(0px, 0px, 0px)');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe('translate3d(0px, 0px, 0px)');
      testComponent.effect = 'fade';
      testComponent.vertical = true;
      fixture.detectChanges();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).toBe('translate3d(0px, 0px, 0px)');
      testComponent.effect = 'scrollx';
      fixture.detectChanges();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      expect(carouselWrapper.nativeElement.querySelector('.slick-track').style.transform).not.toBe('translate3d(0px, 0px, 0px)');
    });
    it('should autoplay work', fakeAsync(() => {
      testComponent.autoPlay = true;
      fixture.detectChanges();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
      fixture.detectChanges();
      tick(3000 + 10);
      fixture.detectChanges();
      expect(carouselContents[ 1 ].nativeElement.classList).toContain('slick-active');
      carouselWrapper.nativeElement.querySelector('.slick-dots').lastElementChild.click();
      fixture.detectChanges();
      tick(3000 + 10);
      fixture.detectChanges();
      testComponent.nzCarouselComponent.clearTimeout();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
    }));
    it('should func work', () => {
      fixture.detectChanges();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
      testComponent.nzCarouselComponent.next();
      fixture.detectChanges();
      expect(carouselContents[ 1 ].nativeElement.classList).toContain('slick-active');
      testComponent.nzCarouselComponent.pre();
      fixture.detectChanges();
      expect(carouselContents[ 0 ].nativeElement.classList).toContain('slick-active');
      testComponent.nzCarouselComponent.goTo(2);
      fixture.detectChanges();
      expect(carouselContents[ 2 ].nativeElement.classList).toContain('slick-active');
    });
  });
});

@Component({
  selector: 'nz-test-carousel-basic',
  template: `
    <nz-carousel
      [nzEffect]="effect"
      [nzVertical]="vertical"
      [nzDots]="dots"
      [nzAutoPlay]="autoPlay"
      (nzAfterChange)="afterChange($event)"
      (nzBeforeChange)="beforeChange($event)">
      <div nz-carousel-content *ngFor="let index of array"><h3>{{index}}</h3></div>
    </nz-carousel>`
})
export class NzTestCarouselBasicComponent {
  @ViewChild(NzCarouselComponent) nzCarouselComponent: NzCarouselComponent;
  dots = true;
  vertical = false;
  effect = 'scrollx';
  array = [ 1, 2, 3, 4 ];
  autoPlay = false;
  afterChange = jasmine.createSpy('afterChange callback');
  beforeChange = jasmine.createSpy('beforeChange callback');

}
