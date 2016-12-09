import { Injectable } from '@angular/core';
import { PritMonitorApi } from '../../api/api/PritMonitorApi';
import { PritMonitor, ProjMonitorBean } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

export interface ProjMonitor extends PritMonitor {
  edit?: boolean;
}

@Injectable()
export class Pri1i070Service {

  constructor(private pritMonitorApi: PritMonitorApi) { }

  getProjMonitorList(projCode: string): Observable<ProjMonitor[]>{
    return this. pritMonitorApi.getProjMonitorList(projCode)
      .map((projMonitorList: ProjMonitorBean[]) =>
        projMonitorList.map((projMonitor: ProjMonitorBean) => Object.assign({}, projMonitor, { edit: false })
        )
      );
  }

  private setHeaders() {
    if (!this.pritMonitorApi.defaultHeaders.has('Authorization')) {
      this.pritMonitorApi.defaultHeaders.append('Content-Type', 'application/json');
      this.pritMonitorApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.pritMonitorApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
