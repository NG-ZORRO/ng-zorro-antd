import { Component, DebugElement, OnInit } from '@angular/core';
import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzTreeNode } from './nz-tree-node';
import { NzTreeNodeComponent } from './nz-tree-node.component';
import { NzTreeComponent } from './nz-tree.component';
import { NzTreeModule } from './nz-tree.module';
import { NzTreeService } from './nz-tree.service';

describe('NzTreeBasicComponent', () => {
    let fixture: ComponentFixture<TestNzTreeComponent>;
    let component: TestNzTreeComponent;
    let tree: DebugElement;
    // node
    let nodeFixture: ComponentFixture<NzTreeNodeComponent>;
    let nodeComponent: NzTreeNodeComponent;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NzTreeModule],
            declarations: [TestNzTreeComponent],
            providers: [
                NzTreeService
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNzTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges(); // trigger initial data binding
        tree = fixture.debugElement.query(By.directive(NzTreeComponent));
        fixture.detectChanges(); // trigger initial data binding

        // node
        nodeFixture = TestBed.createComponent(NzTreeNodeComponent);
        nodeComponent = nodeFixture.componentInstance;
        fixture.detectChanges(); // trigger initial data bindin
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should className correct', () => {
        fixture.detectChanges();
        expect(tree.nativeElement.firstElementChild.classList).toContain('ant-tree');
    });
    it('should correct init view', () => {
        const nodeItems = fixture.debugElement.queryAll(By.css('li'));
        expect(nodeItems.length).toEqual(3);
    });
    it('should expand node correctly', () => {
        const targetNode = tree.query(By.css('.ant-tree-switcher'));
        (targetNode.nativeElement as HTMLElement).click();
        fixture.detectChanges();
        let expandNode = (fixture.nativeElement as HTMLElement).querySelector('.ant-tree-switcher_open');
        expect(expandNode.classList).toContain('ant-tree-switcher_open');
        (targetNode.nativeElement as HTMLElement).click();
        fixture.detectChanges();
        expandNode = (fixture.nativeElement as HTMLElement).querySelector('.ant-tree-switcher_close');
        expect(expandNode.classList).toContain('ant-tree-switcher_close');
    });
    it('should set correct state', () => {
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-checkbox').length).toEqual(0);
        component.nzCheckable = true;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-checkbox').length).toEqual(3);
        // showExpand
        component.nzShowExpand = false;
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-switcher').length).toEqual(0);
        component.nzShowExpand = true;
        fixture.detectChanges();
        // show line
        component.nzShowLine = true;
        fixture.detectChanges();
        expect(tree.nativeElement.firstElementChild.classList).toContain('ant-tree-show-line');
        component.nzShowLine = false;
        fixture.detectChanges();
        // nzSearchValue
        component.nzSearchValue = 'grandchild1';
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.font-red').length).toEqual(2);
    });

    it('should set default config correctly', () => {
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-switcher_open').length).toEqual(0);
        // set nzDefaultExpandedKeys
        component.nzDefaultExpandedKeys = ['1001', '10001'];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-switcher_open').length).toEqual(2);
        component.nzDefaultExpandedKeys = [];
        fixture.detectChanges();
        // set nzDefaultCheckedKeys
        component.nzCheckable = true;
        component.nzDefaultExpandAll = true;
        component.nzDefaultCheckedKeys = ['100011', '1000122', '1002'];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-checkbox-checked').length).toEqual(3);
        // set nzDefaultSelectedKeys
        component.nzDefaultSelectedKeys = ['100011', '1000121', '1000122'];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(1);
        component.nzMultiple = true;
        component.nzDefaultSelectedKeys = ['100011', '1000121', '1000122'];
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(3);
    });

    it('should set correct state if click checkbox', () => {
        component.nzDefaultExpandAll = true;
        component.nzCheckable = true;
        fixture.detectChanges();
        (fixture.nativeElement.querySelectorAll('.ant-tree-checkbox')[1] as HTMLElement).click();
        fixture.detectChanges();
        let targetNode = fixture.nativeElement.querySelectorAll('.ant-tree-checkbox-indeterminate');
        expect(targetNode.length).toEqual(1);
        expect(targetNode[0].nextElementSibling.getAttribute('title')).toEqual('root1');
        targetNode = fixture.nativeElement.querySelectorAll('.ant-tree-checkbox-checked');
        expect(targetNode.length).toEqual(4);
        // click disabled key
        (fixture.nativeElement.querySelectorAll('.ant-tree-checkbox')[4] as HTMLElement).click();
        fixture.detectChanges();
    });

    it('should set correct state if click node', fakeAsync(() => {
        component.nzDefaultExpandAll = true;
        fixture.detectChanges();
        (fixture.nativeElement.querySelectorAll('li')[1] as HTMLElement).click();
        tick(250);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(0);
        // test dblclick contextmenu
        triggerEvent(fixture.nativeElement.querySelectorAll('li')[1] as HTMLElement, 'contextmenu', 'MouseEvent');
        triggerEvent(fixture.nativeElement.querySelectorAll('li')[1] as HTMLElement, 'dblclick', 'MouseEvent');
        fixture.detectChanges();
        // multiple
        component.nzMultiple = true;
        fixture.detectChanges();
        (fixture.nativeElement.querySelectorAll('li')[3] as HTMLElement).click();
        (fixture.nativeElement.querySelectorAll('li')[5] as HTMLElement).click();
        (fixture.nativeElement.querySelectorAll('li')[6] as HTMLElement).click(); // disable
        tick(250);
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-node-selected').length).toEqual(3);
    }));

    it('add children async', () => {
        component.nzAsyncData = true;
        component.nodes = [
            {
                title: 'root1',
                key: '1001',
                children: []
            },
            {
                title: 'root2',
                key: '1002',
                children: []
            },
            {title: 'root3', key: '1003'},
            {title: 'root4', key: '1004', children: []},
            {title: 'root5', key: '1005', children: []}
        ];
        fixture.detectChanges();
        const targetNode = tree.query(By.css('.ant-tree-switcher'));
        (targetNode.nativeElement as HTMLElement).click();
        fixture.detectChanges();
        expect(fixture.nativeElement.querySelectorAll('.ant-tree-icon_loading').length).toEqual(1);
    });

    it('test service functions', () => {
        // drop func
        component.nzTreeService.initTreeNodes(component.nodes);
        component.nzTreeService.setSelectedNode(component.nzTreeService.rootNodes[2]);
        component.nzTreeService.dropAndApply(component.nzTreeService.rootNodes[0], 0);
        expect(component.nzTreeService.rootNodes.length).toEqual(2);
        expect(component.nzTreeService.rootNodes[0].getChildren()[2].title).toEqual('root3');
        component.nzTreeService.dropAndApply(component.nzTreeService.rootNodes[0], 0);
        component.nzTreeService.setSelectedNode(component.nzTreeService.rootNodes[1]);
        component.nzTreeService.dropAndApply(component.nzTreeService.rootNodes[0], 1);
        component.nzTreeService.setSelectedNode(component.nzTreeService.rootNodes[1].getChildren()[0]);
        component.nzTreeService.dropAndApply(component.nzTreeService.rootNodes[0], -1);
        component.nzTreeService.dropAndApply(component.nzTreeService.rootNodes[0], 3); // error pos
        // init node active
        component.nzTreeService.initTreeNodes(component.nodes);
        component.nzTreeService.setSelectedNode(component.nzTreeService.rootNodes[0].getChildren()[1]);
        component.nzTreeService.initNodeActive(component.nzTreeService.rootNodes[0].getChildren()[1], false);
        expect(component.nzTreeService.getSelectedNode().title).toEqual(component.nzTreeService.rootNodes[0].getChildren()[1].title);
        expect(component.nzTreeService.getSelectedNodeList().length).toEqual(1);
        component.nzTreeService.initNodeActive(component.nzTreeService.rootNodes[0].getChildren()[0], true);
        expect(component.nzTreeService.getSelectedNodeList().length).toEqual(2);
        // check(reset nodes)
        component.nzTreeService.initTreeNodes(component.nodes);
        component.nzTreeService.checkTreeNode(component.nzTreeService.rootNodes[0].getChildren()[1]);
        expect(component.nzTreeService.rootNodes[0].isHalfChecked).toEqual(true);
        expect(component.nzTreeService.rootNodes[0].getChildren()[1].isAllChecked).toEqual(true);
    });

    it('test drag', () => {
        // drag, just test functions work fine. will rewrite
        let dragEvent = new DragEvent('dragstart');
        nodeComponent.nzTreeNode = new NzTreeNode({
            title: 'child1',
            key: '10001',
            selected: true,
            children: [
                {
                    title: 'child1.1',
                    key: '100011',
                    children: []
                },
                {
                    title: 'child1.2',
                    key: '100012',
                    children: [
                        {
                            title: 'grandchild1.2.1',
                            key: '1000121',
                            isLeaf: true
                        },
                        {
                            title: 'grandchild1.2.2',
                            key: '1000122',
                            isLeaf: true
                        }
                    ]
                }
            ]
        });
        nodeComponent.nzDraggable = true;
        nodeFixture.detectChanges();
        nodeComponent.handleDragStart(dragEvent);
        expect(nodeComponent.nzTreeNode.isExpanded).toEqual(false);

        dragEvent = new DragEvent('dragenter');
        nodeComponent.handleDragEnter(dragEvent);
        expect(nodeComponent.nzTreeNode.isExpanded).toEqual(false);

        dragEvent = new DragEvent('dragover');
        nodeComponent.handleDragOver(dragEvent);
        nodeFixture.detectChanges();
        expect(nodeComponent.dragPos).toEqual(2); // no element

        dragEvent = new DragEvent('dragleave');
        nodeComponent.handleDragLeave(dragEvent);

        dragEvent = new DragEvent('drop');
        nodeComponent.dragPos = 0;
        nodeComponent.handleDragDrop(dragEvent);
        nodeComponent.dragPos = 1;
        nodeComponent.handleDragDrop(dragEvent);
        nodeComponent.dragPos = -1;
        nodeComponent.handleDragDrop(dragEvent);

        dragEvent = new DragEvent('dragend');
        nodeComponent.handleDragEnd(dragEvent);

    });
});

