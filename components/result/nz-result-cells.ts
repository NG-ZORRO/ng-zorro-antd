import { Component, Directive } from '@angular/core';

@Directive({
  selector: 'nz-result-title, [nz-result-title]',
  host    : {
    class: 'ant-result-title-view-title'
  }
})
export class NzResultTitleDirective {
}

@Directive({
  selector: 'nz-result-subtitle, [nz-result-subtitle]',
  host    : {
    class: 'ant-result-title-view-subtitle'
  }
})
export class NzResultSubtitleDirective {
}

@Directive({
  selector: '[nz-result-icon]'
})
export class NzResultIconDirective {
}

@Directive({
  selector: 'nz-result-content, [nz-result-content]',
  host    : {
    class: 'ant-result-content'
  }
})
export class NzResultContentDirective {
}

@Directive({
  selector: 'nz-result-extra, [nz-result-extra]',
  host    : {
    class: 'ant-result-extra-view'
  }
})
export class NzResultExtraDirective {
}
