/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, combineLatest, fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';

import type { editor, IDisposable } from 'monaco-editor';

import { warn } from 'ng-zorro-antd/core/logger';
import { BooleanInput, NzSafeAny, OnChangeType, OnTouchedType } from 'ng-zorro-antd/core/types';
import { inNextTick, InputBoolean } from 'ng-zorro-antd/core/util';

import { NzCodeEditorService } from './code-editor.service';
import { DiffEditorOptions, EditorOptions, JoinedEditorOptions, NzEditorMode } from './typings';

// Import types from monaco editor.
type ITextModel = editor.ITextModel;
type IStandaloneCodeEditor = editor.IStandaloneCodeEditor;
type IStandaloneDiffEditor = editor.IStandaloneDiffEditor;

declare const monaco: NzSafeAny;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-code-editor',
  exportAs: 'nzCodeEditor',
  template: `
    <div class="ant-code-editor-loading" *ngIf="nzLoading">
      <nz-spin></nz-spin>
    </div>

    <div class="ant-code-editor-toolkit" *ngIf="nzToolkit">
      <ng-template [ngTemplateOutlet]="nzToolkit"></ng-template>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzCodeEditorComponent),
      multi: true
    }
  ]
})
export class NzCodeEditorComponent implements OnDestroy, AfterViewInit {
  static ngAcceptInputType_nzLoading: BooleanInput;
  static ngAcceptInputType_nzFullControl: BooleanInput;

  @Input() nzEditorMode: NzEditorMode = 'normal';
  @Input() nzOriginalText = '';
  @Input() @InputBoolean() nzLoading = false;
  @Input() @InputBoolean() nzFullControl = false;
  @Input() nzToolkit?: TemplateRef<void>;

  @Input() set nzEditorOption(value: JoinedEditorOptions) {
    this.editorOption$.next(value);
  }

  @Output() readonly nzEditorInitialized = new EventEmitter<IStandaloneCodeEditor | IStandaloneDiffEditor>();

  editorOptionCached: JoinedEditorOptions = {};

  private readonly el: HTMLElement;
  private destroy$ = new Subject<void>();
  private resize$ = new Subject<void>();
  private editorOption$ = new BehaviorSubject<JoinedEditorOptions>({});
  private editorInstance: IStandaloneCodeEditor | IStandaloneDiffEditor | null = null;
  private value = '';
  private modelSet = false;
  private onDidChangeContentDisposable: IDisposable | null = null;

  constructor(
    private nzCodeEditorService: NzCodeEditorService,
    private ngZone: NgZone,
    elementRef: ElementRef,
    private platform: Platform
  ) {
    this.el = elementRef.nativeElement;
    this.el.classList.add('ant-code-editor');
  }

  /**
   * Initialize a monaco editor instance.
   */
  ngAfterViewInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }

    this.nzCodeEditorService
      .requestToInit()
      .pipe(takeUntil(this.destroy$))
      .subscribe(option => this.setup(option));
  }

  ngOnDestroy(): void {
    if (this.onDidChangeContentDisposable) {
      this.onDidChangeContentDisposable.dispose();
      this.onDidChangeContentDisposable = null;
    }

    if (this.editorInstance) {
      this.editorInstance.dispose();
      this.editorInstance = null;
    }

    this.destroy$.next();
    this.destroy$.complete();
  }

  writeValue(value: string): void {
    this.value = value;
    this.setValue();
  }

  registerOnChange(fn: OnChangeType): NzSafeAny {
    this.onChange = fn;
  }

  registerOnTouched(fn: OnTouchedType): void {
    this.onTouch = fn;
  }

  onChange: OnChangeType = (_value: string) => {};

  onTouch: OnTouchedType = () => {};

  layout(): void {
    this.resize$.next();
  }

  private setup(option: JoinedEditorOptions): void {
    // The `setup()` is invoked when the Monaco editor is loaded. This may happen asynchronously for the first
    // time, and it'll always happen synchronously afterwards. The first `setup()` invokation is outside the Angular
    // zone, but further invokations will happen within the Angular zone. We call the `setModel()` on the editor
    // instance, which tells Monaco to add event listeners lazily internally (`mousemove`, `mouseout`, etc.).
    // We should avoid adding them within the Angular zone since this will drastically affect the performance.
    this.ngZone.runOutsideAngular(() =>
      inNextTick()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.editorOptionCached = option;
          this.registerOptionChanges();
          this.initMonacoEditorInstance();
          this.registerResizeChange();
          this.setValue();

          if (!this.nzFullControl) {
            this.setValueEmitter();
          }

          if (this.nzEditorInitialized.observers.length) {
            this.ngZone.run(() => this.nzEditorInitialized.emit(this.editorInstance!));
          }
        })
    );
  }

  private registerOptionChanges(): void {
    combineLatest([this.editorOption$, this.nzCodeEditorService.option$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([selfOpt, defaultOpt]) => {
        this.editorOptionCached = {
          ...this.editorOptionCached,
          ...defaultOpt,
          ...selfOpt
        };
        this.updateOptionToMonaco();
      });
  }

  private initMonacoEditorInstance(): void {
    this.ngZone.runOutsideAngular(() => {
      this.editorInstance =
        this.nzEditorMode === 'normal'
          ? monaco.editor.create(this.el, { ...this.editorOptionCached })
          : monaco.editor.createDiffEditor(this.el, {
              ...(this.editorOptionCached as DiffEditorOptions)
            });
    });
  }

  private registerResizeChange(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(300), takeUntil(this.destroy$))
        .subscribe(() => {
          this.layout();
        });

      this.resize$
        .pipe(
          takeUntil(this.destroy$),
          filter(() => !!this.editorInstance),
          map(() => ({
            width: this.el.clientWidth,
            height: this.el.clientHeight
          })),
          distinctUntilChanged((a, b) => a.width === b.width && a.height === b.height),
          debounceTime(50)
        )
        .subscribe(() => {
          this.editorInstance!.layout();
        });
    });
  }

  private setValue(): void {
    if (!this.editorInstance) {
      return;
    }

    if (this.nzFullControl && this.value) {
      warn(`should not set value when you are using full control mode! It would result in ambiguous data flow!`);
      return;
    }

    if (this.nzEditorMode === 'normal') {
      if (this.modelSet) {
        const model = this.editorInstance.getModel() as ITextModel;
        this.preservePositionAndSelections(() => model.setValue(this.value));
      } else {
        (this.editorInstance as IStandaloneCodeEditor).setModel(
          monaco.editor.createModel(this.value, (this.editorOptionCached as EditorOptions).language)
        );
        this.modelSet = true;
      }
    } else {
      if (this.modelSet) {
        const model = (this.editorInstance as IStandaloneDiffEditor).getModel()!;
        this.preservePositionAndSelections(() => {
          model.modified.setValue(this.value);
          model.original.setValue(this.nzOriginalText);
        });
      } else {
        const language = (this.editorOptionCached as EditorOptions).language;
        (this.editorInstance as IStandaloneDiffEditor).setModel({
          original: monaco.editor.createModel(this.nzOriginalText, language),
          modified: monaco.editor.createModel(this.value, language)
        });
        this.modelSet = true;
      }
    }
  }

  /**
   * {@link editor.ICodeEditor}#setValue resets the cursor position to the start of the document.
   * This helper memorizes the cursor position and selections and restores them after the given
   * function has been called.
   */
  private preservePositionAndSelections(fn: () => unknown): void {
    if (!this.editorInstance) {
      fn();
      return;
    }

    const position = this.editorInstance.getPosition();
    const selections = this.editorInstance.getSelections();

    fn();

    if (position) {
      this.editorInstance.setPosition(position);
    }
    if (selections) {
      this.editorInstance.setSelections(selections);
    }
  }

  private setValueEmitter(): void {
    const model = (
      this.nzEditorMode === 'normal'
        ? (this.editorInstance as IStandaloneCodeEditor).getModel()
        : (this.editorInstance as IStandaloneDiffEditor).getModel()!.modified
    ) as ITextModel;

    // The `onDidChangeContent` returns a disposable object (an object with `dispose()` method) which will cleanup
    // the listener. The callback, that we pass to `onDidChangeContent`, captures `this`. This leads to a circular reference
    // (`nz-code-editor -> monaco -> nz-code-editor`) and prevents the `nz-code-editor` from being GC'd.
    this.onDidChangeContentDisposable = model.onDidChangeContent(() => {
      this.emitValue(model.getValue());
    });
  }

  private emitValue(value: string): void {
    if (this.value === value) {
      // If the value didn't change there's no reason to send an update.
      // Specifically this may happen during an update from the model (writeValue) where sending an update to the model would actually be incorrect.
      return;
    }

    this.value = value;
    // We're re-entering the Angular zone only if the value has been changed since there's a `return` expression previously.
    // This won't cause "dead" change detections (basically when the `tick()` has been run, but there's nothing to update).
    this.ngZone.run(() => {
      this.onChange(value);
    });
  }

  private updateOptionToMonaco(): void {
    if (this.editorInstance) {
      this.editorInstance.updateOptions({ ...this.editorOptionCached });
    }
  }
}
