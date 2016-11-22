import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asm-dashboard-container',
  templateUrl: './asm-dashboard-container.component.html',
  styleUrls: ['./asm-dashboard-container.component.css']
})
export class AsmDashboardContainerComponent implements OnInit {

  programList: Array<{}>;
  todoListData: Array<{}>;

  constructor() { }

  ngOnInit() {
    this.programList = [
    ];
    this.todoListData = [
      {
        system: 'Assesment',
        tasks: [
        ]
      }
    ];
  }
}
