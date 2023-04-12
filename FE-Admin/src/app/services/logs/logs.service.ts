import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LogViewModel } from 'src/app/viewmodels/logs/logViewModel';
import { GetLogViewModel } from 'src/app/viewmodels/logs/getLogViewModel';
import { AddLogViewModel } from 'src/app/viewmodels/logs/addLogViewModel';

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private appUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) { }

  public getLogs(viewModel: GetLogViewModel) : Observable<LogViewModel[]> {
    return this.http.post<LogViewModel[]>(this.appUrl + 'AdminLogging/GetLogs', viewModel);
  }

  public addLog(viewModel: AddLogViewModel) : Observable<LogViewModel> {
    return this.http.post<LogViewModel>(this.appUrl + 'AdminLogging/AddLog', viewModel);
  } 
}
