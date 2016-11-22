/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PriConstantsService } from './pri-constants.service';

describe('Service: PriConstants', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriConstantsService]
    });
  });

  it('should ...', inject([PriConstantsService], (service: PriConstantsService) => {
    expect(service).toBeTruthy();
  }));
});
