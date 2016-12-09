import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const PM_PERMISSION: string = 'CRUDB';
const SA_PERMISSION: string = 'CRUB';
const PA_PERMISSION: string = 'CRU';
const PG_PERMISSION: string = 'R';

@Injectable()
export class RoleManagementService {
  
  private currentRole: string ='400';

  PM_PERMISSION: string = PM_PERMISSION;
  SA_PERMISSION: string = SA_PERMISSION;
  PA_PERMISSION: string = PA_PERMISSION;
  PG_PERMISSION: string = PG_PERMISSION;
  isDashboard: BehaviorSubject<boolean> = new BehaviorSubject(false);
  tokenHolder: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('token'));

  constructor(private location: Location) {

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

}
