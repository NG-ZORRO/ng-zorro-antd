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

  updateComposition(value: boolean): void {
    this.isComposing = value;
  }

  onClearSelection(e: MouseEvent): void {
    e.stopPropagation();
    this.nzSelectService.updateListOfSelectedValue([], true);
  }

  includesSeparators(str: string | string[], separators: string[]): boolean {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < separators.length; ++i) {
      if (str.lastIndexOf(separators[ i ]) > 0) {
        return true;
      }
    }
    return false;
  }

  splitBySeparators(str: string | string[], separators: string[]): string[] {
    const reg = new RegExp(`[${separators.join()}]`);
    const array = (str as string).split(reg).filter(token => token);
    return Array.from(new Set(array));
  }

  setInputValue(value: string): void {
    if (this.inputElement) {
      this.inputElement.nativeElement.value = value;
    }
    this.inputValue = value;
    this.updateWidth();
    this.nzSelectService.updateSearchValue(value);
    // auto tokenSeparators
    if (this.inputValue &&
      this.inputValue.length &&
      this.nzTokenSeparators.length &&
      this.nzSelectService.isMultipleOrTags &&
      this.includesSeparators(this.inputValue, this.nzTokenSeparators)) {
      const listOfLabel = this.splitBySeparators(this.inputValue, this.nzTokenSeparators);
      this.nzSelectService.updateSelectedValueByLabelList(listOfLabel);
      this.nzSelectService.clearInput();
    }
  }

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.nzSelectService.listOfSelectedValue.length ? 'none' : 'block';
  }

  get selectedValueDisplay(): { [ key: string ]: string } {
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

  focusOnInput(): void {
    setTimeout(() => {
      if (this.inputElement) {
        this.inputElement.nativeElement.focus();
      }
    });
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
    event.stopPropagation();
  }

  constructor(private renderer: Renderer2, public nzSelectService: NzSelectService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.nzSelectService.open$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(open => {
      if (open) {
        this.focusOnInput();
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
