/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad1i010Component } from './qad1i010.component';

describe('Qad1i010Component', () => {
  let component: Qad1i010Component;
  let fixture: ComponentFixture<Qad1i010Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad1i010Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad1i010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
