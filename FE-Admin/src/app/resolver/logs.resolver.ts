import { Injectable } from '@angular/core';
import { LogViewModel } from '../viewmodels/logs/logViewModel';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { LogsService } from '../services/logs/logs.service';
import { GetLogViewModel } from '../viewmodels/logs/getLogViewModel';
import { AlertifyService } from '../base/alertify/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()

export class LogsResolver implements Resolve<LogViewModel[]> {
    constructor(private logsService: LogsService,
        private router: Router,
        private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<LogViewModel[]> {
        let viewModel: GetLogViewModel = {
            keyWord: "",
            types: []
        }
        return this.logsService.getLogs(viewModel).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}