import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { PritInformation } from '../../../../shared/api/mockup-prit-information-service/model/models';
import { ApipriinformationApi } from '../../../api/pri-information/api/ApipriinformationApi';
import { PriConstantsService } from '../../../constants';
import { ThaiCalendarService } from '../../../../shared/services/thai-calendar/thai-calendar.service';
import { PriInformationService, SearchCondition } from '../../../services/priInformation/pri-information.service';
import { StateService } from '../../../../shared/services/state/state.service';
import { MessageService } from '../../../../shared/services/message/message.service';
import { Router } from '@angular/router';
import { SelectItem, MenuItem } from 'primeng/primeng';

declare var $: any;

@Component({
  selector: 'app-pri1i010-save',
  templateUrl: './pri1i010-save.component.html',
  styleUrls: ['./pri1i010-save.component.css'],
})
export class Pri1i010SaveComponent implements OnInit {

  @ViewChild('sliderTabs') sliderTabs: ElementRef;
  private projectSeachCondition: SearchCondition = {};
  private pritInformation: PritInformation = {};
  private slider: any;
  private projectListItem: SelectItem[] = [];
  private selectedProject: PritInformation;
  private isShowSearchProject: boolean = false;

  constructor(
    private message: MessageService,
    private state: StateService,
    private constant: PriConstantsService,
    private priService: PriInformationService,
    private locale: ThaiCalendarService,
    private router: Router,
  ) { }

  ngOnInit() {


    this.slider = $(this.sliderTabs.nativeElement).sliderTabs({
      transition: 'fade',
    });
    

    switch (this.state.mode) {
      case 'ADD':
          this.pritInformation = {};
        break;
      case 'EDIT':
          if (this.state.projCode !== null) {
            this.getPritInformationByProjCode(this.state.projCode);
          }
        break;
      default:
          this.router.navigate(['pri/Pri1i010']);
        break;
    }

  }

  savePritInformation() {
    // this.priService.createPritInformation(this.pritInformation).subscribe((response: PritInformation) => {
    //   if (response) {
    //     this.message.successMessage('บันทึกข้อมูลเสร็จสิ้น');
    //   } else {
    //     this.message.errorMessage('ไม่สามารถบันทึกข้อมูลได้');
    //   }
    // });
  }

  editPritInformation() {
  }

  getPritInformationByProjCode(projCode: string) {
    this.priService
    this.priService.getPritInformationByProjCode(projCode)
    .subscribe((pritInformation: PritInformation[]) => { [ this.pritInformation ] = pritInformation;console.log(this.pritInformation) });
  }

  cancelPritInformation() {
    if (this.state.mode === 'EDIT') {
      this.getPritInformationByProjCode(this.state.projCode);
      this.message.warnMessage('ยกเลิกการแก้ไข');
    } else {
      this.pritInformation = {};
      this.message.warnMessage('ยกเลิกการบันทึก');
    }

  }

  searchProject(){
    this.isShowSearchProject = !this.isShowSearchProject;
    if(this.projectListItem.length === 0){
      this.priService.getAllProjectInformation().subscribe((response: PritInformation[]) => {
        this.projectListItem = response.map((pritInformation: PritInformation) => {
          return {label: pritInformation.projCode, value: pritInformation };
        });
      });
    }
  }
  

}
