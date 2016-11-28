/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i120Service } from './pri1i120.service';

describe('Pri1i120Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i120Service]
    });
  });

  it('should ...', inject([Pri1i120Service], (service: Pri1i120Service) => {
    expect(service).toBeTruthy();
  }));
});
