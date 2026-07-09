/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { Component, DebugElement, DOCUMENT, ElementRef, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { expect, vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NzScrollService } from 'ng-zorro-antd/core/services';
import { sleep, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzDirectionVHType, NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzAnchorComponent } from './anchor.component';
import { NzAnchorModule } from './anchor.module';

const throttleTime = 51;

describe('anchor', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;
  let page: PageObject;
  let srv: NzScrollService;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
    fixture = TestBed.createComponent(TestComponent);
    dl = fixture.debugElement;
    context = fixture.componentInstance;
    fixture.autoDetectChanges();
    page = new PageObject();
    srv = TestBed.inject(NzScrollService);
    vi.spyOn(srv, 'scrollTo').mockImplementation(() => {});
    await fixture.whenStable();
    await sleep(100);
    vi.spyOn(context, '_scroll').mockImplementation(() => {});
    vi.spyOn(context, '_change').mockImplementation(() => {});
  });

  afterEach(() => fixture.destroy());

  describe('[default]', () => {
    it(`should scrolling to target via click a link`, () => {
      vi.mocked(srv.scrollTo).mockImplementation((_containerEl, _targetTopValue = 0, options = {}) => {
        if (options.callback) {
          options.callback();
        }
      });
      expect(context._scroll).not.toHaveBeenCalled();
      page.to('#何时使用');
      expect(context._scroll).toHaveBeenCalled();
    });

    it('should be activated when scrolling to the anchor', async () => {
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      await sleep(throttleTime);
      const inkNode = page.getEl('.ant-anchor-ink-ball');
      expect(+inkNode.style.top!.replace('px', '')).toBeGreaterThan(0);
      expect(context._scroll).toHaveBeenCalled();
    });

    it('should be activated when scrolling to the anchor - horizontal', async () => {
      context.nzDirection.set('horizontal');
      await updateNonSignalsInput(fixture);
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      await sleep(throttleTime);
      const inkNode = page.getEl('.ant-anchor-ink-ball');
      expect(+inkNode.style.left!.replace('px', '')).not.toBeNull();
      expect(context._scroll).toHaveBeenCalled();
    });

    it('should clean activated when leaving all anchor', async () => {
      page.scrollTo();
      await sleep(throttleTime);
      fixture.detectChanges();
      vi.spyOn(context.comp, 'clearActive' as NzSafeAny).mockImplementation(() => {});
      context.nzOffsetTop.set(-100);
      await updateNonSignalsInput(fixture);
      context.comp.handleScroll();
      await sleep(throttleTime);
      fixture.detectChanges();
      expect(context.comp['clearActive']!).toHaveBeenCalled();
    });

    it(`won't scrolling when is not exists link`, () => {
      vi.spyOn(srv, 'getScroll').mockReturnValue(undefined as NzSafeAny);
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page!.to('#invalid');
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`won't scrolling when is invalid link`, () => {
      vi.spyOn(srv, 'getScroll').mockReturnValue(undefined as NzSafeAny);
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.to('invalidLink');
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`supports complete href link (e.g. http://www.example.com/#id)`, () => {
      vi.spyOn(srv, 'getScroll').mockReturnValue(undefined as NzSafeAny);
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.getEl('.mock-complete').click();
      fixture.detectChanges();
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`should priorities most recently`, async () => {
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo('#parallel1');
      await sleep(throttleTime);
      expect(context._scroll).toHaveBeenCalled();
    });
  });

  describe('property', () => {
    describe('[nzAffix]', () => {
      it(`is [true]`, () => {
        const linkList = dl.queryAll(By.css('nz-affix'));
        expect(linkList.length).toBe(1);
      });

      it(`is [false]`, async () => {
        let linkList = dl.queryAll(By.css('nz-affix'));
        expect(linkList.length).toBe(1);
        context.nzAffix.set(false);
        await updateNonSignalsInput(fixture);
        linkList = dl.queryAll(By.css('nz-affix'));
        expect(linkList.length).toBe(0);
      });
    });

    describe('[nzOffsetTop]', () => {
      it('should be using "calc" method calculate max-height', () => {
        const wrapperEl = dl.query(By.css('.ant-anchor-wrapper'));
        expect(wrapperEl.styles['max-height']).toContain('calc(');
      });
    });

    describe('[nzCurrentAnchor]', () => {
      it('customize the anchor highlight', async () => {
        context.nzCurrentAnchor.set('#basic');
        await updateNonSignalsInput(fixture);
        const linkList = dl.queryAll(By.css('.ant-anchor-link'));
        expect(linkList.length).toBeGreaterThan(0);
        const activeLink = linkList.find(n => (n.nativeElement as HTMLDivElement).getAttribute('nzhref') === '#basic')!;
        expect(activeLink).toBeTruthy();
        expect((activeLink.nativeElement as HTMLDivElement).classList).toContain('ant-anchor-link-active');
      });
    });

    describe('[nzShowInkInFixed]', () => {
      beforeEach(async () => {
        context.nzAffix.set(false);
        await updateNonSignalsInput(fixture);
      });

      it('should be show ink when [false]', async () => {
        context.nzShowInkInFixed.set(false);
        await updateNonSignalsInput(fixture);
        page.scrollTo();
        expect(dl.query(By.css('.ant-anchor-fixed')) == null).toBe(false);
      });

      it('should be hide ink when [true]', async () => {
        context.nzShowInkInFixed.set(true);
        await updateNonSignalsInput(fixture);
        page.scrollTo();
        expect(dl.query(By.css('.ant-anchor-fixed')) == null).toBe(true);
      });
    });

    describe('[nzContainer]', () => {
      it('with window', async () => {
        vi.spyOn(window, 'addEventListener').mockImplementation(() => {});
        context.nzContainer.set(window);
        await updateNonSignalsInput(fixture);
        expect(window.addEventListener).toHaveBeenCalled();
      });

      it('with string', async () => {
        vi.spyOn(context, '_click').mockImplementation(() => {});
        const el = document.querySelector('#target')!;
        vi.spyOn(el, 'addEventListener').mockImplementation(() => {});
        context.nzContainer.set('#target');
        await updateNonSignalsInput(fixture);
        expect(el.addEventListener).toHaveBeenCalled();
        page.to('#basic-target');
        expect(context._click).toHaveBeenCalled();
      });
    });

    describe('(nzChange)', () => {
      it('should emit nzChange when click a link', async () => {
        vi.mocked(srv.scrollTo).mockImplementation((_containerEl, _targetTopValue = 0, options = {}) => {
          if (options.callback) {
            options.callback();
          }
        });
        expect(context._change).not.toHaveBeenCalled();
        page.to('#basic-target');
        expect(context._change).toHaveBeenCalled();
      });

      it('should emit nzChange when scrolling to the anchor', async () => {
        expect(context._change).not.toHaveBeenCalled();
        (context.comp as NzSafeAny).activeLink = undefined;
        page.scrollTo();
        context.comp.handleScroll();
        await sleep(throttleTime);
        const inkNode = page.getEl('.ant-anchor-ink-ball');
        expect(+inkNode.style.top!.replace('px', '')).toBeGreaterThan(0);
        expect(context._change).toHaveBeenCalled();
      });
    });

    it('(nzClick)', () => {
      vi.spyOn(context, '_click').mockImplementation(() => {});
      expect(context._click).not.toHaveBeenCalled();
      const linkList = dl.queryAll(By.css('.ant-anchor-link-title'));
      expect(linkList.length).toBeGreaterThan(0);
      (linkList[0].nativeElement as HTMLLinkElement).click();
      fixture.detectChanges();
      expect(context._click).toHaveBeenCalled();
    });
  });

  describe('link', () => {
    it(`should show custom template of [nzTemplate]`, () => {
      expect(dl.query(By.css('.nzTemplate-title')) != null).toBe(true);
    });

    it(`should show custom template of [nzTitle]`, () => {
      expect(dl.query(By.css('.nzTitle-title')) != null).toBe(true);
    });
  });

  describe('direction', () => {
    it(`should have vertical direction by default`, () => {
      const wrapperEl = dl.query(By.css('.ant-anchor-wrapper'));
      expect(wrapperEl.nativeElement.classList).not.toContain('ant-anchor-wrapper-horizontal');
    });

    it(`should have correct class name in horizontal mode`, async () => {
      context.nzDirection.set('horizontal');
      await updateNonSignalsInput(fixture);
      const wrapperEl = dl.query(By.css('.ant-anchor-wrapper'));
      expect(wrapperEl.nativeElement.classList).toContain('ant-anchor-wrapper-horizontal');
    });
  });

  describe('**boundary**', () => {
    it('#getOffsetTop', async () => {
      const el1 = document.getElementById('何时使用')!;
      vi.spyOn(el1, 'getClientRects').mockReturnValue([] as NzSafeAny);
      const el2 = document.getElementById('parallel1')!;
      vi.spyOn(el2, 'getBoundingClientRect').mockReturnValue({
        top: 0
      } as NzSafeAny);
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      context.comp.handleScroll();
      await sleep(throttleTime);
      expect(context._scroll).toHaveBeenCalled();
    });
  });

  class PageObject {
    getEl(cls: string): HTMLElement {
      const el = dl.query(By.css(cls));
      expect(el).not.toBeNull();
      return el.nativeElement as HTMLElement;
    }
    to(href: string = '#basic'): this {
      this.getEl(`nz-affix [href="${href}"]`).click();
      fixture.detectChanges();
      return this;
    }
    scrollTo(href: string = '#basic'): this {
      const toNode = dl.query(By.css(href));
      (toNode.nativeElement as HTMLElement).scrollIntoView();
      // `scrollIntoView()` only emits a native `scroll` event when it actually
      // changes the scroll position. Since the window scroll offset is shared
      // between tests in the same file, the target may already be in view, making
      // the call a no-op and the component's scroll handler never run. Dispatch
      // the event explicitly so the handler fires deterministically.
      window.dispatchEvent(new Event('scroll'));
      fixture.detectChanges();
      return this;
    }
  }
});

@Component({
  imports: [NzAnchorModule],
  template: `
    <nz-anchor
      [nzAffix]="nzAffix()"
      [nzBounds]="nzBounds()"
      [nzShowInkInFixed]="nzShowInkInFixed()"
      [nzOffsetTop]="nzOffsetTop()"
      [nzTargetOffset]="nzTargetOffset()"
      [nzContainer]="nzContainer()"
      [nzCurrentAnchor]="nzCurrentAnchor()"
      [nzDirection]="nzDirection()"
      (nzClick)="_click()"
      (nzScroll)="_scroll()"
      (nzChange)="_change()"
    >
      <nz-link nzHref="#何时使用" nzTitle="何时使用" />
      <nz-link nzHref="#basic" nzTitle="Basic demo" />
      <nz-link nzHref="#API-AnchorLink">
        <ng-template #nzTemplate>
          <span class="nzTemplate-title">tpl</span>
        </ng-template>
      </nz-link>
      <nz-link nzHref="#API" nzTitle="API">
        <nz-link nzHref="#API-Anchor" nzTitle="nz-anchor" />
        <nz-link nzHref="#API-AnchorLink" [nzTitle]="title">
          <ng-template #title>
            <span class="nzTitle-title">tpl-title</span>
          </ng-template>
        </nz-link>
      </nz-link>
      <nz-link nzHref="#invalid" nzTitle="invalid" />
      <nz-link nzHref="invalidLink" nzTitle="invalidLink" />
      <nz-link nzHref="http://www.example.com/#id" nzTitle="complete" class="mock-complete" />
      <nz-link nzHref="#parallel1" nzTitle="parallel1" />
      <nz-link nzHref="#parallel2" nzTitle="parallel2" />
      <nz-link nzHref="#basic-target" nzTitle="basic-target" />
    </nz-anchor>
    <h2 id="何时使用"></h2>
    <div style="height: 1000px"></div>
    <h2 id="basic"></h2>
    <div style="height: 100px"></div>
    <h2 id="API"></h2>
    <div style="height: 100px"></div>
    <h2 id="API-Anchor"></h2>
    <div style="height: 100px"></div>
    <h2 id="API-AnchorLink"></h2>
    <table>
      <tr>
        <td><h2 id="parallel1">parallel1</h2></td>
        <td><h2 id="parallel2">parallel2</h2></td>
      </tr>
    </table>

    <div style="height: 1000px"></div>
    <div id="target">
      <div style="height: 1000px"></div>
      <h2 id="basic-target"></h2>
    </div>
  `,
  styles: `
    @import './style/testing.less';
  `
})
export class TestComponent {
  @ViewChild(NzAnchorComponent, { static: false }) comp!: NzAnchorComponent;
  readonly nzAffix = signal(true);
  readonly nzBounds = signal(5);
  readonly nzOffsetTop = signal(0);
  readonly nzTargetOffset = signal<number | undefined>(undefined);
  readonly nzShowInkInFixed = signal(false);
  readonly nzContainer = signal<NzSafeAny>(null);
  readonly nzCurrentAnchor = signal<string | undefined>(undefined);
  readonly nzDirection = signal<NzDirectionVHType>('vertical');
  _click(): void {}
  _change(): void {}
  _scroll(): void {}
}

describe('NzAnchor', () => {
  let component: NzAnchorComponent;
  let fixture: ComponentFixture<NzAnchorComponent>;
  let mockPlatform: Platform;
  let scrollService: NzScrollService;
  let mockDocument: Document;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NzAnchorComponent,
        { provide: DOCUMENT, useValue: document },
        NzScrollService,
        { provide: ElementRef, useValue: new ElementRef(document.createElement('div')) }
      ]
    });

    fixture = TestBed.createComponent(NzAnchorComponent);
    component = fixture.componentInstance;
    mockPlatform = TestBed.inject(Platform);
    scrollService = TestBed.inject(NzScrollService);
    mockDocument = TestBed.inject(DOCUMENT);
  });

  it('should not register listeners if platform is not browser', () => {
    mockPlatform.isBrowser = false;

    component.ngAfterViewInit();
    expect(component['handleScrollTimeoutID']).toBeFalsy();
  });

  it('should calculate the correct offsetTop in handleScroll method', () => {
    component.nzTargetOffset = 50;
    component.nzOffsetTop = 20;
    component.nzBounds = 5;

    component.handleScroll();

    expect(component.nzTargetOffset).toBe(50);
    expect(component.nzOffsetTop).toBe(20);
  });

  it('should calculate target scroll top correctly and call scrollTo', () => {
    const mockElement = document.createElement('div');
    vi.spyOn(mockDocument, 'getElementById').mockReturnValue(mockElement);
    vi.spyOn(mockDocument, 'querySelector').mockReturnValue(mockElement);
    vi.spyOn(scrollService, 'getScroll').mockReturnValue(100);
    vi.spyOn(component as NzSafeAny, 'getContainer').mockReturnValue(window);

    component.nzTargetOffset = undefined;
    component.nzOffsetTop = undefined;

    const mockLinkComponent = {
      nzHref: '#test',
      setActive: vi.fn(),
      getLinkTitleElement: () => document.createElement('a')
    } as NzSafeAny;

    const scrollToSpy = vi.spyOn(scrollService, 'scrollTo').mockImplementation(() => {});

    component.handleScrollTo(mockLinkComponent);

    expect(scrollToSpy).toHaveBeenCalledWith(component['getContainer'](), 100, expect.any(Object));
  });
});
