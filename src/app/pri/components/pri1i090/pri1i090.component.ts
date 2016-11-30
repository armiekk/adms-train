import { Component, OnInit } from '@angular/core';
import { Pri1i090Service, ProjAccessories } from '../../services/pri1i090/pri1i090.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i090',
  templateUrl: './pri1i090.component.html',
  styleUrls: ['./pri1i090.component.css'],
  providers: [Pri1i090Service]
})
export class Pri1i090Component implements OnInit {

  private projAccessoriesList: ProjAccessories[] = [];
  private selectedProjAccessories: ProjAccessories[] = [];

  constructor(
    private projAccessoriesService: Pri1i090Service, 
    private state: StateService,
    ) { }

  ngOnInit() {
    this.projAccessoriesService.getProjAccessoriesList(this.state.projCode)
          .subscribe((projAccessoriesList) => this.projAccessoriesList = projAccessoriesList);
  }

  addProjAccessoriesRowData(){
    let dummyRow: ProjAccessories = { edit: false };
    this.projAccessoriesList = [  dummyRow, ...this.projAccessoriesList];
  }

  editProjAccessoriesRow(index: number){
    this.projAccessoriesList[index].edit = true;
  }

  saveEditedProjAccessoriesRow(projAccessories: any, index: number){
    this.projAccessoriesList.splice(index, projAccessories);
    this.projAccessoriesList[index].edit = false;
  }

  cancelEditedProjAccessoriesRow(index: number){
    this.projAccessoriesList[index].edit = false;
  }

}
