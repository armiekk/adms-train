/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Qad2i010TableComponent } from './qad2i010-table.component';

describe('Qad2i010TableComponent', () => {
  let component: Qad2i010TableComponent;
  let fixture: ComponentFixture<Qad2i010TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Qad2i010TableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Qad2i010TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
