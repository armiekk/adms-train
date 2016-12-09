import { Injectable } from '@angular/core';
import { PritLimitApi } from '../../api/api/PritLimitApi';
import { PritLimit, ProjLimitBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjLimit extends ProjLimitBean {
  edit?: boolean;
}

@Injectable()
export class Pri1i060Service {

  constructor(private pritLimitApi: PritLimitApi) { }

  getProjLimitList(projCode: string): Observable<ProjLimit[]>{
    return this. pritLimitApi.getProjLimitList(projCode)
      .map((projLimitList: ProjLimitBean[]) =>
        projLimitList.map((projLimit: ProjLimitBean) => Object.assign({}, projLimit, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritLimitApi.defaultHeaders.has('Authorization')) {
      this.pritLimitApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritLimitApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritLimitApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
