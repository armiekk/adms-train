import { Component, OnInit } from '@angular/core';
import { UserApi } from '../shared/api/mockup-user-service/api/UserApi';
import { Router } from '@angular/router';
import { UserManagementService, Credentials, JWT } from '../shared/services/user-management/user-management.service';
import { AdmsMenuService } from '../shared/services/adms-menu/adms-menu.service';
import { FwMenuBean } from '../shared/api/cdgs-authorize-services/model/models';
import { Cookie } from 'ng2-cookies/ng2-cookies';


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
    private userManagementService: UserManagementService,
    private admsMenuService: AdmsMenuService
  ) {
    if (this.userManagementService.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  login() {
    this.userManagementService.logIn(this.credentials)
      .subscribe((response: JWT) => {
        if (response) {
          Cookie.set('JWT', JSON.stringify(response), response.ttl);
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
