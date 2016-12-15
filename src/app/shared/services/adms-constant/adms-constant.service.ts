import { Injectable } from '@angular/core';

export interface MapValue {
  label: string;
  value: number;
}

@Injectable()
export class AdmsConstantService {

  private _projectType: Array<MapValue>;

  constructor() {

    this._projectType = [
      { label: 'Pre Contact', value: 1 },
      { label: 'Contact', value: 2 },
      { label: 'Inhouse', value: 3 },
      { label: 'MA', value: 4 },
      { label: 'ALL', value: 5 }
    ];

  }

  get projectType(): Array<MapValue> {
    return this._projectType;
  }
}
