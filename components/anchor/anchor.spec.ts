// tslint:disable
import { fakeAsync, tick, TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NzAnchorModule } from './nz-anchor.module';
import { NzAnchorComponent } from './nz-anchor.component';
import { NzAnchorLinkComponent } from './nz-anchor-link.component';
import { NzScrollService } from '../core/scroll/nz-scroll.service';

const throttleTime = 51;
describe('anchor', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;
  let page: PageObject;
  let srv: NzScrollService;
  beforeEach(() => {
    const i = TestBed.configureTestingModule({
        imports: [ NzAnchorModule ],
        declarations: [ TestComponent ]
    });
    fixture = TestBed.createComponent(TestComponent);
    dl = fixture.debugElement;
    context = fixture.componentInstance;
    fixture.detectChanges();
    page = new PageObject();
    spyOn(context, '_scroll');
    srv = i.get(NzScrollService);
  });
  afterEach(() => context.comp.ngOnDestroy());

  describe('[default]', () => {
    it(`should scolling to target via click a link`, () => {
      spyOn(srv, 'scrollTo').and.callFake((
        containerEl: Element | Window,
        targetTopValue: number = 0,
        easing?: any,
        callback?: () => void
      ) => {
        callback();
      });
      expect(context._scroll).not.toHaveBeenCalled();
      page.to('#何时使用');
      expect(context._scroll).toHaveBeenCalled();
    });

    it('should hava remove listen when the component is destroyed', () => {
      expect(context.comp.scroll$.closed).toBeFalsy();
      context.comp.ngOnDestroy();
      fixture.detectChanges();
      expect(context.comp.scroll$.closed).toBeTruthy();
    });

    it('should actived when scrolling to the anchor', (done: () => void) => {
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      setTimeout(() => {
        const inkNode = page.getEl('.ant-anchor-ink-ball');
        expect(+inkNode.style.top.replace('px', '')).toBeGreaterThan(0);
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });

    it(`won't scolling when is not exists link`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.to('#invalid');
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`won't scolling when is invalid link`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.to('invalidLink');
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`supports complete href link (e.g. http://www.example.com/#id)`, () => {
      spyOn(srv, 'getScroll');
      expect(context._scroll).not.toHaveBeenCalled();
      expect(srv.getScroll).not.toHaveBeenCalled();
      page.getEl('.mock-complete').click();
      fixture.detectChanges();
      expect(srv.getScroll).not.toHaveBeenCalled();
    });

    it(`should priorities most recently`, (done: () => void) => {
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo('#parallel1');
      setTimeout(() => {
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });
  });

  describe('property', () => {
    describe('[nzAffix]', () => {
      it(`is [true]`, () => {
        const linkList = dl.queryAll(By.css('nz-affix'));
        expect(linkList.length).toBe(1);
      });
      it(`is [false]`, () => {
        let linkList = dl.queryAll(By.css('nz-affix'));
        expect(linkList.length).toBe(1);
        context.nzAffix = false;
        fixture.detectChanges();
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

    describe('[nzShowInkInFixed]', () => {
      beforeEach(() => {
        context.nzAffix = false;
        fixture.detectChanges();
      });
      it('should be show ink when [false]', () => {
        context.nzShowInkInFixed = false;
        fixture.detectChanges();
        scrollTo();
        expect(dl.query(By.css('.fixed')) == null).toBe(false);
      });
      it('should be hide ink when [true]', () => {
        context.nzShowInkInFixed = true;
        fixture.detectChanges();
        scrollTo();
        expect(dl.query(By.css('.fixed')) == null).toBe(true);
      });
    });

    it('(nzClick)', () => {
      spyOn(context, '_click');
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

  describe('**boundary**', () => {
    it('#getOffsetTop', (done: () => void) => {
      const el1 = document.getElementById('何时使用');
      spyOn(el1, 'getClientRects').and.returnValue([]);
      const el2 = document.getElementById('parallel1');
      spyOn(el2, 'getBoundingClientRect').and.returnValue({
        top: 0
      });
      expect(context._scroll).not.toHaveBeenCalled();
      page.scrollTo();
      setTimeout(() => {
        expect(context._scroll).toHaveBeenCalled();
        done();
      }, throttleTime);
    });
  });

  class PageObject {
    getEl(cls: string): HTMLElement {
      const el = dl.query(By.css(cls));
      expect(el).not.toBeNull();
      return el.nativeElement as HTMLElement;
    }
    to(href: string = '#何时使用'): this {
      this.getEl(`nz-affix [href="${href}"]`).click();
      fixture.detectChanges();
      return this;
    }
    scrollTo(href: string = '#何时使用'): this {
      const toNode = dl.query(By.css(href));
      (toNode.nativeElement as HTMLElement).scrollIntoView();
      fixture.detectChanges();
      return this;
    }
  }

});

@Component({
  template: `
  <nz-anchor
    [nzAffix]="nzAffix"
    [nzBounds]="nzBounds"
    [nzShowInkInFixed]="nzShowInkInFixed"
    [nzOffsetTop]="nzOffsetTop"
    [nzTarget]="nzTarget"
    (nzClick)="_click($event)" (nzScroll)="_scroll($event)">
    <nz-link nzHref="#何时使用" nzTitle="何时使用"></nz-link>
    <nz-link nzHref="#basic" nzTitle="Basic demo"></nz-link>
    <nz-link nzHref="#API-AnchorLink">
      <ng-template #nzTemplate>
        <span class="nzTemplate-title">tpl</span>
      </ng-template>
    </nz-link>
    <nz-link nzHref="#API" nzTitle="API">
      <nz-link nzHref="#API-Anchor" nzTitle="nz-anchor"></nz-link>
      <nz-link nzHref="#API-AnchorLink" [nzTitle]="title">
        <ng-template #title>
          <span class="nzTitle-title">tpl-title</span>
        </ng-template>
      </nz-link>
    </nz-link>
    <nz-link nzHref="#invalid" nzTitle="invalid"></nz-link>
    <nz-link nzHref="invalidLink" nzTitle="invalidLink"></nz-link>
    <nz-link nzHref="http://www.example.com/#id" nzTitle="complete" class="mock-complete"></nz-link>
    <nz-link nzHref="#parallel1" nzTitle="parallel1"></nz-link>
    <nz-link nzHref="#parallel2" nzTitle="parallel2"></nz-link>
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
  `
})
export class TestComponent {
  @ViewChild(NzAnchorComponent) comp: NzAnchorComponent;
  nzAffix = true;
  nzBounds = 5;
  nzOffsetTop = 0;
  nzShowInkInFixed = false;
  nzTarget = null;
  _click() {}
  _scroll() {}
}
