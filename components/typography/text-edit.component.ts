/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ENTER, ESCAPE } from '@angular/cdk/keycodes';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Injector,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';
import { first, switchMap } from 'rxjs/operators';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzTransButtonModule } from 'ng-zorro-antd/core/trans-button';
import { NzTSType } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzTextI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-text-edit',
  exportAs: 'nzTextEdit',
  imports: [CdkTextareaAutosize, NzInputModule, NzTransButtonModule, NzIconModule, NzTooltipModule, NzOutletModule],
  template: `
    @if (editing) {
      <textarea #textarea nz-input cdkTextareaAutosize (blur)="confirm()"></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <nz-icon nzType="enter" />
      </button>
    } @else {
      <button
        nz-tooltip
        nz-trans-button
        class="ant-typography-edit"
        [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
        (click)="onClick()"
      >
        <ng-container *nzStringTemplateOutlet="icon; let icon">
          <nz-icon [nzType]="icon" />
        </ng-container>
      </button>
    }
  `,
  encapsulation: ViewEncapsulation.None
})
export class NzTextEditComponent implements OnInit {
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly i18n = inject(NzI18nService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly injector = inject(Injector);

  editing = false;
  locale!: NzTextI18nInterface;

  @Input() text?: string;
  @Input() icon: NzTSType = 'edit';
  @Input() tooltip?: null | NzTSType;
  @Output() readonly startEditing = new EventEmitter<void>();
  @Output() readonly endEditing = new EventEmitter<string>(true);
  @ViewChild('textarea', { static: false })
  set textarea(textarea: ElementRef<HTMLTextAreaElement> | undefined) {
    this.textarea$.next(textarea);
  }
  @ViewChild(CdkTextareaAutosize, { static: false }) autosizeDirective!: CdkTextareaAutosize;

  beforeText?: string;
  currentText?: string;
  readonly nativeElement: HTMLElement = inject(ElementRef).nativeElement;

  // We could've saved the textarea within some private property (e.g. `_textarea`) and have a getter,
  // but having subject makes the code more reactive and cancellable (e.g., event listeners will be
  // automatically removed and re-added through the `switchMap` below).
  private textarea$ = new BehaviorSubject<ElementRef<HTMLTextAreaElement> | null | undefined>(null);

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Text');
      this.cdr.markForCheck();
    });

    this.textarea$
      .pipe(
        switchMap(textarea => fromEventOutsideAngular<KeyboardEvent>(textarea?.nativeElement, 'keydown')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        // Caretaker note: adding modifier at the end (for instance `(keydown.esc)`) will tell Angular to add
        // an event listener through the `KeyEventsPlugin`, which always runs `ngZone.runGuarded()` internally.
        // We're interested only in escape and enter keyboard buttons, otherwise Angular will run change detection
        // on any `keydown` event.
        if (event.keyCode !== ESCAPE && event.keyCode !== ENTER) {
          return;
        }

        this.ngZone.run(() => {
          if (event.keyCode === ESCAPE) {
            this.onCancel();
          } else {
            this.onEnter(event);
          }
          this.cdr.markForCheck();
        });
      });

    this.textarea$
      .pipe(
        switchMap(textarea => fromEventOutsideAngular<KeyboardEvent>(textarea?.nativeElement, 'input')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        this.currentText = (event.target as HTMLTextAreaElement).value;
      });
  }

  onClick(): void {
    this.beforeText = this.text;
    this.currentText = this.beforeText;
    this.editing = true;
    this.startEditing.emit();
    this.focusAndSetValue();
  }

  confirm(): void {
    this.editing = false;
    this.endEditing.emit(this.currentText);
  }

  onEnter(event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    this.confirm();
  }

  onCancel(): void {
    this.currentText = this.beforeText;
    this.confirm();
  }

  focusAndSetValue(): void {
    const { injector } = this;

    afterNextRender(
      () => {
        this.textarea$
          .pipe(
            // It may still not be available, so we need to wait until view queries
            // are executed during the change detection. It's safer to wait until
            // the query runs, and the textarea is set on the behavior subject.
            first(textarea => textarea != null),
            takeUntilDestroyed(this.destroyRef)
          )
          .subscribe(textarea => {
            textarea.nativeElement.focus();
            textarea.nativeElement.value = this.currentText || '';
            this.autosizeDirective.resizeToFitContent(true);
            this.cdr.markForCheck();
          });
      },
      { injector }
    );
  }
}
