/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ApplicationRef, Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchMouseEvent, dispatchTouchEvent, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzFormatEmitEvent, NzTreeNode, NzTreeNodeOptions } from 'ng-zorro-antd/core/tree';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzTreeComponent } from './tree.component';
import { NzTreeModule } from './tree.module';

describe('tree', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNzNoAnimation()]
    });
  });

  describe('controlled', () => {
    let fixture: ComponentFixture<NzTestTreeBasicControlledComponent>;
    let component: NzTestTreeBasicControlledComponent;
    let nativeElement: Element;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeBasicControlledComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.debugElement.nativeElement;
      fixture.detectChanges();
    });

    describe('basic tree under default value', () => {
      it('basic initial data', () => {
        const shownNodes = nativeElement.querySelectorAll('nz-tree-node[builtin]');
        const enableCheckbox = nativeElement.querySelectorAll('.ant-tree-checkbox');
        expect(shownNodes.length).toEqual(3);
        expect(enableCheckbox.length).toEqual(3);
      });

      it('should initialize properly', () => {
        const shownNodes = nativeElement.querySelectorAll('nz-tree-node[builtin]');
        const enableCheckbox = nativeElement.querySelectorAll('.ant-tree-checkbox');
        expect(shownNodes.length).toEqual(3);
        expect(enableCheckbox.length).toEqual(3);
      });

      it('should expand the specified node based on nzExpandedKeys', async () => {
        component.defaultExpandedKeys.set(['0-1']);
        fixture.detectChanges();
        const shownNodes = nativeElement.querySelectorAll('nz-tree-node[builtin]');
        expect(shownNodes.length).toEqual(4);
        await stabilize(fixture, 300);
        // leaf node should not be included
        expect(component.treeComponent.getExpandedNodeList().length).toEqual(1);
      });

      it('should expand all nodes while setting nzExpandAll', async () => {
        component.expandAll.set(true);
        fixture.detectChanges();
        const shownNodes = nativeElement.querySelectorAll('nz-tree-node[builtin]');
        expect(shownNodes.length).toEqual(7);
        await stabilize(fixture, 300);
        // leaf node should not be included
        expect(component.treeComponent.getExpandedNodeList().length).toEqual(4);
      });

      it('should render checkbox state of nodes based on nzCheckedKeys', async () => {
        component.expandAll.set(true); // Just for testing the selected state
        component.defaultCheckedKeys.set(['0-0-0', '0-0-1']);
        fixture.detectChanges();
        const checkedNodes = nativeElement.querySelectorAll('.ant-tree-checkbox-checked');
        const halfCheckedNodes = nativeElement.querySelectorAll('.ant-tree-checkbox-indeterminate');
        expect(checkedNodes.length).toEqual(2);
        expect(halfCheckedNodes.length).toEqual(1);
        await stabilize(fixture, 300);
        expect(component.treeComponent.getCheckedNodeList().length).toEqual(2);
        expect(component.treeComponent.getHalfCheckedNodeList().length).toEqual(1);
      });

      it('node check should not affect other nodes based on nzCheckStrictly', async () => {
        component.expandAll.set(true);
        component.checkStrictly.set(true);
        component.defaultCheckedKeys.set(['0-0-0', '0-0-1']);
        fixture.detectChanges();
        const checkedNodes = nativeElement.querySelectorAll('.ant-tree-checkbox-checked');
        const halfCheckedNodes = nativeElement.querySelectorAll('.ant-tree-checkbox-indeterminate');
        expect(checkedNodes.length).toEqual(2);
        expect(halfCheckedNodes.length).toEqual(0);
        await stabilize(fixture, 300);
        expect(component.treeComponent.getCheckedNodeList().length).toEqual(2);
        expect(component.treeComponent.getHalfCheckedNodeList().length).toEqual(0);
      });

      it('should select nodes based on nzSelectedKeys', async () => {
        component.defaultSelectedKeys.set(['0-0', '0-1']);
        fixture.detectChanges();
        // nzMultiple is true
        const selectedNodes = nativeElement.querySelectorAll('.ant-tree-node-selected');
        expect(selectedNodes.length).toEqual(2);
        await stabilize(fixture, 300);
        expect(component.treeComponent.getSelectedNodeList().length).toEqual(2);
      });

      it('should select only one nodes based on nzMultiple:false', async () => {
        component.multiple.set(false);
        component.defaultSelectedKeys.set(['0-0', '0-1']);
        fixture.detectChanges();
        // nzMultiple is false
        const selectedNodes = nativeElement.querySelectorAll('.ant-tree-node-selected');
        expect(selectedNodes.length).toEqual(1);
        await stabilize(fixture, 300);
        expect(component.treeComponent.getSelectedNodeList().length).toEqual(1);
      });

      it('should match nodes based on nzSearchValue', async () => {
        component.searchValue.set('0-0-1');
        fixture.detectChanges();
        // will expand 0-0 only
        const expandedNodes = nativeElement.querySelectorAll('.ant-tree-switcher_open');
        const matchedNodes = nativeElement.querySelectorAll('.font-highlight');
        expect(expandedNodes.length).toEqual(1);
        expect(matchedNodes.length).toEqual(1);
        await stabilize(fixture, 300);
        expect(component.treeComponent.getMatchedNodeList().length).toEqual(1);
      });

      [
        {
          title:
            "should display 7 nodes when hideUnMatched=false and virtualHeight = undefined and nzSearchValue = '0-1'",
          when: { hideUnMatched: false, searchValue: '0-1' },
          then: { matchedNodeList: 3, nzFlattenNodes: 7 }
        },
        {
          title:
            "should display 7 nodes when hideUnMatched=false and virtualHeight = '300px' and nzSearchValue = '0-1'",
          when: { hideUnMatched: false, virtualHeight: '300px', searchValue: '0-1' },
          then: { matchedNodeList: 3, nzFlattenNodes: 7 }
        },
        {
          title:
            "'should display 7 nodes when hideUnMatched=true and virtualHeight = undefined and nzSearchValue = '0-1'",
          when: { hideUnMatched: true, searchValue: '0-1' },
          then: { matchedNodeList: 3, nzFlattenNodes: 7 }
        },
        {
          title:
            "should display 4 matched nodes based on nzSearchValue when hideUnMatched=true and virtualHeight = '300px' and nzSearchValue = undefined",
          when: { hideUnMatched: true, virtualHeight: '300px' },
          then: { matchedNodeList: 0, nzFlattenNodes: 3 }
        },
        {
          title:
            "should display 4 matched nodes based on nzSearchValue when hideUnMatched=true and virtualHeight = '300px' and nzSearchValue = ''",
          when: { hideUnMatched: true, virtualHeight: '300px', searchValue: '' },
          then: { matchedNodeList: 0, nzFlattenNodes: 3 }
        },
        {
          title:
            "should display 4 matched nodes based on nzSearchValue when hideUnMatched=true and virtualHeight = '300px' and nzSearchValue = '0-1'",
          when: { hideUnMatched: true, virtualHeight: '300px', searchValue: '0-1' },
          then: { matchedNodeList: 3, nzFlattenNodes: 4 }
        }
      ].forEach(({ title, when, then }) => {
        it(title, async () => {
          // Given
          component.searchValue.set(when.searchValue ?? '');
          component.virtualHeight.set(when.virtualHeight ?? null);
          component.hideUnMatched.set(when.hideUnMatched);
          // When
          fixture.detectChanges();
          await stabilize(fixture, 300);
          // Then
          expect(component.treeComponent.getMatchedNodeList().length)
            .withContext('treeComponent.getMatchedNodeList().length')
            .toBe(then.matchedNodeList);
          expect(component.treeComponent.nzFlattenNodes.length)
            .withContext('treeComponent.nzFlattenNodes.length')
            .toBe(then.nzFlattenNodes);
          expect(nativeElement.querySelectorAll('nz-tree-node').length)
            .withContext('number of displayed nz-tree-node elements')
            .toBe(then.nzFlattenNodes);
        });
      });

      it('should match nodes based on nzSearchFunc', async () => {
        component.searchFunc.set((data: NzTreeNodeOptions): boolean => data.title === component.searchValue());
        component.searchValue.set('0-0');
        fixture.detectChanges();
        let expandedNodes = nativeElement.querySelectorAll('.ant-tree-switcher_open');
        let matchedNodes = nativeElement.querySelectorAll('.font-highlight');
        expect(expandedNodes.length).toEqual(0);
        expect(matchedNodes.length).toEqual(1);
        await stabilize(fixture, 300);
        expect(component.treeComponent.getMatchedNodeList().length).toEqual(1);

        component.searchValue.set('0-0-');
        fixture.detectChanges();
        expandedNodes = nativeElement.querySelectorAll('.ant-tree-switcher_open');
        matchedNodes = nativeElement.querySelectorAll('.font-highlight');
        expect(expandedNodes.length).toEqual(0);
        expect(matchedNodes.length).toEqual(0);
      });

      it('should keep parent expanded state of matched nodes based on nzHideUnMatched', async () => {
        component.hideUnMatched.set(true);
        fixture.detectChanges();
        component.searchValue.set('0-0-1');
        fixture.detectChanges();
        // will expand 0-0 but not matched
        const node = nativeElement.querySelector('.ant-tree-switcher')!;
        dispatchMouseEvent(node, 'click');
        fixture.detectChanges();
        await stabilize(fixture);
        // 0-1 0-2 hidden, others are not shown because not expanded
        const hiddenNodes = nativeElement.querySelectorAll('nz-tree-node[builtin][style*="display: none;"]');
        expect(hiddenNodes.length).toEqual(2);
      });

      describe('change detection behavior', () => {
        it('should not run change detection when the `nz-tree-node` is clicked', () => {
          component.selectMode.set(true);
          fixture.detectChanges();

          const appRef = TestBed.inject(ApplicationRef);
          const event = new MouseEvent('mousedown');

          vi.spyOn(appRef, 'tick');
          vi.spyOn(event, 'preventDefault');

          const treeNode = nativeElement.querySelector('nz-tree-node')!;
          treeNode.dispatchEvent(event);

          expect(appRef.tick).not.toHaveBeenCalled();
          expect(event.preventDefault).toHaveBeenCalled();
        });
      });
    });

    describe('basic style of tree', () => {
      it('should render tree with line based on nzShowLine', () => {
        component.showLine.set(true);
        fixture.detectChanges();
        const lineTreeIcon = nativeElement.querySelectorAll('.anticon-plus-square');
        expect(lineTreeIcon.length).toEqual(2); // one is leaf node
      });

      it('should show custom icon based on nzExpandedIcon', () => {
        const button = nativeElement.querySelector('button')!;
        button.click();
        fixture.detectChanges();

        const customIconElement = nativeElement.querySelectorAll('.ant-tree-switcher .anticon-smile');
        // shown nodes are same with `basic initial data`
        expect(customIconElement.length).toEqual(2);
      });

      it('should not trigger checkbox if node is disabled ', () => {
        const spy = vi.spyOn(component, 'nzEvent');
        component.nodes.set([
          {
            title: '0-0',
            key: '0-0',
            disableCheckbox: true,
            disabled: true
          }
        ]);
        fixture.detectChanges();
        const node = nativeElement.querySelector('.ant-tree-checkbox') as HTMLElement;
        dispatchMouseEvent(node, 'click');
        expect(spy).not.toHaveBeenCalled();
      });

      it('should should custom icon', () => {
        component.nodes.set([
          {
            title: '0-0',
            key: '0-0',
            icon: 'smile'
          }
        ]);
        fixture.detectChanges();
        const node = nativeElement.querySelector('.ant-tree-icon__customize .anticon-smile') as HTMLElement;
        expect(node).toBeDefined();
      });

      it('should should show loading icon', () => {
        component.nodes.set([
          {
            title: '0-0',
            key: '0-0'
          }
        ]);
        component.asyncData.set(true);
        fixture.detectChanges();
        const targetNode = nativeElement.querySelector('.ant-tree-switcher') as HTMLElement;
        dispatchMouseEvent(targetNode, 'click');
        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(1);
        expect(component.treeComponent.getExpandedNodeList().length).toEqual(1);

        component.treeComponent.getExpandedNodeList()[0].addChildren([
          {
            title: 'Child Node',
            key: `0-0`
          }
        ]);
        fixture.detectChanges();
        expect(nativeElement.querySelectorAll('.ant-tree-treenode-loading').length).toEqual(0);
        expect(fixture.componentInstance.treeComponent.getExpandedNodeList().length).toEqual(1);
      });
    });

    describe('mouse event trigger', () => {
      it('should select node when clicking', async () => {
        const spy = vi.spyOn(component, 'nzEvent');
        expect(spy).not.toHaveBeenCalled();

        // get first node 0-0
        const node = nativeElement.querySelector('.ant-tree-node-content-wrapper')!;
        dispatchMouseEvent(node, 'click');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(nativeElement.querySelector('.ant-tree-node-content-wrapper.ant-tree-node-selected')).toBeDefined();
        await stabilize(fixture, 300);
        expect(component.treeComponent.getSelectedNodeList().length).toEqual(1);
      });

      it('should expand node when clicking switcher', async () => {
        const spy = vi.spyOn(component, 'nzEvent');
        // get first node 0-0
        const node = nativeElement.querySelector('.ant-tree-switcher')!;
        dispatchMouseEvent(node, 'click');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(nativeElement.querySelector('.ant-tree-switcher.ant-tree-switcher_open')).toBeDefined();
        await stabilize(fixture, 300);
        expect(component.treeComponent.getExpandedNodeList().length).toEqual(1);
      });

      it('should check node when clicking checkbox', async () => {
        const spy = vi.spyOn(component, 'nzEvent');
        // get first node 0-0
        const node = nativeElement.querySelector('.ant-tree-checkbox')!;
        dispatchMouseEvent(node, 'click');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
        expect(nativeElement.querySelector('.ant-tree-checkbox.ant-tree-checkbox-checked')).toBeDefined();
        await stabilize(fixture, 300);
        expect(component.treeComponent.getCheckedNodeList().length).toEqual(1);
      });

      it('should trigger contextmenu event', async () => {
        const spy = vi.spyOn(component, 'nzEvent');
        // get first node 0-0
        const node = nativeElement.querySelector('.ant-tree-node-content-wrapper')!;
        dispatchMouseEvent(node, 'contextmenu');
        fixture.detectChanges();
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should trigger dblclick event', async () => {
        const spy = vi.spyOn(component, 'nzEvent');
        // get first node 0-0
        const node = nativeElement.querySelector('.ant-tree-node-content-wrapper')!;
        dispatchMouseEvent(node, 'dblclick');
        fixture.detectChanges();
        // Maybe needs to change
        // In actual user behavior, click event may be triggered twice
        expect(spy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('dnd', () => {
    let fixture: ComponentFixture<NzTestTreeDraggableComponent>;
    let component: NzTestTreeDraggableComponent;
    let nativeElement: Element;

    let dragStartSpy: ReturnType<typeof vi.spyOn>;
    let dragEnterSpy: ReturnType<typeof vi.spyOn>;
    let dragOverSpy: ReturnType<typeof vi.spyOn>;
    let dragLeaveSpy: ReturnType<typeof vi.spyOn>;
    let dropSpy: ReturnType<typeof vi.spyOn>;
    let dragEndSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeDraggableComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.debugElement.nativeElement;

      dragStartSpy = vi.spyOn(component, 'onDragStart');
      dragEnterSpy = vi.spyOn(component, 'onDragEnter');
      dragOverSpy = vi.spyOn(component, 'onDragOver');
      dragLeaveSpy = vi.spyOn(component, 'onDragLeave');
      dropSpy = vi.spyOn(component, 'onDrop');
      dragEndSpy = vi.spyOn(component, 'onDragEnd');
      fixture.detectChanges();
    });

    describe('drag event trigger', () => {
      it('should trigger dragstart event', async () => {
        // dragstart needs to collapse expanded node
        component.defaultExpandedKeys.set(['0-1']);
        fixture.detectChanges();
        let expandedNodes = nativeElement.querySelectorAll('.ant-tree-switcher_open');
        expect(expandedNodes.length).toEqual(1);
        const dragNode = nativeElement.querySelector("[title='0-1']") as HTMLElement;
        dispatchMouseEvent(dragNode, 'dragstart');
        fixture.detectChanges();
        expandedNodes = nativeElement.querySelectorAll('.ant-tree-switcher_open');
        expect(expandedNodes.length).toEqual(0);
      });

      // fixture.detectChanges() will stop event
      it('should trigger drag event', async () => {
        const dragNode = nativeElement.querySelector("[title='0-2']") as HTMLElement;
        const dropNode = nativeElement.querySelector("[title='0-0']") as HTMLElement;
        const passedNode = nativeElement.querySelector("[title='0-1']") as HTMLElement;
        //  ============ dragstart ==============
        dispatchMouseEvent(dragNode, 'dragstart');
        fixture.detectChanges();
        expect(dragStartSpy).toHaveBeenCalledTimes(1);
        let shownNodes = nativeElement.querySelectorAll('nz-tree-node[builtin]');
        expect(shownNodes.length).toEqual(3);

        //  ============ dragenter ==============
        // DragNode enters one node, if it is not expanded, should expand it(0-1) and render tree again
        // Do not do `fixture.detectChanges()` after dragenter, because it will stop dragover
        dispatchMouseEvent(passedNode, 'dragenter');
        dispatchMouseEvent(passedNode, 'dragover');

        // ======= enter check, expand passing nodes ========
        expect(dragEnterSpy).toHaveBeenCalledTimes(1);
        expect(dragOverSpy).toHaveBeenCalledTimes(1);

        //  ============ dragleave ==============
        dispatchMouseEvent(passedNode, 'dragleave');
        expect(dragLeaveSpy).toHaveBeenCalledTimes(1);

        //  ============ drop ==============
        // drop 0-2 to 0-0
        dispatchMouseEvent(dropNode, 'dragenter');
        dispatchMouseEvent(dropNode, 'drop');
        dispatchMouseEvent(dropNode, 'dragend');

        expect(dropSpy).toHaveBeenCalledTimes(1);
        expect(dragEndSpy).toHaveBeenCalledTimes(1);
        fixture.detectChanges();

        // dragenter expands 0-1/0-1
        shownNodes = nativeElement.querySelectorAll('nz-tree-node[builtin]');
        expect(shownNodes.length).toEqual(7);
      });

      xit('should trigger drag over event', async () => {
        //  ============ over with different position in next test ==============
        /**
         * nzTreeService#calcDropPosition
         * if (clientY <= top + des) {
         *   return -1;
         * } else if (clientY >= bottom - des) {
         *   return 1;
         * }
         * return 0;
         */

        let elementNode;
        const dragNode = nativeElement.querySelector("[title='0-2']") as HTMLElement; // sixth node
        const passedNode = nativeElement.querySelector("[title='0-1']") as HTMLElement; // fifth node
        //  ============ dragstart ==============
        dispatchMouseEvent(dragNode, 'dragstart');
        fixture.detectChanges();
        let shownNodes = nativeElement.querySelectorAll('nz-tree-node[builtin]');
        expect(shownNodes.length).toEqual(3);

        //  ============ dragenter ==============
        // DragNode enters one node, if it is not expanded, should expand it(0-1) and render tree again
        // Do not do `fixture.detectChanges()` after dragenter, because it will stop dragover
        dispatchMouseEvent(passedNode, 'dragenter');

        // =========== dragover with different position ===========
        // Each node's height with 24px + 4px padding, use getBoundingClientRect to get target node position
        // drag-over-gap-top
        const { x, y } = passedNode.getBoundingClientRect();
        dispatchMouseEvent(passedNode, 'dragover', x + 50, y - 6);
        elementNode = nativeElement.querySelector('nz-tree-node[builtin]:nth-child(2)') as HTMLElement;
        expect(elementNode.classList).toContain('drag-over-gap-top');
        await sleep(150);
        // drag-over
        dispatchMouseEvent(passedNode, 'dragover', x + 50, y + 12);
        elementNode = nativeElement.querySelector('nz-tree-node[builtin]:nth-child(2)') as HTMLElement;
        expect(elementNode.classList).toContain('drag-over');
        await sleep(150);
        // drag-over-gap-bottom
        dispatchMouseEvent(passedNode, 'dragover', x + 50, y + 18);
        elementNode = nativeElement.querySelector('nz-tree-node[builtin]:nth-child(2)') as HTMLElement;
        expect(elementNode.classList).toContain('drag-over-gap-bottom');
        await sleep(150);
        // ======= enter check, expand passing nodes ========
        expect(dragEnterSpy).toHaveBeenCalledTimes(1);
        expect(dragOverSpy).toHaveBeenCalledTimes(3);
        fixture.detectChanges();
        shownNodes = nativeElement.querySelectorAll('nz-tree-node[builtin]');
        expect(shownNodes.length).toEqual(4);
      });

      it('should drop as nzBeforeDrop', async () => {
        const dragNode = nativeElement.querySelector("[title='0-2']") as HTMLElement;
        const dropNode = nativeElement.querySelector("[title='0-0']") as HTMLElement;
        component.beforeDrop.set(() => of(true));
        fixture.detectChanges();
        expect(
          (nativeElement.querySelector("[title='0-2']") as HTMLElement).querySelector('.ant-tree-indent')
        ).toBeNull();
        dispatchTouchEvent(dragNode, 'dragstart');
        dispatchTouchEvent(dropNode, 'dragenter');
        dispatchTouchEvent(dropNode, 'dragover');
        // drop 0-2 to 0-0
        dispatchTouchEvent(dropNode, 'drop');
        await stabilize(fixture, 300);
        expect(
          (nativeElement.querySelector("[title='0-2']") as HTMLElement).querySelector('.ant-tree-indent')
        ).toBeDefined();
      });

      it('should nzBlockNode work', async () => {
        const treeElement = nativeElement.querySelector('.ant-tree') as HTMLElement;
        expect(treeElement.classList).toContain('ant-tree-block-node');
      });
    });
  });

  describe('search', () => {
    let fixture: ComponentFixture<NzTestTreeBasicSearchComponent>;
    let component: NzTestTreeBasicSearchComponent;
    let nativeElement: Element;

    const getVisibleNodes = (title?: string): Element[] => {
      const isNodeVisible = (el: Element): boolean => el.getClientRects().length !== 0;
      const selector = title ? `[title='${title}']` : '[title]';
      const nodes = nativeElement.querySelectorAll(selector);
      return Array.from(nodes).filter(isNodeVisible);
    };

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTreeBasicSearchComponent);
      component = fixture.componentInstance;
      nativeElement = fixture.debugElement.nativeElement;
    });

    describe('search case-insensitive', () => {
      it('should list matches independent on casing', async () => {
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(3);

        component.searchValue.set('foo');
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(2);
        expect(getVisibleNodes('Foo').length).toEqual(1);
        expect(getVisibleNodes('foo').length).toEqual(1);

        component.searchValue.set('Foo');
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(2);
        expect(getVisibleNodes('Foo').length).toEqual(1);
        expect(getVisibleNodes('foo').length).toEqual(1);

        component.searchValue.set('baz');
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(2);
        expect(getVisibleNodes('Foo').length).toEqual(1);
        expect(getVisibleNodes('Baz Bar').length).toEqual(1);
      });
    });

    describe('highlight case-insensitive', () => {
      it('should highlight matched node', async () => {
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(3);

        component.searchValue.set('baz');
        fixture.detectChanges();
        expect(getVisibleNodes().length).toEqual(2);
        expect(getVisibleNodes('Foo').length).toEqual(1);
        expect(getVisibleNodes('Baz Bar').length).toEqual(1);
        const highlightedNode = getVisibleNodes('Baz Bar')[0].querySelector('.font-highlight');
        expect(highlightedNode?.textContent).toEqual('Baz');
      });
    });
  });
});

