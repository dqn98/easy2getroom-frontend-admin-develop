import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { TotalPropertiesChartResultViewModel } from 'src/app/viewmodels/chart/totalPropertiesChartResultViewModel';

@Component({
  selector: 'app-total-properties-chart',
  templateUrl: './total-properties-chart.component.html',
  styleUrls: ['./total-properties-chart.component.scss']
})
export class TotalPropertiesChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  data: TotalPropertiesChartResultViewModel;
  isLoadingData: boolean = true;
  selectedYear: string = 'None';
  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getTotalPropertiesChartData(this.selectedYear).subscribe(data => {
      this.data = data;
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Total Properties Status Chart'
        },
        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Status',
          colorByPoint: true,
          data: [{
            name: 'Active',
            y: this.data.active,
          }, {
            name: 'Inactive',
            y: this.data.inActive,
          }, {
            name: 'Awaiting Approval',
            y: this.data.awatingApproval
          }]
        }]
      };
      this.isLoadingData = false;
    });
  }

}
