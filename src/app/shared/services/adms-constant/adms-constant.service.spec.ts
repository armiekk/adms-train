/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdmsConstantService } from './adms-constant.service';

describe('AdmsConstantService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmsConstantService]
    });
  });

  it('should ...', inject([AdmsConstantService], (service: AdmsConstantService) => {
    expect(service).toBeTruthy();
  }));
});
