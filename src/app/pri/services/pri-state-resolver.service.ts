import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
// import { PritInformation } from '../api/pri-information';
import { ApipriinformationApi } from '../api/pri-information/api/ApipriinformationApi';
import { PritInformationApi } from '../../shared/api/mockup-prit-information-service/api/PritInformationApi';
import { PritInformation } from '../../shared/api/mockup-prit-information-service/model/PritInformation';
import { StateService } from '../../shared/services/state/state.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PriStateResolverService implements Resolve<PritInformation> {

  constructor(
    private pritInfoService: PritInformationApi,
    private priService: ApipriinformationApi,
    private router: Router,
    private state: StateService
  ) { }

  resolve(route: ActivatedRouteSnapshot): Observable<PritInformation> | boolean {
    let id: string;
    let pritInformation: PritInformation;
    if (id = route.params['id']) {
      this.state.mode = 'EDIT';
      this.setHeaders();
      // return this.priService.getPritInformation(id).map((response: PritInformation) => {
      //   return pritInformation = Object.assign(
      //     {},
      //     pritInformation,
      //     response,
      //     {
      //       projStartDate: new Date(response.projStartDate),
      //       projStopDate: new Date(response.projStopDate),
      //     });
      // });
      return this.pritInfoService.pritInformationFindById(id).map((response: PritInformation) => {
        return pritInformation = Object.assign(
          {},
          pritInformation,
          response,
          {
            projStartDate: new Date(response.projStartDate),
            projStopDate: new Date(response.projStopDate),
          });
      });
    } else {
      this.router.navigate(['/pri/search']);
      return false;
    }
  }

  // setHeaders() {
  //   if (!this.priService.defaultHeaders.has('Authorization')) {
  //     this.priService.defaultHeaders.append('Content-Type', 'application/json');
  //     this.priService.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
  //     this.priService.defaultHeaders.append('Accept', 'application/json');
  //   }
  //   return;
  // }

  setHeaders() {
    if (!this.pritInfoService.defaultHeaders.has('Authorization')) {
      this.pritInfoService.defaultHeaders.append('Content-Type', 'application/json');
      this.pritInfoService.defaultHeaders.append('Authorization', `${sessionStorage.getItem('token')}`);
      this.pritInfoService.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }
}
