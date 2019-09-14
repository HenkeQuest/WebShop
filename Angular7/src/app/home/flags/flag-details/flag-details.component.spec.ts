import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagDetailsComponent } from './flag-details.component';

describe('FlagDetailsComponent', () => {
  let component: FlagDetailsComponent;
  let fixture: ComponentFixture<FlagDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlagDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlagDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
