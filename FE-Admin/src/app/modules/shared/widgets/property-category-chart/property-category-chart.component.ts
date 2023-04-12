import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { ChartService } from 'src/app/services/chart/chart.service';
import { PropertyCategoryChartResultViewModel } from 'src/app/viewmodels/chart/propertyCategoryChartResultViewModel';

@Component({
  selector: 'app-property-category-chart',
  templateUrl: './property-category-chart.component.html',
  styleUrls: ['./property-category-chart.component.scss']
})
export class PropertyCategoryChartComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions = {};
  data: PropertyCategoryChartResultViewModel;
  isLoadingData: boolean = true;
  selectedYear: string = 'None';

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
    this.chartService.getPropertyCategoryChartData(this.selectedYear).subscribe(data => {
      this.data = data;
      this.chartOptions = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: 'Category Of Properties'
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
          name: 'Category',
          colorByPoint: true,
          data: [{
            name: 'Room',
            y: this.data.room
          }, {
            name: 'House',
            y: this.data.house
          }, {
            name: 'Apartment',
            y: this.data.apartment
          }]
        }]
      };
      this.isLoadingData = false;
    });

  }

}
