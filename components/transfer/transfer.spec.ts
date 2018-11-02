// tslint:disable:no-any no-parameter-reassignment
import { Component, DebugElement, Injector, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import en_US from '../i18n/languages/en_US';
import { NzI18nService } from '../i18n/nz-i18n.service';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzTransferComponent, NzTransferModule } from './index';
import { TransferCanMove, TransferItem } from './interface';

const COUNT = 21;
const LEFTCOUNT = 2;
const DISABLED = 1;

describe('transfer', () => {
  let injector: Injector;
  let fixture: ComponentFixture<TestTransferComponent | TestTransferCustomRenderComponent | Test996Component>;
  let dl: DebugElement;
  let instance: TestTransferComponent;
  let pageObject: TransferPageObject;
  beforeEach(() => {
    injector = TestBed.configureTestingModule({
      imports     : [ NoopAnimationsModule, NzTransferModule, NzIconModule ],
      declarations: [ TestTransferComponent, TestTransferCustomRenderComponent, Test996Component ]
    });
    fixture = TestBed.createComponent(TestTransferComponent);
    dl = fixture.debugElement;
    instance = dl.componentInstance;
    pageObject = new TransferPageObject();
    fixture.detectChanges();
  });

  describe('[default]', () => {
    it('should be from left to right', () => {
      pageObject.expectLeft(LEFTCOUNT)
      .transfer('right', 0)
      .expectLeft(LEFTCOUNT - 1)
      .expectRight(COUNT - LEFTCOUNT + 1);
    });

    it('should be from right to left', () => {
      pageObject.expectRight(COUNT - LEFTCOUNT)
      .transfer('left', [ 0, 1 ])
      .expectRight(COUNT - LEFTCOUNT - 2)
      .expectLeft(LEFTCOUNT + 2);
    });

    it('should be from left to right when via search found items', () => {
      pageObject.expectLeft(LEFTCOUNT)
      .search('left', '1')
      .transfer('right', 0)
      .expectLeft(LEFTCOUNT - 1)
      .expectRight(COUNT - LEFTCOUNT + 1);
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(0);
    });

    it('should be from right to left when via search found items', () => {
      pageObject.expectRight(COUNT - LEFTCOUNT)
      .search('right', '2')
      .transfer('left', [ 0, 1 ])
      .expectLeft(LEFTCOUNT + 2)
      .expectRight(COUNT - LEFTCOUNT - 2);
      expect(pageObject.rightList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(DISABLED);
    });

    it('should be custom filter option', () => {
      instance.nzFilterOption = (inputValue: string, item: any): boolean => {
        return item.description.indexOf(inputValue) > -1;
      };
      fixture.detectChanges();
      pageObject.expectLeft(LEFTCOUNT).search('left', 'description of content1');
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
      (pageObject.leftList.querySelector('.ant-transfer-list-search-action') as HTMLElement).click();
      fixture.detectChanges();
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(LEFTCOUNT);
    });

    it('should be clear search keywords', () => {
      pageObject.expectLeft(LEFTCOUNT).search('left', '1');
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
      (pageObject.leftList.querySelector('.ant-transfer-list-search-action') as HTMLElement).click();
      fixture.detectChanges();
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(LEFTCOUNT);
    });

    it('should be checkbox is toggle select', () => {
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(1);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is disabled toggle select when setting disabled prop', () => {
      instance.nzDataSource = [ { title: `content`, disabled: true } ];
      fixture.detectChanges();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is toggle select via checkbox all in left', () => {
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      const btn = (pageObject.leftList.querySelector('.ant-transfer-list-header .ant-checkbox') as HTMLElement);
      btn.click();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(LEFTCOUNT);
      btn.click();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is toggle select via checkbox all in right', () => {
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(0);
      const btn = (pageObject.rightList.querySelector('.ant-transfer-list-header .ant-checkbox') as HTMLElement);
      btn.click();
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(COUNT - LEFTCOUNT - DISABLED);
      btn.click();
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be uncheck all when two verification error', () => {
      instance.canMove = (arg: TransferCanMove): Observable<TransferItem[]> => {
        return of(arg.list).pipe(map(() => {
          throw new Error('error');
        }));
      };
      fixture.detectChanges();
      pageObject.expectLeft(LEFTCOUNT)
      .transfer('right', [ 0, 1 ])
      .expectLeft(LEFTCOUNT)
      .expectRight(COUNT - LEFTCOUNT);
    });

    it('should be custom render item', () => {
      const tempFixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      tempFixture.detectChanges();
      const leftList = tempFixture.debugElement.query(By.css('[data-direction="left"]')).nativeElement as HTMLElement;
      expect(leftList.querySelectorAll('.anticon-frown-o').length).toBe(LEFTCOUNT);
    });

    it('should be custom footer', () => {
      expect(pageObject.leftList.querySelector('#transfer-footer') != null).toBe(true);
    });

    it('#i18n', () => {
      const tempFixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      tempFixture.detectChanges();
      injector.get(NzI18nService).setLocale(en_US);
      tempFixture.detectChanges();
      const searchPhText = (tempFixture.debugElement.query(By.css('.ant-transfer-list-search')).nativeElement as HTMLElement).attributes.getNamedItem('placeholder').textContent;
      expect(searchPhText).toBe(en_US.Transfer.searchPlaceholder);
    });
  });

  describe('#canMove', () => {
    it('default', () => {
      fixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      pageObject = new TransferPageObject();
      fixture.detectChanges();
      pageObject.expectLeft(LEFTCOUNT)
      .transfer('right', 0)
      .expectLeft(LEFTCOUNT - 1)
      .expectRight(COUNT - LEFTCOUNT + 1);
    });
    it('should be from left to right when two verification', () => {
      instance.canMove = (arg: TransferCanMove): Observable<TransferItem[]> => {
        if (arg.direction === 'right' && arg.list.length > 0) {
          arg.list.splice(0, 1);
        }
        return of(arg.list);
      };
      fixture.detectChanges();
      pageObject.expectLeft(LEFTCOUNT)
      .transfer('right', [ 0, 1 ])
      .expectLeft(LEFTCOUNT - 1)
      .expectRight(COUNT - LEFTCOUNT + 1);
    });
  });

  describe('#issues', () => {
    it('#996', fakeAsync(() => {
      fixture = TestBed.createComponent(Test996Component);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      pageObject = new TransferPageObject();
      fixture.detectChanges();
      expect(pageObject.getEl('[data-direction="right"] .ant-transfer-list-header .ant-checkbox').classList).not.toContain('ant-checkbox-checked');
      pageObject.checkItem('right', 1);
      tick();
      fixture.detectChanges();
      expect(pageObject.getEl('[data-direction="right"] .ant-transfer-list-header .ant-checkbox').classList).toContain('ant-checkbox-checked');
    }));
  });

  class TransferPageObject {
    [ key: string ]: any;

    getEl(cls: string): HTMLElement {
      return dl.query(By.css(cls)).nativeElement as HTMLElement;
    }

    get leftBtn(): HTMLButtonElement {
      return dl.query(By.css('.ant-transfer-operation .anticon-left')).nativeElement as HTMLButtonElement;
    }

    get rightBtn(): HTMLButtonElement {
      return dl.query(By.css('.ant-transfer-operation .anticon-right')).nativeElement as HTMLButtonElement;
    }

    get leftList(): HTMLElement {
      return dl.query(By.css('[data-direction="left"]')).nativeElement as HTMLElement;
    }

    get rightList(): HTMLElement {
      return dl.query(By.css('[data-direction="right"]')).nativeElement as HTMLElement;
    }

    transfer(direction: 'left' | 'right', index: number | number[]): this {
      if (!Array.isArray(index)) {
        index = [ index ];
      }
      this.checkItem(direction === 'left' ? 'right' : 'left', index);
      (direction === 'left' ? this.leftBtn : this.rightBtn).click();
      fixture.detectChanges();
      return this;
    }

    checkItem(direction: 'left' | 'right', index: number | number[]): this {
      if (!Array.isArray(index)) {
        index = [ index ];
      }
      const items = (direction === 'left' ? this.leftList : this.rightList).querySelectorAll('.ant-transfer-list-content-item');
      for (const idx of index) {
        (items[ idx ] as HTMLElement).click();
        fixture.detectChanges();
      }
      fixture.detectChanges();
      return this;
    }

    search(direction: 'left' | 'right', value: string): this {
      const ipt = ((direction === 'left' ? this.leftList : this.rightList).querySelector('.ant-transfer-list-search') as HTMLInputElement);
      ipt.value = value;
      ipt.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      return this;
    }

    expectLeft(count: number): this {
      expect(instance.comp.leftDataSource.length).toBe(count);
      return this;
    }

    expectRight(count: number): this {
      expect(instance.comp.rightDataSource.length).toBe(count);
      return this;
    }
  }
});

@Component({
  template     : `
    <nz-transfer #comp
      [nzDataSource]="nzDataSource"
      [nzTitles]="['Source', 'Target']"
      [nzOperations]="['to right', 'to left']"
      [nzItemUnit]="nzItemUnit"
      [nzItemsUnit]="nzItemsUnit"
      [nzListStyle]="nzListStyle"
      [nzShowSearch]="nzShowSearch"
      [nzFilterOption]="nzFilterOption"
      [nzSearchPlaceholder]="nzSearchPlaceholder"
      [nzNotFoundContent]="nzNotFoundContent"
      [nzCanMove]="canMove"
      [nzFooter]="footer"
      (nzSearchChange)="search($event)"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)">
      <ng-template #footer>
        <p id="transfer-footer">footer</p>
      </ng-template>
    </nz-transfer>
  `,
  styleUrls    : [ './style/index.less' ],
  encapsulation: ViewEncapsulation.None
})
class TestTransferComponent implements OnInit {
  @ViewChild('comp') comp: NzTransferComponent;
  nzDataSource: any[] = [];
  nzTitles = [ 'Source', 'Target' ];
  nzOperations = [ 'to right', 'to left' ];
  nzItemUnit = 'item';
  nzItemsUnit = 'items';
  nzListStyle = { 'width.px': 300, 'height.px': 300 };
  nzShowSearch = true;
  nzFilterOption = null;
  nzSearchPlaceholder = '请输入搜索内容';
  nzNotFoundContent = '列表为空';

  canMove(arg: TransferCanMove): Observable<TransferItem[]> {
    // if (arg.direction === 'right' && arg.list.length > 0) arg.list.splice(0, 1);
    // or
    // if (arg.direction === 'right' && arg.list.length > 0) delete arg.list[0];
    return of(arg.list);
  }

  ngOnInit(): void {
    const ret = [];
    for (let i = 0; i < COUNT; i++) {
      ret.push({
        key        : i.toString(),
        title      : `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction  : i >= LEFTCOUNT ? 'right' : '',
        icon       : `frown-o`,
        disabled   : i === 20
      });
    }
    this.nzDataSource = ret;
  }

  search(ret: {}): void {
  }

  select(ret: {}): void {
  }

  change(ret: {}): void {
  }
}

@Component({
  template: `
    <nz-transfer #comp
      nzShowSearch
      [nzRender]="render"
      [nzDataSource]="nzDataSource">
      <ng-template #render let-item>
        <i nz-icon type="{{item.icon}}"></i> {{ item.title }}
      </ng-template>
    </nz-transfer>
  `
})
class TestTransferCustomRenderComponent implements OnInit {
  @ViewChild('comp') comp: NzTransferComponent;
  nzDataSource: any[] = [];

  ngOnInit(): void {
    const ret = [];
    for (let i = 0; i < COUNT; i++) {
      ret.push({
        key        : i.toString(),
        title      : `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction  : i >= LEFTCOUNT ? 'right' : '',
        icon       : `frown-o`
      });
    }
    this.nzDataSource = ret;
  }
}

@Component({
  template: `<nz-transfer [nzDataSource]="list"></nz-transfer>`
})
class Test996Component implements OnInit {
  // tslint:disable-next-line:no-any
  list: any[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      this.list.push({
        key     : i.toString(),
        title   : `content${i + 1}`,
        disabled: i % 3 < 1
      });
    }

    [ 0, 1 ].forEach(idx => this.list[ idx ].direction = 'right');
  }
}
