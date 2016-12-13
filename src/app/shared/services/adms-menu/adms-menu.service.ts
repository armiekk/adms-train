import { Injectable, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { UserApi } from '../../api/cdgs-authorize-services/api/api';
import { FwMenuBean, FwRoleBean, FwActiveRoleBean, FwNodeBean } from '../../api/cdgs-authorize-services/model/models';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface Program extends FwNodeBean {
  subProgram?: Array<FwNodeBean>;
}

export { FwNodeBean } from '../../api/cdgs-authorize-services/model/models';

@Injectable()
export class AdmsMenuService implements OnInit {

  private menuList: Array<FwNodeBean>;

  constructor(private userApi: UserApi, private location: Location) {
  }

  ngOnInit() {
    if (localStorage.getItem('menuList')) {
      this.menuList = JSON.parse(localStorage.getItem('menuList'));
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
    return JSON.parse(localStorage.getItem('menuList'))
      .filter((node: FwNodeBean) => node.type === 'f' && node.parent === null)
      .map((node: FwNodeBean) => { return { name: node.name, uri: node.uri } });
  }


  getProgramList(parentId: number): Program[] | FwNodeBean[] {
    let menuListData: FwNodeBean[] = JSON.parse(localStorage.getItem('menuList'));
    let programList: FwNodeBean[] = menuListData.filter((menuData: FwNodeBean) => {
      if (menuData.parent) {
        return menuData.type === 'f' && menuData.parent.id === parentId;
      }
    });
    if (programList.length > 0) {
      return this.getProgramListWithSubProgram(programList);
    } else {
      return this.getProgramWithoutSubProgram(menuListData, parentId);
    }
  }

  private getProgramWithoutSubProgram(menuListData: FwNodeBean[], parentId: number): FwNodeBean[] {
    return menuListData.filter((menuData: FwNodeBean) => {
      if (menuData.parent) {
        return menuData.type === 'p' && menuData.parent.id === parentId && menuData.uri !== 'type=t';
      }
    });
  }

  private getProgramListWithSubProgram(programList: FwNodeBean[]): Program[] {
    return programList.map((menuData: FwNodeBean) => {
      return Object.assign({}, menuData, { subProgram: this.getSubProgramList(menuData.id) });
    });
  }

  private getSubProgramList(programId: number): FwNodeBean[] {
    let menuListData: FwNodeBean[] = JSON.parse(localStorage.getItem('menuList'));
    return menuListData.filter((menuData: FwNodeBean) => {
      if (menuData.parent) {
        return menuData.type === 'p' && menuData.parent.id === programId;
      }
    });
  }

  getParentNodeId(): number {
    let menuListData: FwNodeBean[] = JSON.parse(localStorage.getItem('menuList'));
    let [parentNode]: FwNodeBean[] = menuListData.filter((menuData: FwNodeBean) => {
      return this.location.path().includes(menuData.uri);
    });
    return parentNode ? parentNode.id : null;
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
