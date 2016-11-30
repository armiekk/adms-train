import { Injectable } from '@angular/core';
import { PritOtherApi } from '../../api/pri1i110/api/api';
import { PritOther } from '../../api/pri1i110/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjOther extends PritOther {
  edit?: boolean;
}

@Injectable()
export class Pri1i110Service {

  constructor(private pritOtherApi: PritOtherApi) { }

  getProjOtherList(projCode: string): Observable<ProjOther[]>{
    return this. pritOtherApi.pritOtherFind()
      .map((projOtherList: PritOther[]) =>
        projOtherList.filter((projOther: PritOther) => Object.assign({}, projOther, { edit: false })
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
