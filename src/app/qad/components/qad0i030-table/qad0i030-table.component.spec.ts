/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad0i030TableComponent } from './qad0i030-table.component';

describe('Qad0i030TableComponent', () => {
  let component: Qad0i030TableComponent;
  let fixture: ComponentFixture<Qad0i030TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad0i030TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad0i030TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
