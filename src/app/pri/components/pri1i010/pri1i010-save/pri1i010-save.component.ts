import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PritInformation } from '../../../api/pri-information';
import { ApipriinformationApi } from '../../../api/pri-information/api/ApipriinformationApi';
import { PriConstantsService } from '../../../constants';
import { ThaiCalendarService } from '../../../../shared/services/thai-calendar/thai-calendar.service';
import { StateService } from '../../../../shared/services/state/state.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import { ActivatedRoute } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-pri1i010-save',
  templateUrl: './pri1i010-save.component.html',
  styleUrls: ['./pri1i010-save.component.css'],
})
export class Pri1i010SaveComponent implements OnInit {

  @ViewChild('sliderTabs') sliderTabs: ElementRef;
  private pritInformation: PritInformation = {};
  private slider: any;

  constructor(
    private message: MessageService,
    private state: StateService,
    private constant: PriConstantsService,
    private priService: ApipriinformationApi,
    private locale: ThaiCalendarService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.setHeaders();

    this.slider = $(this.sliderTabs.nativeElement).sliderTabs({
      transition: 'fade',
    });

    if (this.state.getState() === 'EDIT') {
      this.route.data.forEach((data: { priInfo: PritInformation }) => {
        this.pritInformation = Object.assign({}, data.priInfo);
      });
    }
  }

  savePritInformation() {
    this.priService.createPritInformation(this.pritInformation).subscribe((response: PritInformation) => {
      if (response) {
        this.message.successMessage('บันทึกข้อมูลเสร็จสิ้น');
      } else {
        this.message.errorMessage('ไม่สามารถบันทึกข้อมูลได้');
      }
    });
  }

  editPritInformation() {
  }

  cancelPritInformation() {
    if (this.state.getState() === 'EDIT') {
      this.route.data.forEach((data: { priInfo: PritInformation }) => {
        this.pritInformation = Object.assign({}, data.priInfo);
        this.message.warnMessage('ยกเลิกการแก้ไข');
      });
    } else {
      this.pritInformation = {};
      this.message.warnMessage('ยกเลิกการบันทึก');
    }

  }

  setHeaders() {
    if (!this.priService.defaultHeaders.has('Authorization')) {
      this.priService.defaultHeaders.append('Content-Type', 'application/json');
      this.priService.defaultHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('token')}`);
      this.priService.defaultHeaders.append('Accept', 'application/json');
    }
    return;
  }

}
