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
  selector       : 'nz-descriptions-item',
  templateUrl    : './nz-descriptions-item.component.html'
})
export class NzDescriptionsItemComponent {
  @ViewChild(TemplateRef) content: TemplateRef<void>;

  @Input() @InputNumber() nzSpan = 1;
  @Input() nzTitle: string = '';
}
