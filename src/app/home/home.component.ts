import { Component, OnInit } from '@angular/core';
import { UserManagementService } from '../shared/services/user-management/user-management.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit() {
    this.userManagementService.changeDropdownVisibility();
  }

}
