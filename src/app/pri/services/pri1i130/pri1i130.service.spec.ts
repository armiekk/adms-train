/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i130Service } from './pri1i130.service';

describe('Pri1i130Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i130Service]
    });
  });

  it('should ...', inject([Pri1i130Service], (service: Pri1i130Service) => {
    expect(service).toBeTruthy();
  }));
});
