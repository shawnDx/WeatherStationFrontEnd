import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempretureComponent } from './tempreture.component';

describe('TempretureComponent', () => {
  let component: TempretureComponent;
  let fixture: ComponentFixture<TempretureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempretureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempretureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
