import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastdataSetComponent } from './lastdata-set.component';

describe('LastdataSetComponent', () => {
  let component: LastdataSetComponent;
  let fixture: ComponentFixture<LastdataSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastdataSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastdataSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
