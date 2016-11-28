/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Pri1i150Service } from './pri1i150.service';

describe('Pri1i150Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Pri1i150Service]
    });
  });

  it('should ...', inject([Pri1i150Service], (service: Pri1i150Service) => {
    expect(service).toBeTruthy();
  }));
});
