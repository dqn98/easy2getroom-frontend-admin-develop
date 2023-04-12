import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { RentalType } from 'src/app/entities/rentalType';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalTypeService extends BaseService{

  
  constructor(private http: HttpClient) {
    super();
  }

  GetAllRentalTypes(): Observable<RentalType[]> {
    return this.http.get<RentalType[]>(this.appUrl + "AdminRentalType/GetAllRentalTypes");
  }
}
