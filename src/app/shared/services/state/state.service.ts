import { Injectable } from '@angular/core';

@Injectable()
export class StateService {

  private _projRef: number = null;
  private _projCode: string = null;
  private _mode: string = null;

  constructor() { }

  get mode(){
    return this._mode;
  }

  set mode(mode: string){
    this._mode = mode;
  }

  set projRef(projRef: number) {
    this._projRef = projRef;
  }

  get projRef(){
    return this._projRef;
  }

  set projCode(projCode: string) {
    this._projCode = projCode;
  }

  get projCode(){
    return this._projCode;
  }
}
