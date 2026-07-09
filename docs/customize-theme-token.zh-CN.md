---
order: 6.2
title: 设计令牌（实验性）
---

除了 [定制主题](/docs/customize-theme/zh) 和 [CSS 变量主题](/docs/customize-theme-variable/zh) 之外，ng-zorro-antd 还提供了 Ant Design v5 风格的**设计令牌（Design Token）**体系：`seed → map → alias → component` 令牌模型在 TypeScript 中求值，并以 CSS 自定义属性的形式渲染 —— 构建期和运行期都无需编译样式。

> 该功能目前是实验性的。令牌的默认值与当前默认主题完全一致，因此仅接入不定制不会改变应用外观。

## 使用方式

### 引入令牌样式文件

将引入的样式文件替换为令牌版本：

```diff
- @import "~ng-zorro-antd/ng-zorro-antd.min.css";
+ @import "~ng-zorro-antd/ng-zorro-antd.token.min.css";
```

样式文件内置了默认值，即使尚未提供主题也会按标准主题渲染。

### 提供主题

```typescript
import { provideNzTheme } from 'ng-zorro-antd/core/theme';

export const appConfig: ApplicationConfig = {
  providers: [
    provideNzTheme({
      token: { colorPrimary: '#00b96b', borderRadius: 4 }
    })
  ]
};
```

`provideNzTheme` 会解析令牌并将其作为 CSS 自定义属性（如 `--ant-color-primary`、`--ant-button-padding-inline`）写入 `<style nz-theme>` 元素。支持服务端渲染：style 元素会被序列化到 SSR HTML 中，不会出现未主题化内容的闪烁。

### 算法

算法从种子令牌推导出完整令牌集，并且可以组合使用，与 Ant Design v5 完全一致：

```typescript
import { nzDarkAlgorithm, nzCompactAlgorithm, provideNzTheme } from 'ng-zorro-antd/core/theme';

provideNzTheme({
  algorithm: [nzDarkAlgorithm, nzCompactAlgorithm],
  token: { colorPrimary: '#1890ff' }
});
```

- `nzDefaultAlgorithm` —— 默认（亮色）推导，未指定算法时使用。
- `nzDarkAlgorithm` —— 复刻暗色主题推导（调色板与深色背景混合）。
- `nzCompactAlgorithm` —— 复刻紧凑主题尺寸。

### 组件令牌

已迁移的组件拥有独立的令牌命名空间，可按组件覆盖：

```typescript
provideNzTheme({
  components: {
    button: { paddingInline: 24, fontWeight: 500 }
  }
});
```

### 动态切换主题

注入 `NzThemeService` 即可在运行时切换主题，所有令牌层级均以 signal 形式暴露：

```typescript
import { NzThemeService, nzDarkAlgorithm } from 'ng-zorro-antd/core/theme';

@Component({
  /* ... */
})
export class ThemeSwitcherComponent {
  private themeService = inject(NzThemeService);

  toDark(): void {
    this.themeService.setAlgorithm(nzDarkAlgorithm);
  }

  changePrimaryColor(color: string): void {
    this.themeService.updateTheme({ token: { colorPrimary: color } });
  }
}
```

## 组件覆盖范围

令牌体系将渐进式推进。尚未迁移的组件按标准主题渲染，仅受状态色令牌影响（与 [CSS 变量主题](/docs/customize-theme-variable/zh) 使用同一组 CSS 变量）。

| 组件                                                                                                                                                                                                                 | 起始版本 | 覆盖范围                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | -------------------------- |
| `button`                                                                                                                                                                                                             | 22.0.0   | 完整                       |
| `input`                                                                                                                                                                                                              | 22.0.0   | 完整                       |
| `select`、`date-picker`、`input-number`、`mention`、`radio`（按钮）、`segmented`、`typography`（编辑）、`form`（RTL 反馈）                                                                                           | 22.0.0   | 仅派生自输入框控件的尺寸   |
| 全局尺寸令牌（`fontSize*`、`lineHeight*`、`controlHeight*`、`borderRadius*`、`padding*`、`margin*`、`controlPaddingHorizontal*`）                                                                                    | 22.0.0   | 全部组件                   |
| `alert`、`calendar`、`dropdown`、`float-button`、`menu`、`modal`（关闭按钮）、`pagination`、`skeleton`、`spin`、`steps`、`switch`（加载图标）、`table`（展开图标）、`tabs`、`timeline`、`transfer`、`tree`、`upload` | 22.0.0   | 仅派生自全局尺寸令牌的尺寸 |

如需完整的暗色界面，目前请继续使用预编译的 `ng-zorro-antd.dark.css`；随着组件迁移，基于令牌的暗色主题将逐步覆盖全部组件。

## 与现有主题方案共存

- Less 定制与所有预编译样式包不受该功能影响。
- `provideNzTheme` 同时会输出旧版 `--ant-primary-color` 系列变量，可完全替代 `NzConfigService.set('theme', ...)` —— 请勿同时使用两者（开发模式下会打印警告）。
- 在令牌模式下，请通过 `provideNzTheme` 定制主题，而不是覆盖 Less 变量。

## 说明

- 自定义 CSS 变量前缀：`provideNzTheme({ cssVarPrefix: 'myapp' })`（需配合使用 `@ant-prefix` Less 变量重新构建的样式文件）。
- 通过 `CSP_NONCE` 提供的 [CSP nonce](https://angular.dev/best-practices/security) 会应用到注入的 style 元素上。
