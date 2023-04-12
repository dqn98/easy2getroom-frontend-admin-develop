import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../base/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Feature } from '../entities/feature';
import { FeatureService } from '../services/feature/feature.service';
import { FeatureViewModel } from '../viewmodels/feature/featureViewModel';

@Injectable()

export class FeatureResolver implements Resolve<Feature[]> {
    constructor(private featureService: FeatureService,
        private router: Router,
        private alertify: AlertifyService) {

    }

    resolve(route: ActivatedRouteSnapshot): Observable<Feature[]> {
        const viewModel: FeatureViewModel = {
            name: ""
        }
        return this.featureService.getFeatures(viewModel).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}