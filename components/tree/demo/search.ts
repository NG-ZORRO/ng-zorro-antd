import { Component } from '@angular/core';

@Component({
    selector: 'nz-demo-tree-search',
    template: `
        <nz-input-group [nzSuffix]="suffixIcon">
            <input type="text" nz-input placeholder="Search Tree Node" [(ngModel)]="searchValue">
        </nz-input-group>
        <ng-template #suffixIcon>
            <i class="anticon anticon-search"></i>
        </ng-template>
        <nz-tree [nzTreeData]="nodes" [nzSearchValue]="searchValue"
                 [nzCheckable]="true"
                 (nzCheckBoxChange)="mouseAction('check',$event)"
                 (nzClick)="mouseAction('click', $event)"
                 (nzExpandChange)="mouseAction('expand',$event)"
                 (nzDblClick)="mouseAction('dblclick',$event)">
        </nz-tree>`
})
export class NzDemoTreeSearchComponent {
    searchValue;
    nodes = [
        {
            title: 'root1',
            key: '1001',
            children: [
                {
                    title: 'child1',
                    key: '10001',
                    children: [
                        {title: 'child1.1', children: []},
                        {
                            title: 'child1.3',
                            checked: true,
                            children: [
                                {title: 'grandchild1.2.1', key: '110101', isLeaf: true}
                            ]
                        }
                    ]
                },
                {title: 'child2', key: '10002', isLeaf: true}
            ]
        },
        {
            title: 'root2',
            key: '1002',
            children: [
                {title: 'child2.1', children: []},
                {
                    title: 'child1.2',
                    selectable: false,
                    children: [
                        {title: 'grandchild2.2.1'}
                    ]
                }
            ]
        },
        {title: 'root3', key: '1003'}
    ];

    mouseAction(name: string, e: any): void {
        console.log(name, e);
    }
}
