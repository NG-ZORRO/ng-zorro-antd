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
  template           : `
    <li class="ant-timeline-item" #liTemplate>
      <div class="ant-timeline-item-tail"></div>
      <div
        class="ant-timeline-item-head"
        [class.ant-timeline-item-head-custom]="nzDot"
        [ngClass]="classMap">
        <ng-container *ngIf="isDotString; else dotTemplate">{{ nzDot }}</ng-container>
        <ng-template #dotTemplate>
          <ng-template [ngTemplateOutlet]="nzDot"></ng-template>
        </ng-template>
      </div>
      <div class="ant-timeline-item-content">
        <ng-content></ng-content>
      </div>
    </li>`
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
