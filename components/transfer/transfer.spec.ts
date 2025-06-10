/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { ApplicationRef, Component, DebugElement, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { NzSafeAny, NzStatus } from 'ng-zorro-antd/core/types';
import { NzFormControlStatusType, NzFormModule } from 'ng-zorro-antd/form';
import en_US from 'ng-zorro-antd/i18n/languages/en_US';
import { NzI18nService } from 'ng-zorro-antd/i18n/nz-i18n.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import {
  NzTransferComponent,
  NzTransferModule,
  TransferCanMove,
  TransferChange,
  TransferDirection,
  TransferItem,
  TransferSearchChange,
  TransferSelectChange
} from 'ng-zorro-antd/transfer';

const COUNT = 21;
const LEFT_COUNT = 2;
const DISABLED = 1;

describe('transfer', () => {
  let fixture: ComponentFixture<TestTransferComponent>;
  let debugElement: DebugElement;
  let instance: TestTransferComponent;
  let pageObject: TransferPageObject<AbstractTestTransferComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideNzIconsTesting(), provideNoopAnimations()] });
    fixture = TestBed.createComponent(TestTransferComponent);
    debugElement = fixture.debugElement;
    instance = debugElement.componentInstance;
    pageObject = new TransferPageObject(fixture);
    fixture.detectChanges();
  });

  describe('[default]', () => {
    it('should be from left to right when via nzTargetKeys property', () => {
      instance.nzTargetKeys = ['0', '1'];
      fixture.detectChanges();

      const leftKeys = instance.comp.leftDataSource.map(e => e.key);
      const rightKeys = instance.comp.rightDataSource.map(e => e.key);

      expect(rightKeys).toContain('0');
      expect(leftKeys).not.toContain('0');

      expect(rightKeys).toContain('1');
      expect(leftKeys).not.toContain('1');
    });

    it('should be from left to right when via nzSelectedKeys property', () => {
      instance.nzSelectedKeys = ['0', '1', '2'];
      fixture.detectChanges();

      expect(
        instance.comp.nzSelectedKeys.every(e => {
          const data = instance.comp.nzDataSource.find(d => d.key === e);
          return !!data?.checked;
        })
      ).toBe(true);
    });

    it('nzOneWay', () => {
      instance.nzOneWay = true;
      fixture.detectChanges();
      expect(!pageObject.rightList.querySelector('.ant-transfer-list-header .ant-transfer-list-checkbox')).toBeTrue();
      expect(debugElement.queryAll(By.css('.ant-transfer-operation .ant-btn')).length).toBe(1);
      expect(
        debugElement.query(By.css('.ant-transfer-operation .ant-btn .anticon')).nativeElement.getAttribute('nztype')
      ).toBe('right');
      expect(
        pageObject.rightList.querySelector('.ant-transfer-list-content-item .ant-transfer-list-content-item-text')
          ?.tagName
      ).toBe('SPAN');
      expect(
        pageObject.rightList.querySelector('.ant-transfer-list-content-item .ant-transfer-list-content-item-remove')
          ?.tagName
      ).toBe('DIV');
    });

    it('should be from left to right', () => {
      pageObject
        .expectLeft(LEFT_COUNT)
        .transfer('right', 0)
        .expectLeft(LEFT_COUNT - 1)
        .expectRight(COUNT - LEFT_COUNT + 1);
    });

    it('should be from right to left', () => {
      pageObject
        .expectRight(COUNT - LEFT_COUNT)
        .transfer('left', [0, 1])
        .expectRight(COUNT - LEFT_COUNT - 2)
        .expectLeft(LEFT_COUNT + 2);
    });

    it('should be from left to right when via search found items', () => {
      pageObject
        .expectLeft(LEFT_COUNT)
        .search('left', '1')
        .transfer('right', 0)
        .expectLeft(LEFT_COUNT - 1)
        .expectRight(COUNT - LEFT_COUNT + 1);
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(0);
    });

    it('should be from right to left when via search found items', () => {
      pageObject
        .expectRight(COUNT - LEFT_COUNT)
        .search('right', '2')
        .transfer('left', [0, 1])
        .expectLeft(LEFT_COUNT + 2)
        .expectRight(COUNT - LEFT_COUNT - 2);
      expect(pageObject.rightList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(DISABLED);
    });

    it('should be forced to display when the original item is hidden', () => {
      pageObject.checkItem('left', 0).search('left', '1');
      pageObject.rightBtn.click();
      fixture.detectChanges();
      expect(instance.comp.rightDataSource.filter(w => !w.hide).length).toBe(COUNT - LEFT_COUNT + 1);
    });

    it('should have correct disable state on moving buttons', () => {
      const transferOperationButtons: DebugElement[] = debugElement.queryAll(
        By.css('.ant-transfer-operation > button')
      );
      const transferToRightButton: HTMLElement = transferOperationButtons[1].nativeNode;
      expect((transferToRightButton as NzSafeAny)['disabled']).toEqual(true);
      pageObject.checkItem('left', 0);
      expect((transferToRightButton as NzSafeAny)['disabled']).toEqual(false);
      pageObject.checkItem('left', 0);
      expect((transferToRightButton as NzSafeAny)['disabled']).toEqual(true);
    });

    it('should be custom filter option', () => {
      instance.nzFilterOption = (inputValue: string, item: NzSafeAny): boolean =>
        item.description.indexOf(inputValue) > -1;
      fixture.detectChanges();
      pageObject.expectLeft(LEFT_COUNT).search('left', 'description of content1');
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
      (pageObject.leftList.querySelector('.ant-transfer-list-search .ant-input-suffix') as HTMLElement).click();
      fixture.detectChanges();
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(LEFT_COUNT);
    });

    it('should be clear search keywords', () => {
      pageObject.expectLeft(LEFT_COUNT).search('left', '1');
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
      (pageObject.leftList.querySelector('.ant-transfer-list-search .ant-input-suffix') as HTMLElement).click();
      fixture.detectChanges();
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(LEFT_COUNT);
    });

    it('should be checkbox is toggle select', () => {
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(1);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is toggle select by blank area', () => {
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0, '.ant-transfer-list-content-item');
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(1);
    });

    it('should be checkbox is disabled toggle select when setting disabled prop', () => {
      instance.nzDataSource = [{ title: `content`, disabled: true }];
      fixture.detectChanges();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('left', 0);
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is toggle select via checkbox all in left', () => {
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
      const btn = pageObject.leftList.querySelector('.ant-transfer-list-header .ant-checkbox') as HTMLElement;
      btn.click();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(LEFT_COUNT);
      btn.click();
      expect(instance.comp.leftDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkbox is toggle select via checkbox all in right', () => {
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(0);
      const btn = pageObject.rightList.querySelector('.ant-transfer-list-header .ant-checkbox') as HTMLElement;
      btn.click();
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(COUNT - LEFT_COUNT - DISABLED);
      btn.click();
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(0);
    });

    it('should be checkboxes are toggle select via shift key', () => {
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(0);
      pageObject.checkItem('right', 0);
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(1);
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));
      expect(instance.comp.isShiftPressed).toBeTrue();
      fixture.detectChanges();
      const multiSelectEndIndex = 9;
      pageObject.checkItem('right', multiSelectEndIndex);
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(
        COUNT - LEFT_COUNT - DISABLED - multiSelectEndIndex + 1
      );
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift' }));
      expect(instance.comp.isShiftPressed).toBeFalse();
    });

    describe('#notFoundContent', () => {
      it('should be the left and right list have data', () => {
        instance.nzDataSource = [{ title: `content0`, direction: 'right' }, { title: `content1` }];
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('nz-embed-empty')).toBeFalsy();
        expect(pageObject.leftList.querySelector('nz-embed-empty')).toBeFalsy();
      });

      it('should be the right list is no data', () => {
        instance.nzDataSource = [{ title: `content0` }, { title: `content1` }];
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('nz-embed-empty')).toBeTruthy();
        expect(pageObject.leftList.querySelector('nz-embed-empty')).toBeFalsy();
      });

      it('should be the left list is no data', () => {
        instance.nzDataSource = [{ title: `content0`, direction: 'right' }];
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('nz-embed-empty')).toBeFalsy();
        expect(pageObject.leftList.querySelector('nz-embed-empty')).toBeTruthy();
      });

      it('should be the left and right list is no data', () => {
        instance.nzDataSource = [];
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('nz-embed-empty')).toBeTruthy();
        expect(pageObject.leftList.querySelector('nz-embed-empty')).toBeTruthy();
      });
    });

    describe('#nzDisabled', () => {
      it('should working', () => {
        instance.nzDisabled = true;
        fixture.detectChanges();
        expect(debugElement.queryAll(By.css('.ant-transfer-disabled')).length).toBe(1);
        // All operation buttons muse be disabled
        expect(debugElement.queryAll(By.css('.ant-transfer-operation .ant-btn[disabled]')).length).toBe(2);
        // All search inputs must be disabled
        expect(debugElement.queryAll(By.css('.ant-input-disabled')).length).toBe(2);
        // All items must be disabled
        expect(debugElement.queryAll(By.css('.ant-transfer-list-content-item-disabled')).length).toBe(COUNT);
        // All checkboxes (include 2 check-all) must be disabled
        expect(debugElement.queryAll(By.css('.ant-checkbox-disabled')).length).toBe(COUNT + 2);
      });

      it('should be disabled clear', () => {
        pageObject.expectLeft(LEFT_COUNT).search('left', '1');
        expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
        instance.nzDisabled = true;
        fixture.detectChanges();
        (pageObject.leftList.querySelector('.ant-transfer-list-search .ant-input-suffix') as HTMLElement).click();
        fixture.detectChanges();
        expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
      });

      it('should be disabled check all when search result is empty', () => {
        pageObject.expectLeft(LEFT_COUNT).search('left', '模拟');
        const selectorPath = '[data-direction="left"] .ant-transfer-list-header .ant-checkbox-disabled';
        expect(pageObject.leftList.querySelectorAll(selectorPath).length).toBe(1);
      });

      it('should be disabled check all when all options are disabled', () => {
        instance.nzDataSource = [{ title: `content`, disabled: true }];
        fixture.detectChanges();
        const cls = '[data-direction="left"] .ant-transfer-list-header .ant-checkbox-disabled';
        expect(debugElement.queryAll(By.css(cls)).length).toBe(1);
      });
    });

    it('#nzShowSelectAll', () => {
      const cls = `[data-direction="left"] .ant-transfer-list-header .ant-checkbox`;
      expect(debugElement.queryAll(By.css(cls)).length).toBe(1);
      instance.nzShowSelectAll = false;
      fixture.detectChanges();
      expect(debugElement.queryAll(By.css(cls)).length).toBe(0);
    });

    it('#nzRenderList', () => {
      instance.nzRenderList = [instance.renderListTpl, instance.renderListTpl];
      fixture.detectChanges();
      expect(debugElement.queryAll(By.css('.ant-transfer-customize-list')).length).toBe(1);
      expect(debugElement.queryAll(By.css('.transfer-renderList')).length).toBe(2);
    });

    it('should be uncheck all when two verification error', () => {
      instance.canMove = (arg: TransferCanMove): Observable<TransferItem[]> =>
        of(arg.list).pipe(
          map(() => {
            throw new Error('error');
          })
        );
      fixture.detectChanges();
      pageObject
        .expectLeft(LEFT_COUNT)
        .transfer('right', [0, 1])
        .expectLeft(LEFT_COUNT)
        .expectRight(COUNT - LEFT_COUNT);
    });

    it('should be custom render item', () => {
      const tempFixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      tempFixture.detectChanges();
      const leftList = tempFixture.debugElement.query(By.css('[data-direction="left"]')).nativeElement as HTMLElement;
      expect(leftList.querySelectorAll('.anticon-frown-o').length).toBe(LEFT_COUNT);
    });

    it('should be custom footer', () => {
      expect(pageObject.leftList.querySelector('#transfer-footer') != null).toBe(true);
    });

    it('#i18n', () => {
      const tempFixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      tempFixture.detectChanges();
      TestBed.inject(NzI18nService).setLocale(en_US);
      tempFixture.detectChanges();
      const searchPhText = (
        tempFixture.debugElement.query(By.css('.ant-transfer-list-search input')).nativeElement as HTMLElement
      ).attributes.getNamedItem('placeholder')!.textContent;
      expect(searchPhText).toBe(en_US.Transfer.searchPlaceholder);
    });

    describe('change detection behavior', () => {
      it('should not trigger change detection when the `ant-transfer-list-content-item label` is clicked', () => {
        const appRef = TestBed.inject(ApplicationRef);
        const event = new MouseEvent('click');

        spyOn(appRef, 'tick');
        spyOn(event, 'stopPropagation').and.callThrough();

        const [label] = fixture.nativeElement.querySelectorAll('.ant-transfer-list-content-item label');

        label.dispatchEvent(event);

        expect(appRef.tick).not.toHaveBeenCalled();
        expect(event.stopPropagation).toHaveBeenCalled();
      });
    });

    // https://github.com/NG-ZORRO/ng-zorro-antd/issues/6667
    it('should uncheck "Select all" checkbox after searched items are moved', () => {
      const { leftList } = pageObject;
      pageObject.search('left', 'content1');
      expect(leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);

      const selectAll = leftList.querySelector<HTMLElement>('.ant-transfer-list-header .ant-checkbox')!;
      selectAll.click();
      fixture.detectChanges();

      pageObject.rightBtn.click();
      fixture.detectChanges();

      expect(selectAll).not.toHaveClass('ant-checkbox-checked');
      expect(selectAll).not.toHaveClass('ant-checkbox-indeterminate');
    });
  });

  describe('#canMove', () => {
    it('default', () => {
      const fixture = TestBed.createComponent(TestTransferCustomRenderComponent);
      pageObject = new TransferPageObject(fixture);
      fixture.detectChanges();
      pageObject
        .expectLeft(LEFT_COUNT)
        .transfer('right', 0)
        .expectLeft(LEFT_COUNT - 1)
        .expectRight(COUNT - LEFT_COUNT + 1);
    });

    it('should be from left to right when two verification', () => {
      instance.canMove = (arg: TransferCanMove): Observable<TransferItem[]> => {
        if (arg.direction === 'right' && arg.list.length > 0) {
          arg.list.splice(0, 1);
        }
        return of(arg.list);
      };
      fixture.detectChanges();
      pageObject
        .expectLeft(LEFT_COUNT)
        .transfer('right', [0, 1])
        .expectLeft(LEFT_COUNT - 1)
        .expectRight(COUNT - LEFT_COUNT + 1);
    });
  });

  describe('#issues', () => {
    let fixture: ComponentFixture<Test996Component>;

    // https://github.com/NG-ZORRO/ng-zorro-antd/issues/996
    it('#996', fakeAsync(() => {
      fixture = TestBed.createComponent(Test996Component);
      pageObject = new TransferPageObject(fixture);
      fixture.detectChanges();
      expect(
        pageObject.getEl('[data-direction="right"] .ant-transfer-list-header .ant-checkbox').classList
      ).not.toContain('ant-checkbox-checked');
      pageObject.checkItem('right', 1);
      tick(50);
      fixture.detectChanges();
      expect(pageObject.getEl('[data-direction="right"] .ant-transfer-list-header .ant-checkbox').classList).toContain(
        'ant-checkbox-checked'
      );
    }));
  });

  describe('RTL', () => {
    let componentElement: HTMLElement;
    let fixture: ComponentFixture<NzTestTransferRtlComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTransferRtlComponent);
      componentElement = fixture.debugElement.query(By.directive(NzTransferComponent)).nativeElement;
      fixture.detectChanges();
    });

    it('should className correct on dir change', fakeAsync(() => {
      expect(componentElement.classList).toContain('ant-transfer-rtl');
      fixture.debugElement.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(componentElement.classList).not.toContain('ant-transfer-rtl');
    }));
  });

  describe('transfer status', () => {
    let fixture: ComponentFixture<NzTestTransferStatusComponent>;
    let componentElement: HTMLElement;
    let testComponent: NzTestTransferStatusComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTransferStatusComponent);
      componentElement = fixture.debugElement.query(By.directive(NzTransferComponent)).nativeElement;
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should className correct with nzStatus', () => {
      fixture.detectChanges();
      expect(componentElement.className).toContain('ant-transfer-status-error');

      testComponent.status = 'warning';
      fixture.detectChanges();
      expect(componentElement.className).toContain('ant-transfer-status-warning');

      testComponent.status = '';
      fixture.detectChanges();
      expect(componentElement.className).not.toContain('ant-transfer-status-warning');
    });
  });

  describe('transfer in form', () => {
    let fixture: ComponentFixture<NzTestTransferInFormComponent>;
    let componentElement: HTMLElement;
    let testComponent: NzTestTransferInFormComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTransferInFormComponent);
      componentElement = fixture.debugElement.query(By.directive(NzTransferComponent)).nativeElement;
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(componentElement.classList).toContain('ant-transfer-status-error');

      testComponent.status = 'warning';
      fixture.detectChanges();
      expect(componentElement.classList).toContain('ant-transfer-status-warning');

      testComponent.status = 'success';
      fixture.detectChanges();
      expect(componentElement.classList).toContain('ant-transfer-status-success');

      testComponent.feedback = false;
      fixture.detectChanges();
      expect(componentElement.classList).not.toContain('ant-transfer-has-feedback');
    });
  });

  class TransferPageObject<T extends AbstractTestTransferComponent> {
    [key: string]: NzSafeAny;

    constructor(public fixture: ComponentFixture<T>) {}

    get debugElement(): DebugElement {
      return this.fixture.debugElement;
    }

    get transferElement(): NzTransferComponent {
      return this.fixture.componentInstance.comp;
    }

    getEl(cls: string): HTMLElement {
      return this.debugElement.query(By.css(cls)).nativeElement as HTMLElement;
    }

    get leftBtn(): HTMLButtonElement {
      return this.debugElement.query(By.css('.ant-transfer-operation .anticon-left'))
        .nativeElement as HTMLButtonElement;
    }

    get rightBtn(): HTMLButtonElement {
      return this.debugElement.query(By.css('.ant-transfer-operation .anticon-right'))
        .nativeElement as HTMLButtonElement;
    }

    get leftList(): HTMLElement {
      return this.debugElement.query(By.css('[data-direction="left"]')).nativeElement as HTMLElement;
    }

    get rightList(): HTMLElement {
      return this.debugElement.query(By.css('[data-direction="right"]')).nativeElement as HTMLElement;
    }

    transfer(direction: TransferDirection, index: number | number[]): this {
      if (!Array.isArray(index)) {
        index = [index];
      }
      this.checkItem(direction === 'left' ? 'right' : 'left', index);
      (direction === 'left' ? this.leftBtn : this.rightBtn).click();
      this.fixture.detectChanges();
      return this;
    }

    checkItem(
      direction: TransferDirection,
      index: number | number[],
      cls: string = '.ant-transfer-list-content-item label'
    ): this {
      if (!Array.isArray(index)) {
        index = [index];
      }
      const items = (direction === 'left' ? this.leftList : this.rightList).querySelectorAll(cls);
      for (const idx of index) {
        (items[idx] as HTMLElement).click();
        this.fixture.detectChanges();
      }
      this.fixture.detectChanges();
      return this;
    }

    search(direction: TransferDirection, value: string): this {
      // .ant-transfer-list-search has been moved to the host
      const ipt = (direction === 'left' ? this.leftList : this.rightList).querySelector(
        '.ant-transfer-list-search input'
      ) as HTMLInputElement;
      ipt.value = value;
      ipt.dispatchEvent(new Event('input'));
      this.fixture.detectChanges();
      return this;
    }

    expectLeft(count: number): this {
      expect(this.transferElement.leftDataSource.length).toBe(count);
      return this;
    }

    expectRight(count: number): this {
      expect(this.transferElement.rightDataSource.length).toBe(count);
      return this;
    }
  }
});

