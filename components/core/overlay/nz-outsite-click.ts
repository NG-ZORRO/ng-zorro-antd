/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CdkConnectedOverlay, OverlayContainer } from '@angular/cdk/overlay';
import { Directive, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[cdkConnectedOverlay][nzOutsideClick]',
  exportAs: 'nzOutsideClick'
})
export class NzOutsideClickDirective implements OnDestroy, OnInit {
  static ngAcceptInputType_nzIgnoreOriginWthOutsideClick: BooleanInput;

  @Output() readonly nzOutsideClick = new EventEmitter<MouseEvent>();
  @Input() @InputBoolean() nzIgnoreOriginWthOutsideClick = false;
  private backdropClickSubscription = Subscription.EMPTY;
  constructor(private cdkConnectedOverlay: CdkConnectedOverlay, private overlayContainer: OverlayContainer) {}

  ngOnInit(): void {
    this.backdropClickSubscription = this.cdkConnectedOverlay.overlayOutsideClick.asObservable().subscribe((event: MouseEvent) => {
      const inContainer = this.overlayContainer.getContainerElement().contains(event.target as HTMLElement);
      const inOrigin = this.cdkConnectedOverlay.origin.elementRef.nativeElement.contains(event.target as HTMLElement);
      if (!inContainer && (!this.nzIgnoreOriginWthOutsideClick || !inOrigin)) {
        this.nzOutsideClick.emit(event);
      }
    });
  }

  ngOnDestroy(): void {
    this.backdropClickSubscription.unsubscribe();
  }
}
