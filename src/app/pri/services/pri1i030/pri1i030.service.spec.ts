/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i030Service } from './pri1i030.service';

describe('Pri1i030Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i030Service]
    });
  });

  it('should ...', inject([Pri1i030Service], (service: Pri1i030Service) => {
    expect(service).toBeTruthy();
  }));
});
