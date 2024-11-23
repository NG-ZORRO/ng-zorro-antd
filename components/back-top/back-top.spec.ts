import { Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { ApplicationRef, Component, DebugElement, SimpleChanges, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { NzScrollService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzBackTopComponent } from './back-top.component';
import { NzBackTopModule } from './back-top.module';

describe('Component:nz-back-top', () => {
  let scrollService: MockNzScrollService;
  let fixture: ComponentFixture<TestBackTopComponent>;
  let debugElement: DebugElement;
  let component: NzBackTopComponent;
  let componentObject: NzBackTopPageObject;
  const defaultVisibilityHeight = 400;

  class NzBackTopPageObject {
    scrollTo(el: Element | Window, scrollTop: number): void {
      scrollService.mockTopOffset = scrollTop;
      el.dispatchEvent(new Event('scroll'));
    }

    clickBackTop(): void {
      this.backTopButton().nativeElement.click();
    }

    backTopButton(): DebugElement {
      return debugElement.query(By.css('.ant-back-top'));
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzBackTopModule, NoopAnimationsModule],
      declarations: [TestBackTopComponent, TestBackTopTemplateComponent],
      providers: [
        {
          provide: NzScrollService,
          useClass: MockNzScrollService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestBackTopComponent);
    component = fixture.componentInstance.nzBackTopComponent;
    componentObject = new NzBackTopPageObject();
    debugElement = fixture.debugElement;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scrollService = TestBed.inject(NzScrollService) as any;
  });

  describe('[default]', () => {
    it(`should not show when scroll is below ${defaultVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight - 1);
      tick();
      fixture.detectChanges();
      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    it(`should not show when scroll is at ${defaultVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    describe(`when scrolled at least ${defaultVisibilityHeight + 1}`, () => {
      beforeEach(fakeAsync(() => {
        componentObject.scrollTo(window, defaultVisibilityHeight + 1);
        tick();
        fixture.detectChanges();
      }));

      it(`should show back to top button`, () => {
        expect(componentObject.backTopButton() === null).toBe(false);
      });

      it(`should show default template`, () => {
        expect(debugElement.query(By.css('.ant-back-top-content')) === null).toBe(false);
      });

      it(`should scroll to top when button is clicked`, fakeAsync(() => {
        componentObject.clickBackTop();
        tick();

        expect(scrollService.getScroll()).toEqual(0);
      }));
    });
  });

  describe('[nzVisibilityHeight]', () => {
    const customVisibilityHeight = 100;

    beforeEach(() => {
      component.nzVisibilityHeight = customVisibilityHeight;
    });

    it(`should not show when scroll is below ${customVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, customVisibilityHeight - 1);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    it(`should not show when scroll is at ${customVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, customVisibilityHeight);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    describe(`when scrolled at least ${customVisibilityHeight + 1}`, () => {
      beforeEach(fakeAsync(() => {
        componentObject.scrollTo(window, customVisibilityHeight + 1);
        tick();
        fixture.detectChanges();
      }));

      it(`should show back to top button`, () => {
        expect(componentObject.backTopButton() === null).toBe(false);
      });
    });
  });

  describe('(nzClick)', () => {
    beforeEach(fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();
    }));

    describe('when clicked', () => {
      it(`emit event on nzClick`, fakeAsync(() => {
        component.nzClick.subscribe((returnValue: boolean) => {
          expect(returnValue).toBe(true);
        });

        componentObject.clickBackTop();
      }));
    });

    describe('change detection behavior', () => {
      it('should not run change detection if there are no `nzClick` listeners', () => {
        const appRef = TestBed.inject(ApplicationRef);
        spyOn(appRef, 'tick');

        const backTopButton = componentObject.backTopButton().nativeElement;
        backTopButton.dispatchEvent(new MouseEvent('click'));
        expect(appRef.tick).not.toHaveBeenCalled();

        component.nzClick.subscribe();

        backTopButton.dispatchEvent(new MouseEvent('click'));
        expect(appRef.tick).toHaveBeenCalled();
      });
    });
  });

  describe('[nzTarget]', () => {
    let fakeTarget: HTMLElement;
    beforeEach(fakeAsync(() => {
      fakeTarget = debugElement.query(By.css('#fakeTarget')).nativeElement;
      fixture.componentInstance.setTarget(fakeTarget);
      fixture.detectChanges();
    }));

    it('window scroll does not show the button', fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    it('element scroll shows the button', fakeAsync(() => {
      const time = 50;

      componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
      tick(time + 1);
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(false);
    }));

    it('element (use string id) scroll shows the button', fakeAsync(() => {
      component.nzTarget = '#fakeTarget';

      const time = 50;

      componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
      tick(time + 1);
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(false);
    }));
  });

  describe('#nzTemplate', () => {
    it(`should show custom template`, fakeAsync(() => {
      let fixtureTemplate: ComponentFixture<TestBackTopTemplateComponent>;
      fixtureTemplate = TestBed.createComponent(TestBackTopTemplateComponent);

      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixtureTemplate.detectChanges();
      expect(fixtureTemplate.debugElement.query(By.css('.this-is-my-template')) === null).toBe(false);
    }));
  });
});

@Component({
  template: `
    <nz-back-top [nzTarget]="target"></nz-back-top>
    <div id="fakeTarget"></div>
  `
})
class TestBackTopComponent {
  @ViewChild(NzBackTopComponent, { static: true })
  nzBackTopComponent!: NzBackTopComponent;

  target: HTMLElement | null = null;

  setTarget(target: HTMLElement): void {
    this.target = target;
  }
}

@Component({
  template: `
    my comp
    <nz-back-top [nzTemplate]="tpl">
      <ng-template #tpl>
        <div class="this-is-my-template"></div>
      </ng-template>
    </nz-back-top>
  `
})
class TestBackTopTemplateComponent {
  @ViewChild(NzBackTopComponent, { static: false })
  nzBackTopComponent!: NzBackTopComponent;
}

class MockNzScrollService {
  mockTopOffset: number = 0;

  getScroll(): number {
    return this.mockTopOffset;
  }

  scrollTo(_containerEl: Element | Window, targetTopValue: number = 0): void {
    this.mockTopOffset = targetTopValue;
  }
}

class MockDirectionality {
  value = 'ltr';
  change = new Subject();
}

describe('back-to-top', () => {
  let component: NzBackTopComponent;
  let fixture: ComponentFixture<NzBackTopComponent>;
  let mockDirectionality: MockDirectionality;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzBackTopModule],
      providers: [
        {
          provide: Directionality,
          useClass: MockDirectionality
        },
        { provide: Platform, useValue: { isBrowser: false } },
        { provide: Document, useValue: document }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NzBackTopComponent);
    component = fixture.componentInstance;
    mockDirectionality = TestBed.inject(Directionality) as unknown as MockDirectionality;
  });

  it('dir change should work properly', fakeAsync(() => {
    spyOn<NzSafeAny>(component['cdr'], 'detectChanges');
    mockDirectionality.value = 'ltr';
    component.ngOnInit();
    expect(component.dir).toEqual('ltr');

    mockDirectionality.change.next('rtl');
    tick();
    expect(component.dir).toEqual('rtl');
    expect(component['cdr'].detectChanges).toHaveBeenCalled();
  }));

  it('should return if platform is not browser', () => {
    spyOn<NzSafeAny>(component, 'handleScroll');
    component['registerScrollEvent']();

    expect(component['handleScroll']).not.toHaveBeenCalled();
  });

  it('should set correct value for target', fakeAsync(() => {
    spyOn<NzSafeAny>(component, 'registerScrollEvent');
    spyOn(document, 'querySelector').and.returnValue({} as HTMLElement);
    let mockTarget: NzSafeAny = 'mockTarget';
    component.nzTarget = mockTarget;
    let change: SimpleChanges;
    change = {
      nzTarget: {
        currentValue: mockTarget,
        previousValue: undefined,
        firstChange: false,
        isFirstChange: function (): boolean {
          throw new Error('Function not implemented.');
        }
      }
    };
    component.ngOnChanges(change);
    tick();

    expect(document.querySelector).toHaveBeenCalledWith(mockTarget);
    expect(component['target']).toBeTruthy();
    expect(component['registerScrollEvent']).toHaveBeenCalled();
  }));
});
