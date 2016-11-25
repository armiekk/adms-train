import { Component, OnInit } from '@angular/core';
import { PriConstantsService } from '../../../constants';
import { ThaiCalendarService } from '../../../../shared/services/thai-calendar/thai-calendar.service';
import { 
  PriInformationService, 
  PritInformation, 
  initialPritInformaitonDetail 
} from '../../../services/priInformation/pri-information.service';
import { StateService } from '../../../../shared/services/state/state.service';
import { MessageService } from '../../../../shared/services/message/message.service';

@Component({
  selector: 'app-pri1i010-detail',
  templateUrl: './pri1i010-detail.component.html',
  styleUrls: ['./pri1i010-detail.component.css']
})
export class Pri1i010DetailComponent implements OnInit {

  private pritInformationDetail: PritInformation = initialPritInformaitonDetail;

  constructor(
    private message: MessageService,
    private state: StateService,
    private constant: PriConstantsService,
    private priService: PriInformationService,
    private locale: ThaiCalendarService,
  ) { }

  ngOnInit() {
    if (this.state.projCode && this.state.mode === 'EDIT') {
      console.log(this.state.projCode)
      this.getPritInformationDetail(this.state.projCode);
    } else {
      this.pritInformationDetail = initialPritInformaitonDetail;
    }
  }

  getPritInformationDetail(projCode: string) {
    this.priService
    this.priService.getPritInformationDetail(projCode)
      .subscribe((pritInformationDetail: PritInformation[]) => [this.pritInformationDetail] = pritInformationDetail);
  }

  savePritInformationDetail() {

  }

  editPritInformationDetail() {

  }

}
