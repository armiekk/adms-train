/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i020Service } from './pri1i020.service';

describe('Pri1i020Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i020Service]
    });
  });

  it('should ...', inject([Pri1i020Service], (service: Pri1i020Service) => {
    expect(service).toBeTruthy();
  }));
});
