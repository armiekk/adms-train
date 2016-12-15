/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad3i010Component } from './qad3i010.component';

describe('Qad3i010Component', () => {
  let component: Qad3i010Component;
  let fixture: ComponentFixture<Qad3i010Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad3i010Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad3i010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
