import { Injectable } from '@angular/core';

@Injectable()
export class StateService {

  private _projCode: string = null;
  private _mode: string = null;

  constructor() { }

  get mode(){
    return this._mode;
  }

  set mode(mode: string){
    this._mode = mode;
  }

  set projCode(projCode: string) {
    this._projCode = projCode;
  }

  get projCode(){
    return this._projCode;
  }
}
