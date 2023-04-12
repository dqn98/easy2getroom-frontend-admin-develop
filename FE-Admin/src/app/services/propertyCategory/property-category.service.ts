import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { PropertyCategory } from 'src/app/entities/propertyCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyCategoryService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  GetAllPropertyCategories(): Observable<PropertyCategory[]> {
    return this.http.get<PropertyCategory[]>(this.appUrl + "AdminPropertyCategory/GetAllPropertyCategories");
  }
}
