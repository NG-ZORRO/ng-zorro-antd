import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-nav-progress-bar',
  template: '',
  styleUrl: './nav-progress-bar.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'nav-progress-bar',
    '[hidden]': '!navigating()'
  }
})
export class NavProgressBar {
  readonly navigating = toSignal(
    inject(Router).events.pipe(
      filter(event =>
        [NavigationStart, NavigationEnd, NavigationError, NavigationCancel].some(o => event instanceof o)
      ),
      map(event => event instanceof NavigationStart)
    ),
    { initialValue: true }
  )
}
