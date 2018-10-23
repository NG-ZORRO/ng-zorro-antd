import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[nz-dropdown]',
  host    : {
    '[class.ant-dropdown-trigger]': 'true'
  }
})
export class NzDropDownDirective implements OnInit {
  $mouseenter = new Subject<MouseEvent>();
  $mouseleave = new Subject<MouseEvent>();
  $click = new Subject<MouseEvent>();

  @HostListener('mouseenter', [ '$event' ])
  onMouseEnter(e: MouseEvent): void {
    this.$mouseenter.next(e);
  }

  @HostListener('mouseleave', [ '$event' ])
  onMouseLeave(e: MouseEvent): void {
    this.$mouseleave.next(e);
  }

  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    e.stopPropagation();
    this.$click.next(e);
  }

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit(): void {
    if (this.elementRef.nativeElement.nodeName === 'A') {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-dropdown-link');
    }
  }
}
