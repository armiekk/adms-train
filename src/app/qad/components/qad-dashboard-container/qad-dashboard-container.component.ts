import { Component, OnInit } from '@angular/core';

interface ProgramDetail {
  id?: string;
  name?: string;
  url?: string;
  moduleName?: string;
  subProgram?: Array<{ id: string, name: string, url: string }>;
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
          { name: 'Assign QA', id: 'QAD1I030', url: '/qad/QAD1I030' },
          { name: 'QA Schedule and Plan', id: 'QAD1Q010', url: '/qad/QAD1Q010' }
        ]
      },
      {
        moduleName: 'CMMI DOCUMENT',
        subProgram: [
          { name: 'CMMI Document', id: 'QAD2I010', url: 'QAD2I010' },
          { name: 'CMMI Document History', id: 'QAD2Q010', url: 'QAD2Q010' },
          { name: 'CMMI Document', id: 'QAD2R010', url: 'QAD2R010' },
        ]
      },
      {
        moduleName: 'QA CHECKLIST',
        subProgram: [
          { name: 'QA Checklist', id: 'QAD3I010', url: 'QAD3I010' },
          { name: 'Checklist Search', id: 'QAD3Q010', url: 'QAD3Q010' },
          { name: 'CMMI Document', id: 'QAD3R010', url: 'QAD3R010' },
        ]
      },
      {
        moduleName: 'Audit PROGRAMS',
        subProgram: [
          { name: 'Audit Programs', id: 'QAD4I010', url: 'QAD4I010' },
          { name: 'Audit Programs Search', id: 'QAD4Q010', url: 'QAD4Q010' },
          { name: 'CMMI Document', id: 'QAD4R010', url: 'QAD4R010' },
        ]
      },
      {
        moduleName: 'QA REPORT',
        subProgram: [
          { name: 'Audit Programs', id: 'QAD2R010', url: 'QAD2R010' },
          { name: 'Audit Programs Search', id: 'QAD2Q010', url: 'QAD2Q010' },
          { name: 'QA Metrics', id: '', url: '' },
          { name: 'QA Audit Project', id: '', url: '' },
          { name: 'QA Summary Checklist', id: 'QAD3R010', url: 'QAD3R010' },
        ]
      },
      {
        moduleName: 'QA MASTER',
        subProgram: [
          { name: 'QA MENU', id: '', url: '' },
          { name: 'QA Activities', id: 'QAD0Q010', url: 'QAD0Q010' },
          { name: 'Work Category', id: '', url: '' },
          { name: 'CMMI Document (Document, BI)', id: '', url: '' },
          { name: 'Checklist Details', id: '', url: '' },
          { name: 'Work Product', id: '', url: '' },
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
