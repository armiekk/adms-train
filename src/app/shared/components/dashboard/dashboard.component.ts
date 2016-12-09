import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../../services/user-management/user-management.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  

  @Input() programList: Array<{}>;

  constructor(
    private userManagementService: UserManagementService
  ) { }

  ngOnInit() {
    this.userManagementService.changeDropdownVisibility();
  }

}
