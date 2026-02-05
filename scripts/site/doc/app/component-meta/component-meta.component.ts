import { Clipboard } from '@angular/cdk/clipboard';
import { Component, computed, inject, input, resource, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'component-meta',
  imports: [NzButtonModule, NzDescriptionsModule, NzFlexModule, NzIconModule, NzTooltipModule, NzTypographyModule],
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

      a:hover .ant-typography {
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

  get openIssues(): string {
    return `https://github.com/NG-ZORRO/ng-zorro-antd/issues?q=is%3Aopen%20is%3Aissue%20label%3A%22Component%3A%20${this.componentName()}%22`;
  }

  get reportIssue(): string {
    return `https://ng.ant.design/issue-helper/#/${this.language()}`;
  }

  readonly isEn = computed(() => this.language() === 'en');
  readonly document = computed(() => {
    const lang = this.isEn() ? 'en-US' : 'zh-CN';
    return `https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/components/${this.name()}/doc/index.${lang}.md`;
  });
  readonly copied = signal(false);

  // the name of component in camel case
  readonly componentName = computed(() => {
    const componentName = this.name().startsWith('experimental-') ? this.name().slice(13) : this.name();
    return componentName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  });
  readonly serviceOnlyComponents = ['Notification', 'Message'];

  get usage(): string {
    const camelCaseName = this.componentName();
    const importTargetName = this.serviceOnlyComponents.includes(camelCaseName)
      ? `Nz${camelCaseName}Service`
      : `Nz${camelCaseName}Module`;
    return `import { ${importTargetName} } from 'ng-zorro-antd/${this.path()}';`;
  }

  readonly issues = resource({
    params: () => ({ component: this.componentName() }),
    loader: ({ params }) => {
      const q = [
        `repo:NG-ZORRO/ng-zorro-antd`,
        'is:issue',
        'is:open',
        `label:"Component: ${params.component}"`
      ].join(' ');
      return fetch(`https://api.github.com/search/issues?q=${encodeURIComponent(q)}`)
        .then(res => res.json())
        .then(res => res.total_count)
    }
  });

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
