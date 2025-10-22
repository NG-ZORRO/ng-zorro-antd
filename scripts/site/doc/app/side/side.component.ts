import { BidiModule, Directionality } from '@angular/cdk/bidi';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { RouterLink } from '@angular/router';

import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTagModule } from 'ng-zorro-antd/tag';

import { APP_LANGUAGE, APP_PAGE } from '../app.token';
import { ROUTER_LIST } from '../router';
import { AppService } from '../app.service';

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
}
