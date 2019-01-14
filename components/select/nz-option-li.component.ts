import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  Input, OnDestroy,
  OnInit, TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNotNil } from '../core/util/check';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectService } from './nz-select.service';

@Component({
  selector       : '[nz-option-li]',
  templateUrl    : './nz-option-li.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  host           : {
    '[class.ant-select-dropdown-menu-item]'         : 'true',
    '[class.ant-select-dropdown-menu-item-selected]': 'selected && !nzOption.nzDisabled',
    '[class.ant-select-dropdown-menu-item-disabled]': 'nzOption.nzDisabled',
    '[class.ant-select-dropdown-menu-item-active]'  : 'active && !nzOption.nzDisabled',
    '[attr.unselectable]'                           : '"unselectable"',
    '[style.user-select]'                           : '"none"',
    '(click)'                                       : 'clickOption()'
  }
})
export class NzOptionLiComponent implements OnInit, OnDestroy {
  el: HTMLElement = this.elementRef.nativeElement;
  selected = false;
  active = false;
  destroy$ = new Subject();
  @Input() nzOption: NzOptionComponent;
  @Input() nzMenuItemSelectedIcon: TemplateRef<void>;

  clickOption(): void {
    this.nzSelectService.clickOption(this.nzOption);
  }

  constructor(private elementRef: ElementRef, public nzSelectService: NzSelectService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.nzSelectService.listOfSelectedValue$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(list => {
      this.selected = isNotNil(list.find(v => this.nzSelectService.compareWith(v, this.nzOption.nzValue)));
      this.cdr.markForCheck();
    });
    this.nzSelectService.activatedOption$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(option => {
      if (option) {
        this.active = this.nzSelectService.compareWith(option.nzValue, this.nzOption.nzValue);
      } else {
        this.active = false;
      }
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
