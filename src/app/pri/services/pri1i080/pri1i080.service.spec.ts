/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i080Service } from './pri1i080.service';

describe('Pri1i080Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i080Service]
    });
  });

  it('should ...', inject([Pri1i080Service], (service: Pri1i080Service) => {
    expect(service).toBeTruthy();
  }));
});
