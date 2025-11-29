import { Clipboard } from '@angular/cdk/clipboard';
import { Component, computed, inject, input, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'component-meta',
  imports: [NzButtonModule, NzDescriptionsModule, NzIconModule, NzTooltipModule, NzTypographyModule],
  templateUrl: './component-meta.component.html',
  styles: `
    :host {
      nz-descriptions {
        margin-top: 16px;
        overflow-x: scroll;
      }

      ::ng-deep .ant-descriptions-item-label {
        padding-inline-end: 16px;
        width: 56px;
        word-break: keep-all;
      }

      .ant-typography {
        font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
      }

      a .ant-typography:hover {
        text-decoration: underline;
      }
    }
  `
})
export class ComponentMetaComponent {
  name = input.required<string>();
  language = input<string>();
  description = input<string>();

  readonly clipboard = inject(Clipboard);

  readonly path = computed(() => {
    return this.name().startsWith('experimental-') ? `experimental/${this.name().slice(13)}` : this.name();
  });

  get sourceCode(): string {
    return `https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/${this.path()}`;
  }

  readonly isEn = computed(() => this.language() === 'en');
  readonly document = computed(() => {
    const lang = this.isEn() ? 'en-US' : 'zh-CN';
    return `https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/${this.name()}/doc/index.${lang}.md`;
  });
  copied = signal(false);

  readonly serviceOnlyComponents = ['notification', 'message'];

  get usage(): string {
    const componentName = this.name().startsWith('experimental-')
      ? this.name().slice(13)
      : this.name();
    const camelCaseName = componentName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
    const importTargetName = this.serviceOnlyComponents.includes(componentName)
      ? `Nz${camelCaseName}Service`
      : `Nz${camelCaseName}Module`;
    return `import { ${importTargetName} } from 'ng-zorro-antd/${this.path()}';`;
  }

  usageTooltipVisibleChange(visible: boolean): void {
    if (!visible) {
      this.copied.set(false);
    }
  }

  copy(): void {
    this.clipboard.copy(this.usage);
    this.copied.set(true);
  }
}
