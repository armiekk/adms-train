/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad0i030SaveComponent } from './qad0i030-save.component';

describe('Qad0i030SaveComponent', () => {
  let component: Qad0i030SaveComponent;
  let fixture: ComponentFixture<Qad0i030SaveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad0i030SaveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad0i030SaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
