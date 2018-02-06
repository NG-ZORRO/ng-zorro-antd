// tslint:disable
import { fakeAsync, tick, TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NzAnchorModule } from './nz-anchor.module';
import { NzAnchorComponent } from './nz-anchor.component';

function calInk(node: HTMLElement): number {
  return node.offsetTop + node.clientHeight / 2 - 4.5;
}

function getOffsetTop(element: HTMLElement): number {
  if (!element || !element.getClientRects().length) return 0;

  const rect = element.getBoundingClientRect();

  if (rect.width || rect.height) {
    const doc = element.ownerDocument;
    const docElem = doc.documentElement;
    return rect.top - docElem.clientTop;
  }

  return rect.top;
}

describe('anchor', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let context: TestComponent;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
        imports: [ NzAnchorModule ],
        declarations: [ TestComponent ]
    }).createComponent(TestComponent);
    dl = fixture.debugElement;
    context = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be init', () => {
    expect(context).not.toBeNull();
  });

  it('should hava remove listen when the component is destroyed', () => {
    expect(context.comp._scroll$.closed).toBeFalsy();
    context.comp.ngOnDestroy();
    fixture.detectChanges();
    expect(context.comp._scroll$.closed).toBeTruthy();
  });

  it('should be actived when scrolling to the anchor', () => {
    spyOn(context, '_scroll');
    expect(context._scroll).not.toHaveBeenCalled();
    const toNode = dl.query(By.css('#何时使用'));
    (toNode.nativeElement as HTMLElement).scrollIntoView();
    context.comp.handleScroll();
    fixture.detectChanges();
    const inkNode = dl.query(By.css('.ant-anchor-ink-ball'));
    expect(inkNode).not.toBeNull();
    const activeNode = dl.query(By.css('.ant-anchor-link-active .ant-anchor-link-title'));
    expect(activeNode).not.toBeNull();
    const ret = calInk(activeNode.nativeElement);
    expect(+inkNode.nativeElement.style.top.replace('px', '')).toBe(ret);
    expect(context._scroll).toHaveBeenCalled();
  });

  describe('link', () => {
    it(`should show custom template of [nzTemplate]`, () => {
      expect(dl.query(By.css('.nzTemplate-title')) != null).toBe(true);
    });
    it(`should show custom template of [nzTitle]`, () => {
      expect(dl.query(By.css('.nzTitle-title')) != null).toBe(true);
    });
  });

  describe('#nzAffix', () => {
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

  it('#nzClick', () => {
    spyOn(context, '_click');
    expect(context._click).not.toHaveBeenCalled();
    const linkList = dl.queryAll(By.css('.ant-anchor-link-title'));
    expect(linkList.length).toBeGreaterThan(0);
    (linkList[0].nativeElement as HTMLLinkElement).click();
    fixture.detectChanges();
    expect(context._click).toHaveBeenCalled();
  });

});

@Component({
  template: `
  <nz-anchor [nzAffix]="nzAffix" [nzBounds]="nzBounds" (nzClick)="_click($event)" (nzScroll)="_scroll($event)">
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
  <div style="height: 100px"></div>
  `
})
export class TestComponent {
  @ViewChild(NzAnchorComponent) comp: NzAnchorComponent;
  nzAffix = true;
  nzBounds = 5;
  _click() {}
  _scroll() {}
}
