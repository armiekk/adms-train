import { Component, OnInit } from '@angular/core';
import { Pri1i020Service, ProjScope, ProjScopeAddBean, initProjScope, ProjScopeBean } from '../../services/pri1i020/pri1i020.service';
import { StateService } from '../../../shared/services/state/state.service';


@Component({
  selector: 'app-pri1i020',
  templateUrl: './pri1i020.component.html',
  styleUrls: ['./pri1i020.component.css'],
  providers: [Pri1i020Service]
})
export class Pri1i020Component implements OnInit {

  private projScope: ProjScope = initProjScope;

  private projScopeList: ProjScope[] = [];
  private selectedProjScope: ProjScope[] = [];
  private text: string = "";

  constructor(private priScopeService: Pri1i020Service, private state: StateService) { }

  ngOnInit() {
    // this.priScopeService.getPritScopeListByProjCode(this.state.projCode)
    //       .subscribe((projScopeList: ProjScope[]) => this.projScopeList = projScopeList);

    this.priScopeService.getPritScopeListByProjCode(this.state.projCode)
      .subscribe((projScopeList: ProjScope[]) => {
        if (projScopeList.length > 0) {
          [this.projScope] = projScopeList;
        }
      });

  }

  addRowData() {
    let dummyRow: ProjScope = { edit: false };
    this.projScopeList = [dummyRow, ...this.projScopeList];
  }

  addProjScope() {
    this.projScope.edit = true;
    this.projScope.scoreDetail = '';
  }

  editProjScope() {
    this.projScope.edit = true;
  }

  saveProjScope() {
    if (!this.projScope.projScopeRef) {
      let projScopeAddBean: ProjScopeAddBean = { projCode: this.state.projCode, scoreDetail: this.projScope.scoreDetail };
      this.priScopeService.savePritScope(projScopeAddBean)
        .subscribe((projScope: ProjScope[]) => [this.projScope] = projScope);
    } else {
      let projScopeBean: ProjScopeBean = {
        projScopeRef: this.projScope.projScopeRef, 
        scoreDetail: this.projScope.scoreDetail,
        updateDate: new Date()
      };
      this.priScopeService.updatePritScope(projScopeBean, this.state.projCode)
        .subscribe((projScope: ProjScope[]) => [this.projScope] = projScope);
    }
    this.projScope.edit = false;
    this.projScope.projScopeRef = 1;
  }

  editRow(index: number) {
    this.projScopeList[index].edit = true;
  }

  saveEditedRow(projScope: any, index: number) {
    this.projScopeList.splice(index, projScope);
    this.projScopeList[index].edit = false;
  }

  cancelEditedRow(index: number) {
    this.projScopeList[index].edit = false;
  }

}
