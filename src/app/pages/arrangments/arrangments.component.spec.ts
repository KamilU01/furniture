import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrangmentsComponent } from './arrangments.component';

describe('ArrangmentsComponent', () => {
  let component: ArrangmentsComponent;
  let fixture: ComponentFixture<ArrangmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrangmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrangmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