@Component({
  imports: [NzIconModule, NzTreeModule],
  template: `
    <button (click)="changeIcon(expandedIconTpl)">Custom expand icon</button>
    <nz-tree
      #treeComponent
      [nzData]="nodes()"
      nzShowIcon
      [nzCheckable]="true"
      [nzShowLine]="showLine()"
      [nzCheckStrictly]="checkStrictly()"
      [nzCheckedKeys]="defaultCheckedKeys()"
      [nzExpandedKeys]="defaultExpandedKeys()"
      [nzSelectedKeys]="defaultSelectedKeys()"
      [nzMultiple]="multiple()"
      [nzSearchValue]="searchValue()"
      [nzSearchFunc]="searchFunc()"
      [nzVirtualHeight]="virtualHeight()"
      [nzHideUnMatched]="hideUnMatched()"
      [nzExpandAll]="expandAll()"
      [nzExpandedIcon]="expandedIcon()"
      [nzAsyncData]="asyncData()"
      [nzSelectMode]="selectMode()"
      (nzSearchValueChange)="nzEvent($event)"
      (nzClick)="nzEvent($event)"
      (nzDblClick)="nzEvent($event)"
      (nzContextMenu)="nzEvent($event)"
      (nzExpandChange)="nzEvent($event)"
      (nzCheckboxChange)="nzEvent($event)"
    />
    <ng-template #expandedIconTpl let-node>
      <nz-icon nzType="smile" class="ant-tree-switcher-icon" />
    </ng-template>
  `
})
export class NzTestTreeBasicControlledComponent {
  @ViewChild('treeComponent', { static: true }) treeComponent!: NzTreeComponent;
  readonly searchValue = signal('');
  readonly multiple = signal(true);
  readonly expandAll = signal(false);
  readonly asyncData = signal(false);
  readonly selectMode = signal(false);
  readonly checkStrictly = signal(false);
  readonly showLine = signal(false);
  readonly defaultCheckedKeys = signal<string[]>([]);
  readonly defaultSelectedKeys = signal<string[]>([]);
  readonly defaultExpandedKeys = signal<string[]>([]);
  readonly expandedIcon = signal<TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }> | undefined>(
    undefined
  );
  readonly searchFunc = signal<((node: NzTreeNodeOptions) => boolean) | undefined>(undefined);
  readonly virtualHeight = signal<string | null>(null);
  readonly hideUnMatched = signal(false);
  readonly nodes = signal<NzTreeNodeOptions[] | NzTreeNode[]>([
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0'
        },
        {
          title: '0-0-1',
          key: '0-0-1'
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [{ title: '0-1-0-0', key: '0-1-0-0', isLeaf: true }]
    },
    {
      title: '0-2',
      key: '0-2',
      disabled: true,
      isLeaf: true
    }
  ]);

  nzEvent(_data: NzFormatEmitEvent): void {}

  // Just for testing
  changeIcon(template: TemplateRef<{ $implicit: NzTreeNode; origin: NzTreeNodeOptions }>): void {
    this.expandedIcon.set(template);
  }
}

