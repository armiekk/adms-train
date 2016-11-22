/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ThaiCalendarService } from './thai-calendar.service';

describe('Service: ThaiCalendar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ThaiCalendarService]
    });
  });

  it('should ...', inject([ThaiCalendarService], (service: ThaiCalendarService) => {
    expect(service).toBeTruthy();
  }));
});
