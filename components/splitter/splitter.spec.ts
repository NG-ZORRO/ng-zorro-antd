/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzSplitterModule } from './splitter.module';
import { NzSplitterCollapsible } from './typings';

interface PanelProps {
  defaultSize?: number | string;
  min?: number | string;
  max?: number | string;
  size?: number | string;
  resizable?: boolean;
  collapsible?: NzSplitterCollapsible;
}

@Component({
  imports: [NzSplitterModule],
  template: `
    <nz-splitter [nzLayout]="vertical ? 'vertical' : 'horizontal'">
      @for (panel of panels; track $index) {
        <nz-splitter-panel
          [nzDefaultSize]="panel.defaultSize"
          [nzMin]="panel.min"
          [nzMax]="panel.max"
          [nzSize]="panel.size"
          [nzCollapsible]="panel.collapsible ?? false"
        >
          {{ $index }}
        </nz-splitter-panel>
      }
    </nz-splitter>
  `,
  styles: `
    @import '../style/testing.less';
    @import './style/index.less';

    :host nz-splitter {
      height: 100px;
      width: 100px;
    }
  `
})
class NzSplitterTestComponent {
  vertical = false;
  panels: PanelProps[] = [{}, {}];
}

/* -------------------------- Test Cases -------------------------- */
describe('nz-splitter', () => {
  let fixture: ComponentFixture<NzSplitterTestComponent>;
  let component: NzSplitterTestComponent;
  let container: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(NzSplitterTestComponent);
    fixture.detectChanges();
    container = fixture.debugElement;
    component = fixture.componentInstance;
  });

  function getPanelFlexBasis(dl: DebugElement): string {
    const el = dl.nativeElement as HTMLElement;
    return el.style.flexBasis;
  }

  describe('basic', () => {
    it('should correct render', () => {
      fixture.detectChanges();
      expect(container.query(By.css('.ant-splitter'))).toBeTruthy();
      expect(container.queryAll(By.css('.ant-splitter-panel'))).toHaveSize(2);
      expect(container.query(By.css('.ant-splitter-bar'))).toBeTruthy();
    });

    it('should correct render panel size', () => {
      component.panels = [{ size: 20 }, { size: '45%' }, {}];
      fixture.detectChanges();

      const panels = container.queryAll(By.css('.ant-splitter-panel'));
      expect(getPanelFlexBasis(panels?.[0])).toBe('20px');
      expect(getPanelFlexBasis(panels?.[1])).toBe('45px');
      expect(getPanelFlexBasis(panels?.[2])).toBe('35px');
    });

    it('should layout work', () => {
      fixture.detectChanges();
      expect(container.query(By.css('.ant-splitter.ant-splitter-horizontal'))).toBeTruthy();

      component.vertical = true;
      fixture.detectChanges();
      expect(container.query(By.css('.ant-splitter.ant-splitter-vertical'))).toBeTruthy();
    });

    // todo
    xit('should resizable work', () => {
      component.panels = [{ size: 20 }, { resizable: false }, {}];
      fixture.detectChanges();
      expect(container.query(By.css('.ant-splitter-bar-dragger'))).toHaveSize(2);
      expect(container.query(By.css('.ant-splitter-bar-dragger-disabled'))).toHaveSize(2);

      component.panels = [{ size: 20 }, {}, { resizable: false }];
      fixture.detectChanges();
      expect(container.query(By.css('.ant-splitter-bar-dragger'))).toHaveSize(2);
      expect(container.query(By.css('.ant-splitter-bar-dragger-disabled'))).toHaveSize(1);
    });
  });

  describe('drag', () => {
    it('should mouse move work', () => {});
    it('should touch move work', () => {});
    it('with min', () => {});
    it('with max', () => {});
    it('both panel has min and max', () => {});
    it('rtl', () => {});
    it('[true, 0, true] can be move left', () => {});
    it('[false, 0, true] can not be move left', async () => {});
    it("aria-valuemin/aria-valuemax should not set NaN When container's width be setting zero", () => {});
  });

  describe('collapsible', () => {
    it('should basic work', () => {});
    it('collapsible - true', () => {});
    it('collapsible - start:true', () => {});
    it('collapsible - end:true', () => {});
    it('both collapsible', () => {});
    it('collapsible with cache', () => {});
    it('collapsible with fallback', () => {});
    it('auto resize', () => {});
  });
});