interface AbstractTestTransferComponent {
  comp: NzTransferComponent;
}

@Component({
  imports: [NzTransferModule],
  selector: 'nz-test-transfer',
  template: `
    <nz-transfer
      #comp
      [nzDataSource]="nzDataSource"
      [nzRenderList]="nzRenderList"
      [nzShowSelectAll]="nzShowSelectAll"
      [nzDisabled]="nzDisabled"
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
      [nzTargetKeys]="nzTargetKeys"
      [nzOneWay]="nzOneWay"
      (nzSearchChange)="search($event)"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
    ></nz-transfer>
    <ng-template #renderList>
      <p class="transfer-renderList">renderList</p>
    </ng-template>
    <ng-template #footer>
      <p id="transfer-footer">footer</p>
    </ng-template>
  `
})
class TestTransferComponent implements OnInit, AbstractTestTransferComponent {
  @ViewChild('comp', { static: false }) comp!: NzTransferComponent;
  @ViewChild('renderList', { static: false }) renderListTpl!: TemplateRef<void>;
  nzDataSource: NzSafeAny[] = [];
  nzRenderList: Array<TemplateRef<void> | null> = [null, null];
  nzDisabled = false;
  nzShowSelectAll = true;
  nzSelectedKeys = ['0', '1', '2'];
  nzTargetKeys: string[] = [];
  nzItemUnit = 'item';
  nzItemsUnit = 'items';
  nzListStyle = { 'width.px': 300, 'height.px': 300 };
  nzShowSearch = true;
  nzFilterOption?: (inputValue: string, item: NzSafeAny) => boolean;
  nzSearchPlaceholder = '请输入搜索内容';
  nzNotFoundContent = '列表为空';
  nzOneWay = false;

