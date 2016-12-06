import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserApi } from '../../api/mockup-user-service/api/UserApi';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private authService: UserApi, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let token: string = sessionStorage.getItem('token');
    if(token){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
    
  }


}
