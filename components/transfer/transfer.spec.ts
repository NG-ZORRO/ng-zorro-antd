/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, DebugElement, OnInit, TemplateRef, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { testDirectionality, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
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
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNzNoAnimation()]
    });
    fixture = TestBed.createComponent(TestTransferComponent);
    debugElement = fixture.debugElement;
    instance = debugElement.componentInstance;
    pageObject = new TransferPageObject(fixture);
    fixture.detectChanges();
  });

  describe('[default]', () => {
    it('should be from left to right when via nzTargetKeys property', () => {
      instance.nzTargetKeys.set(['0', '1']);
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
        instance.comp.nzSelectedKeys.every(e => !!instance.comp.nzDataSource.find(d => d.key === e)?.checked)
      ).toBe(true);
    });

    it('nzOneWay', () => {
      instance.nzOneWay.set(true);
      fixture.detectChanges();
      expect(!pageObject.rightList.querySelector('.ant-transfer-list-header .ant-transfer-list-checkbox')).toBe(true);
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
      instance.nzFilterOption.set(
        (inputValue: string, item: NzSafeAny): boolean => item.description.indexOf(inputValue) > -1
      );
      fixture.detectChanges();
      pageObject.expectLeft(LEFT_COUNT).search('left', 'description of content1');
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
      (pageObject.leftList.querySelector('.ant-transfer-list-search .ant-input-clear-icon') as HTMLElement).click();
      fixture.detectChanges();
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(LEFT_COUNT);
    });

    it('should be clear search keywords', () => {
      pageObject.expectLeft(LEFT_COUNT).search('left', '1');
      expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
      (pageObject.leftList.querySelector('.ant-transfer-list-search .ant-input-clear-icon') as HTMLElement).click();
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
      instance.nzDataSource.set([{ title: `content`, disabled: true }]);
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
      expect(instance.comp.isShiftPressed).toBe(true);
      fixture.detectChanges();
      const multiSelectEndIndex = 9;
      pageObject.checkItem('right', multiSelectEndIndex);
      expect(instance.comp.rightDataSource.filter(w => w.checked).length).toBe(
        COUNT - LEFT_COUNT - DISABLED - multiSelectEndIndex + 1
      );
      window.dispatchEvent(new KeyboardEvent('keyup', { key: 'Shift' }));
      expect(instance.comp.isShiftPressed).toBe(false);
    });

    describe('#notFoundContent', () => {
      it('should be the left and right list have data', () => {
        instance.nzDataSource.set([{ title: `content0`, direction: 'right' }, { title: `content1` }]);
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('nz-embed-empty')).toBeFalsy();
        expect(pageObject.leftList.querySelector('nz-embed-empty')).toBeFalsy();
      });

      it('should be the right list is no data', () => {
        instance.nzDataSource.set([{ title: `content0` }, { title: `content1` }]);
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('nz-embed-empty')).toBeTruthy();
        expect(pageObject.leftList.querySelector('nz-embed-empty')).toBeFalsy();
      });

      it('should be the left list is no data', () => {
        instance.nzDataSource.set([{ title: `content0`, direction: 'right' }]);
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('nz-embed-empty')).toBeFalsy();
        expect(pageObject.leftList.querySelector('nz-embed-empty')).toBeTruthy();
      });

      it('should be the left and right list is no data', () => {
        instance.nzDataSource.set([]);
        fixture.detectChanges();
        expect(pageObject.rightList.querySelector('nz-embed-empty')).toBeTruthy();
        expect(pageObject.leftList.querySelector('nz-embed-empty')).toBeTruthy();
      });
    });

    describe('#nzDisabled', () => {
      it('should work', async () => {
        instance.nzDisabled.set(true);
        fixture.autoDetectChanges();
        await fixture.whenStable();
        expect(debugElement.queryAll(By.css('.ant-transfer-disabled')).length).toBe(1);
        // All operation buttons muse be disabled
        expect(debugElement.queryAll(By.css('.ant-transfer-operation .ant-btn[disabled]')).length).toBe(2);
        // All search inputs must be disabled
        expect(debugElement.queryAll(By.css('.ant-transfer-list-search input[disabled]')).length).toBe(2);
        // All items must be disabled
        expect(debugElement.queryAll(By.css('.ant-transfer-list-content-item-disabled')).length).toBe(COUNT);
        // All checkboxes (include 2 check-all) must be disabled
        expect(debugElement.queryAll(By.css('.ant-checkbox-disabled')).length).toBe(COUNT + 2);
      });

      it('should be disabled clear', async () => {
        pageObject.expectLeft(LEFT_COUNT).search('left', '1');
        expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
        instance.nzDisabled.set(true);
        // The search box clear icon visibility is debounced by the input-affix
        // control, so wait for that small async update before clicking it.
        await updateNonSignalsInput(fixture, 50);
        const clearBtn = pageObject.leftList.querySelector(
          '.ant-transfer-list-search .ant-input-clear-icon:not(.ant-input-clear-icon-hidden)'
        ) as HTMLElement | null;
        clearBtn?.click();
        await updateNonSignalsInput(fixture, 50);
        expect(pageObject.leftList.querySelectorAll('.ant-transfer-list-content-item').length).toBe(1);
      });

      it('should be disabled check all when search result is empty', () => {
        pageObject.expectLeft(LEFT_COUNT).search('left', '模拟');
        const selectorPath = '[data-direction="left"] .ant-transfer-list-header .ant-checkbox-disabled';
        expect(pageObject.leftList.querySelectorAll(selectorPath).length).toBe(1);
      });

      it('should be disabled check all when all options are disabled', () => {
        instance.nzDataSource.set([{ title: `content`, disabled: true }]);
        fixture.detectChanges();
        const cls = '[data-direction="left"] .ant-transfer-list-header .ant-checkbox-disabled';
        expect(debugElement.queryAll(By.css(cls)).length).toBe(1);
      });
    });

    it('#nzShowSelectAll', () => {
      const cls = `[data-direction="left"] .ant-transfer-list-header .ant-checkbox`;
      expect(debugElement.queryAll(By.css(cls)).length).toBe(1);
      instance.nzShowSelectAll.set(false);
      fixture.detectChanges();
      expect(debugElement.queryAll(By.css(cls)).length).toBe(0);
    });

    it('#nzRenderList', () => {
      instance.nzRenderList.set([instance.renderListTpl, instance.renderListTpl]);
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

        vi.spyOn(appRef, 'tick');
        vi.spyOn(event, 'stopPropagation');

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

      expect(selectAll.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(selectAll.classList.contains('ant-checkbox-indeterminate')).toBe(false);
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
    it('#996', async () => {
      fixture = TestBed.createComponent(Test996Component);
      pageObject = new TransferPageObject(fixture);
      fixture.detectChanges();
      const checkbox = pageObject.getEl('[data-direction="right"] .ant-transfer-list-header .ant-checkbox');
      expect(checkbox.classList).not.toContain('ant-checkbox-checked');
      pageObject.checkItem('right', 1);
      await fixture.whenStable();
      expect(checkbox.classList).toContain('ant-checkbox-checked');
    });
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

      testComponent.status.set('warning');
      fixture.detectChanges();
      expect(componentElement.className).toContain('ant-transfer-status-warning');

      testComponent.status.set('');
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

      testComponent.status.set('warning');
      fixture.detectChanges();
      expect(componentElement.classList).toContain('ant-transfer-status-warning');

      testComponent.status.set('success');
      fixture.detectChanges();
      expect(componentElement.classList).toContain('ant-transfer-status-success');

      testComponent.feedback.set(false);
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

testDirectionality(() => TestTransferComponent, By.directive(NzTransferComponent), 'ant-transfer', {
  providers: [provideNzIconsTesting(), provideNzNoAnimation()]
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
      [nzDataSource]="nzDataSource()"
      [nzRenderList]="nzRenderList()"
      [nzShowSelectAll]="nzShowSelectAll()"
      [nzDisabled]="nzDisabled()"
      [nzTitles]="['Source', 'Target']"
      [nzOperations]="['to right', 'to left']"
      [nzItemUnit]="nzItemUnit"
      [nzItemsUnit]="nzItemsUnit"
      [nzListStyle]="nzListStyle"
      [nzShowSearch]="nzShowSearch"
      [nzFilterOption]="nzFilterOption()"
      [nzSearchPlaceholder]="nzSearchPlaceholder"
      [nzNotFoundContent]="nzNotFoundContent"
      [nzCanMove]="canMove"
      [nzFooter]="footer"
      [nzTargetKeys]="nzTargetKeys()"
      [nzOneWay]="nzOneWay()"
      (nzSearchChange)="search($event)"
      (nzSelectChange)="select($event)"
      (nzChange)="change($event)"
    />
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
  readonly nzDataSource = signal<NzSafeAny[]>([]);
  readonly nzRenderList = signal<Array<TemplateRef<void> | null>>([null, null]);
  readonly nzDisabled = signal(false);
  readonly nzShowSelectAll = signal(true);
  nzSelectedKeys = ['0', '1', '2'];
  readonly nzTargetKeys = signal<string[]>([]);
  nzItemUnit = 'item';
  nzItemsUnit = 'items';
  nzListStyle = { 'width.px': 300, 'height.px': 300 };
  nzShowSearch = true;
  readonly nzFilterOption = signal<((inputValue: string, item: NzSafeAny) => boolean) | undefined>(undefined);
  nzSearchPlaceholder = '请输入搜索内容';
  nzNotFoundContent = '列表为空';
  readonly nzOneWay = signal(false);

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
    this.nzDataSource.set(ret);
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
  template: `<nz-transfer [nzDataSource]="list" />`
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
  imports: [NzTransferModule],
  template: `<nz-transfer [nzDataSource]="[]" [nzStatus]="status()" />`
})
export class NzTestTransferStatusComponent {
  readonly status = signal<NzStatus>('error');
}

@Component({
  imports: [NzFormModule, NzTransferModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback()" [nzValidateStatus]="status()">
          <nz-transfer [nzDataSource]="[]" />
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestTransferInFormComponent {
  readonly status = signal<NzFormControlStatusType>('error');
  readonly feedback = signal(true);
}
