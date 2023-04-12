import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Easy2GetRoom-Admin';
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }
}
