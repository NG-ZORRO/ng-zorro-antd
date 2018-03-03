import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NzAvatarModule } from '../avatar/nz-avatar.module';
import { NzGridModule } from '../grid/nz-grid.module';
import { NzSpinModule } from '../spin/nz-spin.module';

import { NzListItemMetaComponent } from './nz-list-item-meta.component';
import { NzListItemComponent } from './nz-list-item.component';
import { NzListComponent } from './nz-list.component';

@NgModule({
    imports:        [ CommonModule, NzSpinModule, NzGridModule, NzAvatarModule ],
    declarations:   [ NzListComponent, NzListItemComponent, NzListItemMetaComponent ],
    exports:        [ NzListComponent, NzListItemComponent, NzListItemMetaComponent ]
})
export class NzListModule {
}
