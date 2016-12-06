import { Injectable, Inject } from '@angular/core';
import { PritScopeApi } from '../../api/api/PritScopeApi';
import { PritScope, ProjScopeBean, ProjScopeAddBean } from '../../api/model/models';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface ProjScope extends ProjScopeBean {
  edit?: boolean;
}

export { ProjScopeAddBean } from '../../api/model/models';

export const initProjScope: ProjScope = {
  projScopeRef: null,
  scoreDetail: null,
  updateDate: new Date(),
  edit: false
}

@Injectable()
export class Pri1i020Service {

  constructor(private priScopeService: PritScopeApi, private http: Http) {
  }


  getPritScopeListByProjCode(projCode: string): Observable<ProjScopeBean[]> {
    return this.priScopeService.getProjScopeList(projCode)
      .map((pritScopeList: ProjScopeBean[]) =>
        pritScopeList.map((pritScope: ProjScopeBean) => Object.assign({}, pritScope, { edit: false }))
      );

  }

  savePritScope(projScopeBean: ProjScopeAddBean): Observable<string> {
    return this.priScopeService.addProjScope(projScopeBean).map((status: string) => status);
  }

  getMockupPritScopeList(projCode: string): Observable<PritScope[]> {
    return this.http.get('app/pri/mockup/pri1i020/mockup.json')
      .map((response: Response) => response.json())
      .map((pritScopeList: PritScope[]) => pritScopeList.filter((pritScope: PritScope) => pritScope.projCode === projCode));
  }

  private setHeaders() {
    if (!this.priScopeService.defaultHeaders.has('Authorization')) {
      this.priScopeService.defaultHeaders.append('Content-Type', 'application/json');
      this.priScopeService.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.priScopeService.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }
}
