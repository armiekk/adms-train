import { Injectable } from '@angular/core';
import { PritAccessoriesApi } from '../../api/api/PritAccessoriesApi';
import { PritAccessories, ProjAccessoriesBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjAccessories extends ProjAccessoriesBean {
  edit?: boolean;
}

@Injectable()
export class Pri1i090Service {

  constructor(private pritAccessoriesApi: PritAccessoriesApi) { }

  getProjAccessoriesList(projCode: string): Observable<ProjAccessories[]>{
    return this. pritAccessoriesApi.getProjAccessoriesList(projCode)
      .map((projAccessoriesList: ProjAccessoriesBean[]) =>
        projAccessoriesList.map((projAccessories: ProjAccessoriesBean) => Object.assign({}, projAccessories, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritAccessoriesApi.defaultHeaders.has('Authorization')) {
      this.pritAccessoriesApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritAccessoriesApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritAccessoriesApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
