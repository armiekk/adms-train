import { Injectable } from '@angular/core';
import { PritSystemsApi } from '../../api/pri1i130/api/api';
import { PritSystems } from '../../api/pri1i130/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjSystems extends PritSystems {
  edit?: boolean;
}

@Injectable()
export class Pri1i130Service {

  constructor(private pritSystemsApi: PritSystemsApi) { }

  getProjSystemsList(projCode: string): Observable<ProjSystems[]>{
    return this. pritSystemsApi.pritSystemsFind()
      .map((projSystemsList: PritSystems[]) =>
        projSystemsList.filter((projSystems: PritSystems) => Object.assign({}, projSystems, { edit: false })
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
