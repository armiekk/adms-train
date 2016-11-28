/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i050Service } from './pri1i050.service';

describe('Pri1i050Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i050Service]
    });
  });

  it('should ...', inject([Pri1i050Service], (service: Pri1i050Service) => {
    expect(service).toBeTruthy();
  }));
});
