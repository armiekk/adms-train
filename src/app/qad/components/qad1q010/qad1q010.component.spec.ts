/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad1q010Component } from './qad1q010.component';

describe('Qad1q010Component', () => {
  let component: Qad1q010Component;
  let fixture: ComponentFixture<Qad1q010Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad1q010Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad1q010Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
