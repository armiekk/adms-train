import { Injectable, OnInit } from '@angular/core';
import { UserApi } from '../../api/cdgs-authorize-services/api/api';
import { FwMenuBean, FwRoleBean, FwActiveRoleBean, FwNodeBean } from '../../api/cdgs-authorize-services/model/models';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

interface Program {
  name: string;
  id: number;
  subProgram?: Array<SubProgram>;
}

interface SubProgram {
  name: string;
  subProgramId: string;
  uri: string;
}

@Injectable()
export class AdmsMenuService implements OnInit {

  private menuList: Array<FwNodeBean>;

  constructor(private userApi: UserApi) {
  }

  ngOnInit() {
    if (sessionStorage.getItem('menuList')) {
      this.menuList = JSON.parse(sessionStorage.getItem('menuList'));
    }
  }

  getMenuByActiveRole(): Observable<FwMenuBean[]> {
    this.setHeaders();
    return this.activeRole().switchMap((activatedRole: FwActiveRoleBean) =>
      this.userApi.menuUserRoleroleIdGet(activatedRole.roleId).map((menuList: FwMenuBean[]) => menuList));
  }

  activeRole(): Observable<FwActiveRoleBean> {
    return this.userApi.roleUserGet()
      .switchMap((userRole: FwRoleBean[]) => this.userApi.roleActiveroleIdPut(userRole[1].id).map((activatedRole: FwActiveRoleBean) => activatedRole));
  }

  getNavLink() {
    return JSON.parse(sessionStorage.getItem('menuList'))
      .filter((node: FwNodeBean) => node.type === 'f' && node.parent === null)
      .map((node: FwNodeBean) => { return { name: node.name, uri: node.uri } });
  }

  getMenuListByParentId(parentName: string) {
    let retList: Array<Program> = [];
    let [parentId] = this.getSystemId(parentName);
    return this.menuList
      .filter((node: FwNodeBean) => node.parent.id === parentId)
      .forEach((node: FwNodeBean) => {
        if (node.type === 'f' && node.parent !== null) {
          retList.push({ name: node.name, id: node.id, });
        }
      });
  }

  getProgramList(parentMenuList: Array<FwNodeBean>, parentId: number): Array<Program>{
    return parentMenuList.filter((node: FwNodeBean) =>
      node.type === 'f' &&
      node.parent !== null &&
      node.parent.id === parentId)
      .map((node: FwNodeBean) => { return { name: node.name, id: node.id } });
  }



  getSubProgramList(parentMenuList: Array<FwNodeBean>, parentId: number): Array<SubProgram> {
    return parentMenuList.filter((node: FwNodeBean) =>
      node.type === 'p' &&
      node.parent !== null &&
      node.parent.id === parentId &&
      node.uri !== 'type=t')
      .map((node: FwNodeBean) => { return { name: node.name, subProgramId: node.program.programId, uri: `../${node.program.programId}` } });
  }

  getSystemId(parentName: string) {
    return JSON.parse(sessionStorage.getItem('menuList'))
      .filter((node: FwNodeBean) => parentName.indexOf(node.uri) >= 0)
      .map((node: FwNodeBean) => node.id);
  }

  private setHeaders() {
    if (!this.userApi.defaultHeaders.has('Authorization')) {
      this.userApi.defaultHeaders.append('Content-Type', 'application/json');
      this.userApi.defaultHeaders.append('Authorization', 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJBZG1pbmlzdHJhdG9yIiwidXNlcklkIjo2LCJyb2xlSWQiOjE5MCwic2FsdCI6ImY2MGZiODg2LTFkZWMtNDNlOC05NDUyLWM2Y2ZkMjg1MjgwMCIsImlhdCI6MTQ3OTM1MDgyMn0.OLCDbfm-F_fuxrGPcpc8zSOnQemBBLwo2ID4W8XwyKVzOSlC2-hGb5lTues7IOohg3a0m78nTu2uHKVlPcMITg');
      this.userApi.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
