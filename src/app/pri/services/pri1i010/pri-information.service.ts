import { Injectable } from '@angular/core';
import { PritInformationApi } from '../../../shared/api/mockup-prit-information-service/api/PritInformationApi';
import { PritInformation } from '../../../shared/api/mockup-prit-information-service/model/models';
import { Observable } from 'rxjs/Observable';

export interface SearchCondition {
  projYear?: string;
  projOwnerOrg?: string;
  projCode?: string;
  projType?: number;
  projName?: string;
  projStatus?: Array<number>;
}

export { PritInformation } from '../../../shared/api/mockup-prit-information-service/model/models';

export const initialPritInformaiton: PritInformation = {
  projCode: null,
  projName: null
};

export const initialPritInformaitonDetail: PritInformation = {
  projYear: null,
  projOrgName: null,
  projStartDate: null,
  projStopDate: null,
  projDuration: null,
  projBudget: null,
  preSaleProjCode: null,
  projStatus: null
};

@Injectable()
export class PriInformationService {

  constructor(private priService: PritInformationApi) { }

  getPritInformationByProjCode(projCode: string): Observable<PritInformation[]> {
    this.setHeaders();
    return this.priService.pritInformationFind()
      .map((pritInformationList: PritInformation[]) =>
        pritInformationList
          .filter((pritInformation: PritInformation) => pritInformation.projCode === projCode)
          .map((pritInformation: PritInformation) => {
            return {
              projCode: pritInformation.projCode,
              projName: pritInformation.projName
            }
          })
      );
  }

  getPritInformationDetail(projCode: string): Observable<PritInformation[]> {
    this.setHeaders();
    return this.priService.pritInformationFind()
      .map((pritInformationList: PritInformation[]) =>
        pritInformationList
          .filter((pritInformation: PritInformation) => pritInformation.projCode === projCode)
          .map((pritInformation: PritInformation) => {
            return {
              projYear: pritInformation.projYear,
              projOwnerOrg: pritInformation.projOrgName,
              projStartDate: pritInformation.projStartDate,
              projStopDate: pritInformation.projStopDate,
              projDuration: pritInformation.projDuration,
              projBudget: pritInformation.projBudget,
              preSaleProjCode: pritInformation.preSaleProjCode,
              projStatus: pritInformation.projStatus
            }
          })
      );
  }

  getAllProjectInformation(): Observable<PritInformation[]> {
    this.setHeaders();
    return this.priService.pritInformationFind()
      .map((response: PritInformation[]) => response);
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
