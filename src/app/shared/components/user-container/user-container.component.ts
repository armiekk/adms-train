import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthApi } from '../../api/user/api/AuthApi';
import { UserApi } from '../../api/mockup-user-service/api/UserApi';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {

  account: any = {};
  clock: string;

  constructor(private authApi: AuthApi, private userApi: UserApi) { }

  ngOnInit() {
    Observable.interval(100).timestamp().subscribe((response) => {
      let date = new Date(response.timestamp);
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();

      m = this.checkTime(m);
      s = this.checkTime(s);
      this.clock = `${date.getDate()}/${date.getMonth()}/${date.getFullYear() + 543} ${h}:${m}:${s} น.`;
    });
    
    this.setHeaders();
    // this.authApi.getAccount().subscribe((response) => this.account = response);
    this.userApi.userFindById(sessionStorage.getItem('id')).subscribe((response) => {
      this.account.firstName = response.username;
      this.account.lastName = response.username;
    });
  }

  checkTime(i) {
    if (i < 10) { i = '0' + i };
    return i;
  }

  // setHeaders() {
  //   if (!this.authApi.defaultHeaders.has('Authorization')) {
  //     this.authApi.defaultHeaders.append('Content-Type', 'application/json');
  //     this.authApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
  //     this.authApi.defaultHeaders.append('Accept', 'application/json');
  //   }
  //   return;
  // }

  setHeaders() {
    if (!this.userApi.defaultHeaders.has('Authorization')) {
      this.userApi.defaultHeaders.append('Content-Type', 'application/json');
      this.userApi.defaultHeaders.append('Authorization', `${sessionStorage.getItem('token')}`);
      this.userApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }
}
