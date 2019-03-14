import { AnimationEvent } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';
import { fadeMotion } from '../core/animation/fade';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { InputBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-tag',
  preserveWhitespaces: false,
  providers          : [ NzUpdateHostClassService ],
  animations         : [ fadeMotion ],
  templateUrl        : './nz-tag.component.html',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  host               : {
    '[@fadeMotion]'           : '',
    '(@fadeMotion.done)'      : 'afterAnimation($event)',
    '(click)'                 : 'updateCheckedStatus()',
    '[style.background-color]': 'presetColor? null : nzColor'
  }
})

export class NzTagComponent implements OnInit, OnChanges {
  presetColor = false;
  @Input() nzMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() nzColor: string;
  @Input() @InputBoolean() nzControl: boolean = false;
  @Input() @InputBoolean() nzChecked: boolean = false;
  @Input() @InputBoolean() nzNoAnimation: boolean = false;
  @Output() readonly nzAfterClose = new EventEmitter<void>();
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();

  private isPresetColor(color?: string): boolean {
    if (!color) {
      return false;
    }
    return (
      /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/
      .test(color)
    );
  }

  private updateClassMap(): void {
    this.presetColor = this.isPresetColor(this.nzColor);
    const prefix = 'ant-tag';
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [ `${prefix}` ]                  : true,
      [ `${prefix}-has-color` ]        : this.nzColor && !this.presetColor,
      [ `${prefix}-${this.nzColor}` ]  : this.presetColor,
      [ `${prefix}-checkable` ]        : this.nzMode === 'checkable',
      [ `${prefix}-checkable-checked` ]: this.nzChecked
    });
  }

  updateCheckedStatus(): void {
    if (this.nzMode === 'checkable' && !this.nzControl) {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
      this.updateClassMap();
    }
  }

  closeTag(e: MouseEvent): void {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
    }
  }

  afterAnimation(e: AnimationEvent): void {
    if (e.toState === 'void') {
      this.nzAfterClose.emit();
    }
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef, private nzUpdateHostClassService: NzUpdateHostClassService) {
  }

  ngOnInit(): void {
    this.updateClassMap();
  }

  ngOnChanges(): void {
    this.updateClassMap();
  }
}
