import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AlertifyService } from '../base/alertify/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UsersService } from '../services/users/users.service';
import { GetUserViewModel } from '../viewmodels/user/getUsersViewModel';
import { UserResultViewModel } from '../viewmodels/user/userResultViewModel';

@Injectable() 

export class UsersResolver implements Resolve<UserResultViewModel[]> {
    constructor(private usersService: UsersService,
        private router: Router,
        private alertify: AlertifyService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<UserResultViewModel[]> {
        const viewModel: GetUserViewModel = {
            role: '',
            keyword: ''
        }
        return this.usersService.getUsers(viewModel).pipe(
            catchError(error => {
                this.alertify.error(error);
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}