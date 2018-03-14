/* tslint:disable:no-conditional-assignment */
import { ApplicationRef, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzUpdateHostClassService as UpdateCls } from '../core/services/update-host-class.service';

function makeRange(length: number, offset: number = 0): number[] {
  return new Array(length).fill(0).map((_, i) => offset + i);
}

@Component({
  selector: 'nz-timepicker-panel',
  templateUrl: './nz-timepicker-panel.component.html'
})
export class NzTimepickerPanelComponent implements OnInit {
  @Input() set format(value: string | null) {
    if (value != null) {
      this.enabledColumns = 0;
      const charSet = new Set(value);
      if (this.hourEnabled = charSet.has('H')) { this.enabledColumns++; }
      if (this.minuteEnabled = charSet.has('m')) { this.enabledColumns++; }
      if (this.secondEnabled = charSet.has('s')) { this.enabledColumns++; }
    } else {
      this.hourEnabled = true;
      this.minuteEnabled = true;
      this.secondEnabled = true;
      this.enabledColumns = 3;
    }
  }

  @Output() timeClear = new EventEmitter<void>();

  hourEnabled: boolean = true;
  minuteEnabled: boolean = true;
  secondEnabled: boolean = true;
  enabledColumns: number = 3;
  hourRange: number[] = makeRange(24);
  minuteRange: number[] = makeRange(60);
  secondRange: number[] = makeRange(60);
  selectedHour: number = 0;
  selectedMinute: number = 0;
  selectedSecond: number = 0;

  constructor(private element: ElementRef, private updateCls: UpdateCls) { }

  ngOnInit(): void {
    this.setClassMap();
  }

  private setClassMap(): void {
    this.updateCls.updateHostClass(this.element.nativeElement, {
      'ant-time-picker-panel': true,
      'ant-time-picker-panel-column-3': true,
      'ant-time-picker-panel-placement-bottomLeft': true
    });
  }
}