  canMove(arg: TransferCanMove): Observable<TransferItem[]> {
    // if (arg.direction === 'right' && arg.list.length > 0) arg.list.splice(0, 1);
    // or
    // if (arg.direction === 'right' && arg.list.length > 0) delete arg.list[0];
    return of(arg.list);
  }

  ngOnInit(): void {
    const ret: Array<{
      key: string;
      title: string;
      description: string;
      direction: TransferDirection;
      icon: string;
      disabled: boolean;
    }> = [];
    for (let i = 0; i < COUNT; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: i >= LEFT_COUNT ? 'right' : 'left',
        icon: `frown-o`,
        disabled: i === 20
      });
    }
    this.nzDataSource = ret;
  }

  search(_: TransferSearchChange): void {}

  select(_: TransferSelectChange): void {}

  change(_: TransferChange): void {}
}

@Component({
  imports: [NzIconModule, NzTransferModule],
  template: `
    <nz-transfer #comp nzShowSearch [nzRender]="render" [nzDataSource]="nzDataSource">
      <ng-template #render let-item>
        <nz-icon nzType="{{ item.icon }}" />
        {{ item.title }}
      </ng-template>
    </nz-transfer>
  `
})
class TestTransferCustomRenderComponent implements OnInit, AbstractTestTransferComponent {
  @ViewChild('comp', { static: false }) comp!: NzTransferComponent;
  nzDataSource: Array<{ key: string; title: string; description: string; direction: TransferDirection; icon: string }> =
    [];

