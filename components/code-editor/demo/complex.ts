import { Component, DOCUMENT, Renderer2, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCodeEditorComponent, NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

const CODE = `function flatten(arr) {
  if (!(arr instanceof Array)) {
    throw new Error('The parameter must be an array.');
  }

  function partial(_arr) {
    return _arr.reduce((previous, current) => {
      if (current instanceof Array) {
        previous.push(...partial(current));
        return previous;
      } else {
        previous.push(current);
        return previous;
      }
    }, []);
  }

  return partial(arr);
}

console.log(flatten(['1', 2, [[3]]]))`;

@Component({
  selector: 'nz-demo-code-editor-complex',
  imports: [FormsModule, NzCodeEditorModule, NzIconModule, NzSwitchModule, NzTooltipModule],
  template: `
    <div>
      Loading
      <nz-switch [(ngModel)]="loading" />
    </div>
    <br />
    <nz-code-editor
      class="editor"
      [class.fullscreen]="fullscreen()"
      [ngModel]="code"
      [nzLoading]="loading()"
      [nzToolkit]="toolkit"
      [nzEditorOption]="{ language: 'javascript' }"
    />
    <ng-template #toolkit>
      <nz-icon
        [class.active]="fullscreen()"
        nz-tooltip
        nzTooltipTitle="Toggle Fullscreen"
        [nzType]="fullscreen() ? 'fullscreen-exit' : 'fullscreen'"
        (click)="toggleFullScreen()"
      />
    </ng-template>
  `,
  styles: `
    .editor {
      height: 200px;
    }

    .fullscreen {
      position: fixed;
      z-index: 999;
      height: 100vh;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
    }
  `
})
export class NzDemoCodeEditorComplexComponent {
  private readonly document = inject(DOCUMENT);
  private readonly renderer = inject(Renderer2);

  @ViewChild(NzCodeEditorComponent, { static: false }) editorComponent?: NzCodeEditorComponent;

  readonly loading = signal(true);
  readonly fullscreen = signal(false);
  readonly code = CODE;

  toggleFullScreen(): void {
    this.fullscreen.set(!this.fullscreen());
    this.renderer.setStyle(this.document.body, 'overflow-y', this.fullscreen() ? 'hidden' : null);
    this.editorComponent?.layout();
  }
}
