import { Injectable } from '@angular/core';
import { PritConditionApi } from '../../api/api/PritConditionApi';
import { PritCondition, ProjConditionBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjCondition extends ProjConditionBean {
  edit?: boolean;
}

@Injectable()
export class Pri1i040Service {

  constructor(private pritConditionApi: PritConditionApi) { }

  getProjConditionList(projCode: string): Observable<ProjCondition[]> {
    return this.pritConditionApi.getProjConditionList(projCode)
      .map((projConditionList: ProjConditionBean[]) =>
        projConditionList.map((projCondition: ProjConditionBean) => Object.assign({}, projCondition, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritConditionApi.defaultHeaders.has('Authorization')) {
      this.pritConditionApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritConditionApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritConditionApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
