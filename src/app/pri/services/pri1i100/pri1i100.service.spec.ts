/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i100Service } from './pri1i100.service';

describe('Pri1i100Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i100Service]
    });
  });

  it('should ...', inject([Pri1i100Service], (service: Pri1i100Service) => {
    expect(service).toBeTruthy();
  }));
});
