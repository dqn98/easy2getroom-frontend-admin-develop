import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { District } from 'src/app/entities/district';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getDistricts(): Observable<District[]> {
    return this.http.get<District[]>(this.appUrl + "AdminDistrict/GetAllDistricts");
  }

  getCityById(id: number): Observable<District> {
    return this.http.get<District>(this.appUrl + "AdminDistrict/GetDistrictById/" + id);
  }
}
