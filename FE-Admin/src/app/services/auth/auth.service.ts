import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/base/serviceBase';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt'
import { User } from 'src/app/entities/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  public jwtHelper = new JwtHelperService();
  public decodedToken: any;

  public currentUser: User;
  public avatar = new BehaviorSubject<string>('https://res.cloudinary.com/namqd98/image/upload/v1592814619/Default/defaultuser_qyklmd.png');
  public currentAvatar = this.avatar.asObservable();

  constructor(private http: HttpClient) {
    super(); 
    this.apiUrl = 'AdminSecurity';  
  }

  changeMemberPhoto(photoUrl: string) {
    this.avatar.next(photoUrl);
  }

  login(formData: any) {
    return this.http.post(this.appUrl + this.apiUrl + '/login', formData)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            localStorage.setItem('user', JSON.stringify(user.user));
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
            this.currentUser = user.user;
            this.changeMemberPhoto(this.currentUser.avatar);
          }
        })
      )
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
