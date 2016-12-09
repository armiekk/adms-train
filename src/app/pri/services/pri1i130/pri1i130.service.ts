import { Injectable } from '@angular/core';
import { PritSystemsApi } from '../../api/api/PritSystemsApi';
import { PritSystems, ProjSystemsBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjSystems extends ProjSystemsBean {
  edit?: boolean;
}

@Injectable()
export class Pri1i130Service {

  constructor(private pritSystemsApi: PritSystemsApi) { }

  getProjSystemsList(projCode: string): Observable<ProjSystems[]>{
    return this. pritSystemsApi.getProjSystemsList(projCode)
      .map((projSystemsList: ProjSystemsBean[]) =>
        projSystemsList.map((projSystems: ProjSystemsBean) => Object.assign({}, projSystems, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritSystemsApi.defaultHeaders.has('Authorization')) {
      this.pritSystemsApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritSystemsApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritSystemsApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
