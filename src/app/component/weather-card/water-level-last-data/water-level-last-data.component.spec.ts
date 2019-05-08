import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterLevelLastDataComponent } from './water-level-last-data.component';

describe('WaterLevelLastDataComponent', () => {
  let component: WaterLevelLastDataComponent;
  let fixture: ComponentFixture<WaterLevelLastDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaterLevelLastDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaterLevelLastDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
