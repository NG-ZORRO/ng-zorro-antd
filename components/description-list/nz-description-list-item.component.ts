import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { InputNumber } from '../core/util';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  selector       : 'nz-description-list-item',
  templateUrl    : './nz-description-list-item.component.html'
})
export class NzDescriptionListItemComponent {
  @ViewChild(TemplateRef) content: TemplateRef<void>;

  @Input() @InputNumber() nzSpan = 1;
  @Input() nzTitle: string = '';
}
