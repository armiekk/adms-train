import { Component, OnInit } from '@angular/core';
import { PriConstantsService } from '../../../constants';
import { ThaiCalendarService } from '../../../../shared/services/thai-calendar/thai-calendar.service';
import {
  UserManagementService,
} from '../../../../shared/services/user-management/user-management.service';
import {
  PriInformationService,
  PritInformation,
  initialPritInformaitonDetail
} from '../../../services/pri1i010/pri-information.service';
import { StateService } from '../../../../shared/services/state/state.service';
import { MessageService } from '../../../../shared/services/message/message.service';

@Component({
  selector: 'app-pri1i010-detail',
  templateUrl: './pri1i010-detail.component.html',
  styleUrls: ['./pri1i010-detail.component.css']
})
export class Pri1i010DetailComponent implements OnInit {

  
  private pritInformationDetail: PritInformation = initialPritInformaitonDetail;
  private currentPermission: string;

  constructor(
    private message: MessageService,
    private state: StateService,
    private constant: PriConstantsService,
    private priService: PriInformationService,
    private locale: ThaiCalendarService,
    private roleManagement: UserManagementService
  ) { }

  ngOnInit() {
    this.currentPermission = this.roleManagement.getPermission();
    if (this.state.projRef && this.state.mode === 'EDIT') {
      this.getPritInformationDetail(this.state.projRef);
    } else {
      this.pritInformationDetail = initialPritInformaitonDetail;
    }
  }

  getPritInformationDetail(projRef: number) {
    this.priService.getPritInformationDetail(projRef)
      .subscribe((pritInformationDetail: PritInformation) => this.pritInformationDetail = pritInformationDetail);
  }

  savePritInformationDetail() {

  }

  editPritInformationDetail() {

  }

}
