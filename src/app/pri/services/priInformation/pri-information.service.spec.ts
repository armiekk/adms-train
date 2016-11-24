/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PriInformationService } from './pri-information.service';

describe('PriInformationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriInformationService]
    });
  });

  it('should ...', inject([PriInformationService], (service: PriInformationService) => {
    expect(service).toBeTruthy();
  }));
});
