import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { AlertifyService } from '../base/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserResultViewModel } from '../viewmodels/user/userResultViewModel';
import { UsersService } from '../services/users/users.service';
import { AuthService } from '../services/auth/auth.service';

@Injectable() 

export class UserProfileResolver implements Resolve<UserResultViewModel> {
    constructor(private usersService: UsersService, 
        private authService: AuthService,
        private router: Router,
        private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<UserResultViewModel> {
        return this.usersService.getUser(this.authService.decodedToken.user_id).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}