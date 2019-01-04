import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewEncapsulation } from '@angular/core';
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
    '[class.ant-select-dropdown-menu-item-active]'  : 'active && !nzOption.nzDisabled && nzShowActive && !selected',
    '[attr.unselectable]'                           : '"unselectable"',
    '[style.user-select]'                           : '"none"'
  }
})
export class NzOptionLiComponent implements OnInit {
  el: HTMLElement = this.elementRef.nativeElement;
  selected = false;
  active = false;
  @Input() nzOption: NzOptionComponent;
  @Input() nzShowActive = true;
  @Input() nzMode: 'default' | 'multiple' | 'tags' = 'default';
  // tslint:disable-next-line:no-any
  @Input() compareWith = (o1: any, o2: any) => o1 === o2;

  @Input()
  set nzActiveOption(value: NzOptionComponent) {
    if (value) {
      this.active = this.compareWith(value.nzValue, this.nzOption.nzValue);
    } else {
      this.active = false;
    }
  }

  constructor(private elementRef: ElementRef, public nzSelectService: NzSelectService) {
  }

  ngOnInit(): void {
    this.nzSelectService.listOfSelectedValue$.subscribe(data => {
      this.selected = isNotNil(data.find(v => this.compareWith(v, this.nzOption.nzValue)));
    });
  }
}
