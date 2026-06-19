/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AsyncPipe } from '@angular/common';
import { Component, DebugElement, signal, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

import { testDirectionality } from 'ng-zorro-antd/core/testing';
import { NzDirectionVHType, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzListComponent } from './list.component';
import { NzListModule } from './list.module';

describe('list', () => {
  let fixture: ComponentFixture<TestListComponent>;
  let context: TestListComponent;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
    fixture = TestBed.createComponent(TestListComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('[fields]', () => {
    describe('#nzItemLayout', () => {
      for (const item of [
        { type: 'default', ret: false },
        { type: 'vertical', ret: true }
      ]) {
        it(`[${item.type}]`, () => {
          context.nzItemLayout.set(item.type as NzDirectionVHType);
          fixture.detectChanges();
          expect(dl.query(By.css(`.ant-list-${item.type}`)) != null).toBe(item.ret);
        });
      }
    });

    describe('#nzBordered', () => {
      for (const value of [true, false]) {
        it(`[${value}]`, () => {
          context.nzBordered.set(value);
          fixture.detectChanges();
          expect(dl.query(By.css('.ant-list-bordered')) != null).toBe(value);
        });
      }
    });

    describe('#nzHeader', () => {
      it('with string', () => {
        expect(dl.query(By.css('.ant-list-header'))).not.toBeNull();
      });

      it('with custom template', () => {
        const fixtureTemp = TestBed.createComponent(TestListWithTemplateComponent);
        fixtureTemp.detectChanges();
        expect(fixtureTemp.debugElement.query(By.css('.list-header'))).not.toBeNull();
      });
    });

    describe('#nzFooter', () => {
      let fixtureTemp: ComponentFixture<TestListWithTemplateComponent>;
      beforeEach(() => {
        fixtureTemp = TestBed.createComponent(TestListWithTemplateComponent);
        fixtureTemp.detectChanges();
      });

      it('with string', () => {
        expect(dl.query(By.css('.ant-list-footer')) != null).toBe(true);
      });

      it('with custom template', () => {
        const footerEl = fixtureTemp.debugElement.query(By.css('.ant-list-footer'));
        expect((footerEl.nativeElement as HTMLDivElement).innerText).toBe(
          fixtureTemp.componentInstance.footer() as string
        );
      });

      it('change string to template', () => {
        const footerEl = fixtureTemp.debugElement.query(By.css('.ant-list-footer'));
        expect((footerEl.nativeElement as HTMLDivElement).innerText).toBe(
          fixtureTemp.componentInstance.footer() as string
        );
        (fixtureTemp.debugElement.query(By.css('#change')).nativeElement as HTMLButtonElement).click();
        fixtureTemp.detectChanges();
        expect(fixtureTemp.debugElement.query(By.css('.list-footer')) != null).toBe(true);
      });
    });

    describe('#nzSize', () => {
      for (const item of [
        { type: 'default', cls: '.ant-list' },
        { type: 'small', cls: '.ant-list-sm' },
        { type: 'large', cls: '.ant-list-lg' }
      ]) {
        it(`[${item.type}]`, () => {
          context.nzSize.set(item.type as NzSizeLDSType);
          fixture.detectChanges();
          expect(dl.query(By.css(item.cls)) != null).toBe(true);
        });
      }
    });

    describe('#nzSplit', () => {
      for (const value of [true, false]) {
        it(`[${value}]`, () => {
          context.nzSplit.set(value);
          fixture.detectChanges();
          expect(dl.query(By.css('.ant-list-split')) != null).toBe(value);
        });
      }
    });

    describe('#nzLoading', () => {
      for (const value of [true, false]) {
        it(`[${value}]`, () => {
          context.nzLoading.set(value);
          fixture.detectChanges();
          expect(dl.query(By.css('.ant-list-loading')) != null).toBe(value);
        });
      }

      it('should be minimum area block when data is empty', () => {
        context.nzLoading.set(true);
        context.data.set([]);
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-spin-nested-loading'))).not.toBeNull();
      });
    });

    describe('#nzDataSource', () => {
      it('should working', () => {
        expect(dl.queryAll(By.css('nz-list-item')).length).toBe(context.data()!.length);
      });

      it('should be render empty text when data source is empty', () => {
        expect(dl.queryAll(By.css('.ant-list-empty-text')).length).toBe(0);
        context.data.set([]);
        fixture.detectChanges();
        expect(dl.queryAll(By.css('.ant-list-empty-text')).length).toBe(1);
      });

      it('should be ignore empty text when unspecified data source', () => {
        context.data.set(undefined!);
        fixture.detectChanges();
        expect(dl.queryAll(By.css('.ant-list-empty-text')).length).toBe(0);
      });
    });

    it('#nzGrid', () => {
      const colCls = `.ant-col-${context.nzGrid().span}`;
      expect(dl.queryAll(By.css(colCls)).length).toBe(context.data()!.length);
    });

    it('#loadMore', () => {
      expect(dl.query(By.css('.loadmore'))).not.toBeNull();
    });

    it('#pagination', () => {
      expect(dl.query(By.css('.pagination'))).not.toBeNull();
    });

    it('should be use split main and extra when item layout is vertical', () => {
      context.nzItemLayout.set('vertical');
      fixture.detectChanges();
      expect(dl.query(By.css('.ant-list-item-main'))).not.toBeNull();
      expect(dl.query(By.css('.ant-list-item-extra'))).not.toBeNull();
    });

    describe('asynchronous action', () => {
      beforeEach(() => jasmine.clock().install());
      afterEach(() => jasmine.clock().uninstall());

      it('should display the asynchronous action', async () => {
        jasmine.clock().tick(500);
        await Promise.resolve();
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-list-item-action'))).not.toBeNull();
      });
    });
  });

  describe('item', () => {
    let fixtureTemp: ComponentFixture<TestListItemComponent>;

    beforeEach(() => {
      fixtureTemp = TestBed.createComponent(TestListItemComponent);
      fixtureTemp.detectChanges();
    });

    it('with string', () => {
      expect(
        (
          fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item')).nativeElement as HTMLElement
        ).textContent!.includes('content')
      ).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-action')) != null).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-string .extra-logo')) != null).toBe(true);
    });

    it('with custom template of [nzContent]', () => {
      expect(fixtureTemp.debugElement.query(By.css('#item-template .item-content')) != null).toBe(true);
    });

    it('#nzNoFlex', () => {
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-no-flex')) != null).toBe(false);
      fixtureTemp.componentInstance.noFlex.set(true);
      fixtureTemp.detectChanges();
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-no-flex')) != null).toBe(true);
    });
  });

  describe('item-meta', () => {
    let fixtureTemp: ComponentFixture<TestListItemComponent>;

    beforeEach(() => {
      fixtureTemp = TestBed.createComponent(TestListItemComponent);
      fixtureTemp.detectChanges();
    });

    it('with string', () => {
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-meta-title')) != null).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-meta-description')) != null).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-meta-avatar')) != null).toBe(true);
    });

    it('with custom template', () => {
      expect(fixtureTemp.debugElement.query(By.css('#item-template .item-title')) != null).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-template .item-desc')) != null).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-template .item-avatar')) != null).toBe(true);
    });
  });
});

