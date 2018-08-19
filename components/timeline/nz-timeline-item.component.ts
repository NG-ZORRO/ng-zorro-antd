import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector           : 'nz-timeline-item',
  preserveWhitespaces: false,
  templateUrl        : './nz-timeline-item.component.html'
})
export class NzTimelineItemComponent implements OnInit {
  private _dot: string | TemplateRef<void>;
  private _color: string = 'blue';
  private _isLast = false;
  @ViewChild('liTemplate') liTemplate: ElementRef;
  isDotString: boolean;
  classMap;

  set isLast(value: boolean) {
    this._isLast = value;
    if (this.isLast) {
      this.renderer.addClass(this.liTemplate.nativeElement, 'ant-timeline-item-last');
    } else {
      this.renderer.removeClass(this.liTemplate.nativeElement, 'ant-timeline-item-last');
    }
  }

  get isLast(): boolean {
    return this._isLast;
  }

  @Input()
  set nzDot(value: string | TemplateRef<void>) {
    this.isDotString = !(value instanceof TemplateRef);
    this._dot = value;
  }

  get nzDot(): string | TemplateRef<void> {
    return this._dot;
  }

  @Input()
  set nzColor(color: string) {
    this._color = color;
    this.updateClassMap();
  }

  get nzColor(): string {
    return this._color;
  }

  updateClassMap(): void {
    // Support custom color
    const defaultColors = [ 'blue', 'red', 'green' ];
    const circle = this.liTemplate.nativeElement.querySelector('.ant-timeline-item-head');
    if (defaultColors.indexOf(this._color) === -1) {
      this.renderer.setStyle(circle, 'border-color', this._color);
    } else {
      this.renderer.removeStyle(circle, 'border-color');
    }

    this.classMap = {
      [ 'ant-timeline-item-head-green' ]: this.nzColor === 'green',
      [ 'ant-timeline-item-head-red' ]  : this.nzColor === 'red',
      [ 'ant-timeline-item-head-blue' ] : this.nzColor === 'blue'
    };
  }

  constructor(private renderer: Renderer2) {
  }

  ngOnInit(): void {
    this.updateClassMap();
  }

}
