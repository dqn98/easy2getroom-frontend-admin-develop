import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Property } from 'src/app/entities/property';
import { GetPropertiesViewModel } from 'src/app/viewmodels/property/getPropertiesViewModel';
import { UpdateStatusViewModel } from 'src/app/viewmodels/property/updateStatusViewModel';
import { GetPropertiesUserViewModel } from 'src/app/viewmodels/property/getPropertiesUserViewModel';

import { AnnouncementService } from '../announcement/announcement.service';


@Injectable({
  providedIn: 'root'
})
export class PropertiesService extends BaseService {

  constructor(private http: HttpClient, private announcementService: AnnouncementService) {
    super();
  }

  getProperties(viewModel: GetPropertiesViewModel): Observable<Property[]> {
    return this.http.post<Property[]>(this.appUrl + "AdminProperty/GetAllProperties", viewModel);
  }

  getPropertiesUser(viewModel: GetPropertiesUserViewModel): Observable<Property[]> {
    return this.http.post<Property[]>(this.appUrl + "AdminProperty/GetPropertiesUser", viewModel);
  }

  getPropertyById(id: number): Observable<Property> {
    return this.http.get<Property>(this.appUrl + `AdminProperty/GetPropertyById/${id}`);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.get(this.appUrl + `AdminProperty/DeleteProperty/${id}`);
  }

  updateStatus(viewModel: UpdateStatusViewModel): Observable<any> {
    return this.http.post(this.appUrl + 'AdminProperty/UpdateStatus', viewModel);
  }

  updateProperty(property: Property): Observable<any> {
    return this.http.post(this.appUrl + 'AdminProperty/UpdateProperty', property);
  }

  deletePropertyImage(propertyId: number, id: number): Observable<any> {
    return this.http.get(this.appUrl + 'AdminPropertyImages/' + propertyId + '/DeleteImageForProperty/' + id);
  }

  // SignalR
}
