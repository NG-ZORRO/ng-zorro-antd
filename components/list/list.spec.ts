import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconModule } from '../icon/nz-icon.module';

import { NzListComponent } from './nz-list.component';
import { NzListModule } from './nz-list.module';

describe('list', () => {
  let fixture: ComponentFixture<TestListComponent>;
  let context: TestListComponent;
  let dl: DebugElement;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ NzListModule, NzIconModule ],
      declarations: [ TestListComponent, TestListWithTemplateComponent, TestListItemComponent ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestListComponent);
    context = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    if (context.comp != null) {
      context.comp.ngOnDestroy();
    }
  });

  describe('[fields]', () => {

    describe('#nzItemLayout', () => {
      for (const item of [ { type: 'default', ret: false }, { type: 'vertical', ret: true } ]) {
        it(`[${item.type}]`, () => {
          context.nzItemLayout = item.type;
          fixture.detectChanges();
          expect(dl.query(By.css(`.ant-list-${item.type}`)) != null).toBe(item.ret);
        });
      }
    });

    describe('#nzBordered', () => {
      for (const value of [ true, false ]) {
        it(`[${value}]`, () => {
          context.nzBordered = value;
          fixture.detectChanges();
          expect(dl.query(By.css('.ant-list-bordered')) != null).toBe(value);
        });
      }
    });

    describe('#nzHeader', () => {
      it('with string', () => {
        expect(dl.query(By.css('.ant-list-header')) != null).toBe(true);
      });
      it('with custom template', () => {
        const fixtureTemp = TestBed.createComponent(TestListWithTemplateComponent);
        fixtureTemp.detectChanges();
        expect(fixtureTemp.debugElement.query(By.css('.list-header')) != null).toBe(true);
      });
    });

    describe('#nzFooter', () => {
      it('with string', () => {
        expect(dl.query(By.css('.ant-list-footer')) != null).toBe(true);
      });
      it('with custom template', () => {
        const fixtureTemp = TestBed.createComponent(TestListWithTemplateComponent);
        fixtureTemp.detectChanges();
        const footerEl = fixtureTemp.debugElement.query(By.css('.ant-list-footer'));
        expect((footerEl.nativeElement as HTMLDivElement).innerText).toBe(fixtureTemp.componentInstance.footer as string);
      });
      it('change string to template', () => {
        const fixtureTemp = TestBed.createComponent(TestListWithTemplateComponent);
        fixtureTemp.detectChanges();
        const footerEl = fixtureTemp.debugElement.query(By.css('.ant-list-footer'));
        expect((footerEl.nativeElement as HTMLDivElement).innerText).toBe(fixtureTemp.componentInstance.footer as string);
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
          context.nzSize = item.type;
          fixture.detectChanges();
          expect(dl.query(By.css(item.cls)) != null).toBe(true);
        });
      }
    });

    describe('#nzSplit', () => {
      for (const value of [ true, false ]) {
        it(`[${value}]`, () => {
          context.nzSplit = value;
          fixture.detectChanges();
          expect(dl.query(By.css('.ant-list-split')) != null).toBe(value);
        });
      }
    });

    describe('#nzLoading', () => {
      for (const value of [ true, false ]) {
        it(`[${value}]`, () => {
          context.nzLoading = value;
          fixture.detectChanges();
          expect(dl.query(By.css('.ant-list-loading')) != null).toBe(value);
        });
      }

      it('should be minimum area block when data is empty', () => {
        context.nzLoading = true;
        context.data = [];
        fixture.detectChanges();
        expect(dl.query(By.css('.ant-spin-nested-loading'))).not.toBeNull();
      });
    });

    describe('#nzDataSource', () => {
      it('should working', () => {
        expect(dl.queryAll(By.css('nz-list-item')).length).toBe(context.data.length);
      });

      it('should be render empty text when data source is empty', () => {
        expect(dl.queryAll(By.css('.ant-list-empty-text')).length).toBe(0);
        context.data = [];
        fixture.detectChanges();
        expect(dl.queryAll(By.css('.ant-list-empty-text')).length).toBe(1);
      });
    });

    it('#nzGrid', () => {
      const colCls = `.ant-col-${context.nzGrid.span}`;
      expect(dl.queryAll(By.css(colCls)).length).toBe(context.data.length);
    });

    it('#loadMore', () => {
      expect(dl.query(By.css('.loadmore')) != null).toBe(true);
    });

    it('#pagination', () => {
      expect(dl.query(By.css('.pagination')) != null).toBe(true);
    });
  });

  describe('item', () => {
    let fixtureTemp: ComponentFixture<TestListItemComponent>;
    beforeEach(() => {
      fixtureTemp = TestBed.createComponent(TestListItemComponent);
      fixtureTemp.detectChanges();
    });
    it('with string', () => {
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-content')) != null).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-action')) != null).toBe(true);
      expect(fixtureTemp.debugElement.query(By.css('#item-string .ant-list-item-extra')) != null).toBe(true);
    });
    it('with custom template of [nzContent]', () => {
      expect(fixtureTemp.debugElement.query(By.css('#item-template .ant-list-item-content .item-content')) != null).toBe(true);
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

@Component({
  template: `
  <nz-list #comp
    [nzDataSource]="data"
    [nzItemLayout]="nzItemLayout"
    [nzBordered]="nzBordered"
    [nzFooter]="nzFooter"
    [nzHeader]="nzHeader"
    [nzLoading]="nzLoading"
    [nzSize]="nzSize"
    [nzSplit]="nzSplit"
    [nzGrid]="nzGrid"
    [nzRenderItem]="item"
    [nzLoadMore]="loadMore"
    [nzPagination]="pagination">
    <ng-template #item let-item>
      <nz-list-item>
        <nz-list-item-meta
          nzTitle="title"
          nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          nzDescription="Ant Design, a design language for background applications, is refined by Ant UED Team">
        </nz-list-item-meta>
      </nz-list-item>
    </ng-template>
    <ng-template #loadMore>
      <div class="loadmore">loadmore</div>
    </ng-template>
    <ng-template #pagination>
      <div class="pagination">pagination</div>
    </ng-template>
  </nz-list>
  `
})
class TestListComponent {
  @ViewChild('comp') comp: NzListComponent;
  nzItemLayout = 'horizontal';
  nzBordered = false;
  nzFooter = 'footer';
  nzHeader = 'header';
  nzLoading = false;
  nzSize = 'default';
  nzSplit = true;
  data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.'
  ];
  // tslint:disable-next-line:no-any
  nzGrid: any = {gutter: 16, span: 12};
}

@Component({
  template: `
  <button (click)="footer = nzFooter" id="change">change</button>
  <nz-list
    [nzFooter]="footer"
    [nzHeader]="nzHeader">
    <ng-template #nzFooter><p class="list-footer">footer</p></ng-template>
    <ng-template #nzHeader><p class="list-header">header</p></ng-template>
  </nz-list>
  `
})
class TestListWithTemplateComponent {

  @ViewChild('nzFooter') nzFooter: TemplateRef<void>;

  footer: string | TemplateRef<void> = 'footer with string';

}

@Component({
  template: `
  <nz-list id="item-string">
    <nz-list-item [nzContent]="'content'" [nzActions]="[action]" [nzExtra]="extra">
      <ng-template #action><i nz-icon type="star-o" style="margin-right: 8px;"></i> 156</ng-template>
      <ng-template #extra>
        <img width="272" alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png">
      </ng-template>
      <nz-list-item-meta
        nzTitle="title"
        nzAvatar="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        nzDescription="Ant Design, a design language for background applications, is refined by Ant UED Team">
      </nz-list-item-meta>
    </nz-list-item>
  </nz-list>
  <nz-list id="item-template">
    <nz-list-item [nzContent]="nzContent">
      <ng-template #nzContent><p class="item-content">nzContent</p></ng-template>
      <nz-list-item-meta
        [nzTitle]="nzTitle"
        [nzAvatar]="nzAvatar"
        [nzDescription]="nzDescription">
        <ng-template #nzTitle><p class="item-title">nzTitle</p></ng-template>
        <ng-template #nzAvatar><p class="item-avatar">nzAvatar</p></ng-template>
        <ng-template #nzDescription><p class="item-desc">nzDescription</p></ng-template>
      </nz-list-item-meta>
    </nz-list-item>
  </nz-list>
  `
})
class TestListItemComponent {
}
