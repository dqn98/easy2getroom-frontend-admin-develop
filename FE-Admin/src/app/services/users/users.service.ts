import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { GetUserViewModel } from 'src/app/viewmodels/user/getUsersViewModel';
import { Observable } from 'rxjs';
import { UserResultViewModel } from 'src/app/viewmodels/user/userResultViewModel';
import { UpdateUserViewModel } from 'src/app/viewmodels/user/updateUserViewModel';
import { UpdateRoleViewModel } from 'src/app/viewmodels/user/updateRoleViewModel';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getUsers(viewModel: GetUserViewModel): Observable<UserResultViewModel[]> {
    return this.http.post<UserResultViewModel[]>(this.appUrl + 'AdminUser/GetUsers', viewModel);
  }

  getUser(id: string): Observable<UserResultViewModel> {
    return this.http.get<UserResultViewModel>(this.appUrl + `AdminUser/GetUser/${id}`);
  }

  delete(id: string): Observable<any> {
    return this.http.get(this.appUrl + 'AdminUser/Delete/' + id);
  }

  update(viewModel: UpdateUserViewModel): Observable<any> {
    return this.http.post(this.appUrl + 'AdminUser/Update', viewModel);
  }

  updateRole(viewModel: UpdateRoleViewModel): Observable<any> {
    return this.http.post(this.appUrl + 'AdminUser/UpdateRole', viewModel);
  }
}