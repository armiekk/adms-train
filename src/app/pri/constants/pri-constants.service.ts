import { Injectable, OnInit } from '@angular/core';

export interface MapValue {
  label: string;
  value: number;
}

@Injectable()
export class PriConstantsService {
  private _projectStatus: Array<MapValue>;
  private _editProjectStatus: Array<MapValue>;
  private _projectType: Array<MapValue>;
  private _monitorType: Array<MapValue>;
  private _tabLabel: Array<{ label: string, value: string }>;
  private _priCriticality: Array<MapValue>;

  constructor() {
    this._projectStatus = [
      { label: 'ดำเนินการก่อนมีสัญญา', value: 1 },
      { label: 'ระหว่างดำเนินการ', value: 2 },
      { label: 'จบโครงการ', value: 3 },
    ];

    this._editProjectStatus = [
      { label: 'ดำเนินการก่อนมีสัญญา', value: 1 },
      { label: 'ระหว่างดำเนินการ', value: 2 },
      { label: 'จบโครงการ', value: 3 },
    ];

    this._projectType = [
      { label: 'Pre Contact', value: 1 },
      { label: 'Contact', value: 2 },
      { label: 'Inhouse', value: 3 },
      { label: 'MA', value: 4 },
      { label: 'ALL', value: 5 }
    ];

    this._monitorType = [
      { label: 'ผู้บริหาร', value: 1 },
      { label: 'Team', value: 2 },
      { label: 'ลูกค้า', value: 3 },
    ];

    this._tabLabel = [
      { label: 'รายละเอียดทั่วไป', value: '#proj-info' },
      { label: 'ขอบเขต', value: '#proj-scope' },
      { label: 'SDE', value: '#proj-sde' },
      { label: 'เงื่อนไขโครงการ', value: '#proj-condition' },
      { label: 'งวดการส่งมอบงาน', value: '#proj-delivery' },
      { label: 'ข้อจำกัด', value: '#proj-limit' },
      { label: 'Monitoring', value: '#proj-monitor' },
      { label: 'ลูกค้า', value: '#proj-customer' },
      { label: 'อุปกรณ์', value: '#proj-accessories' },
      { label: 'อบรม', value: '#proj-train' },
      { label: 'อื่นๆ', value: '#proj-other' },
      { label: 'ระบบงานในโครงการ', value: '#proj-systems' },
      { label: 'Risk Analysis', value: '#risk-analysis' },
    ];

    this._priCriticality = [
      { label: null, value: null},
      { label: 'High', value: 1},
      { label: 'Moderate', value: 2},
      { label: 'Low', value: 3},
    ];
  }


  get projectStatus(): Array<MapValue> {
    return this._projectStatus;
  }

  get projectType(): Array<MapValue> {
    return this._projectType;
  }

  get editProjectStatus(): Array<MapValue> {
    return this._editProjectStatus;
  }

  get monitorType(): Array<MapValue> {
    return this._monitorType;
  }

  get tabLabel(): Array<{ label: string, value: string }> {
    return this._tabLabel;
  }

  get priCriticality(): Array<MapValue> {
    return this._priCriticality;
  }
}
