import { Component, OnInit } from '@angular/core';
import { Pri1i080Service, ProjCustomer } from '../../services/pri1i080/pri1i080.service';
import { StateService } from '../../../shared/services/state/state.service';

@Component({
  selector: 'app-pri1i080',
  templateUrl: './pri1i080.component.html',
  styleUrls: ['./pri1i080.component.css'],
  providers: [Pri1i080Service]
})
export class Pri1i080Component implements OnInit {

  private projCustomerList: ProjCustomer[] = [];
  private selectedProjCustomer: ProjCustomer[] = [];

  constructor(
    private projCustomerService: Pri1i080Service, 
    private state: StateService,
    ) { }

  ngOnInit() {
    this.projCustomerService.getProjCustomerList(this.state.projCode)
          .subscribe((projCustomerList) => this.projCustomerList = projCustomerList);
  }

  addProjCustomerRowData(){
    let dummyRow: ProjCustomer = { edit: false };
    this.projCustomerList = [  dummyRow, ...this.projCustomerList];
  }

  editProjCustomerRow(index: number){
    this.projCustomerList[index].edit = true;
  }

  saveEditedProjCustomerRow(projCustomer: any, index: number){
    this.projCustomerList.splice(index, projCustomer);
    this.projCustomerList[index].edit = false;
  }

  cancelEditedProjCustomerRow(index: number){
    this.projCustomerList[index].edit = false;
  }

}
