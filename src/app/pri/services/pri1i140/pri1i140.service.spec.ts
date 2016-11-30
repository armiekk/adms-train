/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i140Service } from './pri1i140.service';

describe('Pri1i140Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i140Service]
    });
  });

  it('should ...', inject([Pri1i140Service], (service: Pri1i140Service) => {
    expect(service).toBeTruthy();
  }));
});
