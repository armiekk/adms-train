import { Component, OnInit } from '@angular/core';

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

  programList: Array<ProgramDetail>;
  todoListData: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.programList = [
      {
        moduleName: 'QA PLAN',
        subProgram: [
          { name: 'Assign QA', id: 'QAD1I030', uri: '/qad/QAD1I030' },
          { name: 'QA Schedule and Plan', id: 'QAD1Q010', uri: '/qad/QAD1Q010' }
        ]
      },
      {
        moduleName: 'CMMI DOCUMENT',
        subProgram: [
          { name: 'CMMI Document', id: 'QAD2I010', uri: 'QAD2I010' },
          { name: 'CMMI Document History', id: 'QAD2Q010', uri: 'QAD2Q010' },
          { name: 'CMMI Document', id: 'QAD2R010', uri: 'QAD2R010' },
        ]
      },
      {
        moduleName: 'QA CHECKLIST',
        subProgram: [
          { name: 'QA Checklist', id: 'QAD3I010', uri: 'QAD3I010' },
          { name: 'Checklist Search', id: 'QAD3Q010', uri: 'QAD3Q010' },
          { name: 'CMMI Document', id: 'QAD3R010', uri: 'QAD3R010' },
        ]
      },
      {
        moduleName: 'Audit PROGRAMS',
        subProgram: [
          { name: 'Audit Programs', id: 'QAD4I010', uri: 'QAD4I010' },
          { name: 'Audit Programs Search', id: 'QAD4Q010', uri: 'QAD4Q010' },
          { name: 'CMMI Document', id: 'QAD4R010', uri: 'QAD4R010' },
        ]
      },
      {
        moduleName: 'QA REPORT',
        subProgram: [
          { name: 'Audit Programs', id: 'QAD2R010', uri: 'QAD2R010' },
          { name: 'Audit Programs Search', id: 'QAD2Q010', uri: 'QAD2Q010' },
          { name: 'QA Metrics', id: '', uri: '' },
          { name: 'QA Audit Project', id: '', uri: '' },
          { name: 'QA Summary Checklist', id: 'QAD3R010', uri: 'QAD3R010' },
        ]
      },
      {
        moduleName: 'QA MASTER',
        subProgram: [
          { name: 'QA MENU', id: '', uri: '' },
          { name: 'QA Activities', id: 'QAD0Q010', uri: 'QAD0Q010' },
          { name: 'Work Category', id: '', uri: '' },
          { name: 'CMMI Document (Document, BI)', id: '', uri: '' },
          { name: 'Checklist Details', id: '', uri: '' },
          { name: 'Work Product', id: '', uri: '' },
        ]
      }
    ];
    this.todoListData = [
      {
        system: 'QAD',
        tasks: [
        ]
      }
    ];
  }

}
