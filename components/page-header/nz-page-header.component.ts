import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzPageHeaderFooterDirective } from './nz-page-header-cells';

@Component({
  selector: 'nz-page-header',
  templateUrl: './nz-page-header.component.html',
  styleUrls: ['./nz-page-header.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-page-header',
    '[class.ant-page-header-has-footer]': 'nzPageHeaderFooter'
  }
})
export class NzPageHeaderComponent implements OnInit, OnChanges {
  isTemplateRefBackIcon = false;
  isStringBackIcon = false;

  @Input() nzBackIcon: string | TemplateRef<void> | null = null;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzSubtitle: string | TemplateRef<void>;
  @Output() readonly nzBack = new EventEmitter<void>();

  @ContentChild(NzPageHeaderFooterDirective) nzPageHeaderFooter: ElementRef<NzPageHeaderFooterDirective>;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzBackIcon')) {
      this.isTemplateRefBackIcon = changes.nzBackIcon.currentValue instanceof TemplateRef;
      this.isStringBackIcon = typeof changes.nzBackIcon.currentValue === 'string';
    }
  }

  onBack(): void {
    this.nzBack.emit();
  }
}
