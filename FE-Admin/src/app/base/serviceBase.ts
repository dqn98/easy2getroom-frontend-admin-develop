import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { AlertifyService } from './alertify/alertify.service';

@Injectable({
  providedIn: 'root'
})

export class BaseService {
  protected appUrl: string;
  protected apiUrl: string;
  protected alertify: AlertifyService;

  constructor() {
    this.appUrl = environment.baseUrl;
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      this.alertify.error(error);

      return of(result as T);
    };
  }

}
