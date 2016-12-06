import { Injectable } from '@angular/core';
import { PritLanguageApi } from '../../api/api/PritLanguageApi';
import { PritMethodApi } from '../../api/api/PritMethodApi';
import { PritToolsApi } from '../../api/api/PritToolsApi';
import { 
  PritLanguage, 
  PritMethod, 
  PritTools, 
  ProjLanguageBean, 
  ProjMethodBean,
  ProjToolsBean
} from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjLanguage extends ProjLanguageBean {
  edit?: boolean;
}

export interface ProjMethod extends ProjMethodBean  {
  edit?: boolean;
}

export interface ProjTools extends ProjToolsBean {
  edit?: boolean;
}

@Injectable()
export class Pri1i030Service {

  constructor(
    private pritLanguageApi: PritLanguageApi,
    private pritMethodApi: PritMethodApi,
    private pritToolsApi: PritToolsApi
  ) { }

  getProjSDEList(projCode: string){
    return Observable.combineLatest(
      // async combine 3 observable and add edit property
      this.getProjLanguageList(projCode),
      this.getProjMethodList(projCode),
      this.getProjToolsList(projCode),
      // return combined result
      (projLanguageList: ProjLanguage[], projMethodList: ProjMethod[], projToolsList: ProjTools[] ) => {
          return {
            projLanguageList,
            projMethodList,
            projToolsList
          }
        }
    );
  }

  getProjLanguageList(projCode: string): Observable<ProjLanguage[]> {
    return this.pritLanguageApi.getProjLanguageList(projCode)
      .map((projLanguageList: ProjLanguageBean[]) =>
        projLanguageList.map((projLanguage: ProjLanguageBean) => Object.assign({}, projLanguage, { edit: false })));
  }

  getProjMethodList(projCode: string): Observable<ProjMethod[]> {
    return this.pritMethodApi.getProjMethodList(projCode)
      .map((projMethodList: ProjMethodBean[]) =>
        projMethodList.map((projMethod: ProjMethodBean) => Object.assign({}, projMethod, { edit: false })));
  }

  getProjToolsList(projCode: string): Observable<ProjTools[]> {
    return this.pritToolsApi.getProjToolsList(projCode)
      .map((projToolsList: ProjToolsBean[]) =>
        projToolsList.map((projTools: ProjToolsBean) => Object.assign({}, projTools, { edit: false })));
  }

  private setHeaders() {
    if (!this.pritLanguageApi.defaultHeaders.has('Authorization')) {
      this.pritLanguageApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritLanguageApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritLanguageApi.defaultHeaders.append('Accept', 'application/json');
    }
    if (!this.pritMethodApi.defaultHeaders.has('Authorization')) {
      this.pritMethodApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritMethodApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritMethodApi.defaultHeaders.append('Accept', 'application/json');
    }
    if (!this.pritToolsApi.defaultHeaders.has('Authorization')) {
      this.pritToolsApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritToolsApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritToolsApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }
}
