import { Component, computed, inject, OnDestroy, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { nzCompactAlgorithm, nzDarkAlgorithm, NzThemeAlgorithm, NzThemeService } from 'ng-zorro-antd/core/theme';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-button-token-theme',
  imports: [NzButtonModule, NzIconModule],
  template: `
    <div class="controls">
      <span>Primary color:</span>
      @for (color of presetColors; track color) {
        <button
          type="button"
          class="color-swatch"
          [class.active]="color === primaryColor()"
          [style.background]="color"
          [attr.aria-label]="'Use primary color ' + color"
          (click)="setPrimaryColor(color)"
        ></button>
      }
      <span>Algorithms:</span>
      <button nz-button nzSize="small" [nzType]="dark() ? 'primary' : 'default'" (click)="toggleDark()">Dark</button>
      <button nz-button nzSize="small" [nzType]="compact() ? 'primary' : 'default'" (click)="toggleCompact()">
        Compact
      </button>
      <button nz-button nzSize="small" nzType="dashed" (click)="reset()">Reset</button>
    </div>
    <div class="preview" [style.background]="previewBackground()">
      <button nz-button nzType="primary">Primary</button>
      <button nz-button>Default</button>
      <button nz-button nzType="dashed">Dashed</button>
      <button nz-button nzType="text">Text</button>
      <a nz-button nzType="link">Link</a>
      <button nz-button nzType="primary" nzShape="circle">
        <nz-icon nzType="search" />
      </button>
      <button nz-button nzType="primary" nzSize="large">Large</button>
      <button nz-button nzType="primary" nzSize="small">Small</button>
      <button nz-button nzType="primary" nzDanger>Danger</button>
    </div>
  `,
  styles: `
    .controls {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .color-swatch {
      width: 24px;
      height: 24px;
      border: 1px solid rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
    }

    .color-swatch.active {
      outline: 2px solid var(--ant-color-primary, #1890ff);
      outline-offset: 2px;
    }

    .preview {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px;
      padding: 16px;
      border-radius: 8px;
      transition: background 0.3s;
    }
  `
})
export class NzDemoButtonTokenThemeComponent implements OnDestroy {
  private readonly themeService = inject(NzThemeService);
  // The theme applies globally; restore whatever theme the app (e.g. the site
  // header's theme switcher) had configured when entering the demo.
  private readonly initialConfig = this.themeService.themeConfig();

  readonly presetColors = ['#1890ff', '#00b96b', '#722ed1', '#eb2f96', '#fa8c16'];

  readonly primaryColor = signal(this.presetColors[0]);
  readonly dark = signal(false);
  readonly compact = signal(false);

  readonly previewBackground = computed(() => (this.dark() ? '#141414' : 'transparent'));

  setPrimaryColor(color: string): void {
    this.primaryColor.set(color);
    this.applyTheme();
  }

  toggleDark(): void {
    this.dark.update(value => !value);
    this.applyTheme();
  }

  toggleCompact(): void {
    this.compact.update(value => !value);
    this.applyTheme();
  }

  reset(): void {
    this.primaryColor.set(this.presetColors[0]);
    this.dark.set(false);
    this.compact.set(false);
    this.themeService.setTheme(this.initialConfig);
  }

  ngOnDestroy(): void {
    this.themeService.setTheme(this.initialConfig);
  }

  private applyTheme(): void {
    const algorithm: NzThemeAlgorithm[] = [];
    if (this.dark()) {
      algorithm.push(nzDarkAlgorithm);
    }
    if (this.compact()) {
      algorithm.push(nzCompactAlgorithm);
    }
    this.themeService.setTheme({
      token: { colorPrimary: this.primaryColor() },
      algorithm
    });
  }
}
