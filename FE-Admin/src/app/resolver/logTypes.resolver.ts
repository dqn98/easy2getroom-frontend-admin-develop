import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AlertifyService } from '../base/alertify/alertify.service';
import { catchError } from 'rxjs/operators';
import { LogTypesService } from '../services/logs/log-types.service';
import { LogType } from '../entities/logType';

@Injectable()

export class LogTypesResolver implements Resolve<LogType[]> {
    constructor(private logTypesService: LogTypesService,
        private router: Router,
        private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<LogType[]> {
        return this.logTypesService.getLogTypes().pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}