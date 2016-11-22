import { Injectable } from '@angular/core';

@Injectable()
export class StateService {

  private state: string = 'ADD';

  constructor() { }

  getState(): string {
    return this.state;
  }

  setState(state: string) {
    this.state = state;
  }
}
