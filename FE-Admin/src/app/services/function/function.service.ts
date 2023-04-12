import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Function } from 'src/app/entities/function';
import { BaseService } from 'src/app/base/serviceBase';

@Injectable({
  providedIn: 'root'
})
export class FunctionService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getFunctions(): Observable<Function[]> {
    return this.http.get<Function[]>(this.appUrl + "Function/GetFunctions");
  }
}
