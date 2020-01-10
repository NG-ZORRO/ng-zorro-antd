# Tooltip Component

## Deprecation

### Component Usage

Old component usage is now deprecated and will be removed in 9.0.0.

e.g.

```html
<nz-tooltip>
  <a nz-tooltip></a>
</nz-tooltip>
```

### Some api without prefix.

If we want to use `nz-tooltip` and `nz-popover`, their properties would conflict.

What if we want to assign different titles to `nz-tooltip` and `nz-popover`? In the past we have to create an extra element.

e.g.

```html
<a nz-tooltip nzTitle="tooltip" nz-popover>
  <span nz-popover nzTitle="popover"></span>
</a>
```

With API with prefix, we can simply write this:

```html
<a nz-tooltip nzTooltipTitle="tooltip" nz-popover nzPopoverTitle="popover"></a>
```

Some api without prefix is now deprecated and would be removed in 10.0.0.
