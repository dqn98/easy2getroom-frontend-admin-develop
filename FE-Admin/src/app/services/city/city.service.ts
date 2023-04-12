import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from 'src/app/entities/ctity';

@Injectable({
  providedIn: 'root'
})
export class CityService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.appUrl + "AdminCity/GetAllCities");
  }

  getCityById(id: number): Observable<City> {
    return this.http.get<City>(this.appUrl + "AdminCity/GetAllCities/" + id);
  }
}
