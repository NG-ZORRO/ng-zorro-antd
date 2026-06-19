/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { sleep, testDirectionality, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzFloatButtonTopComponent } from './float-button-top.component';
import { NzFloatButtonModule } from './float-button.module';

const defaultVisibilityHeight = 500;

describe('nz-float-button-top', () => {
  describe('basic', () => {
    let scrollService: MockNzScrollService;
    let fixture: ComponentFixture<TestFloatButtonTopComponent>;
    let debugElement: DebugElement;
    let component: NzFloatButtonTopComponent;
    let componentObject: NzFloatButtonTopPageObject;

    class NzFloatButtonTopPageObject {
      scrollTo(el: Element | Window, scrollTop: number): void {
        scrollService.mockTopOffset = scrollTop;
        el.dispatchEvent(new Event('scroll'));
      }

      clickBackTop(): void {
        this.backTopButton().nativeElement.click();
      }

      backTopButton(): DebugElement {
        return debugElement.query(By.css('.ant-float-btn-top .ant-float-btn-inner'));
      }
    }

    async function scrollTo(el: Element | Window, scrollTop: number): Promise<void> {
      componentObject.scrollTo(el, scrollTop);
      await sleep(50);
      await fixture.whenStable();
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          provideNzNoAnimation(),
          {
            provide: NzScrollService,
            useClass: MockNzScrollService
          },
          provideNzConfig({
            floatButton: {
              nzVisibilityHeight: 999
            }
          })
        ]
      });

      fixture = TestBed.createComponent(TestFloatButtonTopComponent);
      component = fixture.componentInstance.floatButtonTopComponent;
      componentObject = new NzFloatButtonTopPageObject();
      debugElement = fixture.debugElement;
      scrollService = TestBed.inject(NzScrollService) as NzSafeAny;
    });

    describe('[default]', () => {
      it(`should not show when scroll is below ${defaultVisibilityHeight}`, async () => {
        componentObject.scrollTo(window, defaultVisibilityHeight - 1);
        await fixture.whenStable();

        expect(componentObject.backTopButton()).toBeFalsy();
      });

      it(`should not show when scroll is at ${defaultVisibilityHeight}`, async () => {
        componentObject.scrollTo(window, defaultVisibilityHeight);
        await fixture.whenStable();

        expect(componentObject.backTopButton()).toBeFalsy();
      });

      describe(`when scrolled at least ${defaultVisibilityHeight + 1}`, () => {
        beforeEach(async () => {
          await scrollTo(window, defaultVisibilityHeight + 1);
        });

        it(`should show back to top button`, () => {
          expect(componentObject.backTopButton()).toBeTruthy();
        });

        it(`should show default template`, () => {
          expect(debugElement.query(By.css('.ant-float-btn-content')) === null).toBe(false);
        });

        it(`should scroll to top when button is clicked`, async () => {
          componentObject.clickBackTop();
          await fixture.whenStable();
          expect(scrollService.getScroll()).toEqual(0);
        });
      });
    });

    describe('[nzVisibilityHeight]', () => {
      it(`should not show when scroll is below ${defaultVisibilityHeight}`, async () => {
        await scrollTo(window, defaultVisibilityHeight - 1);
        expect(componentObject.backTopButton()).toBeFalsy();
      });

      it(`should not show when scroll is at ${defaultVisibilityHeight}`, async () => {
        await scrollTo(window, defaultVisibilityHeight);
        expect(componentObject.backTopButton()).toBeFalsy();
      });

      it(`when scrolled at least ${defaultVisibilityHeight + 1}`, async () => {
        await scrollTo(window, defaultVisibilityHeight + 1);
        expect(componentObject.backTopButton()).toBeTruthy();
      });

      it('should display when change nzVisibilityHeight less than default', async () => {
        await scrollTo(window, defaultVisibilityHeight + 1);

        expect(componentObject.backTopButton()).toBeTruthy();
        fixture.componentInstance.customVisibilityHeight.set(defaultVisibilityHeight - 100);
        await updateNonSignalsInput(fixture);

        expect(componentObject.backTopButton()).toBeTruthy();
      });

      it('should display when change nzVisibilityHeight greater than default', async () => {
        await scrollTo(window, defaultVisibilityHeight + 1);

        expect(componentObject.backTopButton()).toBeTruthy();
        fixture.componentInstance.customVisibilityHeight.set(defaultVisibilityHeight + 100);
        await updateNonSignalsInput(fixture);

        expect(componentObject.backTopButton()).toBeFalsy();
      });

      it('should use config value (999) if nzVisibilityHeight is not assigned by user', async () => {
        await scrollTo(window, defaultVisibilityHeight + 1);

        fixture.componentInstance.customVisibilityHeight.set(undefined);
        await updateNonSignalsInput(fixture);

        expect(componentObject.backTopButton()).toBeFalsy();
        expect(component['visibilityHeight']()).toBe(999);
      });
    });

    it(`should emit event on nzClick`, async () => {
      await scrollTo(window, defaultVisibilityHeight + 1);

      componentObject.clickBackTop();
      expect(fixture.componentInstance.handleClick).toHaveBeenCalledWith(true);
    });

    describe('[nzTarget]', () => {
      let fakeTarget: HTMLElement;

      beforeEach(async () => {
        fakeTarget = debugElement.query(By.css('#fakeTarget')).nativeElement;
        fixture.componentInstance.setTarget(fakeTarget);
        await fixture.whenStable();
      });

      it('window scroll does not show the button', async () => {
        await scrollTo(window, defaultVisibilityHeight + 1);
        expect(componentObject.backTopButton()).toBeFalsy();
      });

      it('element scroll shows the button', async () => {
        await scrollTo(fakeTarget, defaultVisibilityHeight + 1);
        expect(componentObject.backTopButton()).toBeTruthy();
      });

      it('element (use string id) scroll shows the button', async () => {
        fixture.componentInstance.setTarget('#fakeTarget');
        await updateNonSignalsInput(fixture);
        await scrollTo(fakeTarget, defaultVisibilityHeight + 1);
        expect(componentObject.backTopButton()).toBeTruthy();
      });
    });

    describe('[nzIcon]', () => {
      it('should custom template work', async () => {
        fixture.componentInstance.useCustomIconTemplate.set(true);
        await scrollTo(window, defaultVisibilityHeight + 1);
        expect(debugElement.query(By.css('.custom-icon'))).toBeTruthy();
      });
    });
  });

  testDirectionality(() => TestFloatButtonTopComponent, By.directive(NzFloatButtonTopComponent), 'ant-float-btn');

  describe('animation', () => {
    it('should have correct animation classes', () => {
      const fixture = TestBed.createComponent(NzFloatButtonTopComponent);
      const component = fixture.componentInstance;

      expect(component['fadeAnimationEnter']()).toBe('ant-float-btn-top-motion-enter');
      expect(component['fadeAnimationLeave']()).toBe('ant-float-btn-top-motion-leave');
    });
  });
});

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
  selector: 'test-float-button-top',
  imports: [NzFloatButtonModule],
  template: `
    <nz-float-button-top
      [nzTarget]="target()"
      [nzVisibilityHeight]="customVisibilityHeight()"
      [nzIcon]="useCustomIconTemplate() ? customIcon : null"
      (nzOnClick)="handleClick($event)"
    />
    <div id="fakeTarget"></div>
    <ng-template #customIcon>
      <div class="custom-icon"></div>
    </ng-template>
  `
})
class TestFloatButtonTopComponent {
  @ViewChild(NzFloatButtonTopComponent, { static: true })
  floatButtonTopComponent!: NzFloatButtonTopComponent;

  readonly target = signal<HTMLElement | string | null>(null);
  readonly customVisibilityHeight = signal<number | undefined>(defaultVisibilityHeight);
  readonly useCustomIconTemplate = signal(false);
  handleClick = vi.fn();

  setTarget(target: HTMLElement | string): void {
    this.target.set(target);
  }
}
