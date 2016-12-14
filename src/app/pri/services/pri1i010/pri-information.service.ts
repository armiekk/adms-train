import { Injectable } from '@angular/core';
import { PritInformationApi } from '../../api/api/PritInformationApi';
import { PritInformation, ProjectInformationInfoBean } from '../../api/model/models';
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

export { PritInformation, ProjectInformationInfoBean } from '../../api/model/models';

export const initialPritInformaiton: PritInformation = {
  projCode: null,
  projName: null
};

export const initialPritInformaitonDetail: PritInformation = {
  projContactNo: null,
  projYear: null,
  projOrgName: null,
  projStartDate: null,
  projStopDate: null,
  projWarrantyStartDate: null,
  projWarrantyStopDate: null,
  projDuration: null,
  projBudget: null,
  preSaleProjCode: null,
  projStatus: null
};

@Injectable()
export class PriInformationService {

  constructor(private priService: PritInformationApi) { }

  getPritInformationByProjCode(condition: SearchCondition): Observable<ProjectInformationInfoBean[]> {
    return this.getProjectInformationByCondition(condition);
  }

  getPritInformationDetail(projRef: number): Observable<PritInformation> {
    this.setHeaders();
    return this.priService.getProjectInformationByRef(projRef)
      .map((response: PritInformation) => response);
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
