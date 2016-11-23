/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdmsMenuService } from './adms-menu.service';

describe('AdmsMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmsMenuService]
    });
  });

  it('should ...', inject([AdmsMenuService], (service: AdmsMenuService) => {
    expect(service).toBeTruthy();
  }));
});
