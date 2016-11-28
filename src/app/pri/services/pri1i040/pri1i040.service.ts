import { Injectable } from '@angular/core';
import { PritConditionApi } from '../../api/pri1i040/api/api';
import { PritCondition } from '../../api/pri1i040/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjCondition extends PritCondition {
  edit?: boolean;
}

@Injectable()
export class Pri1i040Service {

  constructor(private pritConditionApi: PritConditionApi) { }

  getProjConditionList(projCode: string): Observable<ProjCondition[]> {
    return this.pritConditionApi.pritConditionFind()
      .map((projConditionList: PritCondition[]) =>
        projConditionList.filter((projCondition: PritCondition) => Object.assign({}, projCondition, { edit: false })
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
