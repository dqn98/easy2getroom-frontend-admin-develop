import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Wards } from 'src/app/entities/wards';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WardsService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getWards(): Observable<Wards[]> {
    return this.http.get<Wards[]>(this.appUrl + "AdminWards/GetAllWards");
  }

  getCityById(id: number): Observable<Wards> {
    return this.http.get<Wards>(this.appUrl + "AdminWards/GetWardsById/" + id);
  }
}
