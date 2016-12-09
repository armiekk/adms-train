import { Injectable } from '@angular/core';
import { PritTrainApi } from '../../api/api/PritTrainApi';
import { PritTrain, ProjTrainBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjTrain extends ProjTrainBean {
  edit?: boolean;
}

@Injectable()
export class Pri1i100Service {

  constructor(private pritTrainApi: PritTrainApi) { }

  getProjTrainList(projCode: string): Observable<ProjTrain[]>{
    return this. pritTrainApi.getProjTrainList(projCode)
      .map((projTrainList: ProjTrainBean[]) =>
        projTrainList.map((projTrain: ProjTrainBean) => Object.assign({}, projTrain, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritTrainApi.defaultHeaders.has('Authorization')) {
      this.pritTrainApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritTrainApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritTrainApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
