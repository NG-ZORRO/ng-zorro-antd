import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzTimelineMode } from './nz-timeline.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  selector           : 'nz-timeline-item, [nz-timeline-item]',
  templateUrl        : './nz-timeline-item.component.html'
})
export class NzTimelineItemComponent implements OnInit, OnChanges {
  @ViewChild('liTemplate') liTemplate: ElementRef;
  @Input() nzColor: string = 'blue';
  @Input() nzDot: string | TemplateRef<void>;

  isLast = false;
  position: NzTimelineMode | undefined;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.tryUpdateCustomColor();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColor) {
      this.tryUpdateCustomColor();
    }
  }

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  private tryUpdateCustomColor(): void {
    const defaultColors = [ 'blue', 'red', 'green' ];
    const circle = this.liTemplate.nativeElement.querySelector('.ant-timeline-item-head');
    if (defaultColors.indexOf(this.nzColor) === -1) {
      this.renderer.setStyle(circle, 'border-color', this.nzColor);
    } else {
      this.renderer.removeStyle(circle, 'border-color');
    }
  }
}
