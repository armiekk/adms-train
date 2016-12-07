import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  tokenHolder: BehaviorSubject<string> = new BehaviorSubject(localStorage.getItem('token'));

  constructor() {
    
  }

  

}
