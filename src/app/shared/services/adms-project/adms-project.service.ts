import { Injectable } from '@angular/core';
import { PritInformationApi } from '../../../pri/api/api/PritInformationApi';
import { PritInformation, ProjectInformationInfoBean } from '../../../pri/api/model/models';
import { Observable } from 'rxjs/Observable';

export interface SearchCondition {
  projYear?: number;
  projOrgCode?: string;
  projCode?: string;
  projType?: string;
  projName?: string;
  projStatus?: string;
  start: number;
  size: number;
};

export { PritInformation } from '../../../pri/api/model/models';

@Injectable()
export class AdmsProjectService {

  constructor(private priService: PritInformationApi) { }

  getPritInformationByProjCode(condition: SearchCondition): Observable<ProjectInformationInfoBean[]> {
    return this.getProjectInformationByCondition(condition);
  }

  getProjectInformationByCondition(condition: SearchCondition): Observable<ProjectInformationInfoBean[]> {
    this.setHeaders();
    return this.priService.getProjectInformationListByCondition(condition.start, condition.size, condition.projCode,
      condition.projYear, condition.projOrgCode, condition.projType,
      condition.projName, condition.projStatus)
      .map((response: ProjectInformationInfoBean[]) => response);
  }

  private setHeaders() {
    if (!this.priService.defaultHeaders.has('Authorization')) {
      this.priService.defaultHeaders.append('Content-Type', 'application/json');
      this.priService.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.priService.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
