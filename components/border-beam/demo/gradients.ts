import { Component, signal } from '@angular/core';

import { NzBorderBeamGradientStop, NzBorderBeamModule } from 'ng-zorro-antd/border-beam';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';

interface GradientPalette {
  name: string;
  description: string;
  stops: NzBorderBeamGradientStop[];
}

@Component({
  selector: 'nz-demo-border-beam-gradients',
  imports: [NzBorderBeamModule, NzButtonModule, NzCardModule],
  template: `
    <div class="palette-list">
      @for (palette of palettes; track palette.name) {
        <button
          nz-button
          [nzType]="selectedPalette().name === palette.name ? 'primary' : 'default'"
          [attr.aria-pressed]="selectedPalette().name === palette.name"
          (click)="selectPalette(palette)"
        >
          {{ palette.name }}
        </button>
      }
    </div>

    <nz-card
      class="beam-card"
      nzBorderBeam
      [nzBorderBeamColor]="selectedPalette().stops"
      nzTitle="{{ selectedPalette().name }}"
    >
      {{ selectedPalette().description }}
    </nz-card>
  `,
  styles: `
    .palette-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 16px;
    }

    .beam-card {
      position: relative;
      width: 320px;
      overflow: hidden;
    }
  `
})
export class NzDemoBorderBeamGradientsComponent {
  readonly palettes: GradientPalette[] = [
    {
      name: 'Ocean',
      description: 'A calm blue-green accent that works well for data views and cloud tooling.',
      stops: [
        { color: '#1677ff', percent: 0 },
        { color: '#36cfc9', percent: 52 },
        { color: '#95de64', percent: 100 }
      ]
    },
    {
      name: 'Sunset',
      description: 'A warm orange and pink gradient for announcements and featured content.',
      stops: [
        { color: '#fa8c16', percent: 0 },
        { color: '#ff4d4f', percent: 54 },
        { color: '#eb2f96', percent: 100 }
      ]
    },
    {
      name: 'Aurora',
      description: 'A vivid violet and cyan gradient for AI and creative workflows.',
      stops: [
        { color: '#722ed1', percent: 0 },
        { color: '#13c2c2', percent: 58 },
        { color: '#52c41a', percent: 100 }
      ]
    }
  ];

  readonly selectedPalette = signal(this.palettes[0]);

  selectPalette(palette: GradientPalette): void {
    this.selectedPalette.set(palette);
  }
}
