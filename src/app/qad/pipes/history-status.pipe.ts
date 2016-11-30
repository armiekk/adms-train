import { Pipe, PipeTransform } from '@angular/core';
import { QadConstantsService } from '../constants';

@Pipe({
    name: 'historyStatus'
})
export class HistoryStatusPipe implements PipeTransform {
    constructor(private qadConstant: QadConstantsService) { }

    transform(value: any, args?: any): any {
        let status: Array<{ label: string, value: number }> = this.qadConstant.historyStatus.filter((status) => {
            return status.value === +value;
        });
        return status[0].label;
    }

}
