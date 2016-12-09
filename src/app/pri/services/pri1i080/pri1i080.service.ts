import { Injectable } from '@angular/core';
import { PritCustomerApi } from '../../api/api/PritCustomerApi';
import { PritCustomer, ProjCustomerBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjCustomer extends PritCustomer {
  edit?: boolean;
}

@Injectable()
export class Pri1i080Service {

  constructor(private pritCustomerApi: PritCustomerApi) { }

  getProjCustomerList(projCode: string): Observable<ProjCustomerBean[]>{
    return this. pritCustomerApi.getProjCustomerList(projCode)
      .map((projCustomerList: ProjCustomerBean[]) =>
        projCustomerList.map((projCustomer: ProjCustomerBean) => Object.assign({}, projCustomer, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritCustomerApi.defaultHeaders.has('Authorization')) {
      this.pritCustomerApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritCustomerApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritCustomerApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
