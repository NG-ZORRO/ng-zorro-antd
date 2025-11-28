---
order: 6
title:
  zh-CN: nzSanitizer
  en-US: nzSanitizer
---

## zh-CN

DomSanitizer 的 Pipe 实现

```html
<div [innerHTML]="html | nzSanitizer: 'html'"></div>
<div [style]="style | nzSanitizer: 'style'"></div>
<img [src]="url | nzSanitizer: 'url'" />
<iframe [src]="resourceUrl | nzSanitizer: 'resourceUrl'"></iframe>
```

## en-US

Pipe implementation of DomSanitizer

```html
<div [innerHTML]="html | nzSanitizer: 'html'"></div>
<div [style]="style | nzSanitizer: 'style'"></div>
<img [src]="url | nzSanitizer: 'url'" />
<iframe [src]="resourceUrl | nzSanitizer: 'resourceUrl'"></iframe>
```
