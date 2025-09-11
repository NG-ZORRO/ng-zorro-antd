/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzFloatButtonTopComponent } from './float-button-top.component';
import { NzFloatButtonModule } from './float-button.module';

const defaultVisibilityHeight = 500;

describe('nz-float-button-top', () => {
  let scrollService: MockNzScrollService;
  let fixture: ComponentFixture<TestBackTopComponent>;
  let debugElement: DebugElement;
  let component: NzFloatButtonTopComponent;
  let componentObject: NzBackTopPageObject;

  class NzBackTopPageObject {
    scrollTo(el: Element | Window, scrollTop: number): void {
      scrollService.mockTopOffset = scrollTop;
      el.dispatchEvent(new Event('scroll'));
    }

    clickBackTop(): void {
      this.backTopButton().nativeElement.firstElementChild.click();
    }

    backTopButton(): DebugElement {
      return debugElement.query(By.css('.ant-float-btn-top'));
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideNoopAnimations(),
        {
          provide: NzScrollService,
          useClass: MockNzScrollService
        },
        provideNzConfig({
          backTop: {
            nzVisibilityHeight: 999
          }
        })
      ]
    });

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

      expect(componentObject.backTopButton().nativeElement.classList).toContain('ant-float-btn-hidden');
    }));

    it(`should not show when scroll is at ${defaultVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton().nativeElement.classList).toContain('ant-float-btn-hidden');
    }));

    describe(`when scrolled at least ${defaultVisibilityHeight + 1}`, () => {
      beforeEach(fakeAsync(() => {
        componentObject.scrollTo(window, defaultVisibilityHeight + 1);
        tick();
        fixture.detectChanges();
      }));

      it(`should show back to top button`, () => {
        expect(componentObject.backTopButton().nativeElement.classList).not.toContain('ant-float-btn-hidden');
      });

      it(`should show default template`, () => {
        expect(debugElement.query(By.css('.ant-float-btn-content')) === null).toBe(false);
      });

      it(`should scroll to top when button is clicked`, fakeAsync(() => {
        componentObject.clickBackTop();
        tick();
        expect(scrollService.getScroll()).toEqual(0);
      }));
    });
  });

  describe('[nzVisibilityHeight]', () => {
    it(`should not show when scroll is below ${defaultVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight - 1);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton().nativeElement.classList).toContain('ant-float-btn-hidden');
    }));

    it(`should not show when scroll is at ${defaultVisibilityHeight}`, fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight);
      tick();
      fixture.detectChanges();

      expect(componentObject.backTopButton().nativeElement.classList).toContain('ant-float-btn-hidden');
    }));

    it(`when scrolled at least ${defaultVisibilityHeight + 1}`, fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();
      expect(componentObject.backTopButton().nativeElement.classList).not.toContain('ant-float-btn-hidden');
    }));

    it('should display when change nzVisibilityHeight less than default', fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();
      expect(componentObject.backTopButton().nativeElement.classList).not.toContain('ant-float-btn-hidden');
      fixture.componentInstance.customVisibilityHeight = defaultVisibilityHeight - 100;
      fixture.detectChanges();
      expect(componentObject.backTopButton().nativeElement.classList).not.toContain('ant-float-btn-hidden');
    }));

    it('should display when change nzVisibilityHeight greater than default', fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();
      expect(componentObject.backTopButton().nativeElement.classList).not.toContain('ant-float-btn-hidden');
      fixture.componentInstance.customVisibilityHeight = defaultVisibilityHeight + 100;
      fixture.detectChanges();
      expect(componentObject.backTopButton().nativeElement.classList).toContain('ant-float-btn-hidden');
    }));

    it('should use config value (999) if nzVisibilityHeight is not assigned by user', fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();
      // @ts-ignore
      fixture.componentInstance.customVisibilityHeight = undefined;
      fixture.detectChanges();
      expect(componentObject.backTopButton().nativeElement.classList).toContain('ant-float-btn-hidden');
      expect(component['visibilityHeight']()).toBe(999);
    }));
  });

  describe('(nzOnClick)', () => {
    beforeEach(fakeAsync(() => {
      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixture.detectChanges();
    }));

    it(`emit event on nzClick`, fakeAsync(() => {
      component.nzOnClick.subscribe((returnValue: boolean) => {
        expect(returnValue).toBe(true);
      });

      componentObject.clickBackTop();
    }));
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

      expect(componentObject.backTopButton().nativeElement.classList).toContain('ant-float-btn-hidden');
    }));

    it('element scroll shows the button', (done: () => void) => {
      componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
      fixture.detectChanges();

      setTimeout(() => {
        fixture.detectChanges();
        expect(componentObject.backTopButton().nativeElement.classList).not.toContain('ant-float-btn-hidden');
        done();
      }, 50);
    });

    it('element (use string id) scroll shows the button', (done: () => void) => {
      fixture.componentInstance.setTarget('#fakeTarget');
      componentObject.scrollTo(fakeTarget, defaultVisibilityHeight + 1);
      fixture.detectChanges();

      setTimeout(() => {
        fixture.detectChanges();
        expect(componentObject.backTopButton().nativeElement.classList).not.toContain('ant-float-btn-hidden');
        done();
      }, 50);
    });
  });

  describe('#nzTemplate', () => {
    it(`should show custom template`, fakeAsync(() => {
      const fixtureTemplate = TestBed.createComponent(TestBackTopTemplateComponent);

      componentObject.scrollTo(window, defaultVisibilityHeight + 1);
      tick();
      fixtureTemplate.detectChanges();
      expect(fixtureTemplate.debugElement.query(By.css('.this-is-my-template')) === null).toBe(false);
    }));
  });
});

