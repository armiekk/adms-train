import { Injectable } from '@angular/core';
import { PritDeliverApi } from '../../api/pri1i050/api/api';
import { PritDeliver } from '../../api/pri1i050/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjDeliver extends PritDeliver {
  edit?: boolean;
}

@Injectable()
export class Pri1i050Service {

  constructor(private pritDeliverApi: PritDeliverApi) { }

  getProjDeliverList(projCode: string): Observable<ProjDeliver[]> {
    return this.pritDeliverApi.pritDeliverFind()
      .map((projDeliverList: PritDeliver[]) =>
        projDeliverList.filter((projDeliver: PritDeliver) => Object.assign({}, projDeliver, { edit: false })
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
