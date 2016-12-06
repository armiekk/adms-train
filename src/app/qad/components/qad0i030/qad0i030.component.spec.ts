/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad0i030Component } from './qad0i030.component';

describe('Qad0i030Component', () => {
  let component: Qad0i030Component;
  let fixture: ComponentFixture<Qad0i030Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad0i030Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad0i030Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
