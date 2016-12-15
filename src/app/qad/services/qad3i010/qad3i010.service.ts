import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface AuditDetail {
  auditDate?: Date;
  auditType?: string;
  auditStatus?: string;
}

export interface ChecklistDetail {
  documentType?: string;
  systemCode?: string;
  auditStartDate?: Date;
  auditType?: string;
  auditRound?: number;
  auditEndDate?: Date;
  qaName?: string;
  responsible?: string;
}

export interface ProjInfomation {
  projCode?: string;
  projName?: string;
}

export interface SystemCode {
  projCode: string
  systemAbbr: string;
  systemName: string;
}

export interface QaName {
  thainame: string;
  depcde: string;
  jobbandid: string;
  jobbandname: string;
  emplev: string;
  jobgrade: number;
}

@Injectable()
export class Qad3i010Service {

  constructor(private http: Http) { }

  getProjectInformation(): Observable<ProjInfomation[]>{
    return this.http.get('../app/qad/resources/data/qad3i010/projectInformation.json')
      .map((response: Response) => response.json());
  }

  getSystemCode(projCode: string): Observable<SystemCode[]> {
    return this.http.get('../app/qad/resources/data/qad3i010/SystemCode.json')
      .map((response: Response) => response.json())
      .map((systemCodeList: SystemCode[]) => 
        systemCodeList.filter((systemCode: SystemCode) => systemCode.projCode === projCode)
      );
  }

  getQaName(): Observable<QaName[]> {
    return this.http.get('../app/qad/resources/data/qad3i010/qa_name.json')
      .map((response: Response) => response.json());
  }

}