testDirectionality(() => TestListComponent, By.directive(NzListComponent), 'ant-list', {
  providers: [provideNzIconsTesting()]
});

@Component({
  imports: [NzListModule, AsyncPipe],
  selector: 'nz-test-list',
  template: `
    <nz-list
      #comp
      [nzDataSource]="data()"
      [nzItemLayout]="nzItemLayout()"
      [nzBordered]="nzBordered()"
      [nzFooter]="nzFooter"
      [nzHeader]="nzHeader"
      [nzLoading]="nzLoading()"
      [nzSize]="nzSize()"
      [nzSplit]="nzSplit()"
      [nzGrid]="nzGrid()"
      [nzRenderItem]="item"
      [nzLoadMore]="loadMore"
      [nzPagination]="pagination"
    >
      <ng-template #item let-item>
        <nz-list-item [nzExtra]="extra">
          <nz-list-item-meta
            nzTitle="title"
            nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            nzDescription="Ant Design, a design language for background applications, is refined by Ant UED Team"
          />
          <ul nz-list-item-actions>
            @for (action of actions$ | async; track action) {
              <nz-list-item-action>{{ action }}</nz-list-item-action>
            }
          </ul>
        </nz-list-item>
      </ng-template>
      <ng-template #loadMore>
        <div class="loadmore">load more</div>
      </ng-template>
      <ng-template #pagination>
        <div class="pagination">pagination</div>
      </ng-template>
      <ng-template #extra>
        <span class="extra-content">extra content</span>
      </ng-template>
    </nz-list>
  `
})
class TestListComponent {
  @ViewChild('comp', { static: false }) comp!: NzListComponent;
  readonly nzItemLayout = signal<NzDirectionVHType>('horizontal');
  readonly nzBordered = signal(false);
  nzFooter = 'footer';
  nzHeader = 'header';
  readonly nzLoading = signal(false);
  readonly nzSize = signal<NzSizeLDSType>('default');
  readonly nzSplit = signal(true);
  readonly data = signal<string[]>([
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.'
  ]);
  readonly nzGrid = signal({ gutter: 16, span: 12 });
  readonly actions$ = timer(500).pipe(map(() => ['Edit', 'Delete']));
}

@Component({
  imports: [NzListModule],
  template: `
    <button (click)="footer.set(nzFooter)" id="change">change</button>
    <nz-list [nzFooter]="footer()" [nzHeader]="nzHeader">
      <ng-template #nzFooter><p class="list-footer">footer</p></ng-template>
      <ng-template #nzHeader><p class="list-header">header</p></ng-template>
    </nz-list>
  `
})
class TestListWithTemplateComponent {
  @ViewChild('nzFooter', { static: false }) nzFooter!: TemplateRef<void>;

  readonly footer = signal<string | TemplateRef<void>>('footer with string');
}

@Component({
  imports: [NzIconModule, NzListModule],
  template: `
    <nz-list id="item-string">
      <nz-list-item nzContent="content" [nzActions]="[action]" [nzExtra]="extra" [nzNoFlex]="noFlex()">
        <ng-template #action>
          <nz-icon nzType="star-o" style="margin-right: 8px;" />
          156
        </ng-template>
        <ng-template #extra>
          <img
            width="272"
            class="extra-logo"
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        </ng-template>
        <nz-list-item-meta
          nzTitle="title"
          nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          nzDescription="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </nz-list-item>
    </nz-list>
    <nz-list id="item-template">
      <nz-list-item [nzContent]="nzContent">
        <ng-template #nzContent><p class="item-content">nzContent</p></ng-template>
        <nz-list-item-meta [nzTitle]="nzTitle" [nzAvatar]="nzAvatar" [nzDescription]="nzDescription">
          <ng-template #nzTitle><p class="item-title">nzTitle</p></ng-template>
          <ng-template #nzAvatar><p class="item-avatar">nzAvatar</p></ng-template>
          <ng-template #nzDescription><p class="item-desc">nzDescription</p></ng-template>
        </nz-list-item-meta>
      </nz-list-item>
    </nz-list>
  `
})
class TestListItemComponent {
  readonly noFlex = signal(false);
}