describe('nz-float-button-top RTL', () => {
  let fixture: ComponentFixture<TestBackTopRtlComponent>;
  let resultEl: DebugElement;
  let backTopComponent: NzFloatButtonTopComponent;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideNzIconsTesting()]
    });
    fixture = TestBed.createComponent(TestBackTopRtlComponent);
    resultEl = fixture.debugElement.query(By.directive(NzFloatButtonTopComponent));
    backTopComponent = resultEl.componentInstance;
  }));

  it('rtl', () => {
    fixture.detectChanges();
    // @ts-ignore
    expect(backTopComponent.dir()).toBe('rtl');
    expect(resultEl.nativeElement.classList).toContain('ant-float-btn-rtl');
  });
});

@Component({
  imports: [NzFloatButtonModule],
  template: `
    <nz-float-button-top [nzTarget]="target" [nzVisibilityHeight]="customVisibilityHeight"></nz-float-button-top>
    <div id="fakeTarget"></div>
  `
})
class TestBackTopComponent {
  @ViewChild(NzFloatButtonTopComponent, { static: true })
  nzBackTopComponent!: NzFloatButtonTopComponent;

  target!: HTMLElement | string;
  customVisibilityHeight = defaultVisibilityHeight;

  setTarget(target: HTMLElement | string): void {
    this.target = target;
  }
}

@Component({
  imports: [NzFloatButtonModule],
  template: `
    my comp
    <nz-float-button-top [nzIcon]="tpl">
      <ng-template #tpl>
        <div class="this-is-my-template"></div>
      </ng-template>
    </nz-float-button-top>
  `
})
class TestBackTopTemplateComponent {
  @ViewChild(NzFloatButtonTopComponent, { static: false })
  nzBackTopComponent!: NzFloatButtonTopComponent;
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

@Component({
  imports: [BidiModule, NzFloatButtonModule],
  template: `
    <div [dir]="direction">
      <nz-float-button-top></nz-float-button-top>
    </div>
  `
})
export class TestBackTopRtlComponent {
  direction: Direction = 'rtl';
}