@Component({
    template: `
        <nz-tree
                [nzTreeData]="nodes"
                [nzCheckable]="nzCheckable"
                [nzMultiple]="nzMultiple"
                [nzShowExpand]="nzShowExpand"
                [nzShowLine]="nzShowLine"
                [nzSearchValue]="nzSearchValue"
                [nzDraggable]="nzDraggable"
                [nzAsyncData]="nzAsyncData"
                [nzDefaultExpandAll]="nzDefaultExpandAll"
                [nzDefaultExpandedKeys]="nzDefaultExpandedKeys"
                [nzDefaultCheckedKeys]="nzDefaultCheckedKeys"
                [nzDefaultSelectedKeys]="nzDefaultSelectedKeys"
        >
        </nz-tree>
    `
})

class TestNzTreeComponent implements OnInit {
    nodes = [
        {
            title: 'root1',
            key: '1001',
            children: [
                {
                    title: 'child1',
                    key: '10001',
                    selected: true,
                    children: [
                        {
                            title: 'child1.1',
                            key: '100011',
                            children: []
                        },
                        {
                            title: 'child1.2',
                            key: '100012',
                            children: [
                                {
                                    title: 'grandchild1.2.1',
                                    key: '1000121',
                                    isLeaf: true,
                                    disabled: true
                                },
                                {
                                    title: 'grandchild1.2.2',
                                    key: '1000122',
                                    isLeaf: true
                                }
                            ]
                        }
                    ]
                },
                {
                    title: 'child2',
                    key: '10002'
                }
            ]
        },
        {
            title: 'root2',
            key: '1002',
            children: [
                {
                    title: 'child2.1',
                    key: '10021',
                    children: []
                },
                {
                    title: 'child2.2',
                    key: '10022',
                    children: [
                        {
                            title: 'grandchild2.2.1',
                            key: '100221',
                            disableCheckbox: true
                        },
                        {
                            title: 'grandchild2.2.2',
                            key: '100222'
                        }
                    ]
                }
            ]
        },
        {title: 'root3', key: '1003'}
    ];
    nzCheckable = false;
    nzDefaultExpandAll = false;
    nzMultiple = false;
    nzShowExpand = true;
    nzShowLine = false;
    nzDraggable = false;
    nzAsyncData = false;
    nzSearchValue = '';
    nzDefaultExpandedKeys = [];
    nzDefaultCheckedKeys = [];
    nzDefaultSelectedKeys = [];

    constructor(public nzTreeService: NzTreeService) {
    }

    ngOnInit(): void {
    }
}

export function triggerEvent(elem: HTMLElement, eventName: string, eventType: string): void {
    const event: Event = document.createEvent(eventType);
    event.initEvent(eventName, true, true);
    elem.dispatchEvent(event);
}
