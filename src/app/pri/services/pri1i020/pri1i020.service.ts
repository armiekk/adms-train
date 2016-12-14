import { Injectable, Inject } from '@angular/core';
import { PritScopeApi } from '../../api/api/PritScopeApi';
import { PritScope, ProjScopeBean, ProjScopeAddBean } from '../../api/model/models';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface ProjScope extends ProjScopeBean {
  edit?: boolean;
}

export { ProjScopeAddBean, ProjScopeBean } from '../../api/model/models';

export const initProjScope: ProjScope = {
  projScopeRef: null,
  scoreDetail: null,
  updateDate: new Date(),
  edit: false
}

@Injectable()
export class Pri1i020Service {

  constructor(private priScopeService: PritScopeApi, private http: Http) {
    if (!this.priScopeService.defaultHeaders.get('Content-Type') ||
        !this.priScopeService.defaultHeaders.get('Accept')) {
      this.priScopeService.defaultHeaders.append('Content-Type', 'application/json');
      this.priScopeService.defaultHeaders.append('Accept', 'application/json');
    }
  }


  getPritScopeListByProjCode(projCode: string): Observable<ProjScope[]> {
    return this.priScopeService.getProjScopeList(projCode)
      .map((pritScopeList: ProjScopeBean[]) =>
        pritScopeList.map((pritScope: ProjScopeBean) => Object.assign({}, pritScope, { edit: false }))
      );

  }

  savePritScope(projScopeAddBean: ProjScopeAddBean): Observable<ProjScope[]> {
    return this.priScopeService.addProjScope(projScopeAddBean).switchMap((response: { projScopeRef: number }) => {
      if (response.projScopeRef) {
        return this.getPritScopeListByProjCode(projScopeAddBean.projCode);
      }
    });

  }

  updatePritScope(projScopeBean: ProjScopeBean, projCode: string): Observable<ProjScope[]> {
    return this.priScopeService.editProjScope(projScopeBean).switchMap((response: { projScopeRef: number }) => {
      if (response.projScopeRef) {
        return this.getPritScopeListByProjCode(projCode);
      }
    });
  }

  deletePritScope(projScopeRef: number): Observable<string> {
    // return this.priScopeService.removeProjScopeByRef(projScopeRef)
    //   .map();
    return;
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
