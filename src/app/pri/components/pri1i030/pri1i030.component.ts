import { Component, OnInit } from '@angular/core';
import { Pri1i030Service, ProjLanguage, ProjMethod, ProjTools } from '../../services/pri1i030/pri1i030.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i030',
  templateUrl: './pri1i030.component.html',
  styleUrls: ['./pri1i030.component.css'],
  providers: [Pri1i030Service]
})
export class Pri1i030Component implements OnInit {

  // projLanguage properties
  private projLanguageList: ProjLanguage[] = [];
  private selectedProjLanguage: ProjLanguage[] = [];

  // projMethod properties
  private projMethodList: ProjMethod[] = [];
  private selectedProjMethod: ProjMethod[] = [];

  // projTools properties
  private projToolsList: ProjTools[] = [];
  private selectedProjTools: ProjTools[] = [];


  constructor(private pri1i030Service: Pri1i030Service, private state: StateService)
  { }

  ngOnInit() {
    this.pri1i030Service.getProjSDEList(this.state.projCode)
      .subscribe((response: {
        projLanguageList: ProjLanguage[],
        projMethodList: ProjMethod[],
        projToolsList: ProjTools[]
      }) => {
        this.projLanguageList = response.projLanguageList;
        this.projMethodList = response.projMethodList;
        this.projToolsList = response.projToolsList;
      });
  }

  // projLanguage Method

  addProjLanguageRowData() {
    let dummyRow: ProjLanguage = { edit: false };
    this.projLanguageList = [dummyRow, ...this.projLanguageList];
  }

  editProjLanguageRow(index: number) {
    this.projLanguageList[index].edit = true;
  }

  saveEditedProjLanguageRow(projScope: any, index: number) {
    this.projLanguageList.splice(index, projScope);
    this.projLanguageList[index].edit = false;
  }

  cancelEditedProjLanguageRow(index: number) {
    this.projLanguageList[index].edit = false;
  }

  // projMethod method 

  addProjMethodRowData() {
    let dummyRow: ProjMethod = { edit: false };
    this.projMethodList = [dummyRow, ...this.projMethodList];
  }

  editProjMethodRow(index: number) {
    this.projMethodList[index].edit = true;
  }

  saveEditedProjMethodRow(projScope: any, index: number) {
    this.projMethodList.splice(index, projScope);
    this.projMethodList[index].edit = false;
  }

  cancelEditedProjMethodRow(index: number) {
    this.projMethodList[index].edit = false;
  }

  // projTools method

  addProjToolsRowData() {
    let dummyRow: ProjTools = { edit: false };
    this.projToolsList = [dummyRow, ...this.projToolsList];
  }

  editProjToolsRow(index: number) {
    this.projToolsList[index].edit = true;
  }

  saveEditedProjToolsRow(projScope: any, index: number) {
    this.projToolsList.splice(index, projScope);
    this.projToolsList[index].edit = false;
  }

  cancelEditedProjToolsRow(index: number) {
    this.projToolsList[index].edit = false;
  }
}
