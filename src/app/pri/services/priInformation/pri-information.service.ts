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

@Injectable()
export class PriInformationService {

  constructor(private priService: PritInformationApi) { }

  getPritInformationByProjCode(projCode: string): Observable<PritInformation[]>{
    this.setHeaders();
    return this.priService.pritInformationFind()
    .map((pritInformationList: PritInformation[]) => 
      pritInformationList.filter((pritInformation: PritInformation) => pritInformation.projCode === projCode)
    );
  }

  getAllProjectInformation(): Observable<PritInformation[]>{
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
