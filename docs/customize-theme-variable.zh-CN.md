---
order: 6.1
title: 动态主题（实验性）
---

除了 [less 定制主题](/docs/customize-theme/zh) 外，我们还提供了 CSS Variable 版本以支持动态切换主题能力。

> 该功能通过动态修改 CSS Variable 实现，在 IE 中页面将无法正常展示

## 如何使用

### 引入 ng-zorro-antd.variable.min.css

替换当前项目引入样式文件为 CSS Variable 版本：

```diff
- @import "~ng-zorro-antd/ng-zorro-antd.min.css";
+ @import "~ng-zorro-antd/ng-zorro-antd.variable.min.css";
```

注：如果你使用了 `babel-plugin-import`，需要将其去除。

### 静态方法配置

利用全局配置项功能，在根注入器中根据注入令牌 `NZ_CONFIG` 提供一个符合 `NzConfig` 接口的对象，例如：

```typescript
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';

const ngZorroConfig: NzConfig = {
  // 注意组件名称没有 nz 前缀
  theme: {
    primaryColor: '#1890ff'
  }
};

export const appConfig: ApplicationConfig = {
  providers: [provideNzConfig(ngZorroConfig)]
};
```

这些全局配置项将会被注入 `NzConfigService` 当中并保存。

### 动态变更

你可以通过调用 `NzConfigService` 的 `set` 方法来改变 CSS Variable 样式配置项，例如：

```typescript
import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'app-change-zorro-config'
})
export class ChangeZorroConfigComponent {
  private nzConfigService = inject(NzConfigService);

  onChangeConfig() {
    this.nzConfigService.set('theme', { primaryColor: '#1890ff' });
  }
}
```

所有的组件实例都会响应这些改变（只要它们没有被单独赋值）。

## 冲突解决

默认情况下，CSS Variable 会以 `--ant` 作为前缀。当你的项目中引用多份 css 文件时，可以通过修改前缀的方式避免冲突。

### 编译 less

由于前缀变更，你需要重新生成一份对应的 css 文件。

```bash
lessc --js --modify-var="ant-prefix=custom" ng-zorro-antd/ng-zorro-antd.variable.less modified.css
```

### 相关变更

为了实现 CSS Variable 并保持原始用法兼容性，我们于 `ng-zorro-antd.xxx.less` 文件中添加了 `@root-entry-name: xxx;` 入口注入以支持 less 动态加载对应的 less 文件。一般情况下，你不需要关注该变化。
