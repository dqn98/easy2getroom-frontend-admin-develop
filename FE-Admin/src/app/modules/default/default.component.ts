import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'
import { AlertifyService } from 'src/app/base/alertify/alertify.service';
import { Router } from '@angular/router';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  jwtHelpser = new JwtHelperService();
  sideBarOpen = true;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private router: Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (token) {
      this.authService.decodedToken = this.jwtHelpser.decodeToken(token);
    }
    if(user) {
      this.authService.currentUser = user;
      this.authService.changeMemberPhoto(user.avatar);
    }
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  logout() {
    this.authService.logout();
    this.alertify.message("Logged out");
    this.router.navigate(['/login']);
  }
}
