import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList, TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzOptionGroupComponent } from './nz-option-group.component';
import { NzOptionLiComponent } from './nz-option-li.component';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectService } from './nz-select.service';

@Component({
  selector           : '[nz-option-container]',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  templateUrl        : './nz-option-container.component.html'
})
export class NzOptionContainerComponent implements OnDestroy, OnInit {
  private destroy$ = new Subject();
  @ViewChildren(NzOptionLiComponent) listOfNzOptionLiComponent: QueryList<NzOptionLiComponent>;
  @Input() nzNotFoundContent: string;
  @Output() readonly nzScrollToBottom = new EventEmitter<void>();

  scrollIntoViewIfNeeded(): void {
    setTimeout(() => {
      if (this.listOfNzOptionLiComponent && this.listOfNzOptionLiComponent.length && this.nzSelectService.activatedOption) {
        const targetOption = this.listOfNzOptionLiComponent.find(o => this.nzSelectService.compareWith(o.nzOption.nzValue, this.nzSelectService.activatedOption.nzValue));
        /* tslint:disable-next-line:no-string-literal */
        if (targetOption && targetOption.el && targetOption.el[ 'scrollIntoViewIfNeeded' ]) {
          /* tslint:disable-next-line:no-string-literal */
          targetOption.el[ 'scrollIntoViewIfNeeded' ](false);
        }
      }
    }, 150);

  }

  dropDownScroll(e: MouseEvent, ul: HTMLUListElement): void {
    e.preventDefault();
    e.stopPropagation();
    // TODO
    if (ul && (ul.scrollHeight - ul.scrollTop === ul.clientHeight)) {
      this.nzScrollToBottom.emit();
    }
  }

  trackLabel(index: number, option: NzOptionGroupComponent): string | TemplateRef<void> {
    return option.nzLabel;
  }

  // tslint:disable-next-line:no-any
  trackValue(index: number, option: NzOptionComponent): any {
    return option.nzValue;
  }

  constructor(public nzSelectService: NzSelectService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.nzSelectService.valueOrOption$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.scrollIntoViewIfNeeded();
    });
    this.nzSelectService.activatedOption$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.scrollIntoViewIfNeeded();
    });
    this.nzSelectService.check$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
