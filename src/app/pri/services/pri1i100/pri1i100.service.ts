import { Injectable } from '@angular/core';
import { PritTrainApi } from '../../api/pri1i100/api/api';
import { PritTrain } from '../../api/pri1i100/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjTrain extends PritTrain {
  edit?: boolean;
}

@Injectable()
export class Pri1i100Service {

  constructor(private pritTrainApi: PritTrainApi) { }

  getProjTrainList(projCode: string): Observable<ProjTrain[]>{
    return this. pritTrainApi.pritTrainFind()
      .map((projTrainList: PritTrain[]) =>
        projTrainList.filter((projTrain: PritTrain) => Object.assign({}, projTrain, { edit: false })
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
