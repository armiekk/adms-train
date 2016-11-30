import { Component, OnInit } from '@angular/core';
import { Pri1i130Service, ProjSystems } from '../../services/pri1i130/pri1i130.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i130',
  templateUrl: './pri1i130.component.html',
  styleUrls: ['./pri1i130.component.css'],
  providers: [Pri1i130Service]
})
export class Pri1i130Component implements OnInit {

  private projSystemsList: ProjSystems[] = [];
  private selectedProjSystems: ProjSystems[] = [];

  constructor(
    private projSystemsService: Pri1i130Service, 
    private state: StateService,
    ) { }

  ngOnInit() {
    this.projSystemsService.getProjSystemsList(this.state.projCode)
          .subscribe((projSystemsList) => this.projSystemsList = projSystemsList);
  }

  addProjSystemsRowData(){
    let dummyRow: ProjSystems = { edit: false };
    this.projSystemsList = [  dummyRow, ...this.projSystemsList];
  }

  editProjSystemsRow(index: number){
    this.projSystemsList[index].edit = true;
  }

  saveEditedProjSystemsRow(projSystems: any, index: number){
    this.projSystemsList.splice(index, projSystems);
    this.projSystemsList[index].edit = false;
  }

  cancelEditedProjSystemsRow(index: number){
    this.projSystemsList[index].edit = false;
  }

}
