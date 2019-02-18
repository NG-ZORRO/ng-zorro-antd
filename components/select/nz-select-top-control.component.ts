import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { zoomMotion } from '../core/animation/zoom';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectService } from './nz-select.service';

@Component({
  selector           : '[nz-select-top-control]',
  preserveWhitespaces: false,
  animations         : [ zoomMotion ],
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-select-top-control.component.html'
})
export class NzSelectTopControlComponent implements OnInit, OnDestroy {
  inputValue: string;
  isComposing = false;
  private destroy$ = new Subject();
  @ViewChild('inputElement') inputElement: ElementRef;
  @Input() nzShowSearch = false;
  @Input() nzPlaceHolder: string;
  @Input() nzOpen = false;
  @Input() nzMaxTagCount: number;
  @Input() nzAllowClear = false;
  @Input() nzShowArrow = true;
  @Input() nzLoading = false;
  @Input() nzSuffixIcon: TemplateRef<void>;
  @Input() nzClearIcon: TemplateRef<void>;
  @Input() nzRemoveIcon: TemplateRef<void>;
  // tslint:disable-next-line:no-any
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: any[] }>;
  @Input() nzTokenSeparators: string[] = [];

  onClearSelection(e: MouseEvent): void {
    e.stopPropagation();
    this.nzSelectService.updateListOfSelectedValue([], true);
  }

  setInputValue(value: string): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.value = value;
    }
    this.inputValue = value;
    this.updateWidth();
    this.nzSelectService.updateSearchValue(value);
    this.nzSelectService.tokenSeparate(this.inputValue, this.nzTokenSeparators);
  }

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.nzSelectService.listOfSelectedValue.length ? 'none' : 'block';
  }

  get selectedValueStyle(): { [ key: string ]: string } {
    let showSelectedValue = false;
    let opacity = 1;
    if (!this.nzShowSearch) {
      showSelectedValue = true;
    } else {
      if (this.nzOpen) {
        showSelectedValue = !(this.inputValue || this.isComposing);
        if (showSelectedValue) {
          opacity = 0.4;
        }
      } else {
        showSelectedValue = true;
      }
    }
    return {
      display: showSelectedValue ? 'block' : 'none',
      opacity: `${opacity}`
    };
  }

  // tslint:disable-next-line:no-any
  trackValue(index: number, option: NzOptionComponent): any {
    return option.nzValue;
  }

  updateWidth(): void {
    if (this.nzSelectService.isMultipleOrTags && this.inputElement) {
      if (this.inputValue || this.isComposing) {
        this.renderer.setStyle(this.inputElement.nativeElement, 'width', `${this.inputElement.nativeElement.scrollWidth}px`);
      } else {
        this.renderer.removeStyle(this.inputElement.nativeElement, 'width');
      }
    }
  }

  removeSelectedValue(option: NzOptionComponent, e: KeyboardEvent): void {
    this.nzSelectService.removeValueFormSelected(option);
    e.stopPropagation();
  }

  constructor(private renderer: Renderer2, public nzSelectService: NzSelectService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.nzSelectService.open$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(open => {
      if (this.inputElement && open) {
        this.inputElement.nativeElement.focus();
      }
    });
    this.nzSelectService.clearInput$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.setInputValue('');
    });
    this.nzSelectService.check$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
