# ng-zorro-antd Schematics

## Schematics

### ng-add

添加 ng-zorro-antd 与它的依赖，并根据需要自动配置。

- 添加 ng-zorro-antd 到 `package.json`
- 替换 `app.html` 引导内容
- 在根模块导入必要的模块
- 进行国际化配置
- 将用于自定义的 `theme.less` 或编译后的 css 导入 `angular.json`

```bash
$ ng add ng-zorro-antd [--locale=zh-CN] [--theme] [--skipPackageJson]
```

## 开发

### 首次运行

`npm run build:schematic` 编译到 publish 文件夹，创建一个新的 ng 项目。

1. `cd publish && npm link`
2. `ng new schematic-debug`
3. `cd schematic-debug && npm link ng-zorro-antd`

### 调试

1. `schematic:build` 修改代码后编译
2. `cd schematic-debug` 切换到 ng 项目
3. `git checkout . && git clean -fd` 还原更改
4. `ng g ng-zorro-antd:[schematic]` 运行 schematic

比如，你可以运行 `ng g ng-zorro-antd:ng-add` 来测试 `ng-add`。

## 发布

原有发布流程不变，但是 `schematics/utils/custom-theme.ts` 和 `schematics/utils/lib-versions.ts` 内容为动态生成，不提交到版本管理。