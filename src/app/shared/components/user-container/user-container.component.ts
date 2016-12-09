import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserApi } from '../../api/mockup-user-service/api/UserApi';
import { Location } from '@angular/common';
import { UserManagementService, User } from '../../services/user-management/user-management.service';
import { SelectItem } from 'primeng/primeng';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {

  private account: any = {};
  private clock: string;
  private mockupRole: SelectItem[];
  private selectedRole: SelectItem;
  private isDashboard: boolean;
  constructor(
    private userApi: UserApi,
    private location: Location,
    private userManagementService: UserManagementService) { }

  ngOnInit() {

    this.userManagementService.isDashboard.subscribe((response: boolean) => this.isDashboard = response);

    // initial mockup role
    this.mockupRole = [
      { label: 'PM: Project Manager', value: '400' },
      { label: 'SA: System Analyst', value: '300' },
      { label: 'PA: Program Analyst', value: '200' },
      { label: 'PG: Programmer', value: '100' },
    ];

    Observable.interval(100).timestamp().subscribe((response) => {
      let date = new Date(response.timestamp);
      let h = date.getHours();
      let m = date.getMinutes();
      let s = date.getSeconds();

      m = this.checkTime(m);
      s = this.checkTime(s);
      this.clock = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear() + 543} ${h}:${m}:${s} น.`;
    });

    this.userManagementService.getUserInformation()
      .subscribe((user: User) => {
        this.account.firstName = user.username;
        this.account.lastName = user.username;
      });
  }

  checkTime(i) {
    if (i < 10) { i = '0' + i };
    return i;
  }

  onSelectDropDownRole(event) {
    let tabValue: string[] = localStorage.getItem('tabValue').split('.');
    if (tabValue.length > 1) {
      this.selectedRole = this.mockupRole[0];
      alert('มี tab อื่นที่เปิดค้างไว้อยู่');
      this.mockupRole = [
        { label: 'PM: Project Manager', value: '400' },
        { label: 'SA: System Analyst', value: '300' },
        { label: 'PA: Program Analyst', value: '200' },
        { label: 'PG: Programmer', value: '100' },
      ];
    } else {
      this.userManagementService.changeRole(event.value);
    }
  }
}
