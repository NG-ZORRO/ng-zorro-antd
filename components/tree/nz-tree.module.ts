import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzTreeNodeComponent } from './nz-tree-node.component';
import { NzTreeComponent } from './nz-tree.component';

@NgModule({
    declarations: [NzTreeComponent, NzTreeNodeComponent],
    exports: [NzTreeComponent, NzTreeNodeComponent],
    imports: [CommonModule]
})
export class NzTreeModule {
}
