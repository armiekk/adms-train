import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';
import { FileUploadModule } from 'primeng/primeng';

interface Option {
    label: string;
    value: any;
}

const INDENT_MULTIPLIER: number = 0.7;
const SHORT_DAY = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

@Component({
    selector: 'app-qad1i020',
    templateUrl: './qad1i020.component.html',
    styleUrls: ['./qad1i020.component.css']
})
export class Qad1i020Component implements OnInit {
    private actionPlanOption: string;
    private disableFileUpload: boolean;

    @Input () qaSchedules: any[];
    private selectedQaSchedules: any[] = [];
    private qaActivities: any[] = [];
    private qaActivitiesOption: Array<Option> = [];

    constructor(private http: Http) { }

    ngOnInit() {
        this.actionPlanOption = "sdm";
        this.disableFileUpload = true;

        this.http.get('app/qad/resources/data/qaActivitiesMockData.json')
            .map(res => res.json().data)
            .subscribe((qaActivities: any[]) => {
                this.qaActivities = qaActivities;
                this.qaActivities.push({qaActivities: "Other"});
                //Create list option qaActivities
                this.qaActivitiesOption.push({ label: "-- Select QA Activites --", value: null });
                for (let i = 0; i < qaActivities.length; i++) {
                    this.qaActivitiesOption.push({ label: qaActivities[i].qaActivities, value: qaActivities[i] });
                }
            });
    }

    private set qaDatas(qaDatas: any[]) {
        this.qaSchedules = qaDatas;
    }

    selectActionPlanOption() {
        if (this.actionPlanOption === "file") {
            this.disableFileUpload = false;
        } else {
            this.disableFileUpload = true;
        }
    }

    onUpload($event) {
        //To do receive data from server after upload file
    }

    deSelectAll() {
        this.selectedQaSchedules = [];
    }

    upLevel(qaSchedule: any) {
        let index = -1;
        index = this.qaSchedules.indexOf(qaSchedule);

        if (this.qaSchedules[index].activityLevel > 1) {
            this.qaSchedules[index].activityLevel = this.qaSchedules[index].activityLevel - 1;
            let indent = this.qaSchedules[index].activityLevel * INDENT_MULTIPLIER;
            this.qaSchedules[index].indent = indent + 'em';
        }
    }

    downLevel(qaSchedule: any) {
        let index = -1;
        index = this.qaSchedules.indexOf(qaSchedule);

        this.qaSchedules[index].activityLevel = this.qaSchedules[index].activityLevel + 1;
        let indent = this.qaSchedules[index].activityLevel * INDENT_MULTIPLIER;
        this.qaSchedules[index].indent = indent + 'em';
    }

    upLevelSelected() {
        for (let i = 0; i < this.selectedQaSchedules.length; i++) {
            if (this.selectedQaSchedules[i].activityLevel > 1) {
                this.selectedQaSchedules[i].activityLevel = this.selectedQaSchedules[i].activityLevel - 1;
                let indent = this.selectedQaSchedules[i].activityLevel * INDENT_MULTIPLIER;
                this.selectedQaSchedules[i].indent = indent + 'em';
            }
        }
    }

    downLevelSelected() {
        for (let i = 0; i < this.selectedQaSchedules.length; i++) {
            console.log(this.selectedQaSchedules[i].taskName);
            this.selectedQaSchedules[i].activityLevel = this.selectedQaSchedules[i].activityLevel + 1;
            let indent = this.selectedQaSchedules[i].activityLevel * INDENT_MULTIPLIER;
            this.selectedQaSchedules[i].indent = indent + 'em';
        }
    }

    addRowQaSchedule(index: number) {
        if(this.qaSchedules[index].edit === false) {
            let activityLevel = this.qaSchedules[index].activityLevel;
            
            let orderSeq = +this.qaSchedules[index].orderSeq;
            orderSeq++;
            let newQaSchedule = { orderSeq: orderSeq.toString(), taskName: "",indent: (activityLevel * INDENT_MULTIPLIER) + 'em', activityLevel: activityLevel, bgColor: "green", duration: "", hidden: false, edit: true};
            if (index + 1 < this.qaSchedules.length) {
                let r = this.qaSchedules.splice(index + 1, this.qaSchedules.length - 1 - index, newQaSchedule);
                
                for (let j = 0; j < r.length; j++) {
                    orderSeq++;
                    let old: any = {};
                    old.orderSeq = orderSeq;
                    old.taskName = r[j].taskName;
                    old.indent = r[j].indent;
                    old.activityLevel = r[j].activityLevel;
                    old.duration = r[j].duration;
                    old.startDate = r[j].startDate;
                    old.showStartDate = r[j].showStartDate;
                    old.finishDate = r[j].finishDate;
                    old.showFinishDate = r[j].showFinishDate;
                    old.comment = r[j].comment;
                    old.toDo = r[j].toDo;
                    old.noti = r[j].noti;
                    old.hidden = r[j].hidden;
                    old.edit = r[j].edit;

                    this.qaSchedules.push(old);
                }
            } else {
                this.qaSchedules.push(newQaSchedule);
            }
        }
    }

