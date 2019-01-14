import { Inject, Injectable, Optional, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NzEmptyCustomContent, NZ_DEFAULT_EMPTY_CONTENT } from './nz-empty.config';

@Injectable({
  providedIn: 'root'
})
export class NzEmptyService<T = any> { // tslint:disable-line:no-any
  userDefaultContent$ = new BehaviorSubject<NzEmptyCustomContent>(undefined);

  constructor(@Inject(NZ_DEFAULT_EMPTY_CONTENT) @Optional() private defaultEmptyContent: Type<T>) {
    if (this.defaultEmptyContent) {
      this.userDefaultContent$.next(this.defaultEmptyContent);
    }
  }

  setDefaultContent(content?: NzEmptyCustomContent): void {
    this.userDefaultContent$.next(content);
  }

  resetDefault(): void {
    this.userDefaultContent$.next(undefined);
  }
}
