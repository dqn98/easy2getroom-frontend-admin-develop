import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PropertyChartResultViewModel } from 'src/app/viewmodels/chart/propertyChartResultViewModel';
import { TotalPropertiesChartResultViewModel } from 'src/app/viewmodels/chart/totalPropertiesChartResultViewModel';
import { RentalTypeChartResultViewModel } from 'src/app/viewmodels/chart/rentalTypeChartResultViewModel';
import { PropertyCategoryChartResultViewModel } from 'src/app/viewmodels/chart/propertyCategoryChartResultViewModel';

@Injectable({
  providedIn: 'root'
})
export class ChartService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getPropertyChartData(year: string): Observable<PropertyChartResultViewModel> {
    return this.http.get<PropertyChartResultViewModel>(this.appUrl + "AdminChart/GetPropertyChartData/" + year);
  }

  getTotalPropertiesChartData(year: string): Observable<TotalPropertiesChartResultViewModel> {
    return this.http.get<TotalPropertiesChartResultViewModel>(this.appUrl + "AdminChart/GetTotalPropertiesChartData/" + year);
  }

  getPropertyCategoryChartData(year: string): Observable<PropertyCategoryChartResultViewModel> {
    return this.http.get<PropertyCategoryChartResultViewModel>(this.appUrl + "AdminChart/GetPropertyCategoryChartData/" + year);
  }

  getTotalRentalTypeChartData(year: string): Observable<RentalTypeChartResultViewModel> {
    return this.http.get<RentalTypeChartResultViewModel>(this.appUrl + "AdminChart/GetTotalRentalTypeChartData/" + year);
  }
}
