import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from '../shared/services/role-management/role-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private roleManagementService: RoleManagementService) { }

  ngOnInit() {
    this.roleManagementService.changeDropdownVisibility();
  }

}
