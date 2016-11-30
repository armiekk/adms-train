/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pri1i040Component } from './pri1i040.component';

describe('Pri1i040Component', () => {
  let component: Pri1i040Component;
  let fixture: ComponentFixture<Pri1i040Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pri1i040Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pri1i040Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
