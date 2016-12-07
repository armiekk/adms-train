import { Component, OnInit } from '@angular/core';
import { UserApi } from '../shared/api/mockup-user-service/api/UserApi';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth/auth.service';
import { AdmsMenuService } from '../shared/services/adms-menu/adms-menu.service';
import { FwMenuBean } from '../shared/api/cdgs-authorize-services/model/models';


export interface Credentials {
  username?: string;
  password?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // credentials: Credentials = { rememberMe: true };
  private credentials: Credentials = {};

  constructor(
    private router: Router,
    private userApi: UserApi,
    private authService: AuthService,
    private admsMenuService: AdmsMenuService
  ) {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  login() {
    this.userApi.defaultHeaders.append('Accept', 'application/json');
    this.userApi.defaultHeaders.append('Content-Type', 'application/json');
    this.userApi.userLogin(this.credentials).subscribe((response) => {
      if (response) {
        localStorage.setItem('token', response.id);
        this.authService.tokenHolder.next(localStorage.getItem('token'));
        localStorage.setItem('id', response.userId);
        this.router.navigate(['/home']);
      } else {
        console.log('login failed');
      }
    });

    if (!localStorage.getItem('menuList')) {
      this.admsMenuService.getMenuByActiveRole().subscribe((response: FwMenuBean[]) => {
        localStorage.setItem('menuList', JSON.stringify(response[0].nodes));
      });
    }
  }

}
