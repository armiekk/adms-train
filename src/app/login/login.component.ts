import { Component, OnInit } from '@angular/core';
import { AuthApi } from '../shared/api/user/api/AuthApi';
import { UserApi } from '../shared/api/mockup-user-service/api/UserApi';
import { Router } from '@angular/router';
import { } from 'ng2-webstorage';

// interface Credentials {
//   username?: string;
//   password?: string;
//   rememberMe?: boolean;
// }

interface Credentials {
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
  credentials: Credentials = {};

  constructor(private authApi: AuthApi, private router: Router, private userApi: UserApi) { }

  ngOnInit() {
  }

  login() {
    sessionStorage.setItem('token', 'id');
    sessionStorage.setItem('id', 'developer');
    this.router.navigate(['/home']);
  // this.userApi.defaultHeaders.append("Accept", "application/json");
  // this.userApi.defaultHeaders.append("Content-Type", "application/json");
  //   this.userApi.userLogin(this.credentials).subscribe((response) => {
  //     if(response) {
  //       sessionStorage.setItem('token', response.id);
  //       sessionStorage.setItem('id', response.userId);
  //       this.router.navigate(['/home']);
  //     } else {
  //       console.log('login failed');
  //     }
  //   })
    // this.authApi.login(this.credentials).subscribe((response) => {
    //   if (response) {
    //     sessionStorage.setItem('token', response.id_token);
    //     this.router.navigate(['/home']);
    //   }
    // });


  }

}
