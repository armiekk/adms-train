import { Pipe, PipeTransform } from '@angular/core';
import { PriConstantsService } from '../constants';

@Pipe({
  name: 'projectStatus'
})
export class ProjectStatusPipe implements PipeTransform {

  constructor(private constants: PriConstantsService) { }

  transform(projStatus: any, args?: any): any {
    let status: Array<{ label: string, value: number }> = this.constants.projectStatus.filter((status) => {
      return status.value === +projStatus;
    });
    return status[0].label;
  }

}
