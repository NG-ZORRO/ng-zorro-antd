import {
  animate,
  state,
  style,
  transition,
  trigger,
  AnimationEvent
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

export type TagType = 'default' | 'closeable' | 'checkable';
import { InputBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-tag',
  preserveWhitespaces: false,
  animations         : [ trigger('tagAnimation', [
    state('*', style({ opacity: 1 })),
    transition('void => *', [
      style({ opacity: 0 }),
      animate('300ms cubic-bezier(0.78, 0.14, 0.15, 0.86)')
    ]),
    state('void', style({ opacity: 0 })),
    transition('* => void', [
      style({ opacity: 1 }),
      animate('300ms cubic-bezier(0.78, 0.14, 0.15, 0.86)')
    ])
  ]) ],
  templateUrl        : './nz-tag.component.html',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None
})
export class NzTagComponent implements OnInit, OnChanges, AfterViewInit {
  classMap;
  closed = false;

  @ViewChild('wrapperElement') private wrapperElement: ElementRef;

  @Input() nzMode: TagType = 'default';
  @Input() nzColor: string;
  @Input() @InputBoolean() nzChecked: boolean = false;
  @Output() readonly nzAfterClose = new EventEmitter<void>();
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();

  constructor(private renderer: Renderer2) { }

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
    const isPresetColor = this.isPresetColor(this.nzColor);
    this.classMap = {
      [ `ant-tag` ]                  : true,
      [ `ant-tag-has-color` ]        : this.nzColor && !isPresetColor,
      [ `ant-tag-${this.nzColor}` ]  : isPresetColor,
      [ `ant-tag-checkable` ]        : this.nzMode === 'checkable',
      [ `ant-tag-checkable-checked` ]: this.nzChecked
    };
  }

  private updateColorStatus(): void {
    if (this.wrapperElement && this.nzColor) {
      if (this.isPresetColor(this.nzColor)) {
        this.renderer.removeStyle(this.wrapperElement.nativeElement, 'background-color');
      } else {
        this.renderer.setStyle(this.wrapperElement.nativeElement, 'background-color', this.nzColor);
      }
    }
  }

  updateCheckedStatus(): void {
    if (this.nzMode === 'checkable') {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
      this.updateClassMap();
    }
  }

  closeTag(e: MouseEvent): void {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.closed = true;
    }
  }

  afterAnimation(e: AnimationEvent): void {
    if (this.closed && !e.fromState) {
      this.nzAfterClose.emit();
    }
  }

  ngOnInit(): void {
    this.updateClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColor) {
      this.updateColorStatus();
    }
    this.updateClassMap();
  }

  ngAfterViewInit(): void {
    this.updateColorStatus();
  }
}
