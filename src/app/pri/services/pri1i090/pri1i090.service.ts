import { Injectable } from '@angular/core';
import { PritAccessoriesApi } from '../../api/pri1i090/api/api';
import { PritAccessories } from '../../api/pri1i090/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjAccessories extends PritAccessories {
  edit?: boolean;
}

@Injectable()
export class Pri1i090Service {

  constructor(private pritAccessoriesApi: PritAccessoriesApi) { }

  getProjAccessoriesList(projCode: string): Observable<ProjAccessories[]>{
    return this. pritAccessoriesApi.pritAccessoriesFind()
      .map((projAccessoriesList: PritAccessories[]) =>
        projAccessoriesList.filter((projAccessories: PritAccessories) => Object.assign({}, projAccessories, { edit: false })
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
