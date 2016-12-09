import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserManagementService } from '../../services/user-management/user-management.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private userManagementService: UserManagementService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(this.userManagementService.isLoggedIn()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
    
  }


}