    saveRowQaSchedule(index: number) {
        if (!(this.qaSchedules[index].taskName !== undefined && this.qaSchedules[index].taskName !== '')) {
            return;
        }

        if (this.qaSchedules[index].duration == undefined || this.qaSchedules[index].duration.trim() == '') {
            return;
        }

        if (this.qaSchedules[index].startDate == undefined || this.qaSchedules[index].startDate == null) {
            return;
        }

        if (this.qaSchedules[index].finishDate == undefined || this.qaSchedules[index].finishDate == null) {
            return;
        }

        let startDate: Date = new Date(this.qaSchedules[index].startDate);
        let finishDate: Date = new Date(this.qaSchedules[index].finishDate);

        this.qaSchedules[index].showStartDate = SHORT_DAY[startDate.getDay()] + ' ' + startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
        this.qaSchedules[index].showFinishDate = SHORT_DAY[finishDate.getDay()] + ' ' + finishDate.getDate() + '/' + (finishDate.getMonth() + 1) + '/' + finishDate.getFullYear();
        this.qaSchedules[index].edit = false;
    }

    cancelEditRowQaSchedule(index: number) {
        let orderSeq = +this.qaSchedules[index].orderSeq;

        this.qaSchedules.splice(index, 1); //Delete

        //Reorder
        for (let i = index; i < this.qaSchedules.length; i++) {
            this.qaSchedules[i].orderSeq = orderSeq;
            orderSeq++;
        }
    }

    onChangeSelectQaActivities(index: number) {
        if (this.qaSchedules[index].qaActivities !== undefined && this.qaSchedules[index].qaActivities !== null) {
            if (this.qaSchedules[index].qaActivities.qaActivities == 'Other') {
                this.qaSchedules[index].selectOther = true;
            } else {
                this.qaSchedules[index].selectOther = false;
                this.qaSchedules[index].taskName = this.qaSchedules[index].qaActivities.qaActivities;
            }
        } else {
            this.qaSchedules[index].taskName = '';
        }
    }

    onChangeOtherQaActivities(index: number) {
        this.qaSchedules[index].taskName = new String(this.qaSchedules[index].otherQaActivities);
    }

    calDurationOrDate(index: number) {
        if ((this.qaSchedules[index].startDate !== undefined && this.qaSchedules[index].startDate !== null) && (this.qaSchedules[index].finishDate !== undefined && this.qaSchedules[index].finishDate !== null)) {
            if (this.qaSchedules[index].duration == undefined || this.qaSchedules[index].duration == null || this.qaSchedules[index].duration == '') {
                let startDate: Date = new Date(this.qaSchedules[index].startDate);
                let finishDate: Date = new Date(this.qaSchedules[index].finishDate);
                let count: number = 0;
                let time = +finishDate - +startDate;
                count = (time / 86400000) + 1;
                this.qaSchedules[index].duration = count.toString();
                this.qaSchedules[index].showStartDate = SHORT_DAY[startDate.getDay()] + ' ' + startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
                this.qaSchedules[index].showFinishDate = SHORT_DAY[finishDate.getDay()] + ' ' + finishDate.getDate() + '/' + (finishDate.getMonth() + 1) + '/' + finishDate.getFullYear();
            }
        } else if ((this.qaSchedules[index].duration !== undefined && this.qaSchedules[index].duration !== null && this.qaSchedules[index].duration !== '') && (this.qaSchedules[index].startDate !== undefined && this.qaSchedules[index].startDate !== null)) {
            if (this.qaSchedules[index].finishDate == undefined || this.qaSchedules[index].finishDate == null) {
                let duration: number = +this.qaSchedules[index].duration;
                let startDate: Date = new Date(this.qaSchedules[index].startDate);
                if (duration > 0) {
                    startDate.setSeconds(86400 * (duration - 1));
                }
                
                this.qaSchedules[index].finishDate = startDate;
                this.qaSchedules[index].showStartDate = SHORT_DAY[startDate.getDay()] + ' ' + startDate.getDate() + '/' + (startDate.getMonth() + 1) + '/' + startDate.getFullYear();
            }
        }
    }

    onChangeDuration(index: number) {
        this.calDurationOrDate(index);
    }

    onSelectStartDate(index: number) {
        this.calDurationOrDate(index);
    }

    onSelectFinishDate(index: number) {
        this.calDurationOrDate(index);
    }
}