  ngOnInit(): void {
    const ret: Array<{ key: string; title: string; description: string; direction: TransferDirection; icon: string }> =
      [];
    for (let i = 0; i < COUNT; i++) {
      ret.push({
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        direction: i >= LEFT_COUNT ? 'right' : 'left',
        icon: `frown-o`
      });
    }
    this.nzDataSource = ret;
  }
}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/996
@Component({
  imports: [NzTransferModule],
  template: `<nz-transfer [nzDataSource]="list"></nz-transfer>`
})
class Test996Component implements OnInit {
  @ViewChild(NzTransferComponent, { static: true }) comp!: NzTransferComponent;
  list: NzSafeAny[] = [];

  ngOnInit(): void {
    for (let i = 0; i < 2; i++) {
      this.list.push({ key: i.toString(), title: `content${i + 1}`, disabled: i % 3 < 1 });
    }

    [0, 1].forEach(idx => (this.list[idx].direction = 'right'));
  }
}

@Component({
  imports: [BidiModule, TestTransferComponent],
  template: `
    <div [dir]="direction">
      <nz-test-transfer></nz-test-transfer>
    </div>
  `
})
export class NzTestTransferRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}

@Component({
  imports: [NzTransferModule],
  template: `<nz-transfer [nzDataSource]="[]" [nzStatus]="status"></nz-transfer>`
})
export class NzTestTransferStatusComponent {
  status: NzStatus = 'error';
}

@Component({
  imports: [NzFormModule, NzTransferModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback" [nzValidateStatus]="status">
          <nz-transfer [nzDataSource]="[]"></nz-transfer>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestTransferInFormComponent {
  status: NzFormControlStatusType = 'error';
  feedback = true;
}
