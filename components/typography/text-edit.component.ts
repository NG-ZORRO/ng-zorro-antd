/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ENTER, ESCAPE } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, EMPTY, from, fromEvent, Observable } from 'rxjs';
import { switchMap, take, takeUntil, withLatestFrom } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzTSType } from 'ng-zorro-antd/core/types';
import { NzI18nService, NzTextI18nInterface } from 'ng-zorro-antd/i18n';
import { NzAutosizeDirective } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-text-edit',
  exportAs: 'nzTextEdit',
  template: `
    <ng-template [ngIf]="editing" [ngIfElse]="notEditing">
      <textarea #textarea nz-input nzAutosize (blur)="confirm()"></textarea>
      <button nz-trans-button class="ant-typography-edit-content-confirm" (click)="confirm()">
        <span nz-icon nzType="enter"></span>
      </button>
    </ng-template>

    <ng-template #notEditing>
      <button
        nz-tooltip
        nz-trans-button
        class="ant-typography-edit"
        [nzTooltipTitle]="tooltip === null ? null : tooltip || locale?.edit"
        (click)="onClick()"
      >
        <ng-container *nzStringTemplateOutlet="icon; let icon">
          <span nz-icon [nzType]="icon"></span>
        </ng-container>
      </button>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  providers: [NzDestroyService]
})
export class NzTextEditComponent implements OnInit {
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
  @ViewChild(NzAutosizeDirective, { static: false }) autosizeDirective!: NzAutosizeDirective;

  beforeText?: string;
  currentText?: string;
  nativeElement = this.host.nativeElement;

  // We could've saved the textarea within some private property (e.g. `_textarea`) and have a getter,
  // but having subject makes the code more reactive and cancellable (e.g. event listeners will be
  // automatically removed and re-added through the `switchMap` below).
  private textarea$ = new BehaviorSubject<ElementRef<HTMLTextAreaElement> | null | undefined>(null);

  constructor(
    private ngZone: NgZone,
    private host: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private i18n: NzI18nService,
    private destroy$: NzDestroyService
  ) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Text');
      this.cdr.markForCheck();
    });

    this.textarea$
      .pipe(
        switchMap(textarea =>
          // Caretaker note: we explicitly should call `subscribe()` within the root zone.
          // `runOutsideAngular(() => fromEvent(...))` will just create an observable within the root zone,
          // but `addEventListener` is called when the `fromEvent` is subscribed.
          textarea
            ? new Observable<KeyboardEvent>(subscriber =>
                this.ngZone.runOutsideAngular(() =>
                  fromEvent<KeyboardEvent>(textarea.nativeElement, 'keydown').subscribe(subscriber)
                )
              )
            : EMPTY
        ),
        takeUntil(this.destroy$)
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
        switchMap(textarea =>
          textarea
            ? new Observable<KeyboardEvent>(subscriber =>
                this.ngZone.runOutsideAngular(() =>
                  fromEvent<KeyboardEvent>(textarea.nativeElement, 'input').subscribe(subscriber)
                )
              )
            : EMPTY
        ),
        takeUntil(this.destroy$)
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
    // Note: the zone may be nooped through `BootstrapOptions` when bootstrapping the root module. This means
    // the `onStable` will never emit any value.
    const onStable$ = this.ngZone.isStable ? from(Promise.resolve()) : this.ngZone.onStable.pipe(take(1));
    // Normally this isn't in the zone, but it can cause performance regressions for apps
    // using `zone-patch-rxjs` because it'll trigger a change detection when it unsubscribes.
    this.ngZone.runOutsideAngular(() => {
      onStable$.pipe(withLatestFrom(this.textarea$), takeUntil(this.destroy$)).subscribe(([, textarea]) => {
        if (textarea) {
          textarea.nativeElement.focus();
          textarea.nativeElement.value = this.currentText || '';
          this.autosizeDirective.resizeToFitContent();
          this.cdr.markForCheck();
        }
      });
    });
  }
}
