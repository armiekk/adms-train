import { Component, OnInit } from '@angular/core';
import { PritScopeApi } from '../../api/pri-scope/api/PritScopeApi';
import { PritScope } from '../../api/pri-scope/model/PritScope';
import { Pri1i020Service } from '../../services/pri1i020/pri1i020.service';
import { StateService } from '../../../shared/services/state/state.service';

class GenericObject<T> {
  edit: boolean;
}

@Component({
  selector: 'app-pri1i020',
  templateUrl: './pri1i020.component.html',
  styleUrls: ['./pri1i020.component.css'],
  providers: [Pri1i020Service]
})
export class Pri1i020Component implements OnInit {

  private projScopeList: Array<any> = [];

  constructor(private priScopeService: Pri1i020Service, private state: StateService) { }

  ngOnInit() {
    this.priScopeService.getPritScopeList(this.state.projCode)
          .subscribe((projScopeList) => {this.projScopeList = projScopeList; console.log(projScopeList)});
  }

  editRow(index: number){
    this.projScopeList[index].edit = true;
  }

  saveEditedRow(projScope: any, index: number){
    this.projScopeList.splice(index, projScope);
    this.projScopeList[index].edit = false;
  }

  cancelEditedRow(index: number){
    this.projScopeList[index].edit = false;
  }

}
