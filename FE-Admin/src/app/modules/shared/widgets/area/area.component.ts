import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { PropertyChartResultViewModel } from 'src/app/viewmodels/chart/propertyChartResultViewModel';
@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {

  yearSelected: string = '';
  currentYear = new Date().getFullYear();
  propertyChartData: PropertyChartResultViewModel;

  Highcharts = Highcharts;
  chartOptions = {};
  isLoadPropertyDataCompleted: boolean = false;

  constructor(private chartService: ChartService) {
    if (this.yearSelected == '') {
      this.yearSelected = this.currentYear.toString();
    }
    this.chartService.getPropertyChartData(this.yearSelected).subscribe(data => {
      this.propertyChartData = data;
      this.chartOptions = {
        chart: {
          type: 'column'
        },
        title: {
          text: 'Monthly Properties'
        },
        subtitle: {
          text: 'Source: easy2getroom.com'
        },
        xAxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: ''
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Total',
          data: data.totalProperties

        }, {
          name: 'Active',
          data: data.totalActiveProperties

        }, {
          name: 'Inactive',
          data: data.totalInactiveProperties

        }, {
          name: 'Awaiting Approval',
          data: data.totalAwaitingApprovalProperties

        }]
      };
      this.isLoadPropertyDataCompleted = true;
    });
  }
  ngOnInit(): void {

  }

}
