import { Injectable } from '@angular/core';
// import { PritRiskAnalystApi } from '../../api/api/PritRiskAnalystApi';
// import { PritRiskAnalyst } from '../../api/model/models';
import { Observable } from 'rxjs/Observable';

// export interface ProjRiskAnalyst extends PritRiskAnalyst {
//   edit?: boolean;
// }

@Injectable()
export class Pri1i140Service {

  // constructor(private pritRiskAnalystApi: PritRiskAnalystApi) { }

  // getProjRiskAnalystList(projCode: string): Observable<ProjRiskAnalyst[]>{
  //   return this. pritRiskAnalystApi.pritRiskAnalystFind()
  //     .map((projRiskAnalystList: PritRiskAnalyst[]) =>
  //       projRiskAnalystList.filter((projRiskAnalyst: PritRiskAnalyst) => Object.assign({}, projRiskAnalyst, { edit: false })
  //       )
  //     );
  // }

  // private setHeaders() {
  //   if (!this.pritRiskAnalystApi.defaultHeaders.has('Authorization')) {
  //     this.pritRiskAnalystApi.defaultHeaders.append('Content-Type', 'application/json');
  //     this.pritRiskAnalystApi.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
  //     this.pritRiskAnalystApi.defaultHeaders.append('Accept', 'application/json');
  //   }
  //   return;
  // }

}
