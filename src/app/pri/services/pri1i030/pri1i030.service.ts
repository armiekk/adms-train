import { Injectable } from '@angular/core';
import { PritLanguageApi, PritMethodApi, PritToolsApi } from '../../api/pri1i030/api/api';
import { PritInformation } from '../../api/pri1i010';
import { PritLanguage, PritMethod, PritTools } from '../../api/pri1i030/model/models';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Pri1i030Service {

  constructor(
    private pritLanguageApi: PritLanguageApi,
    private pritMethodApi: PritMethodApi,
    private pritToolsApi: PritToolsApi
  ) { }

  getProjLanguageList(projCode: string): Observable<PritLanguage[]> {
    return this.pritLanguageApi.pritLanguageFind()
      .map((projLanguageList: PritLanguage[]) =>
        projLanguageList.filter((projLanguage) => projLanguage.projCode === projCode));
  }

  getProjMethodList(projCode: string): Observable<PritMethod[]> {
    return this.pritMethodApi.pritMethodFind()
      .map((projMethodList: PritMethod[]) =>
        projMethodList.filter((projMethod) => projMethod.projCode === projCode));
  }

  getProjToolsList(projCode: string): Observable<PritTools[]> {
    return this.pritToolsApi.pritToolsFind()
      .map((projToolsList: PritTools[]) =>
        projToolsList.filter((projTools) => projTools.projCode === projCode));
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