@Component({
  imports: [NzTreeModule],
  template: `
    <nz-tree
      nzBlockNode
      [nzData]="nodes()"
      nzDraggable
      [nzExpandedKeys]="defaultExpandedKeys()"
      [nzBeforeDrop]="beforeDrop()"
      (nzOnDragStart)="onDragStart()"
      (nzOnDragEnter)="onDragEnter()"
      (nzOnDragLeave)="onDragLeave()"
      (nzOnDragOver)="onDragOver()"
      (nzOnDrop)="onDrop()"
      (nzOnDragEnd)="onDragEnd()"
    />
  `
})
export class NzTestTreeDraggableComponent {
  @ViewChild(NzTreeComponent, { static: true }) treeComponent!: NzTreeComponent;
  readonly defaultExpandedKeys = signal<string[]>([]);
  readonly nodes = signal<NzTreeNodeOptions[] | NzTreeNode[]>([
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0'
        },
        {
          title: '0-0-1',
          key: '0-0-1'
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [{ title: '0-1-0-0', key: '0-1-0-0', isLeaf: true }]
    },
    {
      title: '0-2',
      key: '0-2',
      disabled: true,
      isLeaf: true
    }
  ]);
  readonly beforeDrop = signal<(() => Observable<boolean>) | undefined>(undefined);

  onDragStart(): void {}

  onDragEnter(): void {}

  onDragOver(): void {}

  onDragLeave(): void {}

  onDrop(): void {}

  onDragEnd(): void {}
}

@Component({
  imports: [NzTreeModule],
  template: `
    <nz-tree
      [nzData]="nodes()"
      [nzSearchValue]="searchValue()"
      [nzExpandAll]="expandAll()"
      [nzAsyncData]="asyncData()"
      [nzHideUnMatched]="hideUnMatched()"
    />
  `
})
export class NzTestTreeBasicSearchComponent {
  @ViewChild(NzTreeComponent, { static: true }) treeComponent!: NzTreeComponent;
  readonly searchValue = signal<string>('');
  readonly expandAll = signal(true);
  readonly asyncData = signal(false);
  readonly hideUnMatched = signal(true);
  readonly nodes = signal<NzTreeNodeOptions[] | NzTreeNode[]>([
    {
      title: 'Foo',
      key: '0-1',
      children: [{ title: 'Baz Bar', key: '0-1-0', isLeaf: true }]
    },
    {
      title: 'foo',
      key: '0-2',
      isLeaf: true
    }
  ]);
}

async function stabilize<T>(fixture: ComponentFixture<T>, ms?: number): Promise<void> {
  fixture.detectChanges();
  await updateNonSignalsInput(fixture, ms);
  fixture.detectChanges();
}

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
