import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LogType } from 'src/app/entities/logType';
import { AddLogTypeViewModel } from 'src/app/viewmodels/logType/addLogTypeViewModel';

@Injectable({
  providedIn: 'root'
})
export class LogTypesService {

  private appUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public getLogTypes(): Observable<LogType[]> {
    return this.http.get<LogType[]>(this.appUrl + 'AdminLogging/GetLogTypes')
  }

  public addLogType(viewModel: AddLogTypeViewModel): Observable<any> {
    return this.http.post<any>(this.appUrl + 'AdminLogging/AddLogType', viewModel);
  }
}
