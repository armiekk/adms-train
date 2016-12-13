import { Component, OnInit } from '@angular/core';
import { AdmsMenuService, Program } from '../../../shared/services/adms-menu/adms-menu.service';

export interface ProgramDetail {
  id?: string;
  name?: string;
  uri?: string;
  moduleName?: string;
  subProgram?: Array<{ id: string, name: string, uri: string }>;
}

@Component({
  selector: 'app-qad-dashboard-container',
  templateUrl: './qad-dashboard-container.component.html',
  styleUrls: ['./qad-dashboard-container.component.css']
})
export class QadDashboardContainerComponent implements OnInit {

  programList: Program[];
  todoListData: Array<{}>;

  constructor(private admsMenuService: AdmsMenuService) { }

  ngOnInit() {
    this.programList = this.admsMenuService.getProgramList(this.admsMenuService.getParentNodeId());
    console.log(this.programList);
    this.todoListData = [
      {
        system: 'QAD',
        tasks: [
        ]
      }
    ];
  }

}
