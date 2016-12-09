import { Component, OnInit, Input } from '@angular/core';
import { RoleManagementService } from '../../services/role-management/role-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  

  @Input() programList: Array<{}>;

  constructor(
    private roleManagementService: RoleManagementService
  ) { }

  ngOnInit() {
    this.roleManagementService.changeDropdownVisibility();
  }

}
