/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i110Service } from './pri1i110.service';

describe('Pri1i110Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i110Service]
    });
  });

  it('should ...', inject([Pri1i110Service], (service: Pri1i110Service) => {
    expect(service).toBeTruthy();
  }));
});
