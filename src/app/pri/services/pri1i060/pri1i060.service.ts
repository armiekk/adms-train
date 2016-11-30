import { Injectable } from '@angular/core';
import { PritLimitApi } from '../../api/pri1i060/api/api';
import { PritLimit } from '../../api/pri1i060/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjLimit extends PritLimit {
  edit?: boolean;
}

@Injectable()
export class Pri1i060Service {

  constructor(private pritLimitApi: PritLimitApi) { }

  getProjLimitList(projCode: string): Observable<ProjLimit[]>{
    return this. pritLimitApi.pritLimitFind()
      .map((projLimitList: PritLimit[]) =>
        projLimitList.filter((projLimit: PritLimit) => Object.assign({}, projLimit, { edit: false })
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
