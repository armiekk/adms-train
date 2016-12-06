import { Injectable } from '@angular/core';
import { PritOtherApi } from '../../api/api/PritOtherApi';
import { PritOther, ProjOtherBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjOther extends ProjOtherBean {
  edit?: boolean;
}

@Injectable()
export class Pri1i110Service {

  constructor(private pritOtherApi: PritOtherApi) { }

  getProjOtherList(projCode: string): Observable<ProjOther[]> {
    return this.pritOtherApi.getProjOtherList(projCode)
      .map((projOtherList: ProjOtherBean[]) =>
        projOtherList.map((projOther: ProjOtherBean) => Object.assign({}, projOther, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritOtherApi.defaultHeaders.has('Authorization')) {
      this.pritOtherApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritOtherApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritOtherApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
