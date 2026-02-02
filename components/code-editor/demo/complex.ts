import { Component, DOCUMENT, inject, Renderer2, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCodeEditorComponent, NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTooltipDirective, NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-code-editor-complex',
  imports: [FormsModule, NzCodeEditorModule, NzIconModule, NzTypographyModule, NzSwitchModule, NzTooltipModule],
  template: `
    <p nz-paragraph style="margin-bottom: 8px;">
      Loading
      <nz-switch [(ngModel)]="loading" />
    </p>
    <nz-code-editor
      class="editor"
      [class.full-screen]="fullScreen"
      [ngModel]="code"
      [nzLoading]="loading"
      [nzToolkit]="toolkit"
      [nzEditorOption]="{ language: 'javascript' }"
    />
    <ng-template #toolkit>
      <nz-icon
        [class.active]="fullScreen"
        nz-tooltip
        nzTooltipTitle="Toggle Fullscreen"
        [nzType]="fullScreen ? 'fullscreen-exit' : 'fullscreen'"
        (click)="toggleFullScreen()"
      />
    </ng-template>
  `,
  styles: `
    .editor {
      height: 200px;
    }

    .full-screen {
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
  @ViewChild(NzCodeEditorComponent, { static: false }) editorComponent?: NzCodeEditorComponent;
  @ViewChild(NzTooltipDirective, { static: false }) tooltip?: NzTooltipDirective;

  loading = true;
  fullScreen = false;
  code = `function flatten(arr) {
  if (!(arr instanceof Array)) {
    throw new Error('The parameter must be an array.');
  }

  function partial(arr_) {
    return arr_.reduce((previous, current) => {
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
  private document: Document = inject(DOCUMENT);
  private renderer: Renderer2 = inject(Renderer2);

  toggleFullScreen(): void {
    this.fullScreen = !this.fullScreen;
    this.renderer.setStyle(this.document.body, 'overflow-y', this.fullScreen ? 'hidden' : null);
    this.editorComponent?.layout();
    this.tooltip?.hide();
  }
}
