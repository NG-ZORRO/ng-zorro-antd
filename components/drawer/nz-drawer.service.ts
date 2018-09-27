import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NzDrawerOptions } from './nz-drawer-options';
import { NzDrawerRef } from './nz-drawer-ref';
import { NzDrawerComponent } from './nz-drawer.component';

export class DrawerBuilderForService<R> {
  private drawerRef: ComponentRef<NzDrawerComponent>;
  private overlayRef: OverlayRef;
  private unsubscribe$ = new Subject<void>();

  constructor(private overlay: Overlay, private options: NzDrawerOptions) {
    this.createDrawer();
    this.updateOptions(options);
    this.drawerRef.instance.nzOnViewInit
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.drawerRef.instance.open();
    });

    this.drawerRef.instance.nzOnClose
    .subscribe(() => {
      this.drawerRef.instance.close();
    });

    this.drawerRef.instance.afterClose
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(() => {
      this.overlayRef.dispose();
      this.drawerRef = null;
      this.unsubscribe$.next();
      this.unsubscribe$.complete();
    });
  }

  getInstance(): NzDrawerRef<R> {
    return this.drawerRef && this.drawerRef.instance;
  }

  createDrawer(): void {
    this.overlayRef = this.overlay.create();
    this.drawerRef = this.overlayRef.attach(new ComponentPortal(NzDrawerComponent));
  }

  updateOptions(options: NzDrawerOptions): void {
    Object.assign(this.drawerRef.instance, options);
  }
}

@Injectable({ providedIn: 'root'})
export class NzDrawerService {

  constructor(private overlay: Overlay) {
  }

  // tslint:disable-next-line:no-any
  create<T = any, D = any, R = any>(options: NzDrawerOptions<T, D>): NzDrawerRef<R> {
    return new DrawerBuilderForService<R>(this.overlay, options).getInstance();
  }
}
