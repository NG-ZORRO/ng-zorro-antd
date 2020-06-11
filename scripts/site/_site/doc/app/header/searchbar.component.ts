import {
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  HostListener,
  Input, Output,
  ViewChild,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: 'div[app-searchbar]',
  template: `
    <i nz-icon nzType="search"></i>
    <input nz-input
           #searchInput
           (focus)="triggerFocus(true)"
           (blur)="triggerFocus(false)"
           [placeholder]="language=='zh' ? '在 ng.ant.design 中搜索' : 'Search in ng.ant.design'">
  `,
  host: {
    id: 'search-box',
    '[class.focused]': 'focused',
    '[class.narrow-mode]': 'responsive'
  },
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent {

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Input() language: 'zh' | 'en' = 'zh';
  @Input() responsive: null | 'narrow' | 'crowded' = null;
  @Output() focusChange = new EventEmitter<boolean>();

  focused = false;

  constructor(private cdr: ChangeDetectorRef) {
  }

  triggerFocus(focus: boolean): void {
    this.focused = focus;
    this.focusChange.emit(focus);
    this.cdr.markForCheck();
  }

  @HostListener('document:keyup.s', ['$event'])
  onKeyUp(event: KeyboardEvent): void {
    if (this.searchInput.nativeElement && event.target === document.body) {
      this.searchInput.nativeElement.focus();
    }
  }

}
