---
category: Components
type: Navigation
title: Pagination
cols: 1
---

A long list can be divided into several pages by `Pagination`, and only one page will be loaded at a time.

## When To Use

- When it will take a long time to load/render all items.
- If you want to browse the data by navigating through pages.

## API

```html
<Pagination onChange={onChange} total={50} />
```

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| current | current page number | number | - |
| defaultCurrent | default initial page number | number | 1 |
| defaultPageSize | default number of data items per page | number | 10 |
| itemRender | to customize item innerHTML | (page, type: 'page' 丨 'prev' 丨 'next', originalElement) => React.ReactNode | - |
| pageSize | number of data items per page | number | - |
| pageSizeOptions | specify the sizeChanger options | string\[] | ['10', '20', '30', '40'] |
| showQuickJumper | determine whether you can jump to pages directly | boolean | false |
| showSizeChanger | determine whether `pageSize` can be changed | boolean | false |
| showTotal | to display the total number and range | Function(total, range) | - |
| simple | whether to use simple mode | boolean | - |
| size | specify the size of `Pagination`, can be set to `small` | string | "" |
| total | total number of data items | number | 0 |
| onChange | a callback function, executed when the page number is changed, and it takes the resulting page number and pageSize as its arguments | Function(page, pageSize) | noop |
| onShowSizeChange | a callback function, executed when `pageSize` is changed | Function(current, size) | noop |
