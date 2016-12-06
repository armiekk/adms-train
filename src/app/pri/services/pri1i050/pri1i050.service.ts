import { Injectable } from '@angular/core';
import { PritDeliverApi } from '../../api/api/PritDeliverApi';
import { PritDeliver, ProjDeliverBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjDeliver extends ProjDeliverBean {
  edit?: boolean;
}

@Injectable()
export class Pri1i050Service {

  constructor(private pritDeliverApi: PritDeliverApi) { }

  getProjDeliverList(projCode: string): Observable<ProjDeliver[]> {
    return this.pritDeliverApi.getProjDeliverList(projCode)
      .map((projDeliverList: ProjDeliverBean[]) =>
        projDeliverList.map((projDeliver: ProjDeliverBean) => Object.assign({}, projDeliver, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritDeliverApi.defaultHeaders.has('Authorization')) {
      this.pritDeliverApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritDeliverApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritDeliverApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
