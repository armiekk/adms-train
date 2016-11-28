import { Injectable } from '@angular/core';
import { PritDeliverApi } from '../../api/pri1i050/api/api';
import { PritDeliver } from '../../api/pri1i050/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjDeliver extends PritDeliver {
  edit?: boolean;
}

@Injectable()
export class Pri1i050Service {

  constructor(private PritDeliverApi: PritDeliverApi) { }

  getProjDeliverList(projCode: string): Observable<ProjDeliver[]> {
    return this.PritDeliverApi.pritDeliverFind()
      .map((projDeliverList: PritDeliver[]) =>
        projDeliverList.filter((projDeliver: PritDeliver) => Object.assign({}, projDeliver, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.PritDeliverApi.defaultHeaders.has('Authorization')) {
      this.PritDeliverApi.defaultHeaders.append('Content-Type', 'application/json');
      this.PritDeliverApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.PritDeliverApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
