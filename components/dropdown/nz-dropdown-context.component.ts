import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { slideMotion } from '../core/animation/slide';
import { NzDropdownService } from './nz-dropdown.service';
import { NzMenuDropdownService } from './nz-menu-dropdown.service';

@Component({
  selector: 'nz-dropdown-context',
  animations: [slideMotion],
  preserveWhitespaces: false,
  templateUrl: './nz-dropdown-context.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzMenuDropdownService],
  styles: [
    `
      nz-dropdown-context {
        display: block;
      }

      .ant-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `
  ]
})
export class NzDropdownContextComponent implements OnDestroy {
  open = true;
  templateRef: TemplateRef<void>;
  dropDownPosition: 'top' | 'bottom' = 'bottom';
  private control: NzDropdownService;
  private destroy$ = new Subject();

  init(
    open: boolean,
    templateRef: TemplateRef<void>,
    positionChanges: Observable<ConnectedOverlayPositionChange>,
    control: NzDropdownService
  ): void {
    this.open = open;
    this.templateRef = templateRef;
    this.control = control;
    positionChanges.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.dropDownPosition = data.connectionPair.overlayY === 'bottom' ? 'top' : 'bottom';
      this.cdr.markForCheck();
    });
  }

  close(): void {
    this.open = false;
    this.cdr.markForCheck();
  }

  afterAnimation(): void {
    if (!this.open) {
      this.control.dispose();
    }
  }

  constructor(private cdr: ChangeDetectorRef) {}

  // TODO auto set dropdown class after the bug resolved
  /** https://github.com/angular/angular/issues/14842 **/
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
