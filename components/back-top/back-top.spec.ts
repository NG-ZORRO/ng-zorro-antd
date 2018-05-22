import {
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';
import {
  fakeAsync,
  tick,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzScrollService } from '../core/scroll/nz-scroll.service';

import { NzBackTopComponent } from './nz-back-top.component';
import { NzBackTopModule } from './nz-back-top.module';

describe('Component:nz-back-top', () => {
  let scrollService: MockNzScrollService;
  let fixture: ComponentFixture<TestBackTopComponent>;
  let context: TestBackTopComponent;
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
      imports: [
        NzBackTopModule,
        NoopAnimationsModule
      ],
      declarations: [TestBackTopComponent, TestBackTopTemplateComponent],
      providers: [
        {
          provide: NzScrollService,
          useClass: MockNzScrollService
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestBackTopComponent);
    context = fixture.componentInstance;
    component = fixture.componentInstance.nzBackTopComponent;
    componentObject = new NzBackTopPageObject();
    debugElement = fixture.debugElement;
    scrollService = TestBed.get(NzScrollService);
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

        expect(scrollService.getScroll(window)).toEqual(0);
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
        component.nzClick.subscribe((returnValue) => {
          expect(returnValue).toBe(true);
        });

        componentObject.clickBackTop();
      }));
    });
  });

  describe('[nzTarget]', () => {
    let fakeTarget: HTMLElement;
    beforeEach(fakeAsync(() => {
      fakeTarget = debugElement.query(By.css('#fakeTarget')).nativeElement;
      component.nzTarget = fakeTarget;
    }));

    it('window scroll does not show the button', fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(true);
    }));

    it('element scroll shows the button', fakeAsync(() => {
      const throttleTime = 50;

      componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
      tick(throttleTime + 1);
      fixture.detectChanges();

      expect(componentObject.backTopButton() === null).toBe(false);
    }));
  });

  describe('#nzTemplate', () => {
    it(`should show custom template`, fakeAsync(() => {
      let fixtureTemplate: ComponentFixture<TestBackTopTemplateComponent>;
      let contextTemplate: TestBackTopTemplateComponent;
      fixtureTemplate = TestBed.createComponent(TestBackTopTemplateComponent);
      contextTemplate = fixture.componentInstance;

      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixtureTemplate.detectChanges();
      expect(fixtureTemplate.debugElement.query(By.css('.this-is-my-template')) === null).toBe(false);
    }));
  });
});

@Component({
  template: `
  <nz-back-top></nz-back-top>
  <div id="fakeTarget"></div>
`
})
class TestBackTopComponent {
  @ViewChild(NzBackTopComponent)
  nzBackTopComponent: NzBackTopComponent;
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
  @ViewChild(NzBackTopComponent)
  nzBackTopComponent: NzBackTopComponent;
}

class MockNzScrollService {
  mockTopOffset: number;

  getScroll(el?: Element | Window, top: boolean = true): number {
    return this.mockTopOffset;
  }

  scrollTo(
    containerEl: Element | Window,
    targetTopValue: number = 0,
    easing?: {},
    callback?: {}
  ): void {
    this.mockTopOffset = targetTopValue;
  }
}
