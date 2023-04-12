import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Feature } from 'src/app/entities/feature';
import { FeatureViewModel } from 'src/app/viewmodels/feature/featureViewModel';

@Injectable({
  providedIn: 'root'
})
export class FeatureService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getFeatures(viewModel: FeatureViewModel): Observable<Feature[]> {
    return this.http.post<Feature[]>(this.appUrl + 'AdminFeature/GetFeatures', viewModel);
  }

  getFeature(id: number): Observable<Feature> {
    return this.http.get<Feature>(this.appUrl + 'AdminFeature/GetFeature/' + id);
  }

  add(viewModel: FeatureViewModel): Observable<any> {
    return this.http.post(this.appUrl + 'AdminFeature/AddFeature', viewModel);
  }

  delete(id: number): Observable<any> {
    return this.http.get(this.appUrl + "AdminFeature/DeleteFeature/" + id.toString());
  }
}
