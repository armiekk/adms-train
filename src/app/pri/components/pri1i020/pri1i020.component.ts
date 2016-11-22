import { Component, OnInit } from '@angular/core';
import { PritScopeApi } from '../../api/pri-scope/api/PritScopeApi';
import { PritScope } from '../../api/pri-scope/model/PritScope';

class GenericObject<T> {
  edit: boolean;
}

@Component({
  selector: 'app-pri1i020',
  templateUrl: './pri1i020.component.html',
  styleUrls: ['./pri1i020.component.css'],
  providers: [PritScopeApi]
})
export class Pri1i020Component implements OnInit {

  private projScopeList: Array<any> = [];

  constructor(private priScopeService: PritScopeApi) { }

  ngOnInit() {
    this.priScopeService.pritScopeFind()
          .map((response: PritScope[]) => 
             response.map((pritScope: PritScope) => {
               return {
                 projCode: pritScope.projCode,
                 projScopeDetail: pritScope.scoreDetail,
                 edit: false
               }
             })
          )
          .subscribe((response) => this.projScopeList = response);
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
