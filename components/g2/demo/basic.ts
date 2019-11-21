import { Component } from '@angular/core';
import { Chart } from '@antv/g2';

@Component({
  selector: 'nz-demo-g2-basic',
  template: `
    <div nz-g2 [nzChartOptions]="{ height: 300 }" (nzChartInitialized)="onChartInit($event)"></div>
  `,
  styles: [
    `
      div {
        height: 300px;
      }
    `
  ]
})
export class NzDemoG2BasicComponent {
  private chart: Chart;

  data = [
    {
      year: '1991',
      value: 3
    },
    {
      year: '1992',
      value: 4
    },
    {
      year: '1993',
      value: 3.5
    },
    {
      year: '1994',
      value: 5
    },
    {
      year: '1995',
      value: 4.9
    },
    {
      year: '1996',
      value: 6
    },
    {
      year: '1997',
      value: 7
    },
    {
      year: '1998',
      value: 9
    },
    {
      year: '1999',
      value: 13
    }
  ];

  onChartInit(chartInstance: Chart): void {
    this.chart = chartInstance;
    this.chart.source(this.data);
    this.chart.scale('value', {
      min: 0
    });
    this.chart.scale('year', {
      range: [0, 1]
    });
    this.chart.tooltip({
      crosshairs: {
        type: 'line'
      }
    });
    this.chart.line().position('year*value');
    this.chart
      .point()
      .position('year*value')
      .size(4)
      .shape('circle')
      .style({
        stroke: '#fff',
        lineWidth: 1
      });
    this.chart.render();
  }
}
