import {
  Component,
  HostBinding,
  ViewEncapsulation,
  Renderer2,
  ElementRef,
  Input
} from '@angular/core';

@Component({
  selector     : '[nz-input]',
  encapsulation: ViewEncapsulation.None,
  template     : ``,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzInputDirectiveComponent {
  size = 'default';
  nativeElement: HTMLElement;

  @Input()
  get nzSize(): string {
    return this.size;
  };

  set nzSize(value: string) {
    this.size = { large: 'lg', small: 'sm' }[ value ];
  }

  @HostBinding(`class.ant-input`) true;


  @HostBinding(`class.ant-input-lg`)
  get setLgClass(): boolean {
    return this.size === 'lg';
  };


  @HostBinding(`class.ant-input-sm`)
  get setSmClass(): boolean {
    return this.size === 'sm';
  };

  constructor(private _elementRef: ElementRef,
              private _render: Renderer2) {
    this.nativeElement = this._elementRef.nativeElement;

  }
}
