import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserApi } from '../../api/mockup-user-service/api/UserApi';
import { User } from '../../api/mockup-user-service/model/models';
import { Cookie } from 'ng2-cookies/ng2-cookies';

const PM_PERMISSION: string = 'CRUDB';
const SA_PERMISSION: string = 'CRUB';
const PA_PERMISSION: string = 'CRU';
const PG_PERMISSION: string = 'R';

export { User } from '../../api/mockup-user-service/model/models';

export interface Credentials {
  username?: string;
  password?: string;
}

export interface JWT {
  id: string;
  userId: number;
  ttl: number;
  created: string;
}

@Injectable()
export class UserManagementService {

  private currentRole: string = '400';

  PM_PERMISSION: string = PM_PERMISSION;
  SA_PERMISSION: string = SA_PERMISSION;
  PA_PERMISSION: string = PA_PERMISSION;
  PG_PERMISSION: string = PG_PERMISSION;
  isDashboard: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private location: Location,
    private userApi: UserApi,
  ) {
    this.userApi.defaultHeaders.append('Content-Type', 'application/json');
    this.userApi.defaultHeaders.append('Accept', 'application/json');
  }

  changeDropdownVisibility() {
    this.isDashboard.next(this.location.path().includes('dashboard'));
  }

  getCurrentRole() {
    return this.currentRole;
  }

  getPermission() {
    switch (this.currentRole) {
      case '400':
        return PM_PERMISSION;
      case '300':
        return SA_PERMISSION;
      case '200':
        return PA_PERMISSION;
      case '100':
        return PG_PERMISSION;
      default:
        break;
    }
  }

  changeRole(roleParam: string) {
    this.currentRole = roleParam;
  }

  logIn(credentials: Credentials): Observable<JWT> {
    return this.userApi.userLogin(credentials).map((response: JWT) => {
      localStorage.setItem('token', response.id);
      return response;
    });
  }

  logOut() {
    Cookie.delete('JWT');
    localStorage.removeItem('token');
    localStorage.removeItem('menuList');
  }

  isLoggedIn(): boolean {
    let jwt: JWT = JSON.parse(Cookie.get('JWT'));
    if (jwt) {
      return true;
    }
    return false;
  }

  getUserInformation(): Observable<User> {
    let jwt: JWT = JSON.parse(Cookie.get('JWT'));
    this.setAuthHeaders();
    return this.userApi.userFindById(jwt.userId.toString()).map((response: User) => {
      return response;
    });
  }

  setAuthHeaders() {
    let jwt: JWT = JSON.parse(Cookie.get('JWT'));
    if (!this.userApi.defaultHeaders.has('Authorization')) {
      this.userApi.defaultHeaders.append('Authorization', `${jwt.id}`);
    }
    return;
  }

}
