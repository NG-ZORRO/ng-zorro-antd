/**
 * Memory leak test for nz-tabset components
 * This test specifically targets the animation-related memory leak
 */

import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { NzTabsModule } from './tabs.module';
import { NzTabsComponent } from './tabs.component';

describe('NzTabs Memory Leak', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAnimations()]
    });
  });

  it('should not retain detached elements in memory when tabs are destroyed', fakeAsync(() => {
    const fixture = TestBed.createComponent(MemoryLeakTestComponent);
    
    // Track the initial number of tabpane elements
    const initialElements = document.querySelectorAll('.ant-tabs-tabpane').length;
    
    // Create and destroy tabs multiple times to simulate the memory leak
    for (let i = 0; i < 5; i++) {
      fixture.componentInstance.showTabs = true;
      fixture.detectChanges();
      tick(300); // Wait for enter animations
      
      fixture.componentInstance.showTabs = false;
      fixture.detectChanges();
      tick(300); // Wait for leave animations
    }
    
    // Check that no tabpane elements are retained in the DOM
    const finalElements = document.querySelectorAll('.ant-tabs-tabpane').length;
    expect(finalElements).toBe(initialElements);
    
    // Check for any detached DOM nodes that might still be in memory
    const hiddenElements = document.querySelectorAll('.ant-tabs-tabpane[style*="display: none"]');
    expect(hiddenElements.length).toBe(0);
  }));

  it('should properly handle tab switching animations without memory leaks', fakeAsync(() => {
    const fixture = TestBed.createComponent(MemoryLeakTestComponent);
    
    fixture.componentInstance.showTabs = true;
    fixture.detectChanges();
    
    const tabsComponent: NzTabsComponent = fixture.debugElement.query(By.directive(NzTabsComponent))?.componentInstance;
    
    if (tabsComponent) {
      // Switch between tabs multiple times to trigger animations
      for (let i = 0; i < 3; i++) {
        tabsComponent.nzSelectedIndex = 1;
        fixture.detectChanges();
        tick(300);
        
        tabsComponent.nzSelectedIndex = 0;
        fixture.detectChanges();
        tick(300);
      }
    }
    
    // Verify no animations are stuck in progress
    const elementsWithAbsolutePosition = document.querySelectorAll('[style*="position: absolute"]');
    const tabRelatedAbsoluteElements = Array.from(elementsWithAbsolutePosition).filter(el => 
      el.classList.contains('ant-tabs-tabpane') || 
      el.closest('.ant-tabs')
    );
    
    // Only elements that are properly part of the active DOM should have absolute positioning
    // Not detached elements from animations
    expect(tabRelatedAbsoluteElements.length).toBe(0);
  }));

  it('should handle rapid component creation and destruction', fakeAsync(() => {
    const fixture = TestBed.createComponent(MemoryLeakTestComponent);
    
    // Rapid create/destroy cycles to stress test the cleanup
    for (let i = 0; i < 10; i++) {
      fixture.componentInstance.showTabs = true;
      fixture.detectChanges();
      tick(50); // Very short tick for rapid testing
      
      fixture.componentInstance.showTabs = false;
      fixture.detectChanges();
      tick(50);
    }
    
    // Final check for accumulated elements
    const remainingTabElements = document.querySelectorAll('.ant-tabs');
    expect(remainingTabElements.length).toBe(0);
    
    // Ensure no animation artifacts remain
    const tabPaneElements = document.querySelectorAll('.ant-tabs-tabpane');
    expect(tabPaneElements.length).toBe(0);
  }));
});

@Component({
  imports: [NzTabsModule],
  template: `
    @if (showTabs) {
      <nz-tabs [nzAnimated]="animated" [(nzSelectedIndex)]="selectedIndex">
        <nz-tab nzTitle="Tab 1">
          <div class="tab-content">Content of Tab 1</div>
        </nz-tab>
        <nz-tab nzTitle="Tab 2">
          <div class="tab-content">Content of Tab 2</div>
        </nz-tab>
        <nz-tab nzTitle="Tab 3">
          <div class="tab-content">Content of Tab 3</div>
        </nz-tab>
      </nz-tabs>
    }
  `
})
class MemoryLeakTestComponent {
  showTabs = false;
  animated = true;
  selectedIndex = 0;
}