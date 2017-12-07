// tslint:disable:
import { Component, DebugElement, ViewChild } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzButtonModule } from '../button/nz-button.module';
import { NzTransferModule } from '../ng-zorro-antd.module';
import { TransferItem } from './item';
import { NzTransferComponent } from './nz-transfer.component';

const DEFAULT = `
  <nz-transfer
      [nzDataSource]="list"
      [nzTitles]="['source', 'target']"
      [nzItemUnit]="'项目单数'"
      [nzItemsUnit]="'项目复数'"
      [nzOperations]="['to right', 'to left']"
      [nzListStyle]="{'width.px': 250, 'height.px': 300}"
      [nzShowSearch]="nzShowSearch"
      [nzSearchPlaceholder]="nzSearchPlaceholder"
      [nzNotFoundContent]="nzNotFoundContent"
      [nzFilterOption]="nzFilterOption"
      (nzSearchChange)="search($event)"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)">
  </nz-transfer>
`;

const RENDER = `
  <nz-transfer [nzDataSource]="list">
      <ng-template #render let-item>
        [OK]{{item.title}}-{{item.description}}
      </ng-template>
      <ng-template #footer let-direction>
        <button nz-button (click)="reload(direction)" [nzSize]="'small'" style="float: right; margin: 5px;">reload</button>
      </ng-template>
  </nz-transfer>
`;

const DATA = [];
for (let i = 0; i < 20; i++) {
  DATA.push({
    key: i.toString(),
    title: `content${i + 1}`,
    description: `description of content${i + 1}`,
    direction: i % 2 === 0 ? 'right' : ''
  });
}

function getListItemElemens(el: HTMLElement, count: number = 2, direction: 'left' | 'right' = 'left'): HTMLLIElement[] {
  const find = el.querySelectorAll(`[data-direction="${direction}"] .ant-transfer-list-content-item`);
  const ret: HTMLLIElement[] = [];
  for (let i = 0, len = find.length; i < len; i++) {
    if (count > i) {
      ret.push(find[i] as HTMLLIElement);
    } else {
      break;
    }
  }
  return ret;
}

describe('NzTransferModule', () => {
  let fixture: ComponentFixture<TestTransferComponent>;
  let context: TestTransferComponent;
  let dl: DebugElement;
  let el: HTMLElement;

  function createTestModule(html: string): void {
    TestBed.configureTestingModule({
      declarations: [TestTransferComponent],
      imports: [NzTransferModule, FormsModule, NzButtonModule, NoopAnimationsModule],
      providers: [
          { provide: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
    TestBed.overrideComponent(TestTransferComponent, { set: { template: html } });
    fixture = TestBed.createComponent(TestTransferComponent);
    context = fixture.componentInstance;
    spyOn(context, 'select');
    spyOn(context, 'change');
    spyOn(context, 'search');
    spyOn(context, 'reload');
    spyOn(context, 'nzFilterOption');
    dl = fixture.debugElement;
    el = fixture.nativeElement;
    fixture.detectChanges();
  }

  describe('[default]', () => {
    beforeEach(() => {
      createTestModule(DEFAULT);
    });

    it('should be inited', () => {
      expect(context).not.toBeNull();
      // [nzTitles]="['source', 'target']"
      const titleEl = dl.query(By.css('.ant-transfer-list-header-title'));
      expect(titleEl.nativeElement.textContent).toContain(`source`, `the left title must be [source]`);
      // [nzOperations]="['to right', 'to left']"
      const operationEl = dl.query(By.css('.ant-transfer-operation .ant-btn'));
      expect(operationEl.nativeElement.textContent).toContain(`to left`, `the from right to left button must be [to left]`);
      // [nzListStyle]="{'width.px': 250, 'height.px': 300}"
      const listEl = dl.query(By.css('.ant-transfer-list'));
      expect(listEl.styles.width).toBe(`250px`, `the body width style must be 250px`);
      expect(listEl.styles.height).toBe(`300px`, `the body height style must be 300px`);
      // [nzItemUnit]="'项目单数'"
      // [nzItemsUnit]="'项目复数'"
      const unitEl = dl.query(By.css('.ant-transfer-list-header .ant-transfer-list-header-selected span:first-child'));
      expect(unitEl.nativeElement.textContent).toContain(`项目复数`, `the item unit must be 项目复数`);
    });

    it('should be selected via click', () => {
      (dl.query(By.css('.ant-transfer-list-content-item')).nativeElement as HTMLLIElement).click();
      fixture.detectChanges();
      expect(context.select).toHaveBeenCalled();
    });

    it('should be changed from left to right', () => {
      context.list = [ ...DATA ].map((item, idx) => {
        if (idx <= 3) item.checked = true;
        return item;
      });
      fixture.detectChanges();
      (el.querySelectorAll(`.ant-transfer-operation .ant-btn`)[1] as HTMLButtonElement).click();
      fixture.detectChanges();
      expect(context.change).toHaveBeenCalled();
    });

    it('should be changed from right to left', () => {
      context.list = [ ...DATA ].map((item, idx) => {
        if (idx <= 3) item.checked = true;
        return item;
      });
      fixture.detectChanges();
      (el.querySelectorAll(`.ant-transfer-operation .ant-btn`)[0] as HTMLButtonElement).click();
      fixture.detectChanges();
      expect(context.change).toHaveBeenCalled();
    });

    it('should be inited search', () => {
      // [nzShowSearch]="nzShowSearch"
      context.nzShowSearch = true;
      fixture.detectChanges();
      expect(dl.query(By.css('.ant-transfer-list-search'))).not.toBeNull(`the search element initialization failed`);

      // [nzSearchPlaceholder]="nzSearchPlaceholder"
      const iptEl = dl.query(By.css('.ant-transfer-list-search input'));
      expect(iptEl.nativeElement.getAttribute('placeholder')).toBe(`nzSearchPlaceholder`, `the input placeholder text must be 'nzSearchPlaceholder'`);
      // [nzNotFoundContent]="nzNotFoundContent"
      const notFoundEl = dl.query(By.css('.ant-transfer-list-body-not-found'));
      expect(notFoundEl.nativeElement.textContent).toContain(`nzNotFoundContent`, `the not found text must be nzNotFoundContent`);
    });

  });

  describe('#template', () => {
    beforeEach(() => {
      createTestModule(RENDER);
    });

    it('should be custom render', () => {
      const els = getListItemElemens(el, 1);
      expect(els.length).toBe(1);
      expect(els[0].textContent).toContain(`[OK]`);
    });

    it('should be custom footer', () => {
      const footerEl = dl.query(By.css('.ant-transfer-list-footer button'));
      expect(footerEl).toBeDefined();
      expect(footerEl.nativeElement.textContent).toContain(`reload`);
      footerEl.nativeElement.click();
      fixture.detectChanges();
      expect(context.reload).toHaveBeenCalled();
    });
  });

});

@Component({ template: '' })
class TestTransferComponent {
  @ViewChild(NzTransferComponent) comp: NzTransferComponent;
  list = [ ...DATA ];
  nzShowSearch = false;
  nzSearchPlaceholder = 'nzSearchPlaceholder';
  nzNotFoundContent = 'nzNotFoundContent';
  nzFilterOption(inputValue: string, option: TransferItem): boolean {
    console.log(inputValue, option);
    return option.description.indexOf(inputValue) > -1;
  }

  select(): void { }
  change(): void { }
  search(): void { }
  reload(): void { }
}
