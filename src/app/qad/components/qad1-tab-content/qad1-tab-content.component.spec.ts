/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad1TabContentComponent } from './qad1-tab-content.component';

describe('Qad1TabContentComponent', () => {
  let component: Qad1TabContentComponent;
  let fixture: ComponentFixture<Qad1TabContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad1TabContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad1TabContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
