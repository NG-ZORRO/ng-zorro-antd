import { BidiModule } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTagColor, NzTagModule } from 'ng-zorro-antd/tag';
import { VERSION } from 'ng-zorro-antd/version';

import { APP_LANGUAGE, APP_PAGE } from '../app.token';
import { ROUTER_LIST } from '../router';
import { AppService } from '../app.service';

type I18n<T> = {
  zh: T;
  en: T;
}

@Component({
  selector: 'app-side',
  imports: [RouterLink, NgTemplateOutlet, NzMenuModule, NzTagModule, BidiModule],
  templateUrl: './side.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideComponent {
  protected readonly routerList = ROUTER_LIST;
  protected readonly dir = inject(AppService).directionality.valueSignal;
  protected readonly page = inject(APP_PAGE).asReadonly();
  protected readonly language = inject(APP_LANGUAGE).asReadonly();
  protected readonly intro = computed(() =>
    this.routerList.intro.filter(intro => intro.language === this.language() && !intro.hidden)
  );
  protected readonly componentList = computed(() =>
    this.routerList.components.filter(
      group =>
        group.language === this.language() &&
        !(this.page() === 'experimental' && group.experimentalChildren.length === 0)
    )
  );
  protected readonly semanticTags : Record<string, {
    label: I18n<string>,
    color: NzTagColor
  }> = {
    deprecated: { label: { zh: '废弃', en: 'Deprecated' }, color: 'warning' },
    new: { label: { zh: '新增', en: 'New' }, color: 'success' },
    updated: { label: { zh: '更新', en: 'Updated' }, color: 'processing' },
    '{{version}}': { label: { zh: VERSION.full, en: VERSION.full }, color: 'success' }
  }
}
