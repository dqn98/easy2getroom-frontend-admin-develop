import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { RentalTypeChartResultViewModel } from 'src/app/viewmodels/chart/rentalTypeChartResultViewModel';

@Component({
  selector: 'app-rental-type-chart',
  templateUrl: './rental-type-chart.component.html',
  styleUrls: ['./rental-type-chart.component.scss']
})
export class RentalTypeChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  data: RentalTypeChartResultViewModel;
  isLoadingData: boolean = true;
  selectedYear: string = 'None';

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getTotalRentalTypeChartData(this.selectedYear).subscribe(data => {
      this.data = data;
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Retal Type Of Properties'
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
          name: 'Type',
          colorByPoint: true,
          data: [{
            name: 'For Rent',
            y: this.data.forRent
          }, {
            name: 'Need Rent',
            y: this.data.needRent
          }, {
            name: 'For Sharing',
            y: this.data.forSharing
          }, {
            name: 'Need Sharing',
            y: this.data.needSharing
          }]
        }]
      };
      this.isLoadingData = false;
    });

  }

}
