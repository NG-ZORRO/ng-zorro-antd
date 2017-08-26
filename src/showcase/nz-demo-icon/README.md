语义化的矢量图形。

## 图标的命名规范

我们为每个图标赋予了语义化的命名，命名规则如下:

- 实心和描线图标保持同名，用 `-o` 来区分，比如 `question-circle`（实心） 和 `question-circle-o`（描线）；
- 命名顺序：`[图标名]-[形状?]-[描线?]-[方向?]`。

> `?` 为可选。

<!-- 完整的图标设计规范请访问 [图标规范](/docs/spec/icon)。 -->

## 如何使用

使用 `i` 标签声明组件，指定图标对应的 class 属性，示例代码如下:

```html
<i class="anticon anticon-${type}"></i>
```

## 本地部署

图标默认托管在 [iconfont.cn](http://iconfont.cn)，默认公网可访问。如需本地部署，可以下载<a href="./assets/download/fonts.zip">iconfont</a>文件,解压后放在 `assets/fonts`或其他公网可访问的文件夹下

> `NgZorroAntdModule.forRoot()` 方法能够接受一个可选的配置对象，用于引入外部的字体文件，类型为 `{ extraFontName: string, extraFontUrl: string }`。

例如
```typescript
@NgModule({
  ...
  imports: [
    ...
    NgZorroAntdModule.forRoot({ extraFontName: 'anticon', extraFontUrl: './assets/fonts/iconfont' })
    ...
  ]
  ...
})
```
## 图标列表

> 点击图标复制代码。

